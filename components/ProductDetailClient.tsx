'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { WooCommerceProduct } from '@/lib/woocommerce-api'
import { Product } from '@/types'
import { getProductPrice, getProductImageUrl, isProductOnSale, getDiscountPercentage } from '@/lib/woocommerce-service'
import ProductCard from './ProductCard'

interface ProductDetailClientProps {
  product: WooCommerceProduct
  relatedProducts: WooCommerceProduct[]
  upsellProducts: WooCommerceProduct[]
  crossSellProducts: WooCommerceProduct[]
}

export default function ProductDetailClient({ 
  product, 
  relatedProducts, 
  upsellProducts, 
  crossSellProducts 
}: ProductDetailClientProps) {
  const { addToCart } = useCart()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)

  // Helper function to convert WooCommerceProduct to Product
  const convertToProduct = (wcProduct: WooCommerceProduct): Product => {
    return {
      id: wcProduct.id,
      date: wcProduct.date_created,
      date_gmt: wcProduct.date_created_gmt,
      modified: wcProduct.date_modified,
      modified_gmt: wcProduct.date_modified_gmt,
      slug: wcProduct.slug,
      status: wcProduct.status as 'publish' | 'draft' | 'private' | 'trash',
      type: 'post',
      link: wcProduct.permalink,
      title: { rendered: wcProduct.name },
      content: { rendered: wcProduct.description },
      excerpt: { rendered: wcProduct.short_description },
      author: 1,
      featured_media: wcProduct.images?.[0]?.id || 0,
      comment_status: 'open',
      ping_status: 'open',
      sticky: false,
      template: '',
      format: 'standard',
      meta: {},
      categories: wcProduct.categories?.map(cat => cat.id) || [],
      tags: wcProduct.tags?.map(tag => tag.id) || [],
      class_list: [],
      acf: [],
      _links: {
        self: [{ href: wcProduct.permalink }],
        collection: [{ href: '/wp-json/wp/v2/posts' }]
      },
      // WooCommerce specific fields
      price: wcProduct.price,
      regular_price: wcProduct.regular_price,
      sale_price: wcProduct.sale_price,
      on_sale: wcProduct.on_sale,
      stock_status: wcProduct.stock_status,
      stock_quantity: wcProduct.stock_quantity || undefined,
      images: wcProduct.images,
      attributes: wcProduct.attributes
    }
  }

  const handleAddToCart = async () => {
    if (!product.purchasable) return
    
    setLoading(true)
    try {
      // Convert WooCommerce product to Product type for cart
      const cartProduct = convertToProduct(product)
      
      addToCart(cartProduct, quantity)
      
      // Show success message (you can add a toast notification here)
      console.log('Product added to cart!')
    } catch (error) {
      console.error('Error adding to cart:', error)
    } finally {
      setLoading(false)
    }
  }

  const discountPercentage = getDiscountPercentage(product)
  const currentPrice = getProductPrice(product)

  return (
    <div className="space-y-2">
      {/* Ultra Compact Product Detail Card */}
      <div className="relative overflow-hidden rounded-lg bg-white p-2 min-h-[200px] transition-all duration-500 shadow-sm border border-gray-100">
                 {/* Header Section - Ultra Compact */}
         <div className="mb-1">
           <h1 className="text-base md:text-lg font-bold text-primary-500 leading-tight mb-0.5">
             {product.name}
           </h1>
         </div>

        {/* Main Content - Ultra Compact Layout */}
        <div className="flex flex-col lg:flex-row gap-1 items-start">
          {/* Left Side - Product Images - Ultra Compact */}
          <div className="flex-1 order-2 lg:order-1">
            <div className="space-y-1">
              {/* Main Image - Ultra compact aspect ratio */}
              <div className="aspect-[3/1] bg-gray-100 rounded-sm overflow-hidden border border-primary-500/20">
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[selectedImage].src}
                    alt={product.images[selectedImage].alt || product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-primary-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery - Ultra Compact */}
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-10 gap-0.5">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-[3/1] rounded-sm overflow-hidden border transition-all ${
                        selectedImage === index 
                          ? 'border-primary-500 ring-1 ring-primary-500/20' 
                          : 'border-gray-200 hover:border-primary-500/50'
                      }`}
                    >
                      <img
                        src={image.src}
                        alt={image.alt || `${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Details Box - Ultra Compact */}
          <div className="flex-1 order-1 lg:order-2 max-w-xs">
            <div className="bg-secondary-800/80 backdrop-blur-lg border border-primary-500/20 rounded-sm p-1.5">
                             {/* Price Section - Ultra Compact */}
               <div className="mb-1 pb-0.5 border-b border-white/10">
                 <div className="text-xs text-[#A0A0A0] mb-0.5">From</div>
                 <div className="text-sm font-semibold text-white">
                   ${parseFloat(currentPrice).toFixed(2)}/month
                 </div>
                 {isProductOnSale(product) && product.regular_price && (
                   <div className="text-xs text-[#A0A0A0] line-through">
                     ${parseFloat(product.regular_price).toFixed(2)}/month
                   </div>
                 )}
               </div>

               {/* Product Description - Moved here from header */}
               {product.short_description && (
                 <div className="mb-1 pb-0.5 border-b border-white/10">
                   <div className="text-xs text-[#A0A0A0] mb-0.5">Description</div>
                   <div className="text-xs text-white leading-relaxed">
                     {product.short_description}
                   </div>
                 </div>
               )}

               {/* Features List - Ultra Compact */}
              {product.attributes && product.attributes.length > 0 && (
                <div className="space-y-0.5 mb-1">
                  {product.attributes.find(attr => 
                    attr.name.toLowerCase().includes('feature') || 
                    attr.name.toLowerCase().includes('benefit')
                  )?.options?.slice(0, 1).map((feature, index) => (
                    <div key={index} className="flex items-center text-white">
                      <span className="text-[#D4B896] mr-1 text-xs">✓</span>
                      <span className="text-xs">{feature}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Add to Cart Section - Ultra Compact */}
              <div className="space-y-1">
                {/* Quantity Selector - Ultra Compact */}
                <div className="flex items-center space-x-1">
                  <label className="font-medium text-white text-xs">Qty:</label>
                  <div className="flex items-center border border-[#D4B896]/30 rounded bg-[#1A1A1A]/50">
                   <button
                     onClick={() => setQuantity(Math.max(1, quantity - 1))}
                     className="px-0.5 py-0.5 text-primary-500 hover:text-white hover:bg-primary-500/20 text-xs"
                   >
                     -
                   </button>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-6 text-center border-0 focus:ring-0 bg-transparent text-white text-xs"
                    />
                   <button
                     onClick={() => setQuantity(quantity + 1)}
                     className="px-0.5 py-0.5 text-primary-500 hover:text-white hover:bg-primary-500/20 text-xs"
                   >
                     +
                   </button>
                 </div>
               </div>

                {/* CTA Button - Ultra Compact */}
                <button
                  onClick={handleAddToCart}
                  disabled={!product.purchasable || product.stock_status === 'outofstock' || loading}
                  className={`w-full bg-primary-500 text-white font-semibold py-0.5 px-1 rounded transition-all duration-300 hover:bg-primary-600 hover:transform hover:-translate-y-0.5 hover:shadow-sm hover:shadow-primary-500/30 active:scale-95 text-xs ${
                    !product.purchasable || product.stock_status === 'outofstock' || loading
                      ? 'opacity-50 cursor-not-allowed hover:transform-none'
                      : ''
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-2 w-2 border-b-2 border-white mr-1"></div>
                      Adding...
                    </div>
                  ) : !product.purchasable ? (
                    'Not Available'
                  ) : product.stock_status === 'outofstock' ? (
                    'Out of Stock'
                  ) : (
                    'Add to Cart'
                  )}
               </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Description - Slightly Larger */}
      {product.description && (
        <div className="bg-white/80 backdrop-blur-xl rounded-md shadow-sm border border-white/20 p-3">
          <h2 className="text-sm font-bold text-gray-900 mb-2">Product Description</h2>
          <div 
            className="prose prose-xs max-w-none text-gray-700 max-h-20 overflow-y-auto"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>
      )}

      {/* Product Attributes - Ultra Compact */}
      {product.attributes && product.attributes.length > 0 && (
        <div className="bg-white/80 backdrop-blur-xl rounded-md shadow-sm border border-white/20 p-2">
          <h2 className="text-sm font-bold text-gray-900 mb-1">Product Attributes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
            {product.attributes.map((attribute) => (
              <div key={attribute.id} className="space-y-0.5">
                <h3 className="font-semibold text-gray-900 text-xs">{attribute.name}</h3>
                <div className="flex flex-wrap gap-0.5">
                  {attribute.options.map((option, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-0.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {option}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
