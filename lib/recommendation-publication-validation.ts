/**
 * MBY Studio — Publication consent consistency
 *
 * R2.20-I | Supabase Test only
 *
 * Ensures approved publication values correspond to the
 * submitted professional information.
 *
 * This module does not publish recommendations.
 */

import type {
  RecommendationLocale,
} from "./recommendation-consents";

import type {
  DatabaseConsent,
} from "./recommendation-consent-validation";

export type RecommendationPublicationContext = {
  locale: RecommendationLocale;
  author_full_name: string;
  professional_role: string;
  organization_name: string;
  professional_relationship: string;
  linkedin_url: string | null;
};

function normalize(value: string | null | undefined): string {
  return (value ?? "").trim().normalize("NFC");
}

function initials(fullName: string): string {
  return fullName
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => Array.from(part)[0]?.toLocaleUpperCase() ?? "")
    .join(".");
}

export function validatePublicationConsistency(
  context: RecommendationPublicationContext,
  consents: readonly DatabaseConsent[]
): boolean {
  if (context.locale !== "fr" && context.locale !== "en") {
    return false;
  }

  const approved = new Map(
    consents.map((consent) => [consent.type, consent])
  );

  const check = (
    type: DatabaseConsent["type"],
    expected: string | null | undefined
  ): boolean => {
    const consent = approved.get(type);
    if (!consent) return false;
    if (!consent.granted) return true;

    const actual = normalize(consent.value);
    return actual.length > 0 && actual === normalize(expected);
  };

  const identity = approved.get("publish_identity");

  if (!identity) return false;

  if (identity.granted) {
    const value = normalize(identity.value);
    const name = normalize(context.author_full_name);

    if (!name || (value !== name && value !== initials(name))) {
      return false;
    }
  }

  if (!check("publish_role", context.professional_role)) {
    return false;
  }

  if (!check("publish_organization", context.organization_name)) {
    return false;
  }

  if (!check("publish_linkedin", context.linkedin_url)) {
    return false;
  }

  // The first version records only the relationship in the
  // submission language. Other-language approval requires
  // a separate reviewed translation workflow.
  if (context.locale === "fr") {
    if (!check(
      "publish_relationship_fr",
      context.professional_relationship
    )) return false;

    if (approved.get("publish_relationship_en")?.granted) {
      return false;
    }
  } else {
    if (!check(
      "publish_relationship_en",
      context.professional_relationship
    )) return false;

    if (approved.get("publish_relationship_fr")?.granted) {
      return false;
    }
  }

  return true;
}
