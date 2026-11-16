"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import ArchitectureViewer from "./architecture-viewer";
import {
  ArrowRight,
  Database,
  GitBranch,
  Maximize2,
  ShieldCheck,
  Workflow,
} from "lucide-react";
// 
type EndToEndPhase = {
  id: string;
  title: string;
};

type EndToEndGroup = {
  label: string;
  phases: readonly EndToEndPhase[];
};

type EndToEndInsight = {
  title: string;
  description: string;
};

type EndToEndContent = {
  eyebrow: string;
  title: string;
  intro: string;
  groups: readonly EndToEndGroup[];
  insights: readonly EndToEndInsight[];
  viewerLabel: string;
  viewerCaption: string;
  scopeLabel: string;
  mapLabel: string;
  viewerCloseLabel: string;
  viewerInstructions: string;
};

type EndToEndProcessSectionProps = {
  content: EndToEndContent;
  imageSrc: string;
  imageAlt: string;
};

const insightIcons = [
  Workflow,
  ShieldCheck,
  GitBranch,
  Database,
];

export default function EndToEndProcessSection({
  content,
  imageSrc,
  imageAlt,
}: EndToEndProcessSectionProps) {
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  return (
    <section
      id="end-to-end-process"
      aria-labelledby="end-to-end-process-title"
      className="border-b border-white/10 pb-20 sm:pb-24 lg:pb-28"
    >
      {/* SECTION INTRO */}
      <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
        <div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              03
            </span>

            <span
              aria-hidden="true"
              className="h-px w-8 bg-white/15"
            />

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
              {content.eyebrow.replace(/^03\s*[—-]\s*/, "")}
            </p>
          </div>

          <p className="mt-7 max-w-sm text-sm leading-7 text-white/40">
            {content.scopeLabel}
          </p>
        </div>

        <div>
          <h2
            id="end-to-end-process-title"
            className="max-w-4xl text-[clamp(2.35rem,4.8vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-white"
          >
            {content.title}
          </h2>

          <p className="mt-8 max-w-3xl text-[clamp(1.05rem,1.6vw,1.35rem)] leading-8 text-white/55">
            {content.intro}
          </p>
        </div>
      </div>

      {/* PROCESS GROUPS */}
      <div className="mt-16 grid gap-4 lg:grid-cols-4">
        {content.groups.map((group, groupIndex) => (
          <motion.article
            key={group.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.5,
              delay: groupIndex * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="rounded-[1.4rem] border border-white/10 bg-white/[0.025] p-5 sm:p-6"
          >
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                {group.label}
              </p>

              <span className="text-[0.65rem] font-semibold tracking-[0.18em] text-white/20">
                {String(groupIndex + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="mt-6 space-y-3">
              {group.phases.map((phase, phaseIndex) => (
                <div
                  key={phase.id}
                  className="flex items-start gap-3"
                >
                  <span className="mt-0.5 rounded-md border border-accent/20 bg-accent/[0.07] px-2 py-1 text-[0.65rem] font-semibold tracking-[0.12em] text-accent">
                    {phase.id}
                  </span>

                  <div className="flex min-w-0 flex-1 items-start gap-2">
                    <p className="text-sm leading-6 text-white/65">
                      {phase.title}
                    </p>

                    {phaseIndex < group.phases.length - 1 && (
                      <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-white/15" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.article>
        ))}
      </div>

      {/* ENTERPRISE PROCESS MAP */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          duration: 0.65,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mt-8 overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0d1017]"
      >
        <div className="flex flex-col gap-5 border-b border-white/10 px-6 py-6 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {content.mapLabel}
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

      {/* INSIGHTS */}
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

      <ArchitectureViewer
         isOpen={isViewerOpen}
         imageSrc={imageSrc}
         imageAlt={imageAlt}
         title={content.viewerCaption}
         mapLabel={content.mapLabel}
         closeLabel={content.viewerCloseLabel}
         instructions={content.viewerInstructions}
         onClose={() => setIsViewerOpen(false)}
    />
    </section>
  );
}