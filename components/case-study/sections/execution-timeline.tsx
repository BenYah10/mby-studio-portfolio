import type { Locale } from "@/i18n/config";
type ExecutionTimelineProps = {
  number: string;
  title: string;
  locale?: Locale;
};

const phases = [
  {
    title: "Product Vision",
    description:
      "Define the product vision, target users and business opportunity.",
  },
  {
    title: "User Requirements (URS)",
    description:
      "Capture functional needs, constraints and expected user experience.",
  },
  {
    title: "Product Requirements (PRD)",
    description:
      "Translate business expectations into measurable product specifications.",
  },
  {
    title: "System Architecture",
    description:
      "Design the functional modules, interfaces and control logic.",
  },
  {
    title: "Engineering Validation",
    description:
      "Review risks, quality gates and technical feasibility.",
  },
  {
    title: "Prototype",
    description:
      "Build and validate the first integrated system.",
  },
  {
    title: "Pilot Deployment",
    description:
      "Prepare operational testing in a real environment.",
  },
];

const phasesFr = [
  { title: "Vision produit", description: "Préciser le concept, les utilisateurs visés et l’opportunité d’affaires." },
  { title: "Besoins utilisateurs (URS)", description: "Recueillir les besoins fonctionnels, les contraintes et l’expérience attendue." },
  { title: "Exigences produit (PRD)", description: "Traduire les attentes métier en spécifications mesurables." },
  { title: "Architecture système", description: "Définir les modules, interfaces et logiques de contrôle." },
  { title: "Validation d’ingénierie", description: "Évaluer les risques, les jalons qualité et la faisabilité technique." },
  { title: "Prototype", description: "Construire et valider un premier ensemble intégré." },
  { title: "Déploiement pilote", description: "Préparer des essais opérationnels en situation réelle." },
];

export default function ExecutionTimeline({
  number,
  title,
  locale = "en",
}: ExecutionTimelineProps) {
  return (
    <section className="border-t border-white/10 pt-20">
      <div className="grid gap-12 lg:grid-cols-[140px_1fr]">
        <p className="text-5xl font-semibold tracking-[-0.08em] text-white/20">
          {number}
        </p>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-400">
            {locale === "fr" ? "Exécution" : "Execution"}
          </p>

          <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white">
            {title}
          </h2>

          <div className="mt-16 space-y-6">
            {(locale === "fr" ? phasesFr : phases).map((phase) => (
              <div
                key={phase.title}
                className="flex gap-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:border-sky-400/30 hover:bg-white/[0.04]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-sky-400/40 bg-sky-400/10">
                  <div className="h-3 w-3 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,.9)]" />
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {phase.title}
                  </h3>

                  <p className="mt-2 max-w-2xl leading-7 text-white/60">
                    {phase.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}