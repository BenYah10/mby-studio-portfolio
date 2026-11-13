"use client";

/**
 * SystemsDataSection
 *
 * Purpose:
 * - Present the functional role of the main business systems;
 * - Connect systems to critical data, ownership and downstream usage;
 * - Distinguish core systems from transverse platforms;
 * - Introduce cross-cutting governance and data ownership questions.
 *
 * Portfolio governance:
 * - This component represents a conceptual Business Systems Analysis view;
 * - It must not imply that these systems were implemented for a real client;
 * - Business content is received through props so the component can support
 *   the future global FR / EN language switch.
 *
 * Architecture:
 * 1. Section introduction
 * 2. Core business systems
 * 3. Transverse platforms
 * 4. Cross-cutting governance
 * 5. Data ownership lens
 */

import { motion } from "framer-motion";
import {
  BarChart3,
  Boxes,
  Database,
  FileText,
  GitBranch,
  Layers3,
  LockKeyhole,
  Network,
  ShieldCheck,
  Workflow,
} from "lucide-react";

/**
 * Functional definition of one core business system.
 *
 * The component does not assume a specific technology product.
 * Each system is described through:
 * - its business responsibility;
 * - its critical information;
 * - its primary owner;
 * - its downstream consumers / uses.
 */
type SystemItem = {
  name: string;
  businessRole: string;
  criticalData: readonly string[];
  primaryOwner: string;
  downstreamUse: readonly string[];
};

/**
 * Functional definition of a transverse platform.
 *
 * Transverse platforms support several business processes rather than
 * representing one primary operating domain.
 */
type TransversePlatform = {
  name: string;
  role: string;
  capabilities: readonly string[];
};

/**
 * Content contract consumed by SystemsDataSection.
 *
 * All business-facing copy is supplied externally so the visual component
 * remains independent from the active language.
 */
type SystemsDataContent = {
  eyebrow: string;
  title: string;
  intro: string;

  sectionSummary: string;
  coreSystemsLabel: string;
  criticalDataLabel: string;
  primaryOwnerLabel: string;
  downstreamUseLabel: string;
  transversePlatformLabel: string;
  governanceLabel: string;
  ownershipLensLabel: string;

  systems: readonly SystemItem[];
  transversePlatforms: readonly TransversePlatform[];
  governance: readonly string[];
  ownershipQuestions: readonly string[];
};

/**
 * Component props.
 */
type SystemsDataSectionProps = {
  content: SystemsDataContent;
};

/**
 * Icons used for the five core business-system cards.
 *
 * The icon order must remain aligned with content.systems:
 * 01 CRM
 * 02 ERP
 * 03 Project Management
 * 04 Field Service
 * 05 BI / Analytics
 */
const systemIcons = [
  GitBranch,
  Boxes,
  Layers3,
  Workflow,
  BarChart3,
];

/**
 * Icons used for the cross-cutting governance capabilities.
 *
 * The array order must remain aligned with content.governance.
 */
const governanceIcons = [
  Database,
  LockKeyhole,
  ShieldCheck,
  Network,
  FileText,
  Workflow,
];

