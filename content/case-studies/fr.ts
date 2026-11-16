/**
 * MBY Studio — French editorial content for non-Manufacturing case studies.
 *
 * Preserve technical IDs, factual values, diagram contracts and project slugs.
 * This module only provides localized narrative content; it does not imply
 * that a product has launched or that pilot KPIs have been achieved.
 */
import type { CaseStudy, CaseStudySection } from "@/types/case-study";
import { bluekioskCaseStudy } from "./bluekiosk";
import { bixiCaseStudy } from "./bixi";
import { tripScoreCaseStudy } from "./tripscore";
import { benEnglishCoachCaseStudy } from "./ben-english-coach";

type EditorialSection = Omit<CaseStudySection, "id">;
type FrenchCopy = Pick<CaseStudy, "headline" | "introduction"> & {
  metrics?: CaseStudy["metrics"];
  sections: EditorialSection[];
  nextSteps?: string[];
};

/** Preserve the source IDs and structural flags instead of duplicating logic. */
function translate(base: CaseStudy, copy: FrenchCopy): CaseStudy {
  if (base.sections.length !== copy.sections.length) {
    throw new Error(`Inconsistent localized sections: ${base.projectSlug}`);
  }
  return {
    ...base,
    headline: copy.headline,
    introduction: copy.introduction,
    timeline: base.timeline === "2025 — Present" ? "2025 — Aujourd’hui" : base.timeline === "2026 — Present" ? "2026 — Aujourd’hui" : base.timeline,
    metrics: copy.metrics ?? base.metrics,
    sections: base.sections.map((section, index) => ({ ...section, ...copy.sections[index], id: section.id })),
    nextSteps: copy.nextSteps ?? base.nextSteps,
  };
}

const bluekiosk = translate(bluekioskCaseStudy, {
  headline: "Concevoir un écosystème évolutif de désinfection en libre-service pour les gourdes réutilisables.",
  introduction: "BlueKioskTech est un projet d’innovation produit axé sur la désinfection automatisée des gourdes, grâce à un cycle contrôlé combinant vapeur, traitement UV-C et séchage filtré. Le concept vise un réseau de kiosques en libre-service pour les salles de sport, campus, bureaux et autres lieux très fréquentés.",
  metrics: [
    { value: "≤ 100 s", label: "Durée cible du cycle", description: "Durée maximale visée pour un cycle complet de désinfection." },
    { value: "99,99 %", label: "Objectif de désinfection", description: "Niveau de réduction microbienne visé, sous réserve de validation dans des conditions d’exploitation définies." },
    { value: "> 98 %", label: "Disponibilité cible du pilote", description: "Disponibilité opérationnelle visée pendant la phase pilote." },
  ],
  sections: [
    { eyebrow: "L’opportunité", title: "Simplifier l’hygiène des gourdes réutilisables", paragraphs: ["Les gourdes réutilisables sont utilisées quotidiennement dans les salles de sport, les campus et les bureaux, mais leur désinfection régulière reste contraignante et inégale.", "BlueKioskTech explore une expérience en libre-service réunissant automatisation, sécurité d’utilisation et exploitation évolutive dans un même écosystème."], highlights: ["Lieux très fréquentés", "Habitudes de nettoyage variables", "Attentes envers le libre-service", "Modèle d’affaires évolutif"] },
    { eyebrow: "Réflexion produit", title: "Partir du besoin utilisateur avant de choisir la technologie", paragraphs: ["Plutôt que de commencer par le choix des équipements, la démarche identifie d’abord les irritants utilisateurs, les contraintes d’exploitation et les objectifs d’affaires.", "Chaque décision fonctionnelle est évaluée selon trois priorités : sécurité, simplicité opérationnelle et potentiel de déploiement."], highlights: ["Analyse centrée utilisateur", "Exigences fonctionnelles", "Contraintes métier", "Analyse des risques"] },
    { eyebrow: "Conception du système", title: "Concevoir une plateforme de désinfection modulaire", paragraphs: ["Le kiosque est organisé en modules fonctionnels dédiés à la vapeur, au traitement UV-C, au séchage, aux capteurs, à la commande et à l’interaction utilisateur.", "Cette architecture facilite la maintenance, les essais et l’évolution du concept, chaque sous-système pouvant être amélioré indépendamment."], highlights: ["Génération de vapeur", "Traitement UV-C", "Réseau de capteurs", "Séchage filtré"] },
    { eyebrow: "Exécution", title: "Structurer le développement comme un produit industriel", paragraphs: ["Le projet prévoit un cycle de développement structuré : besoins, spécifications, modifications d’ingénierie, contrôle qualité et validation.", "Une gouvernance inspirée de l’industrie favorise la traçabilité, limite la dette technique et prépare les conditions d’un futur pilote."], highlights: ["URS et PRD", "Modifications d’ingénierie", "Jalons qualité", "Préparation du pilote"] },
    { eyebrow: "Résultats attendus", title: "Définir des objectifs mesurables pour valider le pilote", paragraphs: [], highlights: [] },
  ],
  nextSteps: ["Finaliser l’architecture du prototype.", "Valider les fournisseurs des sous-systèmes et les contraintes techniques.", "Construire et tester le premier prototype intégré.", "Préparer un déploiement pilote dans un environnement contrôlé.", "Mesurer la disponibilité, la durée du cycle et les coûts d’exploitation."],
});

