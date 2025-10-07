'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

interface WordPressPage {
  id: number
  title: { rendered: string }
  slug: string
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPagesDropdownOpen, setIsPagesDropdownOpen] = useState(false)
  const [isMobilePagesOpen, setIsMobilePagesOpen] = useState(false)
  const [pages, setPages] = useState<WordPressPage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Fetch pages on component mount with debouncing
  useEffect(() => {
    // Only fetch on client side and after component is mounted
    if (mounted) {
      const timeoutId = setTimeout(() => {
        setIsLoading(true)
        const fetchPages = async () => {
          try {
            // Add cache-busting timestamp to prevent stale data
            const timestamp = new Date().getTime()
            const response = await fetch(`/api/pages?t=${timestamp}`, {
              cache: 'no-store',
              headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
              }
            })
            if (response.ok) {
              const data = await response.json()
              setPages(data)
            } else {
              console.error('Failed to fetch pages:', response.status)
            }
          } catch (error) {
            console.error('Error fetching pages:', error)
          } finally {
            setIsLoading(false)
          }
        }

        fetchPages()
      }, 100) // Small delay to prevent blocking

      return () => clearTimeout(timeoutId)
    }
  }, [mounted])

  // Don't render until mounted to prevent SSR issues
  if (!mounted) {
    return (
      <header className="bg-white shadow-sm sticky top-0 z-50">   
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-emerald-600">FadiTools</div>
            <div className="hidden md:flex space-x-8">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
            </div>
          </div>
        </nav>
      </header>
    )
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
            FadiTools
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Home
            </Link>
            
            {/* Pages Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsPagesDropdownOpen(true)}
              onMouseLeave={() => setIsPagesDropdownOpen(false)}
            >
              <Link
                href="/pages"
                className="text-gray-700 hover:text-emerald-600 transition-colors flex items-center"
              >
                Pages
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              
              {isPagesDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-2 z-50">
                  {isLoading ? (
                    <div className="px-4 py-2 text-gray-500 text-sm">Loading...</div>
                  ) : pages.length > 0 ? (
                    pages.map((page) => (
                      <Link 
                        key={page.id}
                        href={`/${page.slug}`} 
                        className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                      >
                        {page.title.rendered}
                      </Link>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-500 text-sm">No pages available</div>
                  )}
                </div>
              )}
            </div>
            
            <Link href="/blog" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Posts
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Products
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-emerald-200">
            <div className="flex flex-col space-y-4 pt-4">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-emerald-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              
              {/* Mobile Pages Section */}
              <div className="space-y-2">
                <button
                  onClick={() => setIsMobilePagesOpen(!isMobilePagesOpen)}
                  className="flex items-center justify-between w-full text-sm font-medium text-gray-500 uppercase tracking-wide hover:text-emerald-600 transition-colors"
                  aria-label="Toggle pages menu"
                  aria-expanded={isMobilePagesOpen}
                >
                  <span>Pages</span>
                  <svg 
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isMobilePagesOpen ? 'rotate-90' : ''
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                {isMobilePagesOpen && (
                  <div className="pl-4 space-y-2">
                    {isLoading ? (
                      <div className="text-gray-500 text-sm">Loading...</div>
                    ) : pages.length > 0 ? (
                      pages.map((page) => (
                        <Link 
                          key={page.id}
                          href={`/${page.slug}`} 
                          className="block text-gray-700 hover:text-primary-500 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {page.title.rendered}
                        </Link>
                      ))
                    ) : (
                      <div className="text-gray-500 text-sm">No pages available</div>
                    )}
                  </div>
                )}
              </div>
              
              <Link 
                href="/blog" 
                className="text-gray-700 hover:text-emerald-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Posts
              </Link>
              <Link 
                href="/products" 
                className="text-gray-700 hover:text-emerald-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
