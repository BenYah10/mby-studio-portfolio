"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function BlueKioskVisual() {
  return (
    <div className="relative h-full min-h-[32rem]">
      <motion.div
        aria-hidden="true"
        animate={{
          opacity: [0.35, 0.55, 0.35],
          scale: [0.95, 1.05, 0.95],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute inset-x-[10%] top-[12%] h-[70%] rounded-full bg-blue-500/15 blur-[100px]"
      />

      <motion.div
        aria-hidden="true"
        animate={{
          opacity: [0.2, 0.4, 0.2],
          x: [-10, 10, -10],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute bottom-[8%] right-[4%] h-48 w-48 rounded-full bg-violet-500/15 blur-[90px]"
      />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        whileHover={{
          scale: 1.015,
          y: -4,
        }}
        className="relative h-full min-h-[34rem] w-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#020817] shadow-[0_30px_100px_rgba(0,0,0,0.45)]"
      >
        <Image
          src="/images/projects/bluekiosktech/VUCS-mby-portfolio-v1.png"
          alt="BlueKioskTech VUCS sanitization process combining steam, UV-C treatment and filtered drying"
          fill
          priority
          sizes="(min-width: 1024px) 48vw, 100vw"
          className="object-cover object-center"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.045] via-transparent to-blue-500/[0.04]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[1.75rem] shadow-[inset_0_0_40px_rgba(59,130,246,0.06)]"
        />
      </motion.div>
    </div>
  );
}