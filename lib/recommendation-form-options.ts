/**
 * MBY Studio — Recommendation form choices (FR/EN)
 * R2.21-H.9 | Preview only
 *
 * Testimonial templates are writing aids, not attributed endorsements.
 * Sample narratives are editable; authors must keep only personally witnessed facts.
 */
import type { RecommendationLocale } from "./recommendation-consents";

const options = {
  fr: {
    sectorLabel: "Choisissez un secteur d’activité",
    sectorOther: "Autre (préciser)",
    sectorOtherLabel: "Précisez votre secteur d’activité",
    sectorRequired: "Indiquez une organisation ou un secteur d’activité.",
    templateLabel: "Besoin d’inspiration pour rédiger votre témoignage ? (facultatif)",
    templatePlaceholder: "Choisissez un modèle de témoignage",
    templateHint:
      "Ces textes sont des exemples de rédaction, pas des témoignages reçus ou approuvés. Conservez uniquement les affirmations qui correspondent à votre expérience réelle avec Mohamed Ben Yahmed. Modifiez ou remplacez librement le texte.",
    templateApply: "Insérer ce modèle dans mon témoignage",
    templateConfirm:
      "Votre texte actuel sera remplacé par le modèle choisi. Continuer ?",
    templateNoSelection: "Sélectionnez d’abord une trame.",
    requiredBadge: "Obligatoire",
    optionalBadge: "Facultatif",
    identityDisclosure:
      "Même avec des initiales, le profil LinkedIn public peut révéler votre nom complet.",
    consentOtherLanguage:
      "La publication d’une traduction exige une approbation séparée du texte traduit.",
    sectors: [
      ["information_technology", "Technologies de l’information"],
      ["public_administration", "Administration publique"],
      ["finance_banking", "Finance et services bancaires"],
      ["insurance", "Assurances"],
      ["manufacturing", "Industrie manufacturière"],
      ["transport_logistics", "Transport et logistique"],
      ["retail_ecommerce", "Commerce et commerce électronique"],
      ["health", "Santé et services sociaux"],
      ["education", "Éducation et enseignement supérieur"],
      ["energy_utilities", "Énergie et services publics"],
      ["telecommunications", "Télécommunications"],
      ["professional_services", "Services professionnels et conseil"],
      ["construction_real_estate", "Construction et immobilier"],
      ["nonprofit", "Organismes sans but lucratif"],
      ["hospitality_tourism", "Hôtellerie et tourisme"],
    ],
    templates: [
      {
        id: "business_analysis",
        label: "Analyse d’affaires et compréhension des besoins",
        text: "J’ai eu l’occasion de collaborer avec Mohamed Ben Yahmed dans un contexte professionnel nécessitant une bonne compréhension des besoins d’affaires et des enjeux opérationnels.\n\nMohamed se distingue par sa capacité à écouter attentivement les différents intervenants, à poser les bonnes questions et à transformer des besoins parfois complexes en éléments clairs, structurés et exploitables par les équipes techniques.\n\nSon approche méthodique lui permet de bien comprendre les processus existants, d’identifier les points nécessitant une clarification et de contribuer à la recherche de solutions adaptées aux réalités de l’organisation.\n\nJ’ai particulièrement apprécié sa rigueur, sa capacité d’analyse et sa facilité à communiquer avec des interlocuteurs ayant des profils différents. Mohamed constitue un collaborateur fiable et professionnel, capable de faire le lien entre les besoins opérationnels et les solutions informatiques.",
      },
      {
        id: "functional_analysis",
        label: "Analyse fonctionnelle et qualité des livrables",
        text: "Durant notre collaboration, j’ai pu apprécier le professionnalisme de Mohamed Ben Yahmed et son implication dans les activités d’analyse fonctionnelle et de suivi des systèmes informatiques.\n\nMohamed possède une approche structurée qui lui permet d’analyser les demandes, de comprendre les règles d’affaires et de contribuer efficacement à la résolution des problématiques rencontrées dans les applications.\n\nIl accorde une attention particulière à la qualité des livrables, à la cohérence des informations et à la validation des changements avant leur mise en production. Sa capacité à examiner les anomalies, à documenter ses observations et à assurer un suivi rigoureux facilite le travail des différentes équipes impliquées.\n\nAu-delà de ses compétences techniques et fonctionnelles, Mohamed fait preuve de sérieux, de persévérance et d’un réel engagement envers la qualité du travail accompli. Je recommande ses compétences pour des mandats nécessitant de la rigueur analytique, une bonne compréhension fonctionnelle et un excellent sens des responsabilités.",
      },
      {
        id: "systems_mapping",
        label: "Cartographie des systèmes et amélioration des processus",
        text: "J’ai eu l’opportunité de travailler avec Mohamed Ben Yahmed sur des activités nécessitant une compréhension approfondie du fonctionnement des systèmes et des processus opérationnels.\n\nMohamed possède une excellente capacité à analyser un environnement de travail dans son ensemble, à comprendre les interactions entre les différentes applications et à identifier les éléments susceptibles d’influencer la performance des opérations.\n\nIl adopte une démarche logique et structurée pour examiner les processus existants, clarifier les échanges d’information et mettre en évidence les situations pouvant faire l’objet d’améliorations.\n\nSa curiosité professionnelle, son esprit analytique et sa volonté de comprendre les causes réelles des difficultés rencontrées représentent des qualités particulièrement utiles dans les projets de transformation et d’optimisation.\n\nJe considère Mohamed comme un professionnel sérieux, capable d’apporter une contribution pertinente aux initiatives de cartographie des systèmes, d’analyse des processus et d’amélioration continue.",
      },
      {
        id: "erp_data",
        label: "ERP, gestion des données et résolution d’anomalies",
        text: "J’ai eu le plaisir de collaborer avec Mohamed Ben Yahmed dans un environnement informatique où la fiabilité des applications et la qualité des données occupaient une place importante.\n\nMohamed démontre une bonne compréhension des systèmes de gestion d’entreprise et des interactions entre les applications, les données et les processus opérationnels.\n\nSon approche analytique lui permet d’examiner les situations problématiques avec méthode, de rechercher les causes possibles des anomalies et de collaborer efficacement avec les équipes concernées afin de faciliter leur résolution.\n\nIl porte une attention particulière à la cohérence des informations, au respect des règles d’affaires et à la validation des résultats attendus.\n\nJ’ai également apprécié son autonomie, son sens de l’organisation et sa capacité à approfondir les questions techniques tout en conservant une bonne compréhension des impacts sur les utilisateurs et les opérations.\n\nMohamed représente un excellent collaborateur pour des activités d’analyse applicative, de gestion des données, de suivi des systèmes ERP et d’amélioration de la fiabilité opérationnelle.",
      },
      {
        id: "collaboration",
        label: "Collaboration, communication et professionnalisme",
        text: "J’ai eu l’occasion de travailler avec Mohamed Ben Yahmed et je garde une excellente appréciation de notre collaboration professionnelle.\n\nMohamed est une personne sérieuse, respectueuse et engagée dans son travail. Il se distingue par son sens des responsabilités, sa disponibilité et sa volonté de comprendre les besoins de ses collègues afin de contribuer efficacement aux objectifs de l’équipe.\n\nFace à des situations complexes, il fait preuve de patience, de méthode et de persévérance pour rechercher des solutions. Il sait également communiquer de manière claire, partager ses observations et collaborer avec différents intervenants dans un esprit constructif.\n\nSon autonomie et sa capacité d’adaptation lui permettent d’évoluer efficacement dans des environnements où les priorités et les besoins peuvent changer.\n\nJ’ai particulièrement apprécié son professionnalisme, sa rigueur et son attitude collaborative. Je recommande Mohamed pour ses qualités humaines et professionnelles, ainsi que pour sa capacité à contribuer positivement au fonctionnement et à l’amélioration des systèmes et des processus.",
      },
    ],
  },
  en: {
    sectorLabel: "Select an industry sector",
    sectorOther: "Other (please specify)",
    sectorOtherLabel: "Specify your industry sector",
    sectorRequired: "Provide an organization or an industry sector.",
    templateLabel: "Need inspiration for your testimonial? (optional)",
    templatePlaceholder: "Choose a testimonial example",
    templateHint:
      "These are writing examples, not testimonials received or approved. Keep only statements that reflect your actual experience with Mohamed Ben Yahmed. Freely edit or replace the entire text.",
    templateApply: "Insert this example into my testimonial",
    templateConfirm:
      "Your current text will be replaced with the selected example. Continue?",
    templateNoSelection: "Please select an outline first.",
    requiredBadge: "Required",
    optionalBadge: "Optional",
    identityDisclosure:
      "Even when initials are displayed, a public LinkedIn profile may reveal your full name.",
    consentOtherLanguage:
      "Publishing a translation requires separate approval of the translated text.",
    sectors: [
      ["information_technology", "Information technology"],
      ["public_administration", "Public administration"],
      ["finance_banking", "Finance and banking"],
      ["insurance", "Insurance"],
      ["manufacturing", "Manufacturing"],
      ["transport_logistics", "Transportation and logistics"],
      ["retail_ecommerce", "Retail and e-commerce"],
      ["health", "Healthcare and social services"],
      ["education", "Education and higher education"],
      ["energy_utilities", "Energy and utilities"],
      ["telecommunications", "Telecommunications"],
      ["professional_services", "Professional services and consulting"],
      ["construction_real_estate", "Construction and real estate"],
      ["nonprofit", "Nonprofit organizations"],
      ["hospitality_tourism", "Hospitality and tourism"],
    ],
    templates: [
      {
        id: "business_analysis",
        label: "Business analysis and understanding requirements",
        text: "I had the opportunity to work with Mohamed Ben Yahmed in a professional setting that called for a strong understanding of business needs and operational challenges.\n\nMohamed stands out for his ability to listen closely to stakeholders, ask the right questions, and turn sometimes complex requirements into clear, structured information that technical teams can work with.\n\nHis methodical approach helps him understand existing processes, identify areas that need clarification, and contribute to finding solutions suited to an organization’s practical needs.\n\nI particularly appreciated his thoroughness, analytical skills, and ability to communicate with people from different backgrounds. Mohamed is a reliable, professional colleague who can bridge operational needs and information systems.",
      },
      {
        id: "functional_analysis",
        label: "Functional analysis and quality of deliverables",
        text: "During our time working together, I came to appreciate Mohamed Ben Yahmed’s professionalism and involvement in functional analysis and information systems activities.\n\nMohamed takes a structured approach to examining requests, understanding business rules, and contributing to the resolution of application issues.\n\nHe pays particular attention to the quality of deliverables, the consistency of information, and the validation of changes before production deployment. His ability to investigate anomalies, document observations, and maintain rigorous follow-up makes collaboration across teams easier.\n\nBeyond his technical and functional skills, Mohamed shows diligence, perseverance, and a genuine commitment to quality. I would recommend his capabilities for assignments requiring analytical rigor, strong functional understanding, and a high sense of responsibility.",
      },
      {
        id: "systems_mapping",
        label: "Systems mapping and process improvement",
        text: "I had the opportunity to work with Mohamed Ben Yahmed on activities requiring a thorough understanding of systems and operational processes.\n\nMohamed demonstrates a strong ability to look at a work environment as a whole, understand how applications interact, and identify elements that may influence operational performance.\n\nHe uses a logical, structured approach to examine existing processes, clarify how information flows, and highlight areas where improvements may be possible.\n\nHis professional curiosity, analytical mindset, and desire to understand the root causes of challenges are particularly valuable in transformation and optimization initiatives.\n\nI consider Mohamed a serious, capable professional who can make a meaningful contribution to systems mapping, process analysis, and continuous improvement efforts.",
      },
      {
        id: "erp_data",
        label: "ERP, data management, and issue resolution",
        text: "I had the pleasure of collaborating with Mohamed Ben Yahmed in an IT environment where application reliability and data quality were particularly important.\n\nMohamed shows a solid understanding of enterprise management systems and the relationships among applications, data, and operational processes.\n\nHis analytical approach allows him to investigate issues methodically, look for potential root causes, and collaborate effectively with the teams involved to facilitate resolution.\n\nHe pays close attention to information consistency, business rules, and validation of expected outcomes.\n\nI also appreciated his independence, organizational skills, and ability to explore technical questions while keeping the impact on users and operations in mind.\n\nMohamed is an excellent collaborator for application analysis, data management, ERP monitoring, and initiatives aimed at improving operational reliability.",
      },
      {
        id: "collaboration",
        label: "Collaboration, communication, and professionalism",
        text: "I had the opportunity to work with Mohamed Ben Yahmed, and I have a very positive view of our professional collaboration.\n\nMohamed is diligent, respectful, and committed to his work. He stands out for his sense of responsibility, availability, and willingness to understand colleagues’ needs so he can contribute effectively to team objectives.\n\nWhen faced with complex situations, he demonstrates patience, a methodical approach, and persistence in finding solutions. He communicates clearly, shares observations, and works constructively with a range of stakeholders.\n\nHis independence and adaptability help him work effectively in environments where priorities and needs can change.\n\nI particularly appreciated his professionalism, rigor, and collaborative attitude. I recommend Mohamed for his personal and professional qualities, as well as his ability to make a positive contribution to the operation and improvement of systems and processes.",
      },
    ],
  },
} as const;

export function getRecommendationFormOptions(locale: RecommendationLocale) {
  return options[locale];
}
