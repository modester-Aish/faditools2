import { 
  fetchAllPages, 
  fetchAllPosts, 
  fetchAllMedia, 
  fetchCategories, 
  fetchTags,
  fetchMenus,
  filterPublishedPages,
  filterPublishedPosts,
  sortByDate,
  getTitle,
  getContent,
  getExcerpt,
  getFeaturedImageUrl,
  clearWordPressCache
} from './wordpress-api'
import { 
  fetchTools, 
  getPackages, 
  getTestimonials
} from './api'
import { WordPressPage, WordPressPost } from '@/types/wordpress'
import { Tool, Package, Testimonial } from '@/types'

export interface WordPressSiteData {
  // Custom content
  tools: Tool[]
  packages: Package[]
  testimonials: Testimonial[]
  
  // WordPress content
  pages: WordPressPage[]
  posts: WordPressPost[]
  media: any[]
  categories: any[]
  tags: any[]
  menus: any[]
  
  // Navigation
  navigation: NavigationItem[]
  
  // Meta
  lastUpdated: Date
  loading: boolean
  error: string | null
}

export interface NavigationItem {
  title: string
  slug: string
  url: string
  type: 'page' | 'post' | 'custom'
  children?: NavigationItem[]
}

export interface SiteStats {
  totalTools: number
  totalPackages: number
  totalTestimonials: number
  totalPages: number
  totalPosts: number
  totalMedia: number
}

class WordPressService {
  private cache: Map<string, { data: any; timestamp: number }> = new Map()
  private CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

  // Fetch all site data
  async fetchAllSiteData(): Promise<WordPressSiteData> {
    try {
      console.log('🔄 Fetching all WordPress site data...')
      
      const [
        toolsResponse,
        packagesResponse,
        testimonialsResponse,
        pagesResponse,
        postsResponse,
        mediaResponse,
        categoriesResponse,
        tagsResponse,
        menusResponse
      ] = await Promise.all([
        fetchTools(),
        getPackages(),
        getTestimonials(),
        fetchAllPages(),
        fetchAllPosts(),
        fetchAllMedia(),
        fetchCategories(),
        fetchTags(),
        fetchMenus()
      ])

      // Process and filter data
      const tools = toolsResponse || []
      const packages = packagesResponse || []
      const testimonials = testimonialsResponse || []
      const pages = filterPublishedPages(pagesResponse.data || [])
      const posts = filterPublishedPosts(postsResponse.data || [])
      const media = mediaResponse.data || []
      const categories = categoriesResponse.data || []
      const tags = tagsResponse.data || []
      const menus = menusResponse.data || []

      // Generate navigation
      const navigation = this.generateNavigation(pages, posts)

      const siteData: WordPressSiteData = {
        tools,
        packages,
        testimonials,
        pages,
        posts,
        media,
        categories,
        tags,
        menus,
        navigation,
        lastUpdated: new Date(),
        loading: false,
        error: null
      }

      // Cache the result
      this.cache.set('siteData', { data: siteData, timestamp: Date.now() })

      console.log('✅ WordPress site data fetched successfully')
      return siteData

    } catch (error) {
      console.error('❌ Error fetching WordPress site data:', error)
      return {
        tools: [],
        packages: [],
        testimonials: [],
        pages: [],
        posts: [],
        media: [],
        categories: [],
        tags: [],
        menus: [],
        navigation: [],
        lastUpdated: new Date(),
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    }
  }

  // Get cached site data or fetch fresh
  async getSiteData(): Promise<WordPressSiteData> {
    const cached = this.cache.get('siteData')
    
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data
    }

    return this.fetchAllSiteData()
  }

  // Force refresh all data
  async refreshAllData(): Promise<WordPressSiteData> {
    console.log('🔄 Force refreshing all WordPress data...')
    
    // Clear all caches
    clearWordPressCache()
    this.cache.clear()
    
    return this.fetchAllSiteData()
  }

