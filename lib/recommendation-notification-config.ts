/**
 * MBY Consulting — Recommendation notification configuration
 *
 * NOTIF V1.0
 * Server-side only.
 * Independent rollout controls.
 * Production requires independent explicit activation.
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

export type NotificationEnvironment = "test" | "production";

export function getNotificationEnvironment(): NotificationEnvironment | null {
  if (process.env.VERCEL_ENV === "production") return "production";
  if (process.env.VERCEL_ENV === "preview") return "test";
  if (!process.env.VERCEL_ENV && process.env.NODE_ENV === "development") {
    return "test";
  }
  return null;
}

export function isNotificationWorkerEnabled(): boolean {
  const environment = getNotificationEnvironment();
  if (process.env.MBY_RECOMMENDATIONS_NOTIFICATIONS_ENABLED !== "true") {
    return false;
  }
  if (environment === "production") {
    return process.env.MBY_RECOMMENDATIONS_NOTIFICATIONS_PRODUCTION_ENABLED === "true";
  }
  return environment === "test";
}

export function isNotificationRecipient(value: unknown): value is string {
  return typeof value === "string" && value.length <= 254 &&
    /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value);
}

export function getNotificationConfig() {
  const environment = getNotificationEnvironment();
  const databaseUrl = process.env.MBY_NOTIFICATIONS_DATABASE_URL;
  const cronSecret = process.env.CRON_SECRET;
  const resendApiKey = process.env.RESEND_API_KEY;
  const mailFrom = process.env.MBY_MAIL_FROM;
  const testRecipient = process.env.MBY_NOTIFICATIONS_TEST_RECIPIENT?.trim();

  if (!environment || !isNotificationWorkerEnabled() || !databaseUrl ||
      !cronSecret || cronSecret.length < 32 || !resendApiKey || !mailFrom) {
    throw new Error("Invalid notification configuration.");
  }
  if (environment === "test") {
    if (!isNotificationRecipient(testRecipient)) {
      throw new Error("Invalid test notification configuration.");
    }
    return { environment, databaseUrl, cronSecret, resendApiKey, mailFrom, testRecipient } as const;
  }
  // No test override or Resend sandbox sender in production.
  if (process.env.MBY_NOTIFICATIONS_TEST_RECIPIENT !== undefined ||
      /@resend\.dev\b/i.test(mailFrom)) {
    throw new Error("Invalid production notification configuration.");
  }
  return { environment, databaseUrl, cronSecret, resendApiKey, mailFrom } as const;
}
