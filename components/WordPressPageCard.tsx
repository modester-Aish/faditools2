'use client'

import Link from 'next/link'
import { WordPressPage } from '@/types/wordpress'
import { getTitle, getExcerpt } from '@/lib/wordpress-api'

interface WordPressPageCardProps {
  page: WordPressPage
  className?: string
}

export default function WordPressPageCard({ page, className = '' }: WordPressPageCardProps) {
  const title = getTitle(page)
  const excerpt = getExcerpt(page)
  const formattedDate = new Date(page.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ${className}`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-500 bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            Page
          </span>
          <span className="text-sm text-gray-500">{formattedDate}</span>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
          {title}
        </h3>
        
        {excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {excerpt.replace(/<[^>]*>/g, '')} {/* Remove HTML tags */}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          <Link
            href={`/${page.slug}`}
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            Read More →
          </Link>
          
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">ID: {page.id}</span>
            {page.status !== 'publish' && (
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                {page.status}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
