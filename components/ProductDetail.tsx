'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Product } from '@/types'
import ProductCard from './ProductCard'

interface ProductDetailProps {
  product: Product
  relatedProducts?: Product[]
}

export default function ProductDetail({ product, relatedProducts = [] }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isTableExpanded, setIsTableExpanded] = useState(false)
  const [isImageZoomed, setIsImageZoomed] = useState(false)

  const handleAffiliatePurchase = () => {
    if (product.affiliate_link) {
      // Open affiliate link in new tab
      window.open(product.affiliate_link, '_blank')
    }
  }

  const handleImageZoom = () => {
    setIsImageZoomed(true)
  }



  const images = product.images || []
  const mainImage = images[selectedImage]?.src || '/images/placeholder-product.jpg'
  const price = product.on_sale && product.sale_price ? product.sale_price : product.price || product.regular_price
  const regularPrice = product.regular_price
  const isOnSale = product.on_sale && product.sale_price
  
  // Calculate savings
  const savings = regularPrice && price ? (parseFloat(regularPrice) - parseFloat(price)).toFixed(2) : '0'
  const savingsPercent = regularPrice && price ? Math.round(((parseFloat(regularPrice) - parseFloat(price)) / parseFloat(regularPrice)) * 100) : 0

  return (
    <div className="bg-white">
      {/* Main Product Section - Toolsurf Style */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Column - Product Logo */}
          <div className="flex flex-col items-center justify-center pt-8">
            <div className="text-center">
              {/* Product Logo/Image - Larger size like Toolsurf - Clickable for zoom */}
              <div 
                className="w-64 h-64 bg-gray-50 rounded-xl overflow-hidden mb-6 mx-auto cursor-pointer hover:opacity-90 transition-opacity"
                onClick={handleImageZoom}
              >
                <img
                  src={mainImage}
                  alt={product.title.rendered}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Product Info & CTA */}
          <div className="flex flex-col justify-center">
            {/* Instant Access Badge */}
            <div className="inline-flex items-center px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full mb-4 w-fit mt-4">
              Instant Access!
            </div>

            {/* Product Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
              {product.title.rendered}
            </h1>

            {/* Pricing Section */}
            <div className="mb-4">
              {isOnSale ? (
                <div className="flex items-center space-x-3">
                  <div className="text-lg text-gray-400 line-through">
                    ${parseFloat(regularPrice || '0').toFixed(2)}
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    ${parseFloat(price || '0').toFixed(2)}
                  </div>
                </div>
              ) : (
                <div className="text-2xl font-bold text-gray-900">
                  ${parseFloat(price || '0').toFixed(2)}
                </div>
              )}
              {isOnSale && (
                <div className="text-sm text-red-600 font-semibold mt-2">
                  You Save: ${savings} ({savingsPercent}%)
                </div>
              )}
            </div>

            {/* Key Features Box - Clean like Toolsurf */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
              <div className="space-y-4">
                {/* WooCommerce Short Description */}
                {product.excerpt?.rendered ? (
                  <div 
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: product.excerpt.rendered }}
                  />
                ) : (
                  <div className="text-gray-600 text-center py-4">
                    No description available
                  </div>
                )}
              </div>
            </div>
            

            
            {/* BUY NOW Button - Affiliate Link */}
            <button
              onClick={handleAffiliatePurchase}
              disabled={!product.affiliate_link}
              className="w-32 bg-green-500 hover:bg-green-600 text-white text-base font-bold py-2 px-4 rounded-lg transition-all duration-200 hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mb-4"
            >
              {product.affiliate_link ? 'BUY NOW' : 'Coming Soon'}
            </button>




          </div>
        </div>
      </div>

      {/* Content Section Below Product Info */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Recent Purchases Banner */}
        <div className="bg-green-500 text-white text-center py-2 px-6 rounded-lg mb-8">
          <span className="font-semibold">18 people purchased this product in last 24 hours</span>
        </div>

        {/* Description Separator */}
        <div className="text-center mb-8">
          <div className="w-full h-px bg-gray-300 mb-2"></div>
          <span className="text-gray-600 font-medium text-sm">DESCRIPTION</span>
        </div>

        {/* Content Grid - Table of Contents Left, Main Content Right */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column - Table of Contents */}
          <div className="lg:col-span-1">
            <div className="bg-gray-100 rounded-lg p-4 cursor-pointer hover:bg-gray-200 transition-colors sticky top-8">
              <div 
                className="flex items-center justify-between"
                onClick={() => setIsTableExpanded(!isTableExpanded)}
              >
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                  <span className="font-medium text-gray-800">Table of Contents</span>
                </div>
                <div className="flex space-x-1">
                  <svg 
                    className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${isTableExpanded ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              {/* Expandable Table of Contents */}
              {isTableExpanded && (
                <div className="mt-4 pt-4 border-t border-gray-300">
                  <div className="text-sm text-gray-600 py-2 px-2">
                    Table of Contents content will appear here
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-3">
            <div className="text-left">
              {/* Product Title from WooCommerce */}
              <h2 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
                {product.title.rendered}
              </h2>
              
              {/* Main Content from WooCommerce */}
              {product.content?.rendered && (
                <div 
                  className="prose prose-gray max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ __html: product.content.rendered }}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Zoom Modal */}
      {isImageZoomed && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={() => setIsImageZoomed(false)}>
          <div className="max-w-4xl max-h-full p-4">
            <img
              src={mainImage}
              alt={product.title.rendered}
              className="w-full h-auto object-contain"
            />
            <button
              onClick={() => setIsImageZoomed(false)}
              className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
