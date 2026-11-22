
/**
 * MBY Studio — Localized root layout
 *
 * Rôle :
 * - fournir le document HTML des routes FR/EN ;
 * - valider la langue demandée ;
 * - définir l'attribut HTML lang ;
 * - préparer la future localisation des métadonnées.
 *
 * Ce layout est indépendant du layout historique.
 */

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";

import { isLocale, locales } from "@/i18n/config";

import "../globals.css";

type LocalizedLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

/**
 * Prépare les deux langues officielles.
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/** Public FR/EN page metadata. Domain-dependent canonical/hreflang are deferred. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return locale === "fr"
    ? {
        title: "MBY Consulting | Analyse d'affaires et systÃ¨mes",
        description:
          "Portfolio professionnel de Mohamed Ben Yahmed. Analyse d'affaires et fonctionnelle, cartographie des systÃ¨mes et processus, ERP et amÃ©lioration opÃ©rationnelle.",
      }
    : {
        title: "MBY Consulting | Business & Systems Analysis",
        description:
          "Professional portfolio of Mohamed Ben Yahmed. Business and functional analysis, systems and process mapping, ERP applications, and operational improvement.",
      };
}
export default async function LocalizedRootLayout({
  children,
  params,
}: LocalizedLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
