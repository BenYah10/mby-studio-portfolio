import type { CaseStudy } from "@/types/case-study";

export const tripScoreCaseStudy: CaseStudy = {
  projectSlug: "tripscore",

  headline:
    "Designing an AI-powered travel platform that builds personalized journeys instead of generic itineraries.",

  introduction:
    "TripScore AI rethinks travel planning by combining traveler preferences, destination intelligence and AI recommendations to generate highly personalized travel experiences. Instead of searching through hundreds of options, travelers receive complete itineraries tailored to their own Travel DNA.",

  timeline: "2026 — Present",

  technologies: [
    "Product Strategy",
    "AI Recommendation Engine",
    "UX Research",
    "Travel Intelligence",
    "Marketplace Design",
    "Experience Mapping",
  ],

  metrics: [
    {
      value: "30+",
      label: "Launch destinations",
      description: "Curated experiences available at launch.",
    },
    {
      value: "AI",
      label: "Travel DNA",
      description: "Personalized recommendation engine.",
    },
    {
      value: "∞",
      label: "Marketplace vision",
      description: "Scalable traveler-generated experiences.",
    },
  ],

  sections: [
    {
      id: "travel-problem",
      eyebrow: "THE TRAVEL PROBLEM",
      title:
        "Planning a meaningful trip has become more difficult than booking one.",
      paragraphs: [
        "Travelers spend hours comparing flights, hotels, transportation, restaurants and activities across multiple platforms.",
        "Most booking websites optimize individual reservations rather than the overall travel experience.",
      ],
      highlights: [
        "Information overload",
        "Fragmented booking process",
        "Generic recommendations",
        "Time-consuming planning",
      ],
    },

    {
      id: "travel-dna",
      eyebrow: "TRAVEL DNA",
      title:
        "Understanding the traveler before recommending the destination.",
      paragraphs: [
        "TripScore introduces a Travel DNA profile that captures travel style, budget, interests, pace and personal preferences.",
        "Every recommendation starts from the traveler rather than from available inventory.",
      ],
      highlights: [
        "Adventure",
        "Culture",
        "Food",
        "Nature",
        "Luxury",
        "Family",
      ],
    },

    {
      id: "recommendation-engine",
      eyebrow: "AI RECOMMENDATION ENGINE",
      title:
        "Combining multiple travel signals into one compatibility score.",
      paragraphs: [
        "The recommendation engine evaluates destinations using traveler preferences, seasonality, transportation, activities, accommodation quality and local experiences.",
        "Instead of ranking destinations only by price, TripScore ranks complete experiences.",
      ],
      highlights: [
        "Compatibility Score",
        "Destination Intelligence",
        "AI Ranking",
        "Personalization",
      ],
    },

    {
      id: "experience-builder",
      eyebrow: "EXPERIENCE BUILDER",
      title:
        "Building complete journeys instead of disconnected reservations.",
      paragraphs: [
        "Every itinerary combines flights, accommodations, transportation, restaurants and activities into one optimized travel experience.",
        "Travelers receive a ready-to-book journey rather than assembling dozens of independent bookings.",
      ],
      highlights: [
        "Flights",
        "Hotels",
        "Activities",
        "Restaurants",
      ],
    },

    {
      id: "marketplace",
      eyebrow: "MARKETPLACE VISION",
      title:
        "Creating a community-driven ecosystem for future travel experiences.",
      paragraphs: [
        "Future travelers will be able to publish their own optimized itineraries for new destinations.",
        "The platform continuously improves recommendations using community feedback and AI evaluation.",
      ],
      highlights: [
        "Community",
        "Ratings",
        "AI Learning",
        "Scalable Platform",
      ],
    },
  ],

  nextSteps: [
    "Launch Travel DNA engine",
    "Destination recommendation AI",
    "Interactive itinerary builder",
    "Traveler marketplace",
    "Mobile application",
  ],

  layout: {
    systemDesign: false,
    executionTimeline: false,
    resultsDashboard: true,
    roadmap: false,
  },
};

export default tripScoreCaseStudy;