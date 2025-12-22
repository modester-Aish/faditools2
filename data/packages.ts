import { Package } from '../types'

export const packages: Package[] = [
  {
    id: 'seo-combo',
    name: 'SEO Combo',
    price: '$30.00',
    description: 'Essential SEO tools for professionals',
    toolCount: 11,
    tools: [
      'SEMRU$H', 'AHREF$', 'Moz Pro', 'Majestic', 'SpyFu',
      'Screaming Frog', 'GTmetrix', 'Pingdom', 'Yoast SEO',
      'Rank Math', 'SEO PowerSuite'
    ],
    color: 'from-blue-500 to-cyan-500',
    icon: '/images/tools/semrush-logo.svg',
    savings: 'Save $30'
  },
  {
    id: 'heavy-pack',
    name: 'Heavy Pack',
    price: '$40.00',
    description: 'Complete digital marketing solution',
    toolCount: 15,
    popular: true,
    tools: [
      'SEMRU$H', 'AHREF$', 'Moz Pro', 'Majestic', 'SpyFu',
      'Canva Pro', 'Grammarly', 'BuzzSumo', 'Hootsuite',
      'Buffer', 'Mailchimp', 'ConvertKit', 'Hotjar',
      'Google Analytics', 'Search Console'
    ],
    color: 'from-purple-500 to-pink-500',
    icon: '/images/tools/canva-logo.svg',
    savings: 'Save $45'
  },
  {
    id: 'mega-pack',
    name: 'Mega Pack',
    price: '$50.00',
    description: 'Advanced tools for agencies',
    toolCount: 20,
    tools: [
      'SEMRU$H', 'AHREF$', 'Moz Pro', 'Majestic', 'SpyFu',
      'Canva Pro', 'Grammarly', 'BuzzSumo', 'Hootsuite',
      'Buffer', 'Mailchimp', 'ConvertKit', 'Hotjar',
      'Google Analytics', 'Search Console', 'Ubersuggest',
      'KWFinder', 'SurferSEO', 'ContentKing', 'DeepCrawl'
    ],
    color: 'from-green-500 to-teal-500',
    icon: '/images/tools/chatgpt-logo.svg',
    savings: 'Save $60'
  },
  {
    id: 'mega-combo',
    name: 'Mega Combo Pack',
    price: '$60.00',
    description: 'All premium tools included',
    toolCount: 42,
    tools: [
      'SEMRU$H', 'AHREF$', 'Moz Pro', 'Majestic', 'SpyFu',
      'Canva Pro', 'Grammarly', 'BuzzSumo', 'Hootsuite',
      'Buffer', 'Mailchimp', 'ConvertKit', 'Hotjar',
      'Google Analytics', 'Search Console', 'Ubersuggest',
      'KWFinder', 'SurferSEO', 'ContentKing', 'DeepCrawl',
      'Screaming Frog', 'GTmetrix', 'Pingdom', 'Yoast SEO',
      'Rank Math', 'SEO PowerSuite', 'Serpstat', 'Long Tail Pro',
      'Market Samurai', 'WordTracker', 'SpyFu', 'iSpionage',
      'SECockpit', 'Keyword Tool', 'Answer The Public',
      'Google Keyword Planner', 'Bing Keyword Tool',
      'YouTube Keyword Tool', 'Amazon Keyword Tool',
      'eBay Keyword Tool', 'Pinterest Keyword Tool',
      'Instagram Hashtag Tool'
    ],
    color: 'from-orange-500 to-red-500',
    icon: '/images/tools/ahrefs-logo.svg',
    savings: 'Save $100'
  }
]
