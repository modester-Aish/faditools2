'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface WordPressContentProps {
  content: string
  className?: string
}

export default function WordPressContent({ content, className = '' }: WordPressContentProps) {
  useEffect(() => {
    // Process external links to open in new tab
    const links = document.querySelectorAll('.wordpress-content a[href^="http"]')
    links.forEach(link => {
      if (!link.getAttribute('target')) {
        link.setAttribute('target', '_blank')
        link.setAttribute('rel', 'noopener noreferrer')
      }
    })

    // Add smooth scrolling to internal links
    const internalLinks = document.querySelectorAll('.wordpress-content a[href^="#"]')
    internalLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault()
        const targetId = link.getAttribute('href')?.substring(1)
        if (targetId) {
          const targetElement = document.getElementById(targetId)
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' })
          }
        }
      })
    })
  }, [content])

  // Process content to handle internal links
  const processContent = (html: string) => {
    // Convert internal WordPress links to Next.js links
    let processedHtml = html.replace(
      /<a([^>]+)href="\/([^"]+)"([^>]*)>/g,
      (match, before, href, after) => {
        // Skip if it's already a Next.js Link or external link
        if (before.includes('data-next-link') || href.startsWith('http')) {
          return match
        }
        
        // Convert to Next.js Link for internal pages
        return `<a${before}href="/${href}"${after} data-internal-link="true">`
      }
    )

    // Add responsive classes to images
    processedHtml = processedHtml.replace(
      /<img([^>]+)>/g,
      (match, attributes) => {
        if (attributes.includes('class=')) {
          return match.replace(
            /class="([^"]*)"/g,
            'class="$1 responsive-image"'
          )
        } else {
          return match.replace(
            /<img([^>]+)>/g,
            '<img$1 class="responsive-image">'
          )
        }
      }
    )

    return processedHtml
  }

  return (
    <div 
      className={`wordpress-content ${className}`}
      dangerouslySetInnerHTML={{ 
        __html: processContent(content) 
      }}
    />
  )
}
