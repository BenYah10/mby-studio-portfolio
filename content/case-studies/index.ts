import type { CaseStudy } from "@/types/case-study";
import type { Locale } from "@/i18n/config";
import { caseStudiesFr } from "./fr";

import { benEnglishCoachCaseStudy } from "./ben-english-coach";
import { bixiCaseStudy } from "./bixi";
import { bluekioskCaseStudy } from "./bluekiosk";
import { tripScoreCaseStudy } from "./tripscore";
import { manufacturingBusinessSystemsMappingCaseStudy } from "./manufacturing-business-systems-mapping";

export const caseStudies: Record<string, CaseStudy> = {
  [bluekioskCaseStudy.projectSlug]: bluekioskCaseStudy,
  [bixiCaseStudy.projectSlug]: bixiCaseStudy,
  [benEnglishCoachCaseStudy.projectSlug]: benEnglishCoachCaseStudy,
  [tripScoreCaseStudy.projectSlug]: tripScoreCaseStudy,
  [manufacturingBusinessSystemsMappingCaseStudy.projectSlug]: manufacturingBusinessSystemsMappingCaseStudy,
};

export function getCaseStudy(
  slug: string,
  locale: Locale = "en",
): CaseStudy | undefined {
  return locale === "fr" ? caseStudiesFr[slug] ?? caseStudies[slug] : caseStudies[slug];
}