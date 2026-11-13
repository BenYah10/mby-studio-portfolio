"use client";

/**
 * ConclusionSection
 *
 * Purpose:
 * - Close the Manufacturing Business Systems Mapping case study;
 * - Summarize the analytical value of the work without introducing
 *   another heavy technical section;
 * - Reinforce the relationship between process, ownership, data,
 *   controls and technology;
 * - Surface the core capabilities demonstrated by the case study.
 *
 * Portfolio governance:
 * - This is a personal conceptual case study;
 * - It must not imply delivery for a real client;
 * - All business-facing copy comes from locale-specific content files.
 *
 * Internationalization:
 * - The component is language-agnostic;
 * - EN / FR content is supplied through the content prop.
 *
 * Architecture:
 * 1. Section introduction
 * 2. Key takeaways
 * 3. Capabilities demonstrated
 * 4. Closing statement
 */

import { motion } from "framer-motion";
import {
  Boxes,
  GitBranch,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";

/**
 * One key takeaway.
 */
type ConclusionTakeaway = {
  title: string;
  description: string;
};

/**
 * Content contract for the conclusion section.
 */
type ConclusionContent = {
  eyebrow: string;
  title: string;
  intro: string;

  takeawaysLabel: string;
  takeaways: readonly ConclusionTakeaway[];

  capabilityLabel: string;
  capabilities: readonly string[];

  closingStatement: string;
};

/**
 * Component props.
 */
type ConclusionSectionProps = {
  content: ConclusionContent;
};

/**
 * Icons aligned with the four takeaways:
 * 01 End-to-End Thinking
 * 02 Functional Depth
 * 03 Governance & Reliability
 * 04 Continuous Improvement
 */
const takeawayIcons = [
  GitBranch,
  Boxes,
  ShieldCheck,
  Target,
];

export default function ConclusionSection({
  content,
}: ConclusionSectionProps) {
  return (
    <section
      id="manufacturing-conclusion"
      aria-labelledby="manufacturing-conclusion-title"
      className="pb-8 sm:pb-12 lg:pb-16"
    >
      {/* ============================================================
          01 — SECTION INTRO
          Keeps the closing section deliberately lighter than the
          preceding deep-dive sections.
         ============================================================ */}
      <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
        <div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              10
            </span>

            <span
              aria-hidden="true"
              className="h-px w-8 bg-white/15"
            />

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
              {content.eyebrow.replace(/^10\s*[—-]\s*/, "")}
            </p>
          </div>

          <p className="mt-7 max-w-sm text-sm leading-7 text-white/40">
            {content.takeawaysLabel}
          </p>
        </div>

        <div>
          <h2
            id="manufacturing-conclusion-title"
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
          02 — KEY TAKEAWAYS
          Four concise conclusions from the case study.
         ============================================================ */}
      <div className="mt-16">
        <div className="mb-7 flex items-center gap-3">
          <Sparkles className="h-4 w-4 text-accent" />

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
            {content.takeawaysLabel}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {content.takeaways.map((takeaway, index) => {
            const Icon = takeawayIcons[index];

            return (
              <motion.article
                key={takeaway.title}
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
                  {takeaway.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/42">
                  {takeaway.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* ============================================================
          03 — CAPABILITIES DEMONSTRATED
          Compact tag-style presentation to avoid another dense section.
         ============================================================ */}
      <div className="mt-6 rounded-[1.75rem] border border-white/10 bg-[#0d1017] p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <Target className="h-4 w-4 text-accent" />

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {content.capabilityLabel}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {content.capabilities.map((capability, index) => (
            <motion.span
              key={capability}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.35,
                delay: index * 0.03,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="rounded-xl border border-white/10 bg-white/[0.025] px-4 py-2.5 text-sm text-white/55"
            >
              {capability}
            </motion.span>
          ))}
        </div>
      </div>

      {/* ============================================================
          04 — CLOSING STATEMENT
          Final synthesis before the shared portfolio footer.
         ============================================================ */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mt-6 rounded-[1.75rem] border border-accent/15 bg-accent/[0.045] px-6 py-8 sm:px-8 sm:py-10"
      >
        <p className="max-w-4xl text-[clamp(1.25rem,2.1vw,1.7rem)] font-medium leading-9 tracking-[-0.025em] text-white/80">
          {content.closingStatement}
        </p>
      </motion.div>
    </section>
  );
}