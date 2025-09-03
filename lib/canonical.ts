export function generateCanonicalUrl(pathname: string): string {
  // Remove query parameters from the path
  const cleanPath = pathname.split('?')[0]
  
  // Ensure the path starts with /
  const normalizedPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`
  
  // Generate the canonical URL
  return `https://faditools.com${normalizedPath}`
}

export function generateCanonicalUrlFromSlug(slug: string): string {
  // For dynamic routes, construct the full path
  const path = `/products/${slug}`
  return generateCanonicalUrl(path)
}
