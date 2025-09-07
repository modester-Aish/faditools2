'use client'

import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    tools: [
      { name: 'All Tools', href: '/tools' },
      { name: 'SEO Tools', href: '/tools?category=seo' },
      { name: 'Keyword Research', href: '/tools?category=keyword-research' },
      { name: 'Backlink Tools', href: '/tools?category=backlinks' },
      { name: 'Analytics Tools', href: '/tools?category=analytics' }
    ],
    packages: [
      { name: 'All Packages', href: '/packages' },
      { name: 'Starter Package', href: '/starter' },
      { name: 'Professional Package', href: '/professional' },
      { name: 'Enterprise Package', href: '/enterprise' },
      { name: 'Custom Solutions', href: '/custom' }
    ],
    company: [
      { name: 'About Us', href: '/about-us' },
      { name: 'Contact', href: '/contact' },
      { name: 'Blog', href: '/blog' },
      { name: 'Testimonials', href: '/testimonials' },
      { name: 'Careers', href: '/careers' }
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Documentation', href: '/docs' },
      { name: 'API Reference', href: '/api' },
      { name: 'Status Page', href: '/status' },
      { name: 'Contact Support', href: '/support' }
    ]
  }

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/faditools' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/faditools' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/faditools' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/faditools' }
  ]

  return (
    <footer className="bg-background text-gray-800">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <h3 className="text-2xl font-bold text-emerald-600">FadiTools</h3>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              The leading group buy SEO tools service provider. Access 130+ premium digital marketing tools 
              at unbeatable prices. Trusted by thousands of professionals worldwide.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <Mail className="w-4 h-4 mr-3 text-emerald-600" />
                <span>support@faditools.com</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="w-4 h-4 mr-3 text-emerald-600" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-3 text-emerald-600" />
                <span>Global Service Provider</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Tools Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-emerald-600">Tools</h4>
            <ul className="space-y-2">
              {footerLinks.tools.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-emerald-600 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Packages Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-emerald-600">Packages</h4>
            <ul className="space-y-2">
              {footerLinks.packages.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-emerald-600 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Support Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-emerald-600">Company</h4>
            <ul className="space-y-2 mb-6">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-emerald-600 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="text-lg font-semibold mb-4 text-emerald-600">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-emerald-600 transition-colors duration-200"
                  >
                    {link.name}
                </Link>
              </li>
            ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
              <div className="border-t border-emerald-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h4 className="text-xl font-semibold mb-2 text-emerald-600">Stay Updated</h4>
            <p className="text-gray-600 mb-6">
              Get the latest updates on new tools, features, and digital marketing tips.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white border border-emerald-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
              />
                              <button className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Subscribe
                </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
              <div className="border-t border-emerald-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-600 text-sm mb-4 md:mb-0">
              © {currentYear} FadiTools. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}