/**
 * Manufacturing — Business Challenge bilingual presentation copy.
 * The functional diagram structure and its animation sequence are locale-independent.
 */
import type { Locale } from "@/i18n/config";

export const businessChallengeCopy = {
  en: {
    eyebrow: "Business Challenge",
    sideNote: "A multi-system environment can be technically connected while remaining functionally fragmented.",
    title: "Multiple systems do not automatically create an integrated business ecosystem.",
    introduction: "The challenge is not connecting applications. It is connecting business processes, responsibilities and reliable data across those applications.",
    challengeLabel: "Challenge",
    challenges: [
      { title: "Fragmented Processes", description: "Business processes often cross multiple teams and systems, creating handoffs where context, responsibilities or information can be lost." },
      { title: "Ownership & Controls", description: "Approvals, responsibilities, business rules and decision gates must remain clear across the end-to-end lifecycle." },
      { title: "Data Reliability", description: "Critical data must remain consistent, owned and trustworthy so operational and management decisions are based on reliable information." },
    ],
    systemCentric: "System-centric view",
    systemTitle: "Applications & integrations",
    systemDescription: "A technology map explains which platforms exist and how they may exchange information.",
    projectManagement: "Project Mgmt",
    businessCentric: "Business-centric view",
    businessTitle: "How the business actually operates",
    businessDescription: "Functional analysis connects the business process to ownership, systems, critical data, controls and the measures used to support decisions.",
    flow: ["Process", "Ownership", "System", "Data", "Control", "KPI"],
  },
  fr: {
    eyebrow: "Défi métier",
    sideNote: "Un environnement multisystème peut être connecté techniquement tout en restant fragmenté sur le plan fonctionnel.",
    title: "La présence de plusieurs systèmes ne crée pas automatiquement un écosystème d’entreprise intégré.",
    introduction: "Le défi ne consiste pas seulement à connecter les applications, mais à relier les processus métier, les responsabilités et les données fiables qu’elles mobilisent.",
    challengeLabel: "Défi",
    challenges: [
      { title: "Processus fragmentés", description: "Les processus traversent souvent plusieurs équipes et systèmes. Les passages de relais peuvent entraîner des pertes de contexte, de responsabilités ou d’information." },
      { title: "Responsabilités et contrôles", description: "Les approbations, les responsabilités, les règles d’affaires et les points de décision doivent rester clairs tout au long du cycle métier." },
      { title: "Fiabilité des données", description: "Les données critiques doivent être cohérentes, attribuées à des responsables et fiables pour soutenir les décisions opérationnelles et de gestion." },
    ],
    systemCentric: "Vision centrée sur les systèmes",
    systemTitle: "Applications et intégrations",
    systemDescription: "Une cartographie technologique présente les plateformes et la façon dont elles peuvent échanger des informations.",
    projectManagement: "Gestion de projets",
    businessCentric: "Vision centrée sur le métier",
    businessTitle: "Comment l’entreprise fonctionne réellement",
    businessDescription: "L’analyse fonctionnelle relie les processus métier aux responsabilités, aux systèmes, aux données critiques, aux contrôles et aux indicateurs qui éclairent les décisions.",
    flow: ["Processus", "Responsabilités", "Système", "Données", "Contrôle", "KPI"],
  },
} as const;

export function getBusinessChallengeCopy(locale: Locale) {
  return businessChallengeCopy[locale];
}
