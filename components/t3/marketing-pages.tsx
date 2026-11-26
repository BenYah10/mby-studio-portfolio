/** MBY Studio T3 — six cohesive page compositions with localized source content. */
import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { routePaths, getCaseStudyPath } from "@/i18n/routes";
import { projects } from "@/content/projects";
import { t3 } from "@/content/t3";
import { SiteShell } from "./site-shell";
import { ContactForm } from "./contact-form";
import { RecommendationsSection } from "./recommendations-section";
export type MarketingPage="home"|"services"|"work"|"about"|"recommendations"|"contact";
function Buttons({locale}:{locale:Locale}){const c=t3[locale];return <div className="t3-actions"><Link className="t3-button" href={routePaths.work[locale]}>{c.seeWork}</Link><Link className="t3-button t3-button-secondary" href={routePaths.contact[locale]}>{c.talk}</Link></div>;}
function WorkGrid({locale}:{locale:Locale}){const c=t3[locale];const ordered=[...projects].filter(p=>p.caseStudyAvailable).sort((a,b)=>Number(b.slug==="manufacturing-business-systems-mapping")-Number(a.slug==="manufacturing-business-systems-mapping"));return <div className="t3-cards">{ordered.map(p=><article className="t3-card" key={p.slug}>{p.media?.image&&<Image className="t3-visual" src={(locale==="fr"?p.media.imageFr:p.media.imageEn)||p.media.image} width={600} height={338} alt={p.media.alt}/>}<p className="t3-eyebrow">{p.slug==="manufacturing-business-systems-mapping"?(locale==="fr"?"Étude conceptuelle":"Conceptual study"):p.category}</p><h3>{p.title}</h3>{p.slug==="manufacturing-business-systems-mapping"&&<p>{c.disclaimer}</p>}<Link href={getCaseStudyPath(p.slug,locale)}>{c.caseStudy} →</Link></article>)}</div>}
export async function MarketingPages({locale,page}:{locale:Locale;page:MarketingPage}){
 const c=t3[locale];const meta=page==="home"?null:c.pages[page];
 return <SiteShell locale={locale}><main id="main-content">
 {page==="home"?<><section className="t3-hero"><div className="t3-container t3-hero-grid"><div><p className="t3-eyebrow">{c.heroEyebrow}</p><h1>Mohamed<br/>Ben Yahmed</h1><p className="t3-eyebrow">{c.tagline}</p><p className="t3-intro">{c.introduction}</p><p className="t3-small">{c.location}</p><Buttons locale={locale}/></div><div className="t3-portrait-frame"><div className="t3-portrait-photo"><Image src="/images/portrait/mohamed-ben-yahmed.webp" alt={locale === "fr" ? "Portrait professionnel de Mohamed Ben Yahmed" : "Professional portrait of Mohamed Ben Yahmed"} fill sizes="(max-width: 690px) 176px, (max-width: 990px) 232px, 288px" priority className="t3-portrait-image" /></div></div></div></section><section className="t3-section"><div className="t3-container"><p className="t3-eyebrow">{c.pages.services.eyebrow}</p><h2>{c.pages.services.title}</h2><div className="t3-cards">{c.capabilities.map(item=><article className="t3-card" key={item.title}><h3>{item.title}</h3><p>{item.description}</p></article>)}</div></div></section><section className="t3-section t3-section-soft"><div className="t3-container"><p className="t3-eyebrow">{c.pages.work.eyebrow}</p><h2>{c.pages.work.title}</h2><WorkGrid locale={locale}/></div></section></>:
 <><section className="t3-page-head"><div className="t3-container"><p className="t3-eyebrow">{meta!.eyebrow}</p><h1>{meta!.title}</h1><p className="t3-intro">{meta!.lead}</p>

  {/* M08.05 — Recommendation submission CTA */}
  {page === "recommendations" &&
    (process.env.NODE_ENV === "development" ||
      process.env.NEXT_PUBLIC_MBY_RECOMMENDATIONS_ENABLED === "true") && (
      <div className="t3-recommendations-top-cta">
        <Link
          className="t3-button"
          href={routePaths.recommendationSubmit[locale]}
        >
          {locale === "fr"
            ? "Soumettre une recommandation"
            : "Submit a recommendation"}
        </Link>
      </div>
    )}

  </div></section><section className="t3-section"><div className="t3-container">{
 page==="services"?<><div className="t3-cards">{c.capabilities.map(item=><article className="t3-card" key={item.title}><h3>{item.title}</h3><p>{item.description}</p></article>)}</div><Buttons locale={locale}/></>:
 page==="work"?<WorkGrid locale={locale}/>:
 page==="about"?<><h2>{locale==="fr"?"Parcours et évolution":"Professional journey"}</h2><ol className="t3-steps">{c.story.map(item=><li key={item}>{item}</li>)}</ol><Buttons locale={locale}/></>:
 page==="recommendations"?<RecommendationsSection locale={locale}/>:
 <ContactForm locale={locale}/>
 }</div></section></>}
 </main></SiteShell>;
}
