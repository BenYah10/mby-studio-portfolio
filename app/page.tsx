import { CheckCircle2 } from "lucide-react";

import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { SelectedWork } from "@/components/selected-work/selected-work";

import { about } from "@/content/about";
import { experiences } from "@/content/experience";
import { expertise } from "@/content/expertise";
import {
  getYearsOfExperience,
  profile,
} from "@/content/profile";

/**
 * Homepage principale du portfolio.
 *
 * Responsabilité de ce fichier :
 * - composer les grandes sections de la page d'accueil ;
 * - connecter les composants UI aux données de contenu ;
 * - conserver une lecture linéaire et recruiter-friendly.
 *
 * Règle architecturale :
 * - app/ gère le routing et la composition des pages ;
 * - components/ contient les composants UI ;
 * - content/ contient les données éditoriales ;
 * - la logique métier complexe ne doit pas être ajoutée ici.
 */
export default function Home() {
  /**
   * Le nombre d'années d'expérience est calculé dynamiquement à partir
   * de la date officielle de début de carrière définie dans profile.
   *
   * Cela évite de devoir mettre manuellement à jour le chiffre affiché
   * dans le Hero chaque année.
   */
  const yearsOfExperience = getYearsOfExperience(
    profile.professionalStartDate,
  );

  return (
    /**
     * Le main possède l'identifiant "top" afin de servir de destination
     * pour les liens permettant de revenir en haut de la page.
     */
    <main id="top">
      {/* Navigation globale du portfolio. */}
      <Navbar />

      {/*
       * Hero principal.
       *
       * Le nombre d'années d'expérience est injecté comme prop afin que
       * le composant Hero reste indépendant de la source des données.
       */}
      <Hero yearsOfExperience={yearsOfExperience} />

      {/*
       * Section des projets sélectionnés.
       *
       * Elle est placée immédiatement après le Hero afin de montrer
       * rapidement les preuves concrètes du positionnement professionnel.
       */}
      <SelectedWork />

      {/*
       * EXPERIENCE
       *
       * La section utilise une séparation visuelle complète :
       * - bordure supérieure et inférieure ;
       * - fond légèrement différent ;
       * - largeur commune max-w-6xl.
       *
       * scroll-mt-24 réserve un espace au-dessus de la section lorsqu'elle
       * est atteinte depuis un lien d'ancrage de la Navbar.
       */}
      <section
        id="experience"
        className="scroll-mt-16 border-y border-white/10 bg-white/[0.02]"
      >
        <div className="mx-auto max-w-6xl px-6 py-24">
          <SectionHeading
            eyebrow="Experience"
            title="Professional experience across systems, operations and business analysis."
          />

          {/*
           * Les expériences sont séparées par des lignes horizontales.
           *
           * Sur les grands écrans :
           * - colonne gauche : rôle, entreprise et période ;
           * - colonne droite : résumé, réalisations et capacités.
           */}
          <div className="mt-16 divide-y divide-white/10 border-y border-white/10">
            {experiences.map((experience, index) => (
              <article
                key={`${experience.company}-${experience.role}`}
                className="grid gap-10 py-12 lg:grid-cols-[0.75fr_1.25fr]"
              >
                {/* Informations principales de l'expérience. */}
                <div>
                  <p className="text-sm font-medium text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </p>

                  <h3 className="mt-4 text-2xl font-semibold tracking-tight">
                    {experience.role}
                  </h3>

                  <p className="mt-3 text-white/65">
                    {experience.company}
                  </p>

                  <div className="mt-5 space-y-1 text-sm text-white/40">
                    <p>{experience.period}</p>
                    <p>{experience.location}</p>
                  </div>
                </div>

                {/* Résumé, réalisations et compétences associées. */}
                <div>
                  <p className="max-w-2xl text-lg leading-8 text-white/65">
                    {experience.summary}
                  </p>

                  <ul className="mt-8 space-y-4">
                    {experience.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex gap-3 text-sm leading-6 text-white/55"
                      >
                        {/*
                         * L'icône est décorative mais renforce la lecture
                         * visuelle de chaque réalisation.
                         */}
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />

                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Liste compacte des capacités démontrées. */}
                  <div className="mt-8 flex flex-wrap gap-2">
                    {experience.capabilities.map((capability) => (
                      <span
                        key={capability}
                        className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs text-white/55"
                      >
                        {capability}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/*
       * CORE EXPERTISE
       *
       * Cette section transforme l'expérience professionnelle en domaines
       * d'expertise facilement identifiables par les recruteurs.
       */}
      <section
        id="expertise"
        className="scroll-mt-16 mx-auto max-w-6xl px-6 py-24"
      >
        <SectionHeading
          eyebrow="Core Expertise"
          title="Capabilities built through real systems, data and product challenges."
        />

        <p className="mt-6 max-w-3xl text-lg leading-8 text-white/55">
          My experience combines operational systems, functional analysis,
          business intelligence and digital product development.
        </p>

        {/*
         * Grille responsive :
         * - 1 colonne sur mobile ;
         * - 2 colonnes à partir de md ;
         * - 3 colonnes à partir de lg.
         */}
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {expertise.map((item, index) => (
            <article
              key={item.title}
              className="group flex min-h-[22rem] flex-col rounded-[2rem] border border-white/10 bg-white/[0.025] p-7 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.045]"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-medium text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/45">
                  {item.category}
                </span>
              </div>

              {/*
               * mt-auto pousse le contenu principal vers le bas.
               * Les cartes conservent ainsi une composition cohérente même
               * lorsque les textes ont des longueurs différentes.
               */}
              <div className="mt-auto pt-14">
                <h3 className="text-2xl font-semibold tracking-tight">
                  {item.title}
                </h3>

                <p className="mt-5 leading-7 text-white/55">
                  {item.description}
                </p>

                <div className="mt-7 flex flex-wrap gap-2">
                  {item.evidence.map((evidence) => (
                    <span
                      key={evidence}
                      className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs text-white/50"
                    >
                      {evidence}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/*
       * ABOUT
       *
       * Cette section explique le parcours et la différenciation
       * professionnelle derrière les projets présentés.
       */}
      <section
        id="about"
        className="scroll-mt-16 border-y border-white/10 bg-white/[0.02]"
      >
        <div className="mx-auto max-w-6xl px-6 py-24">
          {/*
           * Mise en page en deux colonnes sur desktop :
           * - gauche : titre et positionnement ;
           * - droite : histoire et proposition de valeur.
           */}
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
                {about.eyebrow}
              </p>

              <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                {about.title}
              </h2>
            </div>

            <div className="space-y-6 text-lg leading-8 text-white/60">
              <p className="text-xl leading-9 text-white/80">
                {about.introduction}
              </p>

              <p>{about.story}</p>
              <p>{about.differentiation}</p>
              <p>{about.closing}</p>
            </div>
          </div>

          {/* Piliers synthétiques du positionnement professionnel. */}
          <div className="mt-16 grid gap-5 md:grid-cols-3">
            {about.pillars.map((pillar, index) => (
              <article
                key={pillar.value}
                className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-7 sm:p-8"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-medium text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="text-xs uppercase tracking-[0.18em] text-white/35">
                    {pillar.value}
                  </span>
                </div>

                <h3 className="mt-10 text-xl font-semibold tracking-tight">
                  {pillar.label}
                </h3>

                <p className="mt-4 leading-7 text-white/50">
                  {pillar.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/*
       * HOW I WORK
       *
       * Cette section résume la méthode de travail sans ajouter une autre
       * grille de cartes. Elle sert de transition vers la zone de contact.
       */}
      <section
        id="approach"
        className="scroll-mt-16 mx-auto grid max-w-6xl gap-12 px-6 py-28 lg:grid-cols-2"
        >
        <SectionHeading
          eyebrow="How I work"
          title="Analyze. Translate. Improve. Build."
        />

        <div className="space-y-6 text-lg leading-8 text-white/60">
          <p>
            I begin by understanding the business context, users, systems,
            data and operational constraints.
          </p>

          <p>
            I translate complexity into clear requirements, workflows,
            decisions and product structures that technical and non-technical
            teams can act on.
          </p>

          <p>
            My work sits at the intersection of analysis, operations, data and
            digital product development.
          </p>
        </div>
      </section>

      {/*
       * CONTACT
       *
       * Dernier appel à l'action de la Homepage.
       * Les URLs temporaires devront être remplacées avant la mise en production.
       */}

      <section
        id="contact"
         className="scroll-mt-16 mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-6xl items-center px-6 py-12 sm:py-16"
>
        <div className="w-full rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-glow sm:p-14">
          <p className="text-sm uppercase tracking-[0.2em] text-accent">
            Contact
          </p>

            <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
            Let&apos;s discuss a role, system challenge or product opportunity.
            </h2>

          <div className="mt-9 flex flex-wrap gap-4">
            <div className="flex-1"></div>
              {/* TODO: remplacer par l'adresse professionnelle finale. */}
              {/* 
                * Lien email centralisé.
                *
                * L'adresse provient de content/profile.ts afin d'éviter
              * toute duplication dans plusieurs composants.
          */}
            <a
              href={`mailto:${profile.email}`}
              className="rounded-full bg-paper px-6 py-3 font-medium text-ink transition hover:opacity-90"
            >
              Email me
            </a>

           {/* 
             * Profil LinkedIn officiel.
             *
             * target="_blank" ouvre un nouvel onglet.
             * rel protège contre certaines vulnérabilités
             * liées aux liens externes.
           */}
           <a
             href={profile.linkedin}
             target="_blank"
             rel="noopener noreferrer"
             className="rounded-full border border-white/15 px-6 py-3 font-medium transition hover:border-white/30 hover:bg-white/[0.04]"
            >
             LinkedIn
            </a>

           {/* 
            * Dépôt GitHub principal.
            *
            * L'URL est centralisée dans content/profile.ts
            * pour simplifier la maintenance.
            */}
           <a
             href={profile.github}
             target="_blank"
             rel="noopener noreferrer"
             className="rounded-full border border-white/15 px-6 py-3 font-medium transition hover:border-white/30 hover:bg-white/[0.04]"
           >
             GitHub
           </a>
         </div>
       </div>
     </section>

      {/* Footer minimaliste conservant la continuité visuelle du portfolio. */}
      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-white/35">
        © {new Date().getFullYear()} Mohamed Ben Yahmed. Built with Next.js.
      </footer>
    </main>
  );
}

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
};

/**
 * Titre réutilisable pour les principales sections de la Homepage.
 *
 * Il reste local à ce fichier car il n'est actuellement utilisé que par
 * cette page. Il pourra être extrait dans components/ uniquement si plusieurs
 * pages commencent réellement à partager la même structure.
 */
function SectionHeading({
  eyebrow,
  title,
}: SectionHeadingProps) {
  return (
    <div>
      <p className="text-sm uppercase tracking-[0.2em] text-accent">
        {eyebrow}
      </p>

      <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
        {title}
      </h2>
    </div>
  );
}