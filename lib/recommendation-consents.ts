/**
 * MBY Studio — Recommendation consent catalog
 *
 * R2.20-E | Draft for Supabase Test only.
 *
 * Ten consent categories matching the PostgreSQL function.
 * Texts must be reviewed and approved before production.
 *
 * Never trust consent notice/version values supplied by clients.
 */

export type RecommendationLocale = "fr" | "en";

export const RECOMMENDATION_CONSENT_VERSION =
  "R10.7-CANDIDATE-02";

export const RECOMMENDATION_CONSENT_TYPES = [
  "authenticity",
  "private_processing",
  "publish_quote",
  "publish_identity",
  "publish_role",
  "publish_organization",
  "publish_industry_sector",
  "publish_relationship_fr",
  "publish_relationship_en",
  "publish_linkedin",
] as const;

export type RecommendationConsentType =
  (typeof RECOMMENDATION_CONSENT_TYPES)[number];

export type RecommendationConsentDefinition = {
  label: string;
  notice: string;
  required: boolean;
};

export const RECOMMENDATION_CONSENTS: Record<
  RecommendationLocale,
  Record<RecommendationConsentType, RecommendationConsentDefinition>
> = {
  fr: {
    authenticity: {
      label: "Authenticité",
      notice:
        "Je confirme que ce témoignage est authentique, repose sur une expérience professionnelle réelle et reflète mon propre avis.",
      required: true,
    },
    private_processing: {
      label: "Traitement privé",
      notice:
        "J'autorise MBY Consulting à traiter les renseignements transmis afin de recevoir, vérifier et évaluer ma recommandation. Cette autorisation ne permet aucune publication automatique.",
      required: true,
    },
    publish_quote: {
      label: "Publication du témoignage",
      notice:
        "J'autorise la publication du texte exact de ma recommandation, dans sa version approuvée, après vérification humaine.",
      required: true,
    },
    publish_identity: {
      label: "Publication de mon identité",
      notice:
        "J'autorise la publication uniquement de la forme de mon identité que j'ai explicitement approuvée.",
      required: true,
    },
    publish_role: {
      label: "Publication de ma fonction",
      notice:
        "J'autorise la publication de l'intitulé professionnel exact que j'ai approuvé.",
      required: false,
    },
    publish_organization: {
      label: "Publication de mon organisation",
      notice:
        "J'autorise la publication du nom ou de la description de mon organisation dans la forme exacte que j'ai approuvée.",
      required: false,
    },
    publish_industry_sector: {
      label: "Publication de mon secteur d’activité",
      notice: "J’autorise la publication du secteur d’activité exact que j’ai explicitement approuvé.",
      required: false,
    },
    publish_relationship_fr: {
      label: "Relation professionnelle en français",
      notice:
        "J'autorise la publication de la description en français de notre relation professionnelle, dans la version que j'ai approuvée.",
      required: false,
    },
    publish_relationship_en: {
      label: "Relation professionnelle en anglais",
      notice:
        "J'autorise la publication de la description en anglais de notre relation professionnelle, dans la version que j'ai approuvée.",
      required: false,
    },
    publish_linkedin: {
      label: "Publication de mon profil LinkedIn",
      notice:
        "J'autorise la publication du lien exact vers mon profil LinkedIn, uniquement si je l'ai fourni et approuvé.",
      required: true,
    },
  },
  en: {
    authenticity: {
      label: "Authenticity",
      notice:
        "I confirm that this testimonial is authentic, based on genuine professional experience, and reflects my own opinion.",
      required: true,
    },
    private_processing: {
      label: "Private processing",
      notice:
        "I authorize MBY Consulting to process the information submitted to receive, verify, and review my recommendation. This authorization does not permit automatic publication.",
      required: true,
    },
    publish_quote: {
      label: "Publish testimonial",
      notice:
        "I authorize publication of the exact text of my recommendation, in its approved version, following human review.",
      required: true,
    },
    publish_identity: {
      label: "Publish my identity",
      notice:
        "I authorize publication only of the form of my identity that I have explicitly approved.",
      required: true,
    },
    publish_role: {
      label: "Publish my professional role",
      notice:
        "I authorize publication of the exact professional title that I have approved.",
      required: false,
    },
    publish_organization: {
      label: "Publish my organization",
      notice:
        "I authorize publication of my organization's name or description in the exact form that I have approved.",
      required: false,
    },
    publish_industry_sector: {
      label: "Publish my industry sector",
      notice: "I authorize publication of the exact industry sector I have explicitly approved.",
      required: false,
    },
    publish_relationship_fr: {
      label: "Professional relationship in French",
      notice:
        "I authorize publication of the French description of our professional relationship in the version that I have approved.",
      required: false,
    },
    publish_relationship_en: {
      label: "Professional relationship in English",
      notice:
        "I authorize publication of the English description of our professional relationship in the version that I have approved.",
      required: false,
    },
    publish_linkedin: {
      label: "Publish my LinkedIn profile",
      notice:
        "I authorize publication of the exact link to my LinkedIn profile, only if I have provided and approved it.",
      required: true,
    },
  },
};