const bixi = translate(bixiCaseStudy, {
  headline: "Transformer les données de mobilité en temps réel en tableau de bord d’aide à la décision opérationnelle.",
  introduction: "Le tableau de bord opérationnel BIXI est un projet Power BI fondé sur des données réelles de vélopartage. Il vise à suivre la disponibilité des stations, repérer les situations de tension et faciliter les décisions opérationnelles. Il rassemble l’analyse géographique, les indicateurs clés et les tendances horaires dans une interface unique.",
  metrics: [
    { value: "600+", label: "Stations suivies", description: "Stations de vélopartage représentées à partir de données géographiques et opérationnelles actualisées." },
    { value: "6", label: "Indicateurs opérationnels clés", description: "Indicateurs sur les vélos disponibles, les bornes, la capacité, l’utilisation et l’état des stations." },
    { value: "Horaire", label: "Analyse de rafraîchissement", description: "Suivi temporel destiné à faire ressortir les variations de disponibilité et les périodes de tension." },
  ],
  sections: [
    { eyebrow: "Le défi", title: "Comprendre rapidement un vaste réseau de mobilité", paragraphs: ["L’exploitation d’un réseau de vélopartage génère de nombreuses données par station, qui évoluent au fil de la journée. Les données brutes permettent difficilement de voir où trouver des vélos, quelles stations sont saturées et quand la demande varie.", "Le défi consiste à transformer ces indicateurs en un tableau de bord permettant des analyses géographiques, temporelles et par station."], highlights: ["Données opérationnelles actualisées", "Suivi de la disponibilité", "Complexité géographique", "Décisions rapides"] },
    { eyebrow: "Modélisation des données", title: "Structurer les données des stations et de leur état", paragraphs: ["La solution réunit les renseignements sur les stations et leurs états fréquemment actualisés dans un modèle analytique cohérent.", "Power Query sert à préparer les données; des mesures DAX calculent la disponibilité, la capacité, les stations pleines ou vides et les indicateurs d’utilisation."], highlights: ["Référentiel des stations", "État des stations", "Transformations Power Query", "Mesures DAX"] },
    { eyebrow: "Conception du tableau de bord", title: "Relier les perspectives géographique, temporelle et opérationnelle", paragraphs: ["Le tableau de bord est structuré autour des questions clés : où se produisent les problèmes de disponibilité, quand surviennent-ils et quelles stations nécessitent une intervention?", "Azure Maps fournit la vue géographique, les cartes KPI synthétisent le réseau et les graphiques présentent les variations horaires et les stations sous tension."], highlights: ["Azure Maps", "KPI opérationnels", "Analyse horaire", "Priorisation des stations"] },
    { eyebrow: "Aide à la décision", title: "Transformer les signaux en actions opérationnelles", paragraphs: ["Le tableau de bord aide à repérer les stations avec peu de vélos, celles proches de leur capacité et les périodes où une intervention pourrait être nécessaire.", "La consolidation des signaux simplifie leur interprétation et soutient la planification des redistributions et du service."], highlights: ["Détection des tensions", "Appui à la redistribution", "Priorités opérationnelles", "Interprétation accélérée"] },
    { eyebrow: "Résultats", title: "Une vision plus claire du réseau BIXI", paragraphs: ["Le tableau de bord transforme des données de mobilité complexes en une interface illustrant l’analyse géographique, la modélisation BI et la conception de rapports opérationnels.", "La version portfolio met en évidence les constats métier essentiels tout en préservant la profondeur analytique du rapport Power BI initial."], highlights: ["Tableau de bord de démonstration", "Hiérarchie visuelle améliorée", "Narration opérationnelle claire", "Fondation BI réutilisable"] },
  ],
  nextSteps: ["Intégrer l’historique par station pour l’analyse des tendances.", "Ajouter des indicateurs prédictifs de saturation et de manque de vélos.", "Définir des seuils d’alerte pour les stations pleines et vides.", "Créer des pages de détail par station.", "Documenter le modèle de données, les mesures DAX et la stratégie d’actualisation."],
});

