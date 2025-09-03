'use client'

import { Sparkles, Star, Award, TrendingUp } from 'lucide-react'
import { SiteStats } from '@/lib/wordpress-service'

interface HeroProps {
  onScrollToTools: () => void
  onScrollToPricing: () => void
  siteStats?: SiteStats
}

export default function Hero({ onScrollToTools, onScrollToPricing, siteStats }: HeroProps) {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float-2"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float-3"></div>
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 animate-bounce-subtle">
          <Sparkles className="w-8 h-8 text-blue-400 opacity-60" />
        </div>
        <div className="absolute top-40 right-1/4 animate-bounce-subtle" style={{ animationDelay: '1s' }}>
          <Star className="w-6 h-6 text-purple-400 opacity-60" />
        </div>
        <div className="absolute bottom-40 left-1/3 animate-bounce-subtle" style={{ animationDelay: '2s' }}>
          <Award className="w-7 h-7 text-pink-400 opacity-60" />
        </div>
        <div className="absolute bottom-20 right-1/3 animate-bounce-subtle" style={{ animationDelay: '0.5s' }}>
          <TrendingUp className="w-6 h-6 text-blue-500 opacity-60" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="animate-fade-in-up">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            The Leading{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x">
              Group Buy SEO Tools
            </span>
            <br />
            Service Provider
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Access <span className="font-semibold text-blue-600">{siteStats?.totalTools || 130}+ premium SEO tools</span> starting at just{' '}
            <span className="font-bold text-purple-600">$12/month</span>. 
            Boost your digital marketing with the best tools at unbeatable prices.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={onScrollToTools}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 animate-pulse-glow"
            >
              View All Tools 🚀
            </button>
            <button
              onClick={onScrollToPricing}
              className="px-8 py-4 bg-white text-gray-700 border-2 border-gray-300 rounded-xl font-semibold text-lg hover:border-blue-500 hover:text-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Start Free Trial ⭐
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center animate-bounce-in">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                {siteStats?.totalTools || 130}+
              </div>
              <div className="text-gray-600 font-medium">Premium Tools</div>
            </div>
            <div className="text-center animate-bounce-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">99.9%</div>
              <div className="text-gray-600 font-medium">Uptime</div>
            </div>
            <div className="text-center animate-bounce-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-3xl md:text-4xl font-bold text-pink-600 mb-2">24/7</div>
              <div className="text-gray-600 font-medium">Support</div>
            </div>
            <div className="text-center animate-bounce-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                {siteStats?.totalTestimonials || 5000}+
              </div>
              <div className="text-gray-600 font-medium">Happy Clients</div>
            </div>
          </div>

          {/* Additional Stats */}
          {siteStats && (
            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-700 mb-1">
                  {siteStats.totalPackages}+
                </div>
                <div className="text-sm text-gray-500">Packages</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-700 mb-1">
                  {siteStats.totalPosts}+
                </div>
                <div className="text-sm text-gray-500">Blog Posts</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-700 mb-1">
                  {siteStats.totalPages}+
                </div>
                <div className="text-sm text-gray-500">Pages</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center text-gray-500">
          <span className="text-sm mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  )
}