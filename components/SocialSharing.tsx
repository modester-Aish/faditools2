'use client'

interface SocialSharingProps {
  url?: string
  title?: string
  description?: string
  className?: string
}

export default function SocialSharing({
  url = typeof window !== 'undefined' ? window.location.href : 'https://faditools.com',
  title = 'Best SEO Tools Group Buy 2025 - Ahrefs SEMrush 90%',
  className = ''
}: SocialSharingProps) {
  const shareUrl = encodeURIComponent(url)
  const shareTitle = encodeURIComponent(title)
  const whatsappLink = `https://wa.me/?text=${shareTitle}%20${shareUrl}`

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <span className="text-sm font-medium text-gray-700 mr-2">Share:</span>
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors duration-200 shadow-md hover:shadow-lg"
        aria-label="Share on WhatsApp"
        title="Share on WhatsApp"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .96 4.534.96 10.08c0 1.792.413 3.53 1.2 5.11L0 24l8.896-2.312a11.88 11.88 0 003.154.422h.005c6.554 0 11.089-4.535 11.089-10.08 0-2.688-1.037-5.216-2.927-7.12"/>
        </svg>
      </a>
    </div>
  )
}

