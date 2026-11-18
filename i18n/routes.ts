
/**
 * MBY Studio — Localized route configuration
 *
 * Rôle :
 * - centraliser les chemins publics FR/EN ;
 * - éviter de coder les URL directement dans les composants ;
 * - préparer la navigation et le switch linguistique ;
 * - conserver une correspondance entre les pages.
 *
 * Les routes sont définies ici, mais ne sont pas encore
 * activées dans l'App Router Next.js.
 */

import type { Locale } from "./config";

/**
 * Identifiants internes des pages.
 *
 * Ces identifiants restent indépendants de la langue.
 */
export const routePaths = {
  home: {
    fr: "/fr/",
    en: "/en/",
  },
  services: {
    fr: "/fr/services/",
    en: "/en/services/",
  },
  work: {
    fr: "/fr/realisations/",
    en: "/en/work/",
  },
  about: {
    fr: "/fr/a-propos/",
    en: "/en/about/",
  },
  recommendations: {
    fr: "/fr/recommandations/",
    en: "/en/recommendations/",
  },
  contact: {
    fr: "/fr/contact/",
    en: "/en/contact/",
  },
  privacy: {
    fr: "/fr/politique-de-confidentialite/",
    en: "/en/privacy-policy/",
  },
} as const satisfies Record<
  string,
  Record<Locale, string>
>;

/**
 * Type des pages reconnues par MBY Studio.
 */
export type RouteKey = keyof typeof routePaths;

/**
 * Retourne l'URL localisée d'une page.
 *
 * Exemple :
 * getLocalizedPath("work", "fr")
 * retourne "/fr/realisations/".
 */
export function getLocalizedPath(
  route: RouteKey,
  locale: Locale
): string {
  return routePaths[route][locale];
}

/**
 * Génère l'URL d'une étude de cas.
 *
 * Les slugs techniques sont conservés
 * dans les deux langues.
 */
export function getCaseStudyPath(
  slug: string,
  locale: Locale
): string {
  return `/${locale}/projects/${encodeURIComponent(slug)}/`;
}
