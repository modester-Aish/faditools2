'use client'

import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react'
import { Youtube, Pinterest } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    tools: [
      { name: 'All Tools', href: '/tools' },
      { name: 'AHREF$', href: '/ahrefs' },
      { name: 'SEMRU$H', href: '/semrush' },
      { name: 'Moz Pro', href: '/moz' },
      { name: 'Canva Pro', href: '/canva' }
    ],
    packages: [
      { name: 'All Packages', href: '/packages' },
      { name: 'SEO Combo', href: '/seo-combo' },
      { name: 'Heavy Pack', href: '/heavy-pack' },
      { name: 'Mega Pack', href: '/mega-pack' },
      { name: 'Mega Combo', href: '/mega-combo' }
    ],
    company: [
      { name: 'About Us', href: '/about-us' },
      { name: 'Contact', href: '/contact' },
      { name: 'Blog', href: '/blog' },
      { name: 'Testimonials', href: '/testimonials' },
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms of Service', href: '/terms-of-service' },
      { name: 'Authors/Team', href: '/authors-team' },
      { name: 'Editorial Guidelines', href: '/editorial-guidelines' },
      { name: 'HTML Sitemap', href: '/sitemap' }
    ],
  }

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/faditools' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/faditools' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/faditools' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/faditools' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/@faditools' },
    { name: 'Pinterest', icon: Pinterest, href: 'https://pinterest.com/faditools' },
    { name: 'TikTok', icon: () => (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
      </svg>
    ), href: 'https://tiktok.com/@faditools' }
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
                  aria-label={social.name}
                >
                  {typeof social.icon === 'function' ? (
                    <social.icon />
                  ) : (
                    <social.icon className="w-5 h-5" />
                  )}
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

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-emerald-600">Company</h4>
            <ul className="space-y-2">
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
              <a href="https://www.dmca.com/Protection/Status.aspx?ID=faditools" target="_blank" rel="noopener noreferrer" className="ml-4">
                <img src="https://images.dmca.com/Badges/dmca_protected_sml_120n.png?ID=faditools" alt="DMCA.com Protection Status" className="inline-block h-4" />
              </a>
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy-policy" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}