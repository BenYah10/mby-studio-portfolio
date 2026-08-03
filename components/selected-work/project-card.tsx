import Link from "next/link";
import { ArrowUpRight, Clock3 } from "lucide-react";

import type { Project } from "@/content/projects";

import { ProjectMedia } from "./project-media";

type ProjectCardProps = {
  project: Project;
  index: number;
};

/**
 * Carte de projet utilisée dans la section Selected Work.
 *
 * Le composant gère deux variantes :
 * - la première carte devient le projet principal ;
 * - les autres cartes utilisent une présentation standard.
 *
 * Il gère également deux états fonctionnels :
 * - projet avec étude de cas disponible ;
 * - projet visible mais étude de cas encore indisponible.
 */
export function ProjectCard({
  project,
  index,
}: ProjectCardProps) {
  /**
   * Le premier projet de la liste reçoit une présentation plus large.
   *
   * Cette décision est basée sur l'ordre défini dans content/projects.ts.
   * Il faut donc conserver BlueKioskTech en première position si celui-ci
   * doit rester le projet principal de la Homepage.
   */
  const isFeatured = index === 0;

  /**
   * Détermine si la carte doit être interactive.
   *
   * Un projet sans étude de cas ne doit pas être rendu sous forme de lien
   * désactivé. Il est rendu comme un article statique afin de préserver
   * une sémantique HTML et une accessibilité correctes.
   */
  const hasCaseStudy = project.caseStudyAvailable;

  /**
   * Contenu visuel partagé entre les deux rendus possibles :
   * - Link lorsque l'étude de cas existe ;
   * - article lorsqu'elle n'est pas encore disponible.
   *
   * Cette extraction évite de dupliquer toute la structure de la carte.
   */
  const cardContent = (
    <>
      {/*
       * Halo de fond révélé au survol.
       *
       * Cet élément est purement décoratif et ne doit pas intercepter
       * les interactions utilisateur.
       */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/[0.055] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      {/*
       * Ligne lumineuse animée en haut à droite.
       *
       * Elle renforce l'état interactif de la carte sans ajouter
       * une animation trop démonstrative.
       */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-px w-0 bg-gradient-to-l from-accent/60 to-transparent transition-[width] duration-500 group-hover:w-1/2"
      />

      {/*
       * Le projet principal utilise une présentation média absolue.
       *
       * Le visuel est placé derrière et à droite du contenu principal,
       * ce qui permet une composition plus éditoriale que les autres cartes.
       */}
      {isFeatured && (
        <ProjectMedia
          project={project}
          featured
        />
      )}

      <div className="relative z-10 flex w-full flex-col">
        {/*
         * En-tête de carte :
         * - numéro du projet ;
         * - catégorie ;
         * - indicateur d'interaction ou de disponibilité.
         */}
        <div className="flex items-start justify-between gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>

            <span className="h-px w-8 bg-white/15" />

            <span className="text-xs uppercase tracking-[0.18em] text-white/35 transition-colors duration-300 group-hover:text-white/50">
              {project.category}
            </span>
          </div>

          {/*
           * L'icône change selon la disponibilité de l'étude de cas :
           * - flèche pour une carte interactive ;
           * - horloge pour une étude de cas à venir.
           */}
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.025] transition duration-300 group-hover:border-white/20 group-hover:bg-white/[0.06]">
            {hasCaseStudy ? (
              <ArrowUpRight className="h-4 w-4 text-white/40 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
            ) : (
              <Clock3 className="h-4 w-4 text-white/30" />
            )}
          </span>
        </div>

        {/*
         * Les projets secondaires affichent leur image dans le flux normal.
         *
         * Contrairement au projet principal, leur visuel participe directement
         * à la hauteur de la carte et conserve un ratio uniforme.
         */}
        {!isFeatured && (
          <ProjectMedia
            project={project}
            featured={false}
          />
        )}

        {/*
         * Conteneur principal du contenu textuel.
         *
         * mt-auto pousse cette zone vers le bas afin que les cartes
         * secondaires conservent une structure visuelle cohérente.
         *
         * L'espacement supérieur dépend :
         * - du statut featured ;
         * - de la présence ou non d'un média.
         */}
        <div
          className={`relative mt-auto ${
            isFeatured
              ? "pt-16 sm:pt-20 lg:max-w-[50%]"
              : project.media
                ? "pt-8"
                : "pt-12 sm:pt-16 lg:pt-20"
          }`}
        >
          {/* Rôle ou contribution principale sur le projet. */}
          <p className="text-sm leading-6 text-white/55">
            {project.role}
          </p>

          {/*
           * Le projet principal reçoit une échelle typographique plus forte.
           *
           * Les autres titres utilisent clamp() afin de s'adapter
           * progressivement aux différentes largeurs d'écran.
           */}
          <h3
            className={`mt-4 font-semibold tracking-[-0.04em] text-white transition-colors duration-300 ${
              isFeatured
                ? "max-w-4xl text-4xl sm:text-5xl lg:text-6xl"
                : "text-[clamp(1.8rem,3vw,2.5rem)]"
            }`}
          >
            {project.title}
          </h3>

          <p
            className={`mt-5 leading-7 text-white/55 ${
              isFeatured
                ? "max-w-3xl text-lg"
                : "max-w-xl"
            }`}
          >
            {project.description}
          </p>

          {/*
           * Capacités démontrées par le projet.
           *
           * flex-wrap permet aux badges de revenir à la ligne proprement
           * lorsque la largeur disponible diminue.
           */}
          <div className="mt-8 flex flex-wrap gap-2">
            {project.capabilities.map((capability) => (
              <span
                key={capability}
                className="rounded-full border border-white/10 bg-white/[0.025] px-3 py-1.5 text-xs text-white/55 transition-colors duration-300 group-hover:border-white/15 group-hover:text-white/65"
              >
                {capability}
              </span>
            ))}
          </div>

          {/*
           * Pied de carte.
           *
           * Il affiche :
           * - l'état actuel du projet ;
           * - l'action disponible ou l'indication "coming soon".
           */}
          <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
            <span className="text-sm text-white/35">
              {project.status}
            </span>

            <span
              className={`inline-flex items-center gap-2 text-sm font-medium ${
                hasCaseStudy
                  ? "text-white/70 transition-colors duration-300 group-hover:text-white"
                  : "text-white/35"
              }`}
            >
              {hasCaseStudy
                ? "Explore case study"
                : "Case study coming soon"}

              {hasCaseStudy ? (
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              ) : (
                <Clock3 className="h-4 w-4" />
              )}
            </span>
          </div>
        </div>
      </div>
    </>
  );

  /**
   * Classes communes aux deux variantes de carte.
   *
   * La hauteur minimale évite les déséquilibres dus aux différences
   * de longueur des titres, descriptions et listes de capacités.
   *
   * Le projet principal :
   * - occupe les deux colonnes à partir de md ;
   * - reçoit une hauteur minimale supérieure.
   */
  const cardClassName = `group relative flex overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] p-6 transition-[transform,border-color,background-color,box-shadow] duration-300 ease-out sm:p-8 lg:p-9 ${
    isFeatured
      ? "min-h-[28rem] md:col-span-2 md:min-h-[31rem]"
      : "min-h-[24rem] sm:min-h-[26rem]"
  } ${
    hasCaseStudy
      ? "hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.04] hover:shadow-[0_24px_80px_rgba(0,0,0,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-ink"
      : "cursor-default"
  }`;

  /**
   * Projet sans étude de cas disponible.
   *
   * L'utilisation d'un article évite de créer un lien sans destination
   * ou un élément interactif trompeur.
   */
  if (!hasCaseStudy) {
    return (
      <article
        aria-label={`${project.title} case study coming soon`}
        className={cardClassName}
      >
        {cardContent}
      </article>
    );
  }

  /**
   * Projet avec étude de cas disponible.
   *
   * Toute la carte devient cliquable et dirige vers la route dynamique :
   * /projects/[slug]
   */
  return (
    <Link
      href={`/projects/${project.slug}`}
      aria-label={`View ${project.title} project`}
      className={cardClassName}
    >
      {cardContent}
    </Link>
  );
}