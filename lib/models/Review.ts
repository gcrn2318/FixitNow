import mongoose, { Document, Schema } from 'mongoose'

export interface IReview extends Document {
  _id: string
  booking: mongoose.Types.ObjectId
  reviewer: mongoose.Types.ObjectId // Customer or Provider
  reviewee: mongoose.Types.ObjectId // Provider or Customer
  rating: number
  comment: string
  
  // Review categories (for providers)
  categories?: {
    quality: number
    punctuality: number
    professionalism: number
    communication: number
    value: number
  }
  
  // Review photos
  photos?: string[]
  
  // Helpful votes
  helpfulVotes: mongoose.Types.ObjectId[]
  
  // Response from reviewee
  response?: {
    content: string
    createdAt: Date
  }
  
  // Metadata
  isVerified: boolean // Whether the booking was actually completed
  isVisible: boolean // Admin can hide inappropriate reviews
  
  createdAt: Date
  updatedAt: Date
}

const reviewSchema = new Schema<IReview>({
  booking: {
    type: Schema.Types.ObjectId,
    ref: 'Booking',
    required: true
  },
  reviewer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reviewee: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true,
    maxlength: 1000
  },
  
  // Review categories (for providers)
  categories: {
    quality: {
      type: Number,
      min: 1,
      max: 5
    },
    punctuality: {
      type: Number,
      min: 1,
      max: 5
    },
    professionalism: {
      type: Number,
      min: 1,
      max: 5
    },
    communication: {
      type: Number,
      min: 1,
      max: 5
    },
    value: {
      type: Number,
      min: 1,
      max: 5
    }
  },
  
  // Review photos
  photos: [String],
  
  // Helpful votes
  helpfulVotes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  
  // Response from reviewee
  response: {
    content: String,
    createdAt: Date
  },
  
  // Metadata
  isVerified: {
    type: Boolean,
    default: true
  },
  isVisible: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

// Indexes
reviewSchema.index({ reviewee: 1, isVisible: 1 })
reviewSchema.index({ booking: 1 })
reviewSchema.index({ rating: -1 })
reviewSchema.index({ createdAt: -1 })

// Ensure one review per booking per reviewer
reviewSchema.index({ booking: 1, reviewer: 1 }, { unique: true })

export default mongoose.models.Review || mongoose.model<IReview>('Review', reviewSchema)