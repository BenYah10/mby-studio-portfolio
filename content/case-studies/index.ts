import type { CaseStudy } from "@/types/case-study";

import { benEnglishCoachCaseStudy } from "./ben-english-coach";
import { bixiCaseStudy } from "./bixi";
import { bluekioskCaseStudy } from "./bluekiosk";
import { tripScoreCaseStudy } from "./tripscore";

export const caseStudies: Record<string, CaseStudy> = {
  [bluekioskCaseStudy.projectSlug]: bluekioskCaseStudy,
  [bixiCaseStudy.projectSlug]: bixiCaseStudy,
  [benEnglishCoachCaseStudy.projectSlug]: benEnglishCoachCaseStudy,
  [tripScoreCaseStudy.projectSlug]: tripScoreCaseStudy,
};

export function getCaseStudy(
  slug: string
): CaseStudy | undefined {
  return caseStudies[slug];
}