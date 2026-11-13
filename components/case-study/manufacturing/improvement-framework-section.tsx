"use client";

/**
 * ImprovementFrameworkSection
 *
 * Purpose:
 * - Present a structured functional-analysis approach from AS-IS to validation;
 * - Show how pain points are converted into root causes, requirements and TO-BE design;
 * - Position automation as a downstream decision, not the starting point;
 * - Connect process analysis, ownership, systems/data and measurement;
 * - Highlight measurable improvement through KPI and baseline thinking.
 *
 * Portfolio governance:
 * - This section is part of a personal conceptual case study;
 * - It does not represent a real client transformation program;
 * - All business-facing copy comes from locale-specific content files.
 *
 * Internationalization:
 * - The component is language-agnostic;
 * - EN / FR content is supplied through the content prop.
 *
 * Architecture:
 * 1. Section introduction
 * 2. Improvement lifecycle
 * 3. Analysis lenses
 * 4. Root-cause flow
 * 5. Automation decision lens
 * 6. Example KPI measures
 * 7. Analytical insights
 */

import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Bot,
  Database,
  Gauge,
  GitBranch,
  SearchCheck,
  ShieldCheck,
  Target,
  UserCheck,
  Workflow,
} from "lucide-react";

/**
 * One improvement lifecycle step.
 */
type ImprovementLifecycleStep = {
  id: string;
  title: string;
  description: string;
};

/**
 * One analysis area.
 */
type ImprovementAnalysisArea = {
  title: string;
  description: string;
  keywords: readonly string[];
};

/**
 * One root-cause flow step.
 */
type RootCauseStep = {
  title: string;
  description: string;
};

/**
 * One automation decision question.
 */
type AutomationQuestion = {
  title: string;
  description: string;
};

/**
 * One KPI / improvement measure.
 */
type ImprovementKpi = {
  title: string;
  description: string;
};

/**
 * One final insight.
 */
type ImprovementInsight = {
  title: string;
  description: string;
};

/**
 * Content contract for the process improvement framework.
 */
type ImprovementFrameworkContent = {
  eyebrow: string;
  title: string;
  intro: string;

  lifecycleLabel: string;
  lifecycle: readonly ImprovementLifecycleStep[];

  analysisAreasLabel: string;
  analysisAreas: readonly ImprovementAnalysisArea[];

  rootCauseLabel: string;
  rootCauseFlow: readonly RootCauseStep[];

  automationLabel: string;
  automationQuestions: readonly AutomationQuestion[];

  kpiLabel: string;
  kpis: readonly ImprovementKpi[];

  insights: readonly ImprovementInsight[];
};

/**
 * Component props.
 */
type ImprovementFrameworkSectionProps = {
  content: ImprovementFrameworkContent;
};

/**
 * Icons for the four analysis lenses.
 */
const analysisIcons = [
  Workflow,
  UserCheck,
  Database,
  ShieldCheck,
];

/**
 * Icons for the root-cause sequence.
 */
const rootCauseIcons = [
  Activity,
  SearchCheck,
  GitBranch,
  Target,
];

/**
 * Icons for the automation-decision lens.
 */
const automationIcons = [
  Workflow,
  GitBranch,
  Database,
  Gauge,
];

/**
 * Icons for final insights.
 */
const insightIcons = [
  Bot,
  SearchCheck,
  Gauge,
  Target,
];

export default function ImprovementFrameworkSection({
  content,
}: ImprovementFrameworkSectionProps) {
  return (
    <section
      id="process-improvement-framework"
      aria-labelledby="process-improvement-title"
      className="border-b border-white/10 pb-20 sm:pb-24 lg:pb-28"
    >
      {/* ============================================================
          01 — SECTION INTRO
         ============================================================ */}
      <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
        <div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              09
            </span>

            <span
              aria-hidden="true"
              className="h-px w-8 bg-white/15"
            />

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
              {content.eyebrow.replace(/^09\s*[—-]\s*/, "")}
            </p>
          </div>

          <p className="mt-7 max-w-sm text-sm leading-7 text-white/40">
            {content.lifecycleLabel}
          </p>
        </div>

        <div>
          <h2
            id="process-improvement-title"
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
          02 — IMPROVEMENT LIFECYCLE
          AS-IS → Pain Points → Root Causes → Rules → Requirements
          → TO-BE → Automation → KPI / Baseline → Validation
         ============================================================ */}
      <div className="mt-16">
        <div className="mb-7 flex items-center gap-3">
          <Workflow className="h-4 w-4 text-accent" />

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
            {content.lifecycleLabel}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {content.lifecycle.map((step, index) => (
            <motion.article
              key={step.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: index * 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative rounded-[1.3rem] border border-white/10 bg-white/[0.025] p-5"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="rounded-md border border-accent/20 bg-accent/[0.07] px-2.5 py-1.5 text-[0.62rem] font-semibold tracking-[0.12em] text-accent">
                  {step.id}
                </span>

                {index < content.lifecycle.length - 1 && (
                  <ArrowRight className="h-4 w-4 text-accent/30" />
                )}
              </div>

              <h3 className="mt-5 text-base font-semibold tracking-[-0.025em] text-white">
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
          03 — IMPROVEMENT ANALYSIS LENSES
         ============================================================ */}
      <div className="mt-6">
        <div className="mb-7 flex items-center gap-3">
          <SearchCheck className="h-4 w-4 text-accent" />

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
            {content.analysisAreasLabel}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {content.analysisAreas.map((area, index) => {
            const Icon = analysisIcons[index];

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
          04 — ROOT-CAUSE ANALYSIS
         ============================================================ */}
      <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0d1017]">
        <div className="border-b border-white/10 px-6 py-5 sm:px-8">
          <div className="flex items-center gap-3">
            <GitBranch className="h-4 w-4 text-accent" />

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {content.rootCauseLabel}
            </p>
          </div>
        </div>

        <div className="grid gap-px bg-white/10 lg:grid-cols-4">
          {content.rootCauseFlow.map((step, index) => {
            const Icon = rootCauseIcons[index];

            return (
              <div
                key={step.title}
                className="bg-[#0b0e14] p-6 sm:p-7"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/20 bg-accent/[0.07]">
                    <Icon className="h-4 w-4 text-accent" />
                  </div>

                  <span className="text-xs font-semibold text-accent/45">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-semibold tracking-[-0.03em] text-white">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-white/48">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ============================================================
          05 — AUTOMATION DECISION LENS
         ============================================================ */}
      <div className="mt-6">
        <div className="mb-7 flex items-center gap-3">
          <Bot className="h-4 w-4 text-accent" />

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
            {content.automationLabel}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {content.automationQuestions.map((question, index) => {
            const Icon = automationIcons[index];

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
          06 — EXAMPLE IMPROVEMENT MEASURES
         ============================================================ */}
      <div className="mt-6">
        <div className="mb-7 flex items-center gap-3">
          <Gauge className="h-4 w-4 text-accent" />

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
            {content.kpiLabel}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {content.kpis.map((kpi, index) => (
            <motion.article
              key={kpi.title}
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
              <div className="flex items-center justify-between gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/20 bg-accent/[0.07]">
                  <Gauge className="h-4 w-4 text-accent" />
                </div>

                <span className="text-xs font-semibold text-accent/45">
                  KPI {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="mt-5 text-base font-semibold tracking-[-0.02em] text-white">
                {kpi.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/42">
                {kpi.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>

      {/* ============================================================
          07 — ANALYTICAL INSIGHTS
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
    </section>
  );
}