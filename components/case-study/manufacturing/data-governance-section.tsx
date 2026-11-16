"use client";

/**
 * DataGovernanceSection
 *
 * Purpose:
 * - Present the governance layer that supports reliable business processes;
 * - Show how data ownership, quality, validation, access, monitoring,
 *   documentation and change management work together;
 * - Explain how governance spans CRM, ERP / P2P, Project Management,
 *   Field Service and BI;
 * - Highlight a practical ownership lens for critical business data;
 * - Present a Prevent → Detect → Correct → Improve control framework;
 * - Display the dedicated governance visual asset.
 *
 * Portfolio governance:
 * - This section is part of a personal conceptual case study;
 * - It does not represent a real client governance implementation;
 * - Systems and governance practices are illustrative;
 * - All business-facing copy comes from locale-specific content files.
 *
 * Internationalization:
 * - The component is language-agnostic;
 * - EN / FR content is supplied through the content prop;
 * - The visual asset can later switch by locale.
 *
 * Architecture:
 * 1. Section introduction
 * 2. Governance principles
 * 3. Data ownership lens
 * 4. Critical data across the ecosystem
 * 5. Cross-system control framework
 * 6. Full governance visual
 * 7. Analytical insights
 * 8. Full-screen viewer
 */

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  BookOpenCheck,
  Database,
  FileCheck2,
  GitBranch,
  KeyRound,
  Maximize2,
  RefreshCcw,
  SearchCheck,
  ShieldCheck,
  UserCheck,
  Workflow,
} from "lucide-react";

import ArchitectureViewer from "./architecture-viewer";
import type { Locale } from "@/i18n/config";

/**
 * One governance principle.
 */
type GovernancePrinciple = {
  title: string;
  description: string;
  keywords: readonly string[];
};

/**
 * One ownership question.
 */
type OwnershipQuestion = {
  title: string;
  description: string;
};

/**
 * Data ownership lens.
 */
type OwnershipLens = {
  label: string;
  questions: readonly OwnershipQuestion[];
};

/**
 * One critical data domain.
 */
type CriticalDataItem = {
  domain: string;
  examples: string;
  downstream: string;
};

/**
 * One cross-system control.
 */
type GovernanceControl = {
  title: string;
  description: string;
};

/**
 * One governance insight.
 */
type GovernanceInsight = {
  title: string;
  description: string;
};

/**
 * Content contract for the governance section.
 */
type DataGovernanceContent = {
  eyebrow: string;
  title: string;
  intro: string;

  principlesLabel: string;
  principles: readonly GovernancePrinciple[];

  ownershipLens: OwnershipLens;

  criticalDataLabel: string;
  criticalData: readonly CriticalDataItem[];

  controlsLabel: string;
  controls: readonly GovernanceControl[];

  insights: readonly GovernanceInsight[];
};

/**
 * Component props.
 */
type DataGovernanceSectionProps = {
  /** Native page locale; omitted on legacy routes (English). */
  locale?: Locale;
  content: DataGovernanceContent;
  imageSrc: string;
  imageAlt: string;
};

/**
 * Icons aligned with the seven governance principles.
 */
const principleIcons = [
  UserCheck,
  Database,
  FileCheck2,
  KeyRound,
  Workflow,
  BookOpenCheck,
  RefreshCcw,
];

/**
 * Icons for the ownership lens.
 */
const ownershipIcons = [
  UserCheck,
  ShieldCheck,
  BadgeCheck,
  GitBranch,
];

/**
 * Icons for the four control stages.
 */
const controlIcons = [
  ShieldCheck,
  SearchCheck,
  BadgeCheck,
  RefreshCcw,
];

/**
 * Icons for the final governance insights.
 */
const insightIcons = [
  ShieldCheck,
  UserCheck,
  Workflow,
  RefreshCcw,
];

