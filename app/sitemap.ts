import type { MetadataRoute } from 'next';
import { publicKeys, siteOrigin, indexable } from '@/lib/seo';
import { routePaths, getCaseStudyPath } from '@/i18n/routes';
import { locales } from '@/i18n/config';
import { projects } from '@/content/projects';
import { getCaseStudy } from '@/content/case-studies';
export default function sitemap(): MetadataRoute.Sitemap {if(!indexable)return []; return [...publicKeys.filter(key=>key!=='privacy').flatMap(key=>locales.map(locale=>({url:siteOrigin+routePaths[key][locale]}))),...projects.flatMap(project=>locales.filter(locale=>Boolean(getCaseStudy(project.slug,locale))).map(locale=>({url:siteOrigin+getCaseStudyPath(project.slug,locale)})))];}
