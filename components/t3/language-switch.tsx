"use client";
/** MBY Studio T3 — accessible language switch retaining equivalent marketing/case study routes. */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { routePaths, getCaseStudyPath } from "@/i18n/routes";
import type { Locale } from "@/i18n/config";

export function LanguageSwitch({locale}:{locale:Locale}) {
  const pathname=usePathname();
  const other:Locale=locale==="fr"?"en":"fr";
  const normalized=pathname.endsWith("/")?pathname:pathname+"/";
  let target:string=routePaths.home[other];
  for(const paths of Object.values(routePaths)) {
    if(paths[locale]===normalized){target=paths[other];break;}
  }
  const study=normalized.match(/^\/(?:fr|en)\/projects\/([^/]+)\/$/);
  if(study) target=getCaseStudyPath(decodeURIComponent(study[1]),other);
  return <Link className="t3-language" href={target} hrefLang={other} aria-label={locale==="fr"?"Switch to English":"Passer en français"}>{other.toUpperCase()}<span aria-hidden="true"> ↗</span></Link>;
}
