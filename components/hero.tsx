"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  MapPin,
} from "lucide-react";

import { hero } from "@/content/hero";

type HeroProps = {
  yearsOfExperience: number;
};

type HeroMetricProps = {
  value: string;
  label: string;
};

/**
 * Animation parent utilisée pour révéler progressivement
 * les différents éléments textuels du Hero.
 *
 * staggerChildren évite que tout le contenu apparaisse simultanément
 * et produit une entrée plus fluide et premium.
 */
const contentContainer = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.09,
    },
  },
};

/**
 * Animation commune appliquée aux éléments internes du Hero :
 * eyebrow, titre, description, boutons et positionnement.
 *
 * L'easing personnalisé donne une décélération naturelle
 * sans effet élastique ou excessivement démonstratif.
 */
const contentItem = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  visible: {
    opacity: 0.55,
    y: 0,
    transition: {
      duration: 1.0,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};


/**
 * MbyBorderRunner
 *
 * Decorative light signal that continuously travels around the rounded border
 * of the MBY identity panel.
 *
 * The effect uses two synchronized layers:
 * - a soft blue halo;
 * - a smaller bright core.
 *
 * Reduced-motion users receive the static panel without the moving signal.
 */
/**
 * MbyLightJourney
 *
 * One single luminous point performs the complete visual sequence:
 *
 * 1. starts on the left side of the outer panel;
 * 2. completes one full clockwise lap around the rounded perimeter;
 * 3. leaves the perimeter and joins the thin divider directly under "MBY";
 * 4. travels horizontally across that divider;
 * 5. finishes permanently at the blue signature-dot position.
 *
 * The animation runs once only. There is no repeating border copy and no
 * second moving point. The same SVG core becomes the final signature light.
 *
 * Geometry is expressed in a 100 x 100 viewBox so it remains responsive.
 * Three geometry profiles are maintained:
 * - desktop: standard laptop / desktop panel;
 * - large: tall desktop screens (min-height: 900px);
 * - compact: tablet / smartphone panel.
 *
 * All profiles use the same visual sequence:
 * perimeter -> divider under MBY -> signature-row docking point.
 */
function MbyLightJourney({
  disabled,
  duration = 25,
  profile = "desktop",
}: {
  disabled: boolean;
  duration?: number;
  profile?: "desktop" | "large" | "compact";
}) {
  if (disabled) {
    return null;
  }

  const desktopJourneyPath = [
    // Start on the outer left border, vertically aligned with the MBY divider.
    "M 0.8 64.5",

    // Complete one full clockwise perimeter lap.
    "L 0.8 7",
    "Q 0.8 0.8 7 0.8",
    "L 93 0.8",
    "Q 99.2 0.8 99.2 7",
    "L 99.2 93",
    "Q 99.2 99.2 93 99.2",
    "L 7 99.2",
    "Q 0.8 99.2 0.8 93",
    "L 0.8 64.5",

    // Join the divider directly under MBY.
    "L 9.5 64.5",

    // Trace the full divider to the right.
    "L 91 64.5",

    // Finish aligned with the signature row.
    "L 91 72.5",
  ].join(" ");

  const largeJourneyPath = [
    // Large desktop geometry (tall screens >= 900px).
    // Calibrated against the actual divider under MBY.
    "M 0.8 52.8",

    // One complete clockwise perimeter lap.
    "L 0.8 7",
    "Q 0.8 0.8 7 0.8",
    "L 93 0.8",
    "Q 99.2 0.8 99.2 7",
    "L 99.2 93",
    "Q 99.2 99.2 93 99.2",
    "L 7 99.2",
    "Q 0.8 99.2 0.8 93",
    "L 0.8 52.8",

    // Join the actual divider directly under MBY.
    "L 9.5 52.8",

    // Trace the complete divider from left to right.
    "L 91 52.8",

    // Only after reaching the divider's end, drop to the signature row.
    "L 91 58.2",
  ].join(" ");

  const compactJourneyPath = [
    // Mobile/tablet geometry uses the compact MBY panel.
    "M 0.9 66",

    // Full clockwise perimeter lap.
    "L 0.9 8",
    "Q 0.9 0.9 8 0.9",
    "L 92 0.9",
    "Q 99.1 0.9 99.1 8",
    "L 99.1 92",
    "Q 99.1 99.1 92 99.1",
    "L 8 99.1",
    "Q 0.9 99.1 0.9 92",
    "L 0.9 66",

    // Join compact divider beneath MBY.
    "L 8.5 66",

    // Trace the entire compact divider.
    "L 91.5 66",

    // Final docking point aligned with the compact signature row.
    "L 91.5 75.5",
  ].join(" ");

  const journeyPath =
    profile === "compact"
      ? compactJourneyPath
      : profile === "large"
        ? largeJourneyPath
        : desktopJourneyPath;

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-30 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <defs>
        <filter
          id="mby-journey-glow"
          x="-300%"
          y="-300%"
          width="600%"
          height="600%"
        >
          <feGaussianBlur stdDeviation="1.35" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Large diffuse halo — follows exactly the same single trajectory. */}
      <circle
        r={profile === "large" ? "1.8975" : "1.65"}
        fill="rgba(96,165,250,0.28)"
        filter="url(#mby-journey-glow)"
      >
        <animateMotion
          path={journeyPath}
          dur={`${duration}s`}
          repeatCount="1"
          fill="freeze"
          calcMode="paced"
        />
        <animate
          attributeName="opacity"
          values="0.55;0.55;0.38"
          keyTimes="0;0.96;1"
          dur={`${duration}s`}
          repeatCount="1"
          fill="freeze"
        />
      </circle>

      {/*
       * Bright core.
       *
       * It is the same physical point for the complete animation. At the end,
       * its color shifts from white/blue to the permanent signature blue while
       * remaining frozen at the final coordinate.
       */}
      <circle
        r={profile === "large" ? "0.943" : "0.82"}
        fill="#dbeafe"
        filter="url(#mby-journey-glow)"
      >
        <animateMotion
          path={journeyPath}
          dur={`${duration}s`}
          repeatCount="1"
          fill="freeze"
          calcMode="paced"
        />
        <animate
          attributeName="fill"
          values="#dbeafe;#dbeafe;#2563eb"
          keyTimes="0;0.97;1"
          dur={`${duration}s`}
          repeatCount="1"
          fill="freeze"
        />
        <animate
          attributeName="r"
          values={
            profile === "large"
              ? "0.943;0.943;1.2075"
              : "0.82;0.82;1.05"
          }
          keyTimes="0;0.97;1"
          dur={`${duration}s`}
          repeatCount="1"
          fill="freeze"
        />
      </circle>
    </svg>
  );
}


