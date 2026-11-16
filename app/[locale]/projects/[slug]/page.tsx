/**
 * MBY Studio — Localized case-study route
 *
 * Rôle :
 * - résoudre une étude de cas à partir de sa langue et de son slug ;
 * - réutiliser les données et composants des études existantes ;
 * - transmettre la langue active au layout partagé ;
 * - préserver indépendamment la route historique /projects/[slug]/.
 *
 * Les traductions des Hero et des autres libellés communs seront
 * complétées dans une étape dédiée de la refonte bilingue.
 */

import { notFound } from "next/navigation";

import { projects } from "@/content/projects";
import { getCaseStudy } from "@/content/case-studies";
import CaseStudyLayout from "@/components/case-study/case-study-layout";
import { isLocale, locales } from "@/i18n/config";

type PageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

/** Prépare les combinaisons langues / projets existants. */
export function generateStaticParams() {
  return locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug })),
  );
}

export default async function LocalizedCaseStudyPage({ params }: PageProps) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const project = projects.find((candidate) => candidate.slug === slug);
  const caseStudy = getCaseStudy(slug, locale);

  if (!project || !caseStudy) {
    notFound();
  }

  return (
    <CaseStudyLayout
      project={project}
      caseStudy={caseStudy}
      locale={locale}
    />
  );
}
