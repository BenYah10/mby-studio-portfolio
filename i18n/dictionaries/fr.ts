
/**
 * MBY Studio — Dictionnaire français
 *
 * Rôle :
 * - centraliser les textes français de l'interface ;
 * - éviter les libellés directement codés dans les composants ;
 * - préparer la navigation bilingue.
 *
 * Les contenus longs des études de cas seront gérés séparément.
 */

export const fr = {
  navigation: {
    home: "Accueil",
    services: "Services",
    work: "Réalisations",
    approach: "Ma méthode",
    recommendations: "Recommandations",
    about: "À propos",
    contact: "Contact",
  },

  actions: {
    discussMandate: "Discuter d'un mandat",
    exploreWork: "Découvrir mon travail",
    viewCaseStudy: "Voir l'étude de cas",
    viewAllWork: "Voir toutes les réalisations",
    viewRecommendation: "Voir la recommandation sur LinkedIn",
  },

  accessibility: {
    primaryNavigation: "Navigation principale",
    mobileNavigation: "Navigation mobile",
    openMenu: "Ouvrir le menu de navigation",
    closeMenu: "Fermer le menu de navigation",
    switchLanguage: "Changer de langue",
  },
} as const;
