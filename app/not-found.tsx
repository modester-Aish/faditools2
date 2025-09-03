import Link from 'next/link'
import { Metadata } from 'next'
import Header from '../components/Header'
import { generateCanonicalUrl } from '@/lib/canonical'

export const metadata: Metadata = {
  title: 'Page Not Found - FadiTools',
  description: 'The page you are looking for could not be found.',
  alternates: {
    canonical: generateCanonicalUrl('/404'),
  },
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-16 flex items-center justify-center min-h-screen">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-gray-600 mb-8">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
          
          <div className="space-y-4">
            <Link
              href="/"
              className="block w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Go to Homepage
            </Link>
            
            <div className="text-sm text-gray-500">
              Or try these pages:
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <Link
                href="/blog"
                className="text-blue-600 hover:text-blue-700 font-medium py-2 px-4 rounded border border-blue-200 hover:bg-blue-50 transition-colors"
              >
                Browse Blog
              </Link>
              <Link
                href="/products"
                className="text-blue-600 hover:text-blue-700 font-medium py-2 px-4 rounded border border-blue-200 hover:bg-blue-50 transition-colors"
              >
                View Products
              </Link>
              <Link
                href="/about-us"
                className="text-blue-600 hover:text-blue-700 font-medium py-2 px-4 rounded border border-blue-200 hover:bg-blue-50 transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="text-blue-600 hover:text-blue-700 font-medium py-2 px-4 rounded border border-blue-200 hover:bg-blue-50 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
