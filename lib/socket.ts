import { Server as NetServer } from 'http'
import { NextApiRequest, NextApiResponse } from 'next'
import { Server as ServerIO, Socket } from 'socket.io'
import jwt from 'jsonwebtoken'
import connectDB from './mongodb'
import User from './models/User'
import Message from './models/Message'
import Booking from './models/Booking'

export interface SocketWithAuth extends Socket {
  userId?: string
  userType?: string
}

export type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: ServerIO
    }
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}

// Active users tracking
const activeUsers = new Map<string, string>() // userId -> socketId
const activeSockets = new Map<string, any>() // socketId -> user data

export default function SocketHandler(req: NextApiRequest, res: NextApiResponseServerIO) {
  if (!res.socket.server.io) {
    console.log('Setting up socket.io server...')
    
    const io = new ServerIO(res.socket.server, {
      path: '/api/socketio',
      addTrailingSlash: false,
      cors: {
        origin: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true
      }
    })
    
    // Middleware for authentication
    io.use(async (socket: any, next) => {
      try {
        const token = socket.handshake.auth.token
        if (!token) {
          return next(new Error('Authentication error'))
        }
        
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as any
        
        await connectDB()
        const user = await User.findById(decoded.userId).select('-password -refreshTokens')
        
        if (!user || !user.isActive) {
          return next(new Error('Authentication error'))
        }
        
        socket.userId = user._id.toString()
        socket.userType = user.type
        socket.user = user
        
        next()
      } catch (error) {
        next(new Error('Authentication error'))
      }
    })
    
    io.on('connection', (socket: any) => {
      console.log(`User ${socket.userId} connected`)
      
      // Track active user
      activeUsers.set(socket.userId, socket.id)
      activeSockets.set(socket.id, {
        userId: socket.userId,
        userType: socket.userType,
        user: socket.user
      })
      
      // Join user to their personal room
      socket.join(`user:${socket.userId}`)
      
      // Handle joining booking rooms
      socket.on('join-booking', async (bookingId: string) => {
        try {
          await connectDB()
          const booking = await Booking.findById(bookingId)
          
          if (!booking) return
          
          // Check if user is part of this booking
          const isCustomer = booking.customer.toString() === socket.userId
          const isProvider = booking.provider.toString() === socket.userId
          
          if (isCustomer || isProvider) {
            socket.join(`booking:${bookingId}`)
            console.log(`User ${socket.userId} joined booking room: ${bookingId}`)
          }
        } catch (error) {
          console.error('Error joining booking room:', error)
        }
      })
      
      // Handle leaving booking rooms
      socket.on('leave-booking', (bookingId: string) => {
        socket.leave(`booking:${bookingId}`)
        console.log(`User ${socket.userId} left booking room: ${bookingId}`)
      })
      
      // Handle real-time messaging
      socket.on('send-message', async (messageData: any) => {
        try {
          await connectDB()
          
          const message = new Message({
            sender: socket.userId,
            recipient: messageData.recipientId,
            content: messageData.content,
            type: messageData.type || 'text',
            booking: messageData.bookingId,
            attachments: messageData.attachments,
            location: messageData.location,
            isDelivered: true,
            deliveredAt: new Date()
          })
          
          await message.save()
          await message.populate([
            { path: 'sender', select: 'firstName lastName avatar' },
            { path: 'recipient', select: 'firstName lastName avatar' },
            { path: 'booking', select: 'service status' }
          ])
          
          // Send to recipient
          io.to(`user:${messageData.recipientId}`).emit('new-message', message)
          
          // Send to booking room if applicable
          if (messageData.bookingId) {
            io.to(`booking:${messageData.bookingId}`).emit('new-message', message)
          }
          
          // Confirm delivery to sender
          socket.emit('message-sent', { messageId: message._id })
          
        } catch (error) {
          console.error('Error sending message:', error)
          socket.emit('message-error', { error: 'Failed to send message' })
        }
      })
      
      // Handle message read status
      socket.on('mark-message-read', async (messageId: string) => {
        try {
          await connectDB()
          const message = await Message.findById(messageId)
          
          if (message && message.recipient.toString() === socket.userId) {
            message.isRead = true
            message.readAt = new Date()
            await message.save()
            
            // Notify sender
            io.to(`user:${message.sender}`).emit('message-read', {
              messageId: message._id,
              readAt: message.readAt
            })
          }
        } catch (error) {
          console.error('Error marking message as read:', error)
        }
      })
      
      // Handle location updates for tracking
      socket.on('location-update', async (data: { bookingId: string, lat: number, lng: number }) => {
        try {
          if (socket.userType !== 'provider') return
          
          await connectDB()
          const booking = await Booking.findById(data.bookingId)
          
          if (!booking || booking.provider.toString() !== socket.userId) return
          
          // Update booking with location data
          const locationUpdate = {
            lat: data.lat,
            lng: data.lng,
            timestamp: new Date()
          }
          
          await Booking.findByIdAndUpdate(data.bookingId, {
            $push: {
              'trackingData.providerLocation': locationUpdate
            }
          })
          
          // Send location to customer
          io.to(`user:${booking.customer}`).emit('provider-location', {
            bookingId: data.bookingId,
            location: locationUpdate
          })
          
          // Send to booking room
          io.to(`booking:${data.bookingId}`).emit('provider-location', {
            bookingId: data.bookingId,
            location: locationUpdate
          })
          
        } catch (error) {
          console.error('Error updating location:', error)
        }
      })
      
      // Handle booking status updates
      socket.on('booking-status-update', async (data: { bookingId: string, status: string }) => {
        try {
          await connectDB()
          const booking = await Booking.findById(data.bookingId)
          
          if (!booking) return
          
          const isCustomer = booking.customer.toString() === socket.userId
          const isProvider = booking.provider.toString() === socket.userId
          
          if (!isCustomer && !isProvider) return
          
          // Send status update to both parties
          io.to(`booking:${data.bookingId}`).emit('booking-status-changed', {
            bookingId: data.bookingId,
            status: data.status,
            updatedBy: socket.userId,
            timestamp: new Date()
          })
          
        } catch (error) {
          console.error('Error updating booking status:', error)
        }
      })
      
      // Handle typing indicators
      socket.on('typing-start', (data: { recipientId: string, bookingId?: string }) => {
        io.to(`user:${data.recipientId}`).emit('user-typing', {
          userId: socket.userId,
          bookingId: data.bookingId
        })
      })
      
      socket.on('typing-stop', (data: { recipientId: string, bookingId?: string }) => {
        io.to(`user:${data.recipientId}`).emit('user-stopped-typing', {
          userId: socket.userId,
          bookingId: data.bookingId
        })
      })
      
      // Handle disconnection
      socket.on('disconnect', () => {
        console.log(`User ${socket.userId} disconnected`)
        activeUsers.delete(socket.userId)
        activeSockets.delete(socket.id)
      })
    })
    
    res.socket.server.io = io
  }
  
  res.end()
}

// Helper functions to emit events from API routes
export const emitToUser = (io: ServerIO, userId: string, event: string, data: any) => {
  io.to(`user:${userId}`).emit(event, data)
}

export const emitToBooking = (io: ServerIO, bookingId: string, event: string, data: any) => {
  io.to(`booking:${bookingId}`).emit(event, data)
}

export const getActiveUsers = () => {
  return Array.from(activeUsers.keys())
}

export const isUserOnline = (userId: string) => {
  return activeUsers.has(userId)
}