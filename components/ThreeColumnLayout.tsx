'use client'

import { useRef, useState } from 'react'
import ProductSidebar from './ProductSidebar'
import TableOfContents from './TableOfContents'
import { WooCommerceProduct } from '@/lib/woocommerce-api'

interface ThreeColumnLayoutProps {
  children: React.ReactNode
  products: WooCommerceProduct[]
}

export default function ThreeColumnLayout({ children, products }: ThreeColumnLayoutProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [showSidebars, setShowSidebars] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Mobile Sidebar Toggle */}
          <div className="lg:hidden mb-6">
            <button
              onClick={() => setShowSidebars(!showSidebars)}
              className="w-full flex items-center justify-center px-4 py-3 bg-white/80 backdrop-blur-xl rounded-xl shadow-lg border border-white/20 text-gray-700 hover:text-blue-600 transition-all duration-300"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {showSidebars ? 'Hide Sidebars' : 'Show Sidebars'}
            </button>
          </div>

          {/* Mobile Sidebars */}
          {showSidebars && (
            <div className="lg:hidden mb-6 space-y-4">
              <ProductSidebar products={products} />
              <TableOfContents contentRef={contentRef} />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Left Sidebar - Product Recommendations */}
            <div className="hidden lg:block lg:col-span-3 order-2 lg:order-1">
              <ProductSidebar products={products} />
            </div>
            
            {/* Center Content */}
            <div className="lg:col-span-6 order-1 lg:order-2">
              <div 
                ref={contentRef}
                className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6 lg:p-8"
              >
                {children}
              </div>
            </div>
            
            {/* Right Sidebar - Table of Contents */}
            <div className="hidden lg:block lg:col-span-3 order-3">
              <TableOfContents contentRef={contentRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
