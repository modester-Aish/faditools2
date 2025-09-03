'use client'

import { useState } from 'react'
import { Product } from '@/types'
import ProductCard from './ProductCard'
import { useCart } from '@/context/CartContext'

interface ProductGridProps {
  products: Product[]
  currentPage: number
  totalPages: number
  totalProducts: number
  category?: string
  search?: string
}

export default function ProductGrid({ 
  products, 
  currentPage, 
  totalPages, 
  totalProducts,
  category,
  search
}: ProductGridProps) {
  const { addToCart } = useCart()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'date'>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const handleAddToCart = (product: Product, quantity: number) => {
    // Pass the original product object to the cart
    addToCart(product, quantity)
  }

  const handleSort = (field: 'name' | 'price' | 'date') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('asc')
    }
  }

  const sortedProducts = products && products.length > 0 ? [...products].sort((a, b) => {
    let aValue: string | number
    let bValue: string | number

    switch (sortBy) {
      case 'name':
        aValue = (a.title?.rendered || '').toLowerCase()
        bValue = (b.title?.rendered || '').toLowerCase()
        break
      case 'price':
        aValue = parseFloat(a.price || '0') || 0
        bValue = parseFloat(b.price || '0') || 0
        break
      case 'date':
        aValue = a.date ? new Date(a.date).getTime() : 0
        bValue = b.date ? new Date(b.date).getTime() : 0
        break
      default:
        return 0
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  }) : []

  const buildPageUrl = (page: number) => {
    const params = new URLSearchParams()
    if (page > 1) params.append('page', page.toString())
    if (category) params.append('category', category)
    if (search) params.append('search', search)
    return `/products${params.toString() ? `?${params.toString()}` : ''}`
  }

  return (
    <div className="space-y-8">
      {/* Header with Controls */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Results Info */}
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Products ({totalProducts})
            </h2>
            {(category || search) && (
              <div className="flex items-center space-x-2">
                {category && (
                  <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
                    Category: {category}
                  </span>
                )}
                {search && (
                  <span className="px-3 py-1 bg-accent-100 text-accent-800 rounded-full text-sm font-medium">
                    Search: "{search}"
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Sort by:</label>
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-') as ['name' | 'price' | 'date', 'asc' | 'desc']
                  setSortBy(field)
                  setSortOrder(order)
                }}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
              >
                <option value="name-asc">Name A-Z</option>
                <option value="name-desc">Name Z-A</option>
                <option value="price-asc">Price Low to High</option>
                <option value="price-desc">Price High to Low</option>
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all duration-200 ${
                  viewMode === 'grid' 
                    ? 'bg-white text-primary-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all duration-200 ${
                  viewMode === 'list' 
                    ? 'bg-white text-primary-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className={viewMode === 'grid' 
        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
        : 'space-y-4'
      }>
                 {sortedProducts.map((product, index) => (
           product && (
             <div 
               key={product.id} 
               className={`animate-fade-in-up ${viewMode === 'list' ? 'w-full' : ''}`}
               style={{ animationDelay: `${index * 0.1}s` }}
             >
               <ProductCard 
                 product={product} 
                 onAddToCart={handleAddToCart}
               />
             </div>
           )
         ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {((currentPage - 1) * 12) + 1} to {Math.min(currentPage * 12, totalProducts)} of {totalProducts} products
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Previous Page */}
              {currentPage > 1 && (
                <a
                  href={buildPageUrl(currentPage - 1)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                >
                  Previous
                </a>
              )}

              {/* Page Numbers */}
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum: number
                  
                  if (totalPages <= 5) {
                    pageNum = i + 1
                  } else if (currentPage <= 3) {
                    pageNum = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i
                  } else {
                    pageNum = currentPage - 2 + i
                  }

                  return (
                    <a
                      key={pageNum}
                      href={buildPageUrl(pageNum)}
                      className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        pageNum === currentPage
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 shadow-sm'
                      }`}
                    >
                      {pageNum}
                    </a>
                  )
                })}
              </div>

              {/* Next Page */}
              {currentPage < totalPages && (
                <a
                  href={buildPageUrl(currentPage + 1)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                >
                  Next
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
