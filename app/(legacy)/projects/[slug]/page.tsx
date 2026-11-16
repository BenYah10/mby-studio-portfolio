import { notFound } from "next/navigation";

import { projects } from "@/content/projects";
import { getCaseStudy } from "@/content/case-studies";

import CaseStudyLayout from "@/components/case-study/case-study-layout";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;

  const project = projects.find(
    (project) => project.slug === slug
  );

  const caseStudy = getCaseStudy(slug);

  if (!project || !caseStudy) {
    notFound();
  }

  return (
    <CaseStudyLayout
      project={project}
      caseStudy={caseStudy}
    />
  );
}