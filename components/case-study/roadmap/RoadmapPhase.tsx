"use client";

import { Check, Circle, Pause } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { staggerItem } from "../animation-variants";

import type {
  RoadmapPhase as Phase,
  RoadmapStatus,
} from "./roadmap-types";

type Props = {
  phase: Phase;
};

type StatusConfig = {
  label: string;
  icon: LucideIcon;
  cardClassName: string;
  badgeClassName: string;
  iconClassName: string;
  itemClassName: string;
  noteClassName: string;
};

const statusConfig: Record<RoadmapStatus, StatusConfig> = {
  completed: {
    label: "Completed",
    icon: Check,
    cardClassName:
      "border-emerald-400/20 bg-emerald-400/[0.04] hover:border-emerald-400/35 hover:shadow-[0_22px_60px_rgba(52,211,153,0.08)]",
    badgeClassName:
      "border-emerald-400/25 bg-emerald-400/10 text-emerald-300",
    iconClassName:
      "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
    itemClassName:
      "border-emerald-400/10 bg-emerald-400/[0.03] text-white/70",
    noteClassName: "text-emerald-200/65",
  },

  "on-hold": {
    label: "On hold",
    icon: Pause,
    cardClassName:
      "border-amber-400/30 bg-amber-400/[0.05] shadow-[0_0_36px_rgba(251,191,36,0.06)] hover:border-amber-400/45 hover:shadow-[0_22px_65px_rgba(251,191,36,0.11)]",
    badgeClassName:
      "border-amber-400/30 bg-amber-400/10 text-amber-300",
    iconClassName:
      "border-amber-400/35 bg-amber-400/10 text-amber-300",
    itemClassName:
      "border-amber-400/10 bg-amber-400/[0.03] text-white/65",
    noteClassName: "text-amber-200/70",
  },

  current: {
    label: "Current phase",
    icon: Circle,
    cardClassName:
      "border-sky-400/35 bg-sky-400/[0.06] shadow-[0_0_40px_rgba(56,189,248,0.08)] hover:border-sky-400/50 hover:shadow-[0_22px_65px_rgba(56,189,248,0.12)]",
    badgeClassName:
      "border-sky-400/30 bg-sky-400/10 text-sky-300",
    iconClassName:
      "border-sky-400/40 bg-sky-400/10 text-sky-300 shadow-[0_0_24px_rgba(56,189,248,0.18)]",
    itemClassName:
      "border-sky-400/10 bg-sky-400/[0.04] text-white/75",
    noteClassName: "text-sky-200/70",
  },

  upcoming: {
    label: "Upcoming",
    icon: Circle,
    cardClassName:
      "border-white/10 bg-white/[0.02] opacity-75 hover:border-white/15 hover:opacity-100 hover:shadow-[0_22px_60px_rgba(255,255,255,0.04)]",
    badgeClassName:
      "border-white/10 bg-white/[0.03] text-white/45",
    iconClassName:
      "border-white/15 bg-white/[0.03] text-white/35",
    itemClassName:
      "border-white/5 bg-white/[0.02] text-white/45",
    noteClassName: "text-white/45",
  },
};

export default function RoadmapPhase({ phase }: Props) {
  const shouldReduceMotion = useReducedMotion();
  const config = statusConfig[phase.status];
  const StatusIcon = config.icon;

  return (
    <motion.article
      variants={staggerItem}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -4,
            }
      }
      transition={{
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      }}
      aria-label={`${phase.title}: ${config.label}`}
      className={`group relative h-full rounded-3xl border p-6 backdrop-blur-sm transition-[border-color,background-color,box-shadow,opacity] duration-300 ${config.cardClassName}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div
          aria-hidden="true"
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border ${config.iconClassName}`}
        >
          <StatusIcon
            className={
              phase.status === "current"
                ? "h-3.5 w-3.5 fill-current"
                : "h-4 w-4"
            }
            strokeWidth={2}
          />
        </div>

        <span
          className={`rounded-full border px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] ${config.badgeClassName}`}
        >
          {config.label}
        </span>
      </div>

      <h3 className="mt-7 text-xl font-semibold leading-tight text-white">
        {phase.title}
      </h3>

      {phase.statusNote && (
        <p className={`mt-3 text-sm leading-6 ${config.noteClassName}`}>
          {phase.statusNote}
        </p>
      )}

      <motion.div variants={staggerItem} className="mt-6 space-y-3">
        {phase.items.map((item) => (
          <motion.div
            key={item}
            variants={staggerItem}
            className={`rounded-xl border px-3 py-2 text-sm transition duration-300 ${config.itemClassName}`}
          >
            {item}
          </motion.div>
        ))}
      </motion.div>
    </motion.article>
  );
}