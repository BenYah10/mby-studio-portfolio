/** MBY Studio T3 — localized marketing homepage. */
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { MarketingPages } from "@/components/t3/marketing-pages";
export default async function Home({params}:{params:Promise<{locale:string}>}){const {locale}=await params;if(!isLocale(locale))notFound();return <MarketingPages locale={locale} page="home"/>;}