/**
 * MbyLargeScreenJourney
 *
 * Grand-screen-only animation based on real DOM measurements.
 *
 * Unlike the percentage-based profiles, this component measures:
 * - the actual MBY panel dimensions;
 * - the actual divider beneath the MBY monogram;
 * - the actual signature row.
 *
 * This makes the luminous point follow the CSS border and the existing
 * divider precisely even when the panel becomes taller on large screens.
 */
function MbyLargeScreenJourney({
  disabled,
  duration = 7,
  panelRef,
  dividerRef,
  targetRef,
}: {
  disabled: boolean;
  duration?: number;
  panelRef: React.RefObject<HTMLElement | null>;
  dividerRef: React.RefObject<HTMLDivElement | null>;
  targetRef: React.RefObject<HTMLSpanElement | null>;
}) {
  const [path, setPath] = useState("");
  const [viewBox, setViewBox] = useState("0 0 1 1");

  useLayoutEffect(() => {
    if (disabled) {
      return;
    }

    const updateGeometry = () => {
      const panel = panelRef.current;
      const divider = dividerRef.current;
      const target = targetRef.current;

      if (!panel || !divider || !target) {
        return;
      }

      const panelRect = panel.getBoundingClientRect();
      const dividerRect = divider.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();

      const width = panelRect.width;
      const height = panelRect.height;

      if (width <= 0 || height <= 0) {
        return;
      }

      // Keep the signal centered directly on the 1px panel border.
      const inset = 0.5;

      // CSS rounded-3xl = 1.5rem ≈ 24px.
      const radius = Math.min(24, width / 4, height / 4);

      // Real divider geometry relative to the panel.
      const dividerY = dividerRect.top - panelRect.top;
      const dividerLeft = dividerRect.left - panelRect.left;
      const dividerRight = dividerRect.right - panelRect.left;

      /**
       * Language-safe final destination.
       *
       * Instead of calculating the final point from the divider dimensions,
       * measure the invisible target span itself. This keeps the animation
       * aligned in both English and French even when translated text changes
       * wrapping, spacing or internal layout.
       */
      const finalX =
        targetRect.left -
        panelRect.left +
        targetRect.width / 2;

      const finalY =
        targetRect.top -
        panelRect.top +
        targetRect.height / 2;

      const left = inset;
      const top = inset;
      const right = width - inset;
      const bottom = height - inset;

      const r = radius;

      /**
       * Start at the left border aligned with the divider.
       * Complete one clockwise lap around the exact panel border.
       * Return to the same point, join the real divider, trace it fully,
       * then move vertically to the final signature position.
       */
      const exactPath = [
        `M ${left} ${dividerY}`,

        // Left side up to top-left rounded corner.
        `L ${left} ${top + r}`,
        `Q ${left} ${top} ${left + r} ${top}`,

        // Top edge + top-right rounded corner.
        `L ${right - r} ${top}`,
        `Q ${right} ${top} ${right} ${top + r}`,

        // Right edge + bottom-right rounded corner.
        `L ${right} ${bottom - r}`,
        `Q ${right} ${bottom} ${right - r} ${bottom}`,

        // Bottom edge + bottom-left rounded corner.
        `L ${left + r} ${bottom}`,
        `Q ${left} ${bottom} ${left} ${bottom - r}`,

        // Back to divider level on the left border.
        `L ${left} ${dividerY}`,

        // Enter the existing divider under MBY.
        `L ${dividerLeft} ${dividerY}`,

        // Trace the complete existing divider.
        `L ${dividerRight} ${dividerY}`,

        // Final docking aligned with the signature row.
        `L ${finalX} ${finalY}`,
      ].join(" ");

      setViewBox(`0 0 ${width} ${height}`);
      setPath(exactPath);
    };

    updateGeometry();

    const observer = new ResizeObserver(updateGeometry);

    if (panelRef.current) {
      observer.observe(panelRef.current);
    }

    if (dividerRef.current) {
      observer.observe(dividerRef.current);
    }

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    window.addEventListener("resize", updateGeometry);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateGeometry);
    };
  }, [disabled, panelRef, dividerRef, targetRef]);

  if (disabled || !path) {
    return null;
  }

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-30 h-full w-full"
      viewBox={viewBox}
      preserveAspectRatio="none"
    >
      <defs>
        <filter
          id="mby-large-exact-glow"
          x="-300%"
          y="-300%"
          width="600%"
          height="600%"
        >
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* 15% larger halo for large screens. */}
      <circle
        r="7.2"
        fill="rgba(96,165,250,0.28)"
        filter="url(#mby-large-exact-glow)"
      >
        <animateMotion
          path={path}
          dur={`${duration}s`}
          repeatCount="1"
          fill="freeze"
          calcMode="paced"
        />
      </circle>

      {/* 15% larger bright core, following the exact same measured path. */}
      <circle
        r="4.1"
        fill="#dbeafe"
        filter="url(#mby-large-exact-glow)"
      >
        <animateMotion
          path={path}
          dur={`${duration}s`}
          repeatCount="1"
          fill="freeze"
          calcMode="paced"
        />

        <animate
          attributeName="fill"
          values="#dbeafe;#dbeafe;#2563eb"
          keyTimes="0;0.97;1"
          dur={`${duration}s`}
          repeatCount="1"
          fill="freeze"
        />

        <animate
          attributeName="r"
          values="4.1;4.1;4.7"
          keyTimes="0;0.97;1"
          dur={`${duration}s`}
          repeatCount="1"
          fill="freeze"
        />
      </circle>
    </svg>
  );
}