export default function SystemsDataSection({
  content,
}: SystemsDataSectionProps) {
  return (
    <section
      id="systems-data"
      aria-labelledby="systems-data-title"
      className="border-b border-white/10 pb-20 sm:pb-24 lg:pb-28"
    >
      {/* ============================================================
          01 — SECTION INTRO
          Establishes the analytical purpose before showing systems.
         ============================================================ */}
      <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
        <div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              04
            </span>

            <span
              aria-hidden="true"
              className="h-px w-8 bg-white/15"
            />

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
              {content.eyebrow.replace(/^04\s*[—-]\s*/, "")}
            </p>
          </div>

          {/*
           * Temporary descriptive copy.
           *
           * This label will be externalized into EN / FR content
           * before the section is connected to the case-study layout.
           */}
          <p className="mt-7 max-w-sm text-sm leading-7 text-white/40">
              {content.sectionSummary}
          </p>
        </div>

        <div>
          <h2
            id="systems-data-title"
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
          02 — CORE BUSINESS SYSTEMS
          Shows how each system contributes to the operating model.
         ============================================================ */}
      <div className="mt-16">
        <div className="mb-7 flex items-center gap-3">
          <Network className="h-4 w-4 text-accent" />

          {/*
           * Temporary UI label.
           * Will be moved to systemsData EN / FR content next.
           */}
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
              {content.coreSystemsLabel}
          </p>
        </div>

        <div className="grid gap-4 xl:grid-cols-5">
          {content.systems.map((system, index) => {
            const Icon = systemIcons[index];

            return (
              <motion.article
                key={system.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="rounded-[1.4rem] border border-white/10 bg-white/[0.025] p-5"
              >
                {/* Card header: icon + visual system index */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/20 bg-accent/[0.07]">
                    <Icon className="h-4 w-4 text-accent" />
                  </div>

                  <span className="text-[0.65rem] font-semibold tracking-[0.18em] text-white/20">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Functional system identity */}
                <h3 className="mt-5 text-lg font-semibold tracking-[-0.025em] text-white">
                  {system.name}
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/45">
                  {system.businessRole}
                </p>

                {/* Critical data carried by the system */}
                <div className="mt-6 border-t border-white/10 pt-5">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/25">
                      {content.criticalDataLabel}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {system.criticalData.map((item) => (
                      <span
                        key={item}
                        className="rounded-lg border border-white/10 bg-white/[0.025] px-2.5 py-1.5 text-[0.68rem] leading-4 text-white/50"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Primary business ownership */}
                <div className="mt-5">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/25">
                    {content.primaryOwnerLabel}
                  </p>

                  <p className="mt-2 text-xs leading-5 text-white/55">
                    {system.primaryOwner}
                  </p>
                </div>

                {/* Downstream processes / decisions using this information */}
                <div className="mt-5">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/25">
                    {content.downstreamUseLabel}
                  </p>

                  <div className="mt-3 space-y-2">
                    {system.downstreamUse.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-2 text-xs leading-5 text-white/45"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/60" />

                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* ============================================================
          03 — TRANSVERSE PLATFORMS
          Platforms used across multiple processes and system domains.
         ============================================================ */}
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {content.transversePlatforms.map((platform, index) => (
          <motion.article
            key={platform.name}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.5,
              delay: index * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="rounded-[1.5rem] border border-white/10 bg-[#0d1017] p-6 sm:p-7"
          >
            <div className="flex items-center gap-3">
              <Workflow className="h-4 w-4 text-accent" />

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  {content.transversePlatformLabel}
              </p>
            </div>

            <h3 className="mt-5 text-xl font-semibold tracking-[-0.03em] text-white">
              {platform.name}
            </h3>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/45">
              {platform.role}
            </p>

            {/* Functional capabilities supported by the platform */}
            <div className="mt-6 flex flex-wrap gap-2">
              {platform.capabilities.map((capability) => (
                <span
                  key={capability}
                  className="rounded-lg border border-white/10 bg-white/[0.025] px-3 py-2 text-xs text-white/55"
                >
                  {capability}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>

      {/* ============================================================
          04 — CROSS-CUTTING GOVERNANCE
          Governance capabilities that apply across the whole ecosystem.
         ============================================================ */}
      <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.02]">
        <div className="border-b border-white/10 px-6 py-5 sm:px-8">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-4 w-4 text-accent" />

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
                {content.governanceLabel}
            </p>
          </div>
        </div>

        <div className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {content.governance.map((item, index) => {
            const Icon = governanceIcons[index];

            return (
              <div
                key={item}
                className="flex items-center gap-3 bg-[#0b0e14] px-5 py-5"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-accent/20 bg-accent/[0.06]">
                  <Icon className="h-4 w-4 text-accent" />
                </div>

                <p className="text-sm font-medium text-white/65">
                  {item}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ============================================================
          05 — DATA OWNERSHIP LENS
          Questions used to examine data responsibility and source-of-truth.
         ============================================================ */}
      <div className="mt-6 rounded-[1.75rem] border border-accent/15 bg-accent/[0.035] p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <Database className="h-4 w-4 text-accent" />

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {content.ownershipLensLabel}
          </p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {content.ownershipQuestions.map((question, index) => (
            <div
              key={question}
              className="rounded-xl border border-white/10 bg-[#0b0e14]/70 p-4"
            >
              <span className="text-[0.62rem] font-semibold tracking-[0.18em] text-white/20">
                {String(index + 1).padStart(2, "0")}
              </span>

              <p className="mt-3 text-sm leading-6 text-white/60">
                {question}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}