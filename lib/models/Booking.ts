import mongoose, { Document, Schema } from 'mongoose'

export interface IBooking extends Document {
  _id: string
  customer: mongoose.Types.ObjectId
  provider: mongoose.Types.ObjectId
  service: string
  description: string
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  
  // Scheduling
  scheduledDate: Date
  scheduledTime: string
  estimatedDuration: number // in minutes
  actualStartTime?: Date
  actualEndTime?: Date
  
  // Location
  address: string
  coordinates?: {
    lat: number
    lng: number
  }
  
  // Pricing
  estimatedPrice: number
  finalPrice?: number
  priceBreakdown?: {
    basePrice: number
    additionalCharges?: {
      description: string
      amount: number
    }[]
    taxes: number
    discount?: number
  }
  
  // Payment
  paymentStatus: 'pending' | 'paid' | 'refunded' | 'cancelled'
  paymentMethod?: 'card' | 'cash' | 'bank_transfer'
  paymentIntentId?: string // Stripe payment intent ID
  
  // Communication
  messages: mongoose.Types.ObjectId[]
  
  // Files/Photos
  beforePhotos?: string[]
  afterPhotos?: string[]
  documents?: string[]
  
  // Tracking
  trackingData?: {
    providerLocation?: {
      lat: number
      lng: number
      timestamp: Date
    }[]
    status: string
    estimatedArrival?: Date
  }
  
  // Reviews
  customerReview?: mongoose.Types.ObjectId
  providerReview?: mongoose.Types.ObjectId
  
  // Metadata
  cancelledBy?: mongoose.Types.ObjectId
  cancellationReason?: string
  notes?: string
  
  createdAt: Date
  updatedAt: Date
}

const bookingSchema = new Schema<IBooking>({
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  provider: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  service: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  
  // Scheduling
  scheduledDate: {
    type: Date,
    required: true
  },
  scheduledTime: {
    type: String,
    required: true
  },
  estimatedDuration: {
    type: Number,
    required: true
  },
  actualStartTime: Date,
  actualEndTime: Date,
  
  // Location
  address: {
    type: String,
    required: true
  },
  coordinates: {
    lat: Number,
    lng: Number
  },
  
  // Pricing
  estimatedPrice: {
    type: Number,
    required: true
  },
  finalPrice: Number,
  priceBreakdown: {
    basePrice: Number,
    additionalCharges: [{
      description: String,
      amount: Number
    }],
    taxes: Number,
    discount: Number
  },
  
  // Payment
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded', 'cancelled'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'cash', 'bank_transfer']
  },
  paymentIntentId: String,
  
  // Communication
  messages: [{
    type: Schema.Types.ObjectId,
    ref: 'Message'
  }],
  
  // Files/Photos
  beforePhotos: [String],
  afterPhotos: [String],
  documents: [String],
  
  // Tracking
  trackingData: {
    providerLocation: [{
      lat: Number,
      lng: Number,
      timestamp: Date
    }],
    status: String,
    estimatedArrival: Date
  },
  
  // Reviews
  customerReview: {
    type: Schema.Types.ObjectId,
    ref: 'Review'
  },
  providerReview: {
    type: Schema.Types.ObjectId,
    ref: 'Review'
  },
  
  // Metadata
  cancelledBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  cancellationReason: String,
  notes: String
}, {
  timestamps: true
})

// Indexes
bookingSchema.index({ customer: 1, status: 1 })
bookingSchema.index({ provider: 1, status: 1 })
bookingSchema.index({ scheduledDate: 1 })
bookingSchema.index({ status: 1 })
bookingSchema.index({ createdAt: -1 })
bookingSchema.index({ 'coordinates': '2dsphere' })

export default mongoose.models.Booking || mongoose.model<IBooking>('Booking', bookingSchema)