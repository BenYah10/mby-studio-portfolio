/**
 * MBY Consulting — Notification processing worker
 *
 * NOTIF V1.0
 * Orchestrates restricted PostgreSQL functions.
 * Sequential delivery with bounded execution.
 * No direct table access.
 * No personal information in logs or responses.
 */

import "server-only";

import { getNotificationDb } from
  "./recommendation-notification-db";

import {
  isNotificationWorkerEnabled,
  getNotificationConfig,
  isNotificationRecipient,
  NOTIFICATION_LIMITS,
} from "./recommendation-notification-config";

import type {
  NotificationEvent,
  NotificationLocale,
} from "./recommendation-notification-config";

import { buildNotificationEmail } from
  "./recommendation-notification-copy";

import { sendNotificationEmail } from
  "./recommendation-notification-resend";

// ============================================================
// 1. Database contracts
// ============================================================

type ClaimedNotification = {
  notification_id: string;
  event_type: NotificationEvent;
  locale: NotificationLocale;
  processing_token: string;
  attempt_count: number;
};

type ValidatedNotification = {
  notification_id: string;
  event_type: NotificationEvent;
  locale: NotificationLocale;
  is_test: boolean;
  author_email?: unknown;
};

type RecoveryResult = {
  recovered_count: string | number;
  failed_count: string | number;
  cancelled_count: string | number;
};

type FailureResult = {
  result: string;
};

export type NotificationWorkerResult = {
  recovered: number;
  claimed: number;
  sent: number;
  retried: number;
  failed: number;
  cancelled: number;
  unresolved: number;
};

// ============================================================
// 2. Worker
// ============================================================

export async function runNotificationWorker():
  Promise<NotificationWorkerResult> {

  if (!isNotificationWorkerEnabled()) {
    throw new Error("Notification worker disabled.");
  }

  const config = getNotificationConfig();
  const db = getNotificationDb();

  const startedAt = Date.now();

  const result: NotificationWorkerResult = {
    recovered: 0,
    claimed: 0,
    sent: 0,
    retried: 0,
    failed: 0,
    cancelled: 0,
    unresolved: 0,
  };

  // Recover expired reservations and obsolete events.

  const recovery = await db<RecoveryResult[]>`
    SELECT *
    FROM mby_private.recover_recommendation_notifications()
  `;

  if (recovery.length !== 1) {
    throw new Error("Invalid notification recovery result.");
  }

  result.recovered =
    Number(recovery[0].recovered_count);

  result.failed =
    Number(recovery[0].failed_count);

  result.cancelled =
    Number(recovery[0].cancelled_count);

  // Claim one notification at a time.
  // Avoid reserving notifications that may not be processed
  // before the execution deadline.

  for (
    let index = 0;
    index < NOTIFICATION_LIMITS.batchSize;
    index++
  ) {

    if (Date.now() - startedAt >= 100_000) {
      break;
    }

    const claimed = await db<ClaimedNotification[]>`
      SELECT *
      FROM mby_private.claim_recommendation_notifications(1)
    `;

    if (claimed.length === 0) {
      break;
    }

    if (claimed.length !== 1) {
      throw new Error("Invalid notification claim result.");
    }

    const item = claimed[0];

    result.claimed++;

    try {

      const validated =
        await db<ValidatedNotification[]>`
          SELECT *
          FROM mby_private.validate_recommendation_notification(
            ${item.notification_id}::uuid,
            ${item.processing_token}::uuid
          )
        `;

      const notification = validated[0];

      // A mismatched database contract is an infrastructure error,
      // not a business cancellation. Preserve the reservation for recovery.
      if (notification && (
        notification.is_test !== (config.environment === "test") ||
        (config.environment === "test" && notification.author_email !== undefined) ||
        (config.environment === "production" &&
          !isNotificationRecipient(notification.author_email))
      )) {
        result.unresolved++;
        break;
      }

      // Fail closed for invalid or obsolete reservations.

      if (
        validated.length !== 1 ||
        !notification ||
        notification.notification_id !==
          item.notification_id ||
        notification.event_type !== item.event_type ||
        notification.locale !== item.locale ||
        ![
          "submission_received",
          "recommendation_published",
          "recommendation_withdrawn",
        ].includes(notification.event_type) ||
        !["fr", "en"].includes(notification.locale)
      ) {

        const outcome = await db<FailureResult[]>`
          SELECT
            mby_private.fail_recommendation_notification(
              ${item.notification_id}::uuid,
              ${item.processing_token}::uuid,
              'notification_ineligible'
            ) AS result
        `;

        if (outcome[0]?.result === "cancelled") {
          result.cancelled++;
        } else {
          result.unresolved++;
        }

        continue;
      }

      const email = buildNotificationEmail(
        notification.event_type,
        notification.locale
      );

      const delivery = await sendNotificationEmail(
        item.notification_id,
        email,
        notification.author_email
      );

      if (delivery.ok) {

        const completed = await db<
          { result: boolean }[]
        >`
          SELECT
            mby_private.complete_recommendation_notification(
              ${item.notification_id}::uuid,
              ${item.processing_token}::uuid,
              ${delivery.providerMessageId}
            ) AS result
        `;

        if (completed[0]?.result === true) {
          result.sent++;
        } else {
          result.unresolved++;
        }

        continue;
      }

      const failure = await db<FailureResult[]>`
        SELECT
          mby_private.fail_recommendation_notification(
            ${item.notification_id}::uuid,
            ${item.processing_token}::uuid,
            ${delivery.errorCode}
          ) AS result
      `;

      switch (failure[0]?.result) {

        case "pending":
          result.retried++;
          break;

        case "failed":
          result.failed++;
          break;

        case "cancelled":
          result.cancelled++;
          break;

        default:
          result.unresolved++;
      }

      // Stop the batch on global provider/configuration errors.

      if (
        delivery.errorCode ===
          "provider_authentication_failed" ||
        delivery.errorCode === "configuration_error" ||
        delivery.errorCode === "provider_rate_limited"
      ) {
        break;
      }

    } catch {

      // Do not blindly resend when provider acceptance
      // or database completion may have occurred.
      // Leave the reservation for controlled recovery.

      result.unresolved++;

      break;
    }
  }

  return result;
}
