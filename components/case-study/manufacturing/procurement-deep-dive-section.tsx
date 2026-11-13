"use client";

/**
 * ProcurementDeepDiveSection
 *
 * Purpose:
 * - Present a focused functional analysis of the Procurement / Procure-to-Pay lifecycle;
 * - Show how a business or project need becomes an approved supplier payment;
 * - Highlight demand quality, approval controls, transaction integrity and supplier/payment controls;
 * - Explain the 3-Way Match between Purchase Order, Receipt and Supplier Invoice;
 * - Surface critical control points and downstream project-cost implications;
 * - Display the dedicated P2P deep-dive visual asset.
 *
 * Portfolio governance:
 * - This section is part of a personal conceptual case study;
 * - It must not imply a real client implementation;
 * - ERP and system examples are illustrative only;
 * - All business-facing copy is supplied through locale-specific content files.
 *
 * Internationalization:
 * - The component is language-agnostic;
 * - EN / FR text is supplied through the content prop;
 * - The visual asset can later also switch by locale.
 *
 * Architecture:
 * 1. Section introduction
 * 2. P2P lifecycle
 * 3. P2P analysis areas
 * 4. 3-Way Match
 * 5. Critical control points
 * 6. Full P2P analysis visual
 * 7. Analytical insights
 * 8. Full-screen viewer
 */

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  CircleDollarSign,
  ClipboardCheck,
  Database,
  FileCheck2,
  GitBranch,
  Maximize2,
  PackageCheck,
  ReceiptText,
  ShieldCheck,
  ShoppingCart,
  Workflow,
} from "lucide-react";

import ArchitectureViewer from "./architecture-viewer";

/**
 * One Procure-to-Pay lifecycle step.
 */
type ProcurementLifecycleStep = {
  id: string;
  title: string;
  description: string;
};

/**
 * One functional analysis area.
 */
type ProcurementAnalysisArea = {
  title: string;
  description: string;
  keywords: readonly string[];
};

/**
 * 3-Way Match content.
 */
type ThreeWayMatchContent = {
  label: string;

  purchaseOrderTitle: string;
  purchaseOrderDescription: string;

  receiptTitle: string;
  receiptDescription: string;

  invoiceTitle: string;
  invoiceDescription: string;

  conclusion: string;
};

/**
 * One critical control point.
 */
type ProcurementControlPoint = {
  title: string;
  description: string;
};

/**
 * One analytical insight.
 */
type ProcurementInsight = {
  title: string;
  description: string;
};

/**
 * Content contract for the Procurement / P2P deep dive.
 */
type ProcurementDeepDiveContent = {
  eyebrow: string;
  title: string;
  intro: string;

  lifecycleLabel: string;
  lifecycle: readonly ProcurementLifecycleStep[];

  analysisAreasLabel: string;
  analysisAreas: readonly ProcurementAnalysisArea[];

  threeWayMatch: ThreeWayMatchContent;

  controlPointsLabel: string;
  controlPoints: readonly ProcurementControlPoint[];

  insights: readonly ProcurementInsight[];

  viewerLabel: string;
  viewerCaption: string;
};

/**
 * Component props.
 */
type ProcurementDeepDiveSectionProps = {
  content: ProcurementDeepDiveContent;
  imageSrc: string;
  imageAlt: string;
};

/**
 * Icons aligned with the four P2P analysis areas:
 * 01 Demand Quality
 * 02 Approval Controls
 * 03 Transaction Integrity
 * 04 Supplier & Payment Control
 */
const analysisAreaIcons = [
  Boxes,
  ShieldCheck,
  Workflow,
  CircleDollarSign,
];

/**
 * Icons aligned with the four control points:
 * 01 Requisition Completeness
 * 02 Approval Authority
 * 03 Receipt Confirmation
 * 04 Invoice Exceptions
 */
const controlPointIcons = [
  ClipboardCheck,
  BadgeCheck,
  PackageCheck,
  ReceiptText,
];

/**
 * Icons aligned with the analytical insights:
 * 01 Process Traceability
 * 02 Data Ownership
 * 03 Exception Management
 * 04 Project Cost Visibility
 */
const insightIcons = [
  GitBranch,
  Database,
  ShieldCheck,
  CircleDollarSign,
];

