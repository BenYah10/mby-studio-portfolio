/**
 * CaseStudyLayout
 *
 * Purpose:
 * - Provide the shared layout shell used by all portfolio case studies;
 * - Resolve project-specific Hero and Results components when available;
 * - Render generic case-study sections for projects using the shared schema;
 * - Inject specialized Manufacturing Business Systems Mapping sections;
 * - Preserve common navigation, reveal animations, roadmap and footer behavior.
 *
 * Architecture notes:
 * - Project-specific components are registered by project slug;
 * - The generic CaseStudyHero and CaseStudySection remain fallback renderers;
 * - Manufacturing sections are intentionally rendered outside the max-w-4xl
 *   generic content column because their diagrams and architecture views need
 *   access to the full max-w-7xl case-study width;
 * - Manufacturing analytical content is selected by the optional locale prop;
 * - Legacy routes continue using English by default until localized routes
 *   are connected.
 *
 * Maintenance rule:
 * - Add project-specific UI only when the shared generic renderer is not
 *   sufficient;
 * - Keep slug-specific behavior explicit and grouped;
 * - Avoid turning this layout into a large collection of unrelated conditions.
 */

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ComponentType } from "react";

import type { Project } from "@/content/projects";
import type { Locale } from "@/i18n/config";
import type { CaseStudy, CaseStudyMetric } from "@/types/case-study";

/** Shared case-study building blocks. */
import CaseStudyHero from "./case-study-hero";
import CaseStudyMetrics from "./case-study-metrics";
import CaseStudyReveal from "./case-study-reveal";
import CaseStudySection from "./case-study-section";
import CaseStudyFooter from "./case-study-footer";

/** Project-specific Hero components. */
import BixiHero from "./bixi/hero";
import BlueKioskTechHero from "./bluekiosktech/hero";
import TripScoreHero from "./tripscore/hero";
import ManufacturingHero from "./manufacturing/hero";

/** Project-specific analytical / results components. */
import BixiResultsSection from "./bixi/results-section";
import BlueKioskTechResultsSection from "./bluekiosktech/results-section";
import BlueKioskTechEcosystemSection from "./bluekiosktech/ecosystem-section";

/**
 * Manufacturing Business Systems Mapping
 * Specialized full-width analytical sections.
 */
import BusinessChallengeSection from "./manufacturing/business-challenge-section";
import MethodologySection from "./manufacturing/methodology-section";
import EndToEndProcessSection from "./manufacturing/end-to-end-process-section";
import SystemsDataSection from "./manufacturing/systems-data-section";

/**
 * Manufacturing content source.
 * Each language retains the same component contracts and analytical structure.
 */
import { manufacturingContentEn } from "@/content/case-studies/manufacturing/en";
import { manufacturingContentFr } from "@/content/case-studies/manufacturing/fr";

/** Reusable generic case-study sections. */
import ExecutionTimeline from "./sections/execution-timeline";
import ProductRoadmap from "./sections/product-roadmap";
import ProductThinkingSection from "./sections/product-thinking-section";
import SystemDesignSection from "./sections/system-design-section";
import ProcessInventorySection from "./manufacturing/process-inventory-section";
import CrmDeepDiveSection from "./manufacturing/crm-deep-dive-section";
import ProcurementDeepDiveSection from "./manufacturing/procurement-deep-dive-section";
import DataGovernanceSection from "./manufacturing/data-governance-section";
import ImprovementFrameworkSection from "./manufacturing/improvement-framework-section";
import ConclusionSection from "./manufacturing/conclusion-section";

/** Props accepted by the global case-study layout. */
type CaseStudyLayoutProps = {
  project: Project;
  caseStudy: CaseStudy;
  /** Optional until the localized case-study routes are connected. */
  locale?: Locale;
};

/** Contract required by project-specific Hero components. */
type ProjectHeroProps = {
  project: Project;
  caseStudy: CaseStudy;
  locale?: Locale;
};

/** Contract required by project-specific Results sections. */
type ProjectResultsSectionProps = {
  number: string;
  metrics: CaseStudyMetric[];
};

type ProjectHero = ComponentType<ProjectHeroProps>;
type ProjectResultsSection = ComponentType<ProjectResultsSectionProps>;

/**
 * Project Hero registry.
 * Projects not listed here fall back to CaseStudyHero.
 */
const projectHeroes: Record<string, ProjectHero> = {
  bluekiosk: BlueKioskTechHero,
  "bixi-operations-dashboard": BixiHero,
  tripscore: TripScoreHero,
  "manufacturing-business-systems-mapping": ManufacturingHero,
};

