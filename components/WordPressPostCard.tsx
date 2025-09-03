'use client'

import Link from 'next/link'
import { WordPressPost } from '@/types/wordpress'
import { getTitle, getExcerpt } from '@/lib/wordpress-api'

interface WordPressPostCardProps {
  post: WordPressPost
  className?: string
}

export default function WordPressPostCard({ post, className = '' }: WordPressPostCardProps) {
  const title = getTitle(post)
  const excerpt = getExcerpt(post)
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ${className}`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 bg-green-100 text-green-800 px-2 py-1 rounded-full">
              Post
            </span>
            {post.sticky && (
              <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded-full">
                Sticky
              </span>
            )}
          </div>
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
                            href={`/${post.slug}`}
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            Read More →
          </Link>
          
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">ID: {post.id}</span>
            {post.status !== 'publish' && (
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                {post.status}
              </span>
            )}
            {post.categories && post.categories.length > 0 && (
              <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                {post.categories.length} categories
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