/**
 * Hero principal de la Homepage.
 *
 * Responsabilités :
 * - présenter le positionnement professionnel ;
 * - afficher les principaux appels à l'action ;
 * - introduire les trois rôles principaux ;
 * - montrer les métriques de crédibilité ;
 * - adapter la composition à la hauteur réelle de l'écran.
 *
 * La logique de contenu reste dans content/hero.ts.
 * Ce composant se concentre uniquement sur la présentation.
 */
export function Hero({
  yearsOfExperience,
}: HeroProps) {
  /**
   * Respecte la préférence système "Reduce Motion".
   *
   * Lorsque cette option est active, les animations d'entrée sont
   * désactivées afin d'améliorer l'accessibilité.
   */
  const shouldReduceMotion = useReducedMotion();
  const pathname = usePathname();
  const [lightRunId, setLightRunId] = useState(0);

  // Real DOM anchors used only by the large-screen light trajectory.
  const largePanelRef = useRef<HTMLElement | null>(null);
  const largeDividerRef = useRef<HTMLDivElement | null>(null);
  const largeTargetRef = useRef<HTMLSpanElement | null>(null);

  /**
   * Restart the MBY light journey every time the Homepage is entered again.
   *
   * Re-keying the animated component forces its SVG animation to remount,
   * so the sequence always starts fresh instead of resuming a previous state.
   */
  useEffect(() => {
    if (pathname === "/") {
      setLightRunId((current) => current + 1);
    }
  }, [pathname]);

  return (
    <section
      id="top"
      className="relative isolate flex min-h-svh flex-col overflow-hidden border-b border-white/10 bg-ink"
    >
      {/*
       * Lumière ambiante principale.
       *
       * Elle est purement décorative et placée derrière le contenu.
       * aria-hidden évite qu'elle soit interprétée par les technologies
       * d'assistance.
       */}  
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10rem] top-20 -z-10 h-[32rem] w-[42rem] rounded-[3rem] bg-accent/[0.045] blur-[120px]"
      />

      {/* Lumière secondaire servant à équilibrer le bas gauche du Hero. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-12rem] left-[-10rem] -z-10 h-[24rem] w-[34rem] rounded-[3rem] bg-white/[0.02] blur-[110px]"
      />

      {/*
       * Conteneur principal.
       *
       * La grille est divisée en deux zones sur desktop :
       * - 1.35fr pour le message principal ;
       * - 0.65fr pour le panneau d'identité MBY.
       *
       * Les media queries basées sur la hauteur sont intentionnelles :
       * elles optimisent spécifiquement les ordinateurs portables
       * de 14 et 15 pouces, qui constituent la priorité du portfolio.
       */}
      <div className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-10 px-6 pb-8 pt-24 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16 lg:pb-10 lg:pt-24 [@media(min-height:801px)_and_(max-height:899px)]:gap-8 [@media(min-height:801px)_and_(max-height:899px)]:pb-4 [@media(min-height:801px)_and_(max-height:899px)]:pt-20 [@media(max-height:800px)]:gap-6 [@media(max-height:800px)]:pb-2 [@media(max-height:800px)]:pt-16 [@media(min-height:900px)]:gap-14 [@media(min-height:900px)]:pb-14 [@media(min-height:900px)]:pt-28 [@media(min-height:900px)]:lg:gap-20">
        {/*
         * Colonne principale du Hero.
         *
         * Toutes les animations enfants sont orchestrées par
         * contentContainer et contentItem.
         */}
        <motion.div
          variants={
            shouldReduceMotion
              ? undefined
              : contentContainer
          }
          initial={
            shouldReduceMotion
              ? false
              : "hidden"
          }
          animate="visible"
        >
          {/* Eyebrow de positionnement et localisation. */}
          <motion.div
            variants={
              shouldReduceMotion
                ? undefined
                : contentItem
            }
            className="flex flex-wrap items-center gap-x-4 gap-y-2"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-accent">
              {hero.eyebrow}
            </p>

            <span className="hidden h-px w-10 bg-white/15 sm:block" />

            <div className="flex items-center gap-1.5 text-xs text-white/40">
              <MapPin className="h-3.5 w-3.5" />
              <span>{hero.location}</span>
            </div>
          </motion.div>

          {/*
           * Proposition de valeur principale.
           *
           * clamp() permet à la taille du titre de s'adapter de manière
           * fluide entre les différentes largeurs d'écran.
           *
           * Une taille spécifique est aussi prévue pour les écrans
           * dont la hauteur est inférieure à 800 px.
           */}
          <motion.h1
            variants={
              shouldReduceMotion
                ? undefined
                : contentItem
            }
            className="mt-8 max-w-5xl text-[clamp(2.5rem,4.6vw,3.75rem)] font-semibold leading-[1.03] tracking-[-0.05em] text-white [@media(max-height:800px)]:mt-6 [@media(max-height:800px)]:text-[clamp(2.25rem,4.1vw,3.35rem)] [@media(min-height:900px)]:mt-10"
          >
            I turn complex business and system challenges
            into{" "}
            <span className="text-white/42">
              clear digital products.
            </span>
          </motion.h1>

          {/* Description éditoriale chargée depuis content/hero.ts. */}
          <motion.p
            variants={
              shouldReduceMotion
                ? undefined
                : contentItem
            }
            className="mt-6 max-w-3xl text-base leading-7 text-white/58 sm:text-lg sm:leading-8 [@media(max-height:800px)]:mt-5 [@media(max-height:800px)]:text-base [@media(max-height:800px)]:leading-7 [@media(min-height:900px)]:mt-8"
          >
            {hero.description}
          </motion.p>

          {/*
           * Appels à l'action principaux.
           *
           * Le premier bouton dirige vers les projets.
           * Le second dirige vers une action professionnelle secondaire.
           */}
          <motion.div
            variants={
              shouldReduceMotion
                ? undefined
                : contentItem
            }
            className="mt-7 flex flex-col gap-3 sm:flex-row [@media(max-height:800px)]:mt-6 [@media(min-height:900px)]:mt-10"
          >
            <Link
              href={hero.primaryAction.href}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-ink transition duration-300 hover:-translate-y-0.5 hover:bg-white/90"
            >
              {hero.primaryAction.label}

              <ArrowDownRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </Link>

            <Link
              href={hero.secondaryAction.href}
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white/75 transition duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.05] hover:text-white"
            >
              {hero.secondaryAction.label}

              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          {/*
           * Les trois axes de positionnement professionnel.
           *
           * Cette zone est séparée par une bordure afin de structurer
           * clairement la fin de la colonne principale.
           */}
          <motion.div
            variants={
              shouldReduceMotion
                ? undefined
                : contentItem
            }
            className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-white/10 pt-5 [@media(min-height:801px)_and_(max-height:899px)]:mt-6 [@media(min-height:801px)_and_(max-height:899px)]:pt-4 [@media(max-height:800px)]:mt-5 [@media(max-height:800px)]:pt-3 [@media(min-height:900px)]:mt-16 [@media(min-height:900px)]:pt-6"
          >
            {hero.positioning.map(
              (position, index) => (
                <div
                  key={position}
                  className="flex items-center gap-3"
                >
                  <span className="text-xs text-white/25">
                    {String(index + 1).padStart(
                      2,
                      "0",
                    )}
                  </span>

                  <span className="text-sm font-medium text-white/62">
                    {position}
                  </span>
                </div>
              ),
            )}
          </motion.div>
        </motion.div>

        {/*
         * Panneau d'identité MBY.
         *
         * Il complète la proposition de valeur sans ajouter une image
         * photographique ou un visuel générique.
         *
         * Il est volontairement masqué sous le breakpoint lg pour éviter
         * de surcharger les écrans mobiles et tablettes.
         */}
        <motion.aside
          ref={largePanelRef}
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  x: 18,
                }
          }
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: shouldReduceMotion
              ? 0
              : 0.7,
            delay: shouldReduceMotion
              ? 0
              : 0.18,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative hidden min-h-[28rem] overflow-hidden rounded-3xl border border-[var(--mby-panel-border)] bg-[var(--mby-panel-background)] lg:block [@media(min-height:801px)_and_(max-height:899px)]:min-h-[24rem] [@media(max-height:800px)]:min-h-[21rem] [@media(min-height:900px)]:min-h-[32rem]"
        >
          {/*
           * Single light journey:
           * perimeter -> divider under MBY -> permanent signature point.
           */}
          {/*
           * Standard desktop / laptop trajectory.
           * Hidden on tall desktop screens where the panel proportions change.
           */}
          <div className="[@media(min-height:900px)]:hidden">
            <MbyLightJourney
              key={`mby-light-desktop-${lightRunId}`}
              disabled={Boolean(shouldReduceMotion)}
              duration={7.0}
              profile="desktop"
            />
          </div>

          {/*
           * Tall-screen trajectory.
           * The internal divider and signature row sit higher inside the
           * 32rem panel used at min-height: 900px, so this geometry is
           * calibrated separately without affecting laptop/mobile layouts.
           */}
          <div className="hidden [@media(min-height:900px)]:block">
            <MbyLargeScreenJourney
              key={`mby-light-large-${lightRunId}`}
              disabled={Boolean(shouldReduceMotion)}
              duration={7.0}
              panelRef={largePanelRef}
              dividerRef={largeDividerRef}
              targetRef={largeTargetRef}
            />
          </div>

          {/* Halo décoratif interne du panneau. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[-8rem] top-[-8rem] h-72 w-72 rounded-[4rem] bg-[var(--mby-panel-glow)] blur-[80px]"
          />

          <div className="relative flex h-full flex-col justify-between p-8 [@media(max-height:800px)]:p-7 [@media(min-height:900px)]:p-10">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-[var(--mby-panel-eyebrow)]">
                MBY Portfolio
              </p>

              <p className="mt-5 max-w-xs text-sm leading-7 text-[var(--mby-panel-body)] [@media(max-height:800px)]:mt-4 [@media(max-height:800px)]:leading-6">
                Business analysis, system operations and
                digital product thinking brought together
                in one professional identity.
              </p>
            </div>

            {/*
             * Signature visuelle principale du panneau.
             *
             * Le texte MBY est volontairement très peu contrasté :
             * il agit comme un élément graphique, pas comme un titre.
             */}
            <div className="select-none">
              <p className="text-[7rem] font-semibold leading-none tracking-[-0.08em] text-[var(--mby-panel-monogram)] [@media(max-height:800px)]:text-[6rem] [@media(min-height:900px)]:text-[8rem]">
                MBY
              </p>

              <div
                ref={largeDividerRef}
                className="-mt-3 relative flex items-center border-t border-[var(--mby-panel-border)] pt-5"
              >
                {/*
                 * Final visual destination:
                 * the animated point freezes immediately before the signature text.
                 * No second visible HTML dot is rendered.
                 */}
                <span
                  ref={largeTargetRef}
                  aria-hidden="true"
                  className="mr-3 h-2 w-2 shrink-0 opacity-0"
                />

                <span className="text-xs uppercase tracking-[0.22em] text-[var(--mby-panel-signature)]">
                  Mohamed Ben Yahmed
                </span>
              </div>
            </div>
          </div>
        </motion.aside>
        {/* 
          * Version mobile et tablette du panneau d’identité MBY.
          *
          * Le panneau desktop reste inchangé et visible uniquement à partir de lg.
          * Cette variante compacte préserve l’identité visuelle du Hero sans
          * surcharger les petits écrans.
        */}
        <motion.aside
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 16,
                }
         }
          animate={{
          opacity: 1,
          y: 0,
         }}
         transition={{
          duration: shouldReduceMotion ? 0 : 0.6,
          delay: shouldReduceMotion ? 0 : 0.22,
          ease: [0.22, 1, 0.36, 1],
         }}
         className="relative overflow-hidden rounded-3xl border border-[var(--mby-panel-border)] bg-[var(--mby-panel-background)] p-6 lg:hidden"
      >
         {/*
          * Responsive light journey for mobile and tablet.
          * Uses compact geometry matching the smaller MBY panel.
          */}
         <MbyLightJourney
           key={`mby-light-compact-${lightRunId}`}
           disabled={Boolean(shouldReduceMotion)}
           duration={7.0}
           profile="compact"
         />

         <div
           aria-hidden="true"
           className="pointer-events-none absolute right-[-5rem] top-[-5rem] h-48 w-48 rounded-full bg-[var(--mby-panel-glow)] blur-[70px]"
        />

         <div className="relative">
           <p className="text-xs font-medium uppercase tracking-[0.24em] text-[var(--mby-panel-eyebrow)]">
              MBY Portfolio
           </p>

            <p className="mt-4 max-w-sm text-sm leading-6 text-[var(--mby-panel-body)]">
              Business analysis, system operations and digital product thinking
              brought together in one professional identity.
            </p>

           <p className="mt-6 select-none text-[4.75rem] font-semibold leading-none tracking-[-0.08em] text-[var(--mby-panel-monogram)] sm:text-[5.5rem]">
            MBY
          </p>

          <div className="-mt-1 flex items-center justify-between border-t border-[var(--mby-panel-border)] pt-4">
            <span className="text-[0.68rem] uppercase tracking-[0.2em] text-[var(--mby-panel-signature)] sm:text-xs">
             Mohamed Ben Yahmed
           </span>

           <span
              aria-hidden="true"
              className="h-2 w-2 shrink-0 opacity-0"
            />
          </div>
      </div>
      </motion.aside>
      </div>

      {/*
       * Bandeau de métriques.
       *
       * Il est séparé du contenu principal pour renforcer la crédibilité
       * sans encombrer le message central du Hero.
       */}
      <motion.div
        initial={
          shouldReduceMotion
            ? false
            : {
                opacity: 0,
                y: 10,
              }
        }
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: shouldReduceMotion
            ? 0
            : 0.55,
          delay: shouldReduceMotion
            ? 0
            : 0.4,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="shrink-0 border-t border-white/10 bg-white/[0.018]"
      >
        {/*
         * Sur mobile, les métriques sont empilées.
         * À partir de sm, elles sont affichées sur trois colonnes.
         */}
        <div className="mx-auto grid max-w-6xl divide-y divide-white/10 px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <HeroMetric
            value={`${yearsOfExperience}+`}
            label="Years in systems & IT operations"
          />

          <HeroMetric
            value="6"
            label="Core professional capabilities"
          />

          <HeroMetric
            value="4"
            label="Selected product case studies"
          />
        </div>
      </motion.div>
    </section>
  );
}

/**
 * Élément individuel du bandeau de métriques.
 *
 * Le composant évite de répéter la même structure trois fois
 * et garantit une présentation homogène.
 */
function HeroMetric({
  value,
  label,
}: HeroMetricProps) {
  return (
    <div className="flex min-h-28 flex-col justify-center py-6 sm:px-8 sm:first:pl-0 sm:last:pr-0 [@media(min-height:801px)_and_(max-height:899px)]:min-h-24 [@media(min-height:801px)_and_(max-height:899px)]:py-4 [@media(max-height:800px)]:min-h-20 [@media(max-height:800px)]:py-3 [@media(min-height:900px)]:min-h-32 [@media(min-height:900px)]:py-7">
      <p className="text-3xl font-semibold tracking-[-0.05em] text-white [@media(min-height:900px)]:text-4xl">
        {value}
      </p>

      <p className="mt-2 max-w-[15rem] text-sm leading-6 text-white/45 [@media(max-height:800px)]:mt-1 [@media(max-height:800px)]:leading-5">
        {label}
      </p>
    </div>
  );
}