/** @type {import('next').NextConfig} */
const nextConfig = {
  // App Router optimizations
  experimental: {
    // Enable modern features
    forceSwcTransforms: true,
  },
  
  // Webpack configuration for better Windows compatibility
  webpack: (config, { isServer }) => {
    // Fix Windows path issues
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
    }
    
    // Optimize for Windows file system
    if (!isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: [
          '**/node_modules',
          '**/.git',
          '**/.next',
        ],
      }
    }
    
    return config
  },
  
  // Optimize for production
  swcMinify: true,
  
  // Image optimization
  images: {
    domains: ['app.faditools.com'],
    unoptimized: process.env.NODE_ENV === 'development',
  },
  
  // Output configuration for better deployment
  output: 'standalone',
  
  // Disable source maps for Windows compatibility
  productionBrowserSourceMaps: false,
  
  // No redirects - let old URLs return 404
  // async redirects() {
  //   return []
  // },
}

module.exports = nextConfig
