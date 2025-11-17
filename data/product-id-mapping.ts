/**
 * Product ID Mapping
 * This file contains mappings for specific product IDs from the user's list
 * Priority: 1. Specific IDs from this mapping, 2. affiliate_link, 3. product.id
 */

export interface ProductIdMapping {
  [key: string]: {
    productId: string
    name: string
  }
}

// Mapping of product names/slugs to their specific product IDs
export const productIdMapping: ProductIdMapping = {
  // Popular Tools (already in popular-tools.ts)
  'ahrefs': { productId: '53', name: 'AHREF$' },
  'semrush': { productId: '8', name: 'SEMRU$H' },
  'moz': { productId: '19', name: 'Moz Pro' },
  'canva': { productId: '65', name: 'Canva Pro' },
  'chatgpt-plus': { productId: '29', name: 'ChatGPT Plus' },
  'runwayml': { productId: '127', name: 'RunwayML' },
  'netflix': { productId: '52', name: 'Netflix' },
  'claude': { productId: '113', name: 'Claude' },
  
  // Additional products from the list (add more as needed)
  'lite-plan': { productId: '56', name: 'Lite plan' },
  'student-plan': { productId: '51', name: 'Student plan' },
  'basic-plan': { productId: '30', name: 'Basic plan' },
  'small-plan': { productId: '35', name: 'Small plan' },
  'standard-plan': { productId: '12', name: 'Standard plan' },
  'ecom-plan': { productId: '3', name: 'Ecom PLAN' },
  'vip-plan': { productId: '17', name: 'VIP Plan' },
  'mega-pack': { productId: '2', name: 'Mega Pack' },
  'mega-pack-ahrefs': { productId: '4', name: 'Mega Pack + Ahrefs unlimited' },
  'writers-pack': { productId: '42', name: 'Writer\'s Pack' },
  'amazon-tools-plan': { productId: '45', name: 'Amazon Tools Plan' },
  'designers-pack': { productId: '46', name: 'Designer\'s Pack' },
  'ahrefs-combo-unlimited': { productId: '7', name: 'AHREF$ Combo Unlimited' },
  'ahrefs-combo': { productId: '53', name: 'AHREF$ Combo' },
  'ahrefs-screaming-frog': { productId: '40', name: 'Ahrefs + screaming frog' },
  'semrush-combo-pack': { productId: '60', name: 'SEMRU$H Combo Pack' },
  'semrush-private': { productId: '20', name: 'Semrush Private' },
  'small-plan-3-months': { productId: '6', name: 'Small plan for 3 months' },
  'ahrefs-unlimited': { productId: '28', name: 'AHREF$ Unlimited' },
  'custom-plan': { productId: '70', name: 'Custome plan' },
  'semrush-6-months': { productId: '55', name: 'Semrush for 6 months' },
  'netflix-logins': { productId: '16', name: 'Netflix Logins' },
  'kwfinder': { productId: '9', name: 'KWFINDER' },
  'majestic': { productId: '10', name: 'MAJESTIC' },
  'helium10': { productId: '36', name: 'Helium10' },
  'jungle-scout': { productId: '33', name: 'Jungle Scout' },
  'jasper-ai': { productId: '48', name: 'Jasper Ai' },
  'quetext': { productId: '57', name: 'Quetext' },
  'grammarly': { productId: '21', name: 'Grammarly' },
  'envato-elements': { productId: '18', name: 'Envato Elements' },
  'chatgpt-pro': { productId: '59', name: 'Chat gpt pro' },
  'storyblocks': { productId: '24', name: 'Storyblocks' },
  'spamzilla': { productId: '31', name: 'spamzilla' },
  'keywordtool-io': { productId: '32', name: 'keywordtool.io' },
  'unbounce': { productId: '61', name: 'Unbounce' },
  'ecomhunt': { productId: '34', name: 'Ecomhunt' },
  'freepik': { productId: '63', name: 'Freepik' },
  'screaming-frog': { productId: '73', name: 'Screaming frog' },
  'buzzsumo': { productId: '41', name: 'Buzzsumo' },
  'bypass-gpt': { productId: '47', name: 'Bypass GPT' },
  'adspy-subscription': { productId: '58', name: 'AdSpy Subscription' },
  'adobe-creative-cloud': { productId: '64', name: 'Adobe Creative Cloud' },
  'udemy': { productId: '66', name: 'Udemy' },
  'neuron-writer': { productId: '67', name: 'Neuron Writer' },
  'capcut-pro': { productId: '72', name: 'CapCut Pro' },
  'agency-plan-1': { productId: '50', name: 'Agency plan (1)' },
  'agency-plan-2': { productId: '15', name: 'Agency plan (2)' },
  'agency-plan-team': { productId: '74', name: 'Agency plan for Team' },
  'keyword-revealer': { productId: '76', name: 'Keyword Revaeler' },
  'wordai': { productId: '77', name: 'WordAi' },
  'wordtune': { productId: '78', name: 'WordTune' },
  'wordhero': { productId: '79', name: 'WordHero' },
  'vyond': { productId: '80', name: 'Vyond' },
  'amztrackers': { productId: '81', name: 'AmzTrackers' },
  'linkedin-learning': { productId: '82', name: 'Linkedin Learning (Lynda)' },
  'ispionage': { productId: '83', name: 'Ispionage' },
  'frase-io': { productId: '84', name: 'frase.io' },
  'spin-rewriter': { productId: '85', name: 'Spin Rewriter' },
  'indexification': { productId: '86', name: 'Indexification' },
  'keywords-everywhere': { productId: '87', name: 'Keywords Everywhere' },
  'answer-the-public': { productId: '88', name: 'Answer The Public' },
  'spyfu': { productId: '89', name: 'SpyFu' },
  'salehoo': { productId: '90', name: 'SaleHoo' },
  'coursera': { productId: '91', name: 'Coursera' },
  'exploding-topics': { productId: '92', name: 'Exploding topics' },
  'sell-the-trend': { productId: '93', name: 'Sell the trend' },
  'woorank': { productId: '94', name: 'Woorank' },
  'videoblocks': { productId: '95', name: 'Videoblocks' },
  'ubersuggest': { productId: '96', name: 'Ubersuggest' },
  'skillshare': { productId: '97', name: 'SkillShare' },
  'serpstat': { productId: '98', name: 'SerpStat' },
  'seo-profiler': { productId: '99', name: 'SEO Profiler' },
  'pillbanana': { productId: '100', name: 'Pillbanana' },
  'pexda': { productId: '101', name: 'Pexda' },
  'cbengine': { productId: '102', name: 'Cbengine' },
  'quillbot': { productId: '103', name: 'Quillbot' },
  'article-builder': { productId: '104', name: 'Article Builder' },
  'article-forge': { productId: '105', name: 'Article Forge' },
  'buzzstream': { productId: '106', name: 'BuzzStream' },
  'copymatic-ai': { productId: '107', name: 'Copymatic.ai' },
  'surfer-seo': { productId: '108', name: 'Surfer Seo' },
  'prime-video': { productId: '109', name: 'Prime Video' },
  'seoptimer': { productId: '110', name: 'SEOptimer' },
  'seo-site-checkup': { productId: '111', name: 'SEO SITE CHECKUP' },
  'you-ai': { productId: '112', name: 'You Ai' },
  'hix-ai': { productId: '114', name: 'Hix Ai' },
  'smartcopy': { productId: '115', name: 'SmartCopy' },
  'closerscopy': { productId: '116', name: 'Closerscopy' },
  'copy-ai': { productId: '117', name: 'Copy ai' },
  'stealthwriter-ai': { productId: '118', name: 'Stealthwriter Ai' },
  'writerzen': { productId: '119', name: 'Writerzen' },
  'writesonic': { productId: '120', name: 'Writesonic' },
  'rytr-me': { productId: '121', name: 'Rytr me' },
  'jenni-ai': { productId: '122', name: 'Jenni Ai' },
  'vecteezy': { productId: '123', name: 'Vecteezy' },
  'designs-ai': { productId: '124', name: 'Designs AI' },
  'picsart': { productId: '125', name: 'Picsart' },
  'fotojet': { productId: '126', name: 'Fotojet' },
  'gpl-themes-plugin': { productId: '128', name: 'GPL - Themes/Plugin WordPress' },
  'chaupal-tv': { productId: '129', name: 'Chaupal tv' },
  'viral-launch': { productId: '130', name: 'Viral Launch' },
  'niche-scraper': { productId: '131', name: 'Niche Scraper' },
  'semscoop': { productId: '132', name: 'SEMSCOOP' },
  'picmonkey': { productId: '133', name: 'Picmonkey' },
  'epidemicsound': { productId: '134', name: 'Epidemicsound' },
  'slidebean': { productId: '135', name: 'SLIDEBEAN' },
  'se-ranking': { productId: '136', name: 'SE Ranking' },
  'wordtracker': { productId: '137', name: 'WordTracker' },
  'motionarray': { productId: '138', name: 'Motionarray' },
  'prezi': { productId: '139', name: 'Prezi' },
  'turnitin-student': { productId: '140', name: 'Turnitin student account' },
  'leonardo-ai': { productId: '141', name: 'Leonardo AI' },
  'renderforest': { productId: '142', name: 'Renderforest' },
  'icon-scout': { productId: '143', name: 'Icon Scout' },
  'scribd-premium': { productId: '144', name: 'Scribd Premium' },
  'sider-ai': { productId: '145', name: 'Sider Ai' },
  'similarweb': { productId: '146', name: 'Similarweb' },
  'writehuman': { productId: '147', name: 'WriteHuman' },
  'agency-unlimited-plan': { productId: '149', name: 'Agency Unlimited plan' },
  'heygen-ai': { productId: '151', name: 'HeyGen AI' },
  'helium-10': { productId: '152', name: 'Helium 10' },
  'premium-vpn': { productId: '153', name: 'Premium VPN' },
  'grok-ai': { productId: '155', name: 'Grok Ai' },
  'google-one-ultra': { productId: '156', name: 'Google One Ultra Plan' },
  'capcut': { productId: '157', name: 'CapCut' },
  'bigspy-pro': { productId: '158', name: 'BigSpy pro Subscription' },
  'spyhero-subscription': { productId: '159', name: 'Spyhero Subscription' },
  'gamma-app-pro': { productId: '160', name: 'gamma app pro' },
  'midjourney': { productId: '161', name: 'Midjourney' },
  'team-plan': { productId: '163', name: 'Team plan' },
  'elevenlabs': { productId: '166', name: 'Elevenlabs' },
}

