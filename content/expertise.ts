export type Expertise = {
  title: string;
  description: string;
  evidence: string[];
  category: "Professional" | "Product";
};

export const expertise: Expertise[] = [
  {
    title: "Functional Analysis",
    description:
      "Translate business and operational needs into structured requirements, business rules, workflows and actionable specifications.",
    evidence: [
      "Requirements analysis",
      "Business rules",
      "Stakeholder coordination",
    ],
    category: "Professional",
  },
  {
    title: "System Analysis & Operations",
    description:
      "Analyze system behavior, operational incidents, application logs and data exchanges to support reliable production environments.",
    evidence: [
      "Incident analysis",
      "Root-cause investigation",
      "Pre-production validation",
    ],
    category: "Professional",
  },
  {
    title: "Data & Business Intelligence",
    description:
      "Build operational KPIs and reporting solutions that improve system visibility, performance monitoring and decision-making.",
    evidence: [
      "Power BI",
      "Operational KPIs",
      "Data modeling",
    ],
    category: "Professional",
  },
  {
    title: "ERP & Supply Chain Operations",
    description:
      "Support purchasing, inventory and operational data workflows in ERP and supply-chain environments.",
    evidence: [
      "Purchase orders",
      "Inventory movements",
      "Data quality",
    ],
    category: "Professional",
  },
  {
    title: "Product Strategy & Discovery",
    description:
      "Transform business problems and user needs into structured digital-product concepts, roadmaps and scalable solution architectures.",
    evidence: [
      "Product discovery",
      "Problem framing",
      "Solution design",
    ],
    category: "Product",
  },
  {
    title: "AI Product Architecture",
    description:
      "Structure AI-driven products through clear governance, knowledge architecture, learning systems and scalable product foundations.",
    evidence: [
      "AI product design",
      "Knowledge architecture",
      "Product governance",
    ],
    category: "Product",
  },
];