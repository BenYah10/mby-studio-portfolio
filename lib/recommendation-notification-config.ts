/**
 * MBY Consulting — Recommendation notification configuration
 *
 * NOTIF V1.0
 * Server-side only.
 * Independent rollout controls.
 * Production remains disabled during integration.
 */

import "server-only";

export const NOTIFICATION_LIMITS = {
  batchSize: 10,
  maxAttempts: 3,
  providerTimeoutMs: 9000,
  leaseDurationSeconds: 300,
} as const;

export type NotificationLocale = "fr" | "en";

export type NotificationEvent =
  | "submission_received"
  | "recommendation_published"
  | "recommendation_withdrawn";

export function isNotificationWorkerEnabled(): boolean {
  if (
    process.env.MBY_RECOMMENDATIONS_NOTIFICATIONS_ENABLED !== "true"
  ) {
    return false;
  }

  // Production activation requires a separate validated rollout.
  if (process.env.VERCEL_ENV === "production") {
    return false;
  }

  return (
    process.env.VERCEL_ENV === "preview" ||
    process.env.NODE_ENV === "development"
  );
}

export function getNotificationConfig() {
  const databaseUrl =
    process.env.MBY_NOTIFICATIONS_DATABASE_URL;

  const cronSecret =
    process.env.CRON_SECRET;

  const resendApiKey =
    process.env.RESEND_API_KEY;

  const mailFrom =
    process.env.MBY_MAIL_FROM;

  const testRecipient =
    process.env.MBY_NOTIFICATIONS_TEST_RECIPIENT?.trim();

  if (
    !databaseUrl ||
    !cronSecret ||
    cronSecret.length < 32 ||
    !resendApiKey ||
    !mailFrom ||
    !testRecipient ||
    testRecipient.length > 254 ||
    !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(testRecipient)
  ) {
    throw new Error("Invalid notification configuration.");
  }

  return {
    databaseUrl,
    cronSecret,
    resendApiKey,
    mailFrom,
    testRecipient,
  };
}