import Link from 'next/link'
import Image from 'next/image'

interface ContentCardProps {
  id: number
  title: string
  excerpt: string
  slug: string
  featured_media?: number | null
  type: 'post' | 'product' | 'page'
  date?: string
}

export default function ContentCard({ id, title, excerpt, slug, featured_media, type, date }: ContentCardProps) {
  const href = `/${slug}`
  
  // Generate featured image URL if media ID is provided
  const featuredImage = featured_media 
    ? `https://app.faditools.com/wp-content/uploads/${featured_media}.jpg`
    : null
  
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'product':
        return 'bg-blue-100 text-blue-800'
      case 'page':
        return 'bg-indigo-100 text-indigo-800'
      case 'post':
      default:
        return 'bg-green-100 text-green-800'
    }
  }
  
  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'product':
        return 'Product'
      case 'page':
        return 'Page'
      case 'post':
      default:
        return 'Post'
    }
  }
  
  return (
    <div className="group bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105">
      {featuredImage && (
        <div className="relative h-56 overflow-hidden">
          <Image
            src={featuredImage}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute top-4 left-4">
            <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full backdrop-blur-sm border border-white/20 ${getTypeColor(type)}`}>
              {getTypeLabel(type)}
            </span>
          </div>
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </div>
        </div>
      )}
      
      <div className="p-8">
        <div className="flex items-center justify-between mb-4">
          <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${getTypeColor(type)}`}>
            {getTypeLabel(type)}
          </span>
          {date && (
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{new Date(date).toLocaleDateString()}</span>
            </div>
          )}
        </div>
        
        <h3 className="text-xl font-bold mb-4 line-clamp-2 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
          {excerpt}
        </p>
        
        <Link 
          href={href}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 group-hover:translate-x-1"
        >
          {type === 'page' ? 'View Page' : type === 'product' ? 'View Product' : 'Read More'}
          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
