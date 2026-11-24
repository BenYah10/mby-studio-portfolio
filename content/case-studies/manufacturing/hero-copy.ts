/**
 * Manufacturing Hero — bilingual presentation copy.
 *
 * Rôle : centraliser les textes FR/EN du Hero et du diagramme d'écosystème.
 * Les identifiants techniques et les temporisations d'animation restent dans
 * hero.tsx afin qu'un changement de langue ne modifie pas les effets visuels.
 * Le projet est explicitement conceptuel : aucun déploiement client n'est revendiqué.
 */
import type { Locale } from "@/i18n/config";

const heroCopy = {
  en: {
    eyebrow: "Business Systems Analysis",
    titleLines: ["Manufacturing", "Business Systems", "Mapping"],
    description:
      "Conceptual functional architecture mapping end-to-end business processes, system responsibilities and critical data across a project-driven manufacturing environment.",
    disclosure: "Personal conceptual case study · No client implementation represented",
    roleLabel: "Role",
    role: "Functional Analysis · Business Systems Analysis · Process Mapping",
    focusLabel: "Focus",
    focus: "Processes · Systems · Data · Controls · KPI",
    statusLabel: "Status",
    status: "Conceptual case study",
    ecosystemEyebrow: "Functional Ecosystem",
    ecosystemTitle: "Business systems working as one operating model",
    operatingModelLines: ["Operating", "Model"],
    dimensionsLabel: "Analysis dimensions",
    dimensions: ["People", "Process", "Systems", "Data", "Controls", "KPI"],
    capabilities: ["Business Analysis", "Functional Analysis", "Process Mapping", "ERP / CRM", "Data Governance"],
    nodes: {
      crm: { label: "Sales / CRM", description: "Lead, qualification, pipeline and commercial handoff" },
      project: { label: "Project Execution", description: "Planning, delivery, scope and project controls" },
      erp: { label: "ERP / P2P", description: "Procurement, inventory, finance and transactions" },
      bi: { label: "Data / BI", description: "Reporting, KPIs, forecast and decision support" },
    },
  },
  fr: {
    eyebrow: "Analyse des systèmes d’entreprise",
    titleLines: ["Cartographie", "des systèmes", "d’entreprise manufacturière"],
    description:
      "Cartographie conceptuelle de l’architecture fonctionnelle, des processus de bout en bout, des responsabilités des systèmes et des données critiques d’une entreprise manufacturière fonctionnant par projets.",
    disclosure: "Étude de cas conceptuelle personnelle · Aucune implantation chez un client n’est représentée",
    roleLabel: "Rôle",
    role: "Analyse fonctionnelle · Analyse des systèmes d’entreprise · Cartographie des processus",
    focusLabel: "Axes d’analyse",
    focus: "Processus · Systèmes · Données · Contrôles · KPI",
    statusLabel: "Statut",
    status: "Étude de cas conceptuelle",
    ecosystemEyebrow: "Écosystème fonctionnel",
    ecosystemTitle: "Des systèmes d’entreprise réunis dans un même modèle opérationnel",
    operatingModelLines: ["Modèle", "opérationnel"],
    dimensionsLabel: "Dimensions d’analyse",
    dimensions: ["Personnes", "Processus", "Systèmes", "Données", "Contrôles", "KPI"],
    capabilities: ["Analyse d’affaires", "Analyse fonctionnelle", "Cartographie des processus", "ERP / CRM", "Gouvernance des données"],
    nodes: {
      crm: { label: "Ventes / CRM", description: "Prospects, qualification, pipeline et transfert commercial" },
      project: { label: "Exécution des projets", description: "Planification, livraison, portée et contrôle des projets" },
      erp: { label: "ERP / P2P", description: "Approvisionnement, stocks, finances et transactions" },
      bi: { label: "Données / BI", description: "Rapports, KPI, prévisions et aide à la décision" },
    },
  },
} as const;

export function getManufacturingHeroCopy(locale: Locale) {
  return heroCopy[locale];
}
