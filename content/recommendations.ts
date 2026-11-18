/**
 * MBY Studio — approved professional recommendations only.
 *
 * Add an entry only after checking the author's identity, collecting their
 * publication permission (text, name, role and LinkedIn link), and retaining
 * evidence of that permission privately outside the public repository.
 * Never copy confidential employer, client or ministry information here.
 *
 * The site intentionally ships without fabricated testimonials.
 */
export type RecommendationLocale = "fr" | "en";

export type ApprovedRecommendation = {
  id: string;
  name: string;
  role: string;
  relationship: { fr: string; en: string };
  linkedinUrl: string;
  quote: string;
  originalLanguage: RecommendationLocale;
  /** Optional author-approved translations, never automatic or invented. */
  approvedTranslations?: Partial<Record<RecommendationLocale, string>>;
  /** Publish only once explicit permission has been recorded outside the repo. */
  publicationApproved: true;
};

// No colleagues, quotes, titles, links or permissions are invented.
export const approvedRecommendations: ApprovedRecommendation[] = [];
