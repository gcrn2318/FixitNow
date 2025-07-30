'use client'

import React, { createContext, useContext, useEffect, useRef, ReactNode } from 'react'
import { io, Socket } from 'socket.io-client'
import { useAuth } from './AuthContext'
import { useAppData } from './AppDataContext'
import { toast } from 'sonner'

interface SocketContextType {
  socket: Socket | null
  isConnected: boolean
  joinBooking: (bookingId: string) => void
  leaveBooking: (bookingId: string) => void
  sendMessage: (messageData: any) => void
  updateLocation: (bookingId: string, lat: number, lng: number) => void
  updateBookingStatus: (bookingId: string, status: string) => void
  startTyping: (recipientId: string, bookingId?: string) => void
  stopTyping: (recipientId: string, bookingId?: string) => void
}

const SocketContext = createContext<SocketContextType | undefined>(undefined)

export function SocketProvider({ children }: { children: ReactNode }) {
  const socketRef = useRef<Socket | null>(null)
  const { user, isAuthenticated, token } = useAuth()
  const { dispatch } = useAppData()
  const [isConnected, setIsConnected] = React.useState(false)

  useEffect(() => {
    if (isAuthenticated && user && token) {
      // Initialize socket connection
      const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3000', {
        path: '/api/socketio',
        auth: {
          token: token
        },
        transports: ['websocket', 'polling']
      })

      socketRef.current = socket

      // Connection events
      socket.on('connect', () => {
        console.log('Socket connected:', socket.id)
        setIsConnected(true)
        toast.success('Connected to real-time updates')
      })

      socket.on('disconnect', () => {
        console.log('Socket disconnected')
        setIsConnected(false)
        toast.error('Disconnected from real-time updates')
      })

      socket.on('connect_error', (error) => {
        console.error('Socket connection error:', error)
        setIsConnected(false)
        toast.error('Failed to connect to real-time updates')
      })

      // Message events
      socket.on('new-message', (message) => {
        console.log('New message received:', message)
        dispatch({ type: 'ADD_MESSAGE', payload: message })
        
        // Show notification if message is not from current user
        if (message.sender._id !== user.id) {
          toast.info(`New message from ${message.sender.firstName} ${message.sender.lastName}`)
        }
      })

      socket.on('message-sent', (data) => {
        console.log('Message sent confirmation:', data)
      })

      socket.on('message-error', (error) => {
        console.error('Message error:', error)
        toast.error('Failed to send message')
      })

      socket.on('message-read', (data) => {
        console.log('Message read:', data)
        dispatch({
          type: 'UPDATE_MESSAGE',
          payload: {
            id: data.messageId,
            updates: { isRead: true, readAt: data.readAt }
          }
        })
      })

      // Booking events
      socket.on('booking-status-changed', (data) => {
        console.log('Booking status changed:', data)
        dispatch({
          type: 'UPDATE_BOOKING',
          payload: {
            id: data.bookingId,
            updates: { status: data.status }
          }
        })
        
        toast.info(`Booking status updated to: ${data.status}`)
      })

      // Location tracking events
      socket.on('provider-location', (data) => {
        console.log('Provider location update:', data)
        // Update booking with new location data
        dispatch({
          type: 'UPDATE_BOOKING',
          payload: {
            id: data.bookingId,
            updates: {
              trackingData: {
                providerLocation: data.location,
                status: 'en-route'
              }
            }
          }
        })
      })

      // Typing indicators
      socket.on('user-typing', (data) => {
        console.log('User typing:', data)
        // Handle typing indicator UI updates
      })

      socket.on('user-stopped-typing', (data) => {
        console.log('User stopped typing:', data)
        // Handle typing indicator UI updates
      })

      // Cleanup on unmount
      return () => {
        socket.disconnect()
        socketRef.current = null
        setIsConnected(false)
      }
    } else {
      // Disconnect if not authenticated
      if (socketRef.current) {
        socketRef.current.disconnect()
        socketRef.current = null
        setIsConnected(false)
      }
    }
  }, [isAuthenticated, user, token, dispatch])

  // Socket methods
  const joinBooking = (bookingId: string) => {
    if (socketRef.current) {
      socketRef.current.emit('join-booking', bookingId)
    }
  }

  const leaveBooking = (bookingId: string) => {
    if (socketRef.current) {
      socketRef.current.emit('leave-booking', bookingId)
    }
  }

  const sendMessage = (messageData: any) => {
    if (socketRef.current) {
      socketRef.current.emit('send-message', messageData)
    }
  }

  const updateLocation = (bookingId: string, lat: number, lng: number) => {
    if (socketRef.current && user?.type === 'provider') {
      socketRef.current.emit('location-update', { bookingId, lat, lng })
    }
  }

  const updateBookingStatus = (bookingId: string, status: string) => {
    if (socketRef.current) {
      socketRef.current.emit('booking-status-update', { bookingId, status })
    }
  }

  const startTyping = (recipientId: string, bookingId?: string) => {
    if (socketRef.current) {
      socketRef.current.emit('typing-start', { recipientId, bookingId })
    }
  }

  const stopTyping = (recipientId: string, bookingId?: string) => {
    if (socketRef.current) {
      socketRef.current.emit('typing-stop', { recipientId, bookingId })
    }
  }

  const contextValue: SocketContextType = {
    socket: socketRef.current,
    isConnected,
    joinBooking,
    leaveBooking,
    sendMessage,
    updateLocation,
    updateBookingStatus,
    startTyping,
    stopTyping,
  }

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  )
}

export function useSocket() {
  const context = useContext(SocketContext)
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider')
  }
  return context
}

export default SocketContext