import type { CaseStudy } from "@/types/case-study";

export const bixiCaseStudy: CaseStudy = {
  projectSlug: "bixi-operations-dashboard",

  headline:
    "Transforming real-time mobility data into an operational decision-support dashboard.",

  introduction:
    "The BIXI Operations Dashboard is a Power BI project built with real-world bike-sharing data to monitor station availability, identify operational pressure points and support faster operational decisions. The solution combines geographic analysis, real-time KPIs and temporal usage patterns in a single decision-support experience.",

  timeline: "2026",

  technologies: [
    "Power BI",
    "Power Query",
    "DAX",
    "Data Modeling",
    "Azure Maps",
    "Operational Analytics",
  ],

  layout: {
  systemDesign: false,
  executionTimeline: false,
  resultsDashboard: true,
  roadmap: false,
  },

  metrics: [
    {
      value: "600+",
      label: "Stations monitored",
      description:
        "Bike-sharing stations represented through real-time geographic and operational data.",
    },
    {
      value: "6",
      label: "Core operational KPIs",
      description:
        "Key indicators covering available bikes, docks, capacity, usage and station conditions.",
    },
    {
      value: "Hourly",
      label: "Operational refresh analysis",
      description:
        "Time-based monitoring designed to reveal availability patterns and operational pressure periods.",
    },
  ],

  sections: [
    {
      id: "challenge",
      eyebrow: "The Challenge",
      title: "Making a large mobility network understandable at a glance",
      paragraphs: [
        "Bike-sharing operations generate large volumes of station-level data that change throughout the day. Raw data alone does not help operational teams quickly understand where bicycles are available, which stations are under pressure or when demand patterns change.",
        "The challenge was to transform multiple operational indicators into a clear dashboard capable of supporting geographic, temporal and station-level analysis.",
      ],
      highlights: [
        "Real-time operational data",
        "Station availability monitoring",
        "Geographic complexity",
        "Rapid decision-making",
      ],
    },

    {
      id: "data-model",
      eyebrow: "Data Modeling",
      title: "Structuring station and status data for reliable analysis",
      paragraphs: [
        "The solution combines station information with frequently updated station status data through a structured analytical model.",
        "Power Query was used to prepare and transform the source data, while DAX measures were developed to calculate current availability, capacity, full stations, empty stations and operational usage indicators.",
      ],
      highlights: [
        "Station information",
        "Station status",
        "Power Query transformations",
        "DAX measures",
      ],
    },

    {
      id: "dashboard",
      eyebrow: "Dashboard Design",
      title: "Connecting geographic, temporal and operational insights",
      paragraphs: [
        "The dashboard was designed around the operational questions users need to answer quickly: where availability problems are occurring, when bike availability changes and which stations require attention.",
        "Azure Maps provides the geographic perspective, KPI cards summarize network conditions and supporting charts expose hourly patterns and low-availability stations.",
      ],
      highlights: [
        "Azure Maps",
        "Operational KPIs",
        "Hourly analysis",
        "Station prioritization",
      ],
    },

    {
      id: "decision-support",
      eyebrow: "Decision Support",
      title: "Turning dashboard signals into operational actions",
      paragraphs: [
        "The dashboard helps identify stations with low bicycle availability, stations approaching capacity and periods where operational intervention may be required.",
        "By consolidating these signals into one interface, the report supports faster interpretation and creates a stronger foundation for bike redistribution and service planning.",
      ],
      highlights: [
        "Pressure-point detection",
        "Bike redistribution support",
        "Operational prioritization",
        "Faster interpretation",
      ],
    },

    {
      id: "results",
      eyebrow: "Results",
      title: "A clearer operational view of the BIXI network",
      paragraphs: [
        "The final dashboard converts complex mobility data into a focused visual experience that demonstrates geographic analysis, BI modeling and operational dashboard design.",
        "The portfolio edition further simplifies the presentation to emphasize the most important business insights while preserving the analytical depth of the original Power BI report.",
      ],
      highlights: [
        "Portfolio-ready dashboard",
        "Improved visual hierarchy",
        "Clear operational storytelling",
        "Reusable BI foundation",
      ],
    },
  ],

  nextSteps: [
    "Add historical station-level data for trend analysis.",
    "Introduce predictive indicators for station saturation and bike shortages.",
    "Create operational alert thresholds for full and empty stations.",
    "Add drill-through pages for detailed station investigation.",
    "Document the data model, DAX measures and refresh strategy.",
  ],
};