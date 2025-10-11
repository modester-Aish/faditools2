'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { useNavigation } from '@/context/NavigationContext'

interface DropdownNavigationProps {
  isMobile?: boolean
  onItemClick?: () => void
  className?: string
}

export default function DropdownNavigation({ 
  isMobile = false, 
  onItemClick,
  className = '' 
}: DropdownNavigationProps) {
  const { navigationItems, loading, error } = useNavigation()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobilePagesOpen, setIsMobilePagesOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render anything until mounted to avoid SSR issues
  if (!mounted) {
    return (
      <div className={`flex items-center space-x-4 ${className}`}>
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-4 bg-gray-200 rounded animate-pulse"
            style={{ width: `${Math.random() * 60 + 40}px` }}
          />
        ))}
      </div>
    )
  }

  const pathname = usePathname()

  // Hover timeout for desktop dropdown
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null)

  // Main navigation items (fixed)
  const mainNavItems = [
    { href: '/', label: 'Home' },
    { href: '/tools', label: 'Tools' },
    { href: '/packages', label: 'Packages' },
    { href: '/testimonials', label: 'Testimonials' },
    { href: '/posts', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ]

  // Filter out main navigation pages from WordPress pages
  const mainNavSlugs = ['home', 'tools', 'packages', 'testimonials', 'posts', 'contact']
  const dropdownPages = navigationItems.filter(item => 
    !mainNavSlugs.includes(item.slug)
  )

  const isActivePage = (url: string): boolean => {
    if (url === '/') {
      return pathname === '/'
    }
    return pathname === url || pathname.startsWith(url + '/')
  }

  const handleItemClick = () => {
    if (onItemClick) {
      onItemClick()
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Handle hover events for desktop dropdown
  const handleDropdownMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
      setHoverTimeout(null)
    }
    setIsDropdownOpen(true)
  }

  const handleDropdownMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsDropdownOpen(false)
    }, 150) // Small delay to prevent accidental closing
    setHoverTimeout(timeout)
  }

  // Close dropdown on route change
  useEffect(() => {
    setIsDropdownOpen(false)
    setIsMobilePagesOpen(false)
  }, [pathname])

  const renderMainNavItem = (item: { href: string; label: string }) => {
    const isActive = isActivePage(item.href)
    
    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={handleItemClick}
        className={`
          flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
          ${isActive 
            ? 'bg-primary-500/20 text-primary-500 border border-primary-500/30' 
            : 'text-gray-600 hover:text-primary-500 hover:bg-primary-500/10'
          }
          ${isMobile ? 'w-full' : ''}
        `}
      >
        {item.label}
      </Link>
    )
  }

  const renderDropdownButton = () => {
    const isActive = dropdownPages.some(page => isActivePage(page.url))
    
    return (
      <div
        ref={dropdownRef}
        onMouseEnter={handleDropdownMouseEnter}
        onMouseLeave={handleDropdownMouseLeave}
        className="relative"
      >
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`
            flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
            ${isActive 
                          ? 'bg-primary-500/20 text-primary-500 border border-primary-500/30' 
            : 'text-gray-600 hover:text-primary-500 hover:bg-primary-500/10'
            }
            ${isMobile ? 'w-full justify-between' : ''}
          `}
        >
          <span>Pages</span>
          <ChevronDown 
            className={`w-4 h-4 ml-1 transition-transform duration-200 ${
              isDropdownOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
        {isDropdownOpen && renderDropdownMenu()}
      </div>
    )
  }

  const renderDropdownMenu = () => {
    if (loading) {
      return (
        <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-3">
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      )
    }

    if (error || dropdownPages.length === 0) {
      return (
        <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-3 text-sm text-gray-500">
            {error ? 'Navigation unavailable' : 'No pages available'}
          </div>
        </div>
      )
    }

    return (
      <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
        <div className="py-2">
          {dropdownPages.map(page => {
            const isActive = isActivePage(page.url)
            
            return (
              <Link
                key={page.slug}
                href={page.url}
                onClick={() => {
                  setIsDropdownOpen(false)
                  handleItemClick()
                }}
                className={`
                  block px-4 py-2 text-sm transition-colors duration-200
                  ${isActive 
                                      ? 'bg-primary-500/10 text-primary-500 border-r-2 border-primary-500' 
                  : 'text-gray-700 hover:bg-primary-500/5 hover:text-primary-500'
                  }
                `}
              >
                {page.title}
              </Link>
            )
          })}
        </div>
      </div>
    )
  }

  const renderMobilePagesSection = () => {
    if (loading) {
      return (
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
      )
    }

    if (error || dropdownPages.length === 0) {
      return (
        <div className="text-sm text-gray-500 px-3 py-2">
          {error ? 'Navigation unavailable' : 'No pages available'}
        </div>
      )
    }

    return (
      <div className="space-y-1">
        {dropdownPages.map(page => {
          const isActive = isActivePage(page.url)
          
          return (
            <Link
              key={page.slug}
              href={page.url}
              onClick={handleItemClick}
              className={`
                block px-6 py-2 text-sm transition-colors duration-200
                ${isActive 
                                  ? 'bg-primary-500/10 text-primary-500 border-l-2 border-primary-500' 
                : 'text-gray-600 hover:bg-primary-500/10 hover:text-primary-500'
                }
              `}
            >
              {page.title}
            </Link>
          )
        })}
      </div>
    )
  }

  if (isMobile) {
    return (
      <div className={`space-y-2 ${className}`}>
        {/* Main navigation items */}
        {mainNavItems.map(renderMainNavItem)}
        
        {/* Pages dropdown section */}
        <div>
          <button
            onClick={() => setIsMobilePagesOpen(!isMobilePagesOpen)}
            className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary-500 hover:bg-primary-500/10 rounded-lg transition-colors duration-200"
          >
            <span>Pages</span>
            <ChevronRight 
              className={`w-4 h-4 transition-transform duration-200 ${
                isMobilePagesOpen ? 'rotate-90' : ''
              }`}
            />
          </button>
          
          {isMobilePagesOpen && (
            <div className="mt-2 ml-4">
              {renderMobilePagesSection()}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <nav className={`flex items-center space-x-1 ${className}`}>
      {/* Main navigation items */}
      {mainNavItems.map(renderMainNavItem)}
      
      {/* Pages dropdown */}
      {renderDropdownButton()}
    </nav>
  )
}
