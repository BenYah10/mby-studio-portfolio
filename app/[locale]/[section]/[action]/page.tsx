
/**
 * MBY Studio — R2.21-H.7
 * Dedicated bilingual recommendation submission page.
 *
 * Only approved FR/EN paths are recognized.
 * Form is displayed in preview mode only.
 * No submission is enabled.
 */

import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import { routePaths } from "@/i18n/routes";
import { SiteShell } from "@/components/t3/site-shell";
import { RecommendationForm } from "@/components/t3/recommendation-form";

export function generateStaticParams() {
  return locales.map((locale) => {
    const segments = routePaths.recommendationSubmit[locale]
      .split("/")
      .filter(Boolean);

    return {
      locale,
      section: segments[1],
      action: segments[2],
    };
  });
}

export default async function RecommendationSubmitPage({
  params,
}: {
  params: Promise<{
    locale: string;
    section: string;
    action: string;
  }>;
}) {
  const { locale, section, action } = await params;

  if (!isLocale(locale)) notFound();

  const requestedPath = `/${locale}/${section}/${action}/`;

  if (requestedPath !== routePaths.recommendationSubmit[locale]) {
    notFound();
  }

  return (
    <SiteShell locale={locale}>
      <main
        style={{
          maxWidth: 820,
          margin: "0 auto",
          padding: "64px 24px 100px",
        }}
      >
        <RecommendationForm locale={locale} />
      </main>
    </SiteShell>
  );
}

export async function generateMetadata({params}:{params:Promise<{locale:string;section:string;action:string}>}) {const {locale,section,action}=await params;if(!isLocale(locale)||routePaths.recommendationSubmit[locale]!==`/${locale}/${section}/${action}/`)notFound();return {title:locale==='fr'?'Soumettre une recommandation | MBY Consulting':'Submit a recommendation | MBY Consulting',robots:{index:false,follow:true}};}
