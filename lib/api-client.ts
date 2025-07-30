const API_BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

class ApiClient {
  private baseURL: string
  private token: string | null = null

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL
    
    // Initialize token from localStorage if available
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('accessToken')
    }
  }

  setToken(token: string | null) {
    this.token = token
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('accessToken', token)
      } else {
        localStorage.removeItem('accessToken')
      }
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}/api${endpoint}`
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    }

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }

    const config: RequestInit = {
      ...options,
      headers,
    }

    const response = await fetch(url, config)
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      
      // Handle token expiration
      if (response.status === 401) {
        this.setToken(null)
        // Redirect to login if we're in the browser
        if (typeof window !== 'undefined') {
          window.location.href = '/login'
        }
      }
      
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  // Auth methods
  async login(email: string, password: string, userType?: string) {
    const response = await this.request<any>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, userType }),
    })
    
    if (response.success && response.data.tokens) {
      this.setToken(response.data.tokens.accessToken)
      // Store refresh token separately
      if (typeof window !== 'undefined') {
        localStorage.setItem('refreshToken', response.data.tokens.refreshToken)
      }
    }
    
    return response
  }

  async register(userData: {
    email: string
    password: string
    firstName: string
    lastName: string
    type: 'customer' | 'provider'
    phone?: string
    businessName?: string
    services?: string[]
  }) {
    return this.request<any>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  }

  async logout() {
    const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null
    
    try {
      await this.request('/auth/logout', {
        method: 'POST',
        body: JSON.stringify({ refreshToken }),
      })
    } catch (error) {
      // Ignore errors on logout
    }
    
    this.setToken(null)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('refreshToken')
    }
  }

  async refreshToken() {
    const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null
    
    if (!refreshToken) {
      throw new Error('No refresh token available')
    }

    const response = await this.request<any>('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    })

    if (response.success && response.data.accessToken) {
      this.setToken(response.data.accessToken)
    }

    return response
  }

  async getCurrentUser() {
    return this.request<any>('/auth/me')
  }

  // User methods
  async updateProfile(data: any) {
    return this.request<any>('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  // Booking methods
  async getBookings(params?: {
    page?: number
    limit?: number
    status?: string
  }) {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.set('page', params.page.toString())
    if (params?.limit) searchParams.set('limit', params.limit.toString())
    if (params?.status) searchParams.set('status', params.status)
    
    const query = searchParams.toString()
    return this.request<any>(`/bookings${query ? `?${query}` : ''}`)
  }

  async createBooking(bookingData: any) {
    return this.request<any>('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    })
  }

  async getBooking(id: string) {
    return this.request<any>(`/bookings/${id}`)
  }

  async updateBooking(id: string, data: any) {
    return this.request<any>(`/bookings/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async deleteBooking(id: string) {
    return this.request<any>(`/bookings/${id}`, {
      method: 'DELETE',
    })
  }

  // Provider search
  async searchProviders(params: {
    service?: string
    lat?: number
    lng?: number
    radius?: number
    minRating?: number
    maxPrice?: number
    sortBy?: string
    page?: number
    limit?: number
    search?: string
  }) {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.set(key, value.toString())
      }
    })
    
    return this.request<any>(`/providers/search?${searchParams.toString()}`)
  }

  // Messages
  async getMessages(params?: {
    recipientId?: string
    bookingId?: string
    page?: number
    limit?: number
  }) {
    const searchParams = new URLSearchParams()
    if (params?.recipientId) searchParams.set('recipientId', params.recipientId)
    if (params?.bookingId) searchParams.set('bookingId', params.bookingId)
    if (params?.page) searchParams.set('page', params.page.toString())
    if (params?.limit) searchParams.set('limit', params.limit.toString())
    
    const query = searchParams.toString()
    return this.request<any>(`/messages${query ? `?${query}` : ''}`)
  }

  async sendMessage(messageData: {
    recipientId: string
    content: string
    bookingId?: string
    type?: string
    attachments?: any[]
    location?: any
  }) {
    return this.request<any>('/messages', {
      method: 'POST',
      body: JSON.stringify(messageData),
    })
  }

  async getConversations() {
    return this.request<any>('/messages/conversations')
  }

  // Reviews
  async getReviews(params?: {
    providerId?: string
    page?: number
    limit?: number
  }) {
    const searchParams = new URLSearchParams()
    if (params?.providerId) searchParams.set('providerId', params.providerId)
    if (params?.page) searchParams.set('page', params.page.toString())
    if (params?.limit) searchParams.set('limit', params.limit.toString())
    
    const query = searchParams.toString()
    return this.request<any>(`/reviews${query ? `?${query}` : ''}`)
  }

  async createReview(reviewData: {
    bookingId: string
    rating: number
    comment: string
    categories?: any
    photos?: string[]
  }) {
    return this.request<any>('/reviews', {
      method: 'POST',
      body: JSON.stringify(reviewData),
    })
  }

  // Services
  async getServices(params?: {
    category?: string
    search?: string
    page?: number
    limit?: number
    sortBy?: string
  }) {
    const searchParams = new URLSearchParams()
    if (params?.category) searchParams.set('category', params.category)
    if (params?.search) searchParams.set('search', params.search)
    if (params?.page) searchParams.set('page', params.page.toString())
    if (params?.limit) searchParams.set('limit', params.limit.toString())
    if (params?.sortBy) searchParams.set('sortBy', params.sortBy)
    
    const query = searchParams.toString()
    return this.request<any>(`/services${query ? `?${query}` : ''}`)
  }

  // Tracking
  async getTracking(bookingId: string) {
    return this.request<any>(`/tracking/${bookingId}`)
  }

  async updateTracking(bookingId: string, data: {
    lat?: number
    lng?: number
    status?: string
    estimatedArrival?: string
  }) {
    return this.request<any>(`/tracking/${bookingId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  // Admin methods
  async getUsers(params?: {
    page?: number
    limit?: number
    type?: string
    search?: string
    isVerified?: boolean
    isActive?: boolean
  }) {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.set('page', params.page.toString())
    if (params?.limit) searchParams.set('limit', params.limit.toString())
    if (params?.type) searchParams.set('type', params.type)
    if (params?.search) searchParams.set('search', params.search)
    if (params?.isVerified !== undefined) searchParams.set('isVerified', params.isVerified.toString())
    if (params?.isActive !== undefined) searchParams.set('isActive', params.isActive.toString())
    
    const query = searchParams.toString()
    return this.request<any>(`/admin/users${query ? `?${query}` : ''}`)
  }

  async getAnalytics(days?: number) {
    const query = days ? `?days=${days}` : ''
    return this.request<any>(`/admin/analytics${query}`)
  }

  async seedDatabase() {
    return this.request<any>('/admin/seed', {
      method: 'POST',
    })
  }
}

// Export singleton instance
export const apiClient = new ApiClient()
export default apiClient