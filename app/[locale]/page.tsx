
/**
 * MBY Consulting — Localized homepage
 *
 * Responsibilities:
 * - Validate the requested locale.
 * - Generate localized SEO metadata.
 * - Render professional structured data.
 * - Preserve the existing marketing homepage.
 */

import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { MarketingPages } from "@/components/t3/marketing-pages";
import { StructuredData } from "@/components/t3/structured-data";
import { marketingMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  return marketingMetadata(locale, "home");
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  return (
    <>
      <StructuredData locale={locale} />
      <MarketingPages locale={locale} page="home" />
    </>
  );
}
