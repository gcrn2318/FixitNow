import { NextRequest } from 'next/server'
import connectDB from '@/lib/mongodb'
import Booking from '@/lib/models/Booking'
import User from '@/lib/models/User'
import { getCurrentUser } from '@/lib/auth'
import { validateRequestBody, createApiHandler, successResponse, ApiError, paginateResults } from '@/lib/api-utils'
import { createBookingSchema } from '@/lib/validations'

export const GET = createApiHandler(async (request: NextRequest) => {
  await connectDB()
  
  const user = await getCurrentUser(request)
  const { searchParams } = new URL(request.url)
  
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  const status = searchParams.get('status')
  
  // Build query based on user type
  let query: any = {}
  if (user.type === 'customer') {
    query.customer = user._id
  } else if (user.type === 'provider') {
    query.provider = user._id
  }
  
  if (status) {
    query.status = status
  }
  
  const bookingsQuery = Booking.find(query)
    .populate('customer', 'firstName lastName phone email avatar')
    .populate('provider', 'firstName lastName businessName phone email avatar rating')
    .sort({ createdAt: -1 })
  
  const [bookings, total] = await Promise.all([
    paginateResults(bookingsQuery, page, limit),
    Booking.countDocuments(query)
  ])
  
  return successResponse({
    bookings,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  })
})

export const POST = createApiHandler(async (request: NextRequest) => {
  await connectDB()
  
  const user = await getCurrentUser(request)
  
  // Only customers can create bookings
  if (user.type !== 'customer') {
    throw new ApiError('Only customers can create bookings', 403)
  }
  
  const bookingData = await validateRequestBody(request, createBookingSchema)
  
  // Verify provider exists and is active
  const provider = await User.findById(bookingData.providerId)
  if (!provider || provider.type !== 'provider' || !provider.isActive) {
    throw new ApiError('Invalid provider', 400)
  }
  
  // Create booking
  const booking = new Booking({
    ...bookingData,
    customer: user._id,
    provider: bookingData.providerId,
    scheduledDate: new Date(bookingData.scheduledDate)
  })
  
  await booking.save()
  
  // Populate the booking with user details
  await booking.populate([
    { path: 'customer', select: 'firstName lastName phone email avatar' },
    { path: 'provider', select: 'firstName lastName businessName phone email avatar rating' }
  ])
  
  // Update customer total bookings
  await User.findByIdAndUpdate(user._id, { $inc: { totalBookings: 1 } })
  
  return successResponse(booking, 201)
})