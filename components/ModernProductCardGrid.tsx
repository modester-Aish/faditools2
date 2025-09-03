'use client'

import { WooCommerceProduct } from '@/lib/woocommerce-api'
import ModernProductCard from './ModernProductCard'

interface ModernProductCardGridProps {
  products: WooCommerceProduct[]
  title?: string
  subtitle?: string
}

export default function ModernProductCardGrid({ 
  products, 
  title = "Featured Products",
  subtitle = "Discover our amazing collection of premium assets and tools"
}: ModernProductCardGridProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0F0F] to-[#1A1A1A] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {title}
          </h1>
          <p className="text-xl text-[#A0A0A0] max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {products.map((product, index) => (
            <div key={product.id} className="group">
              <ModernProductCard 
                product={product}
                onAddToCart={() => console.log(`Add ${product.name} to cart`)}
              />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-16">
            <div className="text-[#D4B896] text-6xl mb-4">🎨</div>
            <h3 className="text-2xl font-bold text-white mb-2">No Products Found</h3>
            <p className="text-[#A0A0A0]">
              Check back soon for new products and updates!
            </p>
          </div>
        )}

        {/* Footer CTA */}
        <div className="text-center">
          <div className="bg-[#2A2A2A]/50 backdrop-blur-lg rounded-2xl p-8 border border-[#D4B896]/20 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-[#A0A0A0] mb-6">
              Join thousands of creators who trust our platform for their creative needs.
            </p>
            <button className="bg-[#D4B896] text-[#1A1A1A] font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:bg-[#C4A886] hover:transform hover:-translate-y-1 hover:shadow-lg hover:shadow-[#D4B896]/30 active:scale-95">
              Explore All Products
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
