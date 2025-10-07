'use client'

import { useEffect, useState } from 'react'

interface ProductInfo {
  number: number
  name: string
  id: number
  slug: string
}

export default function AllProductNamesPage() {
  const [products, setProducts] = useState<ProductInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/get-all-product-names')
      const data = await response.json()
      
      if (data.error) {
        setError(data.error)
      } else {
        setProducts(data.products)
      }
    } catch (err) {
      setError('Failed to fetch products')
    } finally {
      setLoading(false)
    }
  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const downloadAsTxt = () => {
    const content = filteredProducts
      .map(p => `${p.number}. ${p.name}`)
      .join('\n')
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'product-names.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const copyToClipboard = () => {
    const content = filteredProducts
      .map(p => `${p.number}. ${p.name}`)
      .join('\n')
    navigator.clipboard.writeText(content)
    alert('Product names copied to clipboard!')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading products...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p className="text-xl font-bold mb-2">Error:</p>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="mb-8 border-b pb-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              All Product Names
            </h1>
            <p className="text-xl text-gray-600">
              Total: <span className="font-bold text-blue-600">{products.length}</span> products
            </p>
          </div>

          {/* Search and Actions */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex gap-2">
              <button
                onClick={copyToClipboard}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold whitespace-nowrap"
              >
                📋 Copy All
              </button>
              <button
                onClick={downloadAsTxt}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold whitespace-nowrap"
              >
                💾 Download
              </button>
            </div>
          </div>

          {/* Filtered count */}
          {searchTerm && (
            <p className="mb-4 text-gray-600">
              Showing <span className="font-bold">{filteredProducts.length}</span> of {products.length} products
            </p>
          )}

          {/* Product List */}
          <div className="bg-gray-50 rounded-xl p-6 max-h-[600px] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full min-w-[50px] text-center">
                      {product.number}
                    </span>
                    <div className="flex-1">
                      <p className="text-gray-800 font-medium leading-tight">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        ID: {product.id}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Stats */}
          <div className="mt-6 pt-6 border-t text-center text-gray-600">
            <p className="text-sm">
              Last updated: {new Date().toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

