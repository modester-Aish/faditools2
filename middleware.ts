import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname, hostname } = request.nextUrl
  const response = NextResponse.next()

  // Redirect www.faditools.com to faditools.com
  if (hostname === 'www.faditools.com') {
    const url = request.nextUrl.clone()
    url.hostname = 'faditools.com'
    return NextResponse.redirect(url)
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
    // Match all paths except for:
    // - api (API routes)
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    // - public files
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)',
  ],
}
