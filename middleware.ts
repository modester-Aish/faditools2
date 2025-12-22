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
    return NextResponse.redirect(new URL(`/${slug}`, request.url), 301)
  }

  // Redirect old tools URLs to clean URLs (remove /tools/ prefix)
  if (pathname.startsWith('/tools/') && pathname !== '/tools') {
    const slug = pathname.replace('/tools/', '')
    return NextResponse.redirect(new URL(`/${slug}`, request.url), 301)
  }

  // Redirect old packages URLs to clean URLs (remove /packages/ prefix)
  if (pathname.startsWith('/packages/') && pathname !== '/packages') {
    const slug = pathname.replace('/packages/', '')
    return NextResponse.redirect(new URL(`/${slug}`, request.url), 301)
  }

  // Redirect index.php to homepage
  if (pathname === '/index.php' || pathname === '/index.php/') {
    return NextResponse.redirect(new URL('/', request.url), 301)
  }

  // Add performance headers
  response.headers.set('X-DNS-Prefetch-Control', 'on')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  // Performance optimization headers
  response.headers.set('X-Robots-Tag', 'index, follow')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')

  // Add cache headers for static assets
  if (pathname.startsWith('/_next/static/') || pathname.startsWith('/images/')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  } else if (pathname.startsWith('/api/')) {
    // API routes - shorter cache
    response.headers.set('Cache-Control', 'public, max-age=300, s-maxage=300')
  } else if (pathname.endsWith('.css') || pathname.endsWith('.js')) {
    // CSS/JS files
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  } else if (pathname.endsWith('.svg') || pathname.endsWith('.png') || pathname.endsWith('.jpg') || pathname.endsWith('.jpeg') || pathname.endsWith('.webp')) {
    // Image files
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  } else {
    // HTML pages - moderate cache
    response.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=3600')
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
