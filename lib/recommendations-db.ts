/**
 * MBY Consulting — PostgreSQL secure connection
 *
 * Server-side only.
 * Uses a restricted PostgreSQL application account.
 * Enforces TLS certificate and hostname verification.
 * No credentials are stored in source code.
 */

import "server-only";
import postgres from "postgres";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const databaseUrl =
  process.env.MBY_RECOMMENDATIONS_DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    "Missing MBY_RECOMMENDATIONS_DATABASE_URL environment variable."
  );
}

// Load the official Supabase root CA certificate.
const supabaseCa = readFileSync(
  join(
    process.cwd(),
    "certificates",
    "supabase-root-2021.crt"
  ),
  "utf8"
);

// Explicit TLS configuration takes precedence.
const connectionUrl = new URL(databaseUrl);

connectionUrl.searchParams.delete("sslmode");
connectionUrl.searchParams.delete("sslrootcert");
connectionUrl.searchParams.delete("ssl");

export const recommendationsDb = postgres(
  connectionUrl.toString(),
  {
    ssl: {
      ca: supabaseCa,
      rejectUnauthorized: true,
      servername: connectionUrl.hostname,
      minVersion: "TLSv1.2",
    },
    prepare: false,
    max: 3,
    idle_timeout: 20,
    connect_timeout: 10,
  }
);