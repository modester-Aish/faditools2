'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
  }

  const mainImage = product.images?.[0]?.src || '/images/placeholder-product.jpg'
  const price = product.price || '0'
  const regularPrice = product.regular_price || product.price || '0'
  const isOnSale = product.on_sale || false

  // Get rating from product data
  const rating = product.meta?.average_rating ? parseFloat(product.meta.average_rating) : 0
  const reviewCount = product.meta?.rating_count || 0
  const isInStock = product.stock_status === 'instock'

  return (
    <div
      className={`group bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.01] h-[420px] flex flex-col ${
        isHovered ? 'shadow-lg scale-[1.01]' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-50 flex-shrink-0">
        <Link href={`/${product.slug}`} className="block w-full h-full">
          <img
            src={mainImage}
            alt={product.title?.rendered || 'Product'}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </Link>
        
        {/* Sale Badge */}
        {isOnSale && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
            SALE
          </div>
        )}
        
        {/* Stock Status */}
        <div className="absolute top-3 right-3">
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium shadow-sm ${
            isInStock 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              isInStock ? 'bg-green-500' : 'bg-red-500'
            }`}></div>
            <span>{isInStock ? 'In Stock' : 'Out of Stock'}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={toggleWishlist}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm ${
              isWishlisted 
                ? 'bg-red-500 text-white' 
                : 'bg-white/90 text-gray-700 hover:bg-red-500 hover:text-white'
            }`}
          >
            <svg className="w-5 h-5" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          <button 
            className="w-10 h-10 rounded-full bg-white/90 text-gray-700 hover:bg-blue-500 hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3 flex-grow flex flex-col">
        {/* Title */}
        <Link href={`/${product.slug}`} className="block">
          <h3 className="text-base font-semibold text-gray-900 line-clamp-2 hover:text-primary-600 transition-colors leading-tight h-10 flex items-start">
            {product.title?.rendered || 'Product'}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center space-x-1">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(rating) 
                    ? 'text-yellow-400 fill-current' 
                    : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray-600">({rating})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          {isOnSale ? (
            <>
              <span className="text-lg font-bold text-green-600">
                ${parseFloat(price || '0').toFixed(2)}
              </span>
              <span className="text-sm text-red-600 line-through opacity-70">
                ${parseFloat(regularPrice || '0').toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-gray-900">
              ${parseFloat(price || '0').toFixed(2)}
            </span>
          )}
        </div>

        {/* Short Description */}
        {product.excerpt?.rendered ? (
          <div 
            className="text-xs text-gray-600 line-clamp-2 leading-relaxed h-10 flex items-start"
            dangerouslySetInnerHTML={{ 
              __html: product.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 80) + '...' 
            }}
          />
        ) : (
          <div className="text-xs text-gray-600 h-10 flex items-start">
            <span className="text-gray-400">No description available</span>
          </div>
        )}


        {/* Action Button */}
        <div className="mt-auto">
          <Link
            href={`/${product.slug}`}
            className="block w-full bg-primary-600 text-white text-xs font-medium py-2 px-3 rounded-md hover:bg-primary-700 transition-colors text-center"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}
