
/**
 * MBY Studio — OTP issuance and atomic rate limiting
 * R2.21-I.15 | Local and Test only — prefix validation hardening
 *
 * Creates a challenge while enforcing cooldown and
 * per-email / per-network request limits atomically.
 *
 * No email delivery or public endpoints.
 */

import "server-only";

import {
  RECOMMENDATION_EMAIL_VERIFICATION as config,
} from "./recommendation-email-verification-config";

import {
  executeRecommendationOtpScript,
} from "./recommendation-otp-redis";

type IssueResult =
  | "created"
  | "cooldown"
  | "email_limit"
  | "network_limit"
  | "unavailable";

type IssueKeys = {
  challengeKey: string;
  activeKey: string;
  cooldownKey: string;
  emailLimitKey: string;
  networkLimitKey: string;
};

const ISSUE_SCRIPT = `
  -- Check limits before modifying any keys.
  if redis.call('EXISTS', KEYS[1]) == 1 then
    return -4
  end

  if redis.call('EXISTS', KEYS[3]) == 1 then
    return -1
  end

  local emailCount = tonumber(
    redis.call('GET', KEYS[4]) or '0'
  )

  if emailCount >= tonumber(ARGV[4]) then
    return -2
  end

  local networkCount = tonumber(
    redis.call('GET', KEYS[5]) or '0'
  )

  if networkCount >= tonumber(ARGV[5]) then
    return -3
  end

  -- Invalidate the previous challenge for this email.
  local previousKey = redis.call('GET', KEYS[2])

  if previousKey and string.sub(previousKey, 1, string.len(ARGV[6])) == ARGV[6] then
    redis.call('DEL', previousKey)
  end

  -- Create the new challenge and its expiration.
  redis.call(
    'HSET',
    KEYS[1],
    'fingerprint', ARGV[1],
    'attempts', 0
  )

  redis.call('EXPIRE', KEYS[1], tonumber(ARGV[2]))

  -- Remember the active challenge.
  redis.call(
    'SET', KEYS[2], KEYS[1],
    'EX', tonumber(ARGV[2])
  )

  -- Prevent immediate resending.
  redis.call(
    'SET', KEYS[3], '1',
    'EX', tonumber(ARGV[3])
  )

  -- Fixed-window email request counter.
  local newEmailCount = redis.call(
    'INCR', KEYS[4]
  )

  if newEmailCount == 1 then
    redis.call('EXPIRE', KEYS[4], 3600)
  end

  -- Fixed-window network request counter.
  local newNetworkCount = redis.call(
    'INCR', KEYS[5]
  )

  if newNetworkCount == 1 then
    redis.call('EXPIRE', KEYS[5], 3600)
  end

  return 1
`;

export async function issueRecommendationOtpChallenge(
  keys: IssueKeys,
  fingerprint: string
): Promise<IssueResult> {
  const prefix = `${config.redisPrefix}:`;

  if (
    !keys.challengeKey.startsWith(`${prefix}challenge:`) ||
    !keys.activeKey.startsWith(`${prefix}active:`) ||
    !keys.cooldownKey.startsWith(`${prefix}cooldown:`) ||
    !keys.emailLimitKey.startsWith(`${prefix}limit:`) ||
    !keys.networkLimitKey.startsWith(`${prefix}network:`) ||
    !/^[a-f0-9]{64}$/.test(fingerprint)
  ) {
    return "unavailable";
  }

  const response = await executeRecommendationOtpScript(
    ISSUE_SCRIPT,
    [
      keys.challengeKey,
      keys.activeKey,
      keys.cooldownKey,
      keys.emailLimitKey,
      keys.networkLimitKey,
    ],
    [
      fingerprint,
      String(config.expiresInSeconds),
      String(config.resendCooldownSeconds),
      String(config.maxRequestsPerEmailPerHour),
      String(config.maxRequestsPerIpPerHour),
      `${config.redisPrefix}:challenge:`,
    ]
  );

  if (!response.ok) return "unavailable";

  switch (response.result) {
    case 1:
      return "created";
    case -1:
      return "cooldown";
    case -2:
      return "email_limit";
    case -3:
      return "network_limit";
    default:
      return "unavailable";
  }
}
