"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  BarChart3,
  Bike,
  MapPinned,
  RefreshCw,
} from "lucide-react";

import type { CaseStudyMetric } from "@/types/case-study";

import AnimatedItem from "../animated-item";
import {
  fadeUp,
  scaleIn,
  staggerContainer,
  staggerItem,
} from "../animation-variants";

type BixiResultsSectionProps = {
  number: string;
  metrics: CaseStudyMetric[];
};

const operationalCapabilities = [
  {
    icon: MapPinned,
    label: "Geographic Monitoring",
    description:
      "Azure Maps exposes station availability and operational pressure points across the network.",
  },
  {
    icon: Bike,
    label: "Network Availability",
    description:
      "Operational KPIs consolidate bikes, docks, capacity and station conditions.",
  },
  {
    icon: BarChart3,
    label: "Temporal Analysis",
    description:
      "Hourly patterns reveal availability fluctuations and periods requiring attention.",
  },
  {
    icon: RefreshCw,
    label: "Decision Support",
    description:
      "The report creates a clear foundation for redistribution and service planning.",
  },
];

export default function BixiResultsSection({
  number,
  metrics,
}: BixiResultsSectionProps) {
  return (
    <section className="border-t border-white/10 pt-20">
      <div className="grid gap-12 lg:grid-cols-[140px_1fr]">
        <AnimatedItem variants={fadeUp}>
          <p className="text-5xl font-semibold tracking-[-0.08em] text-white/20">
            {number}
          </p>
        </AnimatedItem>

        <div>
          <AnimatedItem variants={fadeUp}>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-400">
              Operational Dashboard
            </p>

            <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-white">
              A complete operational view of the BIXI network
            </h2>

            <p className="mt-8 max-w-3xl text-lg leading-8 text-white/60">
              The final Power BI experience consolidates geographic,
              station-level and temporal indicators into one operational
              interface designed to support faster interpretation and
              decision-making.
            </p>
          </AnimatedItem>

          <AnimatedItem
            variants={scaleIn}
            amount={0.15}
            className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025]"
          >
            <div className="border-b border-white/10 px-6 py-5 sm:px-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
                    Power BI Showcase
                  </p>

                  <p className="mt-2 text-base font-medium text-white/80">
                    Real-time operations monitoring and geographic analysis
                  </p>
                </div>

                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-3 py-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.75)]" />

                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-300">
                    Portfolio Edition
                  </span>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden bg-[#050a10] p-3 sm:p-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.985 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="overflow-hidden rounded-2xl border border-white/10"
              >
                <Image
                  src="/images/projects/bixi/BIXI-Operations-Dashboard.png"
                  alt="BIXI Power BI operations dashboard showing bike availability, station conditions, Azure Maps and hourly analysis"
                  width={1536}
                  height={1024}
                  sizes="(max-width: 768px) 100vw, 900px"
                  className="h-auto w-full"
                />
              </motion.div>
            </div>

            {metrics.length > 0 && (
              <AnimatedItem
                variants={staggerContainer}
                amount={0.2}
                className="grid gap-px border-t border-white/10 bg-white/10 md:grid-cols-3"
              >
                {metrics.map((metric) => (
                  <motion.article
                    key={metric.label}
                    variants={staggerItem}
                    className="bg-[#080b11] p-6 sm:p-7"
                  >
                    <p className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                      {metric.value}
                    </p>

                    <p className="mt-3 text-sm font-semibold text-white/75">
                      {metric.label}
                    </p>

                    {metric.description && (
                      <p className="mt-3 text-sm leading-6 text-white/40">
                        {metric.description}
                      </p>
                    )}
                  </motion.article>
                ))}
              </AnimatedItem>
            )}
          </AnimatedItem>

          <AnimatedItem
            variants={staggerContainer}
            amount={0.15}
            className="mt-8 grid gap-4 sm:grid-cols-2"
          >
            {operationalCapabilities.map((capability) => {
              const Icon = capability.icon;

              return (
                <motion.article
                  key={capability.label}
                  variants={staggerItem}
                  className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 sm:p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-sky-400/20 bg-sky-400/[0.08]">
                      <Icon className="h-5 w-5 text-sky-300" />
                    </div>

                    <div>
                      <h3 className="text-base font-semibold text-white">
                        {capability.label}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-white/45">
                        {capability.description}
                      </p>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatedItem>

          <AnimatedItem
            variants={fadeUp}
            amount={0.25}
            className="mt-8 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.055] p-6 sm:p-7"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
              Business Value
            </p>

            <p className="mt-3 max-w-3xl text-base leading-7 text-white/75">
              The dashboard transforms frequently changing mobility data into
              actionable operational signals, helping identify empty stations,
              full stations, low-availability areas and time periods where bike
              redistribution may be required.
            </p>
          </AnimatedItem>
        </div>
      </div>
    </section>
  );
}