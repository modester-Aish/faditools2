const nextConfig = {
  experimental: {
    forceSwcTransforms: true,
  },
  webpack: (config, { isServer }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
    }

    if (!isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: ['**/node_modules', '**/.git', '**/.next'],
      }
    }

    return config
  },
  swcMinify: true,
  images: {
    domains: ['app.faditools.com'],
    unoptimized: process.env.NODE_ENV === 'development',
  },
  output: 'standalone',
  productionBrowserSourceMaps: false,

  // ✅ Add these two for Cloudflare Tunnel / subdomain
  basePath: '',          // agar subpath pe deploy ho to uska name yahan
  assetPrefix: process.env.NODE_ENV === 'production' ? '/' : '',
}

module.exports = nextConfig