export default function DataGovernanceSection({
  content,
  imageSrc,
  imageAlt,
  locale = "en",
}: DataGovernanceSectionProps) {
  /**
   * Controls the reusable full-screen viewer.
   */
  const [isViewerOpen, setIsViewerOpen] = React.useState(false);

  return (
    <section
      id="data-governance"
      aria-labelledby="data-governance-title"
      className="border-b border-white/10 pb-20 sm:pb-24 lg:pb-28"
    >
      {/* ============================================================
          01 — SECTION INTRO
          Positions governance as the reliability layer spanning
          systems, processes, controls and decisions.
         ============================================================ */}
      <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
        <div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              08
            </span>

            <span
              aria-hidden="true"
              className="h-px w-8 bg-white/15"
            />

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
              {content.eyebrow.replace(/^08\s*[—-]\s*/, "")}
            </p>
          </div>

          <p className="mt-7 max-w-sm text-sm leading-7 text-white/40">
            {content.principlesLabel}
          </p>
        </div>

        <div>
          <h2
            id="data-governance-title"
            className="max-w-4xl text-[clamp(2.35rem,4.8vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-white"
          >
            {content.title}
          </h2>

          <p className="mt-8 max-w-3xl text-[clamp(1.05rem,1.6vw,1.35rem)] leading-8 text-white/55">
            {content.intro}
          </p>
        </div>
      </div>

      {/* ============================================================
          02 — GOVERNANCE PRINCIPLES
          Seven transverse governance dimensions.
         ============================================================ */}
      <div className="mt-16">
        <div className="mb-7 flex items-center gap-3">
          <ShieldCheck className="h-4 w-4 text-accent" />

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
            {content.principlesLabel}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {content.principles.map((principle, index) => {
            const Icon = principleIcons[index];

            return (
              <motion.article
                key={principle.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="rounded-[1.25rem] border border-white/10 bg-white/[0.02] p-5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/20 bg-accent/[0.07]">
                  <Icon className="h-4 w-4 text-accent" />
                </div>

                <h3 className="mt-5 text-base font-semibold tracking-[-0.02em] text-white">
                  {principle.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/42">
                  {principle.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {principle.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="rounded-lg border border-white/10 bg-white/[0.025] px-2.5 py-1.5 text-[0.68rem] leading-4 text-white/50"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* ============================================================
          03 — DATA OWNERSHIP LENS
          Four essential questions for every critical data element.
         ============================================================ */}
      <div className="mt-6">
        <div className="mb-7 flex items-center gap-3">
          <UserCheck className="h-4 w-4 text-accent" />

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
            {content.ownershipLens.label}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {content.ownershipLens.questions.map((question, index) => {
            const Icon = ownershipIcons[index];

            return (
              <motion.article
                key={question.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="rounded-[1.25rem] border border-white/10 bg-white/[0.02] p-5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/20 bg-accent/[0.07]">
                  <Icon className="h-4 w-4 text-accent" />
                </div>

                <h3 className="mt-5 text-base font-semibold tracking-[-0.02em] text-white">
                  {question.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/42">
                  {question.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* ============================================================
          04 — CRITICAL DATA ACROSS THE ECOSYSTEM
          Connects data domains to downstream business use.
         ============================================================ */}
      <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0d1017]">
        <div className="border-b border-white/10 px-6 py-5 sm:px-8">
          <div className="flex items-center gap-3">
            <Database className="h-4 w-4 text-accent" />

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {content.criticalDataLabel}
            </p>
          </div>
        </div>

        <div className="hidden grid-cols-[0.8fr_1.35fr_1.35fr] border-b border-white/10 bg-white/[0.02] px-6 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/30 lg:grid sm:px-8">
          <div>Domain</div>
          <div>Critical data</div>
          <div>Downstream use / decision</div>
        </div>

        <div>
          {content.criticalData.map((item, index) => (
            <div
              key={item.domain}
              className={[
                "grid gap-5 px-6 py-6 sm:px-8 lg:grid-cols-[0.8fr_1.35fr_1.35fr]",
                index !== content.criticalData.length - 1
                  ? "border-b border-white/10"
                  : "",
              ].join(" ")}
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent lg:hidden">
                  Domain
                </p>

                <p className="mt-2 font-semibold text-white lg:mt-0">
                  {item.domain}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/30 lg:hidden">
                  Critical data
                </p>

                <p className="mt-2 text-sm leading-6 text-white/48 lg:mt-0">
                  {item.examples}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/30 lg:hidden">
                  Downstream use / decision
                </p>

                <p className="mt-2 text-sm leading-6 text-white/48 lg:mt-0">
                  {item.downstream}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================
          05 — CROSS-SYSTEM CONTROL FRAMEWORK
          Prevent → Detect → Correct → Improve.
         ============================================================ */}
      <div className="mt-6">
        <div className="mb-7 flex items-center gap-3">
          <Workflow className="h-4 w-4 text-accent" />

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
            {content.controlsLabel}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {content.controls.map((control, index) => {
            const Icon = controlIcons[index];

            return (
              <motion.article
                key={control.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative rounded-[1.25rem] border border-white/10 bg-white/[0.02] p-5"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/20 bg-accent/[0.07]">
                    <Icon className="h-4 w-4 text-accent" />
                  </div>

                  <span className="text-xs font-semibold text-accent/50">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-5 text-base font-semibold tracking-[-0.02em] text-white">
                  {control.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/42">
                  {control.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* ============================================================
          06 — FULL GOVERNANCE VISUAL
          Displays the dedicated governance framework asset.
         ============================================================ */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          duration: 0.65,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mt-6 overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0d1017]"
      >
        <div className="flex flex-col gap-5 border-b border-white/10 px-6 py-6 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Data Governance & Control Framework
            </p>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/40">
              Cross-system governance view connecting ownership, quality,
              validation, security, monitoring, documentation and controlled
              change.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsViewerOpen(true)}
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-accent/20 bg-accent/[0.07] px-4 py-3 text-xs font-semibold text-white/75 transition hover:border-accent/35 hover:bg-accent/[0.11]"
          >
            <Maximize2 className="h-4 w-4 text-accent" />
            View full governance framework
          </button>
        </div>

        <div className="relative bg-white/[0.015] p-3 sm:p-4">
          <div className="relative aspect-[16/9] overflow-hidden rounded-[1.15rem] border border-white/10 bg-white">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-contain"
              priority={false}
            />
          </div>
        </div>
      </motion.div>

      {/* ============================================================
          07 — ANALYTICAL INSIGHTS
          Summarizes why governance matters operationally.
         ============================================================ */}
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {content.insights.map((insight, index) => {
          const Icon = insightIcons[index];

          return (
            <motion.article
              key={insight.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="rounded-[1.25rem] border border-white/10 bg-white/[0.02] p-5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/20 bg-accent/[0.07]">
                <Icon className="h-4 w-4 text-accent" />
              </div>

              <h3 className="mt-5 text-base font-semibold tracking-[-0.02em] text-white">
                {insight.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/42">
                {insight.description}
              </p>
            </motion.article>
          );
        })}
      </div>

      {/* ============================================================
          08 — FULL-SCREEN VIEWER
          Reuses the existing architecture viewer.
         ============================================================ */}
      <ArchitectureViewer
        isOpen={isViewerOpen}
        imageSrc={imageSrc}
        imageAlt={imageAlt}
        title={content.title}
        mapLabel={locale === "fr" ? "Diagramme fonctionnel" : "Architecture Map"}
        closeLabel={locale === "fr" ? "Fermer la visionneuse" : "Close viewer"}
        instructions={
          locale === "fr"
            ? "Faites défiler pour explorer le diagramme. Appuyez sur Échap pour fermer."
            : "Scroll to explore the diagram. Press Escape to close."
        }
        onClose={() => setIsViewerOpen(false)}
      />
    </section>
  );
}