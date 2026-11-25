import type { MetadataRoute } from 'next';
import { siteOrigin, indexable } from '@/lib/seo';
export default function robots(): MetadataRoute.Robots {return {rules:{userAgent:'*',allow:'/',disallow:'/api/'},...(indexable?{sitemap:siteOrigin+'/sitemap.xml'}:{})};}
