import React from 'react'

const BASE_URL = 'https://faditools.com'
const DEFAULT_LOGO = `${BASE_URL}/faditools-favicon.svg`

// --- Entity builders (no @context) for use inside @graph ---

export const getOrganizationEntity = () => ({
  "@type": "Organization",
  "name": "FadiTools",
  "alternateName": "Fadi Tools",
  "url": BASE_URL,
  "logo": {
    "@type": "ImageObject",
    "url": DEFAULT_LOGO,
    "width": 512,
    "height": 512
  },
  "description": "Best SEO tools group buy platform. Premium SEO tools and digital marketing solutions at 90% discount. Access Ahrefs, SEMrush, Moz Pro and 50+ tools.",
  "foundingDate": "2023",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+447845432224",
    "contactType": "customer service",
    "availableLanguage": ["English", "Urdu"]
  },
  "sameAs": [
    "https://twitter.com/faditools",
    "https://facebook.com/faditools",
    "https://linkedin.com/company/faditools"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "US"
  }
})

export const getWebSiteEntity = () => ({
  "@type": "WebSite",
  "name": "FadiTools",
  "alternateName": "Fadi Tools",
  "url": BASE_URL,
  "description": "Best SEO tools group buy platform. Access 50+ premium SEO tools including Ahrefs, SEMrush, Moz Pro at 90% discount",
  "publisher": {
    "@type": "Organization",
    "name": "FadiTools",
    "logo": { "@type": "ImageObject", "url": DEFAULT_LOGO }
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${BASE_URL}/search?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
})

export const getBreadcrumbEntity = (breadcrumbs: Array<{ name: string; url: string }>) => ({
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbs.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
})

export interface ProductSchemaInput {
  name: string
  description: string
  slug?: string
  price?: string
  originalPrice?: string
  image?: string
  availability?: string
  category?: string
  brand?: string
}

/** Product entity for @graph: image required, sku, full description, itemCondition, aggregateRating */
export const getProductEntity = (product: ProductSchemaInput) => {
  const productUrl = product.slug ? `${BASE_URL}/${product.slug}` : `${BASE_URL}/${product.name.toLowerCase().replace(/\s+/g, '-')}`
  const priceStr = (product.price || '9.99').replace(/[^0-9.]/g, '') || '9.99'
  const image = product.image?.trim() ? (product.image.startsWith('http') ? product.image : `${BASE_URL}${product.image.startsWith('/') ? '' : '/'}${product.image}`) : DEFAULT_LOGO
  return {
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": image,
    "sku": product.slug || product.name.toLowerCase().replace(/\s+/g, '-'),
    "brand": {
      "@type": "Brand",
      "name": product.brand || "FadiTools"
    },
    "category": "SEO Tools",
    "offers": {
      "@type": "Offer",
      "url": productUrl,
      "priceCurrency": "USD",
      "price": priceStr,
      "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      "availability": `https://schema.org/${product.availability === 'outofstock' ? 'OutOfStock' : 'InStock'}`,
      "itemCondition": "https://schema.org/NewCondition",
      "seller": {
        "@type": "Organization",
        "name": "FadiTools",
        "url": BASE_URL
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "120",
      "bestRating": "5",
      "worstRating": "1"
    }
  }
}

/** Single @context + @graph — Google ko entities ka relation samajhna easy hota hai */
export const generateSchemaGraph = (entities: object[]) => ({
  "@context": "https://schema.org",
  "@graph": entities
})

// --- Legacy standalone schemas (with @context) for pages that still use multiple scripts ---

export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  ...getOrganizationEntity()
})

export const generateWebSiteSchema = () => ({
  "@context": "https://schema.org",
  ...getWebSiteEntity()
})

export const generateBreadcrumbSchema = (breadcrumbs: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  ...getBreadcrumbEntity(breadcrumbs)
})

export const generateProductSchema = (product: ProductSchemaInput) => ({
  "@context": "https://schema.org",
  ...getProductEntity(product)
})

// Article Schema for blog posts
export const generateArticleSchema = (article: {
  title: string
  description: string
  author: string
  datePublished: string
  dateModified?: string
  image?: string
  url: string
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "image": article.image || "https://faditools.com/faditools-favicon.svg",
    "author": {
      "@type": "Person",
      "name": article.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "FadiTools",
      "logo": {
        "@type": "ImageObject",
        "url": "https://faditools.com/faditools-favicon.svg"
      }
    },
    "datePublished": article.datePublished,
    "dateModified": article.dateModified || article.datePublished,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": article.url
    }
  }
}

// FAQ Schema for FAQ sections
export const generateFAQSchema = (faqs: Array<{
  question: string
  answer: string
}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }
}

// Service Schema for services
export const generateServiceSchema = (service: {
  name: string
  description: string
  provider: string
  areaServed?: string
  serviceType?: string
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "provider": {
      "@type": "Organization",
      "name": service.provider,
      "url": "https://faditools.com"
    },
    "areaServed": service.areaServed || "Worldwide",
    "serviceType": service.serviceType || "SEO Tools Access"
  }
}

// StructuredData Component
interface StructuredDataProps {
  data: object | object[]
}

export const StructuredData: React.FC<StructuredDataProps> = ({ data }) => {
  const jsonLd = Array.isArray(data) ? data : [data]
  
  return (
    <>
      {jsonLd.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item, null, 0)
          }}
        />
      ))}
    </>
  )
}

export default StructuredData
