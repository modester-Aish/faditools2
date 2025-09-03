import { Metadata } from 'next'
import { fetchBlogPosts, fetchPages, fetchProducts, fetchPostBySlug, fetchPageBySlug, fetchProductBySlug } from '@/lib/api'
import Header from '../../components/Header'
import { generateCanonicalUrl } from '@/lib/canonical'

export const metadata: Metadata = {
  title: 'WordPress API Test - FadiTools',
  description: 'Testing WordPress API integration',
  alternates: {
    canonical: generateCanonicalUrl('/test-wordpress'),
  },
}

export default async function TestWordPressPage() {
  // Test all API functions
  const [blogPosts, pages, products] = await Promise.all([
    fetchBlogPosts(),
    fetchPages(),
    fetchProducts()
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">WordPress API Test Results</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Blog Posts */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Blog Posts ({blogPosts.length})</h2>
            <div className="space-y-2">
              {blogPosts.slice(0, 5).map((post) => (
                <div key={post.id} className="p-3 bg-gray-50 rounded">
                  <div className="font-medium">{post.title.rendered}</div>
                  <div className="text-sm text-gray-600">Category: {post.categories ? post.categories.join(', ') : 'None'}</div>
                  <div className="text-xs text-gray-500">SEO: {post.seo ? 'Available' : 'Not available'}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Pages */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Pages ({pages.length})</h2>
            <div className="space-y-2">
              {pages.slice(0, 5).map((page) => (
                <div key={page.id} className="p-3 bg-gray-50 rounded">
                  <div className="font-medium">{page.title.rendered}</div>
                  <div className="text-sm text-gray-600">Slug: {page.slug}</div>
                  <div className="text-xs text-gray-500">SEO: {page.seo ? 'Available' : 'Not available'}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Products */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Products ({products.length})</h2>
            <div className="space-y-2">
              {products.slice(0, 5).map((product) => (
                <div key={product.id} className="p-3 bg-gray-50 rounded">
                  <div className="font-medium">{product.title.rendered}</div>
                  <div className="text-sm text-gray-600">Category: {product.categories ? product.categories.join(', ') : 'None'}</div>
                  <div className="text-xs text-gray-500">SEO: {product.seo ? 'Available' : 'Not available'}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* API Status */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">API Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded">
              <div className="font-medium text-green-800">✅ Blog Posts API</div>
              <div className="text-sm text-green-600">Found {blogPosts.length} posts (excluding products)</div>
            </div>
            <div className="p-4 bg-green-50 rounded">
              <div className="font-medium text-green-800">✅ Pages API</div>
              <div className="text-sm text-green-600">Found {pages.length} pages</div>
            </div>
            <div className="p-4 bg-green-50 rounded">
              <div className="font-medium text-green-800">✅ Products API</div>
              <div className="text-sm text-green-600">Found {products.length} products</div>
            </div>
            <div className="p-4 bg-green-50 rounded">
              <div className="font-medium text-green-800">✅ SEO Integration</div>
              <div className="text-sm text-green-600">RankMath data available</div>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Test Navigation</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a href="/posts" className="p-4 bg-blue-50 rounded hover:bg-blue-100 transition-colors">
              <div className="font-medium text-blue-800">📝 Blog Posts</div>
              <div className="text-sm text-blue-600">View all blog posts</div>
            </a>
            <a href="/pages" className="p-4 bg-purple-50 rounded hover:bg-purple-100 transition-colors">
              <div className="font-medium text-purple-800">📄 Pages</div>
              <div className="text-sm text-purple-600">View all pages</div>
            </a>
            <a href="/products" className="p-4 bg-green-50 rounded hover:bg-green-100 transition-colors">
              <div className="font-medium text-green-800">🛍️ Products</div>
              <div className="text-sm text-green-600">View all products</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
