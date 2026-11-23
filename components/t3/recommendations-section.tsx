/**
 * MBY Studio T4.03 — public recommendations, shown only after consent.
 * FR/EN text is localised; authentic quotations retain their original language
 * unless an author-approved translation has been supplied.
 */
import type { Locale } from "@/i18n/config";
import Link from "next/link";
import { routePaths } from "@/i18n/routes";
import {
  approvedRecommendations,
  type ApprovedRecommendation,
} from "@/content/recommendations";

const copy = {
  fr: {
    emptyTitle: "Des recommandations authentiques, bientôt.",
    emptyLead: "Cet espace présentera des témoignages personnels de personnes avec lesquelles j’ai collaboré, uniquement après leur accord de publication.",
    emptyNote: "Aucun témoignage n’est publié pour le moment.",
    readProfile: "Consulter le profil LinkedIn",
    original: "Témoignage dans sa langue originale",
    translated: "Traduction approuvée par l’auteur · original disponible",
    originalLabel: "Texte original",
    quoteHeading: "Recommandation professionnelle",
  },
  en: {
    emptyTitle: "Authentic recommendations, coming soon.",
    emptyLead: "This space will feature personal testimonials from people I have worked with, published only with their permission.",
    emptyNote: "No testimonials are published yet.",
    readProfile: "View LinkedIn profile",
    original: "Testimonial in its original language",
    translated: "Author-approved translation · original available",
    originalLabel: "Original wording",
    quoteHeading: "Professional recommendation",
  },
} as const;

function trustedLinkedInUrl(url?: string): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") return null;
    if (!["linkedin.com", "www.linkedin.com"].includes(parsed.hostname.toLowerCase())) return null;
    if (!parsed.pathname.startsWith("/in/") || parsed.pathname.length < 5) return null;
    return parsed.href;
  } catch {
    return null;
  }
}

function RecommendationCard({ item, locale }: { item: ApprovedRecommendation; locale: Locale }) {
  const c = copy[locale];
  const translated = item.approvedTranslations?.[locale];
  const hasApprovedTranslation = item.originalLanguage !== locale && Boolean(translated);
  const text = hasApprovedTranslation ? translated! : item.quote;
  const linkedIn = trustedLinkedInUrl(item.linkedinUrl);

  return (
    <article className="t3-recommendation-card" aria-label={`${c.quoteHeading} — ${item.name}`}>
      <div className="t3-recommendation-top">
        <span className="t3-recommendation-mark" aria-hidden="true">“</span>
        <div>
          <h2 className="t3-recommendation-name">{item.name}</h2>
          <p className="t3-recommendation-role">{item.role}</p>
          <p className="t3-recommendation-relation">{item.relationship[locale]}</p>
        </div>
      </div>
      <blockquote className="t3-recommendation-quote" lang={hasApprovedTranslation ? locale : item.originalLanguage}>
        {text}
      </blockquote>
      <p className="t3-recommendation-meta">{hasApprovedTranslation ? c.translated : c.original}</p>
      {hasApprovedTranslation && (
        <details className="t3-recommendation-original">
          <summary>{c.originalLabel}</summary>
          <p lang={item.originalLanguage}>{item.quote}</p>
        </details>
      )}
      {linkedIn && (
        <a className="t3-recommendation-link" href={linkedIn} target="_blank" rel="noopener noreferrer">
          {c.readProfile}<span aria-hidden="true"> ↗</span>
        </a>
      )}
    </article>
  );
}

export function RecommendationsSection({ locale }: { locale: Locale }) {
  const c = copy[locale];
  // A public LinkedIn URL with explicit approval is mandatory.
  const published = approvedRecommendations.filter(
    item => item.publicationApproved === true && trustedLinkedInUrl(item.linkedinUrl) !== null
  );
  const canSubmit = process.env.NODE_ENV === "development" ||
    process.env.NEXT_PUBLIC_MBY_RECOMMENDATIONS_ENABLED === "true";
  const submissionLink = canSubmit ? (
    <p style={{ marginTop: 24 }}>
      <Link className="t3-button" href={routePaths.recommendationSubmit[locale]}>
        {locale === "fr" ? "Soumettre une recommandation" : "Submit a recommendation"}
      </Link>
    </p>
  ) : null;

  if (!published.length) {
    return (
      <section className="t3-recommendations-empty" aria-label={locale === "fr" ? "Recommandations à venir" : "Upcoming recommendations"}>
        <div className="t3-recommendations-symbol" aria-hidden="true">“</div>
        <div>
          <h2>{c.emptyTitle}</h2>
          <p>{c.emptyLead}</p>
          <p className="t3-recommendations-footnote">{c.emptyNote}</p>
          {submissionLink}
        </div>
      </section>
    );
  }

  return <>
    {submissionLink}
    <div className="t3-recommendations-grid">
      {published.map(item => <RecommendationCard key={item.id} item={item} locale={locale} />)}
    </div>
  </>;
}
