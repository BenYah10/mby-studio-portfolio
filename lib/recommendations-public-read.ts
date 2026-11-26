/**
 * MBY Consulting — Restricted public recommendations reader
 *
 * M08.05-B | Server-side publication data access
 *
 * Reads approved publications exclusively through the
 * restricted PostgreSQL SECURITY DEFINER function.
 *
 * No direct access to private submissions or consent records.
 * No persistent application-level caching.
 */

import "server-only";

import { recommendationsDb } from "./recommendations-db";

// ============================================================
// 1. Public publication data contract
// ============================================================

export type PublishedRecommendation = {
  publication_id: string;
  display_name: string;
  display_role: string | null;
  display_organization: string | null;
  display_industry_sector: string | null;
  display_relationship_fr: string | null;
  display_relationship_en: string | null;
  original_language: "fr" | "en";
  linkedin_url: string;
  quote: string;
};

// ============================================================
// 2. Public LinkedIn URL validation
// ============================================================

const LINKEDIN_PROFILE_PATTERN =
  /^https:\/\/www\.linkedin\.com\/in\/[A-Za-z0-9][A-Za-z0-9._-]{1,99}$/;

// ============================================================
// 3. Runtime validation
// ============================================================

function isOptionalText(value: unknown): boolean {
  return value === null || typeof value === "string";
}

function isValidPublication(
  item: PublishedRecommendation
): boolean {
  return (
    typeof item.publication_id === "string" &&
    typeof item.display_name === "string" &&
    item.display_name.trim().length >= 2 &&
    typeof item.quote === "string" &&
    item.quote.trim().length >= 20 &&
    (item.original_language === "fr" ||
      item.original_language === "en") &&
    typeof item.linkedin_url === "string" &&
    LINKEDIN_PROFILE_PATTERN.test(item.linkedin_url) &&
    isOptionalText(item.display_role) &&
    isOptionalText(item.display_organization) &&
    isOptionalText(item.display_industry_sector) &&
    isOptionalText(item.display_relationship_fr) &&
    isOptionalText(item.display_relationship_en)
  );
}

// ============================================================
// 4. Read approved publications
// ============================================================

export async function getPublishedRecommendations():
  Promise<PublishedRecommendation[]> {

  // Use an explicit allowlist of public columns.
  // Never query private submission tables directly.

  const rows = await recommendationsDb<
    PublishedRecommendation[]
  >`
    SELECT
      publication_id,
      display_name,
      display_role,
      display_organization,
      display_industry_sector,
      display_relationship_fr,
      display_relationship_en,
      original_language,
      linkedin_url,
      quote
    FROM mby_private.list_published_recommendations()
  `;

  // Reject unexpected publication data.
  // Never expose database contents in error messages.

  if (!rows.every(isValidPublication)) {
    throw new Error(
      "Invalid public recommendation data."
    );
  }

  return Array.from(rows);
}