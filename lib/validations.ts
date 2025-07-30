import { z } from 'zod'

// Auth schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  userType: z.enum(['customer', 'provider', 'admin']).optional()
})

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  type: z.enum(['customer', 'provider', 'admin']),
  phone: z.string().optional(),
  businessName: z.string().optional(),
  services: z.array(z.string()).optional()
})

export const refreshTokenSchema = z.object({
  refreshToken: z.string()
})

// User schemas
export const updateProfileSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  phone: z.string().optional(),
  avatar: z.string().url().optional(),
  businessName: z.string().optional(),
  services: z.array(z.string()).optional(),
  availability: z.object({
    days: z.array(z.enum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'])),
    hours: z.object({
      start: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
      end: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    })
  }).optional(),
  location: z.object({
    address: z.string(),
    coordinates: z.object({
      lat: z.number().min(-90).max(90),
      lng: z.number().min(-180).max(180)
    }),
    serviceRadius: z.number().min(1).max(100)
  }).optional()
})

// Booking schemas
export const createBookingSchema = z.object({
  providerId: z.string(),
  service: z.string().min(1, 'Service is required'),
  description: z.string().min(1, 'Description is required'),
  scheduledDate: z.string().datetime(),
  scheduledTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  address: z.string().min(1, 'Address is required'),
  coordinates: z.object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180)
  }).optional(),
  estimatedPrice: z.number().min(0),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).optional()
})

export const updateBookingSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'in-progress', 'completed', 'cancelled']).optional(),
  finalPrice: z.number().min(0).optional(),
  actualStartTime: z.string().datetime().optional(),
  actualEndTime: z.string().datetime().optional(),
  notes: z.string().optional(),
  cancellationReason: z.string().optional()
})

// Message schemas
export const sendMessageSchema = z.object({
  recipientId: z.string(),
  content: z.string().min(1, 'Message content is required'),
  bookingId: z.string().optional(),
  type: z.enum(['text', 'image', 'file', 'location']).optional(),
  attachments: z.array(z.object({
    type: z.enum(['image', 'file']),
    url: z.string().url(),
    name: z.string(),
    size: z.number()
  })).optional(),
  location: z.object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180),
    address: z.string().optional()
  }).optional()
})

// Review schemas
export const createReviewSchema = z.object({
  bookingId: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string().min(1, 'Comment is required').max(1000),
  categories: z.object({
    quality: z.number().min(1).max(5).optional(),
    punctuality: z.number().min(1).max(5).optional(),
    professionalism: z.number().min(1).max(5).optional(),
    communication: z.number().min(1).max(5).optional(),
    value: z.number().min(1).max(5).optional()
  }).optional(),
  photos: z.array(z.string().url()).optional()
})

// Search schemas
export const searchProvidersSchema = z.object({
  service: z.string().optional(),
  location: z.object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180)
  }).optional(),
  radius: z.number().min(1).max(100).optional(),
  minRating: z.number().min(0).max(5).optional(),
  maxPrice: z.number().min(0).optional(),
  availability: z.object({
    date: z.string().date(),
    time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
  }).optional(),
  sortBy: z.enum(['rating', 'price', 'distance', 'reviews']).optional(),
  page: z.number().min(1).optional(),
  limit: z.number().min(1).max(50).optional()
})

// Admin schemas
export const adminUpdateUserSchema = z.object({
  isVerified: z.boolean().optional(),
  isActive: z.boolean().optional(),
  type: z.enum(['customer', 'provider', 'admin']).optional()
})

export const createServiceSchema = z.object({
  name: z.string().min(1, 'Service name is required'),
  category: z.enum(['Plumbing', 'Electrical', 'HVAC', 'Carpentry', 'Cleaning', 'Appliance Repair', 'Landscaping', 'Painting', 'Security', 'Handyman', 'Other']),
  description: z.string().min(1, 'Description is required'),
  icon: z.string().min(1, 'Icon is required'),
  basePrice: z.number().min(0),
  priceUnit: z.enum(['hourly', 'fixed', 'per_job']).optional(),
  estimatedDuration: z.number().min(15),
  requirements: z.array(z.string()).optional(),
  tools: z.array(z.string()).optional()
})