/**
 * Get product ID by slug
 */
export function getProductIdBySlug(slug: string): string | null {
  const mapping = productIdMapping[slug.toLowerCase()]
  return mapping ? mapping.productId : null
}

/**
 * Get product ID by product name (fuzzy matching)
 * Checks if any word from product name matches with mapping
 */
export function getProductIdByName(productName: string): string | null {
  if (!productName) return null
  
  const nameLower = productName.toLowerCase()
  
  // Remove common words that don't help with matching
  const commonWords = ['group', 'buy', 'tool', 'tools', 'premium', 'pro', 'subscription', 'account', 'access', 'plan', 'pack']
  const cleanedName = nameLower
    .replace(/[^a-z0-9\s]/g, ' ') // Remove special characters
    .split(/\s+/)
    .filter(word => word.length > 2 && !commonWords.includes(word)) // Filter out common words and short words
    .join(' ')
  
  // First try exact match with slug format (replace spaces with hyphens)
  const slugFormat = cleanedName.replace(/\s+/g, '-')
  const exactMatch = productIdMapping[slugFormat]
  if (exactMatch) {
    return exactMatch.productId
  }
  
  // Extract keywords from cleaned product name
  const keywords = cleanedName.split(/\s+/).filter(word => word.length > 2)
  
  // Check each mapping entry for partial matches
  for (const [slug, mapping] of Object.entries(productIdMapping)) {
    const mappingNameLower = mapping.name.toLowerCase()
    const slugWords = slug.split('-')
    
    // Check if any keyword matches with slug or mapping name
    for (const keyword of keywords) {
      // Direct match in slug
      if (slug === keyword || slug.includes(keyword) || keyword.includes(slug)) {
        return mapping.productId
      }
      
      // Match in slug words
      if (slugWords.some(word => word === keyword || word.includes(keyword) || keyword.includes(word))) {
        return mapping.productId
      }
      
      // Match in mapping name
      if (mappingNameLower.includes(keyword) || keyword.includes(mappingNameLower.replace(/\s+/g, ''))) {
        return mapping.productId
      }
    }
    
    // Also check if mapping name contains any keyword
    if (keywords.some(keyword => mappingNameLower.includes(keyword))) {
      return mapping.productId
    }
  }
  
  return null
}

/**
 * Get product ID by WooCommerce product ID (if we need to map WC IDs to custom IDs)
 */
export function getProductIdByWooCommerceId(wcId: number): string | null {
  // This can be used if we need to map WooCommerce IDs to custom product IDs
  // For now, we'll use slug-based mapping
  return null
}

/**
 * Generate buy URL from product ID
 */
export function generateBuyUrl(productId: string): string {
  return `https://members.seotoolsgroupbuy.us/cart/index/product/id/${productId}/c/`
}

