import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ComponentType } from "react";

import type { Project } from "@/content/projects";
import type { CaseStudy, CaseStudyMetric } from "@/types/case-study";

import CaseStudyHero from "./case-study-hero";
import CaseStudyMetrics from "./case-study-metrics";
import CaseStudyReveal from "./case-study-reveal";
import CaseStudySection from "./case-study-section";
import CaseStudyFooter from "./case-study-footer";

import BixiHero from "./bixi/hero";
import BlueKioskTechHero from "./bluekiosktech/hero";
import TripScoreHero from "./tripscore/hero";
import BixiResultsSection from "./bixi/results-section";
import BlueKioskTechResultsSection from "./bluekiosktech/results-section";

import ExecutionTimeline from "./sections/execution-timeline";
import ProductRoadmap from "./sections/product-roadmap";
import ProductThinkingSection from "./sections/product-thinking-section";
import SystemDesignSection from "./sections/system-design-section";

type CaseStudyLayoutProps = {
  project: Project;
  caseStudy: CaseStudy;
};

type ProjectHeroProps = {
  project: Project;
  caseStudy: CaseStudy;
};

type ProjectResultsSectionProps = {
  number: string;
  metrics: CaseStudyMetric[];
};

type ProjectHero = ComponentType<ProjectHeroProps>;
type ProjectResultsSection = ComponentType<ProjectResultsSectionProps>;

const projectHeroes: Record<string, ProjectHero> = {
  bluekiosk: BlueKioskTechHero,
  "bixi-operations-dashboard": BixiHero,
  tripscore: TripScoreHero,
};

const projectResultsSections: Record<string, ProjectResultsSection> = {
  bluekiosk: BlueKioskTechResultsSection,
  "bixi-operations-dashboard": BixiResultsSection,
};

function getProjectHero(projectSlug: string): ProjectHero {
  return projectHeroes[projectSlug] ?? CaseStudyHero;
}

function getProjectResultsSection(
  projectSlug: string,
): ProjectResultsSection | undefined {
  return projectResultsSections[projectSlug];
}

export default function CaseStudyLayout({
  project,
  caseStudy,
}: CaseStudyLayoutProps) {
  const ProjectHero = getProjectHero(caseStudy.projectSlug);
  const ProjectResultsSection = getProjectResultsSection(
    caseStudy.projectSlug,
  );

  return (
    <main className="mx-auto w-full max-w-7xl px-6 pb-24 sm:px-8 lg:px-10">
      <div className="pt-8 sm:pt-10">
        <Link
          href="/#work"
          className="group inline-flex items-center gap-2 text-sm font-medium text-white/55 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
          Back to Selected Work
        </Link>
      </div>

      <ProjectHero project={project} caseStudy={caseStudy} />

      <div className="space-y-20 pt-16 sm:space-y-24 sm:pt-20 lg:space-y-28 lg:pt-24">
        {caseStudy.metrics && caseStudy.metrics.length > 0 && (
          <CaseStudyReveal>
            <CaseStudyMetrics metrics={caseStudy.metrics} />
          </CaseStudyReveal>
        )}

        <div className="mx-auto max-w-4xl space-y-20 sm:space-y-24 lg:space-y-28">
          {caseStudy.sections.map((section, index) => {
            const number = String(index + 1).padStart(2, "0");

            if (section.id === "thinking") {
              return (
                <CaseStudyReveal key={section.id}>
                  <ProductThinkingSection
                    number={number}
                    title={section.title}
                    paragraphs={section.paragraphs}
                    highlights={section.highlights}
                  />
                </CaseStudyReveal>
              );
            }

            if (
              section.id === "system" &&
              caseStudy.layout?.systemDesign
            ) {
              return (
                <CaseStudyReveal key={section.id}>
                  <SystemDesignSection
                    number={number}
                    title={section.title}
                    paragraphs={section.paragraphs}
                    highlights={section.highlights}
                  />
                </CaseStudyReveal>
              );
            }

            if (
              section.id === "execution" &&
              caseStudy.layout?.executionTimeline
            ) {
              return (
                <CaseStudyReveal key={section.id}>
                  <ExecutionTimeline
                    number={number}
                    title={section.title}
                  />
                </CaseStudyReveal>
              );
            }

            if (
              section.id === "results" &&
              caseStudy.layout?.resultsDashboard
            ) {
              if (ProjectResultsSection) {
                return (
                  <CaseStudyReveal key={section.id}>
                    <ProjectResultsSection
                      number={number}
                      metrics={caseStudy.metrics ?? []}
                    />
                  </CaseStudyReveal>
                );
              }

              return (
                <CaseStudyReveal key={section.id}>
                  <CaseStudySection
                    number={number}
                    eyebrow={section.eyebrow}
                    title={section.title}
                    paragraphs={section.paragraphs}
                    highlights={section.highlights}
                  />
                </CaseStudyReveal>
              );
            }

            return (
              <CaseStudyReveal key={section.id}>
                <CaseStudySection
                  number={number}
                  eyebrow={section.eyebrow}
                  title={section.title}
                  paragraphs={section.paragraphs}
                  highlights={section.highlights}
                />
              </CaseStudyReveal>
            );
          })}
        </div>

        {caseStudy.layout?.roadmap &&
          caseStudy.nextSteps &&
          caseStudy.nextSteps.length > 0 && (
            <CaseStudyReveal>
              <ProductRoadmap steps={caseStudy.nextSteps} />
            </CaseStudyReveal>
          )}

          <CaseStudyReveal>
            <CaseStudyFooter />
          </CaseStudyReveal>
      </div>
    </main>
  );
}