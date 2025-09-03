'use client'

import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/context/CartContext'

interface CartIconProps {
  className?: string
  onClick?: () => void
}

export default function CartIcon({ className = '', onClick }: CartIconProps) {
  const { getTotalItems } = useCart()
  const itemCount = getTotalItems()

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={onClick}
                    className="relative p-2 text-gray-700 hover:text-[#D4B896] transition-colors duration-200"
        aria-label="Shopping cart"
      >
        <ShoppingCart className="w-6 h-6" />
        
        {/* Cart Badge */}
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
            {itemCount > 99 ? '99+' : itemCount}
          </span>
        )}
      </button>
    </div>
  )
}
