/**
 * MBY Studio — Recommendation consent validation
 *
 * R2.20-G | Supabase Test only
 *
 * Validates explicit consent decisions and builds server-controlled
 * notices and versions. This does not authorize publication.
 */

import {
  RECOMMENDATION_CONSENTS,
  RECOMMENDATION_CONSENT_TYPES,
  RECOMMENDATION_CONSENT_VERSION,
  type RecommendationConsentType,
  type RecommendationLocale,
} from "./recommendation-consents";

type ConsentInput = {
  type: RecommendationConsentType;
  granted: boolean;
  value?: string;
};

export type DatabaseConsent = {
  type: RecommendationConsentType;
  granted: boolean;
  notice: string;
  version: string;
  value: string | null;
};

const VALUE_REQUIRED = new Set<RecommendationConsentType>([
  "publish_identity",
  "publish_role",
  "publish_organization",
  "publish_industry_sector",
  "publish_relationship_fr",
  "publish_relationship_en",
  "publish_linkedin",
]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" &&
    value !== null &&
    !Array.isArray(value);
}

export function buildRecommendationConsents(
  locale: RecommendationLocale,
  input: unknown
): DatabaseConsent[] | null {
  if (locale !== "fr" && locale !== "en") return null;
  if (!Array.isArray(input) ||
      input.length !== RECOMMENDATION_CONSENT_TYPES.length) {
    return null;
  }

  const allowed = new Set<string>(RECOMMENDATION_CONSENT_TYPES);
  const decisions = new Map<RecommendationConsentType, ConsentInput>();

  for (const entry of input) {
    if (!isRecord(entry)) return null;

    if (Object.keys(entry).some(
      (key) => !["type", "granted", "value"].includes(key)
    )) return null;

    const type = entry.type;
    if (typeof type !== "string" || !allowed.has(type)) return null;
    if (typeof entry.granted !== "boolean") return null;
    if (decisions.has(type as RecommendationConsentType)) return null;

    if (entry.value !== undefined &&
        (typeof entry.value !== "string" ||
         entry.value.length > 500 ||
         entry.value.includes("\0"))) return null;

    decisions.set(type as RecommendationConsentType, {
      type: type as RecommendationConsentType,
      granted: entry.granted,
      value: entry.value as string | undefined,
    });
  }

  const result: DatabaseConsent[] = [];

  for (const type of RECOMMENDATION_CONSENT_TYPES) {
    const decision = decisions.get(type);
    if (!decision) return null;

    const definition = RECOMMENDATION_CONSENTS[locale][type];

    if (definition.required && !decision.granted) return null;

    const value = decision.value?.trim() || null;

    if (decision.granted && VALUE_REQUIRED.has(type) && !value) {
      return null;
    }

    if (!decision.granted && value !== null) {
      return null;
    }

    result.push({
      type,
      granted: decision.granted,
      notice: definition.notice,
      version: RECOMMENDATION_CONSENT_VERSION,
      value,
    });
  }

  return result;
}
