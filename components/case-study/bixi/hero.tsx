"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  BarChart3,
  Bike,
  Database,
  MapPinned,
  RefreshCw,
} from "lucide-react";

import type { Project } from "@/content/projects";
import type { CaseStudy } from "@/types/case-study";

type BixiHeroProps = {
  project: Project;
  caseStudy: CaseStudy;
};

const dashboardSignals = [
  {
    icon: Bike,
    value: "600+",
    label: "Stations",
  },
  {
    icon: BarChart3,
    value: "6",
    label: "Core KPIs",
  },
  {
    icon: RefreshCw,
    value: "Hourly",
    label: "Analysis",
  },
];

const analyticsFlow = [
  {
    number: "01",
    label: "Source Data",
  },
  {
    number: "02",
    label: "Power Query",
  },
  {
    number: "03",
    label: "DAX Model",
  },
  {
    number: "04",
    label: "Decision Support",
  },
];

export default function BixiHero({
  project,
  caseStudy,
}: BixiHeroProps) {
  return (
    <header className="border-b border-white/10 pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20">
      <div className="grid gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex flex-col"
        >
          <div className="flex items-center gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
              {project.category}
            </p>

            <span
              aria-hidden="true"
              className="h-px w-10 bg-white/15"
            />
          </div>

          <h1 className="mt-8 text-[clamp(3rem,6vw,6rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-white">
            {project.title}
          </h1>

          <p className="mt-8 max-w-3xl text-[clamp(1.5rem,2.7vw,2.35rem)] font-medium leading-[1.2] tracking-[-0.03em] text-white/85">
            {caseStudy.headline}
          </p>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/55">
            {caseStudy.introduction}
          </p>

          <dl className="mt-12 grid gap-y-8 border-t border-white/10 pt-8 sm:grid-cols-2 sm:gap-x-10 lg:mt-auto lg:grid-cols-3">
            <div>
              <dt className="text-xs font-medium uppercase tracking-[0.18em] text-white/30">
                Role
              </dt>

              <dd className="mt-3 text-sm leading-6 text-white/75">
                {project.role}
              </dd>
            </div>

            {caseStudy.timeline && (
              <div>
                <dt className="text-xs font-medium uppercase tracking-[0.18em] text-white/30">
                  Timeline
                </dt>

                <dd className="mt-3 text-sm leading-6 text-white/75">
                  {caseStudy.timeline}
                </dd>
              </div>
            )}

            <div>
              <dt className="text-xs font-medium uppercase tracking-[0.18em] text-white/30">
                Status
              </dt>

              <dd className="mt-3 text-sm leading-6 text-white/75">
                {project.status}
              </dd>
            </div>
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 28, scale: 0.985 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{
            duration: 0.9,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative min-h-[36rem] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025]"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-sky-400/10 blur-[120px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-emerald-400/[0.07] blur-[130px]"
          />

          <div className="relative flex h-full flex-col">
            <div className="flex flex-col gap-5 border-b border-white/10 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/30">
                  Analytics System
                </p>

                <p className="mt-3 text-xl font-semibold tracking-tight text-white">
                  Operational Intelligence
                </p>
              </div>

              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-400/25 bg-sky-400/[0.08] px-3 py-1.5">
                <span className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.8)]" />

                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-300">
                  Power BI
                </span>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.75,
                  delay: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#050a10]"
              >
                <Image
                  src="/images/projects/bixi/BIXI-Operations-Dashboard.png"
                  alt="BIXI Power BI operations dashboard showing network availability, Azure Maps and hourly mobility analysis"
                  width={1536}
                  height={1024}
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="h-auto w-full"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05080d]/35 via-transparent to-transparent" />
              </motion.div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                {dashboardSignals.map((signal, index) => {
                  const Icon = signal.icon;

                  return (
                    <motion.div
                      key={signal.label}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.55,
                        delay: 0.48 + index * 0.08,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 sm:p-4"
                    >
                      <Icon className="h-4 w-4 text-sky-300" />

                      <p className="mt-4 text-lg font-semibold tracking-tight text-white sm:text-xl">
                        {signal.value}
                      </p>

                      <p className="mt-1 text-[0.68rem] uppercase tracking-[0.14em] text-white/35 sm:text-xs">
                        {signal.label}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="mt-auto border-t border-white/10 px-6 py-6 sm:px-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/[0.07]">
                  <Database className="h-5 w-5 text-emerald-300" />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/30">
                    Analytics Pipeline
                  </p>

                  <p className="mt-1 text-sm text-white/65">
                    From mobility data to operational decisions
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {analyticsFlow.map((step) => (
                  <div
                    key={step.label}
                    className="rounded-xl border border-white/10 bg-white/[0.025] px-3 py-3"
                  >
                    <p className="text-xs font-semibold text-sky-300">
                      {step.number}
                    </p>

                    <p className="mt-2 text-xs leading-5 text-white/60">
                      {step.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-5">
                <MapPinned className="h-4 w-4 shrink-0 text-sky-300" />

                <p className="text-sm text-white/50">
                  Geographic monitoring · Station prioritization · Hourly
                  availability analysis
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.65,
          delay: 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mt-8 flex flex-wrap gap-2"
      >
        {project.capabilities.map((capability) => (
          <span
            key={capability}
            className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white/55"
          >
            {capability}
          </span>
        ))}
      </motion.div>
    </header>
  );
}