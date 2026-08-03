type CaseStudySectionProps = {
  number: string;
  eyebrow?: string;
  title: string;
  paragraphs: string[];
  highlights?: string[];
};

export default function CaseStudySection({
  number,
  eyebrow,
  title,
  paragraphs,
  highlights,
}: CaseStudySectionProps) {
  return (
  <section className="border-t border-white/10 pt-12 sm:pt-16">
    <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[120px_1fr] lg:gap-12">
      <div>
        <p className="text-5xl font-semibold tracking-[-0.08em] text-white/20">
           {number}
        </p>
      </div>

      <div className="space-y-6">
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
            {eyebrow}
          </p>
        )}

        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {title}
        </h2>

        <div className="space-y-5">
          {paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="text-lg leading-8 text-white/65"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {highlights && highlights.length > 0 && (
          <ul className="grid gap-4 sm:grid-cols-2">
            {highlights.map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm leading-6 text-white/70"
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  </section>
);
}