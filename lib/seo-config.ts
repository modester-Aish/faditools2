/**
 * SEO Configuration for FadiTools
 * Centralized SEO settings and constants
 */

export const SEO_CONFIG = {
  // Site Information
  siteName: 'FadiTools',
  siteUrl: 'https://faditools.com',
  siteDescription: 'Access 50+ premium SEO tools including AHREF$, SEMRU$H, Moz Pro at 90% discount. Trusted by 10,000+ marketers worldwide.',
  
  // Default SEO Settings
  defaultTitle: 'FadiTools - Premium SEO Tools & Digital Marketing Solutions',
  defaultDescription: 'Access 50+ premium SEO tools including AHREF$, SEMRU$H, Moz Pro at 90% discount. Trusted by 10,000+ marketers. 24/7 support, 99.9% uptime.',
  defaultKeywords: [
    'SEO tools',
    'AHREF$ group buy',
    'SEMRU$H discount',
    'digital marketing tools',
    'keyword research',
    'backlink analysis',
    'competitor analysis',
    'SEO software',
    'marketing automation',
    'content optimization',
    'Moz Pro',
    'group buy tools',
    'premium SEO tools',
    'affordable SEO tools'
  ],
  
  // Social Media
  social: {
    twitter: '@faditools',
    facebook: 'faditools',
    linkedin: 'faditools',
    instagram: 'faditools'
  },
  
  // Verification Codes (Replace with actual codes)
  verification: {
    google: 'FLAscQ24VbDi1GaSCy0mIVHSFr6L8GOTXEK4yBN1tVk',
    bing: 'CA9C80743C5C403924230A48CF321E7C',
    baidu: 'YOUR_BAIDU_VERIFICATION_CODE',
    yandex: 'YOUR_YANDEX_VERIFICATION_CODE'
  },
  
  // Analytics
  analytics: {
    googleAnalytics: 'G-LZWMMJVGJD',
    googleTagManager: 'GTM-XXXXXXX',
    facebookPixel: 'YOUR_FACEBOOK_PIXEL_ID'
  },
  
  // Image Assets
  images: {
    logo: '/logo.png',
    defaultOgImage: '/seo-tools-illustration.svg',
    favicon: '/faditools-favicon.svg',
    appleTouchIcon: '/faditools-favicon.svg'
  },
  
  // Contact Information
  contact: {
    email: 'support@faditools.com',
    phone: '+1-XXX-XXX-XXXX',
    address: 'Your Business Address',
    hours: '24/7 Support'
  },
  
  // Business Information
  business: {
    type: 'Organization',
    name: 'FadiTools',
    description: 'Premium SEO Tools & Digital Marketing Solutions Provider',
    foundedYear: '2023',
    industry: 'Digital Marketing',
    location: 'Global'
  }
}

// SEO Page Templates
export const SEO_TEMPLATES = {
  home: {
    title: 'FadiTools - Premium SEO Tools & Digital Marketing Solutions | Save 90% on AHREF$, SEMRU$H & More',
    description: 'Access 50+ premium SEO tools including AHREF$, SEMRU$H, Moz Pro at 90% discount. Trusted by 10,000+ marketers. 24/7 support, 99.9% uptime. Start your SEO journey today!',
    keywords: ['SEO tools', 'AHREF$ group buy', 'SEMRU$H discount', 'digital marketing tools', 'keyword research', 'backlink analysis']
  },
  
  tools: {
    title: 'SEO Tools | Premium Digital Marketing Tools | FadiTools',
    description: 'Browse our comprehensive collection of premium SEO tools. Get access to AHREF$, SEMRU$H, Moz Pro, and 50+ other tools at 90% discount.',
    keywords: ['SEO tools', 'digital marketing tools', 'AHREF$', 'SEMRU$H', 'Moz Pro', 'keyword research tools']
  },
  
  packages: {
    title: 'SEO Tool Packages | Affordable Group Buy Solutions | FadiTools',
    description: 'Save even more with our SEO tool packages. Get multiple premium tools in one affordable package. Perfect for agencies and serious marketers.',
    keywords: ['SEO packages', 'group buy tools', 'affordable SEO tools', 'SEO bundles', 'digital marketing packages']
  },
  
  blog: {
    title: 'SEO Blog | Digital Marketing Tips & Guides | FadiTools',
    description: 'Stay updated with the latest SEO trends, digital marketing tips, and comprehensive guides. Learn how to maximize your online presence.',
    keywords: ['SEO blog', 'digital marketing tips', 'SEO guides', 'marketing strategies', 'SEO trends']
  },
  
  products: {
    title: 'SEO Products | Premium Digital Marketing Solutions | FadiTools',
    description: 'Discover our range of premium SEO products and digital marketing solutions. Get access to industry-leading tools at unbeatable prices.',
    keywords: ['SEO products', 'digital marketing solutions', 'premium SEO tools', 'online marketing tools']
  }
}

// URL Structure
export const URL_STRUCTURE = {
  home: '/',
  tools: '/tools',
  packages: '/packages',
  blog: '/blog',
  products: '/products',
  pages: '/pages',
  about: '/about',
  contact: '/contact',
  privacy: '/privacy-policy',
  terms: '/terms-of-service',
  sitemap: '/sitemap.xml',
  robots: '/robots.txt'
}

// Meta Tags Configuration
export const META_CONFIG = {
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  themeColor: '#D4B896',
  msTileColor: '#D4B896',
  applicationName: 'FadiTools',
  appleMobileWebAppTitle: 'FadiTools',
  appleMobileWebAppCapable: 'yes',
  appleMobileWebAppStatusBarStyle: 'default',
  formatDetection: 'telephone=no'
}

// Performance Configuration
export const PERFORMANCE_CONFIG = {
  preconnectDomains: [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://app.faditools.com',
    'https://images.unsplash.com',
    'https://img.icons8.com',
    'https://cdn-icons-png.flaticon.com',
    'https://upload.wikimedia.org',
    'https://cdn.jsdelivr.net'
  ],
  
  dnsPrefetchDomains: [
    'https://app.faditools.com',
    'https://images.unsplash.com',
    'https://img.icons8.com',
    'https://cdn-icons-png.flaticon.com',
    'https://upload.wikimedia.org',
    'https://cdn.jsdelivr.net'
  ]
}

// Structured Data Templates
export const STRUCTURED_DATA_TEMPLATES = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FadiTools',
    url: 'https://faditools.com',
    logo: 'https://faditools.com/logo.png',
    description: 'Premium SEO Tools & Digital Marketing Solutions at 90% discount',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: 'English',
      email: 'support@faditools.com'
    },
    sameAs: [
      'https://twitter.com/faditools',
      'https://facebook.com/faditools',
      'https://linkedin.com/company/faditools'
    ]
  },
  
  website: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'FadiTools',
    url: 'https://faditools.com',
    description: 'Access 50+ premium SEO tools including AHREF$, SEMRU$H, Moz Pro at 90% discount',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://faditools.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  }
}
