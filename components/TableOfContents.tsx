'use client'

import { useState, useEffect } from 'react'

interface TOCItem {
  id: string
  text: string
  level: number
  element: HTMLElement
}

interface TableOfContentsProps {
  contentRef: React.RefObject<HTMLElement>
}

export default function TableOfContents({ contentRef }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [readingProgress, setReadingProgress] = useState(0)

  useEffect(() => {
    if (!contentRef.current) return

    // Function to extract headings
    const extractHeadings = () => {
      const headings = contentRef.current?.querySelectorAll('h1, h2, h3, h4')
      console.log('Found headings:', headings?.length || 0)
      
      const items: TOCItem[] = []

      headings?.forEach((heading) => {
        const id = heading.id || `heading-${Math.random().toString(36).substr(2, 9)}`
        heading.id = id
        
        items.push({
          id,
          text: heading.textContent || '',
          level: parseInt(heading.tagName.charAt(1)),
          element: heading as HTMLElement
        })
      })

      console.log('TOC items:', items)
      setTocItems(items)
    }

    // Initial extraction
    extractHeadings()

    // Retry after a short delay in case content is loaded asynchronously
    const timeoutId = setTimeout(extractHeadings, 500)
    const timeoutId2 = setTimeout(extractHeadings, 1000)

    return () => {
      clearTimeout(timeoutId)
      clearTimeout(timeoutId2)
    }
  }, [contentRef])

  useEffect(() => {
    if (tocItems.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-20% 0px -35% 0px',
        threshold: 0
      }
    )

    // Observe all heading elements
    tocItems.forEach((item) => {
      observer.observe(item.element)
    })

    // Calculate reading progress
    const handleScroll = () => {
      if (!contentRef.current) return
      
      const content = contentRef.current
      const contentHeight = content.scrollHeight - window.innerHeight
      const scrolled = window.scrollY - content.offsetTop + window.innerHeight
      const progress = Math.min(Math.max((scrolled / contentHeight) * 100, 0), 100)
      setReadingProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial calculation

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [tocItems, contentRef])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100 // Account for header height
      const elementPosition = element.offsetTop - offset
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  }

  const getIndentClass = (level: number) => {
    switch (level) {
      case 1: return 'pl-0'
      case 2: return 'pl-4'
      case 3: return 'pl-8'
      case 4: return 'pl-12'
      default: return 'pl-0'
    }
  }

  if (tocItems.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6 lg:sticky lg:top-24">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          Table of Contents
        </h3>
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-gray-500 text-sm">No headings found in this content</p>
          <p className="text-gray-400 text-xs mt-1">Add H1, H2, H3, or H4 tags to create a table of contents</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6 lg:sticky lg:top-24">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
        Table of Contents
      </h3>
      
      {/* Reading Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <span>Reading Progress</span>
          <span>{Math.round(readingProgress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${readingProgress}%` }}
          ></div>
        </div>
      </div>
      
      <div className="space-y-1">
        {tocItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToHeading(item.id)}
            className={`w-full text-left p-2 rounded-lg transition-all duration-300 group ${
              activeId === item.id
                ? 'bg-blue-50 border border-blue-200 text-blue-700'
                : 'hover:bg-gray-50 border border-transparent hover:border-gray-200 text-gray-700 hover:text-gray-900'
            } ${getIndentClass(item.level)}`}
          >
            <div className="flex items-center">
              <div className={`flex-shrink-0 w-2 h-2 rounded-full mr-3 transition-all duration-300 ${
                activeId === item.id
                  ? 'bg-blue-500'
                  : 'bg-gray-300 group-hover:bg-gray-400'
              }`}></div>
              <span className={`text-sm font-medium line-clamp-2 leading-tight ${
                item.level === 1 ? 'font-semibold' : 'font-normal'
              }`}>
                {item.text}
              </span>
            </div>
          </button>
        ))}
      </div>
      
      {/* Quick Navigation */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex flex-col space-y-2">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center justify-center w-full px-3 py-2 text-sm text-gray-600 hover:text-blue-600 transition-colors duration-300"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            Back to Top
          </button>
        </div>
      </div>
    </div>
  )
}
