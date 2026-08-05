"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { MobileMenu } from "./navigation/mobile-menu";

type NavigationLink = {
  label: string;
  href: string;
};

/**
 * Liens principaux de navigation de la Homepage.
 *
 * Les href correspondent aux identifiants des sections
 * présentes dans app/page.tsx.
 */
const links: NavigationLink[] = [
  {
    label: "Work",
    href: "#work",
  },
  {
    label: "Experience",
    href: "#experience",
  },
  {
    label: "About",
    href: "#about",
  },
  {
    label: "Contact",
    href: "#contact",
  },
];

/**
 * Barre de navigation globale du portfolio.
 *
 * Responsabilités :
 * - conserver l’identité MBY visible ;
 * - afficher la navigation horizontale sur desktop ;
 * - afficher un menu mobile sous le breakpoint md ;
 * - proposer un accès permanent à la section Contact.
 *
 * Le panneau mobile est isolé dans navigation/mobile-menu.tsx
 * afin de préserver une séparation claire des responsabilités.
 */
export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  /**
   * Ferme le menu mobile.
   *
   * useCallback stabilise la référence de la fonction transmise
   * au composant MobileMenu et évite de recréer inutilement
   * ses écouteurs d’événements.
   */
  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  /**
   * Alterne entre l’état ouvert et fermé du menu mobile.
   */
  function toggleMobileMenu() {
    setIsMobileMenuOpen((current) => !current);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-6">
        {/* Signature principale du portfolio. */}
        <Link
          href="#top"
          onClick={closeMobileMenu}
          className="shrink-0 font-semibold tracking-tight text-white"
        >
          MBY.
        </Link>

        {/* Navigation principale visible uniquement sur desktop. */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-7 text-sm text-white/70 md:flex"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors duration-300 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions placées à droite de la Navbar. */}
        <div className="flex items-center gap-2">
          <Link
            href="#contact"
            onClick={closeMobileMenu}
            className="rounded-full border border-white/15 px-3.5 py-2 text-sm text-white transition duration-300 hover:border-white/30 hover:bg-white/5 active:scale-[0.98] sm:px-4"
          >
            Let&apos;s talk
          </Link>

          {/*
           * Bouton mobile ouvrant et fermant le panneau.
           *
           * Il disparaît automatiquement à partir du breakpoint md.
           */}
          <button
            type="button"
            aria-label={
              isMobileMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={toggleMobileMenu}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/75 transition duration-300 hover:border-white/30 hover:bg-white/5 hover:text-white active:scale-95 md:hidden"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Panneau de navigation mobile spécialisé. */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        links={links}
        onClose={closeMobileMenu}
      />
    </header>
  );
}