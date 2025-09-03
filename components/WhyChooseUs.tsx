'use client'

import { Testimonial } from '../types'

interface WhyChooseUsProps {
  testimonials?: Testimonial[]
  totalTestimonials?: number
}

export default function WhyChooseUs({ testimonials = [], totalTestimonials = 0 }: WhyChooseUsProps) {
  const features = [
    {
      icon: '🚀',
      title: 'Premium Tools Access',
      description: 'Get access to 130+ premium SEO and digital marketing tools at a fraction of the cost.'
    },
    {
      icon: '💰',
      title: 'Massive Savings',
      description: 'Save up to 90% compared to buying tools individually. Group buy pricing makes premium tools affordable.'
    },
    {
      icon: '⚡',
      title: 'Instant Access',
      description: 'Get immediate access to all tools after payment. No waiting, no setup fees, no complicated processes.'
    },
    {
      icon: '🛡️',
      title: 'Secure & Reliable',
      description: '100% secure payment processing and reliable tool access with 99.9% uptime guarantee.'
    },
    {
      icon: '🎯',
      title: 'Proven Results',
      description: 'Join thousands of successful digital marketers who have grown their businesses with our tools.'
    },
    {
      icon: '📞',
      title: '24/7 Support',
      description: 'Our dedicated support team is available round the clock to help you with any questions or issues.'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose FadiTools?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're not just another tool provider. We're your partner in digital marketing success, 
            trusted by {totalTestimonials || testimonials.length || 5000}+ professionals worldwide.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 hover:from-blue-100 hover:to-purple-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-fade-in-up group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Social Proof Section */}
        {testimonials.length > 0 && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                What Our Customers Say
              </h3>
              <p className="text-gray-600">
                Don't just take our word for it. Here's what our satisfied customers have to say:
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.slice(0, 3).map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl mr-4">
                      {testimonial.avatar || '👤'}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {testimonial.name || 'Happy Customer'}
                      </h4>
                      <p className="text-blue-600 text-sm">
                        {testimonial.role || 'Digital Marketer'}
                      </p>
                    </div>
                  </div>
                  <blockquote className="text-gray-600 italic">
                    "{testimonial.content || 'Amazing service and incredible value for money!'}"
                  </blockquote>
                  <div className="flex items-center mt-4">
                    {Array.from({ length: 5 }, (_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < (testimonial.rating || 5)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-sm text-gray-500">
                      {testimonial.rating || 5}/5
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="animate-fade-in-up">
            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
              {totalTestimonials || testimonials.length || 5000}+
            </div>
            <div className="text-gray-600 font-medium">Happy Customers</div>
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">4.9</div>
            <div className="text-gray-600 font-medium">Average Rating</div>
                </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">99.9%</div>
            <div className="text-gray-600 font-medium">Uptime</div>
                </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="text-3xl md:text-4xl font-bold text-pink-600 mb-2">24/7</div>
            <div className="text-gray-600 font-medium">Support</div>
                </div>
              </div>
              
        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Join Our Success Stories?
            </h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Start your journey with FadiTools today and see the difference our tools can make for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105">
                Get Started Now
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
