"use client";

import type { ReactNode } from "react";
import {
  motion,
  useReducedMotion,
} from "framer-motion";

import type {
  HTMLMotionProps,
  Variants,
} from "framer-motion";

import {
  cardsContainerReveal,
  cardReveal,
  heroContainerReveal,
  heroItemReveal,
  metricsContainerReveal,
  metricReveal,
  navbarItemReveal,
  navbarItemsReveal,
  tagReveal,
  tagsContainerReveal,
} from "./motion-presets";

type StaggerPreset =
  | "cards"
  | "hero"
  | "metrics"
  | "navbar"
  | "tags";

type MotionStaggerProps = {
  children: ReactNode;
  preset?: StaggerPreset;
  amount?: number;
  once?: boolean;
} & Omit<
  HTMLMotionProps<"div">,
  | "children"
  | "variants"
  | "initial"
  | "whileInView"
  | "viewport"
>;

type MotionStaggerItemProps = {
  children: ReactNode;
  preset?: StaggerPreset;
} & Omit<
  HTMLMotionProps<"div">,
  "children" | "variants"
>;

type StaggerConfiguration = {
  container: Variants;
  item: Variants;
};

const staggerConfigurations: Record<
  StaggerPreset,
  StaggerConfiguration
> = {
  cards: {
    container: cardsContainerReveal,
    item: cardReveal,
  },

  hero: {
    container: heroContainerReveal,
    item: heroItemReveal,
  },

  metrics: {
    container: metricsContainerReveal,
    item: metricReveal,
  },

  navbar: {
    container: navbarItemsReveal,
    item: navbarItemReveal,
  },

  tags: {
    container: tagsContainerReveal,
    item: tagReveal,
  },
};

export function MotionStagger({
  children,
  preset = "cards",
  amount = 0.2,
  once = true,
  className,
  ...props
}: MotionStaggerProps) {
  const shouldReduceMotion = useReducedMotion();
  const configuration = staggerConfigurations[preset];

  return (
    <motion.div
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{
        once,
        amount,
      }}
      variants={
        shouldReduceMotion
          ? undefined
          : configuration.container
      }
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function MotionStaggerItem({
  children,
  preset = "cards",
  className,
  ...props
}: MotionStaggerItemProps) {
  const shouldReduceMotion = useReducedMotion();
  const configuration = staggerConfigurations[preset];

  return (
    <motion.div
      variants={
        shouldReduceMotion
          ? undefined
          : configuration.item
      }
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}