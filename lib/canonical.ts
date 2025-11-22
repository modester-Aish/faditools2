export function generateCanonicalUrl(pathname: string): string {
  // Remove query parameters from the path
  const cleanPath = pathname.split('?')[0]
  
  // Ensure the path starts with /
  const normalizedPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`
  
  // Remove trailing slash except for root
  const finalPath = normalizedPath === '/' ? '/' : normalizedPath.replace(/\/$/, '')
  
  // Generate the canonical URL
  return `https://faditools.com${finalPath}`
}

export function generateCanonicalUrlFromSlug(slug: string, type: 'product' | 'tool' | 'package' | 'blog' | 'page' = 'product'): string {
  // All content types use direct slug without prefix - clean URLs
  // faditools.com/slug (not faditools.com/tools/slug or faditools.com/blog/slug)
  const path = `/${slug}`
  return generateCanonicalUrl(path)
}

// Generate canonical URL for different page types
export function generateCanonicalUrlForPage(type: string, slug?: string): string {
  const baseUrl = 'https://faditools.com'
  
  switch (type) {
    case 'home':
      return `${baseUrl}/`
    case 'tools':
      return `${baseUrl}/tools`
    case 'packages':
      return `${baseUrl}/packages`
    case 'blog':
      return `${baseUrl}/blog`
    case 'products':
      return `${baseUrl}/products`
    case 'pages':
      return `${baseUrl}/pages`
    case 'testimonials':
      return `${baseUrl}/testimonials`
    case 'contact':
      return `${baseUrl}/contact`
    case 'about':
      return `${baseUrl}/about`
    default:
      return slug ? generateCanonicalUrlFromSlug(slug, 'product') : `${baseUrl}/`
  }
}

// Check if URL is canonical (no trailing slash, no query params, HTTPS)
export function isCanonicalUrl(url: string): boolean {
  const canonicalUrl = generateCanonicalUrl(url)
  return url === canonicalUrl
}
