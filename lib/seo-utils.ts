/**
 * SEO Utilities for FadiTools
 * Enhanced SEO functions and helpers
 */

import { Metadata } from 'next'

export interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  noIndex?: boolean
  structuredData?: any
}

/**
 * Generate comprehensive SEO metadata
 */
export function generateSEOMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    canonical,
    ogImage = '/seo-tools-illustration.svg',
    ogType = 'website',
    noIndex = false,
    structuredData
  } = config

  const fullTitle = title.includes('FadiTools') ? title : `${title} | FadiTools`
  const baseUrl = 'https://faditools.com'
  const canonicalUrl = canonical ? `${baseUrl}${canonical}` : undefined

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    metadataBase: new URL(baseUrl),
    alternates: canonicalUrl ? { canonical: canonicalUrl } : undefined,
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      type: ogType,
      locale: 'en_US',
      url: canonicalUrl,
      siteName: 'FadiTools',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${title} - FadiTools`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
      creator: '@faditools',
      site: '@faditools',
    },
    other: {
      ...(structuredData && {
        'application/ld+json': JSON.stringify(structuredData),
      }),
    },
  }
}

/**
 * Generate structured data for SEO tools
 */
export function generateToolStructuredData(tool: {
  name: string
  description: string
  price: string
  category: string
  rating?: number
  reviewCount?: number
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: tool.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: tool.rating && tool.reviewCount ? {
      '@type': 'AggregateRating',
      ratingValue: tool.rating,
      reviewCount: tool.reviewCount,
    } : undefined,
    provider: {
      '@type': 'Organization',
      name: 'FadiTools',
      url: 'https://faditools.com',
    },
  }
}

/**
 * Generate structured data for blog posts
 */
export function generateBlogPostStructuredData(post: {
  title: string
  description: string
  author: string
  datePublished: string
  dateModified: string
  url: string
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'FadiTools',
      logo: {
        '@type': 'ImageObject',
        url: 'https://faditools.com/logo.png',
      },
    },
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    url: post.url,
    image: post.image || 'https://faditools.com/seo-tools-illustration.svg',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': post.url,
    },
  }
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbStructuredData(breadcrumbs: Array<{
  name: string
  url: string
}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  }
}

/**
 * Generate FAQ structured data
 */
export function generateFAQStructuredData(faqs: Array<{
  question: string
  answer: string
}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/**
 * Generate organization structured data
 */
export function generateOrganizationStructuredData() {
  return {
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
    },
    sameAs: [
      'https://twitter.com/faditools',
      'https://facebook.com/faditools',
      'https://linkedin.com/company/faditools',
    ],
  }
}

/**
 * Generate website structured data
 */
export function generateWebsiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'FadiTools',
    url: 'https://faditools.com',
    description: 'Access 50+ premium SEO tools including AHREF$, SEMRU$H, Moz Pro at 90% discount',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://faditools.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }
}

/**
 * Validate SEO metadata
 */
export function validateSEOMetadata(metadata: Metadata): string[] {
  const errors: string[] = []

  const title = typeof metadata.title === 'string' ? metadata.title : ''
  
  if (!title || title.length < 30) {
    errors.push('Title should be at least 30 characters')
  }

  const description = typeof metadata.description === 'string' ? metadata.description : ''
  
  if (!description || description.length < 120) {
    errors.push('Description should be at least 120 characters')
  }

  if (description && description.length > 160) {
    errors.push('Description should be no more than 160 characters')
  }

  return errors
}

/**
 * Generate XML sitemap entry
 */
export function generateSitemapEntry(url: string, lastModified: Date, changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' = 'weekly', priority: number = 0.5) {
  return {
    url: `https://faditools.com${url}`,
    lastModified,
    changeFrequency,
    priority,
  }
}
