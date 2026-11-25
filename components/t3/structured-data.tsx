
/**
 * MBY Consulting — Structured data
 *
 * SEO entities:
 * - Person: professional identity.
 * - WebSite: bilingual professional portfolio.
 *
 * No private contact information or corporate status.
 */

import type { Locale } from "@/i18n/config";
import { profile } from "@/content/profile";
import { siteOrigin } from "@/lib/seo";

export function StructuredData({ locale }: { locale: Locale }) {
  const personId = `${siteOrigin}/#person`;
  const websiteId = `${siteOrigin}/#website`;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: profile.name,
        url: `${siteOrigin}/${locale}/`,
        image: `${siteOrigin}/images/portrait/mohamed-ben-yahmed.webp`,
        jobTitle:
          locale === "fr"
            ? "Analyste d'affaires et fonctionnel"
            : "Business and Functional Analyst",
        sameAs: [profile.linkedin, profile.github],
        knowsLanguage: ["fr", "en"],
        knowsAbout: [
          "Business Analysis",
          "Functional Analysis",
          "Business Systems Mapping",
          "Process Mapping",
          "ERP Systems",
          "Operational Improvement",
        ],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: "MBY Consulting",
        url: `${siteOrigin}/`,
        inLanguage: ["fr-CA", "en-CA"],
        publisher: {
          "@id": personId,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
