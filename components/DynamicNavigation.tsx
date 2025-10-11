'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { useNavigation } from '@/context/NavigationContext'

interface DynamicNavigationProps {
  isMobile?: boolean
  onItemClick?: () => void
  className?: string
}

export default function DynamicNavigation({ 
  isMobile = false, 
  onItemClick,
  className = '' 
}: DynamicNavigationProps) {
  const { navigationItems, loading, error } = useNavigation()
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const [mounted, setMounted] = useState(false)

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

  const toggleExpanded = (slug: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(slug)) {
        newSet.delete(slug)
      } else {
        newSet.add(slug)
      }
      return newSet
    })
  }

  if (loading) {
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

  if (error) {
    return (
      <div className={`text-red-500 text-sm ${className}`}>
        Navigation unavailable
      </div>
    )
  }

  if (navigationItems.length === 0) {
    return (
      <div className={`text-gray-500 text-sm ${className}`}>
        No pages available
      </div>
    )
  }

  const renderNavigationItem = (item: any) => {
    const isActive = isActivePage(item.url)
    const isExpanded = expandedItems.has(item.slug)

    return (
      <div key={item.slug} className="relative">
        <Link
          href={item.url}
          onClick={handleItemClick}
          className={`
            flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
            ${isActive 
                          ? 'bg-[#D4B896]/20 text-[#D4B896] border border-[#D4B896]/30' 
            : 'text-gray-600 hover:text-[#D4B896] hover:bg-[#D4B896]/10'
            }
            ${isMobile ? 'w-full justify-between' : ''}
          `}
        >
          <span className="truncate">{item.title}</span>
          {isMobile && (
            <ChevronDown 
              className={`w-4 h-4 transition-transform duration-200 ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
          )}
        </Link>
      </div>
    )
  }

  if (isMobile) {
    return (
      <div className={`space-y-2 ${className}`}>
        {navigationItems.map(renderNavigationItem)}
      </div>
    )
  }

  return (
    <nav className={`flex items-center space-x-1 ${className}`}>
      {navigationItems.map(renderNavigationItem)}
    </nav>
  )
}
