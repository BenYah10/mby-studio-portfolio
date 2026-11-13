"use client";

/**
 * ProcessInventorySection
 *
 * Purpose:
 * - Present the Process Inventory as a governance and prioritization tool;
 * - Show a representative snapshot of selected processes;
 * - Explain the M0 → M4 maturity model;
 * - Display the full Process Inventory asset;
 * - Surface the analytical value of ownership, analysis status,
 *   maturity and prioritization.
 *
 * Portfolio governance:
 * - This is a personal conceptual case study;
 * - Inventory values represent the current analytical state of the project;
 * - Unknown or unvalidated information remains explicitly marked as
 *   "To confirm", "To analyze", "To discover", etc.;
 * - The component must not fabricate maturity, risk or ownership values.
 *
 * Internationalization:
 * - All business-facing copy is supplied through content props;
 * - The same visual component can therefore support EN / FR;
 * - The image asset can later also switch by locale.
 *
 * Architecture:
 * 1. Section introduction
 * 2. Process Inventory snapshot
 * 3. Process maturity model
 * 4. Full Process Inventory preview
 * 5. Analytical insights
 * 6. Full-screen asset viewer
 */

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  ClipboardList,
  Flag,
  GitBranch,
  Maximize2,
  UserRoundCheck,
} from "lucide-react";

import ArchitectureViewer from "./architecture-viewer";

/**
 * One representative process shown in the coded snapshot.
 *
 * These values reflect the current state of the conceptual inventory.
 * Unknown or unvalidated information should remain explicit.
 */
type ProcessInventoryItem = {
  id: string;
  name: string;
  primarySystem: string;
  secondarySystem: string;
  owner: string;
  analysisStatus: string;
  maturity: string;
  documentation: string;
  painPoints: string;
  priority: string;
};

/**
 * One level of the M0 → M4 process maturity model.
 */
type ProcessMaturityLevel = {
  level: string;
  title: string;
  description: string;
};

/**
 * One analytical insight displayed at the end of the section.
 */
type ProcessInventoryInsight = {
  title: string;
  description: string;
};

/**
 * Content contract for ProcessInventorySection.
 *
 * All business-facing labels and descriptions are supplied from
 * locale-specific content files.
 *
 * This keeps the component language-agnostic and ready for the
 * future global FR / EN switch.
 */
type ProcessInventoryContent = {
  eyebrow: string;
  title: string;
  intro: string;

  /**
   * Snapshot section.
   */
  snapshotLabel: string;

  /**
   * Snapshot card labels.
   */
  primarySystemLabel: string;
  secondarySystemLabel: string;
  ownerLabel: string;
  analysisStatusLabel: string;
  maturityCardLabel: string;
  priorityLabel: string;

  /**
   * Full inventory asset label.
   */
  fullInventoryLabel: string;

  /**
   * Representative processes shown directly in the portfolio.
   */
  sampleProcesses: readonly ProcessInventoryItem[];

  /**
   * Maturity framework.
   */
  maturityLabel: string;
  maturityLevels: readonly ProcessMaturityLevel[];

  /**
   * Analytical takeaways.
   */
  insights: readonly ProcessInventoryInsight[];

  /**
   * Full-screen viewer.
   */
  viewerLabel: string;
  viewerCaption: string;
};

/**
 * Component props.
 */
type ProcessInventorySectionProps = {
  content: ProcessInventoryContent;
  imageSrc: string;
  imageAlt: string;
};

/**
 * Icons used for the four analytical insight cards.
 *
 * Array order must remain aligned with content.insights:
 * 01 Ownership
 * 02 Analysis Status
 * 03 Maturity
 * 04 Prioritization
 */
const insightIcons = [
  UserRoundCheck,
  ClipboardList,
  BarChart3,
  Flag,
];

