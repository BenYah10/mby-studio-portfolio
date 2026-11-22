
/**
 * MBY Studio — Recommendation OTP Redis key generation
 * R2.21-I.8.5 | Local / Test only
 *
 * Produces purpose-separated Redis keys.
 * Never stores plaintext email addresses in key names.
 *
 * This module does not connect to Redis or send emails.
 */

import "server-only";

import { createHmac, randomUUID } from "node:crypto";

import {
  RECOMMENDATION_EMAIL_VERIFICATION as config,
} from "./recommendation-email-verification-config";

const CHALLENGE_ID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function fingerprint(
  purpose: string,
  value: string,
  secret: string
): string {
  if (secret.length < 24) {
    throw new Error("OTP key configuration unavailable");
  }

  return createHmac("sha256", secret)
    .update(JSON.stringify([purpose, value]))
    .digest("hex");
}

/**
 * Generate a new unpredictable challenge identifier.
 */
export function createRecommendationChallengeId(): string {
  return randomUUID();
}

/**
 * Identify an OTP challenge without exposing its email.
 */
export function recommendationChallengeKey(
  challengeId: string
): string {
  if (!CHALLENGE_ID_PATTERN.test(challengeId)) {
    throw new Error("Invalid challenge identifier");
  }

  return `${config.redisPrefix}:challenge:${challengeId.toLowerCase()}`;
}

/**
 * Generate an opaque email-based key for cooldowns
 * and rate limits. Input must be validated server-side.
 */
export function recommendationEmailKey(
  email: string,
  purpose: "cooldown" | "limit" | "active",
  secret: string
): string {
  const normalizedEmail = email.trim().toLowerCase();

  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail) ||
    normalizedEmail.length > 254
  ) {
    throw new Error("Invalid email");
  }

  const digest = fingerprint(
    `mby-recommendation-email-${purpose}-v1`,
    normalizedEmail,
    secret
  );

  return `${config.redisPrefix}:${purpose}:${digest}`;
}
