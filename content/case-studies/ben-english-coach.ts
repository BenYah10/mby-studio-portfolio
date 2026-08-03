import type { CaseStudy } from "@/types/case-study";

export const benEnglishCoachCaseStudy: CaseStudy = {
  projectSlug: "executive-ai-english-coach",

  headline:
    "Building an AI-powered executive English learning platform designed for long-term professional growth.",

  introduction:
    "Ben's Executive English Coach is not a simple chatbot. It is designed as a complete AI learning platform that combines conversation, memory, personalized coaching and long-term product architecture to help professionals reach executive-level English communication.",

  timeline: "2026 — Present",

  technologies: [
  "OpenAI",
  "Prompt Engineering",
  "Knowledge Architecture",
  "AI Memory",
  "Product Management",
  "Learning System Design",
],

  metrics: [
    {
      value: "AI",
      label: "Learning Engine",
      description:
        "Personalized coaching powered by conversational AI.",
    },
    {
      value: "5",
      label: "Product Vision",
      description:
        "Custom GPT, Web App, Mobile App, SaaS and Enterprise platform.",
    },
    {
      value: "∞",
      label: "Continuous Learning",
      description:
        "Designed for long-term progression instead of isolated sessions.",
    },
  ],

  sections: [
    {
      id: "problem",
      eyebrow: "The Problem",
      title:
        "Traditional language learning rarely prepares professionals for executive communication.",
      paragraphs: [
        "Most language applications focus on vocabulary and grammar exercises but fail to simulate real executive conversations.",
        "Professionals need personalized coaching, continuous feedback and progressive learning adapted to their business environment.",
      ],
      highlights: [
        "Generic learning",
        "No personalization",
        "Limited business context",
        "Lack of long-term progression",
      ],
    },
    {
      id: "vision",
      eyebrow: "Product Vision",
      title:
        "Designing an AI learning platform instead of another chatbot.",
      paragraphs: [
        "The objective was to create a scalable platform capable of evolving beyond ChatGPT into a complete digital product.",
        "Every architectural decision was made with future scalability in mind.",
      ],
      highlights: [
        "AI-first",
        "Scalable architecture",
        "Product thinking",
        "Future SaaS",
      ],
    },
    {
      id: "architecture",
      eyebrow: "Learning Architecture",
      title:
        "Separating knowledge, memory and coaching into independent layers.",
      paragraphs: [
        "The platform combines structured knowledge, persistent memory and conversational AI to provide personalized learning sessions.",
        "This architecture allows future expansion without redesigning the core learning engine.",
      ],
      highlights: [
        "Knowledge Base",
        "Memory",
        "AI Coach",
        "Feedback Loop",
      ],
    },
    {
      id: "experience",
      eyebrow: "AI Coaching",
      title:
        "Delivering personalized executive coaching through conversation.",
      paragraphs: [
        "Each session adapts to the learner's level, objectives and previous conversations.",
        "Business English, role-playing and continuous corrections create a coaching experience instead of isolated exercises.",
      ],
      highlights: [
        "Conversation",
        "Role Play",
        "Business English",
        "Continuous Feedback",
      ],
    },
    {
      id: "roadmap",
      eyebrow: "Future Evolution",
      title:
        "Building today's coach as tomorrow's enterprise learning platform.",
      paragraphs: [
        "The current implementation is the first milestone of a much larger product roadmap.",
        "The architecture already supports expansion toward SaaS and enterprise environments.",
      ],
      highlights: [
        "Custom GPT",
        "Web Platform",
        "Mobile App",
        "Enterprise SaaS",
      ],
    },
  ],

  nextSteps: [
    "Custom GPT",
    "Web Application",
    "Mobile Application",
    "SaaS Platform",
    "Enterprise AI Coach",
  ],

  layout: {
    roadmap: false,
  },
};

export default benEnglishCoachCaseStudy;