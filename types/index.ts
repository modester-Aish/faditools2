export interface Tool {
  id: string
  name: string
  price: string
  period: string
  popular?: boolean
  color: string
  icon: string
  description: string
  slug?: string
  buyUrl?: string
}

export interface Package {
  id: string
  name: string
  price: string
  description: string
  tools: string[]
  popular?: boolean
  color: string
  icon: string
  savings?: string
  toolCount: number
  slug?: string
  buyUrl?: string
  features?: Array<{
    icon: string
    title: string
    description?: string
  }>
}


export interface Package {
  id: string
  name: string
  price: string
  description: string
  tools: string[]
  popular?: boolean
  color: string
  icon: string
  savings?: string
  toolCount: number
  slug?: string
  buyUrl?: string
}

export interface CartItem {
  id: string
  name: string
  price: string
  type: 'tool' | 'package'
  slug?: string
}

export interface User {
  id: string
  name: string
  email: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  rating: number
  avatar: string
}

export interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

// Re-export WordPress types from unified types file
export type { 
  WordPressRenderedContent,
  WordPressPost,
  WordPressPage,
  WordPressCategory,
  WordPressTag,
  WordPressSEO,
  RankMathData,
  Product
} from './wordpress'

// Re-export utility functions
export { 
  getSafeDate,
  getSafeString,
  getSafeArray
} from './wordpress'
