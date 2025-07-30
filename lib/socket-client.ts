import { io, Socket } from 'socket.io-client'

// Dynamic import for toast to avoid SSR issues
const showToast = async (message: string, type: 'info' | 'success' | 'error' = 'info') => {
  if (typeof window !== 'undefined') {
    try {
      const { toast } = await import('sonner')
      toast[type](message)
    } catch (error) {
      console.log(message) // Fallback to console
    }
  }
}

class SocketClient {
  private socket: Socket | null = null
  private token: string | null = null
  private reconnectionAttempts = 0
  private maxReconnectionAttempts = 5

  connect(token: string) {
    if (this.socket?.connected) {
      return this.socket
    }

    this.token = token
    
    this.socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3000', {
      path: '/api/socketio/',
      auth: {
        token
      },
      transports: ['websocket', 'polling']
    })

    this.setupEventListeners()
    return this.socket
  }

  private setupEventListeners() {
    if (!this.socket) return

    this.socket.on('connect', () => {
      console.log('Connected to socket server')
      this.reconnectionAttempts = 0
    })

    this.socket.on('disconnect', (reason) => {
      console.log('Disconnected from socket server:', reason)
      
      if (reason === 'io server disconnect') {
        // Server disconnected, try to reconnect
        this.handleReconnection()
      }
    })

    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error)
      this.handleReconnection()
    })

    // Message events
    this.socket.on('new-message', (message) => {
      // Emit custom event for components to listen to
      window.dispatchEvent(new CustomEvent('newMessage', { detail: message }))
      
      // Show notification if not in chat
      if (!window.location.pathname.includes('/chat')) {
        showToast(`New message from ${message.sender.firstName}`, 'info')
      }
    })

    this.socket.on('message-read', (data) => {
      window.dispatchEvent(new CustomEvent('messageRead', { detail: data }))
    })

    this.socket.on('user-typing', (data) => {
      window.dispatchEvent(new CustomEvent('userTyping', { detail: data }))
    })

    this.socket.on('user-stopped-typing', (data) => {
      window.dispatchEvent(new CustomEvent('userStoppedTyping', { detail: data }))
    })

    // Booking events
    this.socket.on('booking-status-changed', (data) => {
      window.dispatchEvent(new CustomEvent('bookingStatusChanged', { detail: data }))
      showToast(`Booking status updated to ${data.status}`, 'success')
    })

    // Location tracking events
    this.socket.on('provider-location', (data) => {
      window.dispatchEvent(new CustomEvent('providerLocation', { detail: data }))
    })
  }

  private handleReconnection() {
    if (this.reconnectionAttempts >= this.maxReconnectionAttempts) {
      showToast('Failed to connect to real-time services', 'error')
      return
    }

    this.reconnectionAttempts++
    
    setTimeout(() => {
      if (this.token) {
        this.connect(this.token)
      }
    }, Math.pow(2, this.reconnectionAttempts) * 1000) // Exponential backoff
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }
    this.token = null
    this.reconnectionAttempts = 0
  }

  // Message methods
  sendMessage(messageData: {
    recipientId: string
    content: string
    bookingId?: string
    type?: string
    attachments?: any[]
    location?: any
  }) {
    if (!this.socket?.connected) {
      throw new Error('Socket not connected')
    }
    
    this.socket.emit('send-message', messageData)
  }

  markMessageAsRead(messageId: string) {
    if (!this.socket?.connected) return
    
    this.socket.emit('mark-message-read', messageId)
  }

  startTyping(recipientId: string, bookingId?: string) {
    if (!this.socket?.connected) return
    
    this.socket.emit('typing-start', { recipientId, bookingId })
  }

  stopTyping(recipientId: string, bookingId?: string) {
    if (!this.socket?.connected) return
    
    this.socket.emit('typing-stop', { recipientId, bookingId })
  }

  // Booking methods
  joinBooking(bookingId: string) {
    if (!this.socket?.connected) return
    
    this.socket.emit('join-booking', bookingId)
  }

  leaveBooking(bookingId: string) {
    if (!this.socket?.connected) return
    
    this.socket.emit('leave-booking', bookingId)
  }

  updateBookingStatus(bookingId: string, status: string) {
    if (!this.socket?.connected) return
    
    this.socket.emit('booking-status-update', { bookingId, status })
  }

  // Location tracking methods
  updateLocation(bookingId: string, lat: number, lng: number) {
    if (!this.socket?.connected) return
    
    this.socket.emit('location-update', { bookingId, lat, lng })
  }

  // Event listener helpers
  on(event: string, callback: (data: any) => void) {
    if (!this.socket) return
    
    this.socket.on(event, callback)
  }

  off(event: string, callback?: (data: any) => void) {
    if (!this.socket) return
    
    if (callback) {
      this.socket.off(event, callback)
    } else {
      this.socket.off(event)
    }
  }

  get isConnected() {
    return this.socket?.connected || false
  }
}

// Export singleton instance
export const socketClient = new SocketClient()
export default socketClient