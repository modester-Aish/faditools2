'use client'

import { useState, useEffect } from 'react'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { Testimonial } from '../types'
import Link from 'next/link'

interface TestimonialsProps {
  testimonials: Testimonial[]
  totalTestimonials?: number
}

export default function Testimonials({ testimonials, totalTestimonials = 0 }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isAutoPlaying || testimonials.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, testimonials.length])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  // Don't render if no testimonials
  if (testimonials.length === 0) {
    return null
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
            Hear what our satisfied customers have to say about our services
          </p>
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full text-sm font-semibold">
            {totalTestimonials || testimonials.length}+ Happy Customers
          </div>
        </div>

        {/* Testimonials Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl animate-fade-in-up">
            <div className="text-center">
              {/* Avatar */}
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-3xl mb-6 mx-auto shadow-lg">
                {testimonials[currentIndex].avatar || '👤'}
              </div>

              {/* Stars */}
              <div className="flex justify-center space-x-1 mb-6">
                {renderStars(testimonials[currentIndex].rating || 5)}
              </div>

              {/* Testimonial Content */}
              <blockquote className="text-xl md:text-2xl text-gray-700 italic mb-8 leading-relaxed">
                "{testimonials[currentIndex].content || 'Great service and amazing tools!'}"
              </blockquote>

              {/* Author Info */}
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-1">
                  {testimonials[currentIndex].name || 'Happy Customer'}
                </h4>
                <p className="text-blue-600 font-medium">
                  {testimonials[currentIndex].role || 'Customer'}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={prevTestimonial}
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>

            {/* Dots */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? 'bg-blue-600 scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-white rounded-2xl p-8 md:p-12 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="animate-fade-in-up">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                {totalTestimonials || testimonials.length}+
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

        {/* CTA Section */}
        <div className="text-center mt-12">
          <Link
            href="/testimonials"
            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold text-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Read All {totalTestimonials || testimonials.length}+ Testimonials →
          </Link>
        </div>
      </div>
    </section>
  )
}
