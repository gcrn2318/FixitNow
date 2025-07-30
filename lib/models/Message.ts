import mongoose, { Document, Schema } from 'mongoose'

export interface IMessage extends Document {
  _id: string
  sender: mongoose.Types.ObjectId
  recipient: mongoose.Types.ObjectId
  booking?: mongoose.Types.ObjectId
  content: string
  type: 'text' | 'image' | 'file' | 'location' | 'system'
  
  // File attachments
  attachments?: {
    type: 'image' | 'file'
    url: string
    name: string
    size: number
  }[]
  
  // Location sharing
  location?: {
    lat: number
    lng: number
    address?: string
  }
  
  // Message status
  isRead: boolean
  readAt?: Date
  isDelivered: boolean
  deliveredAt?: Date
  
  // System message data
  systemData?: {
    type: 'booking_created' | 'booking_confirmed' | 'booking_completed' | 'booking_cancelled' | 'provider_arrived' | 'job_started' | 'job_completed'
    data?: any
  }
  
  createdAt: Date
  updatedAt: Date
}

const messageSchema = new Schema<IMessage>({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipient: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  booking: {
    type: Schema.Types.ObjectId,
    ref: 'Booking'
  },
  content: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['text', 'image', 'file', 'location', 'system'],
    default: 'text'
  },
  
  // File attachments
  attachments: [{
    type: {
      type: String,
      enum: ['image', 'file'],
      required: true
    },
    url: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      required: true
    }
  }],
  
  // Location sharing
  location: {
    lat: Number,
    lng: Number,
    address: String
  },
  
  // Message status
  isRead: {
    type: Boolean,
    default: false
  },
  readAt: Date,
  isDelivered: {
    type: Boolean,
    default: false
  },
  deliveredAt: Date,
  
  // System message data
  systemData: {
    type: {
      type: String,
      enum: ['booking_created', 'booking_confirmed', 'booking_completed', 'booking_cancelled', 'provider_arrived', 'job_started', 'job_completed']
    },
    data: Schema.Types.Mixed
  }
}, {
  timestamps: true
})

// Indexes
messageSchema.index({ sender: 1, recipient: 1 })
messageSchema.index({ booking: 1 })
messageSchema.index({ createdAt: -1 })
messageSchema.index({ isRead: 1, recipient: 1 })

export default mongoose.models.Message || mongoose.model<IMessage>('Message', messageSchema)