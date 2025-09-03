import { Metadata } from 'next'
import { generateCanonicalUrl } from '@/lib/canonical'

export const metadata: Metadata = {
  title: 'Test Fadi Route - FadiTools',
  description: 'Test page to verify routing',
  alternates: {
    canonical: generateCanonicalUrl('/test-fadi'),
  },
}

export default function TestFadiPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">✅ Test Page Working!</h1>
        <p className="text-xl text-gray-600 mb-8">The routing system is functioning correctly.</p>
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Route Test Results</h2>
          <ul className="text-left space-y-2">
            <li className="flex items-center">
              <span className="w-4 h-4 bg-green-500 rounded-full mr-3"></span>
              Static route `/test-fadi` works
            </li>
            <li className="flex items-center">
              <span className="w-4 h-4 bg-green-500 rounded-full mr-3"></span>
              Dynamic route `[slug]` should work for `/fadi`
            </li>
            <li className="flex items-center">
              <span className="w-4 h-4 bg-yellow-500 rounded-full mr-3"></span>
              `/fadi` depends on WordPress content
            </li>
          </ul>
        </div>
        <div className="mt-8">
          <a 
            href="/fadi" 
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try /fadi route
          </a>
        </div>
      </div>
    </div>
  )
}
