/**
 * MBY Consulting — Notification worker database connection
 *
 * NOTIF V1.0
 * Dedicated restricted PostgreSQL identity.
 * TLS certificate and hostname verification.
 * Lazy initialization and strict environment isolation.
 */

import "server-only";

import postgres from "postgres";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import {
  getNotificationConfig,
  isNotificationWorkerEnabled,
} from "./recommendation-notification-config";

// ============================================================
// 1. Database identities
// ============================================================

const TEST_PROJECT_REF = "qnunowufhniuehjbgwsi";
const PRODUCTION_PROJECT_REF = "qlhiygprhsezgcjlhvup";

const POOLER_HOST =
  "aws-0-ca-central-1.pooler.supabase.com";

const WORKER_ROLE =
  "mby_notification_login";

// ============================================================
// 2. Lazy database connection
// ============================================================

function createNotificationDb() {
  if (!isNotificationWorkerEnabled()) {
    throw new Error("Notification worker disabled.");
  }

  const config = getNotificationConfig();

  const connectionUrl = new URL(config.databaseUrl);

  const expectedUsername =
    `${WORKER_ROLE}.${config.environment === "production" ? PRODUCTION_PROJECT_REF : TEST_PROJECT_REF}`;

  // Fail closed if the connection targets another environment.

  if (
    connectionUrl.protocol !== "postgresql:" ||
    connectionUrl.hostname !== POOLER_HOST ||
    connectionUrl.port !== "5432" ||
    connectionUrl.pathname !== "/postgres" ||
    decodeURIComponent(connectionUrl.username) !==
      expectedUsername ||
    !connectionUrl.password
  ) {
    throw new Error("Invalid notification database identity.");
  }

  // Remove external connection overrides.
  connectionUrl.search = "";
  connectionUrl.hash = "";

  const supabaseCa = readFileSync(
    join(
      process.cwd(),
      "certificates",
      "supabase-root-2021.crt"
    ),
    "utf8"
  );

  return postgres(connectionUrl.toString(), {
    ssl: {
      ca: supabaseCa,
      rejectUnauthorized: true,
      servername: connectionUrl.hostname,
      minVersion: "TLSv1.2",
    },
    prepare: false,
    max: 1,
    idle_timeout: 20,
    connect_timeout: 10,
  });
}

// ============================================================
// 3. Reuse the connection within the server instance
// ============================================================

let notificationDb:
  | ReturnType<typeof createNotificationDb>
  | undefined;

export function getNotificationDb() {
  if (!isNotificationWorkerEnabled()) {
    throw new Error("Notification worker disabled.");
  }

  if (!notificationDb) {
    notificationDb = createNotificationDb();
  }

  return notificationDb;
}
