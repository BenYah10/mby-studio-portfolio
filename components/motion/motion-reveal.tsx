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
  fadeDown,
  fadeIn,
  fadeLeft,
  fadeRight,
  fadeUp,
  scaleIn,
} from "../case-study/animation-variants";

type MotionRevealVariant =
  | "fade"
  | "up"
  | "down"
  | "left"
  | "right"
  | "scale";

type MotionRevealProps = {
  children: ReactNode;
  variant?: MotionRevealVariant;
  delay?: number;
  amount?: number;
  once?: boolean;
} & Omit<
  HTMLMotionProps<"div">,
  "children" | "variants" | "initial" | "whileInView" | "viewport"
>;

const revealVariants: Record<MotionRevealVariant, Variants> = {
  fade: fadeIn,
  up: fadeUp,
  down: fadeDown,
  left: fadeLeft,
  right: fadeRight,
  scale: scaleIn,
};

function createDelayedVariants(
  variants: Variants,
  delay: number,
): Variants {
  return {
    hidden: variants.hidden,
    visible: {
      ...(typeof variants.visible === "object"
        ? variants.visible
        : {}),
      transition: {
        ...(typeof variants.visible === "object" &&
        "transition" in variants.visible &&
        typeof variants.visible.transition === "object"
          ? variants.visible.transition
          : {}),
        delay,
      },
    },
  };
}

export default function MotionReveal({
  children,
  variant = "up",
  delay = 0,
  amount = 0.2,
  once = true,
  className,
  ...props
}: MotionRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const selectedVariants = createDelayedVariants(
    revealVariants[variant],
    delay,
  );

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
          : selectedVariants
      }
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}