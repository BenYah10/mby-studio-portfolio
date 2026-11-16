
/**
 * MBY Studio — Localized homepage (temporary)
 *
 * Rôle :
 * - vérifier le fonctionnement des routes /fr/ et /en/ ;
 * - vérifier le chargement des dictionnaires ;
 * - servir de point d'entrée provisoire avant
 *   l'intégration du design validé.
 *
 * Cette page sera remplacée progressivement.
 */

import { notFound } from "next/navigation";

import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LocalizedHome({
  params,
}: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);

  return (
    <main className="min-h-screen p-10">
      <h1 className="text-3xl font-bold">
        MBY Studio
      </h1>

      <p className="mt-4">
        {dictionary.navigation.home}
      </p>

      <p className="mt-2">
        {dictionary.actions.discussMandate}
      </p>

      <p className="mt-4 text-sm">
        Locale: {locale}
      </p>
    </main>
  );
}
