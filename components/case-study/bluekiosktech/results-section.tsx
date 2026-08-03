"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

import AnimatedItem from "../animated-item";
import {
  fadeUp,
  progressBar,
  scaleIn,
  staggerContainer,
  staggerItem,
} from "../animation-variants";

type ResultMetric = {
  value: string;
  label: string;
  description?: string;
};

type ResultsSectionProps = {
  number: string;
  metrics: ResultMetric[];
};

type DashboardMetric = ResultMetric & {
  progress: number;
};

function getMetricProgress(metric: ResultMetric): number {
  const normalizedLabel = metric.label.toLowerCase();
  const normalizedValue = metric.value.toLowerCase();

  if (
    normalizedLabel.includes("cycle") ||
    normalizedValue.includes("100 s")
  ) {
    return 88;
  }

  if (
    normalizedLabel.includes("sanit") ||
    normalizedValue.includes("99.99") ||
    normalizedValue.includes("99,99")
  ) {
    return 99;
  }

  if (
    normalizedLabel.includes("availability") ||
    normalizedValue.includes("98")
  ) {
    return 96;
  }

  if (
    normalizedLabel.includes("satisfaction") ||
    normalizedValue.includes("90")
  ) {
    return 90;
  }

  return 85;
}

export default function ResultsSection({
  number,
  metrics,
}: ResultsSectionProps) {
  const dashboardMetrics: DashboardMetric[] = metrics.map((metric) => ({
    ...metric,
    progress: getMetricProgress(metric),
  }));

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
              Expected Results
            </p>

            <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-white">
              Pilot validation dashboard
            </h2>

            <p className="mt-8 max-w-3xl text-lg leading-8 text-white/60">
              The pilot phase will validate product performance against defined
              operational, technical and user-experience acceptance criteria.
            </p>
          </AnimatedItem>

          <AnimatedItem
            variants={scaleIn}
            amount={0.15}
            className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025]"
          >
            <div className="border-b border-white/10 px-6 py-5 sm:px-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
                    Pilot Performance
                  </p>

                  <p className="mt-2 text-base font-medium text-white/80">
                    Engineering targets and acceptance criteria
                  </p>
                </div>

                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/[0.08] px-3 py-1.5">
                  <span className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.75)]" />

                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-300">
                    Pre-pilot targets
                  </span>
                </div>
              </div>
            </div>

            <AnimatedItem
              variants={staggerContainer}
              amount={0.15}
              className="grid gap-px bg-white/10 md:grid-cols-2"
            >
              {dashboardMetrics.map((metric) => (
                <motion.article
                  key={metric.label}
                  variants={staggerItem}
                  className="bg-[#080b11] p-6 sm:p-8"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <p className="text-sm font-semibold text-white/75">
                        {metric.label}
                      </p>

                      {metric.description && (
                        <p className="mt-2 max-w-xs text-sm leading-6 text-white/40">
                          {metric.description}
                        </p>
                      )}
                    </div>

                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.8 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.45,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="shrink-0 text-2xl font-semibold tracking-tight text-white sm:text-3xl"
                    >
                      {metric.value}
                    </motion.p>
                  </div>

                  <div className="mt-8">
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        variants={progressBar}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.8 }}
                        style={{
                          width: `${metric.progress}%`,
                          transformOrigin: "left",
                        }}
                        className="h-full rounded-full bg-sky-400"
                      />
                    </div>

                    <div className="mt-3 flex items-center justify-between text-xs text-white/35">
                      <span>Baseline</span>
                      <span>Target</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatedItem>

            <div className="border-t border-white/10 p-6 sm:p-8">
              <AnimatedItem
                variants={staggerContainer}
                amount={0.25}
                className="grid gap-4 sm:grid-cols-3"
              >
                <motion.div
                  variants={staggerItem}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
                    Validation
                  </p>

                  <p className="mt-2 text-sm font-medium text-white/75">
                    Controlled pilot testing
                  </p>
                </motion.div>

                <motion.div
                  variants={staggerItem}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
                    Monitoring
                  </p>

                  <p className="mt-2 text-sm font-medium text-white/75">
                    Operational KPI tracking
                  </p>
                </motion.div>

                <motion.div
                  variants={staggerItem}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
                    Decision
                  </p>

                  <p className="mt-2 text-sm font-medium text-white/75">
                    Pilot go / no-go assessment
                  </p>
                </motion.div>
              </AnimatedItem>

              <AnimatedItem
                variants={scaleIn}
                amount={0.35}
                className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.06] p-5 sm:p-6"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                        Validation Status
                      </p>

                      <p className="mt-2 text-base font-semibold text-white">
                        Ready for pilot validation
                      </p>
                    </div>
                  </div>

                  <div className="rounded-full border border-white/10 bg-black/20 px-4 py-2">
                    <p className="text-xs font-medium text-white/60">
                      Go / No-Go framework defined
                    </p>
                  </div>
                </div>
              </AnimatedItem>
            </div>
          </AnimatedItem>
        </div>
      </div>
    </section>
  );
}