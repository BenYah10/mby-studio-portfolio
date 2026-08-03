export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  capabilities: string[];
};

export const experiences: Experience[] = [
  {
    company: "Ministère de la Cybersécurité et du Numérique",
    role: "System Analyst ·  Business & Operational Systems",
    period: "2023 — Present",
    location: "Québec, Canada",

    summary:
      "Supporting operational systems, business processes and data flows within a complex government environment involving multiple stakeholders and suppliers.",

    highlights: [
      "Translate business and operational needs into functional requirements, business rules and technical specifications.",
      "Coordinate testing, pre-production validation and Go/No-Go activities before production deployments.",
      "Analyze incidents, supplier file rejections and application logs to identify root causes and corrective actions.",
      "Support operational data exchanges involving CSV, MDB, FTP workflows and Oracle-based systems.",
      "Monitor and build operational KPIs and Power BI reports to improve system visibility, operational performance and decision-making."
    ],

    capabilities: [
      "Functional Analysis",
      "System Analysis",
      "Business Rules",
      "Incident Analysis",
      "Power BI",
      "Operational Reporting"
    ]
  },

   {
    company: "Iweb / Leaseweb",
    role: "ERP & Supply Chain Systems Analyst",
    period: "Previous Experience",
    location: "Montréal, Canada",

    summary:
      "Worked with ERP and supply chain operations to ensure inventory accuracy, purchasing workflows and operational data quality.",

    highlights: [
      "Manage purchase orders throughout the operational workflow.",
      "Monitor rack stock levels and inventory availability.",
      "Validate inventory movements and stock transactions.",
      "Support ERP data integrity and operational reporting.",
      "Participate in data validation and process improvement initiatives."
    ],

    capabilities: [
      "ERP Systems",
      "Inventory Management",
      "Purchase Orders",
      "Supply Chain",
      "Data Quality"
    ]
  },
  
  {
    company: "Leaseweb",
    role: "Data Center Operations Specialist",
    period: "Previous Experience",
    location: "Montréal, Canada",

    summary:
      "Supported daily operations of enterprise data center infrastructure while ensuring equipment reliability and service continuity.",

    highlights: [
      "Install, configure, maintain and troubleshoot supported IT equipment.",
      "Monitor infrastructure health and operational alerts.",
      "Handle Level 1 and Level 2 technical incidents and service requests.",
      "Perform preventive maintenance and hardware replacement following operational procedures."
    ],

    capabilities: [
      "Data Center Operations",
      "Infrastructure Monitoring",
      "Technical Support",
      "Incident Management"
    ]
  },

 
];