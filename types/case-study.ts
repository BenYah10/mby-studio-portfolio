export type CaseStudyMetric = {
  value: string;
  label: string;
  description?: string;
};

export type CaseStudySection = {
  id: string;
  title: string;
  eyebrow?: string;
  paragraphs: string[];
  highlights?: string[];
};

export type CaseStudyLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type CaseStudyLayout = {
  systemDesign?: boolean;
  executionTimeline?: boolean;
  resultsDashboard?: boolean;
  roadmap?: boolean;
};

export type CaseStudy = {
  projectSlug: string;
  headline: string;
  introduction: string;
  timeline?: string;
  technologies: string[];
  layout?: CaseStudyLayout;
  metrics?: CaseStudyMetric[];
  sections: CaseStudySection[];
  nextSteps?: string[];
  links?: CaseStudyLink[];
};