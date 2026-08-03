import Link from "next/link";

/**
 * Liens principaux de navigation de la Homepage.
 *
 * Chaque entrée contient :
 * - le libellé visible ;
 * - l'identifiant de la section ciblée.
 *
 * Les valeurs correspondent aux id présents dans app/page.tsx.
 * Toute modification d'un id de section doit donc être répercutée ici.
 */
const links = [
  ["Work", "#work"],
  ["Experience", "#experience"],
  ["About", "#about"],
  ["Contact", "#contact"],
];

/**
 * Barre de navigation globale du portfolio.
 *
 * Responsabilités :
 * - permettre l'accès rapide aux grandes sections de la Homepage ;
 * - garder l'identité MBY toujours visible ;
 * - proposer un appel à l'action direct vers la section Contact.
 *
 * La Navbar reste volontairement légère :
 * - aucun état local ;
 * - aucun menu complexe ;
 * - aucune logique métier ;
 * - navigation uniquement basée sur des ancres internes.
 */
export function Navbar() {
  return (
    /**
     * Header fixé en haut de la fenêtre.
     *
     * - fixed maintient la Navbar visible pendant le défilement ;
     * - z-50 garantit qu'elle reste au-dessus du contenu ;
     * - backdrop-blur-xl crée un effet de verre subtil ;
     * - bg-ink/90 préserve la lisibilité même sur des sections animées.
     */
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/90 backdrop-blur-xl">
      {/*
       * Le conteneur utilise la même largeur max-w-6xl que le reste
       * de la Homepage afin de conserver les alignements horizontaux.
       */}
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/*
         * Signature principale du portfolio.
         *
         * Le lien ramène au Hero grâce à l'ancre #top.
         */}
        <Link
          href="#top"
          className="font-semibold tracking-tight"
        >
          MBY.
        </Link>

        {/*
         * Navigation principale.
         *
         * Elle est masquée sous le breakpoint md afin d'éviter une
         * surcharge horizontale sur les petits écrans.
         *
         * Une stratégie mobile dédiée pourra être ajoutée ultérieurement
         * si l'audit responsive révèle qu'elle est nécessaire.
         */}
        <nav
          aria-label="Primary navigation"
          className="hidden gap-7 text-sm text-white/70 md:flex"
        >
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="transition hover:text-white"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/*
         * Appel à l'action principal de la Navbar.
         *
         * Contrairement aux liens de navigation standards, ce bouton reste
         * visible sur toutes les tailles d'écran afin de conserver un accès
         * direct à la prise de contact.
         */}
        <Link
          href="#contact"
          className="rounded-full border border-white/15 px-4 py-2 text-sm transition hover:border-white/30 hover:bg-white/5"
        >
          Let&apos;s talk
        </Link>
      </div>
    </header>
  );
}