export default function ProcurementDeepDiveSection({
  content,
  imageSrc,
  imageAlt,
}: ProcurementDeepDiveSectionProps) {
  /**
   * Controls the reusable full-screen viewer.
   */
  const [isViewerOpen, setIsViewerOpen] = React.useState(false);

  return (
    <section
      id="procurement-p2p-deep-dive"
      aria-labelledby="procurement-p2p-title"
      className="border-b border-white/10 pb-20 sm:pb-24 lg:pb-28"
    >
      {/* ============================================================
          01 — SECTION INTRO
          Positions P2P as the bridge between operational demand,
          procurement control, supplier commitment and finance.
         ============================================================ */}
      <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
        <div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              07
            </span>

            <span
              aria-hidden="true"
              className="h-px w-8 bg-white/15"
            />

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
              {content.eyebrow.replace(/^07\s*[—-]\s*/, "")}
            </p>
          </div>

          <p className="mt-7 max-w-sm text-sm leading-7 text-white/40">
            {content.lifecycleLabel}
          </p>
        </div>

        <div>
          <h2
            id="procurement-p2p-title"
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
          02 — PROCURE-TO-PAY LIFECYCLE
          Shows the progression from business need to supplier payment.
         ============================================================ */}
      <div className="mt-16">
        <div className="mb-7 flex items-center gap-3">
          <ShoppingCart className="h-4 w-4 text-accent" />

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
            {content.lifecycleLabel}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-7">
          {content.lifecycle.map((step, index) => (
            <motion.article
              key={step.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative rounded-[1.35rem] border border-white/10 bg-white/[0.025] p-5"
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
          03 — P2P ANALYSIS AREAS
          Highlights the four functional lenses used in the analysis.
         ============================================================ */}
      <div className="mt-6">
        <div className="mb-7 flex items-center gap-3">
          <Workflow className="h-4 w-4 text-accent" />

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
          04 — 3-WAY MATCH
          Explains the reconciliation logic between PO, Receipt
          and Supplier Invoice before payment.
         ============================================================ */}
      <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0d1017]">
        <div className="border-b border-white/10 px-6 py-5 sm:px-8">
          <div className="flex items-center gap-3">
            <FileCheck2 className="h-4 w-4 text-accent" />

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {content.threeWayMatch.label}
            </p>
          </div>
        </div>

        <div className="grid gap-px bg-white/10 lg:grid-cols-3">
          {/* Purchase Order */}
          <div className="bg-[#0b0e14] p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <ShoppingCart className="h-5 w-5 text-accent" />

              <h3 className="text-lg font-semibold tracking-[-0.03em] text-white">
                {content.threeWayMatch.purchaseOrderTitle}
              </h3>
            </div>

            <p className="mt-4 text-sm leading-7 text-white/48">
              {content.threeWayMatch.purchaseOrderDescription}
            </p>
          </div>

          {/* Receipt */}
          <div className="bg-[#0b0e14] p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <PackageCheck className="h-5 w-5 text-accent" />

              <h3 className="text-lg font-semibold tracking-[-0.03em] text-white">
                {content.threeWayMatch.receiptTitle}
              </h3>
            </div>

            <p className="mt-4 text-sm leading-7 text-white/48">
              {content.threeWayMatch.receiptDescription}
            </p>
          </div>

          {/* Supplier Invoice */}
          <div className="bg-[#0b0e14] p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <ReceiptText className="h-5 w-5 text-accent" />

              <h3 className="text-lg font-semibold tracking-[-0.03em] text-white">
                {content.threeWayMatch.invoiceTitle}
              </h3>
            </div>

            <p className="mt-4 text-sm leading-7 text-white/48">
              {content.threeWayMatch.invoiceDescription}
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 px-6 py-5 sm:px-8">
          <div className="flex items-start gap-3">
            <BadgeCheck className="mt-1 h-5 w-5 shrink-0 text-accent" />

            <p className="text-sm leading-7 text-white/55">
              {content.threeWayMatch.conclusion}
            </p>
          </div>
        </div>
      </div>

      {/* ============================================================
          05 — CRITICAL CONTROL POINTS
          Highlights the controls that protect the transaction flow.
         ============================================================ */}
      <div className="mt-6">
        <div className="mb-7 flex items-center gap-3">
          <ShieldCheck className="h-4 w-4 text-accent" />

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
            {content.controlPointsLabel}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {content.controlPoints.map((control, index) => {
            const Icon = controlPointIcons[index];

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
                className="rounded-[1.25rem] border border-white/10 bg-white/[0.02] p-5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/20 bg-accent/[0.07]">
                  <Icon className="h-4 w-4 text-accent" />
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
          06 — FULL P2P ANALYSIS ASSET
          Displays the dedicated Procurement / P2P deep-dive visual.
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
              Procurement / P2P Functional Deep Dive
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
          07 — ANALYTICAL INSIGHTS
          Summarizes the value of the P2P functional analysis.
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
        title={content.viewerCaption}
        onClose={() => setIsViewerOpen(false)}
      />
    </section>
  );
}