"use client";

import { motion } from "framer-motion";

import AnimatedItem from "../animated-item";
import {
  fadeUp,
  staggerContainer,
  staggerItem,
} from "../animation-variants";

type ProductThinkingSectionProps = {
  number: string;
  title: string;
  paragraphs: string[];
  highlights?: string[];
};

export default function ProductThinkingSection({
  number,
  title,
  paragraphs,
  highlights = [],
}: ProductThinkingSectionProps) {
  return (
    <section className="border-t border-white/10 pt-20">
      <div className="grid gap-12 lg:grid-cols-[140px_1fr]">
        <AnimatedItem variants={fadeUp}>
          <p className="text-5xl font-semibold tracking-[-0.08em] text-white/20">
            {number}
          </p>
        </AnimatedItem>

        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <AnimatedItem variants={fadeUp}>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-400">
              Product Thinking
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white">
              {title}
            </h2>

            <div className="mt-8 space-y-5">
              {paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-lg leading-8 text-white/60"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </AnimatedItem>

          <AnimatedItem
            variants={staggerContainer}
            amount={0.2}
            className="space-y-4"
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight}
                variants={staggerItem}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-400">
                  {String(index + 1).padStart(2, "0")}
                </p>

                <p className="mt-3 text-base font-medium text-white/80">
                  {highlight}
                </p>
              </motion.div>
            ))}
          </AnimatedItem>
        </div>
      </div>
    </section>
  );
}