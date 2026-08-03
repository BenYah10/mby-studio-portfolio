type OpportunitySectionProps = {
  number: number;
  title: string;
  summary: string;
  points: string[];
};

export default function OpportunitySection({
  number,
  title,
  summary,
  points,
}: OpportunitySectionProps) {
  return (
    <section className="border-t border-white/10 pt-20">
      <div className="grid gap-12 lg:grid-cols-[140px_1fr]">
        <div>
          <p className="text-5xl font-semibold tracking-[-0.08em] text-white/20">
            {String(number).padStart(2, "0")}
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
            The Opportunity
          </p>

          <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white">
            {title}
          </h2>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/60">
            {summary}
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {points.map((point) => (
              <div
                key={point}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <p className="text-white/70">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}