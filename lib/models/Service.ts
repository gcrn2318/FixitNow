import mongoose, { Document, Schema } from 'mongoose'

export interface IService extends Document {
  _id: string
  name: string
  category: string
  description: string
  icon: string
  
  // Pricing
  basePrice: number
  priceUnit: 'hourly' | 'fixed' | 'per_job'
  
  // Service details
  estimatedDuration: number // in minutes
  requirements?: string[]
  tools?: string[]
  
  // Metadata
  isActive: boolean
  popularity: number
  
  createdAt: Date
  updatedAt: Date
}

const serviceSchema = new Schema<IService>({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Plumbing',
      'Electrical',
      'HVAC',
      'Carpentry',
      'Cleaning',
      'Appliance Repair',
      'Landscaping',
      'Painting',
      'Security',
      'Handyman',
      'Other'
    ]
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  
  // Pricing
  basePrice: {
    type: Number,
    required: true,
    min: 0
  },
  priceUnit: {
    type: String,
    enum: ['hourly', 'fixed', 'per_job'],
    default: 'hourly'
  },
  
  // Service details
  estimatedDuration: {
    type: Number,
    required: true,
    min: 15
  },
  requirements: [String],
  tools: [String],
  
  // Metadata
  isActive: {
    type: Boolean,
    default: true
  },
  popularity: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

// Indexes
serviceSchema.index({ category: 1, isActive: 1 })
serviceSchema.index({ popularity: -1 })
serviceSchema.index({ name: 'text', description: 'text' })

export default mongoose.models.Service || mongoose.model<IService>('Service', serviceSchema)