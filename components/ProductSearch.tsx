'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

interface ProductSearchProps {
  categories?: Array<{ id: number; name: string; slug: string }>
  currentCategory?: string
  currentSearch?: string
}

export default function ProductSearch({ 
  categories = [], 
  currentCategory, 
  currentSearch 
}: ProductSearchProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(currentSearch || '')
  const [selectedCategory, setSelectedCategory] = useState(currentCategory || '')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    
    if (searchTerm.trim()) {
      params.append('search', searchTerm.trim())
    }
    
    if (selectedCategory) {
      params.append('category', selectedCategory)
    }
    
    // Reset to page 1 when searching
    const url = `/products${params.toString() ? `?${params.toString()}` : ''}`
    router.push(url)
  }

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams()
    
    if (searchTerm.trim()) {
      params.append('search', searchTerm.trim())
    }
    
    if (category) {
      params.append('category', category)
    }
    
    const url = `/products${params.toString() ? `?${params.toString()}` : ''}`
    router.push(url)
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('')
    router.push('/products')
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
      <form onSubmit={handleSearch} className="space-y-4">
        {/* Search Bar */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg"
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <button
            type="submit"
            className="px-8 py-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all duration-200 hover:scale-[1.02] shadow-sm font-medium text-lg"
          >
            Search
          </button>
        </div>

        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value)
                handleCategoryChange(e.target.value)
              }}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Active Filters */}
        {(searchTerm || selectedCategory) && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-600">Active filters:</span>
            {searchTerm && (
              <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
                Search: "{searchTerm}"
              </span>
            )}
            {selectedCategory && (
              <span className="px-3 py-1 bg-accent-100 text-accent-800 rounded-full text-sm font-medium">
                Category: {categories.find(c => c.slug === selectedCategory)?.name || selectedCategory}
              </span>
            )}
            <button
              type="button"
              onClick={clearFilters}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Clear All
            </button>
          </div>
        )}
      </form>
    </div>
  )
}
