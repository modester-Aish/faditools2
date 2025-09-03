'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { WooCommerceProduct } from '@/lib/woocommerce-api'
import { wooCommerceService } from '@/lib/woocommerce-service'

interface ProductSidebarProps {
  products: WooCommerceProduct[]
}

export default function ProductSidebar({ products }: ProductSidebarProps) {
  const [randomProducts, setRandomProducts] = useState<WooCommerceProduct[]>([])

  useEffect(() => {
    // Use service method to get random products
    const randomProducts = wooCommerceService.getRandomProducts(products, 10)
    setRandomProducts(randomProducts)
  }, [products])

  const formatPrice = (price: string, regularPrice?: string) => {
    const numPrice = parseFloat(price)
    const numRegular = regularPrice ? parseFloat(regularPrice) : null
    
    if (numRegular && numRegular > numPrice) {
      return (
        <div className="flex items-center gap-2">
          <span className="text-green-600 font-semibold">${price}</span>
          <span className="text-gray-400 line-through text-sm">${regularPrice}</span>
        </div>
      )
    }
    
    return <span className="text-gray-900 font-semibold">${price}</span>
  }

  if (randomProducts.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6 lg:sticky lg:top-24">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          Recommended Products
        </h3>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6 lg:sticky lg:top-24">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
        Recommended Products
      </h3>
      
      <div className="space-y-3">
        {randomProducts.map((product) => (
          <Link
            key={product.id}
                            href={`/${product.slug}`}
            className="block group"
          >
            <div className="p-3 rounded-lg hover:bg-blue-50 transition-all duration-300 border border-transparent hover:border-blue-200">
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 leading-tight">
                  {product.name}
                </h4>
                <div className="flex-shrink-0 ml-2">
                  {formatPrice(product.price, product.regular_price)}
                </div>
              </div>
              
              {product.short_description && (
                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                  {product.short_description.replace(/<[^>]*>/g, '').substring(0, 80)}...
                </p>
              )}
              
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center text-xs text-gray-400">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {product.stock_quantity || 'In Stock'}
                </div>
                
                {product.on_sale && (
                  <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                    Sale
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <Link
          href="/products"
          className="flex items-center justify-center w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
        >
          View All Products
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
