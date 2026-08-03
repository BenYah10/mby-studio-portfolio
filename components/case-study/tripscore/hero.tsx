import Image from "next/image";

import type { Project } from "@/content/projects";
import type { CaseStudy } from "@/types/case-study";

type TripScoreHeroProps = {
  project: Project;
  caseStudy: CaseStudy;
};

export default function TripScoreHero({
  project,
  caseStudy,
}: TripScoreHeroProps) {
  return (
    <header className="border-b border-white/10 pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20">
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch lg:gap-16">
        <div className="flex flex-col">
          <div className="flex items-center gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
              {project.category}
            </p>

            <span
              aria-hidden="true"
              className="h-px w-10 bg-white/15"
            />
          </div>

          <h1 className="mt-8 text-[clamp(3rem,6vw,6rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-white">
            {project.title}
          </h1>

          <p className="mt-8 max-w-3xl text-[clamp(1.5rem,2.7vw,2.35rem)] font-medium leading-[1.2] tracking-[-0.03em] text-white/85">
            {caseStudy.headline}
          </p>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/55">
            {caseStudy.introduction}
          </p>

          <dl className="mt-auto grid gap-y-8 border-t border-white/10 pt-8 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-3">
            <div>
              <dt className="text-xs font-medium uppercase tracking-[0.18em] text-white/30">
                Role
              </dt>

              <dd className="mt-3 text-sm leading-6 text-white/75">
                {project.role}
              </dd>
            </div>

            {caseStudy.timeline && (
              <div>
                <dt className="text-xs font-medium uppercase tracking-[0.18em] text-white/30">
                  Timeline
                </dt>

                <dd className="mt-3 text-sm leading-6 text-white/75">
                  {caseStudy.timeline}
                </dd>
              </div>
            )}

            <div>
              <dt className="text-xs font-medium uppercase tracking-[0.18em] text-white/30">
                Status
              </dt>

              <dd className="mt-3 text-sm leading-6 text-white/75">
                {project.status}
              </dd>
            </div>
          </dl>
        </div>

        <div className="relative min-h-[34rem] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] p-3 sm:p-4">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/15 blur-[120px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-violet-500/10 blur-[120px]"
          />

          <div className="relative h-full min-h-[32rem] overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#020817]">
            <Image
              src="/images/projects/tripscore/TripScore-AI-Journey-Engine.png"
              alt="TripScore AI Journey Engine showing personalized travel discovery, matching, itinerary building and refinement"
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-contain"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {project.capabilities.map((capability) => (
          <span
            key={capability}
            className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white/55"
          >
            {capability}
          </span>
        ))}
      </div>
    </header>
  );
}