/**
 * Project Results registry.
 * Only projects with a dedicated Results presentation are registered here.
 */
const projectResultsSections: Record<string, ProjectResultsSection> = {
  bluekiosk: BlueKioskTechResultsSection,
  "bixi-operations-dashboard": BixiResultsSection,
};

/** Resolve the Hero component for a project. */
function getProjectHero(projectSlug: string): ProjectHero {
  return projectHeroes[projectSlug] ?? CaseStudyHero;
}

/** Resolve the optional project-specific Results component. */
function getProjectResultsSection(
  projectSlug: string,
): ProjectResultsSection | undefined {
  return projectResultsSections[projectSlug];
}

export default function CaseStudyLayout({
  project,
  caseStudy,
  locale,
}: CaseStudyLayoutProps) {
  /**
   * Route-safe project identity.
   *
   * `project.slug` is resolved from the current route and is the authoritative
   * key for all project-specific UI. This prevents one case-study payload from
   * accidentally activating another project's specialized sections.
   */
  const activeProjectSlug = project.slug;

  /** The legacy route has no locale and must keep its English behavior. */
  const resolvedLocale: Locale = locale ?? "en";
  const manufacturingContent =
    resolvedLocale === "fr" ? manufacturingContentFr : manufacturingContentEn;

  /**
   * Navigation during the migration:
   * - legacy case studies still return to the legacy #work section;
   * - localized case studies return to a working localized homepage;
   * - once the Work pages exist, replace the homepage destinations with
   *   getLocalizedPath("work", resolvedLocale).
   */
  const backHref = locale ? `/${resolvedLocale}/` : "/#work";
  const backLabel =
    !locale
      ? "Back to Selected Work"
      : resolvedLocale === "fr"
        ? "Retour à l’accueil"
        : "Back to Home";

  /** Resolve project-specific renderers once per layout render. */
  const ProjectHero = getProjectHero(activeProjectSlug);
  const ProjectResultsSection = getProjectResultsSection(activeProjectSlug);

  return (
    <main className="mx-auto w-full max-w-7xl px-6 pb-24 sm:px-8 lg:px-10">
      {/* ============================================================
          GLOBAL CASE-STUDY NAVIGATION
          Preserves the legacy #work anchor and localizes new routes.
         ============================================================ */}
      <div className="pt-8 sm:pt-10">
        <Link
          href={backHref}
          className="group inline-flex items-center gap-2 text-sm font-medium text-white/55 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
          {backLabel}
        </Link>
      </div>

      {/* ============================================================
          PROJECT HERO
          Uses a specialized Hero when one is registered for the slug.
         ============================================================ */}
      <ProjectHero project={project} caseStudy={caseStudy} locale={resolvedLocale} />

      {/* ============================================================
          MAIN CASE-STUDY CONTENT
          Full-width section stack within the global max-w-7xl container.
         ============================================================ */}
      <div className="space-y-20 pt-16 sm:space-y-24 sm:pt-20 lg:space-y-28 lg:pt-24">
        {/* Optional global metrics. */}
         {caseStudy.metrics && caseStudy.metrics.length > 0 && (
          <CaseStudyReveal>
           <CaseStudyMetrics metrics={caseStudy.metrics} />
          </CaseStudyReveal>
     )}  


        {/* ============================================================
            MANUFACTURING BUSINESS SYSTEMS MAPPING

            01 — Business Challenge
            02 — My Approach / Methodology
            03 — End-to-End Process Architecture
            04 — Systems & Data Architecture
            05 — Process Inventory
            06 — CRM Deep Dive
            07 — Procurement / P2P Deep Dive
            08 — Data Governance & Control Framework 

            Future sections are appended here only after validation.
           ============================================================ */}
        {activeProjectSlug === "manufacturing-business-systems-mapping" && (
          <>
            {/* 01 — Business Challenge */}
            <CaseStudyReveal>
              <BusinessChallengeSection locale={resolvedLocale} />
            </CaseStudyReveal>

            {/* 02 — My Approach / Methodology */}
            <CaseStudyReveal>
              <MethodologySection
                content={manufacturingContent.methodology}
              />
            </CaseStudyReveal>

            {/* 03 — End-to-End Process Architecture */}
            <CaseStudyReveal>
              <EndToEndProcessSection
                content={manufacturingContent.endToEnd}
                imageSrc="/images/projects/manufacturing-business-systems-mapping/enterprise-process-map-fr.png"
                imageAlt="Enterprise process map showing the end-to-end manufacturing business lifecycle across twelve phases"
              />
            </CaseStudyReveal>

            {/* 04 — Systems & Data Architecture */}
            <CaseStudyReveal>
              <SystemsDataSection
                content={manufacturingContent.systemsData}
              />
            </CaseStudyReveal>

            {/* 05 — Process Inventory */}
            <CaseStudyReveal>
              <ProcessInventorySection
                locale={resolvedLocale}
                content={manufacturingContent.processInventory}
                imageSrc="/images/projects/manufacturing-business-systems-mapping/process-inventory-fr.png"
                imageAlt={resolvedLocale === "fr" ? "Inventaire des processus en français : responsables, systèmes, état d’analyse, maturité et priorités des douze processus métier." : "French-language process inventory diagram showing owners, systems, analysis status, maturity, and priorities for twelve business processes."}
              />
            </CaseStudyReveal>

            {/* 06 — CRM Deep Dive */}
            <CaseStudyReveal>
              <CrmDeepDiveSection
                locale={resolvedLocale}
                content={manufacturingContent.crmDeepDive}
                imageSrc="/images/projects/manufacturing-business-systems-mapping/crm-functional-deep-dive-en.png"
                imageAlt={resolvedLocale === "fr" ? "Diagramme CRM en anglais : qualification, pipeline commercial, décision de soumission, estimation et transfert vers le projet, phases P01 à P05." : "English-language CRM diagram showing lead qualification, pipeline, bid decision, estimation and project handoff, phases P01 to P05."}
              />
            </CaseStudyReveal>

            {/* 07 — Procurement / P2P Deep Dive */}
            <CaseStudyReveal>
              <ProcurementDeepDiveSection
                locale={resolvedLocale}
                content={manufacturingContent.procurementDeepDive}
                imageSrc="/images/projects/manufacturing-business-systems-mapping/procurement-p2p-functional-deep-dive-en.png"
                imageAlt={resolvedLocale === "fr" ? "Diagramme approvisionnement P2P en anglais : besoin, demande d’achat, approbation, commande, réception, rapprochement à trois pièces et paiement fournisseur." : "English-language procurement/P2P diagram showing requisition, approval, purchase order, receipt, three-way invoice matching and supplier payment."}
              />
            </CaseStudyReveal>

            {/* 08 — Data Governance & Control Framework */}
            <CaseStudyReveal>
             <DataGovernanceSection
                locale={resolvedLocale}
              content={manufacturingContent.dataGovernance}
              imageSrc="/images/projects/manufacturing-business-systems-mapping/data-governance-control-framework-en.png"
              imageAlt={resolvedLocale === "fr" ? "Diagramme de gouvernance en anglais : responsabilités, qualité des données, validations, accès, intégrations et contrôles intersystèmes." : "English-language governance diagram showing data ownership, quality, validations, access, integrations and cross-system controls."}
             />
            </CaseStudyReveal>

           {/* 09 — Process Improvement Framework */}
            <CaseStudyReveal>
              <ImprovementFrameworkSection
               content={manufacturingContent.improvementFramework}
              />
            </CaseStudyReveal> 

            {/* 10 — Conclusion */}
             <CaseStudyReveal>
              <ConclusionSection
                content={manufacturingContent.conclusion}
              />
             </CaseStudyReveal>
          </>
        )}

        {/* ============================================================
            GENERIC CASE-STUDY SECTIONS
            Narrow editorial column for standard project content.
           ============================================================ */}
        <div className="mx-auto max-w-4xl space-y-20 sm:space-y-24 lg:space-y-28">
          {caseStudy.sections.map((section, index) => {
            const number = String(index + 1).padStart(2, "0");

            /** Product-thinking section. */
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

            /** Specialized system-design section. */
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

            /** Specialized execution timeline. */
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

            /** Results section with optional project-specific renderer. */
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

            /** Default generic case-study section. */
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

        {/* ============================================================
            OPTIONAL PRODUCT ROADMAP
           ============================================================ */}
        {caseStudy.layout?.roadmap &&
          caseStudy.nextSteps &&
          caseStudy.nextSteps.length > 0 && (
            <CaseStudyReveal>
              <ProductRoadmap steps={caseStudy.nextSteps} />
            </CaseStudyReveal>
          )}

        {/* ============================================================
            BLUEKIOSK-SPECIFIC ECOSYSTEM SECTION
           ============================================================ */}
        {activeProjectSlug === "bluekiosk" && (
          <CaseStudyReveal>
            <BlueKioskTechEcosystemSection />
          </CaseStudyReveal>
        )}

        {/* ============================================================
            SHARED CASE-STUDY FOOTER
           ============================================================ */}
        <CaseStudyReveal>
          <CaseStudyFooter />
        </CaseStudyReveal>
      </div>
    </main>
  );
}
