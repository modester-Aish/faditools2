'use client'

import { Product } from '@/types'
import { CartProvider } from '@/context/CartContext'
import ProductGrid from './ProductGrid'

interface ProductsClientProps {
  products: Product[]
  currentPage?: number
  totalPages?: number
  totalProducts?: number
  category?: string
  search?: string
}

export default function ProductsClient({ 
  products, 
  currentPage = 1, 
  totalPages = 1, 
  totalProducts = products.length,
  category,
  search
}: ProductsClientProps) {
  return (
    <CartProvider>
      <ProductGrid 
        products={products} 
        currentPage={currentPage}
        totalPages={totalPages}
        totalProducts={totalProducts}
        category={category}
        search={search}
      />
    </CartProvider>
  )
}
