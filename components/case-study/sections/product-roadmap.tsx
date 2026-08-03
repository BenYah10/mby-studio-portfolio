import RoadmapTimeline from "../roadmap/RoadmapTimeline";

import type { RoadmapPhase } from "../roadmap/roadmap-types";

type ProductRoadmapProps = {
  steps?: string[];
};

const phases: RoadmapPhase[] = [
  {
    number: "01",
    title: "Product Definition",
    items: ["Vision", "URS", "PRD"],
    status: "completed",
  },
  {
    number: "02",
    title: "Engineering Design",
    items: ["Architecture", "Modules", "Safety"],
    status: "completed",
  },
  {
    number: "03",
    title: "Prototype",
    items: ["Assembly", "Integration", "Testing"],
    status: "on-hold",
    statusNote: "Pending prototype funding",
  },
  {
    number: "04",
    title: "Pilot Validation",
    items: ["KPIs", "Monitoring", "Go / No-Go"],
    status: "upcoming",
  },
  {
    number: "05",
    title: "Commercial Deployment",
    items: ["Deployment", "Operations", "Market Expansion"],
    status: "upcoming",
  },
];

export default function ProductRoadmap({
  steps: _steps,
}: ProductRoadmapProps) {
  return (
    <section className="border-t border-white/10 pt-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-400">
          Product Roadmap
        </p>

        <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Product evolution
        </h2>

        <p className="mt-8 max-w-3xl text-lg leading-8 text-white/60">
          The roadmap illustrates the evolution from product definition to
          commercial deployment through successive validation phases.
        </p>

        <div className="mt-20">
          <RoadmapTimeline phases={phases} />
        </div>
      </div>
    </section>
  );
}