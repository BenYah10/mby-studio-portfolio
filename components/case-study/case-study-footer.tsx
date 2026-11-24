"use client";

import { ArrowUp } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { caseStudyLabels } from "@/i18n/case-study-ui";

/**
 * Retour fluide vers le haut de la page actuelle.
 *
 * Nous utilisons volontairement window.scrollTo()
 * plutôt qu'un lien Next.js afin d'éviter une navigation
 * vers la Homepage lorsque l'utilisateur consulte
 * une étude de cas.
 */
export default function CaseStudyFooter({ locale = "en" }: { locale?: Locale }) {
  return (
    <footer className="border-t border-white/10 pt-10">
      <div className="flex justify-center">
        <button
            type="button"
            onClick={() =>
           window.scrollTo({
           top: 0,
           behavior: "smooth",
    })
  }
  className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-white/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.03] hover:text-white"
>
  <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1" />
  {caseStudyLabels[locale].backToTop}
      </button>
      </div>
    </footer>
  );
}