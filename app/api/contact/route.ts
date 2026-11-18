/**
 * MBY Studio — T4.05A | Contact API hardening.
 * Server-side only. Fail closed. No message contents or tokens are logged.
 * A persistent distributed rate limiter is required whenever sending is enabled.
 */
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
const MAX_BODY_BYTES = 12_000;
const WINDOW_SECONDS = 15 * 60;
const MAX_REQUESTS = 5;
const VALID_SUBJECTS = new Set(["0", "1", "2", "3"]);
const SUBJECTS = {
  fr: ["Demande de mandat", "Collaboration", "Recrutement", "Autre"],
  en: ["Project inquiry", "Collaboration", "Recruitment", "Other"],
} as const;

type Locale = "fr" | "en";
type FormBody = Record<string, unknown>;

function reject(status: number) {
  return NextResponse.json({ ok: false }, { status, headers: { "Cache-Control": "no-store" } });
}
function clean(value: unknown, limit: number): string | null {
  if (typeof value !== "string" || value.length > limit || value.includes("\0")) return null;
  return value.trim();
}
function emailIsValid(email: string): boolean {
  return email.length <= 254 && /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email) && !/[\r\n]/.test(email);
}
function isRecord(value: unknown): value is FormBody {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Limits request size regardless of missing or misleading Content-Length. */
async function parseLimitedJson(request: Request): Promise<FormBody | null> {
  if (!(request.headers.get("content-type") || "").toLowerCase().startsWith("application/json")) return null;
  const headerLength = request.headers.get("content-length");
  if (headerLength !== null && (!/^\d+$/.test(headerLength) || Number(headerLength) > MAX_BODY_BYTES)) return null;
  if (!request.body) return null;
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > MAX_BODY_BYTES) { await reader.cancel().catch(() => undefined); return null; }
      chunks.push(value);
    }
    const bytes = new Uint8Array(total);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    const json: unknown = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
    return isRecord(json) ? json : null;
  } catch { return null; }
  finally { reader.releaseLock(); }
}

/**
 * Distributed fixed-window counter via Upstash Redis REST (atomic Lua script).
 * Requires Vercel's trusted x-vercel-forwarded-for header in deployment.
 * Does not store emails, messages, or raw IP addresses in Redis.
 */
async function withinRateLimit(request: NextRequest): Promise<boolean> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token || !url.startsWith("https://")) return false;
  const deployed = process.env.VERCEL === "1";
  const forwarded = request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim();
  const identity = deployed ? forwarded : process.env.NODE_ENV === "development" ? "local-development" : undefined;
  if (!identity) return false;
  // Hash the client identifier, so the rate-limit store never holds an IP address.
  const { createHash } = await import("node:crypto");
  const salt = process.env.MBY_RATE_LIMIT_SALT;
  if (!salt || salt.length < 24) return false;
  const fingerprint = createHash("sha256").update(`${salt}:${identity}`).digest("hex");
  const key = `mby:contact:v1:${fingerprint}`;
  const script = "local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],ARGV[1]); end; return n";
  try {
    const response = await fetch(url.replace(/\/$/, ""), {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(["EVAL", script, "1", key, String(WINDOW_SECONDS)]),
      cache: "no-store",
      signal: AbortSignal.timeout(3500),
    });
    if (!response.ok) return false;
    const result: unknown = await response.json();
    if (!isRecord(result) || typeof result.result !== "number") return false;
    return result.result <= MAX_REQUESTS;
  } catch { return false; }
}

export async function POST(request: NextRequest) {
  if (process.env.MBY_CONTACT_FORM_ENABLED !== "true") return reject(503);
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.MBY_MAIL_FROM;
  const to = process.env.MBY_MAIL_TO;
  const secret = process.env.MBY_TURNSTILE_SECRET;
  const expectedHostname = process.env.MBY_TURNSTILE_HOSTNAME;
  if (!apiKey || !from || !to || !secret || !expectedHostname) return reject(503);

  // Same-origin policy (the browser also enforces it, but the API must check).
  const origin = request.headers.get("origin");
  if (!origin || origin !== request.nextUrl.origin) return reject(403);

  // Verify rate-limit capacity before reading or forwarding visitor data.
  if (!(await withinRateLimit(request))) return reject(429);

  const body = await parseLimitedJson(request);
  if (!body) return reject(400);
  const name = clean(body.name, 100);
  const email = clean(body.email, 254);
  const organization = clean(body.organization ?? "", 120);
  const subject = clean(body.subject, 2);
  const message = clean(body.message, 2000);
  const turnstileToken = clean(body.token, 2048);
  const website = clean(body.website ?? "", 100);
  if (website === null) return reject(400);
  if (website) return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  if (!name || !email || !emailIsValid(email) || organization === null || !subject ||
      !VALID_SUBJECTS.has(subject) || !message || message.length < 10 || !turnstileToken ||
      body.consent !== true || (body.locale !== "fr" && body.locale !== "en")) return reject(400);

  const verificationResponse = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret, response: turnstileToken }),
    cache: "no-store", signal: AbortSignal.timeout(7000),
  }).catch(() => null);
  if (!verificationResponse?.ok) return reject(502);
  const verification: unknown = await verificationResponse.json().catch(() => null);
  if (!isRecord(verification) || verification.success !== true || verification.hostname !== expectedHostname) return reject(403);

  const locale = body.locale as Locale;
  const subjectLabel = SUBJECTS[locale][Number(subject)];
  const content = [
    `MBY Studio — ${subjectLabel}`,
    `Nom / Name: ${name}`,
    `Email: ${email}`,
    `Organisation / Organization: ${organization || "—"}`,
    `Langue / Language: ${locale}`,
    "", message,
  ].join("\n");
  const emailResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], reply_to: email,
      subject: `MBY Studio — ${subjectLabel}`, text: content }),
    cache: "no-store", signal: AbortSignal.timeout(9000),
  }).catch(() => null);
  if (!emailResponse?.ok) return reject(502);
  return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}
