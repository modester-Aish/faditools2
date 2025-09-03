'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { User, AuthContextType } from '../types'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Check for existing session on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('toolshub_user')
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock authentication - in real app, validate with backend
      if (email && password.length >= 6) {
        const newUser: User = {
          id: '1',
          name: email.split('@')[0],
          email: email
        }
        setUser(newUser)
        if (typeof window !== 'undefined') {
          localStorage.setItem('toolshub_user', JSON.stringify(newUser))
        }
        setIsLoading(false)
        return true
      }
      setIsLoading(false)
      return false
    } catch (error) {
      setIsLoading(false)
      return false
    }
  }

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock registration - in real app, create user in backend
      if (name && email && password.length >= 6) {
        const newUser: User = {
          id: Date.now().toString(),
          name: name,
          email: email
        }
        setUser(newUser)
        if (typeof window !== 'undefined') {
          localStorage.setItem('toolshub_user', JSON.stringify(newUser))
        }
        setIsLoading(false)
        return true
      }
      setIsLoading(false)
      return false
    } catch (error) {
      setIsLoading(false)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('toolshub_user')
      localStorage.removeItem('toolshub_cart')
    }
  }

  const value: AuthContextType = {
    user,
    login,
    signup,
    logout,
    isLoading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
