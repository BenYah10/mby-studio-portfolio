"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { HTMLMotionProps, Variants } from "framer-motion";
import type { ReactNode } from "react";

type AnimatedItemProps = {
  children: ReactNode;
  className?: string;
  variants: Variants;
  amount?: number;
  once?: boolean;
} & Omit<
  HTMLMotionProps<"div">,
  "children" | "className" | "variants" | "initial" | "whileInView" | "viewport"
>;

export default function AnimatedItem({
  children,
  className,
  variants,
  amount = 0.25,
  once = true,
  ...motionProps
}: AnimatedItemProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={variants}
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "visible"}
      viewport={{
        once,
        amount,
      }}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}