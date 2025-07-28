"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export type UserType = 'customer' | 'provider'

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  type: UserType
  avatar?: string
  phone?: string
  isVerified: boolean
  // Customer specific
  totalBookings?: number
  totalSpent?: number
  favoriteProviders?: number
  // Provider specific
  businessName?: string
  services?: string[]
  rating?: number
  totalReviews?: number
  completedJobs?: number
  totalEarnings?: number
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string, userType?: UserType) => Promise<void>
  logout: () => void
  redirectToDashboard: () => void
  updateUser: (userData: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Mock user data - in real app this would come from API
const mockUsers: Record<string, User> = {
  'customer@example.com': {
    id: 'cust_001',
    email: 'customer@example.com',
    firstName: 'John',
    lastName: 'Doe',
    type: 'customer',
    avatar: '/placeholder.svg',
    phone: '+1 (555) 123-4567',
    isVerified: true,
    totalBookings: 24,
    totalSpent: 2850,
    favoriteProviders: 8,
  },
  'provider@example.com': {
    id: 'prov_001',
    email: 'provider@example.com',
    firstName: 'John',
    lastName: 'Smith',
    type: 'provider',
    avatar: '/placeholder.svg',
    phone: '+1 (555) 987-6543',
    isVerified: true,
    businessName: 'Smith Professional Services',
    services: ['Plumbing', 'Electrical', 'HVAC'],
    rating: 4.9,
    totalReviews: 156,
    completedJobs: 189,
    totalEarnings: 45600,
  },
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const isAuthenticated = !!user

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In real app, check for valid token/session
        const savedUser = localStorage.getItem('user')
        if (savedUser) {
          const userData = JSON.parse(savedUser)
          setUser(userData)
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        localStorage.removeItem('user')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string, userType?: UserType) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Mock authentication
      const userData = mockUsers[email]
      if (!userData) {
        throw new Error('Invalid credentials')
      }

      // If userType is specified, verify it matches
      if (userType && userData.type !== userType) {
        throw new Error(`Invalid user type. Expected ${userType}, got ${userData.type}`)
      }

      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
      
      // Redirect to appropriate dashboard
      redirectToDashboard(userData.type)
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    router.push('/login')
  }

  const redirectToDashboard = (userType?: UserType) => {
    const type = userType || user?.type
    if (!type) return

    switch (type) {
      case 'customer':
        router.push('/customer/dashboard')
        break
      case 'provider':
        router.push('/provider/dashboard')
        break
      default:
        router.push('/dashboard') // fallback
    }
  }

  const updateUser = (userData: Partial<User>) => {
    if (!user) return
    
    const updatedUser = { ...user, ...userData }
    setUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))
  }

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    redirectToDashboard,
    updateUser,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Higher-order component for protecting routes
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  allowedUserTypes?: UserType[]
) {
  return function AuthenticatedComponent(props: P) {
    const { user, isLoading } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (!isLoading) {
        if (!user) {
          router.push('/login')
          return
        }

        if (allowedUserTypes && !allowedUserTypes.includes(user.type)) {
          // Redirect to appropriate dashboard if user type doesn't match
          switch (user.type) {
            case 'customer':
              router.push('/customer/dashboard')
              break
            case 'provider':
              router.push('/provider/dashboard')
              break
            default:
              router.push('/dashboard')
          }
          return
        }
      }
    }, [user, isLoading, router])

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      )
    }

    if (!user) {
      return null
    }

    if (allowedUserTypes && !allowedUserTypes.includes(user.type)) {
      return null
    }

    return <Component {...props} />
  }
}

// Hook for redirecting based on user type
export function useUserTypeRedirect() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  const redirectBasedOnUserType = () => {
    if (!isAuthenticated || !user) {
      router.push('/login')
      return
    }

    switch (user.type) {
      case 'customer':
        router.push('/customer/dashboard')
        break
      case 'provider':
        router.push('/provider/dashboard')
        break
      default:
        router.push('/dashboard')
    }
  }

  return { redirectBasedOnUserType }
}
