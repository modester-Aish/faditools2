'use client'

import { SiteStats } from '@/lib/wordpress-service'

interface CTAProps {
  onScrollToPricing: () => void
  onScrollToTools: () => void
  siteStats?: SiteStats
}

export default function CTA({ onScrollToPricing, onScrollToTools, siteStats }: CTAProps) {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full -translate-x-36 -translate-y-36"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-48 translate-y-48"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
            Ready to Transform Your Digital Marketing?
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join thousands of satisfied customers who trust our tools for their digital marketing success. 
            Start your journey today with access to {siteStats?.totalTools || 130}+ premium tools.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold mb-1">
                {siteStats?.totalTools || 130}+
              </div>
              <div className="text-blue-200 text-sm">Premium Tools</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold mb-1">
                {siteStats?.totalPackages || 15}+
              </div>
              <div className="text-blue-200 text-sm">Packages</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold mb-1">
                {siteStats?.totalTestimonials || 5000}+
              </div>
              <div className="text-blue-200 text-sm">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold mb-1">24/7</div>
              <div className="text-blue-200 text-sm">Support</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button
              onClick={onScrollToTools}
              className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Browse All Tools 🚀
            </button>
            <button
              onClick={onScrollToPricing}
              className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-200 transform hover:scale-105"
            >
              View Packages 💎
            </button>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="font-semibold mb-1">Affordable Pricing</h3>
              <p className="text-blue-200 text-sm">Starting at just $12/month</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-1">Instant Access</h3>
              <p className="text-blue-200 text-sm">Get started immediately</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75A9.75 9.75 0 0012 2.25z" />
                </svg>
            </div>
              <h3 className="font-semibold mb-1">24/7 Support</h3>
              <p className="text-blue-200 text-sm">Always here to help</p>
            </div>
            </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-white border-opacity-20">
            <p className="text-blue-200 text-sm mb-4">
              Trusted by {siteStats?.totalTestimonials || 5000}+ digital marketing professionals worldwide
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6 text-blue-200 text-sm">
              <span>✓ 30-Day Money Back Guarantee</span>
              <span>✓ No Setup Fees</span>
              <span>✓ Cancel Anytime</span>
              <span>✓ SSL Secured</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
