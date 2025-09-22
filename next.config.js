// next.config.js
const nextConfig = {
  experimental: {
    forceSwcTransforms: true,
  },
  swcMinify: true,
  images: {
    domains: ['app.faditools.com'],
    unoptimized: process.env.NODE_ENV === 'development',
  },
  // Remove standalone for now
  // output: 'standalone',
  productionBrowserSourceMaps: false,
  webpack: (config, { isServer }) => {
    config.resolve.fallback = { ...config.resolve.fallback, fs: false, path: false };
    if (!isServer) {
      config.watchOptions = { poll: 1000, aggregateTimeout: 300, ignored: ['**/node_modules','**/.git','**/.next'] };
    }
    return config;
  },
}

module.exports = nextConfig
