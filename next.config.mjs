
/**
 * MBY Studio — Next.js configuration
 *
 * Rôle :
 * - activer le mode strict React ;
 * - conserver des URL cohérentes avec une barre oblique finale ;
 * - préparer la navigation bilingue FR/EN.
 */

 /** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  async headers() {
    return process.env.VERCEL_ENV === 'production' ? [] : [{source:'/:path*',headers:[{key:'X-Robots-Tag',value:'noindex, follow'}]}];
  },
  // T4.07.6 - Permanent redirect to French homepage.
  async redirects() {
    return [
      {
        source: "/",
        destination: "/fr/",
        permanent: true,
      },
      {source: "/projects/:slug/", destination: "/fr/projects/:slug/", permanent: true},
    ];
  },
};

export default nextConfig;
