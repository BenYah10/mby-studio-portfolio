export const manufacturingContentEn = {
  methodology: {
    eyebrow: "02 — MY APPROACH",

    title: "Understand the business before designing the solution.",

    intro:
      "I approach complex business ecosystems by first understanding how work is actually performed across people, processes, systems and data. Only after clarifying ownership, rules, controls and pain points do I move toward target-state design and automation opportunities.",

    approachSteps: [
      {
        title: "Understand",
        description:
          "Build context around objectives, actors, constraints and decisions.",
      },
      {
        title: "Map",
        description:
          "Visualize the end-to-end process and key handoffs.",
      },
      {
        title: "Clarify Rules",
        description:
          "Identify approvals, exceptions, business rules and decision gates.",
      },
      {
        title: "Identify Data",
        description:
          "Determine the critical information required by each process step.",
      },
      {
        title: "Define Ownership",
        description:
          "Clarify who creates, owns, validates and consumes information.",
      },
      {
        title: "Measure",
        description:
          "Define KPIs and evidence needed to assess performance.",
      },
      {
        title: "Improve",
        description:
          "Address root causes and redesign weak process areas.",
      },
      {
        title: "Automate",
        description:
          "Automate only after the process, rules and data are sufficiently clear.",
      },
    ],

    approachLabel: "Analysis approach",

      phases: [
     {
       title: "Understand",
       description:
      "Establish the current state, pain points and root causes.",
     },
     {
       title: "Design",
       description:
      "Convert business rules and requirements into a target state.",
     },
    {
       title: "Validate",
       description:
      "Measure outcomes through KPIs and validate the intended change.",
    },
   ],

    transformationLabel: "Transformation path",

    transformationSteps: [
      "AS-IS",
      "Pain Points",
      "Root Causes",
      "Business Rules",
      "Requirements",
      "TO-BE",
      "Automation",
      "KPI",
      "Validation",
    ],
  },

  endToEnd: {
  eyebrow: "03 — END-TO-END PROCESS ARCHITECTURE",

  title:
    "Mapping the business lifecycle from opportunity to performance.",

  intro:
    "The enterprise process map connects the major business phases, decision gates, system handoffs and critical data that shape a project-driven manufacturing lifecycle. The objective is not to document every task, but to make the operating flow visible from initial qualification through execution, financial control and performance management.",

  groups: [
    {
      label: "Commercial",
      phases: [
        {
          id: "P01",
          title: "Lead & Qualification",
        },
        {
          id: "P02",
          title: "Opportunity & CRM Pipeline",
        },
        {
          id: "P03",
          title: "Bid / No-Bid & Go / No-Go",
        },
        {
          id: "P04",
          title: "Estimation & Proposal",
        },
      ],
    },
    {
      label: "Project Setup",
      phases: [
        {
          id: "P05",
          title: "Contract Won / Project Handoff",
        },
        {
          id: "P06",
          title: "Planning, Design & Baseline",
        },
      ],
    },
    {
      label: "Execution",
      phases: [
        {
          id: "P07",
          title: "Procurement / P2P",
        },
        {
          id: "P08",
          title: "Production / Logistics / Site Execution",
        },
        {
          id: "P09",
          title: "Billing & Financial Control",
        },
        {
          id: "P10",
          title: "Project Closeout / Service / Warranty",
        },
      ],
    },
    {
      label: "Performance",
      phases: [
        {
          id: "P11",
          title: "Backlog / Actuals / EAC / ETC",
        },
        {
          id: "P12",
          title: "Performance / Forecast / Capacity",
        },
      ],
    },
  ],

  insights: [
    {
      title: "Business Flow",
      description:
        "Shows how value moves from commercial qualification through project execution, financial control and performance management.",
    },
    {
      title: "Decision Gates",
      description:
        "Highlights where approvals, validations or business decisions are required before the process can move forward.",
    },
    {
      title: "System Handoffs",
      description:
        "Makes visible where responsibility and information move across CRM, ERP, project management, field service and BI.",
    },
    {
      title: "Critical Data",
      description:
        "Identifies the information that must remain reliable and traceable across the lifecycle to support downstream decisions.",
    },
  ],

  // Labels shared by section 03 and its accessible architecture viewer.
  scopeLabel: "Enterprise-level view of the full operating lifecycle.",
  mapLabel: "ENTERPRISE PROCESS MAP",
  viewerCloseLabel: "Close architecture viewer",
  viewerInstructions:
    "Scroll horizontally or vertically to inspect the full architecture. Press Esc to close.",

  viewerLabel: "View full architecture",

  viewerCaption:
    "Enterprise Process Map — conceptual end-to-end view of processes, systems, data, controls and business handoffs.",
},

systemsData: {
  eyebrow: "04 — SYSTEMS & DATA ARCHITECTURE",

  title:
    "Understanding systems through business responsibility and data ownership.",

  intro:
    "Each system supports a specific part of the operating model. The analysis focuses on what the system enables, which critical data it carries, who owns that information and how it supports downstream processes and decisions.",
  sectionSummary:
  "Business responsibility, critical data, ownership and downstream use.",

  coreSystemsLabel: "Core business systems",

  criticalDataLabel: "Critical data",

  primaryOwnerLabel: "Primary owner",

  downstreamUseLabel: "Downstream use",

  transversePlatformLabel: "Transverse platform",

  governanceLabel: "Cross-cutting governance",

  ownershipLensLabel: "Data ownership lens",

  systems: [
    {
      name: "CRM",
      businessRole:
        "Commercial pipeline, qualification and customer / opportunity context.",
      criticalData: [
        "Lead",
        "Customer",
        "Opportunity",
        "Stage",
        "Probability",
        "Expected close date",
      ],
      primaryOwner:
        "Sales / Commercial Operations",
      downstreamUse: [
        "Project planning",
        "ERP handoff",
        "Forecasting",
        "BI",
      ],
    },
    {
      name: "ERP",
      businessRole:
        "Procurement, inventory, finance and transactional control.",
      criticalData: [
        "Purchase Requisition",
        "Purchase Order",
        "Supplier",
        "Inventory",
        "Cost",
        "Invoice",
        "Payment",
      ],
      primaryOwner:
        "Procurement / Finance / Operations",
      downstreamUse: [
        "Project control",
        "Financial reporting",
        "BI",
        "Supplier management",
      ],
    },
    {
      name: "Project Management",
      businessRole:
        "Project planning, scope, schedule, execution and baseline control.",
      criticalData: [
        "WBS",
        "Milestones",
        "Schedule",
        "Resources",
        "Project status",
        "Baseline",
      ],
      primaryOwner:
        "Project Management / Operations",
      downstreamUse: [
        "Execution teams",
        "Finance",
        "Procurement",
        "BI",
      ],
    },
    {
      name: "Field Service",
      businessRole:
        "Field interventions, service execution, warranty and site activities.",
      criticalData: [
        "Work order",
        "Intervention",
        "Asset / equipment",
        "Service status",
        "Warranty",
        "Technician activity",
      ],
      primaryOwner:
        "Service / Field Operations",
      downstreamUse: [
        "Project closeout",
        "Customer service",
        "Warranty management",
        "BI",
      ],
    },
    {
      name: "BI / Analytics",
      businessRole:
        "Performance monitoring, KPI, forecasting and decision support.",
      criticalData: [
        "Actuals",
        "Backlog",
        "EAC / ETC",
        "Revenue",
        "Cost",
        "Capacity",
        "KPI",
      ],
      primaryOwner:
        "Management / Finance / Analytics",
      downstreamUse: [
        "Operational decisions",
        "Management reporting",
        "Forecasting",
        "Capacity planning",
      ],
    },
  ],

  transversePlatforms: [
    {
      name: "Microsoft 365 / SharePoint",
      role:
        "Document collaboration, controlled information sharing and lifecycle documentation.",
      capabilities: [
        "Documents",
        "Version control",
        "Approvals support",
        "Knowledge sharing",
      ],
    },
    {
      name: "Power Platform",
      role:
        "Workflow, lightweight automation and business applications across the ecosystem.",
      capabilities: [
        "Power Automate",
        "Power Apps",
        "Dataverse",
        "Notifications",
        "Approvals",
      ],
    },
  ],

  governance: [
    "Data Quality",
    "Security & Access",
    "Compliance",
    "Monitoring",
    "Documentation",
    "Change Management",
  ],

  ownershipQuestions: [
    "Who creates the data?",
    "Who owns it?",
    "Who validates it?",
    "Who consumes it?",
    "What process or decision depends on it?",
  ],
},

processInventory: {
  eyebrow: "05 — PROCESS INVENTORY",

  title:
    "Turning process mapping into a structured improvement portfolio.",

  intro:
    "The Process Inventory provides a central register for tracking process ownership, supporting systems, analysis status, maturity, documentation, pain points and priority. It creates a practical bridge between process mapping and improvement planning.",

  snapshotLabel: "Process inventory snapshot",
  primarySystemLabel: "Primary system",
  secondarySystemLabel: "Secondary system",
  ownerLabel: "Owner",
  analysisStatusLabel: "Analysis status",
  maturityCardLabel: "Maturity",
  priorityLabel: "Priority",
  fullInventoryLabel: "Process Inventory",

  sampleProcesses: [
    {
      id: "P01",
      name: "Lead & Qualification",
      primarySystem: "CRM",
      secondarySystem: "To confirm",
      owner: "To confirm",
      analysisStatus: "To analyze",
      maturity: "M0 — Not analyzed",
      documentation: "To confirm",
      painPoints: "To discover",
      priority: "Not yet assessed",
    },
    {
      id: "P05",
      name: "Contract Won / Project Handoff",
      primarySystem: "CRM / BC / Procore",
      secondarySystem: "SharePoint?",
      owner: "To confirm",
      analysisStatus: "To analyze",
      maturity: "M0 — Not analyzed",
      documentation: "To confirm",
      painPoints: "To discover",
      priority: "Potentially high",
    },
    {
      id: "P07",
      name: "Procurement / P2P",
      primarySystem: "Business Central",
      secondarySystem: "Procore?",
      owner: "To confirm",
      analysisStatus: "To analyze",
      maturity: "M0 — Not analyzed",
      documentation: "To confirm",
      painPoints: "To discover",
      priority: "Not yet assessed",
    },
    {
      id: "P12",
      name: "Performance / Forecast / Capacity",
      primarySystem: "Power BI",
      secondarySystem: "CRM / BC / Procore",
      owner: "To confirm",
      analysisStatus: "To analyze",
      maturity: "M0 — Not analyzed",
      documentation: "To confirm",
      painPoints: "To discover",
      priority: "Not yet assessed",
    },
  ],

  maturityLabel: "Process maturity model",

  maturityLevels: [
    {
      level: "M0",
      title: "Not analyzed",
      description:
        "Process identified, but not yet formally analyzed or documented.",
    },
    {
      level: "M1",
      title: "AS-IS understood",
      description:
        "Current process observed, clarified and mapped.",
    },
    {
      level: "M2",
      title: "Standardized",
      description:
        "Roles, business rules, data and controls are defined.",
    },
    {
      level: "M3",
      title: "Measured",
      description:
        "KPIs and a performance baseline are available.",
    },
    {
      level: "M4",
      title: "Optimized / automated",
      description:
        "Process improved and potentially supported by automation.",
    },
  ],

  insights: [
    {
      title: "Ownership",
      description:
        "Clarifies who should be accountable for each process and where ownership still needs to be confirmed.",
    },
    {
      title: "Analysis Status",
      description:
        "Makes visible which processes still require discovery, validation or deeper functional analysis.",
    },
    {
      title: "Maturity",
      description:
        "Provides a consistent progression from an unanalyzed process to a measured and optimized process.",
    },
    {
      title: "Prioritization",
      description:
        "Helps focus analysis effort on processes with greater uncertainty, impact or improvement potential.",
    },
  ],

  viewerLabel: "View full inventory",

  viewerCaption:
    "Process Inventory — central register of process ownership, systems, analysis status, maturity, documentation, pain points and priority.",
},

crmDeepDive: {
  eyebrow: "06 — CRM DEEP DIVE",

  title:
    "From lead qualification to a controlled project handoff.",

  intro:
    "A reliable CRM pipeline is not only a sales tool. It becomes an upstream source for project planning, forecasting, capacity management and downstream execution. The analysis therefore focuses on qualification quality, opportunity reliability, decision gates and the completeness of the project handoff.",

  lifecycleLabel: "Commercial lifecycle",

  lifecycle: [
    {
      id: "P01",
      title: "Lead & Qualification",
      description:
        "Capture, qualify and contextualize the lead before it enters the active commercial pipeline.",
    },
    {
      id: "P02",
      title: "Opportunity & CRM Pipeline",
      description:
        "Develop the opportunity, document customer needs and maintain reliable pipeline information.",
    },
    {
      id: "P03",
      title: "Bid / No-Bid & Go / No-Go",
      description:
        "Apply explicit decision criteria to determine whether the opportunity should be pursued.",
    },
    {
      id: "P04",
      title: "Estimation & Proposal",
      description:
        "Translate the opportunity into an estimate, proposal and commercially reviewable offer.",
    },
    {
      id: "P05",
      title: "Contract Won / Project Handoff",
      description:
        "Transfer the commercial context, contract, scope, dates and constraints into project execution.",
    },
  ],

  analysisAreasLabel: "CRM analysis — key focus areas",

  analysisAreas: [
    {
      title: "Qualification",
      description:
        "Assess whether the lead is sufficiently qualified, strategically relevant and worth progressing.",
      keywords: [
        "BANT",
        "Need",
        "Fit",
      ],
    },
    {
      title: "Pipeline Reliability",
      description:
        "Ensure opportunities remain current enough to support meaningful forecasting and planning.",
      keywords: [
        "Stage",
        "Probability",
        "Value",
        "Close date",
        "Expected start date",
      ],
    },
    {
      title: "Decision Gate",
      description:
        "Make Bid / No-Bid and Go / No-Go decisions explicit, traceable and supported by defined criteria.",
      keywords: [
        "Capacity",
        "Risk",
        "Margin",
        "Feasibility",
      ],
    },
    {
      title: "Controlled Handoff",
      description:
        "Ensure a won opportunity transfers the context required by project and ERP processes.",
      keywords: [
        "Contract",
        "Scope",
        "Dates",
        "Project context",
      ],
    },
  ],

  pipelineVsBacklog: {
    label: "Pipeline vs Backlog",

    pipelineTitle: "Pipeline",
    pipelineDescription:
      "Potential future business. Opportunity value may be probability-weighted for forecasting purposes.",

    backlogTitle: "Backlog",
    backlogDescription:
      "Won or committed work that remains to be delivered.",

    example:
      "Example: Opportunity = $5M, Probability = 80%, Weighted pipeline = $4M. This does not mean backlog = $4M.",
  },

  insights: [
    {
      title: "Pipeline Reliability",
      description:
        "Stages, probabilities, values and dates must remain current enough to support credible commercial and capacity forecasts.",
    },
    {
      title: "Decision Gates",
      description:
        "Qualification and Bid / No-Bid decisions become stronger when criteria, ownership and approvals are explicit.",
    },
    {
      title: "Data Dependencies",
      description:
        "Opportunity value, timing and probability influence downstream planning, forecasting and resource decisions.",
    },
    {
      title: "Controlled Handoff",
      description:
        "A won opportunity must transfer sufficient commercial, contractual and planning context into project execution.",
    },
  ],

  viewerLabel: "View full CRM analysis",

  viewerCaption:
    "CRM Functional Deep Dive — conceptual analysis of qualification, pipeline reliability, decision gates and project handoff across P01 to P05.",
},

procurementDeepDive: {
  eyebrow: "07 — PROCUREMENT / P2P DEEP DIVE",

  title:
    "From project need to controlled supplier payment.",

  intro:
    "Procure-to-Pay connects operational demand, procurement controls, supplier commitments and financial settlement. The analysis focuses on how a business need becomes an approved purchase, how transactions remain traceable across ERP processes and how exceptions are controlled before payment.",

  lifecycleLabel: "Procure-to-Pay lifecycle",

  lifecycle: [
    {
      id: "P2P-01",
      title: "Business Need",
      description:
        "A material or service requirement is identified from project, operational or planning needs.",
    },
    {
      id: "P2P-02",
      title: "Purchase Requisition",
      description:
        "The need is formally translated into a requisition with sufficient quantity, specification, cost and project context.",
    },
    {
      id: "P2P-03",
      title: "Approval",
      description:
        "The requisition is reviewed against authorization, budget, business rules and procurement policy.",
    },
    {
      id: "P2P-04",
      title: "Purchase Order",
      description:
        "An approved commitment is converted into a purchase order and communicated to the selected supplier.",
    },
    {
      id: "P2P-05",
      title: "Receipt",
      description:
        "Goods or services are confirmed as received before the transaction proceeds toward financial settlement.",
    },
    {
      id: "P2P-06",
      title: "Invoice & Match",
      description:
        "Supplier invoice data is validated against the purchase order and receipt before approval for payment.",
    },
    {
      id: "P2P-07",
      title: "Payment",
      description:
        "Validated supplier obligations are released for payment according to approved terms and controls.",
    },
  ],

  analysisAreasLabel: "P2P analysis — key focus areas",

  analysisAreas: [
    {
      title: "Demand Quality",
      description:
        "Purchasing begins with a sufficiently defined need, including specifications, quantity, timing and project context.",
      keywords: [
        "Specification",
        "Quantity",
        "Need date",
        "Project / Cost code",
      ],
    },
    {
      title: "Approval Controls",
      description:
        "Approval rules should reflect financial authority, purchasing policy, budget thresholds and exception handling.",
      keywords: [
        "Authority",
        "Threshold",
        "Budget",
        "Exception",
      ],
    },
    {
      title: "Transaction Integrity",
      description:
        "PR, PO, receipt and invoice records must remain linked so commitments and actual costs can be traced.",
      keywords: [
        "PR",
        "PO",
        "Receipt",
        "Invoice",
      ],
    },
    {
      title: "Supplier & Payment Control",
      description:
        "Supplier data, commercial terms and invoice validation must be reliable before financial settlement.",
      keywords: [
        "Supplier",
        "Terms",
        "Match",
        "Payment",
      ],
    },
  ],

  threeWayMatch: {
    label: "3-Way Match",

    purchaseOrderTitle: "Purchase Order",
    purchaseOrderDescription:
      "What was authorized and ordered.",

    receiptTitle: "Receipt",
    receiptDescription:
      "What was actually received or confirmed.",

    invoiceTitle: "Supplier Invoice",
    invoiceDescription:
      "What the supplier is requesting to be paid.",

    conclusion:
      "Payment should proceed only when the transaction is sufficiently validated or an approved exception is resolved.",
  },

  controlPointsLabel: "Critical control points",

  controlPoints: [
    {
      title: "Requisition Completeness",
      description:
        "Incomplete purchasing requests create rework, sourcing delays and downstream data-quality problems.",
    },
    {
      title: "Approval Authority",
      description:
        "Approval routing must reflect defined financial authority and prevent unauthorized commitments.",
    },
    {
      title: "Receipt Confirmation",
      description:
        "Goods or services should be confirmed before invoice settlement wherever the business process requires it.",
    },
    {
      title: "Invoice Exceptions",
      description:
        "Quantity, price, supplier or receipt discrepancies need an explicit resolution path before payment.",
    },
  ],

  insights: [
    {
      title: "Process Traceability",
      description:
        "A reliable P2P process connects demand, authorization, supplier commitment, receipt and financial settlement.",
    },
    {
      title: "Data Ownership",
      description:
        "Procurement, project teams, receiving and finance each create or validate different parts of the same transaction.",
    },
    {
      title: "Exception Management",
      description:
        "The quality of the process is often determined by how missing receipts, price variances and invoice mismatches are handled.",
    },
    {
      title: "Project Cost Visibility",
      description:
        "Accurate purchasing commitments and actuals improve project cost control, forecasting and EAC / ETC analysis.",
    },
  ],

  viewerLabel: "View full P2P analysis",

  viewerCaption:
    "Procurement / Procure-to-Pay Functional Deep Dive — conceptual analysis of purchasing demand, approvals, purchase orders, receipts, invoice validation and supplier payment.",
},

dataGovernance: {
  eyebrow: "08 — DATA GOVERNANCE & CONTROL FRAMEWORK",

  title:
    "Reliable processes depend on governed data, clear ownership and controlled change.",

  intro:
    "Business systems only become reliable when the data moving through them is trusted, owned and controlled. This governance layer connects data quality, validation, security, integration monitoring, documentation and change management across CRM, ERP, project management, field service and BI.",

  principlesLabel: "Governance principles",

  principles: [
    {
      title: "Data Ownership",
      description:
        "Each critical business data element should have a clear creator, owner, validator and downstream consumer.",
      keywords: [
        "Creator",
        "Owner",
        "Validator",
        "Consumer",
      ],
    },
    {
      title: "Data Quality",
      description:
        "Completeness, accuracy, consistency and timeliness determine whether operational and analytical decisions can be trusted.",
      keywords: [
        "Completeness",
        "Accuracy",
        "Consistency",
        "Timeliness",
      ],
    },
    {
      title: "Validation Rules",
      description:
        "Business rules and controls should prevent incomplete, invalid or contradictory data from progressing downstream.",
      keywords: [
        "Required fields",
        "Business rules",
        "Thresholds",
        "Controls",
      ],
    },
    {
      title: "Security & Access",
      description:
        "Access should reflect roles, responsibilities and sensitivity while preserving the ability to perform the business process.",
      keywords: [
        "Roles",
        "Permissions",
        "MFA",
        "Least privilege",
      ],
    },
    {
      title: "Integration Monitoring",
      description:
        "Interfaces and automated flows should be monitored so failures, delays and rejected transactions are visible and actionable.",
      keywords: [
        "Interfaces",
        "Errors",
        "Retries",
        "Monitoring",
      ],
    },
    {
      title: "Documentation",
      description:
        "Process rules, data definitions, controls and support procedures need accessible and maintained documentation.",
      keywords: [
        "Standards",
        "Definitions",
        "Procedures",
        "Knowledge",
      ],
    },
    {
      title: "Change Management",
      description:
        "Changes to processes, systems and data should be assessed, communicated, tested and adopted in a controlled manner.",
      keywords: [
        "Impact",
        "Testing",
        "Communication",
        "Adoption",
      ],
    },
  ],

  ownershipLens: {
    label: "Data ownership lens",

    questions: [
      {
        title: "Who creates it?",
        description:
          "Identify the role or system responsible for initial data capture.",
      },
      {
        title: "Who owns it?",
        description:
          "Assign accountability for the business meaning, quality and lifecycle of the data.",
      },
      {
        title: "Who validates it?",
        description:
          "Define who or what control confirms that the data is fit to progress downstream.",
      },
      {
        title: "Who consumes it?",
        description:
          "Identify the processes, systems, reports and decisions that depend on the data.",
      },
    ],
  },

  criticalDataLabel: "Critical data across the ecosystem",

  criticalData: [
    {
      domain: "CRM",
      examples:
        "Customer, lead, opportunity, stage, probability, value, close date",
      downstream:
        "Commercial forecasting, project handoff, capacity planning, BI",
    },
    {
      domain: "ERP / P2P",
      examples:
        "PR, PO, supplier, receipt, invoice, payment, actual cost",
      downstream:
        "Project cost control, supplier management, finance, BI",
    },
    {
      domain: "Project Management",
      examples:
        "WBS, milestones, schedule, baseline, resources, project status",
      downstream:
        "Execution, forecasting, billing, capacity and performance management",
    },
    {
      domain: "Field Service",
      examples:
        "Asset, work order, intervention, technician activity, warranty status",
      downstream:
        "Service delivery, warranty control, customer history and BI",
    },
    {
      domain: "BI / Analytics",
      examples:
        "Actuals, backlog, EAC, ETC, revenue, cost, capacity and KPI",
      downstream:
        "Executive decisions, forecasting, performance management and planning",
    },
  ],

  controlsLabel: "Cross-system control framework",

  controls: [
    {
      title: "Prevent",
      description:
        "Reduce bad data at source through required fields, validation rules, controlled values and approval logic.",
    },
    {
      title: "Detect",
      description:
        "Identify anomalies through monitoring, exception reports, reconciliation and KPI thresholds.",
    },
    {
      title: "Correct",
      description:
        "Resolve data or transaction issues through defined ownership, escalation and remediation paths.",
    },
    {
      title: "Improve",
      description:
        "Use recurring exceptions and control failures to drive process improvement and automation opportunities.",
    },
  ],

  insights: [
    {
      title: "Governance Enables Trust",
      description:
        "Reliable reporting and automation depend on controlled upstream data, not only on downstream analytics.",
    },
    {
      title: "Ownership Reduces Ambiguity",
      description:
        "Clear accountability reduces duplicated effort, unresolved errors and inconsistent business definitions.",
    },
    {
      title: "Controls Protect Flow",
      description:
        "Preventive and detective controls help stop data-quality issues from propagating across systems.",
    },
    {
      title: "Change Must Be Governed",
      description:
        "Process and system improvements remain sustainable only when changes are tested, documented and adopted.",
    },
  ],
},

improvementFramework: {
  eyebrow: "09 — PROCESS IMPROVEMENT FRAMEWORK",

  title:
    "From observed process gaps to validated business improvements.",

  intro:
    "Process improvement is not limited to automating an existing workflow. The analysis first establishes how the process currently operates, where friction occurs, why the issue exists and which business rules must be preserved before a future-state solution is designed.",

  lifecycleLabel: "Improvement lifecycle",

  lifecycle: [
    {
      id: "01",
      title: "AS-IS",
      description:
        "Document how the process currently operates across roles, systems, data and decision points.",
    },
    {
      id: "02",
      title: "Pain Points",
      description:
        "Identify delays, rework, manual effort, unclear ownership, errors and operational friction.",
    },
    {
      id: "03",
      title: "Root Causes",
      description:
        "Distinguish symptoms from the underlying process, data, system or governance causes.",
    },
    {
      id: "04",
      title: "Business Rules",
      description:
        "Clarify the rules, controls, approvals, conditions and exceptions that govern the process.",
    },
    {
      id: "05",
      title: "Requirements",
      description:
        "Translate validated needs into clear functional, data, control and reporting requirements.",
    },
    {
      id: "06",
      title: "TO-BE",
      description:
        "Design the improved future-state process with clearer responsibilities, data flow and controls.",
    },
    {
      id: "07",
      title: "Automation",
      description:
        "Identify automation opportunities only after the future-state process and business rules are understood.",
    },
    {
      id: "08",
      title: "KPI & Baseline",
      description:
        "Define measurable indicators and a baseline so improvement can be objectively assessed.",
    },
    {
      id: "09",
      title: "Validation",
      description:
        "Confirm that the proposed solution addresses the original business problem and supports operational adoption.",
    },
  ],

  analysisAreasLabel: "Improvement analysis — key lenses",

  analysisAreas: [
    {
      title: "Process",
      description:
        "Understand sequence, handoffs, bottlenecks, waiting time and unnecessary activity.",
      keywords: [
        "Flow",
        "Handoffs",
        "Delay",
        "Rework",
      ],
    },
    {
      title: "People & Ownership",
      description:
        "Clarify who performs, approves, validates, supports and remains accountable for each step.",
      keywords: [
        "Role",
        "Owner",
        "Approval",
        "Escalation",
      ],
    },
    {
      title: "Systems & Data",
      description:
        "Identify duplicate entry, missing integrations, poor data quality and system constraints.",
      keywords: [
        "Systems",
        "Interfaces",
        "Data quality",
        "Duplication",
      ],
    },
    {
      title: "Controls & Measurement",
      description:
        "Determine whether business rules, controls and KPIs are sufficient to manage the process reliably.",
      keywords: [
        "Rules",
        "Controls",
        "KPI",
        "Baseline",
      ],
    },
  ],

  rootCauseLabel: "Root-cause analysis",

  rootCauseFlow: [
    {
      title: "Observed Symptom",
      description:
        "What users or management experience in the current process.",
    },
    {
      title: "Evidence",
      description:
        "Transaction data, interviews, process observations, exceptions and performance indicators.",
    },
    {
      title: "Root Cause",
      description:
        "The underlying process, ownership, data, system or control issue driving the symptom.",
    },
    {
      title: "Improvement Response",
      description:
        "A targeted requirement, process change, control or automation addressing the real cause.",
    },
  ],

  automationLabel: "Automation decision lens",

  automationQuestions: [
    {
      title: "Is the process understood?",
      description:
        "Automation should not hide an unclear or inconsistent process.",
    },
    {
      title: "Are the rules explicit?",
      description:
        "Decision logic, exceptions and controls must be sufficiently defined before automation.",
    },
    {
      title: "Is the input data reliable?",
      description:
        "Automation amplifies poor-quality input if upstream data is not controlled.",
    },
    {
      title: "Can the outcome be measured?",
      description:
        "Benefits should be linked to measurable improvements such as time, quality, cost or risk.",
    },
  ],

  kpiLabel: "Example improvement measures",

  kpis: [
    {
      title: "Cycle Time",
      description:
        "Elapsed time from process trigger to completed business outcome.",
    },
    {
      title: "First-Time-Right",
      description:
        "Percentage of transactions completed without correction or rework.",
    },
    {
      title: "Exception Rate",
      description:
        "Frequency of transactions requiring manual intervention or escalation.",
    },
    {
      title: "Automation Rate",
      description:
        "Share of eligible process activity completed without manual handling.",
    },
    {
      title: "Data Quality",
      description:
        "Completeness, accuracy and consistency of critical process data.",
    },
    {
      title: "Business Outcome",
      description:
        "Operational or financial effect such as cost reduction, faster delivery or improved forecast reliability.",
    },
  ],

  insights: [
    {
      title: "Automate the TO-BE",
      description:
        "Automation is most effective after process weaknesses and unnecessary steps have already been challenged.",
    },
    {
      title: "Requirements Need Evidence",
      description:
        "Functional requirements become stronger when directly connected to observed pain points and root causes.",
    },
    {
      title: "Measurement Starts Early",
      description:
        "A baseline should be established before implementation so improvement can be demonstrated objectively.",
    },
    {
      title: "Validation Closes the Loop",
      description:
        "The final solution should be assessed against the original business problem, requirements and expected outcomes.",
    },
  ],
},

conclusion: {
  eyebrow: "10 — CONCLUSION",

  title:
    "Business systems analysis is ultimately about connecting process, ownership, data, controls and technology.",

  intro:
    "This conceptual case study demonstrates how an enterprise-wide operating model can be decomposed into process, system, data and control layers. The objective is not simply to document applications, but to understand how business outcomes depend on reliable handoffs, clear responsibilities, governed data and measurable improvement.",

  takeawaysLabel: "Key takeaways",

  takeaways: [
    {
      title: "End-to-End Thinking",
      description:
        "Understand the full business flow before optimizing an isolated process or application.",
    },
    {
      title: "Functional Depth",
      description:
        "Move from enterprise architecture into detailed analysis of CRM, Procurement / P2P, controls, data and decision points.",
    },
    {
      title: "Governance & Reliability",
      description:
        "Reliable automation, reporting and forecasting depend on clear ownership, controlled data and explicit business rules.",
    },
    {
      title: "Continuous Improvement",
      description:
        "Translate observed pain points into root causes, requirements, TO-BE design, measurable KPIs and validated outcomes.",
    },
  ],

  capabilityLabel: "Capabilities demonstrated",

  capabilities: [
    "Business process mapping",
    "Functional analysis",
    "Business systems analysis",
    "ERP / CRM process understanding",
    "Data governance",
    "Requirements thinking",
    "Control design",
    "Process improvement",
    "KPI definition",
    "Cross-system integration thinking",
  ],

  closingStatement:
    "The result is a structured analytical framework that connects business needs to systems, data, controls and improvement opportunities across the enterprise.",
},

} as const;