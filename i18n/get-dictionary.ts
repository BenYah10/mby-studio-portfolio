
/**
 * MBY Studio — Centralized dictionary loader
 *
 * Rôle :
 * - charger le contenu de la langue demandée ;
 * - centraliser l'accès aux dictionnaires FR/EN ;
 * - préserver le typage TypeScript ;
 * - éviter les imports de traductions dispersés
 *   dans les différents composants serveur.
 *
 * Architecture :
 * - ce module est destiné aux composants serveur ;
 * - les dictionnaires sont importés explicitement ;
 * - aucune bibliothèque d'internationalisation
 *   supplémentaire n'est nécessaire.
 */

import "server-only";

import type { Locale } from "./config";
import { defaultLocale } from "./config";

/**
 * Dictionnaires disponibles.
 *
 * Chaque fonction charge uniquement le module
 * correspondant à la langue demandée.
 */
const dictionaries = {
  fr: () => import("./dictionaries/fr").then((module) => module.fr),
  en: () => import("./dictionaries/en").then((module) => module.en),
};

/**
 * Charge le dictionnaire correspondant à la langue.
 *
 * Exemple :
 * const dictionary = await getDictionary("fr");
 */
export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}

/**
 * Charge le dictionnaire français par défaut.
 *
 * Cette fonction est utile lorsqu'aucune langue
 * explicite n'a encore été fournie.
 */
export async function getDefaultDictionary() {
  return getDictionary(defaultLocale);
}

/**
 * Type partagé des dictionnaires.
 *
 * Les valeurs sont des chaînes génériques,
 * mais les clés restent identiques entre FR et EN.
 */
export type Dictionary = {
  [K in keyof typeof import("./dictionaries/fr").fr]: {
    [P in keyof (typeof import("./dictionaries/fr").fr)[K]]: string;
  };
};
