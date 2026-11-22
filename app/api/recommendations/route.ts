/**
 * MBY Studio — Recommendations submission API
 * R2.21-I.15 | Deploy-safe, verification-gated, TEST ONLY.
 *
 * Fail closed, human review required, no automatic publication.
 * Never log personal data, database credentials or Turnstile tokens.
 */

import { NextRequest, NextResponse } from "next/server";
import { createHash } from "node:crypto";

import {
  buildRecommendationConsents,
} from "../../../lib/recommendation-consent-validation";

import {
  validatePublicationConsistency,
} from "../../../lib/recommendation-publication-validation";

import { normalizeLinkedInProfileUrl } from "../../../lib/recommendation-linkedin";
import { fingerprintRecommendationSubmission } from "../../../lib/recommendation-submission-fingerprint";
import { fingerprintRecommendationConfirmation } from "../../../lib/recommendation-email-confirmation";
import { recommendationConfirmationKey, consumeRecommendationConfirmation } from "../../../lib/recommendation-confirmation-store";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 14_000;
const WINDOW_SECONDS = 15 * 60;
const MAX_REQUESTS = 5;

function reject(status: number) {
  return NextResponse.json(
    { ok: false },
    { status, headers: { "Cache-Control": "no-store" } }
  );
}

function isRecord(
  value: unknown
): value is Record<string, unknown> {
  return typeof value === "object" &&
    value !== null &&
    !Array.isArray(value);
}

function clean(
  value: unknown,
  maximum: number,
  minimum = 0
): string | null {
  if (
    typeof value !== "string" ||
    value.length > maximum ||
    value.includes("\0")
  ) return null;

  const result = value.trim();
  return result.length >= minimum ? result : null;
}

async function parseLimitedJson(
  request: Request
): Promise<Record<string, unknown> | null> {
  const contentType =
    (request.headers.get("content-type") ?? "").toLowerCase();

  if (!contentType.startsWith("application/json")) return null;

  const statedLength = request.headers.get("content-length");

  if (
    statedLength !== null &&
    (!/^\d+$/.test(statedLength) ||
      Number(statedLength) > MAX_BODY_BYTES)
  ) return null;

  if (!request.body) return null;

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      total += value.byteLength;

      if (total > MAX_BODY_BYTES) {
        await reader.cancel().catch(() => undefined);
        return null;
      }

      chunks.push(value);
    }

    const bytes = new Uint8Array(total);
    let offset = 0;

    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.byteLength;
    }

    const decoded = new TextDecoder(
      "utf-8",
      { fatal: true }
    ).decode(bytes);

    const parsed: unknown = JSON.parse(decoded);
    return isRecord(parsed) ? parsed : null;
  } catch {
    return null;
  } finally {
    reader.releaseLock();
  }
}

