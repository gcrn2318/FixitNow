"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { apiClient } from '@/lib/api-client'
import { socketClient } from '@/lib/socket-client'

export type UserType = 'customer' | 'provider' | 'admin'

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
  token: string | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string, userType?: UserType) => Promise<void>
  register: (userData: RegisterData) => Promise<void>
  logout: () => void
  redirectToDashboard: () => void
  updateUser: (userData: Partial<User>) => void
  refreshAuth: () => Promise<void>
}

interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
  type: UserType
  phone?: string
  businessName?: string
  services?: string[]
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const isAuthenticated = !!user

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedToken = localStorage.getItem('accessToken')
        if (storedToken) {
          setToken(storedToken)
          apiClient.setToken(storedToken)
          const response = await apiClient.getCurrentUser()
          
          if (response.success) {
            setUser(response.data)
            // Connect to socket server
            socketClient.connect(storedToken)
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        // Try to refresh token
        try {
          await apiClient.refreshToken()
          const response = await apiClient.getCurrentUser()
          if (response.success) {
            setUser(response.data)
            const newToken = localStorage.getItem('accessToken')
            if (newToken) {
              setToken(newToken)
              socketClient.connect(newToken)
            }
          }
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError)
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          apiClient.setToken(null)
          setToken(null)
        }
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string, userType?: UserType) => {
    setIsLoading(true)
    try {
      const response = await apiClient.login(email, password, userType)
      
      if (response.success && response.data.user) {
        setUser(response.data.user)
        
        // Connect to socket server
        const newToken = localStorage.getItem('accessToken')
        if (newToken) {
          setToken(newToken)
          socketClient.connect(newToken)
        }
        
        // Redirect to appropriate dashboard
        redirectToDashboard(response.data.user.type)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: RegisterData) => {
    setIsLoading(true)
    try {
      const response = await apiClient.register(userData)
      
      if (response.success && response.data.user) {
        setUser(response.data.user)
        
        // Connect to socket server
        const newToken = localStorage.getItem('accessToken')
        if (newToken) {
          setToken(newToken)
          socketClient.connect(newToken)
        }
        
        // Redirect to appropriate dashboard
        redirectToDashboard(response.data.user.type)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      await apiClient.logout()
    } catch (error) {
      console.error('Logout error:', error)
    }
    
    setUser(null)
    setToken(null)
    socketClient.disconnect()
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
      case 'admin':
        router.push('/admin')
        break
      default:
        router.push('/dashboard') // fallback
    }
  }

  const updateUser = async (userData: Partial<User>) => {
    if (!user) return
    
    try {
      const response = await apiClient.updateProfile(userData)
      if (response.success) {
        setUser(response.data)
      }
    } catch (error) {
      console.error('Update user error:', error)
      throw error
    }
  }

  const refreshAuth = async () => {
    try {
      const response = await apiClient.getCurrentUser()
      if (response.success) {
        setUser(response.data)
      }
    } catch (error) {
      console.error('Refresh auth error:', error)
      throw error
    }
  }

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    redirectToDashboard,
    updateUser,
    refreshAuth,
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
