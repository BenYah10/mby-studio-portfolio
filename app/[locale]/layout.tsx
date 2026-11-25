
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

import { siteOrigin, indexable } from '@/lib/seo';
/** Shared defaults only; canonical metadata is defined by each page. */
export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  robots: { index: indexable, follow: indexable },
};
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
