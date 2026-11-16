"use client";

import { motion } from "framer-motion";
import type { Locale } from "@/i18n/config";
import { getBusinessChallengeCopy } from "@/content/case-studies/manufacturing/business-challenge-copy";
import {
  ArrowRight,
  Database,
  GitBranch,
  Layers3,
  ShieldCheck,
} from "lucide-react";

/** Icons remain in a stable order independently of the displayed language. */
const challengeIcons = [GitBranch, ShieldCheck, Database] as const;

type BusinessChallengeSectionProps = {
  /** Undefined for historical routes: retain the original English output. */
  locale?: Locale;
};

export default function BusinessChallengeSection({ locale = "en" }: BusinessChallengeSectionProps) {
  const copy = getBusinessChallengeCopy(locale);

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
              {copy.eyebrow}
            </p>
          </div>

          <p className="mt-7 max-w-sm text-sm leading-7 text-white/40">
            {copy.sideNote}
          </p>
        </div>

        <div>
          <h2
            id="business-challenge-title"
            className="max-w-4xl text-[clamp(2.35rem,4.8vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-white"
          >
            {copy.title}
          </h2>

          <p className="mt-8 max-w-3xl text-[clamp(1.25rem,2vw,1.7rem)] font-medium leading-[1.4] tracking-[-0.025em] text-white/70">
            {copy.introduction}
          </p>
        </div>
      </div>

      {/* CHALLENGE CARDS */}
      <div className="mt-14 grid gap-4 md:grid-cols-3 lg:mt-16">
        {copy.challenges.map((challenge, index) => {
          const Icon = challengeIcons[index];

          return (
            <motion.article
              key={index}
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
                  {copy.challengeLabel} {String(index + 1).padStart(2, "0")}
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
                {copy.systemCentric}
              </p>
            </div>

            <h3 className="mt-5 text-2xl font-semibold tracking-[-0.035em] text-white/80">
              {copy.systemTitle}
            </h3>

            <p className="mt-3 max-w-md text-sm leading-7 text-white/40">
              {copy.systemDescription}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-2">
              {["CRM", "ERP", copy.projectManagement, "BI"].map((system, index) => (
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
                {copy.businessCentric}
              </p>
            </div>

            <h3 className="mt-5 text-2xl font-semibold tracking-[-0.035em] text-white">
              {copy.businessTitle}
            </h3>

            <p className="mt-3 max-w-xl text-sm leading-7 text-white/45">
              {copy.businessDescription}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-3">
              {copy.flow.map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-2"
                >
                  <span
                    className={
                      index === 0 || index === copy.flow.length - 1
                        ? "rounded-lg border border-accent/20 bg-accent/[0.07] px-3 py-2 text-xs font-medium text-white/75"
                        : "rounded-lg border border-white/10 bg-white/[0.025] px-3 py-2 text-xs font-medium text-white/60"
                    }
                  >
                    {item}
                  </span>

                  {index < copy.flow.length - 1 && (
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