const tripscore = translate(tripScoreCaseStudy, {
  headline: "Concevoir une plateforme de voyage propulsée par l’IA qui propose des parcours personnalisés plutôt que des itinéraires génériques.",
  introduction: "TripScore AI repense la planification des voyages en combinant préférences personnelles, connaissance des destinations et recommandations assistées par IA. Plutôt que de comparer des centaines d’options, les voyageurs recevraient des itinéraires adaptés à leur profil Travel DNA.",
  metrics: [
    { value: "30+", label: "Destinations envisagées au lancement", description: "Expériences sélectionnées envisagées pour le lancement." },
    { value: "IA", label: "Travel DNA", description: "Moteur de recommandation personnalisé envisagé." },
    { value: "∞", label: "Vision de place de marché", description: "Écosystème évolutif d’expériences proposées par les voyageurs." },
  ],
  sections: [
    { eyebrow: "Le problème du voyage", title: "Organiser un voyage pertinent est devenu plus difficile que le réserver", paragraphs: ["Les voyageurs consacrent beaucoup de temps à comparer vols, hôtels, transports, restaurants et activités sur différentes plateformes.", "La plupart des sites optimisent chaque réservation séparément, plutôt que l’expérience du séjour dans son ensemble."], highlights: ["Surcharge d’information", "Réservations fragmentées", "Recommandations génériques", "Planification chronophage"] },
    { eyebrow: "Travel DNA", title: "Comprendre le voyageur avant de suggérer une destination", paragraphs: ["TripScore imagine un profil Travel DNA décrivant le style de voyage, le budget, les intérêts, le rythme et les préférences personnelles.", "Chaque recommandation partirait du profil du voyageur plutôt que du seul inventaire disponible."], highlights: ["Aventure", "Culture", "Gastronomie", "Nature", "Luxe", "Famille"] },
    { eyebrow: "Moteur de recommandation IA", title: "Combiner plusieurs facteurs en un indice de compatibilité", paragraphs: ["Le moteur envisagé évaluerait les destinations selon les préférences, les saisons, les transports, les activités, les hébergements et les expériences locales.", "Au lieu de classer les destinations uniquement par prix, TripScore comparerait des expériences de voyage complètes."], highlights: ["Indice de compatibilité", "Connaissance des destinations", "Classement assisté par IA", "Personnalisation"] },
    { eyebrow: "Création d’itinéraires", title: "Composer des parcours complets plutôt que des réservations isolées", paragraphs: ["Chaque itinéraire regrouperait vols, hébergements, déplacements, restaurants et activités en une expérience coordonnée.", "Le voyageur disposerait d’un parcours prêt à réserver, sans assembler lui-même des dizaines d’éléments indépendants."], highlights: ["Vols", "Hôtels", "Activités", "Restaurants"] },
    { eyebrow: "Vision de place de marché", title: "Créer un écosystème communautaire d’expériences de voyage", paragraphs: ["À terme, les voyageurs pourraient publier leurs propres itinéraires optimisés pour de nouvelles destinations.", "Les retours de la communauté et l’évaluation par IA contribueraient à améliorer les recommandations."], highlights: ["Communauté", "Évaluations", "Apprentissage IA", "Plateforme évolutive"] },
  ],
  nextSteps: ["Lancer le concept de profil Travel DNA", "Développer les recommandations de destination par IA", "Créer un configurateur d’itinéraires interactif", "Étudier une place de marché communautaire", "Concevoir une application mobile"],
});

