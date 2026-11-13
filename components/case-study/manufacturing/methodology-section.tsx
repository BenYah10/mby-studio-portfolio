"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  ChartNoAxesCombined,
  Database,
  GitBranch,
  Map,
  Search,
  ShieldCheck,
  UserRoundCheck,
  Wrench,
} from "lucide-react";

type MethodologyStep = {
  title: string;
  description: string;
};

type MethodologyContent = {
  eyebrow: string;
  title: string;
  intro: string;
  approachLabel: string;
  approachSteps: readonly MethodologyStep[];
  transformationLabel: string;
  transformationSteps: readonly string[];
  phases: readonly MethodologyStep[];
};

type MethodologySectionProps = {
  content: MethodologyContent;
};

const stepIcons = [
  Search,
  Map,
  ShieldCheck,
  Database,
  UserRoundCheck,
  ChartNoAxesCombined,
  Wrench,
  Bot,
];

export default function MethodologySection({
  content,
}: MethodologySectionProps) {
  return (
    <section
      id="methodology"
      aria-labelledby="methodology-title"
      className="border-b border-white/10 pb-20 sm:pb-24 lg:pb-28"
    >
      {/* SECTION INTRO */}
      <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
        <div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              02
            </span>

            <span
              aria-hidden="true"
              className="h-px w-8 bg-white/15"
            />

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
              {content.eyebrow.replace(/^02\s*[—-]\s*/, "")}
            </p>
          </div>

          <p className="mt-7 max-w-sm text-sm leading-7 text-white/40">
            {content.approachLabel}
          </p>
        </div>

        <div>
          <h2
            id="methodology-title"
            className="max-w-4xl text-[clamp(2.35rem,4.8vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-white"
          >
            {content.title}
          </h2>

          <p className="mt-8 max-w-3xl text-[clamp(1.05rem,1.6vw,1.35rem)] leading-8 text-white/55">
            {content.intro}
          </p>
        </div>
      </div>

      {/* HIGH-LEVEL APPROACH */}
      <div className="mt-16">
        <div className="mb-7 flex items-center gap-3">
          <GitBranch className="h-4 w-4 text-accent" />

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
            {content.approachLabel}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {content.approachSteps.map((step, index) => {
            const Icon = stepIcons[index];

            return (
              <motion.article
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative min-h-[13rem] overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/[0.025] p-5 sm:p-6"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-accent/[0.05] blur-3xl transition duration-500 group-hover:bg-accent/[0.1]"
                />

                <div className="relative">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/20 bg-accent/[0.07]">
                      <Icon className="h-4 w-4 text-accent" />
                    </div>

                    <span className="text-[0.65rem] font-semibold tracking-[0.18em] text-white/20">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-6 text-lg font-semibold tracking-[-0.025em] text-white">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-white/42">
                    {step.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* TRANSFORMATION PATH */}
      <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0d1017]">
        <div className="border-b border-white/10 px-6 py-5 sm:px-8">
          <div className="flex items-center gap-3">
            <GitBranch className="h-4 w-4 text-accent" />

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {content.transformationLabel}
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-4">
            {content.transformationSteps.map((step, index) => {
              const isStart = index === 0;
              const isEnd =
                index === content.transformationSteps.length - 1;
              const isTarget = step === "TO-BE";
              const isAutomation =
                step === "Automation" || step === "Automatisation";

              return (
                <div
                  key={step}
                  className="flex items-center gap-2"
                >
                  <span
                    className={
                      isStart || isEnd || isTarget || isAutomation
                        ? "rounded-lg border border-accent/20 bg-accent/[0.07] px-3 py-2 text-xs font-medium text-white/75"
                        : "rounded-lg border border-white/10 bg-white/[0.025] px-3 py-2 text-xs font-medium text-white/55"
                    }
                  >
                    {step}
                  </span>

                  {index < content.transformationSteps.length - 1 && (
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-accent/40" />
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 grid gap-4 border-t border-white/10 pt-6 md:grid-cols-3">
            {content.phases.map((phase) => (
              <div key={phase.title}>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/25">
                  {phase.title}
                </p>

                <p className="mt-2 text-sm leading-6 text-white/45">
                  {phase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}