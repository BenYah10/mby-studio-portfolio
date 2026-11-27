/**
 * MBY Consulting — Professional recommendation emails
 *
 * NOTIF V1.0
 * Bilingual transactional notification templates.
 * No personal information included in email content.
 */

import "server-only";

import { routePaths } from "@/i18n/routes";

import type {
  NotificationEvent,
  NotificationLocale,
} from "./recommendation-notification-config";

const SITE_ORIGIN = "https://mbyconsulting.ca";

export type NotificationEmail = {
  subject: string;
  text: string;
};

export function buildNotificationEmail(
  event: NotificationEvent,
  locale: NotificationLocale
): NotificationEmail {

  const recommendationsUrl =
    SITE_ORIGIN + routePaths.recommendations[locale];

  const privacyUrl =
    SITE_ORIGIN + routePaths.privacy[locale];

  const signature =
    locale === "fr"
      ? "Cordialement,\nMohamed Ben Yahmed\nMBY Consulting"
      : "Kind regards,\nMohamed Ben Yahmed\nMBY Consulting";

  const privacy =
    locale === "fr"
      ? `Politique de confidentialité :\n${privacyUrl}`
      : `Privacy policy:\n${privacyUrl}`;

  const templates: Record<
    NotificationEvent,
    Record<NotificationLocale, NotificationEmail>
  > = {

    // 1. Submission received

    submission_received: {
      fr: {
        subject:
          "MBY Consulting — Votre recommandation a bien été reçue",
        text: [
          "Bonjour,",
          "Je vous remercie d'avoir pris le temps de soumettre votre recommandation professionnelle.",
          "Votre témoignage a bien été reçu et sera examiné avant toute publication.",
          "Vous recevrez un courriel de confirmation si votre recommandation est publiée sur mon site.",
          "Merci pour votre contribution et votre confiance.",
        ].join("\n\n"),
      },
      en: {
        subject:
          "MBY Consulting — Your recommendation has been received",
        text: [
          "Hello,",
          "Thank you for taking the time to submit your professional recommendation.",
          "Your recommendation has been received and will be reviewed before publication.",
          "You will receive a confirmation email if your recommendation is published on my website.",
          "Thank you for your contribution and trust.",
        ].join("\n\n"),
      },
    },

    // 2. Recommendation published

    recommendation_published: {
      fr: {
        subject:
          "MBY Consulting — Votre recommandation est maintenant publiée",
        text: [
          "Bonjour,",
          "À la suite de sa vérification, votre recommandation professionnelle a été approuvée et publiée sur mon site, conformément aux autorisations que vous avez accordées.",
          `Vous pouvez la consulter à l'adresse suivante :\n${recommendationsUrl}`,
          "Je vous remercie pour votre contribution et votre confiance.",
        ].join("\n\n"),
      },
      en: {
        subject:
          "MBY Consulting — Your recommendation is now published",
        text: [
          "Hello,",
          "Following its review, your professional recommendation has been approved and published on my website, in accordance with the permissions you provided.",
          `You can view it at the following address:\n${recommendationsUrl}`,
          "Thank you for your contribution and trust.",
        ].join("\n\n"),
      },
    },

    // 3. Recommendation withdrawn

    recommendation_withdrawn: {
      fr: {
        subject:
          "MBY Consulting — Votre recommandation a été retirée",
        text: [
          "Bonjour,",
          "Je vous confirme que votre recommandation professionnelle a été retirée de mon site.",
          "Les renseignements associés seront conservés et supprimés conformément à notre politique de confidentialité.",
          "Je vous remercie pour votre contribution et votre confiance.",
        ].join("\n\n"),
      },
      en: {
        subject:
          "MBY Consulting — Your recommendation has been withdrawn",
        text: [
          "Hello,",
          "I confirm that your professional recommendation has been removed from my website.",
          "The associated information will be retained and deleted in accordance with our privacy policy.",
          "Thank you for your contribution and trust.",
        ].join("\n\n"),
      },
    },
  };

  const template = templates[event][locale];

  return {
    subject: template.subject,
    text: [
      template.text,
      signature,
      privacy,
    ].join("\n\n"),
  };
}