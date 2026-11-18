"use client";
/** MBY Studio T3 — responsive shared navigation. */
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { routePaths, type RouteKey } from "@/i18n/routes";
import { LanguageSwitch } from "./language-switch";
const links = ["home", "services", "work", "about", "recommendations", "contact"] as const satisfies readonly RouteKey[];
export function SiteHeader({locale,dictionary}:{locale:Locale;dictionary:Dictionary}){
  const [open,setOpen]=useState(false);const pathname=usePathname();
  return <header className="t3-header"><div className="t3-container t3-header-inner">
    <Link href={routePaths.home[locale]} className="t3-brand" aria-label="MBY Studio — Home">MBY<span>Studio</span></Link>
    <nav className="t3-desktop-nav" aria-label={dictionary.accessibility.primaryNavigation}>
      {links.map(key=><Link key={key} href={routePaths[key][locale]} aria-current={pathname.replace(/\/$/,"")===routePaths[key][locale].replace(/\/$/,"")?"page":undefined}>{dictionary.navigation[key]}</Link>)}
    </nav>
    <div className="t3-header-tools"><LanguageSwitch locale={locale}/><button type="button" className="t3-menu-button" aria-expanded={open} aria-controls="t3-mobile-nav" aria-label={open?dictionary.accessibility.closeMenu:dictionary.accessibility.openMenu} onClick={()=>setOpen(!open)}>{open?"✕":"☰"}</button></div>
  </div>{open&&<nav id="t3-mobile-nav" className="t3-mobile-nav" aria-label={dictionary.accessibility.mobileNavigation}>{links.map(key=><Link key={key} href={routePaths[key][locale]} onClick={()=>setOpen(false)}>{dictionary.navigation[key]}</Link>)}</nav>}</header>;
}
