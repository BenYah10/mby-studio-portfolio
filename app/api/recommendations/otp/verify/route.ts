/**
 * MBY Consulting - OTP verification and atomic confirmation (R10.3B).
 * TEST ONLY: fails closed in Production and without both feature flags.
 * Requires the exact recommendation content and all consent decisions.
 * Does not send messages, write to PostgreSQL or publish testimonials.
 */
import { NextRequest, NextResponse } from "next/server";
import { isRecommendationSubmissionEnabled } from "@/lib/recommendation-deployment-gate";
import { buildRecommendationConsents } from "@/lib/recommendation-consent-validation";
import { validatePublicationConsistency } from "@/lib/recommendation-publication-validation";
import { normalizeLinkedInProfileUrl } from "@/lib/recommendation-linkedin";
import { fingerprintRecommendationSubmission } from "@/lib/recommendation-submission-fingerprint";
import { fingerprintRecommendationOtp } from "@/lib/recommendation-email-otp";
import { generateRecommendationConfirmationToken, fingerprintRecommendationConfirmation } from "@/lib/recommendation-email-confirmation";
import { recommendationChallengeKey, recommendationEmailKey } from "@/lib/recommendation-otp-keys";
import { recommendationConfirmationKey } from "@/lib/recommendation-confirmation-store";
import { promoteRecommendationOtp } from "@/lib/recommendation-otp-promotion";
import { RECOMMENDATION_EMAIL_VERIFICATION } from "@/lib/recommendation-email-verification-config";

export const runtime = "nodejs";
const MAX_BODY_BYTES = 14_000;
const CHALLENGE_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function reply(status: number, body: Record<string, unknown> = { ok: false }) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}
function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}
function clean(v: unknown, maximum: number, minimum = 0): string | null {
  if (typeof v !== "string" || v.length > maximum || v.includes("\0")) return null;
  const s = v.trim();
  return s.length >= minimum ? s : null;
}
async function parseLimitedJson(request: Request): Promise<Record<string, unknown> | null> {
  if (!(request.headers.get("content-type") ?? "").toLowerCase().startsWith("application/json")) return null;
  const stated = request.headers.get("content-length");
  if (stated !== null && (!/^\d+$/.test(stated) || Number(stated) > MAX_BODY_BYTES)) return null;
  if (!request.body) return null;
  const reader = request.body.getReader();
  const parts: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) { await reader.cancel().catch(() => undefined); return null; }
      parts.push(value);
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const part of parts) { bytes.set(part, offset); offset += part.byteLength; }
    const data: unknown = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
    return isRecord(data) ? data : null;
  } catch { return null; }
  finally { reader.releaseLock(); }
}

export async function POST(request: NextRequest) {
  // No OTP processing can take place before explicit test-environment activation.
  if (!isRecommendationSubmissionEnabled(request)) return reply(503);

  const secret = process.env.MBY_RECOMMENDATIONS_OTP_HMAC_SECRET;
  if (!secret || secret.length < 32 ||
      !process.env.UPSTASH_REDIS_REST_URL?.startsWith("https://") ||
      !process.env.UPSTASH_REDIS_REST_TOKEN) return reply(503);

  const origin = request.headers.get("origin");
  if (!origin || origin !== request.nextUrl.origin) return reply(403);

  const body = await parseLimitedJson(request);
  if (!body) return reply(400);
  const allowed = new Set([
    "author_full_name", "author_email", "professional_role", "organization_name",
    "industry_sector", "professional_relationship", "linkedin_url", "locale",
    "quote", "consents", "challenge_id", "code",
  ]);
  if (Object.keys(body).some(k => !allowed.has(k))) return reply(400);

  const name = clean(body.author_full_name, 120, 2);
  const email = clean(body.author_email, 254, 3);
  const role = clean(body.professional_role, 150, 2);
  const organization = clean(body.organization_name ?? "", 180);
  const sector = clean(body.industry_sector ?? "", 120);
  const relationship = clean(body.professional_relationship, 250, 5);
  const linkedin = clean(body.linkedin_url, 500, 1);
  const quote = clean(body.quote, 4000, 20);
  const challengeId = clean(body.challenge_id, 36, 36);
  const code = clean(body.code, RECOMMENDATION_EMAIL_VERIFICATION.codeLength,
    RECOMMENDATION_EMAIL_VERIFICATION.codeLength);
  const locale = body.locale;

  if (!name || !email || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email) ||
      !role || organization === null || sector === null || (!organization && !sector) ||
      !relationship || !linkedin || !quote || !challengeId || !CHALLENGE_ID.test(challengeId) ||
      !code || !/^\d{6}$/.test(code) ||
      (locale !== "fr" && locale !== "en")) return reply(400);

  const normalizedLinkedin = normalizeLinkedInProfileUrl(linkedin);
  if (!normalizedLinkedin) return reply(400);
  const normalizedConsentInputs = Array.isArray(body.consents)
    ? body.consents.map((entry: unknown) => {
        if (!isRecord(entry) || entry.type !== "publish_linkedin" ||
            entry.granted !== true || typeof entry.value !== "string") return entry;
        const normalized = normalizeLinkedInProfileUrl(entry.value);
        return normalized ? { ...entry, value: normalized } : entry;
      })
    : body.consents;
  const consents = buildRecommendationConsents(locale, normalizedConsentInputs);
  if (!consents) return reply(400);
  if (!validatePublicationConsistency({
    locale,
    author_full_name: name,
    professional_role: role,
    organization_name: organization,
    industry_sector: sector,
    professional_relationship: relationship,
    linkedin_url: normalizedLinkedin,
  }, consents)) return reply(400);

  try {
    // Same normalized fingerprint contract as POST /api/recommendations.
    const submissionFingerprint = fingerprintRecommendationSubmission({
      author_full_name: name,
      author_email: email,
      professional_role: role,
      organization_name: organization || null,
      industry_sector: sector || null,
      professional_relationship: relationship,
      linkedin_url: normalizedLinkedin,
      locale,
      quote,
      consents,
    }, secret);
    const confirmationToken = generateRecommendationConfirmationToken();
    const confirmationFingerprint = fingerprintRecommendationConfirmation(
      confirmationToken, submissionFingerprint, challengeId, secret
    );
    const result = await promoteRecommendationOtp({
      challengeKey: recommendationChallengeKey(challengeId),
      activeKey: recommendationEmailKey(email, "active", secret),
      confirmationKey: recommendationConfirmationKey(confirmationFingerprint),
    }, fingerprintRecommendationOtp(code, challengeId, email, secret), confirmationFingerprint);

    if (result === "confirmed") return reply(200, {
      ok: true, challenge_id: challengeId, confirmation_token: confirmationToken,
      expires_in: 600,
    });
    // A wrong code is the only state distinguishable to the requester.
    if (result === "incorrect") return reply(400);
    if (result === "unavailable") return reply(503);
    return reply(403); // expired, locked, collision; no sensitive detail
  } catch { return reply(503); }
}
