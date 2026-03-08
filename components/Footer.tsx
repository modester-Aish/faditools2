'use client'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#1A1A1A] text-white">
      {/* Brand + Description - centered, balanced */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-lg flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-xl">F</span>
          </div>
          <h3 className="text-2xl font-bold text-emerald-500">FadiTools</h3>
        </div>
        <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
          The leading group buy SEO tools service provider. Access 130+ premium digital marketing tools at unbeatable prices. Trusted by thousands of professionals worldwide.
        </p>
      </div>

      {/* Bottom: Copyright + DMCA - same width, aligned */}
      <div className="border-t border-gray-700">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-gray-400 text-sm text-center">
            <span>© {currentYear} FadiTools. All rights reserved.</span>
            <a
              href="https://www.dmca.com/Protection/Status.aspx?ID=faditools"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center"
              aria-label="DMCA.com Protection Status"
            >
              <img
                src="https://images.dmca.com/Badges/dmca_protected_sml_120n.png?ID=faditools"
                alt="DMCA.com Protection Status"
                className="h-4 w-auto"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
