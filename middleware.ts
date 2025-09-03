import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname, hostname } = request.nextUrl

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

  return NextResponse.next()
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
