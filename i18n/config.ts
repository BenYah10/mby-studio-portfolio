
/**
 * MBY Studio — Internationalization configuration
 *
 * Rôle :
 * - centraliser les langues prises en charge ;
 * - définir la langue par défaut ;
 * - fournir un type Locale réutilisable ;
 * - valider les identifiants de langue.
 *
 * Cette configuration ne modifie pas les routes existantes.
 */

export const locales = ["fr", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

/**
 * Vérifie qu'une valeur correspond à une langue prise en charge.
 */
export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}
