
/**
 * MBY Studio — English dictionary
 *
 * Purpose:
 * - centralize English interface labels;
 * - keep translations separate from React components;
 * - support consistent bilingual navigation.
 */

import type { fr } from "./fr";

type DictionaryShape = {
  [K in keyof typeof fr]: {
    [P in keyof (typeof fr)[K]]: string;
  };
};

export const en = {
  navigation: {
    home: "Home",
    services: "Services",
    work: "My Work",
    approach: "How I Work",
    recommendations: "Recommendations",
    about: "About",
    contact: "Contact",
  },

  actions: {
    discussMandate: "Discuss a mandate",
    exploreWork: "Explore my work",
    viewCaseStudy: "View case study",
    viewAllWork: "View all work",
    viewRecommendation: "View recommendation on LinkedIn",
  },

  accessibility: {
    primaryNavigation: "Primary navigation",
    mobileNavigation: "Mobile navigation",
    openMenu: "Open navigation menu",
    closeMenu: "Close navigation menu",
    switchLanguage: "Switch language",
  },
} as const satisfies DictionaryShape;
