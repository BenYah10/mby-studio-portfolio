/** MBY Studio T4.06 — bilingual privacy notice. Publication requires governance approval. */
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { routePaths } from "@/i18n/routes";

const notice = {
  fr: {
    eyebrow: "Confidentialité · Projet de politique v0.1",
    title: "Politique de confidentialité",
    intro: "Cette politique décrit comment les renseignements transmis à MBY Studio peuvent être traités dans le cadre des demandes professionnelles et des recommandations publiées avec autorisation.",
    sections: [
      ["1. Responsable", "MBY Studio est actuellement un projet professionnel indépendant de Mohamed Ben Yahmed, et non une société incorporée. Pour toute question relative à vos renseignements, utilisez la page Contact du portfolio."],
      ["2. Renseignements recueillis", "Le formulaire de contact demande le nom, l’adresse courriel, l’objet et le message; l’organisation est facultative. Des renseignements techniques nécessaires à la protection contre les abus peuvent être traités. Les recommandations professionnelles (texte, nom, fonction et lien LinkedIn) ne sont publiées qu’après autorisation."],
      ["3. Finalités", "Les renseignements servent à répondre aux demandes de contact, aux échanges professionnels et aux propositions de collaboration, ainsi qu’à vérifier et sécuriser les soumissions. Les recommandations autorisées servent exclusivement à présenter des témoignages professionnels."],
      ["4. Prestataires", "Le formulaire fait appel à Cloudflare Turnstile pour la vérification antispam, à Upstash Redis pour limiter le débit des requêtes et à Resend pour transmettre les messages par courriel. Les messages sont ensuite reçus dans une boîte de messagerie. Les fournisseurs peuvent traiter des renseignements techniques ou des communications dans leurs propres infrastructures."],
      ["5. Conservation", "Les renseignements personnels recueillis au moyen du formulaire de contact et dans le cadre des échanges professionnels sont conservés pendant une durée maximale de 24 mois suivant le dernier échange professionnel. Ils sont supprimés plus tôt lorsqu’ils ne sont plus nécessaires aux finalités pour lesquelles ils ont été recueillis, sous réserve des obligations légales applicables. Cette règle doit être appliquée aux copies conservées dans la messagerie et les autres systèmes concernés, selon une procédure de suppression documentée. Les compteurs Redis de limitation du débit expirent normalement après 15 minutes; les journaux techniques éventuels des fournisseurs peuvent suivre d’autres durées de conservation."],
      ["6. Communication hors Québec", "Certains fournisseurs ou leurs sous-traitants peuvent traiter des renseignements à l’extérieur du Québec. Une évaluation des facteurs relatifs à la vie privée et une vérification des ententes applicables devront être effectuées avant l’ouverture publique du formulaire."],
      ["7. Vos droits", "Vous pouvez demander l’accès à vos renseignements, leur rectification et, lorsque la loi le permet, leur retrait ou leur suppression. Vous pouvez également retirer une autorisation de publication de recommandation. Les demandes peuvent être transmises par la page Contact."],
      ["8. Mesures de protection", "Le formulaire utilise une validation côté serveur, un contrôle antispam et un limiteur de débit. Aucun dispositif ne garantit une sécurité absolue. Les secrets applicatifs ne doivent jamais être exposés dans le site public."],
      ["9. Modifications", "Cette politique pourra être mise à jour pour refléter les services utilisés, les durées de conservation ou les obligations légales. La version et la date d’entrée en vigueur seront indiquées lors de la publication définitive."],
    ],
    contact: "Page Contact", foot: "Version de travail — non approuvée pour publication publique."
  },
  en: {
    eyebrow: "Privacy · Draft policy v0.1",
    title: "Privacy Policy",
    intro: "This policy explains how information submitted to MBY Studio may be handled for professional inquiries and recommendations published with permission.",
    sections: [
      ["1. Person responsible", "MBY Studio is currently Mohamed Ben Yahmed’s independent professional project, not an incorporated company. For privacy inquiries, use the portfolio Contact page."],
      ["2. Information collected", "The contact form requests your name, email address, subject and message; organization is optional. Technical information needed to prevent abuse may be processed. Professional recommendations (text, name, role and LinkedIn link) are published only with permission."],
      ["3. Purposes", "Information is used to respond to inquiries and professional collaboration requests, and to validate and secure submissions. Authorized recommendations are used solely to display professional testimonials."],
      ["4. Service providers", "The form uses Cloudflare Turnstile for anti-spam verification, Upstash Redis for rate limiting, and Resend to deliver emails. Messages are subsequently received in a mailbox. Providers may process technical data or communications on their infrastructure."],
      ["5. Retention", "Personal information collected through the contact form and professional correspondence is retained for a maximum of 24 months following the last professional exchange. It is deleted earlier when no longer necessary for the purposes for which it was collected, subject to applicable legal obligations. This rule must be applied to copies held in the mailbox and other relevant systems through a documented deletion procedure. Redis rate-limit counters normally expire after 15 minutes; any technical logs kept by service providers may be subject to different retention periods."],
      ["6. Processing outside Québec", "Some providers or their subprocessors may process information outside Québec. A privacy impact assessment and review of relevant agreements must be completed before the form is opened publicly."],
      ["7. Your rights", "You may request access to and correction of your personal information and, where the law permits, its withdrawal or deletion. You may also withdraw permission to publish a recommendation. Requests may be made through the Contact page."],
      ["8. Safeguards", "The form uses server-side validation, anti-spam checks and rate limiting. No system can guarantee absolute security. Application secrets must never be included in public website code."],
      ["9. Changes", "This policy may change to reflect the providers used, retention arrangements or legal requirements. The final published version will show an effective date and version number."],
    ],
    contact: "Contact page", foot: "Working draft — not approved for public release."
  }
} as const;

export function PrivacyPage({locale}:{locale:Locale}) {
  const c=notice[locale];
  return <main id="main-content" className="t3-privacy-page"><section className="t3-page-head"><div className="t3-container"><p className="t3-eyebrow">{c.eyebrow}</p><h1>{c.title}</h1><p className="t3-intro">{c.intro}</p></div></section><section className="t3-section"><div className="t3-container" style={{maxWidth:850}}>{c.sections.map(([heading,body])=><section key={heading} style={{marginBottom:30}}><h2 style={{fontSize:"1.45rem",marginBottom:12}}>{heading}</h2><p style={{lineHeight:1.8}}>{body}</p></section>)}<p><Link href={routePaths.contact[locale]} style={{color:"#315f9c",textDecoration:"underline"}}>{c.contact}</Link></p><p style={{fontSize:12,marginTop:32,color:"#675d4a"}}>{c.foot}</p></div></section></main>;
}
