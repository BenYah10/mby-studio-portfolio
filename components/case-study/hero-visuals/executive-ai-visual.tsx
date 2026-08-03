export default function ExecutiveAIVisual() {
  return (
    <div className="relative flex h-full flex-col">
      <div className="flex items-center justify-between gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/30">
            AI Learning System
          </p>

          <p className="mt-3 text-xl font-semibold tracking-tight text-white">
            Personalized Coaching Architecture
          </p>
        </div>

        <span className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent">
          Continuous learning
        </span>
      </div>

      <div className="my-auto py-10">
        <div className="mx-auto flex max-w-md flex-col gap-3">
          {[
            {
              label: "Knowledge Base",
              description: "Learning strategy and professional context",
            },
            {
              label: "Personal Memory",
              description: "Goals, preferences and recurring weaknesses",
            },
            {
              label: "AI Coaching Engine",
              description: "Feedback, simulation and adaptive guidance",
            },
            {
              label: "Personalized Learning",
              description: "Executive communication practice",
            },
            {
              label: "Continuous Progress",
              description: "Long-term improvement and product evolution",
            },
          ].map((item, index) => (
            <div key={item.label}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-4">
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 text-xs font-semibold text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <p className="text-sm font-semibold text-white/85">
                      {item.label}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-white/40">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>

              {index < 4 && (
                <div
                  aria-hidden="true"
                  className="mx-auto h-3 w-px bg-gradient-to-b from-accent/50 to-white/10"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 border-t border-white/10 pt-6">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-white/25">
            Product Type
          </p>

          <p className="mt-2 text-sm text-white/65">
            AI learning platform
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-white/25">
            Evolution
          </p>

          <p className="mt-2 text-sm text-white/65">
            GPT · Web · Mobile · SaaS
          </p>
        </div>
      </div>
    </div>
  );
}