/**
 * MBY Consulting — Recommendation notification Cron API
 *
 * NOTIF V1.0
 * Server-side execution only.
 * Bearer secret authentication.
 * Environment-specific activation controls.
 */

import { NextRequest, NextResponse } from "next/server";

import {
  createHash,
  timingSafeEqual,
} from "node:crypto";

import {
  isNotificationWorkerEnabled,
} from "@/lib/recommendation-notification-config";

import {
  runNotificationWorker,
} from "@/lib/recommendation-notification-worker";

export const runtime = "nodejs";

export const dynamic = "force-dynamic";

export const maxDuration = 120;

// ============================================================
// 1. Secure responses
// ============================================================

function reply(
  status: number,
  payload: Record<string, unknown>
) {
  return NextResponse.json(payload, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

// ============================================================
// 2. Constant-time authentication
// ============================================================

function isAuthorized(request: NextRequest): boolean {

  const secret = process.env.CRON_SECRET;

  const authorization =
    request.headers.get("authorization");

  if (
    !secret ||
    secret.length < 32 ||
    !authorization ||
    authorization.length > 2048
  ) {
    return false;
  }

  const expected = createHash("sha256")
    .update(`Bearer ${secret}`)
    .digest();

  const received = createHash("sha256")
    .update(authorization)
    .digest();

  return timingSafeEqual(expected, received);
}

// ============================================================
// 3. Cron execution
// ============================================================

export async function GET(request: NextRequest) {

  if (!isAuthorized(request)) {
    return reply(401, { ok: false });
  }

  if (!isNotificationWorkerEnabled()) {
  console.warn("[MBY-NOTIF] WORKER_DISABLED");

  return reply(503, { ok: false });
}

  try {

    const result = await runNotificationWorker();

    return reply(
      result.unresolved > 0 ? 503 : 200,
      {
        ok: result.unresolved === 0,
        ...result,
      }
    );

  } catch (error: unknown) {

  const errorCode =
    typeof error === "object" &&
    error !== null &&
    "code" in error
      ? error.code
      : undefined;

  const allowedCodes = [
    "ENOENT",
    "28P01",
    "42501",
    "42883",
    "ECONNREFUSED",
    "ECONNRESET",
    "ETIMEDOUT",
    "CONNECT_TIMEOUT",
    "ENOTFOUND",
    "SELF_SIGNED_CERT_IN_CHAIN",
    "UNABLE_TO_VERIFY_LEAF_SIGNATURE",
    "CERT_HAS_EXPIRED",
    "ERR_TLS_CERT_ALTNAME_INVALID",
    "ERR_INVALID_URL",
  ];

  const safeCode =
    typeof errorCode === "string" &&
    allowedCodes.includes(errorCode)
      ? errorCode
      : "INTERNAL_ERROR";

  console.error("[MBY-NOTIF]", safeCode);

  return reply(503, {
    ok: false,
  });

}
}
