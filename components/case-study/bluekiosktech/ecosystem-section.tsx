import {
  ArrowUpRight,
  FlaskConical,
  Globe2,
  Rocket,
} from "lucide-react";

type EcosystemLink = {
  title: string;
  domain: string;
  description: string;
  cta: string;
  href: string;
  icon: typeof Rocket;
};

const ecosystemLinks: EcosystemLink[] = [
  {
    title: "Product Experience",
    domain: "BlueKiosk.tech",
    description:
      "Discover the BlueKioskTech product vision, explore the self-service sanitization experience and share your interest through our early validation platform.",
    cta: "Explore the product",
    href: "https://bluekiosk.tech/",
    icon: Rocket,
  },
  {
    title: "Product Launch Preview",
    domain: "BlueKioskTech.ca",
    description:
      "Explore the upcoming BlueKioskTech launch, discover our market vision and follow the preparation of future pilot deployments and commercial rollout.",
    cta: "Preview the launch",
    href: "https://bluekiosktech.ca/",
    icon: Globe2,
  },
  {
    title: "Health & Knowledge Hub",
    domain: "BlueKioskTech.blog",
    description:
      "Learn why reusable bottle hygiene matters through evidence-based articles, scientific research, health awareness content and updates following the evolution of the BlueKioskTech startup.",
    cta: "Read our latest insights",
    href: "https://bluekiosktech.blog/",
    icon: FlaskConical,
  },
  
];

/**
 * Section spécialisée présentant les trois plateformes
 * qui composent l’écosystème numérique BlueKioskTech.
 *
 * Responsabilités :
 * - clarifier le rôle de chaque plateforme ;
 * - renforcer la vision produit et la stratégie de marché ;
 * - offrir des liens externes accessibles et sécurisés ;
 * - préserver l’architecture spécialisée de la case study.
 */
export default function BlueKioskTechEcosystemSection() {
  return (
    <section className="border-t border-white/10 pt-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-400">
          Beyond the Product
        </p>

        <h2 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-white">
          Explore the BlueKioskTech Ecosystem
        </h2>

        <p className="mt-8 max-w-4xl text-lg leading-8 text-white/60">
          BlueKioskTech is more than a product. It is a growing ecosystem
          that combines product innovation, public health awareness and
          market validation to support the adoption of safer reusable
          bottle habits.
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {ecosystemLinks.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex min-h-[24rem] flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-6 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.04] hover:shadow-[0_24px_80px_rgba(0,0,0,0.22)] sm:p-8"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-400/[0.06] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />

                <div className="relative z-10 flex h-full flex-col">
                  <div className="flex items-start justify-between gap-6">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.035]">
                      <Icon className="h-5 w-5 text-sky-300" />
                    </span>

                    <ArrowUpRight className="h-5 w-5 text-white/35 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                  </div>

                  <div className="mt-10">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
                      {item.title}
                    </p>

                    <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-white">
                      {item.domain}
                    </h3>

                    <p className="mt-5 text-sm leading-7 text-white/55">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-auto border-t border-white/10 pt-6">
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-white/75 transition-colors duration-300 group-hover:text-white">
                      {item.cta}
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}