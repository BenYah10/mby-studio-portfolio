/**
 * MBY Consulting — Recommendation OTP issuance (R10.3A, test-only).
 * New endpoint; existing Redis keys, functions and routes are unchanged.
 * Explicitly disabled in Production and unless both feature flags are true.
 * No personal information, code, or token is logged.
 */
import { NextRequest, NextResponse } from "next/server";
import { isRecommendationSubmissionEnabled } from "@/lib/recommendation-deployment-gate";
import { createHmac } from "node:crypto";
import { generateRecommendationOtp, fingerprintRecommendationOtp } from "@/lib/recommendation-email-otp";
import {
  createRecommendationChallengeId,
  recommendationChallengeKey,
  recommendationEmailKey,
} from "@/lib/recommendation-otp-keys";
import { issueRecommendationOtpChallenge } from "@/lib/recommendation-otp-issuance";

export const runtime = "nodejs";
const MAX_BODY_BYTES = 3000;

function reply(status: number, payload: Record<string, unknown> = { ok: false }) {
  return NextResponse.json(payload, { status, headers: { "Cache-Control": "no-store" } });
}
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
async function parseBody(request: Request): Promise<Record<string, unknown> | null> {
  if (!(request.headers.get("content-type") ?? "").toLowerCase().startsWith("application/json")) return null;
  const length = request.headers.get("content-length");
  if (length !== null && (!/^\d+$/.test(length) || Number(length) > MAX_BODY_BYTES)) return null;
  if (!request.body) return null;
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) { await reader.cancel().catch(() => undefined); return null; }
      chunks.push(value);
    }
    const data = new Uint8Array(size);
    let cursor = 0;
    for (const chunk of chunks) { data.set(chunk, cursor); cursor += chunk.length; }
    const parsed: unknown = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(data));
    return isRecord(parsed) ? parsed : null;
  } catch { return null; }
  finally { reader.releaseLock(); }
}

export async function POST(request: NextRequest) {
  // Fail closed independently of deployment configuration.
  if (!isRecommendationSubmissionEnabled(request)) return reply(503);

  const otpSecret = process.env.MBY_RECOMMENDATIONS_OTP_HMAC_SECRET;
  const salt = process.env.MBY_RATE_LIMIT_SALT;
  const siteSecret = process.env.MBY_TURNSTILE_SECRET;
  const hostname = process.env.MBY_TURNSTILE_HOSTNAME;
  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.MBY_MAIL_FROM;
  if (!otpSecret || otpSecret.length < 32 || !salt || salt.length < 24 ||
      !siteSecret || !hostname || !resendKey || !from) return reply(503);

  const origin = request.headers.get("origin");
  if (!origin || origin !== request.nextUrl.origin) return reply(403);
  const network = process.env.VERCEL === "1"
    ? request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim()
    : process.env.NODE_ENV === "development" ? "local-development" : undefined;
  if (!network || network.length > 100) return reply(503);

  const body = await parseBody(request);
  if (!body || Object.keys(body).some(key => !["email", "locale", "token", "website"].includes(key))) return reply(400);
  if (body.website !== undefined && (typeof body.website !== "string" || body.website.length > 100)) return reply(400);
  if (body.website) return reply(200, { ok: true }); // Honeypot: no mail or challenge.
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const token = typeof body.token === "string" ? body.token.trim() : "";
  const locale = body.locale;
  if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email) || email.length > 254 ||
      !token || token.length > 2048 || (locale !== "fr" && locale !== "en")) return reply(400);

  // Validate Cloudflare token before creating rate-limit/challenge state.
  const verificationResponse = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret: siteSecret, response: token }),
    cache: "no-store", signal: AbortSignal.timeout(7000),
  }).catch(() => null);
  if (!verificationResponse?.ok) return reply(502);
  const verification: unknown = await verificationResponse.json().catch(() => null);
  if (!isRecord(verification) || verification.success !== true || verification.hostname !== hostname) return reply(403);

  try {
    const challengeId = createRecommendationChallengeId();
    const code = generateRecommendationOtp();
    const fingerprint = fingerprintRecommendationOtp(code, challengeId, email, otpSecret);
    const networkDigest = createHmac("sha256", salt)
      .update(JSON.stringify(["mby-recommendations-network-v1", network])).digest("hex");
    const result = await issueRecommendationOtpChallenge({
      challengeKey: recommendationChallengeKey(challengeId),
      activeKey: recommendationEmailKey(email, "active", otpSecret),
      cooldownKey: recommendationEmailKey(email, "cooldown", otpSecret),
      emailLimitKey: recommendationEmailKey(email, "limit", otpSecret),
      networkLimitKey: `mby:recommendations:email:v1:network:${networkDigest}`,
    }, fingerprint);
    if (result === "cooldown" || result === "email_limit" || result === "network_limit") return reply(429);
    if (result !== "created") return reply(503);

    const text = locale === "fr"
      ? `Votre code de vérification MBY Consulting : ${code}\nValide 10 minutes. Si vous n'avez pas demandé ce code, ignorez ce message.`
      : `Your MBY Consulting verification code: ${code}\nValid for 10 minutes. If you did not request it, ignore this message.`;
    const sent = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from, to: [email],
        subject: locale === "fr" ? "MBY Consulting — Code de vérification" : "MBY Consulting — Verification code",
        text,
      }), cache: "no-store", signal: AbortSignal.timeout(9000),
    }).catch(() => null);
    // The challenge may remain reserved until expiry if delivery fails; fail closed.
    if (!sent?.ok) return reply(502);
    return reply(200, { ok: true, challenge_id: challengeId, expires_in: 600 });
  } catch {
    return reply(503);
  }
}
