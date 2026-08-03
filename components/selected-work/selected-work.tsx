import { projects } from "@/content/projects";

import { ProjectCard } from "./project-card";

/**
 * Seuls les projets explicitement marqués comme featured
 * sont affichés sur la Homepage.
 *
 * Cette logique permet d'ajouter d'autres projets dans content/projects.ts
 * sans devoir modifier directement ce composant.
 */
const featuredProjects = projects.filter(
  (project) => project.featured,
);

/**
 * Section "Selected Work" de la Homepage.
 *
 * Responsabilités :
 * - présenter l'introduction de la sélection de projets ;
 * - récupérer les projets mis en avant ;
 * - déléguer le rendu de chaque projet à ProjectCard.
 *
 * Ce composant reste volontairement simple :
 * - les données sont centralisées dans content/projects.ts ;
 * - la présentation détaillée des cartes reste dans project-card.tsx ;
 * - le traitement des images reste dans project-media.tsx.
 */
export function SelectedWork() {
  return (
    <section
      id="work"
      className="scroll-mt-16 mx-auto max-w-6xl px-6 pb-24 pt-12 sm:pt-16"
    >
      {/*
       * Introduction de la section.
       *
       * Sur mobile, le titre et le paragraphe sont empilés.
       * À partir du breakpoint lg, ils utilisent deux colonnes :
       * - gauche : eyebrow et titre ;
       * - droite : description éditoriale.
       */}
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-accent">
            Selected work
          </p>

          <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Projects that show how I think, analyze and build.
          </h2>
        </div>

        {/*
         * Le paragraphe est aligné à droite sur desktop afin d'équilibrer
         * visuellement la masse du titre placé dans la colonne gauche.
         */}
        <p className="max-w-xl text-base leading-7 text-white/55 lg:justify-self-end lg:pt-14 lg:text-right">
          A curated selection of product, data and AI initiatives that
          demonstrate how I translate complex needs into structured,
          practical and scalable solutions.
        </p>
      </div>

      {/*
       * Grille principale des projets.
       *
       * - une seule colonne sur mobile ;
       * - deux colonnes à partir de md ;
       * - la première carte peut occuper les deux colonnes grâce à la
       *   logique définie dans ProjectCard.
       *
       * L'index est transmis à ProjectCard afin de :
       * - numéroter les projets ;
       * - identifier le premier projet comme projet principal.
       */}
      <div className="mt-16 grid gap-5 md:grid-cols-2">
        {featuredProjects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}