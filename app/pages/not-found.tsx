import Link from 'next/link'
import Header from '@/components/Header'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      <Header />
      
      <div className="pt-16 flex items-center justify-center min-h-screen">
        <div className="text-center max-w-2xl mx-auto px-4">
          <div className="text-8xl mb-6">📄</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="space-y-4">
            <Link
              href="/pages"
              className="inline-flex items-center px-6 py-3 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Browse All Pages
            </Link>
            
            <div>
              <Link
                href="/"
                className="text-primary-500 hover:text-primary-600 font-medium transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
