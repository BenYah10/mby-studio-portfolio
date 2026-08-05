"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type NavigationLink = {
  label: string;
  href: string;
};

type MobileMenuProps = {
  isOpen: boolean;
  links: NavigationLink[];
  onClose: () => void;
};

/**
 * Menu de navigation mobile du portfolio.
 *
 * Responsabilités :
 * - afficher les liens principaux sous le breakpoint md ;
 * - animer l’ouverture et la fermeture du panneau ;
 * - fermer le menu après la sélection d’un lien ;
 * - fermer le menu avec la touche Escape ;
 * - préserver une navigation accessible au clavier.
 *
 * La gestion de l’état reste dans Navbar afin que ce composant
 * reste purement présentationnel.
 */
export function MobileMenu({
  isOpen,
  links,
  onClose,
}: MobileMenuProps) {
  /**
   * Ferme le menu lorsque l’utilisateur appuie sur Escape.
   */
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          initial={{
            opacity: 0,
            height: 0,
          }}
          animate={{
            opacity: 1,
            height: "auto",
          }}
          exit={{
            opacity: 0,
            height: 0,
          }}
          transition={{
            duration: 0.25,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="overflow-hidden border-t border-white/10 bg-ink/95 backdrop-blur-xl md:hidden"
        >
          <div className="mx-auto max-w-6xl px-6 py-5">
            <div className="flex flex-col">
              {links.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="group flex items-center justify-between border-b border-white/10 py-4 text-base font-medium text-white/75 transition-colors duration-300 last:border-b-0 hover:text-white active:text-accent"
                >
                  <span>{link.label}</span>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-white/25 transition-colors duration-300 group-hover:text-white/40 group-active:text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <ArrowUpRight className="h-4 w-4 text-white/30 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white group-active:-translate-y-0.5 group-active:translate-x-0.5 group-active:text-accent" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}