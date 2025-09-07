'use client'

import { useState } from 'react'
import { Product } from '@/types'
import ProductCard from './ProductCard'

interface RecommendedProductsGridProps {
  products: Product[]
  title?: string
  maxProducts?: number
}

export default function RecommendedProductsGrid({ 
  products, 
  title = "Recommended Products",
  maxProducts = 6 
}: RecommendedProductsGridProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Limit the number of products to display
  const displayProducts = products?.slice(0, maxProducts) || []

  if (displayProducts.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {title}
          </h3>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-600">No products available</p>
          <p className="text-sm text-gray-500 mt-2">Products: {products?.length || 0}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900 flex items-center">
          <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          {title}
        </h3>
        
        {/* View Mode Toggle */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-all duration-200 ${
              viewMode === 'grid' 
                ? 'bg-blue-100 text-blue-600' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-all duration-200 ${
              viewMode === 'list' 
                ? 'bg-blue-100 text-blue-600' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className={viewMode === 'grid' 
        ? 'grid grid-cols-1 sm:grid-cols-2 gap-4' 
        : 'space-y-4'
      }>
        {displayProducts.map((product, index) => (
          <div 
            key={product.id} 
            className={`animate-fade-in-up ${viewMode === 'list' ? 'w-full' : ''}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <ProductCard 
              product={product} 
            />
          </div>
        ))}
      </div>

      {/* View All Link */}
      {products.length > maxProducts && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <a
            href="/products"
            className="w-full text-left px-3 py-2 rounded-lg transition-all duration-200 text-sm text-blue-600 hover:bg-blue-50 font-medium flex items-center justify-center"
          >
            View All Products
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      )}
    </div>
  )
}