async function withinRateLimit(
  request: NextRequest
): Promise<boolean> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  const salt = process.env.MBY_RATE_LIMIT_SALT;

  if (
    !url?.startsWith("https://") ||
    !token ||
    !salt ||
    salt.length < 24
  ) return false;

  const deployed = process.env.VERCEL === "1";

  const forwarded = request.headers
    .get("x-vercel-forwarded-for")
    ?.split(",")[0]
    ?.trim();

  const identity = deployed
    ? forwarded
    : process.env.NODE_ENV === "development"
      ? "local-development"
      : undefined;

  if (!identity) return false;

  const fingerprint = createHash("sha256")
    .update(`${salt}:${identity}`)
    .digest("hex");

  const key = `mby:recommendations:v1:${fingerprint}`;

  const script =
    "local n=redis.call('INCR',KEYS[1]); " +
    "if n==1 then redis.call('EXPIRE',KEYS[1],ARGV[1]); " +
    "end; return n";

  try {
    const response = await fetch(url.replace(/\/$/, ""), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        "EVAL",
        script,
        "1",
        key,
        String(WINDOW_SECONDS),
      ]),
      cache: "no-store",
      signal: AbortSignal.timeout(3500),
    });

    if (!response.ok) return false;

    const result: unknown = await response.json();
    return isRecord(result) &&
      typeof result.result === "number" &&
      result.result <= MAX_REQUESTS;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  // Production is explicitly blocked during the pilot.
  if (process.env.VERCEL_ENV === "production") {
    return reject(503);
  }

  if (
    process.env.MBY_RECOMMENDATIONS_FORM_ENABLED !== "true" ||
    process.env.MBY_RECOMMENDATIONS_VERIFICATION_ENABLED !== "true"
  ) {
    return reject(503);
  }

  // No confirmation means no submission, even if other toggles were enabled.
  // Production remains blocked independently above.
  const confirmationSecret = process.env.MBY_RECOMMENDATIONS_OTP_HMAC_SECRET;
  if (!confirmationSecret || confirmationSecret.length < 32) return reject(503);

  const secret = process.env.MBY_TURNSTILE_SECRET;
  const hostname = process.env.MBY_TURNSTILE_HOSTNAME;

  if (
    !secret ||
    !hostname ||
    !process.env.MBY_RECOMMENDATIONS_DATABASE_URL
  ) return reject(503);

  const origin = request.headers.get("origin");

  if (!origin || origin !== request.nextUrl.origin) {
    return reject(403);
  }

  if (!(await withinRateLimit(request))) {
    return reject(429);
  }

  const body = await parseLimitedJson(request);
  if (!body) return reject(400);

  const allowedFields = new Set([
    "author_full_name",
    "author_email",
    "professional_role",
    "organization_name",
    "industry_sector",
    "professional_relationship",
    "linkedin_url",
    "locale",
    "quote",
    "consents",
    "token",
    "website",
    "challenge_id",
    "confirmation_token",
  ]);

  if (
    Object.keys(body).some(
      (field) => !allowedFields.has(field)
    )
  ) return reject(400);

  const website = clean(body.website ?? "", 100);

  if (website === null) return reject(400);

  // Honeypot: do not save spam submissions.
  if (website) {
    return NextResponse.json(
      { ok: true },
      { headers: { "Cache-Control": "no-store" } }
    );
  }

  const name = clean(body.author_full_name, 120, 2);
  const email = clean(body.author_email, 254, 3);
  const role = clean(body.professional_role, 150, 2);
  const organization = clean(body.organization_name ?? "", 180);
  const sector = clean(body.industry_sector ?? "", 120);
  const relationship = clean(
    body.professional_relationship, 250, 5
 );
  const linkedin = clean(body.linkedin_url, 500, 1);
  const quote = clean(body.quote, 4000, 20);
  const token = clean(body.token, 2048, 1);
  const challengeId = clean(body.challenge_id, 36, 36);
  const confirmationToken = clean(body.confirmation_token, 64, 64);
  const locale = body.locale;

  if (
    !name ||
    !email ||
    !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email) ||
    !role ||
    organization === null ||
    sector === null ||
    (!organization && !sector) ||
    !relationship ||
    !linkedin ||
    !quote ||
    !token ||
    !challengeId ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(challengeId) ||
    !confirmationToken ||
    !/^[a-f0-9]{64}$/.test(confirmationToken) ||
    (locale !== "fr" && locale !== "en")
  ) return reject(400);

  // Shared LinkedIn validation and canonicalization.
  // Format validation does not establish profile ownership.
  const normalizedLinkedin = normalizeLinkedInProfileUrl(linkedin);
  if (!normalizedLinkedin) return reject(400);

  // Normalize the explicitly approved LinkedIn URL.
  // Never create consent or change its granted status.
  const normalizedConsentInputs = Array.isArray(body.consents)
  ? body.consents.map((entry: unknown) => {
      if (
        !isRecord(entry) ||
        entry.type !== "publish_linkedin" ||
        entry.granted !== true ||
        typeof entry.value !== "string"
      ) {
        return entry;
      }

      const normalizedApprovedUrl =
        normalizeLinkedInProfileUrl(entry.value);

      return normalizedApprovedUrl
        ? { ...entry, value: normalizedApprovedUrl }
        : entry;
    })
  : body.consents;

  const consents = buildRecommendationConsents(
    locale,
    normalizedConsentInputs
  );

  if (!consents) return reject(400);

  if (!validatePublicationConsistency({
    locale,
    author_full_name: name,
    professional_role: role,
    organization_name: organization,
    professional_relationship: relationship,
    linkedin_url: normalizedLinkedin,
  }, consents)) return reject(400);

  // Turnstile is verified server-side before any DB write.
  const verificationResponse = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret,
        response: token,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(7000),
    }
  ).catch(() => null);

  if (!verificationResponse?.ok) return reject(502);

  const verification: unknown =
    await verificationResponse.json().catch(() => null);

  if (
    !isRecord(verification) ||
    verification.success !== true ||
    verification.hostname !== hostname
  ) return reject(403);

  const payload = {
    author_full_name: name,
    author_email: email,
    professional_role: role,
    organization_name: organization || null,
    professional_relationship: relationship,
    linkedin_url: normalizedLinkedin,
    industry_sector: sector || null,
    locale: locale as "fr" | "en",
    quote,
    consents,
  };

  // The exact normalized submission must have been verified by email.
  // Consume the approval atomically BEFORE any PostgreSQL write.
  // This is intentionally fail-closed: an expired/reused/mismatched token
  // cannot reach the database, even through direct API requests.
  let confirmationFingerprint: string;
  try {
    const submissionFingerprint = fingerprintRecommendationSubmission(
      payload, confirmationSecret
    );
    confirmationFingerprint = fingerprintRecommendationConfirmation(
      confirmationToken, submissionFingerprint, challengeId, confirmationSecret
    );
  } catch {
    return reject(503);
  }

  const confirmationKey = recommendationConfirmationKey(confirmationFingerprint);
  const consumption = await consumeRecommendationConfirmation(
    confirmationKey, confirmationFingerprint
  );
  if (consumption !== "consumed") return reject(403);

  try {
    // Lazy loading avoids initializing the DB connection
    // while collecting Next.js build-time route metadata.
    const { recommendationsDb } =
      await import("../../../lib/recommendations-db");

    // Parameterized query: visitor data is never SQL code.
    const result = await recommendationsDb`
      SELECT mby_private.create_recommendation_pending(
        ${JSON.stringify(payload)}::jsonb
      ) AS submission_id
    `;

    if (
      result.length !== 1 ||
      typeof result[0]?.submission_id !== "string"
    ) return reject(503);

    return NextResponse.json(
      { ok: true },
      { status: 201, headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    // Do not expose database errors or personal information.
    return reject(503);
  }
}
