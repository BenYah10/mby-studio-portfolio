"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
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
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

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

              <div className="-mt-3 flex items-center justify-between border-t border-[var(--mby-panel-border)] pt-5">
                <span className="text-xs uppercase tracking-[0.22em] text-[var(--mby-panel-signature)]">
                  Mohamed Ben Yahmed
                </span>

                {/*
                 * Point lumineux servant de signature graphique
                 * et de rappel de la couleur d'accent.
                 */}
                <span className="h-2 w-2 rounded-full bg-[var(--mby-panel-dot)] shadow-[0_0_24px_var(--mby-panel-dot-glow)]" />
              </div>
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