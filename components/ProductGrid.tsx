'use client'

import { useState } from 'react'
import { Product } from '@/types'
import ProductCard from './ProductCard'
import ProductSearchClient from './ProductSearchClient'

interface ProductGridProps {
  products: Product[]
  currentPage: number
  totalPages: number
  totalProducts: number
  category?: string
  search?: string
  categories?: Array<{ id: number; name: string; slug: string }>
}

export default function ProductGrid({ 
  products, 
  currentPage, 
  totalPages, 
  totalProducts,
  category,
  search,
  categories = []
}: ProductGridProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'date'>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

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
      {/* Combined Search and Products Header */}
      <div className="bg-gradient-to-br from-white via-white to-gray-50/50 rounded-3xl shadow-lg border border-gray-200/60 p-6 backdrop-blur-sm">
        {/* Search Section */}
        <ProductSearchClient 
          categories={categories}
          currentCategory={category}
          currentSearch={search}
        />

        {/* Products Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Results Info */}
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-gray-900">
              Products
              <span className="ml-2 text-base font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                {totalProducts} items
              </span>
            </h2>
            
            {/* Active Filters */}
            {(category || search) && (
              <div className="flex items-center gap-2">
                {category && (
                  <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
                    {category}
                  </span>
                )}
                {search && (
                  <span className="px-3 py-1 bg-accent-100 text-accent-800 rounded-full text-sm font-medium">
                    "{search}"
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Sort:</label>
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-') as ['name' | 'price' | 'date', 'asc' | 'desc']
                  setSortBy(field)
                  setSortOrder(order)
                }}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
              >
                <option value="name-asc">📝 Name (A → Z)</option>
                <option value="name-desc">📝 Name (Z → A)</option>
                <option value="price-asc">💰 Price (Low → High)</option>
                <option value="price-desc">💰 Price (High → Low)</option>
                <option value="date-desc">🆕 Newest First</option>
                <option value="date-asc">⏰ Oldest First</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-gradient-to-r from-gray-100 to-gray-50 rounded-lg p-1 shadow-inner">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all duration-200 ${
                  viewMode === 'grid' 
                    ? 'bg-white text-primary-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                title="Grid View"
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
                title="List View"
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
        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4' 
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
              Showing {((currentPage - 1) * 24) + 1} to {Math.min(currentPage * 24, totalProducts)} of {totalProducts} products
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
                {/* First page */}
                {currentPage > 3 && (
                  <>
                    <a
                      href={buildPageUrl(1)}
                      className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                    >
                      1
                    </a>
                    {currentPage > 4 && (
                      <span className="px-2 text-gray-500">...</span>
                    )}
                  </>
                )}

                {/* Current page and surrounding pages */}
                {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
                  let pageNum: number
                  
                  if (totalPages <= 7) {
                    pageNum = i + 1
                  } else if (currentPage <= 4) {
                    pageNum = i + 1
                  } else if (currentPage >= totalPages - 3) {
                    pageNum = totalPages - 6 + i
                  } else {
                    pageNum = currentPage - 3 + i
                  }

                  if (pageNum < 1 || pageNum > totalPages) return null

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

                {/* Last page */}
                {currentPage < totalPages - 3 && (
                  <>
                    {currentPage < totalPages - 4 && (
                      <span className="px-2 text-gray-500">...</span>
                    )}
                    <a
                      href={buildPageUrl(totalPages)}
                      className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                    >
                      {totalPages}
                    </a>
                  </>
                )}
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

              {/* Go to page input for large page counts */}
              {totalPages > 10 && (
                <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-gray-300">
                  <span className="text-sm text-gray-600">Go to:</span>
                  <input
                    type="number"
                    min="1"
                    max={totalPages}
                    defaultValue={currentPage}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        const page = parseInt((e.target as HTMLInputElement).value)
                        if (page >= 1 && page <= totalPages) {
                          window.location.href = buildPageUrl(page)
                        }
                      }
                    }}
                    className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
