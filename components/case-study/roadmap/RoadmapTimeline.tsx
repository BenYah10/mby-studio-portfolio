"use client";

import { motion, useReducedMotion } from "framer-motion";

import AnimatedItem from "../animated-item";
import {
  fadeUp,
  staggerContainer,
} from "../animation-variants";

import RoadmapPhase from "./RoadmapPhase";

import type { RoadmapPhase as Phase } from "./roadmap-types";

type RoadmapTimelineProps = {
  phases: Phase[];
};

function isReachedPhase(phase: Phase) {
  return (
    phase.status === "completed" ||
    phase.status === "current" ||
    phase.status === "on-hold"
  );
}

function getLastReachedIndex(phases: Phase[]) {
  return phases.reduce((latestIndex, phase, index) => {
    return isReachedPhase(phase) ? index : latestIndex;
  }, 0);
}

function getProgressPercentage(phases: Phase[]) {
  if (phases.length <= 1) {
    return 0;
  }

  return (
    (getLastReachedIndex(phases) / (phases.length - 1)) *
    100
  );
}

function getMarkerClassName(phase: Phase) {
  switch (phase.status) {
    case "completed":
      return "border-emerald-400/40 bg-emerald-400/10 text-emerald-300 shadow-[0_0_28px_rgba(52,211,153,0.12)]";

    case "current":
      return "border-sky-400/50 bg-sky-400/10 text-sky-300 shadow-[0_0_30px_rgba(56,189,248,0.18)]";

    case "on-hold":
      return "border-amber-400/50 bg-amber-400/10 text-amber-300 shadow-[0_0_30px_rgba(251,191,36,0.14)]";

    case "upcoming":
      return "border-white/15 bg-[#080b11] text-white/35";
  }
}

export default function RoadmapTimeline({
  phases,
}: RoadmapTimelineProps) {
  const shouldReduceMotion = useReducedMotion();

  const lastReachedIndex = getLastReachedIndex(phases);
  const progressPercentage = getProgressPercentage(phases);

  return (
    <div className="relative">
      <AnimatedItem
        variants={fadeUp}
        amount={0.2}
        className="relative"
      >
        {/* Desktop horizontal timeline */}
        <div
          aria-hidden="true"
          className="absolute left-[10%] right-[10%] top-7 hidden h-px bg-white/10 lg:block"
        >
          <motion.div
            initial={{
              scaleX: shouldReduceMotion ? 1 : 0,
            }}
            whileInView={{
              scaleX: 1,
            }}
            viewport={{
              once: true,
              amount: 0.4,
            }}
            transition={{
              duration: shouldReduceMotion ? 0 : 1.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              width: `${progressPercentage}%`,
              transformOrigin: "left",
            }}
            className="h-full bg-gradient-to-r from-emerald-400/80 via-sky-400/80 to-amber-400/80"
          />
        </div>

        <AnimatedItem
          variants={staggerContainer}
          amount={0.15}
          className="grid gap-8 lg:grid-cols-5"
        >
          {phases.map((phase, index) => {
            const isActive =
              phase.status === "current" ||
              phase.status === "on-hold";

            const isCompletedSegment =
              index < lastReachedIndex;

            return (
              <div
                key={phase.number}
                className="relative grid grid-cols-[3.5rem_minmax(0,1fr)] gap-x-4 lg:block"
              >
                {/* Mobile vertical connector */}
                {index < phases.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="absolute left-7 top-14 bottom-[-2rem] w-px bg-white/10 lg:hidden"
                  >
                    {isCompletedSegment && (
                      <motion.div
                        initial={{
                          scaleY: shouldReduceMotion ? 1 : 0,
                        }}
                        whileInView={{
                          scaleY: 1,
                        }}
                        viewport={{
                          once: true,
                          amount: 0.5,
                        }}
                        transition={{
                          duration: shouldReduceMotion ? 0 : 0.65,
                          delay: shouldReduceMotion
                            ? 0
                            : index * 0.12,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        style={{
                          transformOrigin: "top",
                        }}
                        className="h-full bg-gradient-to-b from-emerald-400/80 to-amber-400/75"
                      />
                    )}
                  </div>
                )}

                <motion.div
                  initial={
                    shouldReduceMotion
                      ? false
                      : {
                          opacity: 0,
                          scale: 0.72,
                        }
                  }
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.7,
                  }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.45,
                    delay: shouldReduceMotion
                      ? 0
                      : index * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative z-10 col-start-1 row-start-1 flex items-start lg:mb-6 lg:justify-center"
                >
                  <div className="relative">
                    {isActive && !shouldReduceMotion && (
                      <motion.span
                        aria-hidden="true"
                        animate={{
                          opacity: [0.45, 0, 0.45],
                          scale: [1, 1.4, 1],
                        }}
                        transition={{
                          duration: 2.8,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                        className={`absolute inset-0 rounded-full border ${
                          phase.status === "on-hold"
                            ? "border-amber-400/55"
                            : "border-sky-400/55"
                        }`}
                      />
                    )}

                    <div
                      aria-hidden="true"
                      className={`relative flex h-14 w-14 items-center justify-center rounded-full border text-base font-semibold transition duration-300 ${getMarkerClassName(
                        phase,
                      )}`}
                    >
                      {phase.number}
                    </div>
                  </div>
                </motion.div>

                <div className="col-start-2 row-start-1 min-w-0 lg:flex lg:h-full">
                 <RoadmapPhase phase={phase} />
                </div>
              </div>
            );
          })}
        </AnimatedItem>
      </AnimatedItem>
    </div>
  );
}