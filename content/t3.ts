/** MBY Studio — T3 editorial content. No invented testimonials or client outcomes. */
import type { Locale } from "@/i18n/config";

export const t3 = {
  fr: {
    tagline: "Analyse d’affaires · Analyse fonctionnelle · Systèmes ERP",
    introduction: "Je relie les besoins d’affaires, les processus et les systèmes pour rendre les opérations plus claires et les solutions plus utiles.",
    location: "Basé à Montréal · Mandats et collaborations",
    seeWork: "Explorer les réalisations", talk: "Parlons de votre besoin",
    heroEyebrow: "Portfolio professionnel · MBY Studio",
    imagePending: "Portrait professionnel à intégrer",
    pages: {
      services: { eyebrow: "Services", title: "Donner de la clarté aux processus et aux systèmes.", lead: "Une démarche structurée pour comprendre les opérations, formaliser les besoins et préparer des améliorations réalisables." },
      work: { eyebrow: "Réalisations", title: "Des analyses, des modèles et des produits exploratoires.", lead: "Un aperçu de projets personnels, de démonstrations et d’études conceptuelles. Chaque étude précise sa nature et son niveau de réalisation." },
      about: { eyebrow: "À propos", title: "Une pratique à la croisée des opérations et des systèmes.", lead: "Mon parcours commence en analyse TI orientée gestion de la chaîne d’approvisionnement, puis évolue vers l’analyse fonctionnelle, les systèmes et la cartographie des processus." },
      recommendations: { eyebrow: "Recommandations", title: "La confiance se démontre, elle ne s’invente pas.", lead: "Cet espace accueillera des recommandations professionnelles vérifiées, publiées avec leur source et les autorisations nécessaires." },
      contact: { eyebrow: "Contact", title: "Échangeons sur vos enjeux métier et systèmes.", lead: "Décrivez brièvement votre contexte, vos objectifs ou votre besoin d’analyse. Un premier échange permettra de préciser le périmètre." },
    },
    capabilities: [
      {title:"Analyse d’affaires et fonctionnelle",description:"Clarification des besoins, ateliers, règles d’affaires, exigences et scénarios de validation."},
      {title:"Cartographie des processus et systèmes",description:"Parcours opérationnels, interactions applicatives, flux de données et points de contrôle."},
      {title:"Analyse applicative ERP",description:"Compréhension des processus, anomalies, échanges de données et impacts fonctionnels."},
      {title:"Amélioration opérationnelle",description:"Identification des irritants, priorisation et recommandations pragmatiques."},
    ],
    story: ["IT Analyst — Supply Chain Management", "Functional & Business Systems Analysis", "Systems Mapping & Process Improvement", "MBY Studio — Independent Consulting (en développement)"],
    disclaimer: "Étude conceptuelle personnelle — aucune implantation chez un client n’est revendiquée.",
    pending: "Aucune recommandation n’est affichée avant vérification de son authenticité et de son autorisation de publication.",
    contactNote: "Aucun formulaire n’est activé dans ce lot. Les coordonnées et le traitement des données seront validés avant publication.",
    caseStudy: "Consulter l’étude de cas", footer: "Portfolio professionnel indépendant · MBY Studio en développement",
  },
  en: {
    tagline: "Business Analysis · Functional Analysis · ERP Systems",
    introduction: "I connect business needs, processes and systems to make operations clearer and solutions more effective.",
    location: "Montréal-based · Projects and collaborations", seeWork: "Explore selected work", talk: "Let's discuss your needs",
    heroEyebrow: "Professional portfolio · MBY Studio", imagePending: "Professional portrait to be added",
    pages: {
      services: { eyebrow: "Services", title: "Bringing clarity to processes and systems.", lead: "A structured approach to understanding operations, defining requirements and preparing actionable improvements." },
      work: { eyebrow: "Work", title: "Analysis, models and exploratory products.", lead: "A selection of independent projects, demonstrations and conceptual studies. Each case study describes its scope and status." },
      about: { eyebrow: "About", title: "Working at the intersection of operations and systems.", lead: "My journey began in IT analysis for supply chain management and evolved into functional analysis, business systems and process mapping." },
      recommendations: { eyebrow: "Recommendations", title: "Trust is earned, not fabricated.", lead: "Verified professional recommendations will appear here, with their source and appropriate permission to publish." },
      contact: { eyebrow: "Contact", title: "Let's talk about your business and systems challenges.", lead: "Share your context, objectives or analysis needs. An initial conversation can help define a practical scope." },
    },
    capabilities: [
      {title:"Business and functional analysis",description:"Needs assessment, workshops, business rules, requirements and validation scenarios."},
      {title:"Process and systems mapping",description:"Operational journeys, application interactions, data flows and control points."},
      {title:"ERP application analysis",description:"Business workflows, incident analysis, data exchanges and functional impacts."},
      {title:"Operational improvement",description:"Identifying friction points, prioritizing opportunities and pragmatic recommendations."},
    ],
    story: ["IT Analyst — Supply Chain Management", "Functional & Business Systems Analysis", "Systems Mapping & Process Improvement", "MBY Studio — Independent Consulting (in development)"],
    disclaimer: "Independent conceptual case study — no client implementation is claimed.",
    pending: "Recommendations will only be displayed after authenticity and publication permissions are verified.",
    contactNote: "No form is enabled in this batch. Contact details and data handling will be validated before publication.",
    caseStudy: "View case study", footer: "Independent professional portfolio · MBY Studio in development",
  },
} satisfies Record<Locale, {
  tagline:string;introduction:string;location:string;seeWork:string;talk:string;heroEyebrow:string;imagePending:string;
  pages:Record<"services"|"work"|"about"|"recommendations"|"contact",{eyebrow:string;title:string;lead:string}>;
  capabilities:{title:string;description:string}[];story:string[];disclaimer:string;pending:string;contactNote:string;caseStudy:string;footer:string;
}>;
