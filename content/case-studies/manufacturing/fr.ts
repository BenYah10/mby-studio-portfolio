export const manufacturingContentFr = {
  methodology: {
    eyebrow: "02 — MON APPROCHE",

    title: "Comprendre le métier avant de concevoir la solution.",

    intro:
      "J’aborde un écosystème d’entreprise complexe en commençant par comprendre comment le travail est réellement exécuté à travers les personnes, les processus, les systèmes et les données. Ce n’est qu’après avoir clarifié les responsabilités, les règles, les contrôles et les points de friction que je passe à la conception de l’état cible et aux opportunités d’automatisation.",

    approachSteps: [
      {
        title: "Comprendre",
        description:
          "Comprendre les objectifs, acteurs, contraintes et décisions.",
      },
      {
        title: "Cartographier",
        description:
          "Visualiser le processus de bout en bout et les principaux handoffs.",
      },
      {
        title: "Clarifier les règles",
        description:
          "Identifier les approbations, exceptions, règles d’affaires et gates de décision.",
      },
      {
        title: "Identifier les données",
        description:
          "Déterminer les informations critiques requises à chaque étape.",
      },
      {
        title: "Définir les responsabilités",
        description:
          "Clarifier qui crée, possède, valide et consomme l’information.",
      },
      {
        title: "Mesurer",
        description:
          "Définir les KPI et les éléments de preuve nécessaires pour évaluer la performance.",
      },
      {
        title: "Améliorer",
        description:
          "Traiter les causes racines et repenser les zones faibles du processus.",
      },
      {
        title: "Automatiser",
        description:
          "Automatiser seulement lorsque le processus, les règles et les données sont suffisamment clairs.",
      },
    ],
    
    approachLabel: "Démarche d’analyse",

phases: [
  {
    title: "Comprendre",
    description:
      "Établir l’état actuel, les points de friction et leurs causes racines.",
  },
  {
    title: "Concevoir",
    description:
      "Transformer les règles d’affaires et les exigences en un état cible.",
  },
  {
    title: "Valider",
    description:
      "Mesurer les résultats à l’aide de KPI et valider le changement visé.",
  },
],

    transformationLabel: "Parcours d’amélioration",

    transformationSteps: [
      "AS-IS",
      "Points de friction",
      "Causes racines",
      "Règles d’affaires",
      "Exigences",
      "TO-BE",
      "Automatisation",
      "KPI",
      "Validation",
    ],
  },

  endToEnd: {
  eyebrow: "03 — ARCHITECTURE DU PROCESSUS DE BOUT EN BOUT",

  title:
    "Cartographier le cycle de vie métier, de l’opportunité à la performance.",

  intro:
    "La cartographie des processus d’entreprise relie les principales phases métier, les points de décision, les passages entre systèmes et les données critiques d’un environnement manufacturier orienté projets. L’objectif n’est pas de documenter chaque tâche, mais de rendre visible le fonctionnement global, depuis la qualification initiale jusqu’à l’exécution, au contrôle financier et au pilotage de la performance.",

  groups: [
    {
      label: "Commercial",
      phases: [
        {
          id: "P01",
          title: "Prospect et qualification",
        },
        {
          id: "P02",
          title: "Opportunité et pipeline CRM",
        },
        {
          id: "P03",
          title: "Décision de soumission et Go / No-Go",
        },
        {
          id: "P04",
          title: "Estimation et proposition",
        },
      ],
    },
    {
      label: "Mise en place du projet",
      phases: [
        {
          id: "P05",
          title: "Contrat obtenu / Transfert vers le projet",
        },
        {
          id: "P06",
          title: "Planification, conception et référence de projet",
        },
      ],
    },
    {
      label: "Exécution",
      phases: [
        {
          id: "P07",
          title: "Approvisionnement / P2P",
        },
        {
          id: "P08",
          title: "Production / Logistique / Exécution",
        },
        {
          id: "P09",
          title: "Facturation et contrôle financier",
        },
        {
          id: "P10",
          title: "Clôture de projet / Service / Garantie",
        },
      ],
    },
    {
      label: "Performance",
      phases: [
        {
          id: "P11",
          title: "Carnet de commandes / Réels / EAC / ETC",
        },
        {
          id: "P12",
          title: "Performance / Prévisions / Capacité",
        },
      ],
    },
  ],

  insights: [
    {
      title: "Flux métier",
      description:
        "Montre comment la valeur progresse de la qualification commerciale jusqu’à l’exécution, au contrôle financier et au pilotage de la performance.",
    },
    {
      title: "Points de décision",
      description:
        "Met en évidence les validations, approbations et décisions métier nécessaires avant de poursuivre le processus.",
    },
    {
      title: "Passages entre systèmes",
      description:
        "Rend visibles les transferts de responsabilités et d’information entre CRM, ERP, gestion de projet, Field Service et BI.",
    },
    {
      title: "Données critiques",
      description:
        "Identifie les informations qui doivent rester fiables et traçables tout au long du cycle de vie afin de soutenir les décisions en aval.",
    },
  ],

  // Libellés propres à la section 03 et à la visionneuse du diagramme.
  scopeLabel: "Vue d’ensemble du cycle opérationnel complet.",
  mapLabel: "CARTOGRAPHIE DES PROCESSUS D’ENTREPRISE",
  viewerCloseLabel: "Fermer la visionneuse de l’architecture",
  viewerInstructions:
    "Faites défiler horizontalement ou verticalement pour explorer l’architecture complète. Appuyez sur Échap pour fermer.",

  viewerLabel: "Voir l’architecture complète",

  viewerCaption:
    "Cartographie des processus d’entreprise — vue conceptuelle de bout en bout des processus, systèmes, données, contrôles et transferts métier.",
},

systemsData: {
  eyebrow: "04 — ARCHITECTURE DES SYSTÈMES & DONNÉES",

  title:
    "Comprendre les systèmes par leurs responsabilités métier et la propriété des données.",

  intro:
    "Chaque système soutient une partie spécifique du modèle opérationnel. L’analyse porte sur ce que le système permet de réaliser, les données critiques qu’il contient, qui en est responsable et comment ces informations soutiennent les processus et décisions en aval.",

  sectionSummary:
  "Responsabilité métier, données critiques, ownership et usages en aval.",

  coreSystemsLabel: "Systèmes métier principaux",

  criticalDataLabel: "Données critiques",

  primaryOwnerLabel: "Responsable principal",

  downstreamUseLabel: "Usages en aval",

  transversePlatformLabel: "Plateforme transverse",

  governanceLabel: "Gouvernance transversale",

  ownershipLensLabel: "Lecture de l’ownership des données",

  systems: [
    {
      name: "CRM",
      businessRole:
        "Pipeline commercial, qualification et contexte client / opportunité.",
      criticalData: [
        "Lead",
        "Client",
        "Opportunité",
        "Étape",
        "Probabilité",
        "Date de clôture prévue",
      ],
      primaryOwner:
        "Ventes / Opérations commerciales",
      downstreamUse: [
        "Planification projet",
        "Handoff ERP",
        "Prévisions",
        "BI",
      ],
    },
    {
      name: "ERP",
      businessRole:
        "Approvisionnement, inventaire, finance et contrôle transactionnel.",
      criticalData: [
        "Demande d’achat",
        "Bon de commande",
        "Fournisseur",
        "Inventaire",
        "Coût",
        "Facture",
        "Paiement",
      ],
      primaryOwner:
        "Approvisionnement / Finance / Opérations",
      downstreamUse: [
        "Contrôle projet",
        "Rapports financiers",
        "BI",
        "Gestion fournisseurs",
      ],
    },
    {
      name: "Gestion de projet",
      businessRole:
        "Planification, portée, échéancier, exécution et contrôle de la baseline projet.",
      criticalData: [
        "WBS",
        "Jalons",
        "Échéancier",
        "Ressources",
        "Statut projet",
        "Baseline",
      ],
      primaryOwner:
        "Gestion de projet / Opérations",
      downstreamUse: [
        "Équipes d’exécution",
        "Finance",
        "Approvisionnement",
        "BI",
      ],
    },
    {
      name: "Field Service",
      businessRole:
        "Interventions terrain, exécution du service, garantie et activités sur site.",
      criticalData: [
        "Ordre de travail",
        "Intervention",
        "Actif / équipement",
        "Statut du service",
        "Garantie",
        "Activité technicien",
      ],
      primaryOwner:
        "Service / Opérations terrain",
      downstreamUse: [
        "Clôture projet",
        "Service client",
        "Gestion de garantie",
        "BI",
      ],
    },
    {
      name: "BI / Analytics",
      businessRole:
        "Suivi de la performance, KPI, prévisions et aide à la décision.",
      criticalData: [
        "Réels",
        "Backlog",
        "EAC / ETC",
        "Revenus",
        "Coûts",
        "Capacité",
        "KPI",
      ],
      primaryOwner:
        "Direction / Finance / Analytics",
      downstreamUse: [
        "Décisions opérationnelles",
        "Reporting de gestion",
        "Prévisions",
        "Planification de capacité",
      ],
    },
  ],

  transversePlatforms: [
    {
      name: "Microsoft 365 / SharePoint",
      role:
        "Collaboration documentaire, partage contrôlé de l’information et documentation du cycle de vie.",
      capabilities: [
        "Documents",
        "Contrôle de versions",
        "Support aux approbations",
        "Partage de connaissances",
      ],
    },
    {
      name: "Power Platform",
      role:
        "Workflow, automatisation légère et applications métier transverses à l’écosystème.",
      capabilities: [
        "Power Automate",
        "Power Apps",
        "Dataverse",
        "Notifications",
        "Approbations",
      ],
    },
  ],

  governance: [
    "Qualité des données",
    "Sécurité & Accès",
    "Conformité",
    "Monitoring",
    "Documentation",
    "Gestion du changement",
  ],

  ownershipQuestions: [
    "Qui crée la donnée ?",
    "Qui en est responsable ?",
    "Qui la valide ?",
    "Qui la consomme ?",
    "Quel processus ou quelle décision en dépend ?",
  ],
},

processInventory: {
  eyebrow: "05 — PROCESS INVENTORY",

  title:
    "Transformer la cartographie des processus en portefeuille structuré d’amélioration.",

  intro:
    "Le Process Inventory constitue un registre central permettant de suivre l’ownership des processus, les systèmes associés, le statut d’analyse, la maturité, la documentation, les pain points et la priorité. Il crée un lien pratique entre la cartographie et la planification des améliorations.",

  snapshotLabel: "Aperçu du Process Inventory",
  
  primarySystemLabel: "Système principal",
  secondarySystemLabel: "Système secondaire",
  ownerLabel: "Owner",
  analysisStatusLabel: "Statut d’analyse",
  maturityCardLabel: "Maturité",
  priorityLabel: "Priorité",
  fullInventoryLabel: "Process Inventory",

  sampleProcesses: [
    {
      id: "P01",
      name: "Lead & Qualification",
      primarySystem: "CRM",
      secondarySystem: "À confirmer",
      owner: "À confirmer",
      analysisStatus: "À analyser",
      maturity: "M0 — Non analysé",
      documentation: "À confirmer",
      painPoints: "À découvrir",
      priority: "Non évaluée",
    },
    {
      id: "P05",
      name: "Contract Won / Project Handoff",
      primarySystem: "CRM / BC / Procore",
      secondarySystem: "SharePoint?",
      owner: "À confirmer",
      analysisStatus: "À analyser",
      maturity: "M0 — Non analysé",
      documentation: "À confirmer",
      painPoints: "À découvrir",
      priority: "Potentiellement élevée",
    },
    {
      id: "P07",
      name: "Procurement / P2P",
      primarySystem: "Business Central",
      secondarySystem: "Procore?",
      owner: "À confirmer",
      analysisStatus: "À analyser",
      maturity: "M0 — Non analysé",
      documentation: "À confirmer",
      painPoints: "À découvrir",
      priority: "Non évaluée",
    },
    {
      id: "P12",
      name: "Performance / Forecast / Capacity",
      primarySystem: "Power BI",
      secondarySystem: "CRM / BC / Procore",
      owner: "À confirmer",
      analysisStatus: "À analyser",
      maturity: "M0 — Non analysé",
      documentation: "À confirmer",
      painPoints: "À découvrir",
      priority: "Non évaluée",
    },
  ],

  maturityLabel: "Modèle de maturité des processus",

  maturityLevels: [
    {
      level: "M0",
      title: "Non analysé",
      description:
        "Processus identifié, mais pas encore formellement analysé ou documenté.",
    },
    {
      level: "M1",
      title: "AS-IS compris",
      description:
        "Processus actuel observé, clarifié et cartographié.",
    },
    {
      level: "M2",
      title: "Standardisé",
      description:
        "Les rôles, règles d’affaires, données et contrôles sont définis.",
    },
    {
      level: "M3",
      title: "Mesuré",
      description:
        "Des KPI et une baseline de performance sont disponibles.",
    },
    {
      level: "M4",
      title: "Optimisé / automatisé",
      description:
        "Le processus est amélioré et peut être soutenu par de l’automatisation.",
    },
  ],

  insights: [
    {
      title: "Ownership",
      description:
        "Clarifie qui devrait être responsable de chaque processus et où l’ownership reste à confirmer.",
    },
    {
      title: "Statut d’analyse",
      description:
        "Rend visibles les processus qui nécessitent encore de la découverte, de la validation ou une analyse fonctionnelle approfondie.",
    },
    {
      title: "Maturité",
      description:
        "Fournit une progression cohérente d’un processus non analysé jusqu’à un processus mesuré et optimisé.",
    },
    {
      title: "Priorisation",
      description:
        "Aide à concentrer l’effort d’analyse sur les processus présentant davantage d’incertitude, d’impact ou de potentiel d’amélioration.",
    },
  ],

  viewerLabel: "Voir l’inventaire complet",

  viewerCaption:
    "Process Inventory — registre central de l’ownership, des systèmes, du statut d’analyse, de la maturité, de la documentation, des pain points et de la priorité.",
},

crmDeepDive: {
  eyebrow: "06 — FOCUS CRM",

  title:
    "De la qualification du lead à un handoff projet maîtrisé.",

  intro:
    "Un pipeline CRM fiable n’est pas seulement un outil commercial. Il devient une source amont pour la planification projet, les prévisions, la gestion de capacité et l’exécution en aval. L’analyse porte donc sur la qualité de la qualification, la fiabilité des opportunités, les points de décision et la complétude du handoff projet.",

  lifecycleLabel: "Cycle de vie commercial",

  lifecycle: [
    {
      id: "P01",
      title: "Prospect et qualification",
      description:
        "Capturer, qualifier et contextualiser le lead avant son entrée dans le pipeline commercial actif.",
    },
    {
      id: "P02",
      title: "Opportunité et pipeline CRM",
      description:
        "Développer l’opportunité, documenter les besoins du client et maintenir des informations fiables dans le pipeline.",
    },
    {
      id: "P03",
      title: "Décision de soumission et Go / No-Go",
      description:
        "Appliquer des critères de décision explicites afin de déterminer si l’opportunité doit être poursuivie.",
    },
    {
      id: "P04",
      title: "Estimation et proposition",
      description:
        "Transformer l’opportunité en estimation, proposition et offre pouvant être revue commercialement.",
    },
    {
      id: "P05",
      title: "Contrat obtenu / Transfert vers le projet",
      description:
        "Transférer le contexte commercial, le contrat, la portée, les dates et les contraintes vers l’exécution projet.",
    },
  ],

  analysisAreasLabel: "Analyse CRM — principaux axes",

  analysisAreas: [
    {
      title: "Qualification",
      description:
        "Évaluer si le lead est suffisamment qualifié, stratégiquement pertinent et mérite d’être poursuivi.",
      keywords: [
        "BANT",
        "Besoin",
        "Fit",
      ],
    },
    {
      title: "Fiabilité du pipeline",
      description:
        "S’assurer que les opportunités restent suffisamment à jour pour soutenir des prévisions et une planification crédibles.",
      keywords: [
        "Étape",
        "Probabilité",
        "Valeur",
        "Date de clôture",
        "Date de démarrage prévue",
      ],
    },
    {
      title: "Point de décision",
      description:
        "Rendre les décisions Bid / No-Bid et Go / No-Go explicites, traçables et fondées sur des critères définis.",
      keywords: [
        "Capacité",
        "Risque",
        "Marge",
        "Faisabilité",
      ],
    },
    {
      title: "Handoff maîtrisé",
      description:
        "S’assurer qu’une opportunité gagnée transfère le contexte nécessaire aux processus projet et ERP.",
      keywords: [
        "Contrat",
        "Portée",
        "Dates",
        "Contexte projet",
      ],
    },
  ],

  pipelineVsBacklog: {
    label: "Pipeline vs Backlog",

    pipelineTitle: "Pipeline",
    pipelineDescription:
      "Activité commerciale future potentielle. La valeur d’une opportunité peut être pondérée par sa probabilité à des fins de prévision.",

    backlogTitle: "Backlog",
    backlogDescription:
      "Travail gagné ou engagé qui reste encore à livrer.",

    example:
      "Exemple : Opportunité = 5 M$, Probabilité = 80 %, Pipeline pondéré = 4 M$. Cela ne signifie pas que le backlog est de 4 M$.",
  },

  insights: [
    {
      title: "Fiabilité du pipeline",
      description:
        "Les étapes, probabilités, valeurs et dates doivent rester suffisamment à jour pour soutenir des prévisions commerciales et de capacité crédibles.",
    },
    {
      title: "Points de décision",
      description:
        "Les décisions de qualification et Bid / No-Bid deviennent plus solides lorsque les critères, l’ownership et les approbations sont explicites.",
    },
    {
      title: "Dépendances de données",
      description:
        "La valeur, le calendrier et la probabilité d’une opportunité influencent la planification, les prévisions et les décisions de ressources en aval.",
    },
    {
      title: "Handoff maîtrisé",
      description:
        "Une opportunité gagnée doit transférer suffisamment de contexte commercial, contractuel et de planification vers l’exécution projet.",
    },
  ],

  viewerLabel: "Voir l’analyse CRM complète",

  viewerCaption:
    "CRM Functional Deep Dive — analyse conceptuelle de la qualification, de la fiabilité du pipeline, des points de décision et du handoff projet sur les phases P01 à P05.",
},

procurementDeepDive: {
  eyebrow: "07 — FOCUS PROCUREMENT / P2P",

  title:
    "Du besoin projet au paiement fournisseur maîtrisé.",

  intro:
    "Le processus Procure-to-Pay relie la demande opérationnelle, les contrôles d’approvisionnement, les engagements fournisseurs et le règlement financier. L’analyse porte sur la transformation d’un besoin en achat approuvé, la traçabilité des transactions dans l’ERP et la gestion des exceptions avant paiement.",

  lifecycleLabel: "Cycle Procure-to-Pay",

  lifecycle: [
    {
      id: "P2P-01",
      title: "Besoin métier",
      description:
        "Un besoin de matériel ou de service est identifié à partir du projet, des opérations ou de la planification.",
    },
    {
      id: "P2P-02",
      title: "Demande d’achat",
      description:
        "Le besoin est formalisé dans une PR avec la quantité, les spécifications, le coût et le contexte projet nécessaires.",
    },
    {
      id: "P2P-03",
      title: "Approbation",
      description:
        "La demande est vérifiée selon les pouvoirs d’autorisation, le budget, les règles métier et la politique d’achat.",
    },
    {
      id: "P2P-04",
      title: "Bon de commande",
      description:
        "L’engagement approuvé est converti en PO puis communiqué au fournisseur sélectionné.",
    },
    {
      id: "P2P-05",
      title: "Réception",
      description:
        "Les biens ou services sont confirmés comme reçus avant le règlement financier.",
    },
    {
      id: "P2P-06",
      title: "Facture & rapprochement",
      description:
        "La facture fournisseur est validée par rapport au bon de commande et à la réception avant paiement.",
    },
    {
      id: "P2P-07",
      title: "Paiement",
      description:
        "Les obligations fournisseurs validées sont libérées pour paiement selon les conditions et contrôles approuvés.",
    },
  ],

  analysisAreasLabel: "Analyse P2P — principaux axes",

  analysisAreas: [
    {
      title: "Qualité de la demande",
      description:
        "L’achat doit commencer par un besoin suffisamment défini : spécifications, quantité, échéance et contexte projet.",
      keywords: [
        "Spécification",
        "Quantité",
        "Date de besoin",
        "Projet / Code de coût",
      ],
    },
    {
      title: "Contrôles d’approbation",
      description:
        "Les règles d’approbation doivent refléter les pouvoirs financiers, les politiques d’achat, les seuils et les exceptions.",
      keywords: [
        "Autorité",
        "Seuil",
        "Budget",
        "Exception",
      ],
    },
    {
      title: "Intégrité transactionnelle",
      description:
        "Les enregistrements PR, PO, réception et facture doivent rester liés afin de tracer les engagements et les coûts réels.",
      keywords: [
        "PR",
        "PO",
        "Réception",
        "Facture",
      ],
    },
    {
      title: "Contrôle fournisseur & paiement",
      description:
        "Les données fournisseur, les conditions commerciales et la facture doivent être fiables avant le règlement.",
      keywords: [
        "Fournisseur",
        "Conditions",
        "Rapprochement",
        "Paiement",
      ],
    },
  ],

  threeWayMatch: {
    label: "Rapprochement 3 voies",

    purchaseOrderTitle: "Bon de commande",
    purchaseOrderDescription:
      "Ce qui a été autorisé et commandé.",

    receiptTitle: "Réception",
    receiptDescription:
      "Ce qui a réellement été reçu ou confirmé.",

    invoiceTitle: "Facture fournisseur",
    invoiceDescription:
      "Ce que le fournisseur demande à être payé.",

    conclusion:
      "Le paiement ne devrait être effectué qu’après une validation suffisante de la transaction ou la résolution approuvée d’une exception.",
  },

  controlPointsLabel: "Points de contrôle critiques",

  controlPoints: [
    {
      title: "Complétude de la demande",
      description:
        "Une demande d’achat incomplète entraîne du retraitement, des délais d’approvisionnement et des problèmes de qualité de données.",
    },
    {
      title: "Pouvoir d’approbation",
      description:
        "Le routage des approbations doit respecter les pouvoirs financiers définis et empêcher les engagements non autorisés.",
    },
    {
      title: "Confirmation de réception",
      description:
        "Les biens ou services doivent être confirmés avant le règlement de la facture lorsque le processus l’exige.",
    },
    {
      title: "Exceptions de facture",
      description:
        "Les écarts de quantité, de prix, de fournisseur ou de réception doivent suivre un processus explicite de résolution.",
    },
  ],

  insights: [
    {
      title: "Traçabilité du processus",
      description:
        "Un P2P fiable relie le besoin, l’autorisation, l’engagement fournisseur, la réception et le règlement financier.",
    },
    {
      title: "Ownership des données",
      description:
        "Les achats, les équipes projet, la réception et la finance créent ou valident différentes parties d’une même transaction.",
    },
    {
      title: "Gestion des exceptions",
      description:
        "La qualité du processus dépend souvent de la gestion des réceptions manquantes, écarts de prix et incohérences de factures.",
    },
    {
      title: "Visibilité des coûts projet",
      description:
        "Des engagements et coûts réels fiables améliorent le contrôle projet, le forecast et les analyses EAC / ETC.",
    },
  ],

  viewerLabel: "Voir l’analyse P2P complète",

  viewerCaption:
    "Procurement / Procure-to-Pay Functional Deep Dive — analyse conceptuelle de la demande d’achat, des approbations, des bons de commande, des réceptions, de la validation des factures et du paiement fournisseur.",
},

dataGovernance: {
  eyebrow: "08 — GOUVERNANCE DES DONNÉES & CADRE DE CONTRÔLE",

  title:
    "Des processus fiables reposent sur des données gouvernées, un ownership clair et des changements maîtrisés.",

  intro:
    "Les systèmes d’entreprise ne deviennent fiables que lorsque les données qui les traversent sont fiables, maîtrisées et gouvernées. Cette couche de gouvernance relie la qualité des données, la validation, la sécurité, le suivi des intégrations, la documentation et la gestion du changement à travers le CRM, l’ERP, la gestion de projet, le Field Service et la BI.",

  principlesLabel: "Principes de gouvernance",

  principles: [
    {
      title: "Ownership des données",
      description:
        "Chaque donnée métier critique doit avoir un créateur, un owner, un validateur et un consommateur clairement identifiés.",
      keywords: [
        "Créateur",
        "Owner",
        "Validateur",
        "Consommateur",
      ],
    },
    {
      title: "Qualité des données",
      description:
        "La complétude, l’exactitude, la cohérence et l’actualité déterminent si les décisions opérationnelles et analytiques peuvent être fiables.",
      keywords: [
        "Complétude",
        "Exactitude",
        "Cohérence",
        "Actualité",
      ],
    },
    {
      title: "Règles de validation",
      description:
        "Les règles métier et les contrôles doivent empêcher les données incomplètes, invalides ou contradictoires de progresser en aval.",
      keywords: [
        "Champs requis",
        "Règles métier",
        "Seuils",
        "Contrôles",
      ],
    },
    {
      title: "Sécurité & accès",
      description:
        "Les accès doivent refléter les rôles, les responsabilités et la sensibilité des données tout en permettant l’exécution du processus métier.",
      keywords: [
        "Rôles",
        "Permissions",
        "MFA",
        "Moindre privilège",
      ],
    },
    {
      title: "Monitoring des intégrations",
      description:
        "Les interfaces et flux automatisés doivent être surveillés afin que les échecs, retards et transactions rejetées soient visibles et traitables.",
      keywords: [
        "Interfaces",
        "Erreurs",
        "Relances",
        "Monitoring",
      ],
    },
    {
      title: "Documentation",
      description:
        "Les règles de processus, définitions de données, contrôles et procédures de support doivent être accessibles et maintenus.",
      keywords: [
        "Standards",
        "Définitions",
        "Procédures",
        "Connaissances",
      ],
    },
    {
      title: "Gestion du changement",
      description:
        "Les changements de processus, de systèmes et de données doivent être évalués, communiqués, testés et adoptés de manière contrôlée.",
      keywords: [
        "Impact",
        "Tests",
        "Communication",
        "Adoption",
      ],
    },
  ],

  ownershipLens: {
    label: "Lecture de l’ownership des données",

    questions: [
      {
        title: "Qui crée la donnée ?",
        description:
          "Identifier le rôle ou le système responsable de la capture initiale.",
      },
      {
        title: "Qui en est owner ?",
        description:
          "Attribuer la responsabilité de la signification métier, de la qualité et du cycle de vie de la donnée.",
      },
      {
        title: "Qui la valide ?",
        description:
          "Définir qui ou quel contrôle confirme que la donnée peut progresser en aval.",
      },
      {
        title: "Qui la consomme ?",
        description:
          "Identifier les processus, systèmes, rapports et décisions qui dépendent de cette donnée.",
      },
    ],
  },

  criticalDataLabel: "Données critiques dans l’écosystème",

  criticalData: [
    {
      domain: "CRM",
      examples:
        "Client, lead, opportunité, étape, probabilité, valeur, date de clôture",
      downstream:
        "Forecast commercial, handoff projet, planification de capacité, BI",
    },
    {
      domain: "ERP / P2P",
      examples:
        "PR, PO, fournisseur, réception, facture, paiement, coût réel",
      downstream:
        "Contrôle des coûts projet, gestion fournisseur, finance, BI",
    },
    {
      domain: "Gestion de projet",
      examples:
        "WBS, jalons, échéancier, baseline, ressources, statut projet",
      downstream:
        "Exécution, forecast, facturation, capacité et performance",
    },
    {
      domain: "Field Service",
      examples:
        "Actif, ordre de travail, intervention, activité technicien, statut garantie",
      downstream:
        "Service, garantie, historique client et BI",
    },
    {
      domain: "BI / Analytics",
      examples:
        "Actuals, backlog, EAC, ETC, revenus, coûts, capacité et KPI",
      downstream:
        "Décisions de gestion, forecast, performance et planification",
    },
  ],

  controlsLabel: "Cadre de contrôle transverse",

  controls: [
    {
      title: "Prévenir",
      description:
        "Réduire les mauvaises données à la source grâce aux champs obligatoires, règles de validation, valeurs contrôlées et approbations.",
    },
    {
      title: "Détecter",
      description:
        "Identifier les anomalies grâce au monitoring, aux rapports d’exception, rapprochements et seuils KPI.",
    },
    {
      title: "Corriger",
      description:
        "Résoudre les problèmes de données ou de transactions grâce à un ownership, une escalade et des chemins de remédiation définis.",
    },
    {
      title: "Améliorer",
      description:
        "Utiliser les exceptions récurrentes et les défaillances de contrôle pour alimenter l’amélioration des processus et l’automatisation.",
    },
  ],

  insights: [
    {
      title: "La gouvernance crée la confiance",
      description:
        "Des rapports et automatisations fiables dépendent de données amont maîtrisées, et pas seulement des outils analytiques.",
    },
    {
      title: "L’ownership réduit l’ambiguïté",
      description:
        "Une responsabilité claire réduit les efforts dupliqués, les erreurs non résolues et les définitions métier incohérentes.",
    },
    {
      title: "Les contrôles protègent les flux",
      description:
        "Les contrôles préventifs et détectifs limitent la propagation des problèmes de qualité de données entre les systèmes.",
    },
    {
      title: "Le changement doit être gouverné",
      description:
        "Les améliorations de processus et de systèmes restent durables lorsque les changements sont testés, documentés et adoptés.",
    },
  ],
},

improvementFramework: {
  eyebrow: "09 — CADRE D’AMÉLIORATION DES PROCESSUS",

  title:
    "Des écarts observés aux améliorations métier validées.",

  intro:
    "L’amélioration d’un processus ne consiste pas simplement à automatiser un workflow existant. L’analyse doit d’abord établir comment le processus fonctionne réellement, où se trouvent les irritants, pourquoi ils existent et quelles règles métier doivent être préservées avant de concevoir l’état futur.",

  lifecycleLabel: "Cycle d’amélioration",

  lifecycle: [
    {
      id: "01",
      title: "AS-IS",
      description:
        "Documenter le fonctionnement actuel du processus à travers les rôles, systèmes, données et points de décision.",
    },
    {
      id: "02",
      title: "Pain Points",
      description:
        "Identifier les délais, le retraitement, les tâches manuelles, l’ownership ambigu, les erreurs et les irritants opérationnels.",
    },
    {
      id: "03",
      title: "Causes racines",
      description:
        "Distinguer les symptômes des causes réelles liées au processus, aux données, aux systèmes ou à la gouvernance.",
    },
    {
      id: "04",
      title: "Règles métier",
      description:
        "Clarifier les règles, contrôles, approbations, conditions et exceptions qui gouvernent le processus.",
    },
    {
      id: "05",
      title: "Exigences",
      description:
        "Transformer les besoins validés en exigences fonctionnelles, de données, de contrôle et de reporting.",
    },
    {
      id: "06",
      title: "TO-BE",
      description:
        "Concevoir le processus futur amélioré avec des responsabilités, flux de données et contrôles plus clairs.",
    },
    {
      id: "07",
      title: "Automatisation",
      description:
        "Identifier les opportunités d’automatisation seulement lorsque le processus futur et les règles métier sont compris.",
    },
    {
      id: "08",
      title: "KPI & Baseline",
      description:
        "Définir des indicateurs mesurables et une baseline afin d’évaluer objectivement l’amélioration.",
    },
    {
      id: "09",
      title: "Validation",
      description:
        "Confirmer que la solution proposée répond au problème métier initial et peut être adoptée opérationnellement.",
    },
  ],

  analysisAreasLabel: "Analyse d’amélioration — principaux axes",

  analysisAreas: [
    {
      title: "Processus",
      description:
        "Comprendre la séquence, les handoffs, goulots d’étranglement, temps d’attente et activités sans valeur ajoutée.",
      keywords: [
        "Flux",
        "Handoffs",
        "Délai",
        "Retraitement",
      ],
    },
    {
      title: "Personnes & Ownership",
      description:
        "Clarifier qui exécute, approuve, valide, supporte et demeure responsable de chaque étape.",
      keywords: [
        "Rôle",
        "Owner",
        "Approbation",
        "Escalade",
      ],
    },
    {
      title: "Systèmes & Données",
      description:
        "Identifier les doubles saisies, intégrations manquantes, problèmes de qualité des données et contraintes systèmes.",
      keywords: [
        "Systèmes",
        "Interfaces",
        "Qualité des données",
        "Duplication",
      ],
    },
    {
      title: "Contrôles & Mesure",
      description:
        "Déterminer si les règles métier, contrôles et KPI permettent de gérer le processus de façon fiable.",
      keywords: [
        "Règles",
        "Contrôles",
        "KPI",
        "Baseline",
      ],
    },
  ],

  rootCauseLabel: "Analyse des causes racines",

  rootCauseFlow: [
    {
      title: "Symptôme observé",
      description:
        "Ce que les utilisateurs ou la gestion constatent dans le processus actuel.",
    },
    {
      title: "Éléments de preuve",
      description:
        "Données transactionnelles, entrevues, observations du processus, exceptions et indicateurs de performance.",
    },
    {
      title: "Cause racine",
      description:
        "Le problème sous-jacent de processus, ownership, données, système ou contrôle à l’origine du symptôme.",
    },
    {
      title: "Réponse d’amélioration",
      description:
        "Une exigence, modification de processus, contrôle ou automatisation ciblant directement la cause réelle.",
    },
  ],

  automationLabel: "Lecture de la décision d’automatisation",

  automationQuestions: [
    {
      title: "Le processus est-il compris ?",
      description:
        "L’automatisation ne doit pas masquer un processus flou ou incohérent.",
    },
    {
      title: "Les règles sont-elles explicites ?",
      description:
        "La logique de décision, les exceptions et les contrôles doivent être suffisamment définis.",
    },
    {
      title: "Les données d’entrée sont-elles fiables ?",
      description:
        "Une automatisation amplifie les mauvaises données lorsque les entrées ne sont pas maîtrisées.",
    },
    {
      title: "Le résultat peut-il être mesuré ?",
      description:
        "Les bénéfices doivent être associés à des gains mesurables de temps, qualité, coût ou risque.",
    },
  ],

  kpiLabel: "Exemples de mesures d’amélioration",

  kpis: [
    {
      title: "Temps de cycle",
      description:
        "Temps écoulé entre le déclenchement du processus et l’obtention du résultat métier.",
    },
    {
      title: "First-Time-Right",
      description:
        "Pourcentage de transactions complétées sans correction ni retraitement.",
    },
    {
      title: "Taux d’exception",
      description:
        "Fréquence des transactions nécessitant une intervention manuelle ou une escalade.",
    },
    {
      title: "Taux d’automatisation",
      description:
        "Part des activités éligibles complétées sans traitement manuel.",
    },
    {
      title: "Qualité des données",
      description:
        "Complétude, exactitude et cohérence des données critiques du processus.",
    },
    {
      title: "Résultat métier",
      description:
        "Effet opérationnel ou financier : réduction des coûts, livraison plus rapide ou forecast plus fiable.",
    },
  ],

  insights: [
    {
      title: "Automatiser le TO-BE",
      description:
        "L’automatisation est plus efficace après avoir challengé les faiblesses et étapes inutiles du processus.",
    },
    {
      title: "Les exigences doivent être justifiées",
      description:
        "Les exigences fonctionnelles sont plus solides lorsqu’elles sont directement reliées aux pain points et causes racines observés.",
    },
    {
      title: "La mesure commence tôt",
      description:
        "Une baseline doit être établie avant l’implémentation afin de démontrer objectivement l’amélioration.",
    },
    {
      title: "La validation ferme la boucle",
      description:
        "La solution finale doit être évaluée par rapport au problème initial, aux exigences et aux résultats attendus.",
    },
  ],
},

conclusion: {
  eyebrow: "10 — CONCLUSION",

  title:
    "L’analyse des systèmes d’entreprise consiste avant tout à relier les processus, l’ownership, les données, les contrôles et la technologie.",

  intro:
    "Cette étude conceptuelle montre comment un modèle opérationnel d’entreprise peut être décomposé en couches de processus, systèmes, données et contrôles. L’objectif n’est pas simplement de documenter des applications, mais de comprendre comment les résultats métier dépendent de handoffs fiables, de responsabilités claires, de données gouvernées et d’améliorations mesurables.",

  takeawaysLabel: "Principaux constats",

  takeaways: [
    {
      title: "Vision End-to-End",
      description:
        "Comprendre le flux métier global avant d’optimiser un processus ou une application isolée.",
    },
    {
      title: "Profondeur fonctionnelle",
      description:
        "Passer de l’architecture d’entreprise à l’analyse détaillée du CRM, du Procurement / P2P, des contrôles, des données et des points de décision.",
    },
    {
      title: "Gouvernance & Fiabilité",
      description:
        "Une automatisation, un reporting et un forecast fiables reposent sur un ownership clair, des données maîtrisées et des règles métier explicites.",
    },
    {
      title: "Amélioration continue",
      description:
        "Transformer les pain points observés en causes racines, exigences, design TO-BE, KPI mesurables et résultats validés.",
    },
  ],

  capabilityLabel: "Compétences démontrées",

  capabilities: [
    "Cartographie des processus métier",
    "Analyse fonctionnelle",
    "Business Systems Analysis",
    "Compréhension des processus ERP / CRM",
    "Gouvernance des données",
    "Analyse des exigences",
    "Conception de contrôles",
    "Amélioration des processus",
    "Définition de KPI",
    "Analyse des intégrations intersystèmes",
  ],

  closingStatement:
    "Le résultat est un cadre d’analyse structuré reliant les besoins métier aux systèmes, aux données, aux contrôles et aux opportunités d’amélioration à l’échelle de l’entreprise.",
},

} as const;