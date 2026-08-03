import type {
  TargetAndTransition,
  Transition,
  Variants,
} from "framer-motion";

import {
  motionDistance,
  motionDuration,
  motionEase,
} from "../case-study/animation-variants";

/*
|--------------------------------------------------------------------------
| Shared transitions
|--------------------------------------------------------------------------
*/

export const presetTransition: Transition = {
  duration: motionDuration.standard,
  ease: motionEase.standard,
};

export const presetTransitionFast: Transition = {
  duration: motionDuration.fast,
  ease: motionEase.standard,
};

export const presetTransitionSlow: Transition = {
  duration: motionDuration.slow,
  ease: motionEase.soft,
};

/*
|--------------------------------------------------------------------------
| Page and section reveals
|--------------------------------------------------------------------------
*/

export const pageReveal: Variants = {
  hidden: {
    opacity: 0,
    y: motionDistance.small,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionDuration.standard,
      ease: motionEase.standard,
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    y: -motionDistance.small,
    transition: {
      duration: motionDuration.fast,
      ease: motionEase.soft,
    },
  },
};

export const sectionReveal: Variants = {
  hidden: {
    opacity: 0,
    y: motionDistance.medium,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionDuration.slow,
      ease: motionEase.standard,
    },
  },
};

export const sectionHeaderReveal: Variants = {
  hidden: {
    opacity: 0,
    y: motionDistance.small,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionDuration.standard,
      ease: motionEase.standard,
    },
  },
};

/*
|--------------------------------------------------------------------------
| Hero
|--------------------------------------------------------------------------
*/

export const heroContainerReveal: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.16,
    },
  },
};

export const heroItemReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.985,
    filter: "blur(12px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: motionEase.emphasized,
    },
  },
};

export const heroGlowReveal: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.72,
    filter: "blur(30px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1.6,
      ease: motionEase.soft,
    },
  },
};

/*
|--------------------------------------------------------------------------
| Navbar
|--------------------------------------------------------------------------
*/

export const navbarReveal: Variants = {
  hidden: {
    opacity: 0,
    y: -motionDistance.small,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionDuration.slow,
      ease: motionEase.emphasized,
      delay: 0.05,
    },
  },
};

export const navbarItemsReveal: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.15,
      staggerChildren: 0.06,
    },
  },
};

export const navbarItemReveal: Variants = {
  hidden: {
    opacity: 0,
    y: -8,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionDuration.standard,
      ease: motionEase.standard,
    },
  },
};

/*
|--------------------------------------------------------------------------
| Collections and cards
|--------------------------------------------------------------------------
*/

export const cardsContainerReveal: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.06,
    },
  },
};

export const cardReveal: Variants = {
  hidden: {
    opacity: 0,
    y: motionDistance.medium,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: motionDuration.slow,
      ease: motionEase.emphasized,
    },
  },
};

export const cardHover: TargetAndTransition = {
  y: -6,
  scale: 1.01,
  transition: {
    duration: motionDuration.fast,
    ease: motionEase.standard,
  },
};

export const cardTap: TargetAndTransition = {
  scale: 0.99,
  transition: {
    duration: motionDuration.instant,
    ease: motionEase.standard,
  },
};

/*
|--------------------------------------------------------------------------
| Buttons and interactive controls
|--------------------------------------------------------------------------
*/

export const buttonHover: TargetAndTransition = {
  y: -2,
  scale: 1.015,
  transition: {
    duration: motionDuration.fast,
    ease: motionEase.standard,
  },
};

export const buttonTap: TargetAndTransition = {
  y: 0,
  scale: 0.98,
  transition: {
    duration: motionDuration.instant,
    ease: motionEase.standard,
  },
};

export const iconHover: TargetAndTransition = {
  x: 3,
  transition: {
    duration: motionDuration.fast,
    ease: motionEase.standard,
  },
};

export const socialIconHover: TargetAndTransition = {
  y: -3,
  scale: 1.06,
  transition: {
    duration: motionDuration.fast,
    ease: motionEase.standard,
  },
};

/*
|--------------------------------------------------------------------------
| Badges, tags and metrics
|--------------------------------------------------------------------------
*/

export const badgeReveal: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.92,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: motionDuration.standard,
      ease: motionEase.emphasized,
    },
  },
};

export const tagsContainerReveal: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.04,
    },
  },
};

export const tagReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 8,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: motionDuration.fast,
      ease: motionEase.standard,
    },
  },
};

export const metricsContainerReveal: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05,
    },
  },
};

export const metricReveal: Variants = {
  hidden: {
    opacity: 0,
    y: motionDistance.small,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: motionDuration.standard,
      ease: motionEase.emphasized,
    },
  },
};

/*
|--------------------------------------------------------------------------
| Images and visual previews
|--------------------------------------------------------------------------
*/

export const imageReveal: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: motionDuration.slow,
      ease: motionEase.emphasized,
    },
  },
};

export const imageHover: TargetAndTransition = {
  scale: 1.025,
  transition: {
    duration: motionDuration.slow,
    ease: motionEase.soft,
  },
};

/*
|--------------------------------------------------------------------------
| Decorative and continuous motion
|--------------------------------------------------------------------------
*/

export const floatingMotion: TargetAndTransition = {
  y: [0, -8, 0],
  transition: {
    duration: 4.5,
    repeat: Number.POSITIVE_INFINITY,
    ease: "easeInOut",
  },
};

export const pulseMotion: TargetAndTransition = {
  opacity: [0.45, 0.9, 0.45],
  scale: [1, 1.06, 1],
  transition: {
    duration: 3,
    repeat: Number.POSITIVE_INFINITY,
    ease: "easeInOut",
  },
};

export const scrollIndicatorMotion: TargetAndTransition = {
  y: [0, 7, 0],
  opacity: [0.45, 1, 0.45],
  transition: {
    duration: 2,
    repeat: Number.POSITIVE_INFINITY,
    ease: "easeInOut",
  },
};