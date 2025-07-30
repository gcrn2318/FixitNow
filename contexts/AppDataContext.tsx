'use client'

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { apiClient } from '@/lib/api-client'
import { useAuth } from './AuthContext'

// Types
interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  type: 'customer' | 'provider' | 'admin'
  phone?: string
  avatar?: string
  isVerified: boolean
  businessName?: string
  services?: string[]
  rating?: number
  totalReviews?: number
  completedJobs?: number
  totalEarnings?: number
  totalBookings?: number
  totalSpent?: number
}

interface Service {
  _id: string
  name: string
  category: string
  description: string
  icon: string
  basePrice: number
  priceUnit: string
  estimatedDuration: number
  requirements: string[]
  popularity: number
}

interface Booking {
  _id: string
  customer: User
  provider: User
  service: string
  description: string
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  scheduledDate: string
  scheduledTime: string
  estimatedDuration: number
  address: string
  coordinates?: { lat: number; lng: number }
  estimatedPrice: number
  finalPrice?: number
  paymentStatus: 'pending' | 'paid' | 'refunded' | 'cancelled'
  createdAt: string
  updatedAt: string
}

interface Message {
  _id: string
  sender: User
  recipient: User
  content: string
  type: 'text' | 'image' | 'file' | 'location' | 'system'
  booking?: string
  isRead: boolean
  readAt?: string
  isDelivered: boolean
  deliveredAt?: string
  createdAt: string
}

interface Review {
  _id: string
  booking: string
  reviewer: User
  reviewee: User
  rating: number
  comment: string
  categories: {
    quality: number
    punctuality: number
    professionalism: number
    communication: number
    value: number
  }
  isVerified: boolean
  createdAt: string
}

interface AppState {
  // Data
  services: Service[]
  bookings: Booking[]
  messages: Message[]
  conversations: any[]
  reviews: Review[]
  providers: User[]
  users: User[]
  
  // Loading states
  loading: {
    services: boolean
    bookings: boolean
    messages: boolean
    conversations: boolean
    reviews: boolean
    providers: boolean
    users: boolean
  }
  
  // Error states
  errors: {
    services: string | null
    bookings: string | null
    messages: string | null
    conversations: string | null
    reviews: string | null
    providers: string | null
    users: string | null
  }
  
  // Pagination
  pagination: {
    bookings: { page: number; total: number; pages: number }
    messages: { page: number; total: number; pages: number }
    reviews: { page: number; total: number; pages: number }
    providers: { page: number; total: number; pages: number }
    users: { page: number; total: number; pages: number }
  }
  
  // Filters
  filters: {
    bookings: { status?: string; page: number }
    providers: { service?: string; location?: { lat: number; lng: number }; radius?: number; minRating?: number; page: number }
    reviews: { providerId?: string; page: number }
    users: { type?: string; search?: string; page: number }
  }
}

type AppAction =
  | { type: 'SET_LOADING'; payload: { key: keyof AppState['loading']; value: boolean } }
  | { type: 'SET_ERROR'; payload: { key: keyof AppState['errors']; value: string | null } }
  | { type: 'SET_SERVICES'; payload: Service[] }
  | { type: 'SET_BOOKINGS'; payload: { bookings: Booking[]; pagination: any } }
  | { type: 'ADD_BOOKING'; payload: Booking }
  | { type: 'UPDATE_BOOKING'; payload: { id: string; updates: Partial<Booking> } }
  | { type: 'DELETE_BOOKING'; payload: string }
  | { type: 'SET_MESSAGES'; payload: { messages: Message[]; pagination: any } }
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'UPDATE_MESSAGE'; payload: { id: string; updates: Partial<Message> } }
  | { type: 'SET_CONVERSATIONS'; payload: any[] }
  | { type: 'SET_REVIEWS'; payload: { reviews: Review[]; pagination: any } }
  | { type: 'ADD_REVIEW'; payload: Review }
  | { type: 'SET_PROVIDERS'; payload: { providers: User[]; pagination: any } }
  | { type: 'SET_USERS'; payload: { users: User[]; pagination: any } }
  | { type: 'SET_FILTER'; payload: { key: keyof AppState['filters']; value: any } }
  | { type: 'RESET_DATA' }

