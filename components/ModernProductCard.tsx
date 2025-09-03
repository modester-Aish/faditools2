'use client'

import { useState } from 'react'
import { WooCommerceProduct } from '@/lib/woocommerce-api'
import { getProductPrice } from '@/lib/woocommerce-service'

interface ModernProductCardProps {
  product: WooCommerceProduct
  onAddToCart?: () => void
}

export default function ModernProductCard({ product, onAddToCart }: ModernProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const currentPrice = getProductPrice(product)

  // Extract features from product attributes or use defaults
  const getFeatures = () => {
    if (product.attributes) {
      const featuresAttr = product.attributes.find(attr => 
        attr.name.toLowerCase().includes('feature') || 
        attr.name.toLowerCase().includes('benefit')
      )
      if (featuresAttr && featuresAttr.options) {
        return featuresAttr.options.slice(0, 4)
      }
    }
    
    // Default features if none found
    return [
      "Unlimited downloads on assets",
      "23+ million premium assets",
      "Full stack of AI tools",
      "Lifetime commercial license"
    ]
  }

  const features = getFeatures()

  return (
    <div 
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] p-6 md:p-10 min-h-[500px] transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header Section */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-3xl md:text-5xl font-bold text-[#D4B896] leading-tight mb-2">
          {product.name || "Every type of asset,"}
        </h1>
        <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight mb-3 md:mb-4">
          for any type of project.
        </h2>
        <p className="text-base md:text-lg text-[#A0A0A0] leading-relaxed max-w-2xl">
          {product.short_description || "With our full AI stack, generate images, videos, music, and more – all included in your subscription."}
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">
        {/* Left Side - Abstract Visual Elements */}
        <div className="flex-1 relative min-h-[200px] md:min-h-[300px] flex items-center justify-center order-2 lg:order-1">
          {/* Abstract Shapes Container */}
          <div className="relative w-full h-full">
            {/* Curved Organic Shape - Blue to Teal Gradient */}
            <div 
              className={`absolute top-1/4 left-1/4 w-24 md:w-32 h-24 md:h-32 rounded-full bg-gradient-to-br from-[#4A90E2] to-[#7ED4E8] opacity-80 transition-all duration-700 ${
                isHovered ? 'animate-pulse scale-110' : ''
              }`}
              style={{
                transform: `translate(${isHovered ? '10px' : '0px'}, ${isHovered ? '-10px' : '0px'})`
              }}
            />
            
            {/* Angular Geometric Form - Orange/Yellow */}
            <div 
              className={`absolute top-1/2 right-1/3 w-20 md:w-24 h-20 md:h-24 bg-gradient-to-br from-[#F5A623] to-[#FF6B35] opacity-90 transition-all duration-700 ${
                isHovered ? 'rotate-12 scale-110' : 'rotate-0'
              }`}
              style={{
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
              }}
            />
            
            {/* Green Accent Shape */}
            <div 
              className={`absolute bottom-1/4 right-1/4 w-16 md:w-20 h-16 md:h-20 bg-[#D4B896] opacity-70 rounded-lg transition-all duration-700 ${
                isHovered ? 'scale-125 rotate-45' : 'rotate-0'
              }`}
            />
            
            {/* Dotted Pattern Overlay */}
            <div className="absolute inset-0 opacity-30">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
            
            {/* Floating Elements */}
            <div 
              className={`absolute top-1/3 left-1/2 w-12 md:w-16 h-12 md:h-16 border-2 border-[#D4B896] opacity-40 rounded-full transition-all duration-1000 ${
                isHovered ? 'scale-150 rotate-180' : 'rotate-0'
              }`}
            />
            
            <div 
              className={`absolute bottom-1/3 left-1/6 w-10 md:w-12 h-10 md:h-12 bg-gradient-to-br from-[#D4B896] to-[#C4A886] opacity-60 rounded-full transition-all duration-800 ${
                isHovered ? 'scale-125 translate-x-4' : ''
              }`}
            />
          </div>
        </div>

        {/* Right Side - Details Box */}
        <div className="flex-1 order-1 lg:order-2">
          <div className="bg-[#2A2A2A]/80 backdrop-blur-lg border border-[#D4B896]/20 rounded-xl p-4 md:p-6">
            {/* Price Section */}
            <div className="mb-4 md:mb-6 pb-3 md:pb-4 border-b border-white/10">
              <div className="text-xs md:text-sm text-[#A0A0A0] mb-1">From</div>
              <div className="text-lg md:text-xl font-semibold text-white">
                ${parseFloat(currentPrice).toFixed(2)}/month
              </div>
            </div>

            {/* Features List */}
            <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center text-white">
                  <span className="text-[#D4B896] mr-2 md:mr-3 text-base md:text-lg">✓</span>
                  <span className="text-xs md:text-sm">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={onAddToCart}
              className="w-full bg-[#D4B896] text-[#1A1A1A] font-semibold py-3 md:py-4 px-4 md:px-6 rounded-lg transition-all duration-300 hover:bg-[#C4A886] hover:transform hover:-translate-y-1 hover:shadow-lg hover:shadow-[#D4B896]/30 active:scale-95 text-sm md:text-base"
            >
              Get unlimited downloads
            </button>
          </div>
        </div>
      </div>

      {/* Background Decorative Elements */}
              <div className="absolute top-0 right-0 w-24 md:w-32 h-24 md:h-32 bg-gradient-to-br from-[#D4B896]/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-32 md:w-40 h-32 md:h-40 bg-gradient-to-tr from-[#4A90E2]/10 to-transparent rounded-full blur-3xl" />
    </div>
  )
}
