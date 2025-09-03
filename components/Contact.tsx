'use client'

import { useRef, useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

const Contact = () => {
  const ref = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const contactInfo = [
    {
      icon: Mail,
      text: 'hello@digitalvision.com',
      href: 'mailto:hello@digitalvision.com'
    },
    {
      icon: Phone,
      text: '+1 (555) 123-4567',
      href: 'tel:+15551234567'
    },
    {
      icon: MapPin,
      text: '123 Digital Street, Tech City, TC 12345',
      href: '#'
    }
  ]

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-secondary-50 to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className="grid lg:grid-cols-2 gap-16 animate-fade-in"
        >
          {/* Contact Info */}
          <div className="animate-slide-in-left">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
              Get In Touch
            </h2>
            <p className="text-lg text-secondary-600 mb-8 leading-relaxed">
              Ready to start your next project? Let's discuss how we can help you achieve your digital goals.
            </p>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  className="flex items-center space-x-4 text-secondary-600 hover:text-primary-600 transition-colors duration-200 group animate-fade-in"
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                >
                  <div className="w-12 h-12 bg-white rounded-lg shadow-md flex items-center justify-center group-hover:bg-primary-50 transition-all duration-200 hover:scale-110 hover:rotate-5">
                    <info.icon className="w-6 h-6" />
                  </div>
                  <span className="text-lg">{info.text}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 animate-slide-in-right">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <label htmlFor="name" className="block text-sm font-medium text-secondary-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your name"
                />
              </div>

              <div className="animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
                <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>

              <div className="animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                <label htmlFor="subject" className="block text-sm font-medium text-secondary-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter subject"
                />
              </div>

              <div className="animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
                <label htmlFor="message" className="block text-sm font-medium text-secondary-700 mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Enter your message"
                />
              </div>

              <button
                type="submit"
                className="w-full btn btn-primary flex items-center justify-center animate-fade-in-up hover:scale-105 active:scale-95 transition-transform duration-200"
                style={{ animationDelay: '1.0s' }}
              >
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