const initialState: AppState = {
  services: [],
  bookings: [],
  messages: [],
  conversations: [],
  reviews: [],
  providers: [],
  users: [],
  loading: {
    services: false,
    bookings: false,
    messages: false,
    conversations: false,
    reviews: false,
    providers: false,
    users: false,
  },
  errors: {
    services: null,
    bookings: null,
    messages: null,
    conversations: null,
    reviews: null,
    providers: null,
    users: null,
  },
  pagination: {
    bookings: { page: 1, total: 0, pages: 0 },
    messages: { page: 1, total: 0, pages: 0 },
    reviews: { page: 1, total: 0, pages: 0 },
    providers: { page: 1, total: 0, pages: 0 },
    users: { page: 1, total: 0, pages: 0 },
  },
  filters: {
    bookings: { page: 1 },
    providers: { page: 1 },
    reviews: { page: 1 },
    users: { page: 1 },
  },
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: { ...state.loading, [action.payload.key]: action.payload.value },
      }
    
    case 'SET_ERROR':
      return {
        ...state,
        errors: { ...state.errors, [action.payload.key]: action.payload.value },
      }
    
    case 'SET_SERVICES':
      return { ...state, services: action.payload }
    
    case 'SET_BOOKINGS':
      return {
        ...state,
        bookings: action.payload.bookings,
        pagination: { ...state.pagination, bookings: action.payload.pagination },
      }
    
    case 'ADD_BOOKING':
      return { ...state, bookings: [action.payload, ...state.bookings] }
    
    case 'UPDATE_BOOKING':
      return {
        ...state,
        bookings: state.bookings.map(booking =>
          booking._id === action.payload.id
            ? { ...booking, ...action.payload.updates }
            : booking
        ),
      }
    
    case 'DELETE_BOOKING':
      return {
        ...state,
        bookings: state.bookings.filter(booking => booking._id !== action.payload),
      }
    
    case 'SET_MESSAGES':
      return {
        ...state,
        messages: action.payload.messages,
        pagination: { ...state.pagination, messages: action.payload.pagination },
      }
    
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] }
    
    case 'UPDATE_MESSAGE':
      return {
        ...state,
        messages: state.messages.map(message =>
          message._id === action.payload.id
            ? { ...message, ...action.payload.updates }
            : message
        ),
      }
    
    case 'SET_CONVERSATIONS':
      return { ...state, conversations: action.payload }
    
    case 'SET_REVIEWS':
      return {
        ...state,
        reviews: action.payload.reviews,
        pagination: { ...state.pagination, reviews: action.payload.pagination },
      }
    
    case 'ADD_REVIEW':
      return { ...state, reviews: [action.payload, ...state.reviews] }
    
    case 'SET_PROVIDERS':
      return {
        ...state,
        providers: action.payload.providers,
        pagination: { ...state.pagination, providers: action.payload.pagination },
      }
    
    case 'SET_USERS':
      return {
        ...state,
        users: action.payload.users,
        pagination: { ...state.pagination, users: action.payload.pagination },
      }
    
    case 'SET_FILTER':
      return {
        ...state,
        filters: { ...state.filters, [action.payload.key]: action.payload.value },
      }
    
    case 'RESET_DATA':
      return initialState
    
    default:
      return state
  }
}

interface AppDataContextType {
  state: AppState
  dispatch: React.Dispatch<AppAction>
  
  // Actions
  fetchServices: () => Promise<void>
  fetchBookings: (filters?: any) => Promise<void>
  createBooking: (bookingData: any) => Promise<Booking>
  updateBooking: (id: string, updates: any) => Promise<void>
  deleteBooking: (id: string) => Promise<void>
  
  fetchMessages: (filters?: any) => Promise<void>
  sendMessage: (messageData: any) => Promise<Message>
  fetchConversations: () => Promise<void>
  
  fetchReviews: (filters?: any) => Promise<void>
  createReview: (reviewData: any) => Promise<Review>
  
  searchProviders: (filters?: any) => Promise<void>
  
  fetchUsers: (filters?: any) => Promise<void>
  
