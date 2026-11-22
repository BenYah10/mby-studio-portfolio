/**
 * MBY Studio — PostgreSQL connection (Supabase Test)
 *
 * Server-side only.
 * Uses a restricted PostgreSQL application account.
 * No credentials are stored in source code.
 */

import "server-only";
import postgres from "postgres";

const databaseUrl = process.env.MBY_RECOMMENDATIONS_DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    "Missing MBY_RECOMMENDATIONS_DATABASE_URL environment variable."
  );
}

export const recommendationsDb = postgres(databaseUrl, {
  ssl: "require",
  prepare: false,
  max: 3,
  idle_timeout: 20,
  connect_timeout: 10,
});
