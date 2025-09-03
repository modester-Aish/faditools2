export default function ProductSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-square bg-gray-200"></div>
      
      {/* Content Skeleton */}
      <div className="p-6 space-y-4">
        {/* Title Skeleton */}
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        
        {/* Rating Skeleton */}
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-4 h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
        
        {/* Price Skeleton */}
        <div className="h-8 bg-gray-200 rounded w-1/2"></div>
        
        {/* Description Skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
        
        {/* Shipping Info Skeleton */}
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="w-4 h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>
        
        {/* Button Skeleton */}
        <div className="flex gap-2">
          <div className="flex-1 h-12 bg-gray-200 rounded"></div>
          <div className="flex-1 h-12 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  )
}

export function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 12 }).map((_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </div>
  )
}

export function ProductDetailSkeleton() {
  return (
    <div className="space-y-12">
      {/* Product Main Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          {/* Image Skeleton */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-200 rounded-xl animate-pulse"></div>
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
              ))}
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="space-y-6">
            <div className="h-10 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            
            {/* Rating Skeleton */}
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
              <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
            </div>
            
            <div className="h-12 bg-gray-200 rounded w-1/2 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            </div>
            
            <div className="space-y-4">
              <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-14 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Description Skeleton */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-6 animate-pulse"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
