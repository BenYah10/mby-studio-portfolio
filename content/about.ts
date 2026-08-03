export type AboutPillar = {
  value: string;
  label: string;
  description: string;
};

export const about = {
  eyebrow: "About Me",

  title:
    "I connect business needs, operational systems and digital product thinking.",

  introduction:
    "I am a Functional Analyst and System Analyst based in Montréal, with experience supporting operational systems, business processes, data exchanges and reporting within complex environments.",

  story:
    "My work sits at the intersection of business and technology. I analyze needs, clarify business rules, investigate incidents, coordinate validation activities and create operational visibility through data and Power BI reporting.",

  differentiation:
    "Beyond my professional responsibilities, I design and build digital products such as BlueKioskTech, the BIXI Operations Dashboard, Ben's Executive English Coach and TripScore. These initiatives allow me to apply product strategy, system thinking, AI architecture and user-centered design to real business problems.",

  closing:
    "I bring a structured, pragmatic and product-oriented approach to every initiative—from understanding the problem to defining, validating and improving the solution.",

  pillars: [
    {
      value: "Business",
      label: "Understand the real need",
      description:
        "Clarify objectives, stakeholders, processes, constraints and business rules before defining a solution.",
    },
    {
      value: "Systems",
      label: "Connect business and technology",
      description:
        "Translate operational needs into functional requirements, workflows, validations and actionable technical specifications.",
    },
    {
      value: "Products",
      label: "Think beyond the immediate request",
      description:
        "Design solutions with usability, scalability, maintainability and long-term product value in mind.",
    },
  ] satisfies AboutPillar[],
};