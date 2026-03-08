'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

interface WordPressPage {
  id: number
  title: { rendered?: string } | string
  slug: string
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPagesOpen, setIsPagesOpen] = useState(false)
  const [isMobilePagesOpen, setIsMobilePagesOpen] = useState(false)
  const [pages, setPages] = useState<WordPressPage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      const t = setTimeout(() => {
        setIsLoading(true)
        fetch(`/api/pages?t=${Date.now()}`, { cache: 'no-store' })
          .then((r) => (r.ok ? r.json() : []))
          .then(setPages)
          .catch(() => setPages([]))
          .finally(() => setIsLoading(false))
      }, 100)
      return () => clearTimeout(t)
    }
  }, [mounted])

  const closeMenu = () => {
    setIsMenuOpen(false)
    setIsPagesOpen(false)
    setIsMobilePagesOpen(false)
  }

  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <span className="text-2xl font-bold text-emerald-600">FadiTools</span>
          <div className="hidden md:flex gap-4">
            <span className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
            <span className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
          </div>
        </nav>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-emerald-600 hover:text-emerald-700 transition-colors shrink-0"
          >
            FadiTools
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <form action="/products" method="get" className="flex" role="search" aria-label="Search products">
              <input
                type="search"
                name="search"
                placeholder="Search tools..."
                className="w-48 rounded-l-lg border border-gray-300 border-r-0 px-3.5 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                aria-label="Search"
              />
              <button
                type="submit"
                className="rounded-r-lg border border-gray-300 border-l-0 bg-gray-50 px-3.5 py-2.5 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                aria-label="Submit search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>

            <Link href="/" className="text-gray-700 hover:text-emerald-600 font-semibold text-base transition-colors">
              Home
            </Link>

            <div
              className="relative flex items-center gap-0.5"
              onMouseEnter={() => setIsPagesOpen(true)}
              onMouseLeave={() => setIsPagesOpen(false)}
            >
              <Link
                href="/pages"
                className="text-gray-700 hover:text-emerald-600 font-semibold text-base transition-colors"
              >
                Pages
              </Link>
              <span className="pointer-events-none p-1 text-gray-500">
                <svg className={`w-5 h-5 transition-transform ${isPagesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
              {isPagesOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 py-2 bg-white rounded-lg shadow-lg border border-gray-200">
                  {isLoading ? (
                    <p className="px-4 py-2.5 text-gray-500 text-base">Loading...</p>
                  ) : pages.length > 0 ? (
                    pages.map((p) => (
                      <Link
                        key={p.id}
                        href={`/${p.slug}`}
                        className="block px-4 py-2.5 text-base text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
                      >
                        {typeof p.title === 'object' && p.title?.rendered != null ? p.title.rendered : String(p.title ?? '')}
                      </Link>
                    ))
                  ) : (
                    <p className="px-4 py-2.5 text-gray-500 text-base">No pages</p>
                  )}
                </div>
              )}
            </div>

            <Link href="/blog" className="text-gray-700 hover:text-emerald-600 font-semibold text-base transition-colors">
              Blog
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-emerald-600 font-semibold text-base transition-colors">
              Products
            </Link>

            <a
              href="https://wa.me/447845432224?text=Hi%20from%20faditools.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-green-500 text-white text-base font-semibold hover:bg-green-600 transition-colors"
              aria-label="Chat on WhatsApp"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .96 4.534.96 10.08c0 1.792.413 3.53 1.2 5.11L0 24l8.896-2.312a11.88 11.88 0 003.154.422h.005c6.554 0 11.089-4.535 11.089-10.08 0-2.688-1.037-5.216-2.927-7.12" />
              </svg>
              Chat
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((v) => !v)}
            className="md:hidden p-2.5 rounded-lg text-gray-600 hover:bg-gray-100"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <form action="/products" method="get" className="flex gap-2 mb-4" role="search">
              <input
                type="search"
                name="search"
                placeholder="Search tools..."
                className="flex-1 rounded-lg border border-gray-300 px-3.5 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500"
                aria-label="Search"
              />
              <button type="submit" className="rounded-lg bg-emerald-500 text-white px-4 py-2.5 text-base font-medium">
                Search
              </button>
            </form>

            <div className="flex flex-col gap-1">
              <Link href="/" className="py-3 px-2 text-gray-700 font-semibold text-base rounded-lg hover:bg-emerald-50 hover:text-emerald-600" onClick={closeMenu}>
                Home
              </Link>

              <div>
                <div className="flex items-center justify-between">
                  <Link href="/pages" className="py-3 px-2 text-gray-700 font-semibold text-base rounded-lg hover:bg-emerald-50 hover:text-emerald-600" onClick={closeMenu}>
                    Pages
                  </Link>
                  <button
                    type="button"
                    onClick={() => setIsMobilePagesOpen((v) => !v)}
                    className="p-2.5 rounded-lg text-gray-500 hover:bg-emerald-50 hover:text-emerald-600"
                    aria-expanded={isMobilePagesOpen}
                    aria-label="Toggle pages list"
                  >
                    <svg className={`w-5 h-5 ${isMobilePagesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
                {isMobilePagesOpen && (
                  <div className="pl-4 space-y-1">
                    {isLoading ? (
                      <p className="py-2 text-gray-500 text-base">Loading...</p>
                    ) : pages.length > 0 ? (
                      pages.map((p) => (
                        <Link
                          key={p.id}
                          href={`/${p.slug}`}
                          className="block py-2 text-base text-gray-600 hover:text-emerald-600"
                          onClick={closeMenu}
                        >
                          {typeof p.title === 'object' && p.title?.rendered != null ? p.title.rendered : String(p.title ?? '')}
                        </Link>
                      ))
                    ) : (
                      <p className="py-2 text-gray-500 text-base">No pages</p>
                    )}
                  </div>
                )}
              </div>

              <Link href="/blog" className="py-3 px-2 text-gray-700 font-semibold text-base rounded-lg hover:bg-emerald-50 hover:text-emerald-600" onClick={closeMenu}>
                Blog
              </Link>
              <Link href="/products" className="py-3 px-2 text-gray-700 font-semibold text-base rounded-lg hover:bg-emerald-50 hover:text-emerald-600" onClick={closeMenu}>
                Products
              </Link>

              <a
                href="https://wa.me/447845432224?text=Hi%20from%20faditools.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 py-3 px-2 mt-2 rounded-lg bg-green-500 text-white font-semibold text-base"
                onClick={closeMenu}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .96 4.534.96 10.08c0 1.792.413 3.53 1.2 5.11L0 24l8.896-2.312a11.88 11.88 0 003.154.422h.005c6.554 0 11.089-4.535 11.089-10.08 0-2.688-1.037-5.216-2.927-7.12" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
