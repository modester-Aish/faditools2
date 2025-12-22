'use client'

import { useState } from 'react'
import Image from 'next/image'

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: "What kind of services do you offer?",
    answer: "We offer premium SEO tools including AHREF$, SEMRU$H, Moz Pro, and 50+ other professional tools at up to 90% discount. Our services include keyword research, backlink analysis, competitor analysis, and comprehensive SEO solutions."
  },
  {
    question: "Is it safe to use FadiTools services?",
    answer: "Yes, absolutely! We are a registered company with thousands of satisfied customers. All our tools are legitimate and we provide 24/7 support with 99.9% uptime guarantee."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major payment methods including credit cards, PayPal, Stripe, and bank transfers. All payments are secure and encrypted for your safety."
  },
  {
    question: "Are there discounts for large orders?",
    answer: "Yes! We offer special discounts for bulk orders and enterprise customers. Contact our sales team for custom pricing on large orders."
  },
  {
    question: "Do you offer a free trial?",
    answer: "We offer a 24-hour free trial for new users to test our tools. This allows you to experience the full functionality before making a purchase decision."
  },
  {
    question: "How long does the delivery take?",
    answer: "Access to tools is granted instantly upon successful payment. You'll receive login credentials within 5-10 minutes of your order confirmation."
  },
  {
    question: "My order has not started. What should I do?",
    answer: "If you haven't received access within 10 minutes, please contact our 24/7 support team. We'll resolve any issues immediately and ensure you get access right away."
  },
  {
    question: "Does FadiTools offer an Affiliate Program?",
    answer: "Yes! We have a lucrative affiliate program where you can earn up to 30% commission on referrals. Join our affiliate program to start earning passive income."
  },
  {
    question: "What information do you require? Is my privacy secured?",
    answer: "We only require basic information like email and payment details. Your privacy is our top priority - all data is encrypted and we never share your information with third parties."
  },
  {
    question: "Can I purchase Views, Likes, and Followers and other services?",
    answer: "Yes, we offer comprehensive social media services including views, likes, followers, and engagement across all major platforms. All services are delivered safely and naturally."
  }
]

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? [] // Close the item if it's already open
        : [index] // Open only this item, close all others
    )
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 mt-8 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-emerald-600">
              Frequently Asked <span className="relative inline-block px-3 sm:px-4 py-2">
                <Image 
                  src="/stroke-removebg-preview.png"
                  width={128}
                  height={40}
                  priority
                  alt="Background" 
                  className="absolute inset-0 w-full h-full object-cover rounded-xl"
                  style={{ filter: 'hue-rotate(120deg) saturate(1.2) brightness(0.9)' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <span className="relative z-10 text-white font-bold">Questions</span>
              </span>
            </span>
          </h2>
          <p className="text-base text-gray-600 max-w-3xl mx-auto">
            <span className="inline-block">
              Common questions about our services and how we can help you succeed
            </span>
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-emerald-25 to-emerald-50 backdrop-blur-xl rounded-3xl shadow-sm border border-emerald-500/15 overflow-hidden hover:border-emerald-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/20 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="font-medium text-gray-900 pr-4">
                    {item.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                      openItems.includes(index) ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                
                {openItems.includes(index) && (
                  <div className="px-6 pb-4">
                    <div className="border-t border-gray-100 pt-4">
                      <p className="text-gray-600 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                )}
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
