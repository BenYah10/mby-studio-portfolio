"use client";

import { motion } from "framer-motion";

import AnimatedItem from "../animated-item";
import {
  fadeUp,
  scaleIn,
  staggerContainer,
  staggerItem,
} from "../animation-variants";

type SystemDesignSectionProps = {
  number: string;
  title: string;
  paragraphs: string[];
  highlights?: string[];
};

export default function SystemDesignSection({
  number,
  title,
  paragraphs,
  highlights = [],
}: SystemDesignSectionProps) {
  return (
    <section className="border-t border-white/10 pt-20">
      <div className="grid gap-12 lg:grid-cols-[140px_1fr]">
        <AnimatedItem variants={fadeUp}>
          <p className="text-5xl font-semibold tracking-[-0.08em] text-white/20">
            {number}
          </p>
        </AnimatedItem>

        <div>
          <AnimatedItem variants={fadeUp}>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-400">
              System Design
            </p>

            <h2 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-white">
              {title}
            </h2>

            <div className="mt-8 max-w-3xl space-y-5">
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
            variants={scaleIn}
            amount={0.15}
            className="mt-14 rounded-3xl border border-white/10 bg-white/[0.025] p-5 sm:p-8"
          >
            <div className="mx-auto max-w-5xl">
              <AnimatedItem variants={scaleIn} amount={0.4}>
                <div className="flex justify-center">
                  <div className="w-full max-w-md rounded-2xl border border-sky-400/30 bg-sky-400/[0.08] px-6 py-5 text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
                      Core Controller
                    </p>

                    <p className="mt-2 text-lg font-semibold text-white">
                      BlueKioskTech Control System
                    </p>

                    <p className="mt-2 text-sm leading-6 text-white/50">
                      Coordinates operating modes, safety rules and cycle
                      execution.
                    </p>
                  </div>
                </div>
              </AnimatedItem>

              <motion.div
                aria-hidden="true"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{
                  duration: 0.5,
                  delay: 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ transformOrigin: "top" }}
                className="mx-auto h-10 w-px bg-white/15"
              />

              <motion.div
                aria-hidden="true"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{
                  duration: 0.65,
                  delay: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ transformOrigin: "center" }}
                className="mx-auto hidden h-px w-[75%] bg-white/15 sm:block"
              />

              <AnimatedItem
                variants={staggerContainer}
                amount={0.2}
                className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
              >
                {highlights.map((highlight, index) => (
                  <motion.div
                    key={highlight}
                    variants={staggerItem}
                    className="relative"
                  >
                    <motion.div
                      aria-hidden="true"
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true, amount: 0.8 }}
                      transition={{
                        duration: 0.35,
                        delay: 0.1,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      style={{ transformOrigin: "top" }}
                      className="mx-auto hidden h-8 w-px bg-white/15 sm:block"
                    />

                    <div className="h-full rounded-2xl border border-white/10 bg-black/20 p-5">
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-400">
                          Module {String(index + 1).padStart(2, "0")}
                        </p>

                        <motion.span
                          initial={{ opacity: 0.35, scale: 0.75 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true, amount: 0.8 }}
                          transition={{
                            duration: 0.45,
                            delay: 0.2,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_14px_rgba(56,189,248,0.8)]"
                        />
                      </div>

                      <p className="mt-8 text-base font-semibold text-white/85">
                        {highlight}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatedItem>

              <AnimatedItem
                variants={staggerContainer}
                amount={0.3}
                className="mt-16 grid gap-4 sm:grid-cols-3"
              >
                <motion.div
                  variants={staggerItem}
                  className="rounded-xl border border-white/10 px-4 py-3 text-center"
                >
                  <p className="text-xs uppercase tracking-[0.16em] text-white/40">
                    Input
                  </p>
                  <p className="mt-1 text-sm font-medium text-white/70">
                    Sensors & user actions
                  </p>
                </motion.div>

                <motion.div
                  variants={staggerItem}
                  className="rounded-xl border border-white/10 px-4 py-3 text-center"
                >
                  <p className="text-xs uppercase tracking-[0.16em] text-white/40">
                    Orchestration
                  </p>
                  <p className="mt-1 text-sm font-medium text-white/70">
                    Business rules & interlocks
                  </p>
                </motion.div>

                <motion.div
                  variants={staggerItem}
                  className="rounded-xl border border-white/10 px-4 py-3 text-center"
                >
                  <p className="text-xs uppercase tracking-[0.16em] text-white/40">
                    Output
                  </p>
                  <p className="mt-1 text-sm font-medium text-white/70">
                    Controlled sanitation cycle
                  </p>
                </motion.div>
              </AnimatedItem>
            </div>
          </AnimatedItem>
        </div>
      </div>
    </section>
  );
}