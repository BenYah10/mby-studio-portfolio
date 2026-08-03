import type { CaseStudy } from "@/types/case-study";

export const bluekioskCaseStudy: CaseStudy = {
  projectSlug: "bluekiosk",

  headline:
    "Designing a scalable self-service sanitization ecosystem for reusable bottles.",

  introduction:
    "BlueKioskTech is a product innovation project focused on automated bottle sanitization through a controlled cycle combining steam, UV-C treatment and filtered drying. The project is designed as a scalable kiosk ecosystem for gyms, campuses, offices and other high-traffic environments.",

  timeline: "2025 — Present",

  technologies: [
    "Product Strategy",
    "Functional Analysis",
    "System Architecture",
    "Automation",
    "Embedded Systems",
    "UX Strategy",
  ],

  layout: {
  systemDesign: true,
  executionTimeline: true,
  resultsDashboard: true,
  roadmap: true,
 },

  metrics: [
    {
      value: "≤ 100 s",
      label: "Target cycle duration",
      description:
        "Maximum duration targeted for a complete sanitization cycle.",
    },
    {
      value: "99.99%",
      label: "Sanitization target",
      description:
        "Targeted reduction level for microorganisms under validated operating conditions.",
    },
    {
      value: "> 98%",
      label: "Pilot availability target",
      description:
        "Target operational availability during the pilot phase.",
    },
  ],

  sections: [
  {
    id: "opportunity",
    eyebrow: "The Opportunity",
    title: "Reducing friction around reusable bottle hygiene",
    paragraphs: [
      "Millions of reusable bottles are used every day in gyms, campuses and workplaces, yet regular sanitization remains inconsistent and inconvenient.",
      "BlueKioskTech reimagines bottle hygiene as a self-service experience by combining automation, safety and operational scalability into a single product ecosystem.",
    ],
    highlights: [
     "High-traffic environments",
     "Poor cleaning habits",
     "Self-service expectations",
     "Scalable business model",
],
  },

  {
    id: "thinking",
    eyebrow: "Product Thinking",
    title: "Starting from the user problem instead of the technology",
    paragraphs: [
      "Rather than beginning with hardware selection, the project started by identifying the real user pain points, operational constraints and business objectives.",
      "Each functional decision was evaluated according to three priorities: user safety, operational simplicity and product scalability.",
    ],
    highlights: [
      "User-first analysis",
      "Functional requirements",
      "Business constraints",
      "Risk analysis",
    ],
  },

  {
    id: "system",
    eyebrow: "System Design",
    title: "Designing a modular sanitization platform",
    paragraphs: [
      "The kiosk is divided into independent functional modules responsible for steam generation, UV-C treatment, drying, sensing, control and user interaction.",
      "This architecture simplifies maintenance, testing and future product evolution while allowing each subsystem to evolve independently.",
    ],
    highlights: [
     "Steam Generation",
     "UV-C Treatment",
     "Sensor Network",
     "Filtered Drying",
   ],
  },

  {
    id: "execution",
    eyebrow: "Execution",
    title: "Structuring development like an industrial product",
    paragraphs: [
      "The project follows a structured product lifecycle including user requirements, product specifications, engineering changes, quality control and validation.",
      "Applying an industrial governance model improves traceability, reduces technical debt and prepares the product for pilot deployment.",
    ],
    highlights: [
      "URS & PRD",
      "Engineering changes",
      "Quality Gates",
      "Pilot preparation",
    ],
  },

  {
   id: "results",
   eyebrow: "Expected Results",
   title: "Defining measurable targets for pilot validation",
   paragraphs: [],
   highlights: [],
},

],

  nextSteps: [
    "Finalize the prototype architecture.",
    "Validate subsystem suppliers and technical constraints.",
    "Build and test the first integrated prototype.",
    "Prepare the pilot deployment in a controlled environment.",
    "Measure availability, cycle duration and operational cost.",
  ],
};