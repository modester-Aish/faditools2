/** @type {import('next').NextConfig} */
const nextConfig = {
  // App Router optimizations
  
  // Increase static page generation timeout for API-heavy pages like sitemaps
  staticPageGenerationTimeout: 120, // 120 seconds (default is 60)
  
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
    
    // Advanced optimization for maximum performance
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 244000,
          cacheGroups: {
            ...config.optimization.splitChunks?.cacheGroups,
            // Critical CSS
            critical: {
              name: 'critical',
              test: /\.(css|scss)$/,
              chunks: 'all',
              enforce: true,
              priority: 20,
            },
            // Vendor libraries
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 15,
              reuseExistingChunk: true,
              enforce: true,
            },
            // React and Next.js specific
            react: {
              test: /[\\/]node_modules[\\/](react|react-dom|next)[\\/]/,
              name: 'react',
              chunks: 'all',
              priority: 18,
              enforce: true,
            },
            // Mobile-specific chunks
            mobile: {
              test: /[\\/]components[\\/].*\.(js|jsx|ts|tsx)$/,
              name: 'mobile',
              chunks: 'all',
              priority: 12,
              enforce: true,
            },
            // Common components
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 10,
              reuseExistingChunk: true,
              enforce: true,
            },
            // Default chunks
            default: {
              name: 'default',
              minChunks: 1,
              chunks: 'all',
              priority: 5,
              reuseExistingChunk: true,
            },
          },
        },
        usedExports: true,
        sideEffects: false,
        // Tree shaking optimization
        providedExports: true,
        concatenateModules: true,
        // Minimize bundle size
        minimize: true,
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
  
  // Enable modern features and performance optimizations
  experimental: {
    forceSwcTransforms: true,
    esmExternals: true,
    optimizePackageImports: ['@/components', '@/lib'],
    // Enable advanced optimizations
    optimizeCss: true,
    serverComponentsExternalPackages: [],
    // Removed bundlePagesRouterDependencies - not supported by Turbopack
  },
  
  // Image optimization
  images: {
    domains: ['app.faditools.com', 'images.unsplash.com', 'img.icons8.com', 'cdn-icons-png.flaticon.com', 'upload.wikimedia.org'],
    unoptimized: process.env.NODE_ENV === 'development',
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 year cache
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Optimized sizes for mobile-first approach
    deviceSizes: [320, 420, 768, 1024, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Enable modern image formats for better compression
    loader: 'default',
  },
  
  // Output configuration for better deployment
  output: 'standalone',
  
  // Headers for better caching and performance
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
      // Optimize CSS files for better performance
      {
        source: '/_next/static/css/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
          {
            key: 'Link',
            value: '</_next/static/css/(.*)>; rel=preload; as=style'
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
      },
      // Cache static data files
      {
        source: '/data/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=43200'
          }
        ]
      },
      // Mobile-specific headers
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
          {
            key: 'Vary',
            value: 'Accept-Encoding'
          }
        ]
      },
      // Optimize for mobile
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
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
