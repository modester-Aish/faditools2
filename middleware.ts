import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname, hostname } = request.nextUrl
  const response = NextResponse.next()

  // Redirect www to non-www (301 permanent redirect)
  // Works for www.faditools.com -> faditools.com
  if (hostname.startsWith('www.')) {
    const url = request.nextUrl.clone()
    url.hostname = hostname.replace('www.', '')
    return NextResponse.redirect(url, 301)
  }

  // Redirect old blog URLs to clean URLs
  if (pathname.startsWith('/blog/')) {
    const slug = pathname.replace('/blog/', '')
    return NextResponse.redirect(new URL(`/${slug}`, request.url))
  }

  // Add performance headers
  response.headers.set('X-DNS-Prefetch-Control', 'on')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  // Add cache headers for static assets
  if (pathname.startsWith('/_next/static/') || pathname.startsWith('/images/')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  }

  // Add compression hint
  response.headers.set('Vary', 'Accept-Encoding')

  return response
}

export const config = {
  matcher: [
    // Match ALL paths for www redirect and security headers
    // The middleware will handle all routes including API, static files, etc.
    '/(.*)',
  ],
}
