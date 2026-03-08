/**
 * Product ID Mapping (IDs 1–60 only)
 * Buy Now = cart link with this ID. No match = signup link.
 */

export const SIGNUP_URL = 'https://members.buyseo.org/signup'

export interface ProductIdMapping {
  [key: string]: {
    productId: string
    name: string
  }
}

// Only these IDs are used for cart links; all others use signup
export const productIdMapping: ProductIdMapping = {
  'mega-pack': { productId: '1', name: 'Mega Pack' },
  'ispionage': { productId: '2', name: 'Ispionage' },
  'semrush': { productId: '4', name: 'SEMrush' },
  'lite-plan': { productId: '5', name: 'Lite plan' },
  'small-plan': { productId: '6', name: 'Small plan' },
  'ahrefs': { productId: '7', name: 'Ahrefs' },
  'writer-plan': { productId: '8', name: 'Writer plan' },
  'designer-plan': { productId: '9', name: 'Designer plan' },
  'chatgpt': { productId: '11', name: 'ChatGPT' },
  'chatgpt-plus': { productId: '11', name: 'ChatGPT Plus' },
  'canva': { productId: '12', name: 'Canva' },
  'grammarly': { productId: '13', name: 'Grammarly' },
  'moz': { productId: '14', name: 'Moz' },
  'midjourney': { productId: '15', name: 'Midjourney' },
  'jasper': { productId: '17', name: 'Jasper' },
  'envato': { productId: '18', name: 'Envato' },
  'adobe': { productId: '19', name: 'Adobe' },
  'freepik': { productId: '20', name: 'Freepik' },
  'netflix': { productId: '21', name: 'Netflix' },
  'skillshare': { productId: '22', name: 'Skillshare' },
  'coursera': { productId: '23', name: 'Coursera' },
  'udemy': { productId: '24', name: 'Udemy' },
  'hekium': { productId: '25', name: 'Hekium' },
  'helium10': { productId: '25', name: 'Helium 10' },
  'jungle-scout': { productId: '26', name: 'Jungle Scout' },
  'vidiq': { productId: '27', name: 'Vidiq' },
  'buzzsumo': { productId: '28', name: 'Buzzsumo' },
  'surfer': { productId: '29', name: 'Surfer' },
  'surfer-seo': { productId: '29', name: 'Surfer SEO' },
  'farse': { productId: '30', name: 'Farse' },
  'frase-io': { productId: '30', name: 'Frase' },
  'writer-sonic': { productId: '31', name: 'Writer Sonic' },
  'writesonic': { productId: '31', name: 'Writesonic' },
  'copyai': { productId: '32', name: 'CopyAI' },
  'copy-ai': { productId: '32', name: 'Copy.ai' },
  'ryttr-me': { productId: '33', name: 'Ryttr.me' },
  'rytr': { productId: '33', name: 'Rytr' },
  'pictory': { productId: '34', name: 'Pictory' },
  'elevenlabs': { productId: '35', name: 'ElevenLabs' },
  'similarweb': { productId: '36', name: 'SimilarWeb' },
  'spyfu': { productId: '37', name: 'SpyFu' },
  'mangools': { productId: '38', name: 'Mangools' },
  'ubersuggest': { productId: '39', name: 'Ubersuggest' },
  'serpstat': { productId: '40', name: 'Serpstat' },
  'majestic': { productId: '41', name: 'Majestic' },
  'quillbot': { productId: '42', name: 'Quillbot' },
  'wordai': { productId: '43', name: 'WordAI' },
  'storyblocks': { productId: '44', name: 'Storyblocks' },
  'leonardo-ai': { productId: '45', name: 'Leonardo AI' },
  'claude': { productId: '46', name: 'Claude' },
  'gamma': { productId: '47', name: 'Gamma' },
  'lumen': { productId: '48', name: 'Lumen' },
  'prezi': { productId: '49', name: 'Prezi' },
  'capcut': { productId: '50', name: 'CapCut' },
  'renderforest': { productId: '51', name: 'Renderforest' },
  'vyond': { productId: '52', name: 'Vyond' },
  'adspy': { productId: '53', name: 'AdSpy' },
  'bigspy': { productId: '54', name: 'BigSpy' },
  'kwfinder': { productId: '55', name: 'KWFinder' },
  'e-comrace': { productId: '56', name: 'E-comrace' },
  'adheart-me': { productId: '57', name: 'Adheart.me' },
  'advertsuite': { productId: '58', name: 'AdvertSuite' },
  'ai-content-lab': { productId: '59', name: 'AI Content Lab' },
  'ai-seo': { productId: '60', name: 'AI SEO' },
}

/**
 * Get product ID by slug (only from the 1–60 mapping)
 */
export function getProductIdBySlug(slug: string): string | null {
  const mapping = productIdMapping[slug.toLowerCase()]
  return mapping ? mapping.productId : null
}

/**
 * Get product ID by product name (fuzzy match against mapping names/slugs)
 */
export function getProductIdByName(productName: string): string | null {
  if (!productName) return null
  const nameLower = productName.toLowerCase()
  const commonWords = ['group', 'buy', 'tool', 'tools', 'premium', 'pro', 'subscription', 'account', 'access', 'plan', 'pack']
  const cleanedName = nameLower
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2 && !commonWords.includes(word))
    .join(' ')
  const slugFormat = cleanedName.replace(/\s+/g, '-')
  const exactMatch = productIdMapping[slugFormat]
  if (exactMatch) return exactMatch.productId
  const keywords = cleanedName.split(/\s+/).filter(word => word.length > 2)
  for (const [slug, mapping] of Object.entries(productIdMapping)) {
    const mappingNameLower = mapping.name.toLowerCase()
    const slugWords = slug.split('-')
    for (const keyword of keywords) {
      if (slug === keyword || slug.includes(keyword) || keyword.includes(slug)) return mapping.productId
      if (slugWords.some(w => w === keyword || w.includes(keyword) || keyword.includes(w))) return mapping.productId
      if (mappingNameLower.includes(keyword) || keyword.includes(mappingNameLower.replace(/\s+/g, ''))) return mapping.productId
    }
    if (keywords.some(k => mappingNameLower.includes(k))) return mapping.productId
  }
  return null
}

/**
 * Cart URL for a product ID (only use IDs from mapping)
 */
export function generateBuyUrl(productId: string): string {
  return `https://members.buyseo.org/cart/index/product/id/${productId}/c/`
}

/**
 * Buy URL if slug/name is in mapping, otherwise signup URL
 */
export function getBuyOrSignupUrl(slug: string, productName?: string): string {
  const id = getProductIdBySlug(slug) || (productName ? getProductIdByName(productName) : null)
  return id ? generateBuyUrl(id) : SIGNUP_URL
}
