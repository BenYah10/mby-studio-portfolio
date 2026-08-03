import type {
  Transition,
  Variants,
} from "framer-motion";

export const motionEase = {
  standard: [0.22, 1, 0.36, 1],
  soft: [0.25, 1, 0.5, 1],
  emphasized: [0.16, 1, 0.3, 1],
} as const;

export const motionDuration = {
  instant: 0.2,
  fast: 0.3,
  standard: 0.5,
  slow: 0.75,
  deliberate: 1.1,
} as const;

export const motionDistance = {
  small: 12,
  medium: 24,
  large: 40,
} as const;

export const standardTransition: Transition = {
  duration: motionDuration.standard,
  ease: motionEase.standard,
};

export const fastTransition: Transition = {
  duration: motionDuration.fast,
  ease: motionEase.standard,
};

export const slowTransition: Transition = {
  duration: motionDuration.slow,
  ease: motionEase.soft,
};

export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: standardTransition,
  },
};

export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: motionDistance.medium,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: standardTransition,
  },
};

export const fadeDown: Variants = {
  hidden: {
    opacity: 0,
    y: -motionDistance.medium,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: standardTransition,
  },
};

export const fadeLeft: Variants = {
  hidden: {
    opacity: 0,
    x: motionDistance.medium,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: standardTransition,
  },
};

export const fadeRight: Variants = {
  hidden: {
    opacity: 0,
    x: -motionDistance.medium,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: standardTransition,
  },
};

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
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

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.03,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.08,
    },
  },
};

export const staggerItem: Variants = {
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

export const timelineItem: Variants = {
  hidden: {
    opacity: 0,
    x: -motionDistance.medium,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: motionDuration.standard,
      ease: motionEase.standard,
    },
  },
};

export const progressBar: Variants = {
  hidden: {
    scaleX: 0,
  },
  visible: {
    scaleX: 1,
    transition: {
      duration: motionDuration.deliberate,
      ease: motionEase.standard,
    },
  },
};

export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    y: motionDistance.small,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionDuration.standard,
      ease: motionEase.standard,
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