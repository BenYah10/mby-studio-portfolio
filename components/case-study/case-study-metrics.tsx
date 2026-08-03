import type { CaseStudyMetric } from "@/types/case-study";

type CaseStudyMetricsProps = {
  metrics: CaseStudyMetric[];
};

export default function CaseStudyMetrics({
  metrics,
}: CaseStudyMetricsProps) {
  return (
    <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {metrics.map((metric) => (
        <article
          key={metric.label}
          className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6"
        >
          <p className="text-3xl font-bold text-white">
            {metric.value}
          </p>

          <h3 className="mt-2 text-sm font-semibold uppercase tracking-wide text-sky-400">
            {metric.label}
          </h3>

          {metric.description && (
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              {metric.description}
            </p>
          )}
        </article>
      ))}
    </section>
  );
}