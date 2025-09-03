'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { fetchNavigationData, clearNavigationCache, NavigationItem } from '@/lib/navigation-api'

interface NavigationContextType {
  navigationItems: NavigationItem[]
  loading: boolean
  error: string | null
  refreshNavigation: () => Promise<void>
  clearCache: () => void
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

interface NavigationProviderProps {
  children: ReactNode
}

export function NavigationProvider({ children }: NavigationProviderProps) {
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadNavigation = async () => {
    try {
      setLoading(true)
      setError(null)
      const items = await fetchNavigationData()
      setNavigationItems(items)
    } catch (err) {
      setError('Failed to load navigation')
      console.error('Navigation loading error:', err)
    } finally {
      setLoading(false)
    }
  }

  const refreshNavigation = async () => {
    clearNavigationCache()
    await loadNavigation()
  }

  const clearCache = () => {
    clearNavigationCache()
  }

  useEffect(() => {
    loadNavigation()
  }, [])

  const value: NavigationContextType = {
    navigationItems,
    loading,
    error,
    refreshNavigation,
    clearCache,
  }

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider')
  }
  return context
}
