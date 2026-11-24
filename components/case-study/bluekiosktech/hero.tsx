import Image from "next/image";

import type { Project } from "@/content/projects";
import type { Locale } from "@/i18n/config";
import { caseStudyLabels, projectDisplay } from "@/i18n/case-study-ui";
import type { CaseStudy } from "@/types/case-study";

type BlueKioskTechHeroProps = {
  project: Project;
  caseStudy: CaseStudy;
  locale?: Locale;
};

export default function BlueKioskTechHero({
  project,
  caseStudy,
  locale = "en",
}: BlueKioskTechHeroProps) {
  const labels = caseStudyLabels[locale];
  const display = projectDisplay(project, locale);
  return (
    <header className="border-b border-white/10 pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20">
      <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-14">
        {/* Colonne gauche */}
        <div className="flex flex-col">
          <div className="flex items-center gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
              {display.category}
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

          <dl className="mt-10 grid gap-y-8 border-t border-white/10 pt-8 sm:grid-cols-3 sm:gap-x-8">
            <div>
              <dt className="text-xs font-medium uppercase tracking-[0.18em] text-white/30">
                {labels.role}
              </dt>

              <dd className="mt-3 text-sm leading-6 text-white/75">
                {display.role}
              </dd>
            </div>

            {caseStudy.timeline && (
              <div>
                <dt className="text-xs font-medium uppercase tracking-[0.18em] text-white/30">
                  {labels.timeline}
                </dt>

                <dd className="mt-3 text-sm leading-6 text-white/75">
                  {caseStudy.timeline}
                </dd>
              </div>
            )}

            <div>
              <dt className="text-xs font-medium uppercase tracking-[0.18em] text-white/30">
                {labels.status}
              </dt>

              <dd className="mt-3 text-sm leading-6 text-white/75">
                {display.status}
              </dd>
            </div>
          </dl>
        </div>

        {/* Colonne droite */}
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] p-3 sm:p-4">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-500/15 blur-[120px]"
          />

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#020817] shadow-[0_30px_100px_rgba(0,0,0,0.45)]">
            <Image
              src="/images/projects/bluekiosktech/VUCS-mby-portfolio-v1.png"
              alt={locale === "fr" ? "Processus de désinfection VUCS : vapeur, UV-C et séchage filtré (visuel contenant des libellés anglais)." : "BlueKioskTech VUCS sanitization process combining steam, UV-C treatment and filtered drying"}
              fill
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover object-center"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.035] via-transparent to-blue-500/[0.035]"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {display.capabilities.map((capability) => (
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