
/**
 * MBY Studio — Atomic OTP-to-confirmation promotion
 * R2.21-I.14 | Local / Test only
 *
 * Verifies the active OTP challenge and creates its
 * confirmation in one Redis Lua operation.
 *
 * No email delivery or PostgreSQL access.
 * Not connected to public routes.
 */

import "server-only";

import {
  RECOMMENDATION_EMAIL_VERIFICATION as config,
} from "./recommendation-email-verification-config";

import {
  executeRecommendationOtpScript,
} from "./recommendation-otp-redis";

const HEX_FINGERPRINT = /^[a-f0-9]{64}$/;

const PROMOTE_SCRIPT = `
  -- KEYS[1]: OTP challenge
  -- KEYS[2]: active challenge pointer for this email
  -- KEYS[3]: new confirmation key

  -- ARGV[1]: submitted OTP fingerprint
  -- ARGV[2]: confirmation fingerprint
  -- ARGV[3]: maximum attempts
  -- ARGV[4]: confirmation TTL

  local active = redis.call('GET', KEYS[2])

  if active ~= KEYS[1] then
    return -1
  end

  if redis.call('EXISTS', KEYS[1]) == 0 then
    return -1
  end

  local attempts = tonumber(
    redis.call('HGET', KEYS[1], 'attempts') or '0'
  )

  local maxAttempts = tonumber(ARGV[3])

  if attempts >= maxAttempts then
    redis.call('DEL', KEYS[1])
    redis.call('DEL', KEYS[2])
    return -2
  end

  local expected = redis.call(
    'HGET', KEYS[1], 'fingerprint'
  )

  if expected ~= ARGV[1] then
    attempts = redis.call(
      'HINCRBY', KEYS[1], 'attempts', 1
    )

    if attempts >= maxAttempts then
      redis.call('DEL', KEYS[1])
      redis.call('DEL', KEYS[2])
      return -2
    end

    return 0
  end

  -- Never overwrite an existing confirmation.
  if redis.call('EXISTS', KEYS[3]) == 1 then
    return -3
  end

  redis.call(
    'SET',
    KEYS[3],
    ARGV[2],
    'EX',
    tonumber(ARGV[4]),
    'NX'
  )

  -- The OTP can no longer be used.
  redis.call('DEL', KEYS[1])
  redis.call('DEL', KEYS[2])

  return 1
`;

export type OtpPromotionResult =
  | "confirmed"
  | "incorrect"
  | "expired"
  | "locked"
  | "collision"
  | "unavailable";

type PromotionKeys = {
  challengeKey: string;
  activeKey: string;
  confirmationKey: string;
};

/**
 * Promote an active, valid OTP to a temporary
 * confirmation without an intermediate gap.
 *
 * Only trusted server code may construct these keys
 * and cryptographic fingerprints.
 */
export async function promoteRecommendationOtp(
  keys: PromotionKeys,
  otpFingerprint: string,
  confirmationFingerprint: string
): Promise<OtpPromotionResult> {
  const prefix = config.redisPrefix;

  if (
    !keys.challengeKey.startsWith(`${prefix}:challenge:`) ||
    !keys.activeKey.startsWith(`${prefix}:active:`) ||
    !keys.confirmationKey.startsWith(
      `${prefix}:confirmation:`
    ) ||
    !HEX_FINGERPRINT.test(otpFingerprint) ||
    !HEX_FINGERPRINT.test(confirmationFingerprint)
  ) {
    return "unavailable";
  }

  const response = await executeRecommendationOtpScript(
    PROMOTE_SCRIPT,
    [
      keys.challengeKey,
      keys.activeKey,
      keys.confirmationKey,
    ],
    [
      otpFingerprint,
      confirmationFingerprint,
      String(config.maxAttempts),
      "600",
    ]
  );

  if (!response.ok) return "unavailable";

  switch (response.result) {
    case 1:
      return "confirmed";
    case 0:
      return "incorrect";
    case -1:
      return "expired";
    case -2:
      return "locked";
    case -3:
      return "collision";
    default:
      return "unavailable";
  }
}
