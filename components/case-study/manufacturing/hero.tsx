"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Building2,
  Database,
  Factory,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

import type { Project } from "@/content/projects";
import type { CaseStudy } from "@/types/case-study";

type ManufacturingHeroProps = {
  project: Project;
  caseStudy: CaseStudy;
};

const ecosystemNodes = [
  {
    label: "Sales / CRM",
    description: "Lead, qualification, pipeline and commercial handoff",
    icon: UsersRound,
  },
  {
    label: "Project Execution",
    description: "Planning, delivery, scope and project controls",
    icon: Building2,
  },
  {
    label: "ERP / P2P",
    description: "Procurement, inventory, finance and transactions",
    icon: Factory,
  },
  {
    label: "Data / BI",
    description: "Reporting, KPIs, forecast and decision support",
    icon: Database,
  },
];

const analysisDimensions = [
  "People",
  "Process",
  "Systems",
  "Data",
  "Controls",
  "KPI",
];

export default function ManufacturingHero({
  project,
}: ManufacturingHeroProps) {
  return (
    <header className="border-b border-white/10 pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20">
      <div className="grid gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch lg:gap-16">
        {/* LEFT — POSITIONING & PROJECT CONTEXT */}
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
              Business Systems Analysis
            </p>

            <span
              aria-hidden="true"
              className="h-px w-10 bg-white/15"
            />
          </div>

          <h1 className="mt-8 text-[clamp(3rem,6vw,6rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-white">
            Manufacturing
            <br />
            Business Systems
            <br />
            Mapping
          </h1>

          <p className="mt-8 max-w-3xl text-[clamp(1.35rem,2.3vw,2rem)] font-medium leading-[1.25] tracking-[-0.03em] text-white/85">
            Conceptual functional architecture mapping end-to-end business
            processes, system responsibilities and critical data across a
            project-driven manufacturing environment.
          </p>

          <p className="mt-7 max-w-2xl text-sm leading-6 text-white/40">
            Personal conceptual case study · No client implementation
            represented
          </p>

          <dl className="mt-10 grid gap-y-8 border-t border-white/10 pt-8 sm:grid-cols-2 sm:gap-x-10 lg:mt-auto lg:grid-cols-3">
            <div>
              <dt className="text-xs font-medium uppercase tracking-[0.18em] text-white/30">
                Role
              </dt>

              <dd className="mt-3 text-sm leading-6 text-white/75">
                Functional Analysis · Business Systems Analysis · Process
                Mapping
              </dd>
            </div>

            <div>
              <dt className="text-xs font-medium uppercase tracking-[0.18em] text-white/30">
                Focus
              </dt>

              <dd className="mt-3 text-sm leading-6 text-white/75">
                Processes · Systems · Data · Controls · KPI
              </dd>
            </div>

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

        {/* RIGHT — FUNCTIONAL ECOSYSTEM */}
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
          {/* Ambient background effects */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent/10 blur-[120px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-cyan-400/[0.06] blur-[120px]"
          />

          <div className="relative flex h-full flex-col p-6 sm:p-8">
            {/* Ecosystem header */}
            <div className="flex items-start justify-between gap-6 border-b border-white/10 pb-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/30">
                  Functional Ecosystem
                </p>

                <p className="mt-3 max-w-md text-xl font-semibold tracking-tight text-white">
                  Business systems working as one operating model
                </p>
              </div>

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent/20 bg-accent/[0.08]">
                <Factory className="h-5 w-5 text-accent" />
              </div>
            </div>

            {/* Ecosystem architecture */}
            <div className="relative flex flex-1 items-center justify-center py-10">
              <div className="grid w-full max-w-[36rem] grid-cols-2 items-center gap-4 sm:grid-cols-[1fr_auto_1fr] sm:grid-rows-2 sm:gap-x-5 sm:gap-y-5">
                {ecosystemNodes.map((node, index) => {
                  const Icon = node.icon;

                  const positions = [
                    "col-start-1 row-start-1 sm:col-start-1 sm:row-start-1",
                    "col-start-2 row-start-1 sm:col-start-3 sm:row-start-1",
                    "col-start-1 row-start-3 sm:col-start-1 sm:row-start-2",
                    "col-start-2 row-start-3 sm:col-start-3 sm:row-start-2",
                  ];

                  return (
                    <motion.div
                      key={node.label}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.55,
                        delay: 0.28 + index * 0.08,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={`${positions[index]} relative h-full min-h-[10rem] rounded-2xl border border-white/10 bg-[#0d1118]/90 p-4 backdrop-blur sm:min-h-[11.5rem] sm:p-5`}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.035]">
                        <Icon className="h-4 w-4 text-accent" />
                      </div>

                      <p className="mt-5 text-sm font-semibold text-white/85">
                        {node.label}
                      </p>

                      <p className="mt-2 text-xs leading-5 text-white/35">
                        {node.description}
                      </p>
                    </motion.div>
                  );
                })}

                {/* Central operating model */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.48,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="
                    col-span-2
                    col-start-1
                    row-start-2
                    z-10
                    flex
                    h-24
                    w-24
                    justify-self-center
                    flex-col
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-accent/25
                    bg-[#0a0e15]
                    shadow-[0_0_60px_rgba(124,156,255,0.12)]

                    sm:col-span-1
                    sm:col-start-2
                    sm:row-span-2
                    sm:row-start-1
                    sm:h-28
                    sm:w-28
                    sm:self-center
                  "
                >
                  <ShieldCheck className="h-5 w-5 text-accent" />

                  <p className="mt-2 text-center text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white/75 sm:text-xs">
                    Operating
                    <br />
                    Model
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Analysis dimensions */}
            <div className="border-t border-white/10 pt-6">
              <div className="flex items-center gap-3">
                <BarChart3 className="h-4 w-4 text-accent" />

                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/30">
                  Analysis dimensions
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {analysisDimensions.map((dimension) => (
                  <span
                    key={dimension}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/55"
                  >
                    {dimension}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* CAPABILITY BADGES */}
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
        {[
          "Business Analysis",
          "Functional Analysis",
          "Process Mapping",
          "ERP / CRM",
          "Data Governance",
        ].map((capability) => (
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