export default function ProcessInventorySection({
  content,
  imageSrc,
  imageAlt,
}: ProcessInventorySectionProps) {
  /**
   * Controls the reusable full-screen visual viewer.
   */
  const [isViewerOpen, setIsViewerOpen] = React.useState(false);

  return (
    <section
      id="process-inventory"
      aria-labelledby="process-inventory-title"
      className="border-b border-white/10 pb-20 sm:pb-24 lg:pb-28"
    >
      {/* ============================================================
          01 — SECTION INTRO
          Explains why a Process Inventory complements process mapping.
         ============================================================ */}
      <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
        <div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              05
            </span>

            <span
              aria-hidden="true"
              className="h-px w-8 bg-white/15"
            />

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
              {content.eyebrow.replace(/^05\s*[—-]\s*/, "")}
            </p>
          </div>

          <p className="mt-7 max-w-sm text-sm leading-7 text-white/40">
            {content.snapshotLabel}
          </p>
        </div>

        <div>
          <h2
            id="process-inventory-title"
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
          02 — PROCESS INVENTORY SNAPSHOT
          Displays representative real entries from the current inventory.

          The purpose is not to show every process here, but to illustrate
          how the register captures systems, ownership, maturity and priority.
         ============================================================ */}
      <div className="mt-16">
        <div className="mb-7 flex items-center gap-3">
          <ClipboardList className="h-4 w-4 text-accent" />

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
            {content.snapshotLabel}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {content.sampleProcesses.map((process, index) => (
            <motion.article
              key={process.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: index * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="rounded-[1.4rem] border border-white/10 bg-white/[0.025] p-5"
            >
              {/* -----------------------------------------------------
                  Process identity
                 ----------------------------------------------------- */}
              <div className="flex items-center justify-between gap-4">
                <span className="rounded-md border border-accent/20 bg-accent/[0.07] px-2.5 py-1.5 text-[0.65rem] font-semibold tracking-[0.12em] text-accent">
                  {process.id}
                </span>

                <span className="text-[0.65rem] font-semibold tracking-[0.18em] text-white/20">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="mt-5 text-lg font-semibold tracking-[-0.025em] text-white">
                {process.name}
              </h3>

              {/* -----------------------------------------------------
                  Primary and secondary systems
                 ----------------------------------------------------- */}
              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/25">
                  {content.primarySystemLabel}
                </p>

                <p className="mt-2 text-sm leading-6 text-white/60">
                  {process.primarySystem}
                </p>

                <p className="mt-4 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/25">
                  {content.secondarySystemLabel}
                </p>

                <p className="mt-2 text-sm leading-6 text-white/50">
                  {process.secondarySystem}
                </p>
              </div>

              {/* -----------------------------------------------------
                  Analytical status
                  Keeps unknown values explicit instead of inventing data.
                 ----------------------------------------------------- */}
              <div className="mt-6 space-y-4">
                <div>
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/25">
                    {content.ownerLabel}
                  </p>

                  <p className="mt-2 text-sm text-white/55">
                    {process.owner}
                  </p>
                </div>

                <div>
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/25">
                    {content.analysisStatusLabel}
                  </p>

                  <p className="mt-2 text-sm text-white/55">
                    {process.analysisStatus}
                  </p>
                </div>

                <div>
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/25">
                    {content.maturityCardLabel}
                  </p>

                  <span className="mt-2 inline-flex rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/60">
                    {process.maturity}
                  </span>
                </div>

                <div>
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/25">
                    {content.priorityLabel}
                  </p>

                  {/*
                   * Highlight potentially high-priority processes.
                   *
                   * Supports both the English "high" wording and
                   * French "élevée / élevé" wording.
                   */}
                  <span
                    className={
                      process.priority.toLowerCase().includes("high") ||
                      process.priority.toLowerCase().includes("élev")
                        ? "mt-2 inline-flex rounded-lg border border-amber-400/20 bg-amber-400/[0.07] px-3 py-2 text-xs text-amber-200/80"
                        : "mt-2 inline-flex rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/50"
                    }
                  >
                    {process.priority}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* ============================================================
          03 — PROCESS MATURITY MODEL
          Shows the M0 → M4 progression used by the Process Inventory.

          This provides a consistent analytical scale from an identified
          but unanalyzed process to a measured and optimized process.
         ============================================================ */}
      <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0d1017]">
        <div className="border-b border-white/10 px-6 py-5 sm:px-8">
          <div className="flex items-center gap-3">
            <GitBranch className="h-4 w-4 text-accent" />

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {content.maturityLabel}
            </p>
          </div>
        </div>

        <div className="grid gap-px bg-white/10 md:grid-cols-5">
          {content.maturityLevels.map((level, index) => (
            <div
              key={level.level}
              className="relative bg-[#0b0e14] p-5 sm:p-6"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="rounded-lg border border-accent/20 bg-accent/[0.07] px-2.5 py-1.5 text-xs font-semibold text-accent">
                  {level.level}
                </span>

                {index < content.maturityLevels.length - 1 && (
                  <ArrowRight className="hidden h-4 w-4 text-accent/30 md:block" />
                )}
              </div>

              <h3 className="mt-5 text-base font-semibold text-white/80">
                {level.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/42">
                {level.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================
          04 — FULL PROCESS INVENTORY ASSET
          Preserves the real Miro register as supporting visual evidence.

          The page uses a contained preview.
          The full-screen viewer allows inspection at a larger scale.
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
              {content.fullInventoryLabel}
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

        {/* ----------------------------------------------------------
         Process Inventory preview.

          The source asset is intentionally panoramic.
           A 16:9 container would create excessive empty space,
           so the preview uses a ratio closer to the original Miro export.

           The full-resolution asset remains available through the viewer.
           ---------------------------------------------------------- */}
        <div className="relative bg-white/[0.015] p-3 sm:p-4">
         <div className="relative aspect-[16/5] overflow-hidden rounded-[1.15rem] border border-white/10 bg-white">
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
          05 — ANALYTICAL INSIGHTS
          Explains how the inventory supports governance,
          discovery and prioritization.
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
          06 — FULL-SCREEN VIEWER
          Reuses ArchitectureViewer for the full Process Inventory asset.

          This keeps visual-asset inspection behavior consistent with
          the Enterprise Process Map section.
         ============================================================ */}
      <ArchitectureViewer
        isOpen={isViewerOpen}
        imageSrc={imageSrc}
        imageAlt={imageAlt}
        title={content.viewerCaption}
        onClose={() => setIsViewerOpen(false)}
      />
    </section>
  );
}