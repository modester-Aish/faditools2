'use client'

import { Product } from '@/types'
import { CartProvider } from '@/context/CartContext'
import RecommendedProductsGrid from './RecommendedProductsGrid'

interface RecommendedProductsGridClientProps {
  products: Product[]
  title?: string
  maxProducts?: number
}

export default function RecommendedProductsGridClient({ 
  products, 
  title, 
  maxProducts 
}: RecommendedProductsGridClientProps) {
  return (
    <CartProvider>
      <RecommendedProductsGrid 
        products={products} 
        title={title} 
        maxProducts={maxProducts}
      />
    </CartProvider>
  )
}
