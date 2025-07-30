import mongoose, { Document, Schema } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUser extends Document {
  _id: string
  email: string
  password: string
  firstName: string
  lastName: string
  type: 'customer' | 'provider' | 'admin'
  phone?: string
  avatar?: string
  isVerified: boolean
  isActive: boolean
  refreshTokens: string[]
  
  // Customer specific fields
  totalBookings?: number
  totalSpent?: number
  favoriteProviders?: mongoose.Types.ObjectId[]
  
  // Provider specific fields
  businessName?: string
  services?: string[]
  rating?: number
  totalReviews?: number
  completedJobs?: number
  totalEarnings?: number
  availability?: {
    days: string[]
    hours: {
      start: string
      end: string
    }
  }
  location?: {
    address: string
    coordinates: {
      lat: number
      lng: number
    }
    serviceRadius: number // in miles
  }
  documents?: {
    license?: string
    insurance?: string
    certification?: string[]
  }
  
  createdAt: Date
  updatedAt: Date
  
  // Methods
  comparePassword(candidatePassword: string): Promise<boolean>
  generateRefreshToken(): string
  removeRefreshToken(token: string): Promise<void>
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['customer', 'provider', 'admin'],
    required: true,
    default: 'customer'
  },
  phone: {
    type: String,
    trim: true
  },
  avatar: {
    type: String
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  refreshTokens: [{
    type: String
  }],
  
  // Customer specific fields
  totalBookings: {
    type: Number,
    default: 0
  },
  totalSpent: {
    type: Number,
    default: 0
  },
  favoriteProviders: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  
  // Provider specific fields
  businessName: {
    type: String,
    trim: true
  },
  services: [{
    type: String
  }],
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  completedJobs: {
    type: Number,
    default: 0
  },
  totalEarnings: {
    type: Number,
    default: 0
  },
  availability: {
    days: [{
      type: String,
      enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    }],
    hours: {
      start: String,
      end: String
    }
  },
  location: {
    address: String,
    coordinates: {
      lat: Number,
      lng: Number
    },
    serviceRadius: {
      type: Number,
      default: 25
    }
  },
  documents: {
    license: String,
    insurance: String,
    certification: [String]
  }
}, {
  timestamps: true
})

// Indexes
userSchema.index({ email: 1 })
userSchema.index({ type: 1 })
userSchema.index({ 'location.coordinates': '2dsphere' })
userSchema.index({ services: 1 })
userSchema.index({ rating: -1 })

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next()
  
  try {
    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error: any) {
    next(error)
  }
})

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password)
}

// Generate refresh token method
userSchema.methods.generateRefreshToken = function(): string {
  const jwt = require('jsonwebtoken')
  const { v4: uuidv4 } = require('uuid')
  
  const refreshToken = jwt.sign(
    { 
      userId: this._id,
      tokenId: uuidv4()
    },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' }
  )
  
  this.refreshTokens.push(refreshToken)
  return refreshToken
}

// Remove refresh token method
userSchema.methods.removeRefreshToken = async function(token: string): Promise<void> {
  this.refreshTokens = this.refreshTokens.filter((t: string) => t !== token)
  await this.save()
}

export default mongoose.models.User || mongoose.model<IUser>('User', userSchema)