  // Generate navigation from pages and posts
  private generateNavigation(pages: WordPressPage[], posts: WordPressPost[]): NavigationItem[] {
    const navigation: NavigationItem[] = []

    // Add main pages
    pages.forEach(page => {
      navigation.push({
        title: getTitle(page),
        slug: page.slug,
        url: `/pages/${page.slug}`,
        type: 'page'
      })
    })

    // Add blog posts (if needed)
    if (posts.length > 0) {
      navigation.push({
        title: 'Blog',
        slug: 'posts',
        url: '/posts',
        type: 'custom'
      })
    }

    return navigation
  }

  // Get site statistics
  getSiteStats(data: WordPressSiteData): SiteStats {
    return {
      totalTools: data.tools.length,
      totalPackages: data.packages.length,
      totalTestimonials: data.testimonials.length,
      totalPages: data.pages.length,
      totalPosts: data.posts.length,
      totalMedia: data.media.length
    }
  }

  // Get popular tools
  getPopularTools(tools: Tool[], limit: number = 6): Tool[] {
    return tools
      .filter(tool => tool.popular)
      .slice(0, limit)
  }

  // Get featured packages
  getFeaturedPackages(packages: Package[], limit: number = 3): Package[] {
    return packages
      .filter(pkg => pkg.popular)
      .slice(0, limit)
  }

  // Get recent posts
  getRecentPosts(posts: WordPressPost[], limit: number = 6): WordPressPost[] {
    return sortByDate(posts, false).slice(0, limit)
  }

  // Get page by slug
  getPageBySlug(pages: WordPressPage[], slug: string): WordPressPage | null {
    return pages.find(page => page.slug === slug) || null
  }

  // Get post by slug
  getPostBySlug(posts: WordPressPost[], slug: string): WordPressPost | null {
    return posts.find(post => post.slug === slug) || null
  }

  // Get tool by slug
  getToolBySlug(tools: Tool[], slug: string): Tool | null {
    return tools.find(tool => tool.slug === slug) || null
  }

  // Get package by slug
  getPackageBySlug(packages: Package[], slug: string): Package | null {
    return packages.find(pkg => pkg.slug === slug) || null
  }

  // Search content
  searchContent(data: WordPressSiteData, query: string): {
    tools: Tool[]
    packages: Package[]
    pages: WordPressPage[]
    posts: WordPressPost[]
  } {
    const searchTerm = query.toLowerCase()
    
    const tools = data.tools.filter(tool => 
      tool.name.toLowerCase().includes(searchTerm) ||
      tool.description.toLowerCase().includes(searchTerm)
    )

    const packages = data.packages.filter(pkg => 
      pkg.name.toLowerCase().includes(searchTerm) ||
      pkg.description.toLowerCase().includes(searchTerm)
    )

    const pages = data.pages.filter(page => 
      getTitle(page).toLowerCase().includes(searchTerm) ||
      getContent(page).toLowerCase().includes(searchTerm)
    )

    const posts = data.posts.filter(post => 
      getTitle(post).toLowerCase().includes(searchTerm) ||
      getContent(post).toLowerCase().includes(searchTerm)
    )

    return { tools, packages, pages, posts }
  }

  // Get related content
  getRelatedContent(data: WordPressSiteData, currentSlug: string, type: 'tool' | 'package' | 'page' | 'post'): any[] {
    switch (type) {
      case 'tool':
        return data.tools.filter(tool => tool.slug !== currentSlug).slice(0, 3)
      case 'package':
        return data.packages.filter(pkg => pkg.slug !== currentSlug).slice(0, 3)
      case 'page':
        return data.pages.filter(page => page.slug !== currentSlug).slice(0, 3)
      case 'post':
        return data.posts.filter(post => post.slug !== currentSlug).slice(0, 3)
      default:
        return []
    }
  }

  // Clear all caches
  clearAllCaches(): void {
    clearWordPressCache()
    this.cache.clear()
    console.log('🧹 All caches cleared')
  }
}

// Export singleton instance
export const wordPressService = new WordPressService()

// Export utility functions
export {
  getTitle,
  getContent,
  getExcerpt,
  getFeaturedImageUrl
}
