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
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 10,
            },
          },
        },
      }
    }
    
    return config
  },
  
  // Optimize for production
  swcMinify: true,
  
  // Enable compression
  compress: true,
  
  // Power optimizations
  poweredByHeader: false,
  
  // Enable modern features
  experimental: {
    forceSwcTransforms: true,
    esmExternals: true,
    optimizePackageImports: ['@/components', '@/lib'],
  },
  
  // Image optimization
  images: {
    domains: ['app.faditools.com', 'images.unsplash.com', 'img.icons8.com', 'cdn-icons-png.flaticon.com', 'upload.wikimedia.org'],
    unoptimized: process.env.NODE_ENV === 'development',
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 year cache
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
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
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/_next/image(.*)',
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