  setFilter: (key: keyof AppState['filters'], value: any) => void
  resetData: () => void
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined)

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)
  const { user, isAuthenticated } = useAuth()

  // Helper function to handle API calls
  const handleApiCall = async <T,>(
    apiCall: () => Promise<any>,
    loadingKey: keyof AppState['loading'],
    successAction: (data: any) => AppAction,
    errorKey: keyof AppState['errors']
  ): Promise<T | null> => {
    dispatch({ type: 'SET_LOADING', payload: { key: loadingKey, value: true } })
    dispatch({ type: 'SET_ERROR', payload: { key: errorKey, value: null } })
    
    try {
      const response = await apiCall()
      if (response.success) {
        dispatch(successAction(response.data))
        return response.data
      } else {
        throw new Error(response.error || 'API call failed')
      }
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: { key: errorKey, value: error.message } })
      return null
    } finally {
      dispatch({ type: 'SET_LOADING', payload: { key: loadingKey, value: false } })
    }
  }

  // Services
  const fetchServices = async () => {
    await handleApiCall(
      () => apiClient.getServices(),
      'services',
      (data) => ({ type: 'SET_SERVICES', payload: data.services || data }),
      'services'
    )
  }

  // Bookings
  const fetchBookings = async (filters?: any) => {
    const currentFilters = { ...state.filters.bookings, ...filters }
    dispatch({ type: 'SET_FILTER', payload: { key: 'bookings', value: currentFilters } })
    
    await handleApiCall(
      () => apiClient.getBookings(currentFilters),
      'bookings',
      (data) => ({ type: 'SET_BOOKINGS', payload: data }),
      'bookings'
    )
  }

  const createBooking = async (bookingData: any): Promise<Booking> => {
    const result = await handleApiCall(
      () => apiClient.createBooking(bookingData),
      'bookings',
      (data) => ({ type: 'ADD_BOOKING', payload: data }),
      'bookings'
    )
    return result as Booking
  }

  const updateBooking = async (id: string, updates: any) => {
    await handleApiCall(
      () => apiClient.updateBooking(id, updates),
      'bookings',
      (data) => ({ type: 'UPDATE_BOOKING', payload: { id, updates: data } }),
      'bookings'
    )
  }

  const deleteBooking = async (id: string) => {
    await handleApiCall(
      () => apiClient.deleteBooking(id),
      'bookings',
      () => ({ type: 'DELETE_BOOKING', payload: id }),
      'bookings'
    )
  }

  // Messages
  const fetchMessages = async (filters?: any) => {
    const currentFilters = { ...state.filters, ...filters }
    
    await handleApiCall(
      () => apiClient.getMessages(currentFilters),
      'messages',
      (data) => ({ type: 'SET_MESSAGES', payload: data }),
      'messages'
    )
  }

  const sendMessage = async (messageData: any): Promise<Message> => {
    const result = await handleApiCall(
      () => apiClient.sendMessage(messageData),
      'messages',
      (data) => ({ type: 'ADD_MESSAGE', payload: data }),
      'messages'
    )
    return result as Message
  }

  const fetchConversations = async () => {
    await handleApiCall(
      () => apiClient.getConversations(),
      'conversations',
      (data) => ({ type: 'SET_CONVERSATIONS', payload: data.conversations || data }),
      'conversations'
    )
  }

  // Reviews
  const fetchReviews = async (filters?: any) => {
    const currentFilters = { ...state.filters.reviews, ...filters }
    dispatch({ type: 'SET_FILTER', payload: { key: 'reviews', value: currentFilters } })
    
    await handleApiCall(
      () => apiClient.getReviews(currentFilters),
      'reviews',
      (data) => ({ type: 'SET_REVIEWS', payload: data }),
      'reviews'
    )
  }

  const createReview = async (reviewData: any): Promise<Review> => {
    const result = await handleApiCall(
      () => apiClient.createReview(reviewData),
      'reviews',
      (data) => ({ type: 'ADD_REVIEW', payload: data }),
      'reviews'
    )
    return result as Review
  }

  // Providers
  const searchProviders = async (filters?: any) => {
    const currentFilters = { ...state.filters.providers, ...filters }
    dispatch({ type: 'SET_FILTER', payload: { key: 'providers', value: currentFilters } })
    
    await handleApiCall(
      () => apiClient.searchProviders(currentFilters),
      'providers',
      (data) => ({ type: 'SET_PROVIDERS', payload: data }),
      'providers'
    )
  }

  // Users (Admin)
  const fetchUsers = async (filters?: any) => {
    const currentFilters = { ...state.filters.users, ...filters }
    dispatch({ type: 'SET_FILTER', payload: { key: 'users', value: currentFilters } })
    
    await handleApiCall(
      () => apiClient.getUsers(currentFilters),
      'users',
      (data) => ({ type: 'SET_USERS', payload: data }),
      'users'
    )
  }

  // Utility functions
  const setFilter = (key: keyof AppState['filters'], value: any) => {
    dispatch({ type: 'SET_FILTER', payload: { key, value } })
  }

  const resetData = () => {
    dispatch({ type: 'RESET_DATA' })
  }

  // Auto-fetch data when user changes or component mounts
  useEffect(() => {
    if (isAuthenticated && user) {
      fetchServices()
      fetchBookings()
      fetchConversations()
      
      if (user.type === 'admin') {
        fetchUsers()
      }
    } else {
      resetData()
    }
  }, [isAuthenticated, user])

  const contextValue: AppDataContextType = {
    state,
    dispatch,
    fetchServices,
    fetchBookings,
    createBooking,
    updateBooking,
    deleteBooking,
    fetchMessages,
    sendMessage,
    fetchConversations,
    fetchReviews,
    createReview,
    searchProviders,
    fetchUsers,
    setFilter,
    resetData,
  }

  return (
    <AppDataContext.Provider value={contextValue}>
      {children}
    </AppDataContext.Provider>
  )
}

export function useAppData() {
  const context = useContext(AppDataContext)
  if (context === undefined) {
    throw new Error('useAppData must be used within an AppDataProvider')
  }
  return context
}

export default AppDataContext