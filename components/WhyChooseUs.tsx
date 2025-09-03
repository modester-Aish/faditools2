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
      description: 'Get access to 130+ premium SEO and digital marketing tools at a fraction of the cost.',
      gradient: 'from-orange-400 via-red-500 to-pink-500',
      bgGradient: 'from-orange-50 via-red-50 to-pink-50',
      hoverGradient: 'from-orange-100 via-red-100 to-pink-100'
    },
    {
      icon: '💰',
      title: 'Massive Savings',
      description: 'Save up to 90% compared to buying tools individually. Group buy pricing makes premium tools affordable.',
      gradient: 'from-green-400 via-emerald-500 to-teal-500',
      bgGradient: 'from-green-50 via-emerald-50 to-teal-50',
      hoverGradient: 'from-green-100 via-emerald-100 to-teal-100'
    },
    {
      icon: '⚡',
      title: 'Instant Access',
      description: 'Get immediate access to all tools after payment. No waiting, no setup fees, no complicated processes.',
      gradient: 'from-yellow-400 via-orange-500 to-red-500',
      bgGradient: 'from-yellow-50 via-orange-50 to-red-50',
      hoverGradient: 'from-yellow-100 via-orange-100 to-red-100'
    },
    {
      icon: '🛡️',
      title: 'Secure & Reliable',
      description: '100% secure payment processing and reliable tool access with 99.9% uptime guarantee.',
      gradient: 'from-blue-400 via-indigo-500 to-purple-500',
      bgGradient: 'from-blue-50 via-indigo-50 to-purple-50',
      hoverGradient: 'from-blue-100 via-indigo-100 to-purple-100'
    },
    {
      icon: '🎯',
      title: 'Proven Results',
      description: 'Join thousands of successful digital marketers who have grown their businesses with our tools.',
      gradient: 'from-purple-400 via-pink-500 to-rose-500',
      bgGradient: 'from-purple-50 via-pink-50 to-rose-50',
      hoverGradient: 'from-purple-100 via-pink-100 to-rose-100'
    },
    {
      icon: '📞',
      title: '24/7 Support',
      description: 'Our dedicated support team is available round the clock to help you with any questions or issues.',
      gradient: 'from-cyan-400 via-blue-500 to-indigo-500',
      bgGradient: 'from-cyan-50 via-blue-50 to-indigo-50',
      hoverGradient: 'from-cyan-100 via-blue-100 to-indigo-100'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-pink-200 to-orange-200 rounded-full opacity-20 animate-float-delay-1"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-green-200 to-blue-200 rounded-full opacity-15 animate-float-delay-2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-block mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-6xl md:text-7xl font-black">
              Why Choose FadiTools?
            </span>
          </div>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            We're not just another tool provider. We're your partner in digital marketing success, 
            trusted by <span className="font-bold text-blue-600">{totalTestimonials || testimonials.length || 5000}+</span> professionals worldwide.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`relative group cursor-pointer overflow-hidden rounded-2xl p-8 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-fade-in-up`}
              style={{ 
                animationDelay: `${index * 0.15}s`
              }}
            >
              {/* Shimmer effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              {/* Card background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} group-hover:${feature.hoverGradient} transition-all duration-500 rounded-2xl`}></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon with floating animation */}
                <div className={`text-6xl mb-6 group-hover:scale-110 transition-all duration-500 animate-float-delay-${index % 3}`}>
                  {feature.icon}
                </div>
                
                {/* Title with gradient text */}
                <h3 className={`text-2xl font-bold mb-4 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300`}>
                  {feature.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-700 leading-relaxed text-lg group-hover:text-gray-900 transition-colors duration-300">
                  {feature.description}
                </p>
                
                {/* Hover indicator */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-white text-sm animate-bounce-subtle`}>
                    →
                  </div>
                </div>
              </div>
              
              {/* Border glow effect */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`}></div>
            </div>
          ))}
        </div>

        {/* Social Proof Section */}
        {testimonials.length > 0 && (
          <div className="bg-gradient-to-r from-white via-blue-50 to-purple-50 rounded-3xl p-10 md:p-16 shadow-2xl border border-white/20 backdrop-blur-sm animate-fade-in-up">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                What Our Customers Say
              </h3>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Don't just take our word for it. Here's what our satisfied customers have to say:
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.slice(0, 3).map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-fade-in-up border border-white/50"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl mr-4 animate-float">
                      {testimonial.avatar || '👤'}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">
                        {testimonial.name || 'Happy Customer'}
                      </h4>
                      <p className="text-blue-600 font-medium">
                        {testimonial.role || 'Digital Marketer'}
                      </p>
                    </div>
                  </div>
                  <blockquote className="text-gray-700 italic text-lg leading-relaxed mb-6">
                    "{testimonial.content || 'Amazing service and incredible value for money!'}"
                  </blockquote>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }, (_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < (testimonial.rating || 5)
                            ? 'text-yellow-400 fill-current animate-bounce-subtle'
                            : 'text-gray-300'
                        }`}
                        style={{ animationDelay: `${i * 0.1}s` }}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-3 text-sm text-gray-600 font-medium">
                      {testimonial.rating || 5}/5
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="animate-fade-in-up group">
            <div className="text-4xl md:text-5xl font-black text-blue-600 mb-3 group-hover:scale-110 transition-transform duration-300 animate-float">
              {totalTestimonials || testimonials.length || 5000}+
            </div>
            <div className="text-gray-700 font-semibold text-lg">Happy Customers</div>
          </div>
          <div className="animate-fade-in-up group" style={{ animationDelay: '0.1s' }}>
            <div className="text-4xl md:text-5xl font-black text-green-600 mb-3 group-hover:scale-110 transition-transform duration-300 animate-float-delay-1">4.9</div>
            <div className="text-gray-700 font-semibold text-lg">Average Rating</div>
          </div>
          <div className="animate-fade-in-up group" style={{ animationDelay: '0.2s' }}>
            <div className="text-4xl md:text-5xl font-black text-purple-600 mb-3 group-hover:scale-110 transition-transform duration-300 animate-float-delay-2">99.9%</div>
            <div className="text-gray-700 font-semibold text-lg">Uptime</div>
          </div>
          <div className="animate-fade-in-up group" style={{ animationDelay: '0.3s' }}>
            <div className="text-4xl md:text-5xl font-black text-pink-600 mb-3 group-hover:scale-110 transition-transform duration-300 animate-float-delay-3">24/7</div>
            <div className="text-gray-700 font-semibold text-lg">Support</div>
          </div>
        </div>
              
        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-10 md:p-16 text-white relative overflow-hidden shadow-2xl animate-fade-in-up">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full" style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 2px)`,
                backgroundSize: '60px 60px'
              }}></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-black mb-6">
                Ready to Join Our Success Stories?
              </h3>
              <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
                Start your journey with FadiTools today and see the difference our tools can make for your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-xl animate-bounce-subtle">
                  Get Started Now
                </button>
                <button className="border-3 border-white text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
