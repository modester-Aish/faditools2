import { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import { getAllPopularTools } from '@/data/popular-tools'

export const metadata: Metadata = {
  title: 'HTML Sitemap - FadiTools',
  description: 'Complete sitemap of all pages, tools, and resources available on FadiTools',
  robots: {
    index: true,
    follow: true,
  },
}

export default async function SitemapPage() {
  const popularTools = getAllPopularTools()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">HTML Sitemap</h1>
          
          <div className="space-y-8">
            {/* Main Pages */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Main Pages</h2>
              <ul className="space-y-2">
                <li><Link href="/" className="text-emerald-600 hover:text-emerald-700 hover:underline">Home</Link></li>
                <li><Link href="/products" className="text-emerald-600 hover:text-emerald-700 hover:underline">Products</Link></li>
                <li><Link href="/blog" className="text-emerald-600 hover:text-emerald-700 hover:underline">Blog</Link></li>
                <li><Link href="/pages" className="text-emerald-600 hover:text-emerald-700 hover:underline">Pages</Link></li>
                <li><Link href="/testimonials" className="text-emerald-600 hover:text-emerald-700 hover:underline">Testimonials</Link></li>
              </ul>
            </section>

            {/* Important Pages */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Important Pages</h2>
              <ul className="space-y-2">
                <li><Link href="/pages/about-us" className="text-emerald-600 hover:text-emerald-700 hover:underline">About Us</Link></li>
                <li><Link href="/pages/contact" className="text-emerald-600 hover:text-emerald-700 hover:underline">Contact Us</Link></li>
                <li><Link href="/pages/privacy-policy" className="text-emerald-600 hover:text-emerald-700 hover:underline">Privacy Policy</Link></li>
                <li><Link href="/pages/terms-of-service" className="text-emerald-600 hover:text-emerald-700 hover:underline">Terms of Service</Link></li>
                <li><Link href="/pages/authors-team" className="text-emerald-600 hover:text-emerald-700 hover:underline">Authors/Team</Link></li>
                <li><Link href="/pages/editorial-guidelines" className="text-emerald-600 hover:text-emerald-700 hover:underline">Editorial Guidelines</Link></li>
              </ul>
            </section>

            {/* Popular Tools */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Popular Tools</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {popularTools.map((tool) => (
                  <li key={tool.id}>
                    <Link href={`/${tool.slug}`} className="text-emerald-600 hover:text-emerald-700 hover:underline">
                      {tool.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            {/* XML Sitemap */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">XML Sitemaps</h2>
              <ul className="space-y-2">
                <li><Link href="/sitemap.xml" className="text-emerald-600 hover:text-emerald-700 hover:underline">Main Sitemap (XML)</Link></li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

