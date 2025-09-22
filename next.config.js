/** @type {import('next').NextConfig} */
const nextConfig = {
  // App Router / experimental optimizations
  experimental: {
    forceSwcTransforms: true,
  },

  // Webpack tweaks for Windows / fallback fixes
  webpack: (config, { isServer }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
    };

    if (!isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: ['**/node_modules', '**/.git', '**/.next'],
      };
    }

    return config;
  },

  // Minify JS/CSS using SWC
  swcMinify: true,

  // Image optimization for external domains
  images: {
    domains: ['faditools.com'],  // yahan tumhara tunnel domain
    unoptimized: process.env.NODE_ENV === 'development',
  },

  // Standalone output for production / easier deployment
  output: 'standalone',

  // Disable source maps for Windows
  productionBrowserSourceMaps: false,

  // ✅ Cloudflare Tunnel / Subdomain fix
  basePath: '',  // agar subpath pe deploy karna ho, yahan add karo
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://faditools.com' : '',
};

module.exports = nextConfig;
