import { Metadata } from 'next'
import { getTestimonials } from '@/lib/api'
import TestimonialCard from '@/components/TestimonialCard'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import ErrorBoundary from '@/components/ui/ErrorBoundary'
import { generateCanonicalUrl } from '@/lib/canonical'

export const metadata: Metadata = {
  title: 'Customer Reviews & Testimonials | FadiTools',
  description: 'Read what our customers say about FadiTools. Real testimonials from digital marketing professionals who have transformed their businesses with our tools.',
  keywords: 'FadiTools reviews, customer testimonials, digital marketing success stories, SEO tool reviews',
  openGraph: {
    title: 'Customer Reviews & Testimonials | FadiTools',
    description: 'Read what our customers say about FadiTools. Real testimonials from digital marketing professionals.',
    type: 'website',
  },
  alternates: {
    canonical: generateCanonicalUrl('/testimonials'),
  },
}

async function TestimonialsPage() {
  const testimonials = await getTestimonials()



  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full -translate-x-36 -translate-y-36"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-48 translate-y-48"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
            <div className="text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                What Our Customers Say
              </h1>
              <p className="text-lg md:text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
                Real stories from digital marketing professionals who have transformed their businesses 
                with our comprehensive suite of tools and packages.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="animate-fade-in-up">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {testimonials.length}+
                </div>
                <div className="text-gray-600 font-medium">Happy Customers</div>
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">4.9</div>
                <div className="text-gray-600 font-medium">Average Rating</div>
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">98%</div>
                <div className="text-gray-600 font-medium">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Customer Testimonials ({testimonials.length})
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Read what our satisfied customers have to say about their experience with our tools and services.
            </p>
          </div>

          {/* Testimonials Grid */}
          {testimonials.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-4">No testimonials available</div>
              <p className="text-gray-400">Please check back later or contact support.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id} 
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Join Our Success Stories?
            </h2>
            <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
              Start your journey with FadiTools today and see the difference our tools can make for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105">
                Browse Tools
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-all duration-200">
                View Packages
              </button>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default TestimonialsPage
