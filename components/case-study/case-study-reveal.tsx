"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type CaseStudyRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
};

export default function CaseStudyReveal({
  children,
  className,
  delay = 0,
  distance = 28,
}: CaseStudyRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0,
              y: distance,
              scale: 0.985,
            }
      }
      whileInView={
        shouldReduceMotion
          ? undefined
          : {
              opacity: 1,
              y: 0,
              scale: 1,
            }
      }
      // Sections can be several screens tall on phones. A percentage-based
      // threshold (previously 15%) may never be reached in a short viewport,
      // leaving the entire section at opacity: 0 despite scrolling.
      // Reveal as soon as any part enters the viewport, once per section.
      viewport={{
        once: true,
        amount: "some",
      }}
      transition={{
        duration: 0.85,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}