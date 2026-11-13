"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Database,
  GitBranch,
  Layers3,
  ShieldCheck,
} from "lucide-react";

const challenges = [
  {
    title: "Fragmented Processes",
    description:
      "Business processes often cross multiple teams and systems, creating handoffs where context, responsibilities or information can be lost.",
    icon: GitBranch,
  },
  {
    title: "Ownership & Controls",
    description:
      "Approvals, responsibilities, business rules and decision gates must remain clear across the end-to-end lifecycle.",
    icon: ShieldCheck,
  },
  {
    title: "Data Reliability",
    description:
      "Critical data must remain consistent, owned and trustworthy so operational and management decisions are based on reliable information.",
    icon: Database,
  },
];

const businessFlow = [
  "Process",
  "Ownership",
  "System",
  "Data",
  "Control",
  "KPI",
];

export default function BusinessChallengeSection() {
  return (
    <section
      id="business-challenge"
      aria-labelledby="business-challenge-title"
      className="border-b border-white/10 pb-20 sm:pb-24 lg:pb-28"
    >
      {/* SECTION INTRO */}
      <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
        <div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              01
            </span>

            <span
              aria-hidden="true"
              className="h-px w-8 bg-white/15"
            />

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
              Business Challenge
            </p>
          </div>

          <p className="mt-7 max-w-sm text-sm leading-7 text-white/40">
            A multi-system environment can be technically connected while
            remaining functionally fragmented.
          </p>
        </div>

        <div>
          <h2
            id="business-challenge-title"
            className="max-w-4xl text-[clamp(2.35rem,4.8vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-white"
          >
            Multiple systems do not automatically create an integrated
            business ecosystem.
          </h2>

          <p className="mt-8 max-w-3xl text-[clamp(1.25rem,2vw,1.7rem)] font-medium leading-[1.4] tracking-[-0.025em] text-white/70">
            The challenge is not connecting applications. It is connecting
            business processes, responsibilities and reliable data across
            those applications.
          </p>
        </div>
      </div>

      {/* CHALLENGE CARDS */}
      <div className="mt-14 grid gap-4 md:grid-cols-3 lg:mt-16">
        {challenges.map((challenge, index) => {
          const Icon = challenge.icon;

          return (
            <motion.article
              key={challenge.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.55,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-6 sm:p-7"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-14 -top-14 h-32 w-32 rounded-full bg-accent/[0.07] blur-3xl transition duration-500 group-hover:bg-accent/[0.11]"
              />

              <div className="relative">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent/20 bg-accent/[0.07]">
                  <Icon className="h-5 w-5 text-accent" />
                </div>

                <p className="mt-8 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/25">
                  Challenge {String(index + 1).padStart(2, "0")}
                </p>

                <h3 className="mt-3 text-xl font-semibold tracking-[-0.025em] text-white">
                  {challenge.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-white/45">
                  {challenge.description}
                </p>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* SYSTEM-CENTRIC VS BUSINESS-CENTRIC */}
      <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0d1017]">
        <div className="grid lg:grid-cols-[0.82fr_auto_1.18fr]">
          {/* SYSTEM-CENTRIC */}
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="flex items-center gap-3">
              <Layers3 className="h-4 w-4 text-white/35" />

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
                System-centric view
              </p>
            </div>

            <h3 className="mt-5 text-2xl font-semibold tracking-[-0.035em] text-white/80">
              Applications & integrations
            </h3>

            <p className="mt-3 max-w-md text-sm leading-7 text-white/40">
              A technology map explains which platforms exist and how they may
              exchange information.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-2">
              {["CRM", "ERP", "Project Mgmt", "BI"].map((system, index) => (
                <div
                  key={system}
                  className="flex items-center gap-2"
                >
                  <span className="rounded-lg border border-white/10 bg-white/[0.025] px-3 py-2 text-xs font-medium text-white/55">
                    {system}
                  </span>

                  {index < 3 && (
                    <ArrowRight className="h-3.5 w-3.5 text-white/20" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* DIVIDER */}
          <div className="relative hidden w-px bg-white/10 lg:block">
            <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#0d1017] text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-white/25">
              vs
            </span>
          </div>

          {/* BUSINESS-CENTRIC */}
          <div className="border-t border-white/10 p-6 sm:p-8 lg:border-l-0 lg:border-t-0 lg:p-10">
            <div className="flex items-center gap-3">
              <GitBranch className="h-4 w-4 text-accent" />

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Business-centric view
              </p>
            </div>

            <h3 className="mt-5 text-2xl font-semibold tracking-[-0.035em] text-white">
              How the business actually operates
            </h3>

            <p className="mt-3 max-w-xl text-sm leading-7 text-white/45">
              Functional analysis connects the business process to ownership,
              systems, critical data, controls and the measures used to support
              decisions.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-3">
              {businessFlow.map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-2"
                >
                  <span
                    className={
                      index === 0 || index === businessFlow.length - 1
                        ? "rounded-lg border border-accent/20 bg-accent/[0.07] px-3 py-2 text-xs font-medium text-white/75"
                        : "rounded-lg border border-white/10 bg-white/[0.025] px-3 py-2 text-xs font-medium text-white/60"
                    }
                  >
                    {item}
                  </span>

                  {index < businessFlow.length - 1 && (
                    <ArrowRight className="h-3.5 w-3.5 text-accent/45" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}