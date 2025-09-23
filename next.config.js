const nextConfig = {
  experimental: {
    forceSwcTransforms: true,
  },

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

  swcMinify: true,

  images: {
    domains: ['faditools.com'],
    unoptimized: process.env.NODE_ENV === 'development',
  },

  output: 'standalone',
  productionBrowserSourceMaps: false,

  // ✅ Important: Hardcode tunnel domain
  assetPrefix: 'https://faditools.com',
};

module.exports = nextConfig;
