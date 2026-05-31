import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Interne Workspace-Packages werden als Quell-TS eingebunden.
  transpilePackages: ['@gurt/ui', '@gurt/visualizations', '@gurt/data'],
  // Lint läuft als eigener Turbo-Task → Build bleibt deterministisch.
  eslint: { ignoreDuringBuilds: true },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
  },
};

export default nextConfig;
