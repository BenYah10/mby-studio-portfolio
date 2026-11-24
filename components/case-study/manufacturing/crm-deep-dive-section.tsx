"use client";

/**
 * CrmDeepDiveSection
 *
 * Purpose:
 * - Present a focused functional analysis of the commercial CRM lifecycle;
 * - Show how the enterprise process map is decomposed into a domain-level view;
 * - Explain qualification, pipeline reliability, decision gates and project handoff;
 * - Distinguish pipeline from backlog;
 * - Display the dedicated CRM deep-dive visual asset;
 * - Surface the downstream impact of CRM data quality and commercial decisions.
 *
 * Portfolio governance:
 * - This section is part of a personal conceptual case study;
 * - It must not imply a real client CRM implementation;
 * - System names such as Dynamics 365 Sales are examples only;
 * - All business-facing copy is supplied through locale-specific content files.
 *
 * Internationalization:
 * - The component is language-agnostic;
 * - EN / FR text is supplied through the content prop;
 * - The visual asset can later also switch by locale.
 *
 * Architecture:
 * 1. Section introduction
 * 2. Commercial lifecycle P01 → P05
 * 3. CRM analysis areas
 * 4. Pipeline vs Backlog comparison
 * 5. Full CRM analysis visual
 * 6. Analytical insights
 * 7. Full-screen viewer
 */

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Database,
  Filter,
  Flag,
  GitBranch,
  Maximize2,
  ShieldCheck,
  Workflow,
} from "lucide-react";

import ArchitectureViewer from "./architecture-viewer";
import type { Locale } from "@/i18n/config";

/**
 * One commercial lifecycle step.
 */
type CrmLifecycleStep = {
  id: string;
  title: string;
  description: string;
};

/**
 * One CRM analysis area.
 */
type CrmAnalysisArea = {
  title: string;
  description: string;
  keywords: readonly string[];
};

/**
 * Pipeline vs Backlog comparison content.
 */
type PipelineVsBacklog = {
  label: string;
  pipelineTitle: string;
  pipelineDescription: string;
  backlogTitle: string;
  backlogDescription: string;
  example: string;
};

/**
 * One analytical insight shown at the end of the section.
 */
type CrmInsight = {
  title: string;
  description: string;
};

/**
 * Content contract for the CRM deep dive.
 *
 * All business-facing labels come from locale-specific content.
 */
type CrmDeepDiveContent = {
  eyebrow: string;
  title: string;
  intro: string;

  lifecycleLabel: string;
  lifecycle: readonly CrmLifecycleStep[];

  analysisAreasLabel: string;
  analysisAreas: readonly CrmAnalysisArea[];

  pipelineVsBacklog: PipelineVsBacklog;

  insights: readonly CrmInsight[];

  viewerLabel: string;
  viewerCaption: string;
};

/**
 * Component props.
 */
type CrmDeepDiveSectionProps = {
  /** Native page locale; omitted on legacy routes (English). */
  locale?: Locale;
  content: CrmDeepDiveContent;
  imageSrc: string;
  imageAlt: string;
};

/**
 * Icons aligned with the four CRM analysis areas:
 * 01 Qualification
 * 02 Pipeline Reliability
 * 03 Decision Gate
 * 04 Controlled Handoff
 */
const analysisAreaIcons = [
  Filter,
  BarChart3,
  ShieldCheck,
  Workflow,
];

/**
 * Icons aligned with the four analytical insights:
 * 01 Pipeline Reliability
 * 02 Decision Gates
 * 03 Data Dependencies
 * 04 Controlled Handoff
 */
const insightIcons = [
  BarChart3,
  ShieldCheck,
  Database,
  GitBranch,
];

