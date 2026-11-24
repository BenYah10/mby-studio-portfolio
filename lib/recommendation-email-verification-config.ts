
/**
 * MBY Studio — Recommendation email verification
 * R2.21-I.5 | Configuration draft
 *
 * No email delivery or public activation.
 */

export const RECOMMENDATION_EMAIL_VERIFICATION = {
  codeLength: 6,
  expiresInSeconds: 600,
  maxAttempts: 5,
  resendCooldownSeconds: 60,
  maxRequestsPerEmailPerHour: 3,
  maxRequestsPerIpPerHour: 10,
  redisPrefix: "mby:recommendations:email:v1",
} as const;
