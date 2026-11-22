
/**
 * MBY Studio — Recommendation confirmation store
 * R2.21-I.13 | Local / Test only
 *
 * Atomic Redis operations for temporary confirmation tokens.
 *
 * This module does not verify OTP codes, send emails,
 * write to PostgreSQL or authorize public collection.
 */

import "server-only";

import {
  RECOMMENDATION_EMAIL_VERIFICATION as config,
} from "./recommendation-email-verification-config";

import {
  executeRecommendationOtpScript,
} from "./recommendation-otp-redis";

const CONFIRMATION_TTL_SECONDS = 600;

const FINGERPRINT_PATTERN = /^[a-f0-9]{64}$/;

const CONFIRMATION_KEY_PATTERN = new RegExp(
  `^${config.redisPrefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}` +
  `:confirmation:[a-f0-9]{64}$`
);

/**
 * Store a confirmation fingerprint only if its key
 * does not already exist.
 *
 * This does not establish that the OTP was verified.
 * That guarantee belongs to the future promotion workflow.
 */
const CREATE_CONFIRMATION_SCRIPT = `
  if redis.call('EXISTS', KEYS[1]) == 1 then
    return 0
  end

  redis.call(
    'SET',
    KEYS[1],
    ARGV[1],
    'EX',
    tonumber(ARGV[2]),
    'NX'
  )

  return 1
`;

/**
 * Atomically compare and consume the confirmation.
 *
 *  1 = valid and consumed
 *  0 = fingerprint mismatch
 * -1 = missing, expired or previously consumed
 */
const CONSUME_CONFIRMATION_SCRIPT = `
  local expected = redis.call('GET', KEYS[1])

  if not expected then
    return -1
  end

  if expected ~= ARGV[1] then
    return 0
  end

  redis.call('DEL', KEYS[1])
  return 1
`;

export type ConfirmationConsumptionResult =
  | "consumed"
  | "mismatch"
  | "expired"
  | "unavailable";

/**
 * Derive an opaque Redis key from a server-generated
 * token fingerprint. Never put the raw token in a key.
 */
export function recommendationConfirmationKey(
  tokenFingerprint: string
): string {
  if (!FINGERPRINT_PATTERN.test(tokenFingerprint)) {
    throw new Error("Invalid confirmation fingerprint");
  }

  return `${config.redisPrefix}:confirmation:${tokenFingerprint}`;
}

/**
 * Preliminary storage helper.
 *
 * Must only be called by trusted server-side code.
 */
export async function storeRecommendationConfirmation(
  key: string,
  fingerprint: string
): Promise<boolean> {
  if (
    !CONFIRMATION_KEY_PATTERN.test(key) ||
    !FINGERPRINT_PATTERN.test(fingerprint)
  ) {
    return false;
  }

  const response = await executeRecommendationOtpScript(
    CREATE_CONFIRMATION_SCRIPT,
    [key],
    [fingerprint, String(CONFIRMATION_TTL_SECONDS)]
  );

  return response.ok && response.result === 1;
}

/**
 * Consume a confirmation with a single atomic script.
 */
export async function consumeRecommendationConfirmation(
  key: string,
  fingerprint: string
): Promise<ConfirmationConsumptionResult> {
  if (
    !CONFIRMATION_KEY_PATTERN.test(key) ||
    !FINGERPRINT_PATTERN.test(fingerprint)
  ) {
    return "unavailable";
  }

  const response = await executeRecommendationOtpScript(
    CONSUME_CONFIRMATION_SCRIPT,
    [key],
    [fingerprint]
  );

  if (!response.ok) return "unavailable";

  switch (response.result) {
    case 1:
      return "consumed";
    case 0:
      return "mismatch";
    case -1:
      return "expired";
    default:
      return "unavailable";
  }
}
