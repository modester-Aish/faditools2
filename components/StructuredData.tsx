import React from 'react'

// Organization Schema for company information
export const generateOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "FadiTools",
    "alternateName": "Fadi Tools",
    "url": "https://faditools.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://faditools.com/faditools-favicon.svg",
      "width": 512,
      "height": 512
    },
    "description": "Best SEO tools group buy platform. Premium SEO tools and digital marketing solutions at 90% discount. Access AHREF$, SEMRU$H, Moz Pro and 50+ tools.",
    "foundingDate": "2023",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-0123",
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
  }
}

// Website Schema with search functionality
export const generateWebSiteSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "FadiTools",
    "alternateName": "Fadi Tools",
    "url": "https://faditools.com",
    "description": "Best SEO tools group buy platform. Access 50+ premium SEO tools including AHREF$, SEMRU$H, Moz Pro at 90% discount",
    "publisher": {
      "@type": "Organization",
      "name": "FadiTools",
      "logo": {
        "@type": "ImageObject",
        "url": "https://faditools.com/faditools-favicon.svg"
      }
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://faditools.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  }
}

// Product Schema for SEO tools
export const generateProductSchema = (product: {
  name: string
  description: string
  price?: string
  originalPrice?: string
  image?: string
  availability?: string
  category?: string
  brand?: string
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.image || "https://faditools.com/faditools-favicon.svg",
    "brand": {
      "@type": "Brand",
      "name": product.brand || "FadiTools"
    },
    "category": product.category || "SEO Tools",
    "offers": {
      "@type": "Offer",
      "url": `https://faditools.com/${product.name.toLowerCase().replace(/\s+/g, '-')}`,
      "priceCurrency": "USD",
      "price": product.price || "9.99",
      "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      "availability": `https://schema.org/${product.availability || 'InStock'}`,
      "seller": {
        "@type": "Organization",
        "name": "FadiTools"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "1000",
      "bestRating": "5",
      "worstRating": "1"
    }
  }
}

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

// Breadcrumb Schema for navigation
export const generateBreadcrumbSchema = (breadcrumbs: Array<{
  name: string
  url: string
}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
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
