/** Central public SEO metadata; no application credentials or runtime dependencies. */
import type { Metadata } from 'next';
import type { Locale } from '@/i18n/config';
import { routePaths, getCaseStudyPath } from '@/i18n/routes';
export const siteOrigin = 'https://mbyconsulting.ca';
export const indexable = process.env.VERCEL_ENV === 'production';
export const publicKeys = ['home','services','work','about','recommendations','contact','privacy'] as const;
type PublicKey = typeof publicKeys[number];
const copy: Record<PublicKey, Record<Locale, [string,string]>> = {
 home: {fr:["Analyse d'affaires et systèmes", "Portfolio professionnel : analyse fonctionnelle, cartographie des systèmes et processus, ERP et amélioration opérationnelle."],en:['Business & Systems Analysis','Professional portfolio: functional analysis, systems and process mapping, ERP and operational improvement.']},
 services:{fr:['Services','Découvrez les services en analyse d’affaires, analyse fonctionnelle et cartographie des processus et systèmes.'],en:['Services','Explore business analysis, functional analysis and process and systems mapping services.']},
 work:{fr:['Réalisations','Découvrez les études de cas et projets professionnels du portfolio.'],en:['Selected work','Explore portfolio projects and case studies.']},
 about:{fr:['À propos','Découvrez le parcours professionnel et l’approche de MBY Consulting.'],en:['About','Explore the professional background and approach behind MBY Consulting.']},
 recommendations:{fr:['Recommandations professionnelles','Consultez la section des recommandations professionnelles de MBY Consulting.'],en:['Professional recommendations','Explore the professional recommendations section of MBY Consulting.']},
 contact:{fr:['Contact','Informations de contact et disponibilité de MBY Consulting.'],en:['Contact','Contact information and availability for MBY Consulting.']},
 privacy:{fr:['Politique de confidentialité','Informations sur le traitement et la protection des renseignements personnels.'],en:['Privacy policy','Information about personal information processing and protection.']}
};

/**
 * Builds localized metadata and social sharing information
 * using the official canonical domain.
 */
export function pageMetadata(
  locale: Locale,
  paths: Record<Locale, string>,
  title: string,
  description: string
): Metadata {
  const url = siteOrigin + paths[locale];
  const fullTitle = title + " | MBY Consulting";
  const imageUrl = `${siteOrigin}/og/${locale}/`;

  const imageAlt =
    locale === "fr"
      ? "MBY Consulting — Portfolio professionnel"
      : "MBY Consulting — Professional portfolio";

  return {
    metadataBase: new URL(siteOrigin),

    title: fullTitle,
    description,

    alternates: {
      canonical: url,
      languages: {
        fr: siteOrigin + paths.fr,
        en: siteOrigin + paths.en,
        "x-default": siteOrigin + paths.fr,
      },
    },

    robots: {
      index: indexable,
      follow: indexable,
    },

    openGraph: {
      type: "website",
      siteName: "MBY Consulting",
      title: fullTitle,
      description,
      url,
      locale: locale === "fr" ? "fr_CA" : "en_CA",
      alternateLocale: [
        locale === "fr" ? "en_CA" : "fr_CA",
      ],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          type: "image/png",
          alt: imageAlt,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [
        {
          url: imageUrl,
          alt: imageAlt,
        },
      ],
    },
  };
}

export function marketingMetadata(locale:Locale,key:PublicKey):Metadata {const metadata=pageMetadata(locale,routePaths[key],...copy[key][locale]); return key==='privacy'?{...metadata,robots:{index:false,follow:indexable}}:metadata;}
export function projectMetadata(locale:Locale,slug:string,title:string):Metadata {return pageMetadata(locale,{fr:getCaseStudyPath(slug,'fr'),en:getCaseStudyPath(slug,'en')},title,locale==='fr'? 'Étude de cas : '+title+'. Découvrez le projet dans le portfolio MBY Consulting.':'Case study: '+title+'. Explore the project in the MBY Consulting portfolio.');}
