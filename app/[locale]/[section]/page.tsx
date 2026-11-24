/** MBY Studio T3 — localized equivalent routes for all five interior pages. */
import { notFound } from "next/navigation";
import { isLocale,locales } from "@/i18n/config";
import { routePaths, type RouteKey } from "@/i18n/routes";
import { MarketingPages, type MarketingPage } from "@/components/t3/marketing-pages";
import { PrivacyPage } from "@/components/t3/privacy-page";
import { SiteShell } from "@/components/t3/site-shell";
const sections:MarketingPage[]=["services","work","about","recommendations","contact"];
export function generateStaticParams(){return locales.flatMap(locale=>[...sections,"privacy" as const].map(key=>({locale,section:routePaths[key][locale].split("/")[2]})));}
export default async function Page({params}:{params:Promise<{locale:string;section:string}>}){
 const {locale,section}=await params;if(!isLocale(locale))notFound();
 if (routePaths.privacy[locale]===`/${locale}/${section}/`) return <SiteShell locale={locale}><PrivacyPage locale={locale}/></SiteShell>;
 const page=sections.find(key=>routePaths[key][locale]===`/${locale}/${section}/`);
 if(!page)notFound();return <MarketingPages locale={locale} page={page}/>;
}
