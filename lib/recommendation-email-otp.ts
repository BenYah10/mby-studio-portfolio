
/**
 * MBY Studio — Recommendation email OTP utilities
 * R2.21-I.6 | Local cryptographic utilities
 *
 * Generates and verifies six-digit email verification codes.
 * Never store or log plaintext OTP codes.
 *
 * Does not send emails, access Redis, or authorize submissions.
 */

import {
  createHmac,
  randomInt,
  timingSafeEqual,
} from "node:crypto";

import {
  RECOMMENDATION_EMAIL_VERIFICATION,
} from "./recommendation-email-verification-config";

/**
 * Generate a cryptographically secure numeric verification code.
 */
export function generateRecommendationOtp(): string {
  const max = 10 ** RECOMMENDATION_EMAIL_VERIFICATION.codeLength;

  return randomInt(0, max)
    .toString()
    .padStart(
      RECOMMENDATION_EMAIL_VERIFICATION.codeLength,
      "0"
    );
}

/**
 * Produce a keyed fingerprint of a verification code.
 *
 * The challengeId and normalized email bind the code to
 * a specific verification request.
 *
 * The secret must be stored outside source code.
 */
export function fingerprintRecommendationOtp(
  code: string,
  challengeId: string,
  email: string,
  secret: string
): string {
  return createHmac("sha256", secret)
    .update(
      JSON.stringify([
        "mby-recommendation-otp-v1",
        challengeId,
        email.trim().toLowerCase(),
        code,
      ])
    )
    .digest("hex");
}

/**
 * Compare two hexadecimal fingerprints in constant time.
 */
export function verifyRecommendationOtpFingerprint(
  providedFingerprint: string,
  expectedFingerprint: string
): boolean {
  if (
    !/^[a-f0-9]{64}$/.test(providedFingerprint) ||
    !/^[a-f0-9]{64}$/.test(expectedFingerprint)
  ) {
    return false;
  }

  const provided = Buffer.from(providedFingerprint, "hex");
  const expected = Buffer.from(expectedFingerprint, "hex");

  return timingSafeEqual(provided, expected);
}
