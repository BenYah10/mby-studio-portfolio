
/**
 * MBY Studio — Recommendation email confirmation token
 * R2.21-I.12 | Local / Test only
 *
 * Generates opaque confirmation tokens and keyed fingerprints.
 *
 * No Redis access, email delivery or publication.
 * Single-use enforcement must be implemented atomically
 * in the server-side confirmation store.
 */

import "server-only";

import {
  createHmac,
  randomBytes,
  timingSafeEqual,
} from "node:crypto";

const TOKEN_BYTES = 32;

const TOKEN_PATTERN = /^[a-f0-9]{64}$/;

/**
 * Generate an unpredictable confirmation token.
 * The raw token must only be returned to the verified
 * requester and must never appear in logs.
 */
export function generateRecommendationConfirmationToken(): string {
  return randomBytes(TOKEN_BYTES).toString("hex");
}

/**
 * Bind a confirmation token to the exact submission
 * fingerprint and its associated OTP challenge.
 *
 * All arguments must originate from validated server data.
 */
export function fingerprintRecommendationConfirmation(
  token: string,
  submissionFingerprint: string,
  challengeId: string,
  secret: string
): string {
  if (
    !TOKEN_PATTERN.test(token) ||
    !TOKEN_PATTERN.test(submissionFingerprint) ||
    !/^[0-9a-f-]{36}$/i.test(challengeId) ||
    secret.length < 32
  ) {
    throw new Error("Invalid confirmation parameters");
  }

  return createHmac("sha256", secret)
    .update(
      JSON.stringify([
        "mby-recommendation-confirmation-v1",
        token,
        submissionFingerprint,
        challengeId,
      ])
    )
    .digest("hex");
}

/**
 * Compare confirmation fingerprints.
 * This checks integrity, not expiration or single use.
 */
export function verifyRecommendationConfirmationFingerprint(
  provided: string,
  expected: string
): boolean {
  if (
    !TOKEN_PATTERN.test(provided) ||
    !TOKEN_PATTERN.test(expected)
  ) {
    return false;
  }

  return timingSafeEqual(
    Buffer.from(provided, "hex"),
    Buffer.from(expected, "hex")
  );
}