const englishCoach = translate(benEnglishCoachCaseStudy, {
  headline: "Concevoir une plateforme d’apprentissage de l’anglais professionnel assistée par IA, pensée pour une progression durable.",
  introduction: "Executive AI English Coach est un concept de plateforme d’apprentissage qui va au-delà d’un simple chatbot. Il associe conversation, mémoire, accompagnement personnalisé et architecture produit évolutive pour aider des professionnels à développer leurs compétences de communication en anglais dans un contexte de direction.",
  metrics: [
    { value: "IA", label: "Moteur d’apprentissage", description: "Accompagnement personnalisé fondé sur une IA conversationnelle." },
    { value: "5", label: "Vision produit", description: "GPT personnalisé, application web, application mobile, SaaS et plateforme entreprise." },
    { value: "∞", label: "Apprentissage continu", description: "Conception axée sur la progression à long terme plutôt que sur des séances isolées." },
  ],
  sections: [
    { eyebrow: "Le problème", title: "Les méthodes classiques préparent rarement à la communication de direction", paragraphs: ["De nombreuses applications privilégient le vocabulaire et la grammaire, sans reproduire les véritables échanges professionnels de niveau direction.", "Les professionnels ont besoin d’un accompagnement adapté, de rétroactions continues et d’un parcours progressif ancré dans leurs situations métier."], highlights: ["Apprentissage générique", "Personnalisation limitée", "Contexte métier insuffisant", "Faible continuité"] },
    { eyebrow: "Vision produit", title: "Concevoir une plateforme d’apprentissage IA plutôt qu’un simple chatbot", paragraphs: ["L’objectif est de concevoir une solution capable d’évoluer au-delà de ChatGPT vers un produit numérique structuré.", "Les décisions d’architecture tiennent compte des possibilités de développement futur."], highlights: ["Approche centrée sur l’IA", "Architecture évolutive", "Réflexion produit", "Perspective SaaS"] },
    { eyebrow: "Architecture d’apprentissage", title: "Séparer connaissances, mémoire et coaching en couches indépendantes", paragraphs: ["Le concept combine une base de connaissances structurée, une mémoire persistante et une IA conversationnelle pour soutenir des séances adaptées au profil de l’apprenant.", "Cette séparation facilite l’ajout de fonctionnalités sans remettre en cause le moteur d’apprentissage central."], highlights: ["Base de connaissances", "Mémoire", "Coach IA", "Boucle de rétroaction"] },
    { eyebrow: "Accompagnement IA", title: "Offrir un coaching personnalisé par la conversation", paragraphs: ["Chaque séance est conçue pour s’adapter au niveau, aux objectifs et aux échanges précédents de l’apprenant.", "L’anglais des affaires, les mises en situation et les corrections continues visent un véritable accompagnement plutôt qu’une suite d’exercices isolés."], highlights: ["Conversation", "Jeux de rôle", "Anglais des affaires", "Rétroactions continues"] },
    { eyebrow: "Évolution future", title: "Préparer aujourd’hui un coach capable de devenir une plateforme d’entreprise", paragraphs: ["La première mise en œuvre constitue une étape d’une feuille de route produit plus vaste.", "L’architecture envisagée doit permettre une évolution vers des offres SaaS et des usages en entreprise."], highlights: ["GPT personnalisé", "Plateforme web", "Application mobile", "SaaS entreprise"] },
  ],
  nextSteps: ["GPT personnalisé", "Application web", "Application mobile", "Plateforme SaaS", "Coach IA pour entreprises"],
});

export const caseStudiesFr: Record<string, CaseStudy> = {
  [bluekiosk.projectSlug]: bluekiosk,
  [bixi.projectSlug]: bixi,
  [tripscore.projectSlug]: tripscore,
  [englishCoach.projectSlug]: englishCoach,
};
