// Utility functions for the ToolsHub website

export const formatPrice = (price: string): number => {
  return parseFloat(price.replace('$', ''))
}

export const formatCurrency = (amount: number): string => {
  return `$${amount.toFixed(2)}`
}

export const scrollToElement = (elementId: string): void => {
  const element = document.querySelector(elementId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password: string): boolean => {
  return password.length >= 6
}

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return text.substr(0, maxLength) + '...'
}

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void => {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export const classNames = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ')
}

// WordPress utility functions
export function getFeaturedImageUrlFromEmbedded(post: any): string | null {
  if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
    const media = post._embedded['wp:featuredmedia'][0]
    return media.source_url || media.guid?.rendered || null
  }
  return null
}

export function generateTableOfContents(content: string): Array<{id: string, text: string, level: number}> {
  const parser = new DOMParser()
  const doc = parser.parseFromString(content, 'text/html')
  const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6')
  
  const toc: Array<{id: string, text: string, level: number}> = []
  headings.forEach((heading, index) => {
    const id = `heading-${index}`
    heading.id = id
    toc.push({
      id,
      text: heading.textContent || '',
      level: parseInt(heading.tagName.charAt(1))
    })
  })
  return toc
}
