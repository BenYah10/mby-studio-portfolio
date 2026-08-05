import Image from "next/image";

import type { Project } from "@/content/projects";

type ProjectMediaProps = {
  project: Project;
  featured?: boolean;
  featuredMobile?: boolean;
};

/**
 * Gère l'affichage des visuels dans les cartes de projets.
 *
 * Deux variantes sont supportées :
 * - featured : traitement éditorial spécifique pour le projet principal ;
 * - standard : image intégrée dans le flux normal des cartes secondaires.
 *
 * Le composant reçoit directement l'objet Project afin de récupérer :
 * - le chemin de l'image ;
 * - le texte alternatif ;
 * - la présence ou non d'un média.
 */
export function ProjectMedia({
  project,
  featured = false,
  featuredMobile = false,
}: ProjectMediaProps) {
  /**
   * Certains projets peuvent exister sans visuel associé.
   *
   * Dans ce cas, le composant ne rend rien et laisse ProjectCard
   * ajuster son espacement selon l'absence de média.
   */
  if (!project.media) {
    return null;
  }

  /**
 * Variante mobile du projet principal.
 *
 * Contrairement à la composition desktop en position absolue,
 * cette version participe au flux normal de la carte.
 *
 * Elle est affichée uniquement sous le breakpoint lg afin de :
 * - préserver la lisibilité du contenu ;
 * - empêcher tout débordement horizontal ;
 * - conserver la machine entièrement visible ;
 * - ne pas modifier la composition desktop existante.
 */
if (featuredMobile) {
  return (
    <div
      aria-hidden="true"
      className="relative mt-8 h-[24rem] w-full overflow-hidden rounded-[1.5rem] border border-white/[0.07] bg-gradient-to-br from-blue-500/[0.07] via-white/[0.015] to-transparent sm:h-[28rem] lg:hidden"
    >
      {/* Panneau décoratif derrière la machine. */}
      <div className="absolute inset-x-8 top-5 h-[20rem] rounded-[1.4rem] border border-white/[0.055] bg-white/[0.015] sm:inset-x-8 sm:h-[18rem]" />

      {/* Halos lumineux adaptés aux petits écrans. */}
      <div className="absolute left-1/2 top-8 h-56 w-56 -translate-x-1/2 rounded-full bg-blue-500/[0.13] blur-[85px] sm:h-64 sm:w-64" />

      <div className="absolute left-1/2 top-16 h-40 w-40 -translate-x-1/2 rounded-full bg-cyan-400/[0.08] blur-[70px] sm:h-48 sm:w-48" />

      {/* Ombre de contact sous la machine. */}
      <div className="absolute bottom-5 left-1/2 h-8 w-44 -translate-x-1/2 rounded-full bg-black/65 blur-xl sm:w-52" />

      <Image
        src={project.media.image}
        alt={project.media.alt}
        fill
        priority
        sizes="(max-width: 639px) calc(100vw - 72px), (max-width: 1023px) 520px"
        className="relative z-10 object-contain object-center scale-[1.55] px-0 py-0 drop-shadow-[0_32px_48px_rgba(0,0,0,0.65)] transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-[1.32] sm:scale-[1.22] sm:px-4"
      />
    </div>
  );
}

  /**
   * Variante du projet principal.
   *
   * Le visuel est positionné en absolute afin de créer une composition
   * plus éditoriale et immersive dans la grande carte BlueKioskTech.
   *
   * Cette variante est volontairement masquée sous lg, car une image
   * absolue de cette taille sur mobile créerait des risques de débordement
   * et nuirait à la lisibilité du contenu.
   */
  if (featured) {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-10 hidden h-[31rem] w-[38rem] lg:block xl:right-2 xl:h-[33rem] xl:w-[41rem]"
      >
        {/*
         * Panneau rectangulaire subtil placé derrière la machine.
         *
         * Il structure visuellement la zone sans donner l'impression
         * d'une image placée directement sur le fond de la carte.
         */}
        <div className="absolute right-8 top-12 h-[22rem] w-[23rem] rounded-[2rem] border border-white/[0.055] bg-gradient-to-br from-white/[0.03] via-white/[0.01] to-transparent shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] xl:right-10 xl:h-[24rem] xl:w-[25rem]" />

        {/*
         * Halos décoratifs.
         *
         * Les différentes tailles et intensités créent une profondeur
         * lumineuse sans nécessiter une image de fond supplémentaire.
         */}
        <div className="absolute right-4 top-8 h-[25rem] w-[25rem] rounded-full bg-blue-500/[0.12] blur-[120px] xl:right-6 xl:h-[27rem] xl:w-[27rem]" />

        <div className="absolute right-16 top-20 h-64 w-64 rounded-full bg-cyan-400/[0.08] blur-[105px] xl:right-20 xl:h-72 xl:w-72" />

        {/*
         * Lueurs et ombres horizontales sous la machine.
         *
         * Elles simulent un point de contact avec le sol et évitent
         * que le visuel semble flotter sans ancrage.
         */}
        <div className="absolute bottom-5 right-16 h-10 w-64 rounded-full bg-blue-400/[0.12] blur-3xl xl:right-20 xl:w-72" />

        <div className="absolute bottom-3 right-16 h-10 w-64 rounded-full bg-black/60 blur-2xl xl:right-20 xl:w-72" />

        {/*
         * Image principale BlueKioskTech.
         *
         * object-contain est indispensable ici :
         * la machine doit toujours rester entièrement visible.
         *
         * object-[58%_56%] ajuste précisément son point de composition
         * à l'intérieur du conteneur.
         *
         * priority est utilisé car ce visuel principal apparaît très tôt
         * dans la page et doit être chargé rapidement.
         */}
        <Image
          src={project.media.image}
          alt={project.media.alt}
          fill
          priority
          sizes="(min-width: 1280px) 656px, 608px"
          className="relative z-10 translate-x-4 object-contain object-[58%_56%] drop-shadow-[0_42px_65px_rgba(0,0,0,0.65)] transition-transform duration-500 ease-out group-hover:translate-x-16 group-hover:-translate-y-2 group-hover:scale-[1.03]"
        />
      </div>
    );
  }

  /**
   * Variante standard utilisée pour les autres projets.
   *
   * Le ratio 16/9 homogénéise la présentation des dashboards et
   * illustrations malgré leurs dimensions sources différentes.
   *
   * overflow-hidden garantit que le zoom au survol reste contenu
   * dans les coins arrondis du cadre.
   */
  return (
    <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-[1.4rem] border border-white/10 bg-black/20">
      {/*
       * object-cover remplit entièrement le cadre 16/9.
       *
       * Ce choix fonctionne bien pour les dashboards et illustrations,
       * mais devra toujours être validé visuellement afin de vérifier
       * qu'aucune information importante n'est recadrée.
       */}
      <Image
        src={project.media.image}
        alt={project.media.alt}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
      />

      {/*
       * Overlay léger.
       *
       * Il améliore l'intégration de l'image dans le thème sombre
       * et ajoute une subtile lumière sur la partie supérieure.
       */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/[0.025]"
      />
    </div>
  );
}