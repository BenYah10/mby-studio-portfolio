/** MBY Studio T3 — editorial shell limited to marketing pages; does not restyle existing case studies. */
import type { ReactNode } from "react";
import Link from "next/link";
import { routePaths } from "@/i18n/routes";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { SiteHeader } from "./site-header";
import { t3 } from "@/content/t3";
import "./t3.css";
export async function SiteShell({locale,children}:{locale:Locale;children:ReactNode}){
 const dictionary=await getDictionary(locale);
 return <div className="mby-t3"><a className="t3-skip" href="#main-content">{locale==="fr"?"Aller au contenu":"Skip to content"}</a><SiteHeader locale={locale} dictionary={dictionary}/>{children}<footer className="t3-footer"><div className="t3-container t3-footer-inner"><div><strong>MBY Studio</strong><p>© {new Date().getFullYear()} · {t3[locale].footer}</p></div><nav aria-label={locale === "fr" ? "Navigation du pied de page" : "Footer navigation"}><Link href={routePaths.work[locale]}>{locale === "fr" ? "Réalisations" : "Work"}</Link><Link href={routePaths.about[locale]}>{locale === "fr" ? "À propos" : "About"}</Link><Link href={routePaths.contact[locale]}>Contact</Link><Link href={routePaths.privacy[locale]}>{locale === "fr" ? "Confidentialité" : "Privacy"}</Link></nav></div></footer></div>;
}
