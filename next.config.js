/** @type {import('next').NextConfig} */
const nextConfig = {
  // App Router optimizations
  
  // Compiler optimizations for modern browsers
  // Note: removeConsole is not compatible with Turbopack
  // compiler: {
  //   removeConsole: process.env.NODE_ENV === 'production',
  // },
  
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
    
    // CSS optimization for better performance
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            ...config.optimization.splitChunks?.cacheGroups,
            styles: {
              name: 'styles',
              test: /\.(css|scss)$/,
              chunks: 'all',
              enforce: true,
            },
          },
        },
      }
    }
    
    return config
  },
  
  // Optimize for production
  swcMinify: true,
  
  // Enable modern features
  experimental: {
    forceSwcTransforms: true,
    esmExternals: true,
  },
  
  // Image optimization
  images: {
    domains: ['app.faditools.com'],
    unoptimized: process.env.NODE_ENV === 'development',
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Output configuration for better deployment
  output: 'standalone',
  
  // Headers for better caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          }
        ]
      },
      {
        source: '/favicon.ico',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/favicon.svg',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ]
  },
  
  // Disable source maps for Windows compatibility
  productionBrowserSourceMaps: false,
  
  // No redirects - let old URLs return 404
  // async redirects() {
  //   return []
  // },
}

module.exports = nextConfig
