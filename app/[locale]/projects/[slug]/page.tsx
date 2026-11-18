/**
 * MBY Studio T3.05 — localized case-study page, light editorial preview.
 *
 * The shared navigation and background apply ONLY to localized routes.
 * Legacy project URLs, diagrams, motion components and case-study data remain intact.
 */
import { notFound } from "next/navigation";
import { projects } from "@/content/projects";
import { getCaseStudy } from "@/content/case-studies";
import CaseStudyLayout from "@/components/case-study/case-study-layout";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { SiteHeader } from "@/components/t3/site-header";
import "@/components/t3/t3.css";
import "@/components/t3/case-study-light.css";

type PageProps = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug })),
  );
}

export default async function LocalizedCaseStudyPage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const project = projects.find((candidate) => candidate.slug === slug);
  const caseStudy = getCaseStudy(slug, locale);
  if (!project || !caseStudy) notFound();
  const dictionary = await getDictionary(locale);

  return (
    <div className="mby-case-light">
      {/* T3 Header CSS remains confined to this wrapper, not the dark diagrams. */}
      <div className="mby-t3 mby-case-header">
        <a className="t3-skip" href="#case-study-content">
          {locale === "fr" ? "Aller au contenu" : "Skip to content"}
        </a>
        <SiteHeader locale={locale} dictionary={dictionary} />
      </div>
      <div id="case-study-content" className="mby-case-content">
        <CaseStudyLayout project={project} caseStudy={caseStudy} locale={locale} />
      </div>
    </div>
  );
}
