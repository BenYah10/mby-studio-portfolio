
/**
 * MBY Studio — Recommendation submission fingerprint
 * R2.21-I.11 | Local / Test only
 *
 * Binds a verified email address to the exact
 * recommendation payload, including consent decisions.
 *
 * No database access, Redis calls or email delivery.
 * Server-side use only.
 */

import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";

import {
  RECOMMENDATION_CONSENT_TYPES,
  type RecommendationConsentType,
  type RecommendationLocale,
} from "./recommendation-consents";

type ConsentDecision = {
  type: RecommendationConsentType;
  granted: boolean;
  value: string | null;
};

export type RecommendationSubmissionData = {
  author_full_name: string;
  author_email: string;
  professional_role: string;
  organization_name: string | null;
  industry_sector: string | null;
  professional_relationship: string;
  linkedin_url: string;
  locale: RecommendationLocale;
  quote: string;
  consents: readonly ConsentDecision[];
};

/**
 * Create a deterministic keyed fingerprint.
 *
 * Call this only with server-validated, normalized data.
 * The signing secret must never be sent to the browser.
 */
export function fingerprintRecommendationSubmission(
  data: RecommendationSubmissionData,
  secret: string
): string {
  if (secret.length < 32) {
    throw new Error("Submission fingerprint unavailable");
  }

  const decisions = new Map(
    data.consents.map((item) => [item.type, item])
  );

  if (
    decisions.size !== RECOMMENDATION_CONSENT_TYPES.length ||
    data.consents.length !== RECOMMENDATION_CONSENT_TYPES.length
  ) {
    throw new Error("Invalid consent decisions");
  }

  const orderedConsents = RECOMMENDATION_CONSENT_TYPES.map(
    (type) => {
      const item = decisions.get(type);
      if (!item || typeof item.granted !== "boolean") {
        throw new Error("Invalid consent decision");
      }

      return {
        type,
        granted: item.granted,
        value: item.value ?? null,
      };
    }
  );

  const normalized = {
    author_full_name: data.author_full_name.trim(),
    author_email: data.author_email.trim().toLowerCase(),
    professional_role: data.professional_role.trim(),
    organization_name: data.organization_name?.trim() || null,
    industry_sector: data.industry_sector?.trim() || null,
    professional_relationship:
      data.professional_relationship.trim(),
    linkedin_url: data.linkedin_url.trim(),
    locale: data.locale,
    quote: data.quote.trim(),
    consents: orderedConsents,
  };

  return createHmac("sha256", secret)
    .update(
      JSON.stringify([
        "mby-recommendation-submission-v1",
        normalized,
      ])
    )
    .digest("hex");
}

/**
 * Compare two fingerprints without a variable-time
 * string comparison.
 */
export function verifyRecommendationSubmissionFingerprint(
  provided: string,
  expected: string
): boolean {
  if (
    !/^[a-f0-9]{64}$/.test(provided) ||
    !/^[a-f0-9]{64}$/.test(expected)
  ) {
    return false;
  }

  return timingSafeEqual(
    Buffer.from(provided, "hex"),
    Buffer.from(expected, "hex")
  );
}
