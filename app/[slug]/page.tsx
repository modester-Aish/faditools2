import { Metadata } from 'next'
import { wooCommerceService } from '@/lib/woocommerce-service'
import ProductDetail from '@/components/ProductDetail'
import { WooCommerceProduct } from '@/lib/woocommerce-api'
import { Product } from '@/types'
import { generateCanonicalUrl } from '@/lib/canonical'
import Header from '@/components/Header'

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const wooCommerceData = await wooCommerceService.getWooCommerceData()
    const product = wooCommerceData.products.find((p: WooCommerceProduct) => p.slug === params.slug)
    
    if (!product) {
      return {
        title: 'Product Not Found | FadiTools',
        description: 'The requested product could not be found.',
        robots: {
          index: false,
          follow: false,
        }
      }
    }
    
    const title = `${product.name} - ${product.price} | FadiTools`
    const description = product.short_description || product.description
    
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `https://faditools.com/${product.slug}`,
        siteName: 'FadiTools',
        locale: 'en_US',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
      },
      alternates: {
        canonical: generateCanonicalUrl(`/${product.slug}`),
      },
      robots: { index: true, follow: true },
      keywords: [product.name, 'digital products', 'online shopping', 'ecommerce'],
    }
  } catch (error) {
    return {
      title: 'Product | FadiTools',
      description: 'Product details page',
    }
  }
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  try {
    // Fetch WooCommerce data
    const wooCommerceData = await wooCommerceService.getWooCommerceData()
    
    // Find the specific product by slug
    const product = wooCommerceData.products.find((p: WooCommerceProduct) => p.slug === params.slug)
    
    if (!product) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Product Not Found</h3>
            <p className="text-sm text-gray-500 mb-4">The requested product could not be found.</p>
            <a
              href="/products"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Browse All Products
            </a>
          </div>
        </div>
      )
    }

    // Convert WooCommerce product to Product format
    const productData: Product = {
      id: product.id,
      date: product.date_created,
      modified: product.date_modified,
      slug: product.slug,
      status: product.status as any,
      link: product.permalink,
      title: { rendered: product.name },
      content: { rendered: product.description },
      excerpt: { rendered: product.short_description },
      featured_media: product.images?.[0]?.id || 0,
      // WooCommerce specific fields
      price: product.price,
      regular_price: product.regular_price,
      sale_price: product.sale_price,
      on_sale: product.on_sale,
      stock_status: product.stock_status,
      stock_quantity: product.stock_quantity,
      images: product.images,
      attributes: product.attributes,
      // Extract affiliate link from WooCommerce external product URL
      affiliate_link: product.external_url || undefined,
      // Additional fields
      categories: product.categories.map(cat => cat.id),
      tags: product.tags.map(tag => tag.id),
      meta: {
        sku: product.sku,
        total_sales: product.total_sales,
        average_rating: product.average_rating,
        rating_count: product.rating_count,
        featured: product.featured,
        virtual: product.virtual,
        downloadable: product.downloadable,
        weight: product.weight,
        dimensions: product.dimensions,
        manage_stock: product.manage_stock,
        stock_quantity: product.stock_quantity,
        backorders: product.backorders,
        sold_individually: product.sold_individually,
        purchase_note: product.purchase_note,
        reviews_allowed: product.reviews_allowed,
        upsell_ids: product.upsell_ids,
        cross_sell_ids: product.cross_sell_ids,
        parent_id: product.parent_id,
        grouped_products: product.grouped_products,
        menu_order: product.menu_order
      }
    } as any

    // Get related products (products in same category)
    const relatedProducts = wooCommerceData.products
      .filter((p: WooCommerceProduct) => 
        p.id !== product.id && 
        p.categories.some(cat => 
          product.categories.some(prodCat => prodCat.id === cat.id)
        )
      )
      .slice(0, 4)
      .map((relatedProduct: WooCommerceProduct) => ({
        id: relatedProduct.id,
        date: relatedProduct.date_created,
        modified: relatedProduct.date_modified,
        slug: relatedProduct.slug,
        status: relatedProduct.status as any,
        link: relatedProduct.permalink,
        title: { rendered: relatedProduct.name },
        content: { rendered: relatedProduct.description },
        excerpt: { rendered: relatedProduct.short_description },
        featured_media: relatedProduct.images?.[0]?.id || 0,
        price: relatedProduct.price,
        regular_price: relatedProduct.regular_price,
        sale_price: relatedProduct.sale_price,
        on_sale: relatedProduct.on_sale,
        stock_status: relatedProduct.stock_status,
        stock_quantity: relatedProduct.stock_quantity,
        images: relatedProduct.images,
        attributes: relatedProduct.attributes,
        // Extract affiliate link from WooCommerce external product URL
        affiliate_link: relatedProduct.external_url || undefined,
        categories: relatedProduct.categories.map(cat => cat.id),
        tags: relatedProduct.tags.map(tag => tag.id),
        meta: {
          sku: relatedProduct.sku,
          total_sales: relatedProduct.total_sales,
          average_rating: relatedProduct.average_rating,
          rating_count: relatedProduct.rating_count,
          featured: relatedProduct.featured,
          virtual: relatedProduct.virtual,
          downloadable: relatedProduct.downloadable,
          weight: relatedProduct.weight,
          dimensions: relatedProduct.dimensions,
          manage_stock: relatedProduct.manage_stock,
          stock_quantity: relatedProduct.stock_quantity,
          backorders: relatedProduct.backorders,
          sold_individually: relatedProduct.sold_individually,
          purchase_note: relatedProduct.purchase_note,
          reviews_allowed: relatedProduct.reviews_allowed,
          upsell_ids: relatedProduct.upsell_ids,
          cross_sell_ids: relatedProduct.cross_sell_ids,
          parent_id: relatedProduct.parent_id,
          grouped_products: relatedProduct.grouped_products,
          menu_order: relatedProduct.menu_order
        }
      })) as any[]

    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Product Detail Section */}
        <div>
          <ProductDetail 
            product={productData} 
            relatedProducts={relatedProducts}
          />
        </div>
        
        {/* Footer */}
        <footer className="bg-secondary-800 text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-2xl font-bold mb-4 text-primary-500">FadiTools</h3>
            <p className="text-secondary-300 mb-6">
              A clean WooCommerce-powered website with modern design
            </p>
            <div className="flex justify-center space-x-6">
              <a href="/blog" className="text-secondary-300 hover:text-primary-400 transition-colors">
                Blog
              </a>
              <a href="/products" className="text-secondary-300 hover:text-primary-400 transition-colors">
                Products
              </a>
              <a href="/contact" className="text-secondary-300 hover:text-primary-400 transition-colors">
                Contact
              </a>
            </div>
            <p className="text-secondary-400 mt-8">
              © 2024 FadiTools. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    )
    
  } catch (error) {
    console.error('Error fetching product:', error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
          <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Product</h3>
          <p className="text-sm text-gray-500 mb-4">There was an error loading the product. Please try again.</p>
          <a
            href="/products"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Back to Products
          </a>
        </div>
      </div>
    )
  }
}
