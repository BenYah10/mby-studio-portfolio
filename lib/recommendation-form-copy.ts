
/**
 * MBY Studio — Recommendation form interface copy
 * R2.21-H.5 | FR/EN draft
 *
 * Interface labels only.
 * Legal consent notices remain in recommendation-consents.ts.
 * No recommendation collection is enabled by this file.
 */

import type { RecommendationLocale } from "./recommendation-consents";

const copy = {
  fr: {
    title: "Soumettre une recommandation professionnelle",
    introduction:
      "Partagez votre expérience professionnelle avec MBY Consulting. Votre recommandation sera examinée avant toute publication.",
    sections: {
      identity: "Votre identité",
      professional: "Votre parcours professionnel",
      recommendation: "Votre recommandation",
      permissions: "Vos autorisations",
    },
    fields: {
      fullName: "Nom complet",
      email: "Courriel personnel",
      linkedin: "Lien vers votre profil LinkedIn",
      role: "Fonction professionnelle",
      organization: "Organisation",
      sector: "Secteur d’activité",
      relationship: "Notre relation professionnelle",
      quote: "Votre témoignage",
      publicIdentity: "Identité à afficher publiquement",
    },
    identityOptions: {
      fullName: "Mon nom complet",
      initials: "Mes initiales",
    },
    hints: {
      privateIdentity:
        "Votre nom complet et votre courriel sont utilisés pour la vérification. Votre courriel ne sera pas publié.",
      organizationOrSector:
        "Indiquez votre organisation, votre secteur d’activité ou les deux.",
      linkedin:
        "Le lien vers votre profil LinkedIn est obligatoire et sa publication nécessite votre autorisation explicite.",
      quote:
        "Décrivez librement votre expérience professionnelle réelle.",

      permissions:
         "Les autorisations obligatoires doivent être accordées pour soumettre une recommandation destinée à être publiée.",
      rolePublication:
         "L’autorisation de publication de votre fonction professionnelle est obligatoire pour soumettre votre recommandation. Elle ne concerne pas le nom de votre employeur, de votre client ou de votre organisation.",

    },
    required: "Obligatoire",
    optional: "Facultatif",
    submit: "Soumettre ma recommandation",
    unavailable:
      "La collecte des recommandations n’est pas encore activée.",
    pending:
      "Toute recommandation reçue devra être vérifiée avant publication.",
  },
  en: {
    title: "Submit a professional recommendation",
    introduction:
      "Share your professional experience with MBY Consulting. Your recommendation will be reviewed before any publication.",
    sections: {
      identity: "Your identity",
      professional: "Your professional background",
      recommendation: "Your recommendation",
      permissions: "Your permissions",
    },
    fields: {
      fullName: "Full name",
      email: "Personal email address",
      linkedin: "LinkedIn profile URL",
      role: "Professional role",
      organization: "Organization",
      sector: "Industry sector",
      relationship: "Our professional relationship",
      quote: "Your testimonial",
      publicIdentity: "Identity to display publicly",
    },
    identityOptions: {
      fullName: "My full name",
      initials: "My initials",
    },
    hints: {
      privateIdentity:
        "Your full name and email are used for verification. Your email will not be published.",
      organizationOrSector:
        "Provide your organization, industry sector, or both.",
      linkedin:
        "A LinkedIn profile URL is required, and its publication requires your explicit authorization.",
      quote:
        "Describe your genuine professional experience in your own words.",
       permissions:
        "Required permissions must be granted to submit a recommendation intended for publication.",
       rolePublication:
        "Permission to publish your professional role is required to submit your recommendation. It does not authorize publication of the name of your employer, client or organization.",

    },
    required: "Required",
    optional: "Optional",
    submit: "Submit my recommendation",
    unavailable:
      "Recommendation collection is not enabled yet.",
    pending:
      "Every submitted recommendation must be reviewed before publication.",
  },
} as const;

export function getRecommendationFormCopy(
  locale: RecommendationLocale
) {
  return copy[locale];
}
