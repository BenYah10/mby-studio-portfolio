/** MBY Studio — UI labels for the existing dark case-study components.
 * Keep product names and technical identifiers unchanged.
 */
import type { Locale } from "./config";
import type { Project } from "@/content/projects";

export const caseStudyLabels = {
  fr: { role: "Rôle", timeline: "Période", status: "État", backToTop: "Retour en haut" },
  en: { role: "Role", timeline: "Timeline", status: "Status", backToTop: "Back to Top" },
} as const;

const categoriesFr: Record<string,string> = {
  bluekiosk: "Innovation produit",
  "bixi-operations-dashboard": "Analyse de données opérationnelles",
  tripscore: "Conception de produit numérique",
  "executive-ai-english-coach": "Apprentissage assisté par IA",
};
const statusesFr: Record<Project["status"],string> = {
  "Completed": "Terminé",
  "In development": "En développement",
  "Product concept": "Concept produit",
  "Live": "En ligne",
  "Conceptual case study": "Étude de cas conceptuelle",
};
const capabilitiesFr: Record<string,string> = {
  "Product Discovery": "Découverte produit",
  "Requirements": "Exigences",
  "System Architecture": "Architecture système",
  "Power BI": "Power BI",
  "Data Modeling": "Modélisation des données",
  "Operational KPIs": "KPI opérationnels",
  "AI Architecture": "Architecture IA",
  "Product Governance": "Gouvernance produit",
  "UX Strategy": "Stratégie UX",
  "Product Thinking": "Réflexion produit",
  "Scoring Model": "Modèle de notation",
  "Travel UX": "Expérience voyageur",
};

export function projectDisplay(project: Project, locale: Locale) {
  return {
    capabilities: locale === "fr" ? project.capabilities.map((c) => capabilitiesFr[c] ?? c) : project.capabilities,
    category: locale === "fr" ? (categoriesFr[project.slug] ?? project.category) : project.category,
    role: locale === "fr" ? project.role
      .replaceAll("Product Strategy", "Stratégie produit")
      .replaceAll("Functional Analysis", "Analyse fonctionnelle")
      .replaceAll("System Design", "Conception de systèmes")
      .replaceAll("Data Analysis", "Analyse des données") : project.role,
    status: locale === "fr" ? statusesFr[project.status] : project.status,
  };
}
