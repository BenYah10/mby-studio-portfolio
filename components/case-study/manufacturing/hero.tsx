"use client";

import { motion } from "framer-motion";
import type React from "react";
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

/**
 * Slow data-flow animation settings.
 *
 * The animation is intentionally calm so the hero remains readable and
 * professional. Increase this value if an even slower rhythm is desired.
 */
const FLOW_DURATION_SECONDS = 2.5;

/**
 * Card glow timing.
 *
 * Each value aligns the border pulse with a corresponding flow arrival.
 * These timings are intentionally staggered to create a continuous sequence.
 */
const CARD_PULSE_DELAYS: Record<string, number> = {
  "Sales / CRM": 0.0,
  "Project Execution": 1.0,
  "ERP / P2P": 2.0,
  "Data / BI": 3.0,
};

type FlowReactiveCardProps = {
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  className?: string;
  entranceDelay: number;
};

/**
 * FlowReactiveCard
 *
 * Adds a synchronized luminous border / rear halo to a system card.
 * The pulse is decorative and follows the same cycle as the data-flow particles.
 */
function FlowReactiveCard({
  label,
  description,
  icon: Icon,
  className = "",
  entranceDelay,
}: FlowReactiveCardProps) {
  const pulseDelay = CARD_PULSE_DELAYS[label] ?? 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.55,
        delay: entranceDelay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`${className} relative h-full min-h-[10rem] sm:min-h-[11.5rem]`}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-[3px] rounded-2xl"
        style={{
          background:
            "radial-gradient(circle at center, rgba(96,165,250,0.24) 0%, rgba(59,130,246,0.14) 42%, rgba(15,23,42,0) 78%)",
          filter: "blur(12px)",
        }}
        animate={{
          opacity: [0, 0, 0.95, 0.36, 0],
          scale: [0.985, 0.99, 1.025, 1.008, 1],
        }}
        transition={{
          duration: FLOW_DURATION_SECONDS,
          repeat: Infinity,
          ease: "linear",
          delay: pulseDelay,
          times: [0, 0.04, 0.8, 0.16, 1],
        }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-2xl"
        animate={{
          opacity: [0, 0, 1, 0.55, 0],
          boxShadow: [
            "0 0 0 rgba(96,165,250,0)",
            "0 0 0 rgba(96,165,250,0)",
            "0 0 18px rgba(96,165,250,0.62), 0 0 38px rgba(59,130,246,0.28), inset 0 0 0 1px rgba(191,219,254,0.92)",
            "0 0 8px rgba(96,165,250,0.24), 0 0 20px rgba(59,130,246,0.12), inset 0 0 0 1px rgba(147,197,253,0.34)",
            "0 0 0 rgba(96,165,250,0)",
          ],
        }}
        transition={{
          duration: FLOW_DURATION_SECONDS,
          repeat: Infinity,
          ease: "linear",
          delay: pulseDelay,
          times: [0, 0.08, 0.14, 0.23, 1],
        }}
      />

      <div className="relative z-10 h-full rounded-2xl border border-white/10 bg-[#0d1118]/90 p-4 backdrop-blur sm:p-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.035]">
          <Icon className="h-4 w-4 text-accent" />
        </div>

        <p className="mt-5 text-sm font-semibold text-white/85">
          {label}
        </p>

        <p className="mt-2 text-xs leading-5 text-white/35">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

/**
 * Decorative bidirectional data-flow layer.
 *
 * Each system exchanges data with the central Operating Model:
 * - one luminous particle travels toward the center;
 * - a second particle returns from the center to the system;
 * - each path starts at a different time so the ecosystem feels continuous
 *   rather than synchronized.
 *
 * This SVG is presentation-only and therefore hidden from assistive technology.
 */
function OperatingModelFlow() {
  const flows = [
    {
      id: "crm",
      path: "M 23 26 C 33 28, 39 36, 47 46",
      reversePath: "M 47 46 C 39 36, 33 28, 23 26",
      delay: 0,
    },
    {
      id: "project",
      path: "M 77 26 C 67 28, 61 36, 53 46",
      reversePath: "M 53 46 C 61 36, 67 28, 77 26",
      delay: 1.6,
    },
    {
      id: "erp",
      path: "M 23 74 C 33 72, 39 64, 47 54",
      reversePath: "M 47 54 C 39 64, 33 72, 23 74",
      delay: 3.2,
    },
    {
      id: "bi",
      path: "M 77 74 C 67 72, 61 64, 53 54",
      reversePath: "M 53 54 C 61 64, 67 72, 77 74",
      delay: 4.8,
    },
  ];

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <defs>
        <filter
          id="manufacturing-flow-glow"
          x="-200%"
          y="-200%"
          width="400%"
          height="400%"
        >
          <feGaussianBlur stdDeviation="1.1" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <linearGradient
          id="manufacturing-flow-line"
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop offset="0%" stopColor="rgba(124,156,255,0.08)" />
          <stop offset="50%" stopColor="rgba(124,156,255,0.34)" />
          <stop offset="100%" stopColor="rgba(103,232,249,0.10)" />
        </linearGradient>
      </defs>

      {flows.map((flow) => (
        <g key={flow.id}>
          {/* Persistent subtle connection line. */}
          <path
            d={flow.path}
            fill="none"
            stroke="url(#manufacturing-flow-line)"
            strokeWidth="0.45"
            vectorEffect="non-scaling-stroke"
          />

          {/* System -> Operating Model. */}
          <circle
            r="0.85"
            fill="#dbeafe"
            filter="url(#manufacturing-flow-glow)"
          >
            <animateMotion
              dur={`${FLOW_DURATION_SECONDS}s`}
              begin={`${flow.delay}s`}
              repeatCount="indefinite"
              path={flow.path}
              calcMode="spline"
              keyTimes="0;1"
              keySplines="0.42 0 0.58 1"
            />
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              keyTimes="0;0.12;0.88;1"
              dur={`${FLOW_DURATION_SECONDS}s`}
              begin={`${flow.delay}s`}
              repeatCount="indefinite"
            />
          </circle>

          {/* Operating Model -> System return flow. */}
          <circle
            r="0.68"
            fill="#7dd3fc"
            filter="url(#manufacturing-flow-glow)"
          >
            <animateMotion
              dur={`${FLOW_DURATION_SECONDS}s`}
              begin={`${flow.delay + FLOW_DURATION_SECONDS / 2}s`}
              repeatCount="indefinite"
              path={flow.reversePath}
              calcMode="spline"
              keyTimes="0;1"
              keySplines="0.42 0 0.58 1"
            />
            <animate
              attributeName="opacity"
              values="0;0.85;0.85;0"
              keyTimes="0;0.12;0.88;1"
              dur={`${FLOW_DURATION_SECONDS}s`}
              begin={`${flow.delay + FLOW_DURATION_SECONDS / 2}s`}
              repeatCount="indefinite"
            />
          </circle>
        </g>
      ))}

      {/* Very subtle breathing halo around Operating Model. */}
      <circle
        cx="50"
        cy="50"
        r="10.2"
        fill="none"
        stroke="rgba(124,156,255,0.16)"
        strokeWidth="0.5"
        vectorEffect="non-scaling-stroke"
      >
        <animate
          attributeName="r"
          values="9.8;11.1;9.8"
          dur="7s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.18;0.42;0.18"
          dur="7s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}

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
              <div className="relative w-full max-w-[36rem]">
                {/* Animated data / integration flows behind the cards. */}
                <OperatingModelFlow />

                <div className="relative z-10 grid grid-cols-2 items-center gap-4 sm:grid-cols-[1fr_auto_1fr] sm:grid-rows-2 sm:gap-x-5 sm:gap-y-5">
                {ecosystemNodes.map((node, index) => {
                  const Icon = node.icon;

                  const positions = [
                    "col-start-1 row-start-1 sm:col-start-1 sm:row-start-1",
                    "col-start-2 row-start-1 sm:col-start-3 sm:row-start-1",
                    "col-start-1 row-start-3 sm:col-start-1 sm:row-start-2",
                    "col-start-2 row-start-3 sm:col-start-3 sm:row-start-2",
                  ];

                  return (
                    <FlowReactiveCard
                      key={node.label}
                      label={node.label}
                      description={node.description}
                      icon={Icon}
                      className={positions[index]}
                      entranceDelay={0.28 + index * 0.08}
                    />
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