export default function CrmDeepDiveSection({
  content,
  imageSrc,
  imageAlt,
  locale = "en",
}: CrmDeepDiveSectionProps) {
  /**
   * Controls the reusable full-screen viewer.
   */
  const [isViewerOpen, setIsViewerOpen] = React.useState(false);

  return (
    <section
      id="crm-deep-dive"
      aria-labelledby="crm-deep-dive-title"
      className="border-b border-white/10 pb-20 sm:pb-24 lg:pb-28"
    >
      {/* ============================================================
          01 — SECTION INTRO
          Positions CRM as an upstream source for planning,
          forecasting, capacity and downstream execution.
         ============================================================ */}
      <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
        <div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              06
            </span>

            <span
              aria-hidden="true"
              className="h-px w-8 bg-white/15"
            />

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
              {content.eyebrow.replace(/^06\s*[—-]\s*/, "")}
            </p>
          </div>

          <p className="mt-7 max-w-sm text-sm leading-7 text-white/40">
            {content.lifecycleLabel}
          </p>
        </div>

        <div>
          <h2
            id="crm-deep-dive-title"
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
          02 — COMMERCIAL LIFECYCLE
          Shows the P01 → P05 CRM/commercial progression.
         ============================================================ */}
      <div className="mt-16">
        <div className="mb-7 flex items-center gap-3">
          <GitBranch className="h-4 w-4 text-accent" />

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
            {content.lifecycleLabel}
          </p>
        </div>

        <div className="grid gap-4 xl:grid-cols-5">
          {content.lifecycle.map((step, index) => (
            <motion.article
              key={step.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: index * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative rounded-[1.4rem] border border-white/10 bg-white/[0.025] p-5"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="rounded-md border border-accent/20 bg-accent/[0.07] px-2.5 py-1.5 text-[0.65rem] font-semibold tracking-[0.12em] text-accent">
                  {step.id}
                </span>

                {index < content.lifecycle.length - 1 && (
                  <ArrowRight className="h-4 w-4 text-accent/30" />
                )}
              </div>

              <h3 className="mt-5 text-lg font-semibold tracking-[-0.025em] text-white">
                {step.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/45">
                {step.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>

      {/* ============================================================
          03 — CRM ANALYSIS AREAS
          Highlights the four functional lenses used in the deep dive.
         ============================================================ */}
      <div className="mt-6">
        <div className="mb-7 flex items-center gap-3">
          <Filter className="h-4 w-4 text-accent" />

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
            {content.analysisAreasLabel}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {content.analysisAreas.map((area, index) => {
            const Icon = analysisAreaIcons[index];

            return (
              <motion.article
                key={area.title}
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
                  {area.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/42">
                  {area.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {area.keywords.map((keyword) => (
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
          04 — PIPELINE VS BACKLOG
          Clarifies a key commercial / operational distinction.
         ============================================================ */}
      <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0d1017]">
        <div className="border-b border-white/10 px-6 py-5 sm:px-8">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-4 w-4 text-accent" />

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {content.pipelineVsBacklog.label}
            </p>
          </div>
        </div>

        <div className="grid gap-px bg-white/10 lg:grid-cols-2">
          {/* Pipeline */}
          <div className="bg-[#0b0e14] p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-5 w-5 text-accent" />

              <h3 className="text-xl font-semibold tracking-[-0.03em] text-white">
                {content.pipelineVsBacklog.pipelineTitle}
              </h3>
            </div>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/48">
              {content.pipelineVsBacklog.pipelineDescription}
            </p>
          </div>

          {/* Backlog */}
          <div className="bg-[#0b0e14] p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <Flag className="h-5 w-5 text-accent" />

              <h3 className="text-xl font-semibold tracking-[-0.03em] text-white">
                {content.pipelineVsBacklog.backlogTitle}
              </h3>
            </div>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/48">
              {content.pipelineVsBacklog.backlogDescription}
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 px-6 py-5 sm:px-8">
          <p className="text-sm leading-7 text-white/55">
            {content.pipelineVsBacklog.example}
          </p>
        </div>
      </div>

      {/* ============================================================
          05 — FULL CRM ANALYSIS ASSET
          Displays the dedicated CRM Functional Deep Dive visual.
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
              CRM Functional Deep Dive
            </p>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/40">
              {content.viewerCaption}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsViewerOpen(true)}
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-accent/20 bg-accent/[0.07] px-4 py-3 text-xs font-semibold text-white/75 transition hover:border-accent/35 hover:bg-accent/[0.11]"
          >
            <Maximize2 className="h-4 w-4 text-accent" />
            {content.viewerLabel}
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
          06 — ANALYTICAL INSIGHTS
          Summarizes the functional value of the CRM deep dive.
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
          07 — FULL-SCREEN VIEWER
          Reuses the same viewer as the enterprise map and Process Inventory.
         ============================================================ */}
      <ArchitectureViewer
        isOpen={isViewerOpen}
        imageSrc={imageSrc}
        imageAlt={imageAlt}
        title={content.viewerCaption}
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