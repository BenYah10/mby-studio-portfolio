/**
 * MBY Consulting — Transactional notification delivery
 *
 * NOTIF V1.0
 * Resend HTTP API.
 * Stable idempotency key.
 * Environment-bound recipient selection.
 * No raw provider responses or personal data logged.
 */

import "server-only";

import {
  getNotificationConfig,
  isNotificationRecipient,
  isNotificationWorkerEnabled,
  NOTIFICATION_LIMITS,
} from "./recommendation-notification-config";

import type {
  NotificationEmail,
} from "./recommendation-notification-copy";

export type NotificationErrorCode =
  | "provider_timeout"
  | "provider_rate_limited"
  | "provider_unavailable"
  | "network_error"
  | "provider_response_invalid"
  | "provider_rejected"
  | "provider_authentication_failed"
  | "configuration_error"
  | "notification_ineligible";

export type NotificationSendResult =
  | {
      ok: true;
      providerMessageId: string;
    }
  | {
      ok: false;
      errorCode: NotificationErrorCode;
    };

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function sendNotificationEmail(
  notificationId: string,
  email: NotificationEmail,
  authorEmail: unknown
): Promise<NotificationSendResult> {

  if (
    !isNotificationWorkerEnabled() ||
    !UUID_PATTERN.test(notificationId)
  ) {
    return {
      ok: false,
      errorCode: "configuration_error",
    };
  }

  const config = getNotificationConfig();
  // Never use a supplied author address outside Production.
  const recipient = config.environment === "test"
    ? config.testRecipient
    : authorEmail;

  if (!isNotificationRecipient(recipient) ||
      (config.environment === "test" && authorEmail !== undefined)) {
    return { ok: false, errorCode: "configuration_error" };
  }

  try {

    const response = await fetch(
      "https://api.resend.com/emails",
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${config.resendApiKey}`,
          "Content-Type": "application/json",
          "Idempotency-Key":
            `mby-recommendation-notification/${notificationId}`,
        },

        body: JSON.stringify({
          from: config.mailFrom,

          to: [recipient],

          subject: email.subject,
          text: email.text,
        }),

        cache: "no-store",
        redirect: "error",

        signal: AbortSignal.timeout(
          NOTIFICATION_LIMITS.providerTimeoutMs
        ),
      }
    );

    if (response.status === 429) {
      return {
        ok: false,
        errorCode: "provider_rate_limited",
      };
    }

    if (
      response.status === 401 ||
      response.status === 403
    ) {
      return {
        ok: false,
        errorCode: "provider_authentication_failed",
      };
    }

    if (
      response.status === 408 ||
      response.status >= 500
    ) {
      return {
        ok: false,
        errorCode: "provider_unavailable",
      };
    }

    if (response.status === 409) {

      const conflict: unknown =
        await response.json().catch(() => null);

      if (
        typeof conflict === "object" &&
        conflict !== null &&
        "name" in conflict &&
        conflict.name ===
          "concurrent_idempotent_requests"
      ) {
        return {
          ok: false,
          errorCode: "provider_unavailable",
        };
      }

      // Do not retry incompatible idempotency payloads.
      return {
        ok: false,
        errorCode: "provider_rejected",
      };
    }

    if (!response.ok) {
      return {
        ok: false,
        errorCode: "provider_rejected",
      };
    }

    const payload: unknown =
      await response.json().catch(() => null);

    if (
      typeof payload !== "object" ||
      payload === null ||
      !("id" in payload) ||
      typeof payload.id !== "string" ||
      !/^[A-Za-z0-9_-]{1,255}$/.test(payload.id)
    ) {
      return {
        ok: false,
        errorCode: "provider_response_invalid",
      };
    }

    return {
      ok: true,
      providerMessageId: payload.id,
    };

  } catch (error: unknown) {

    return {
      ok: false,
      errorCode:
        error instanceof Error &&
        error.name === "TimeoutError"
          ? "provider_timeout"
          : "network_error",
    };

  }
}
