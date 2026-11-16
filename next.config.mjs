
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
};

export default nextConfig;
