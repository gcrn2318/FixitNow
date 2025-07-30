import { NextRequest } from 'next/server'
import connectDB from '@/lib/mongodb'
import Booking from '@/lib/models/Booking'
import { getCurrentUser } from '@/lib/auth'
import { createApiHandler, successResponse, ApiError } from '@/lib/api-utils'

export const GET = createApiHandler(async (request: NextRequest, { params }: { params: { id: string } }) => {
  await connectDB()
  
  const user = await getCurrentUser(request)
  const { id } = params
  
  const booking = await Booking.findById(id)
    .populate('customer', 'firstName lastName phone avatar')
    .populate('provider', 'firstName lastName businessName phone avatar')
  
  if (!booking) {
    throw new ApiError('Booking not found', 404)
  }
  
  // Check if user has access to this booking
  const isCustomer = user.type === 'customer' && booking.customer._id.toString() === user._id
  const isProvider = user.type === 'provider' && booking.provider._id.toString() === user._id
  
  if (!isCustomer && !isProvider) {
    throw new ApiError('Access denied', 403)
  }
  
  // Get the latest location data
  const trackingData = {
    bookingId: booking._id,
    status: booking.status,
    customer: {
      id: booking.customer._id,
      name: `${booking.customer.firstName} ${booking.customer.lastName}`,
      phone: booking.customer.phone,
      avatar: booking.customer.avatar
    },
    provider: {
      id: booking.provider._id,
      name: booking.provider.businessName || `${booking.provider.firstName} ${booking.provider.lastName}`,
      phone: booking.provider.phone,
      avatar: booking.provider.avatar
    },
    service: booking.service,
    scheduledDate: booking.scheduledDate,
    scheduledTime: booking.scheduledTime,
    address: booking.address,
    coordinates: booking.coordinates,
    actualStartTime: booking.actualStartTime,
    actualEndTime: booking.actualEndTime,
    providerLocation: booking.trackingData?.providerLocation?.slice(-1)[0] || null, // Latest location
    locationHistory: booking.trackingData?.providerLocation || [],
    estimatedArrival: booking.trackingData?.estimatedArrival,
    notes: booking.notes
  }
  
  return successResponse(trackingData)
})

export const PUT = createApiHandler(async (request: NextRequest, { params }: { params: { id: string } }) => {
  await connectDB()
  
  const user = await getCurrentUser(request)
  const { id } = params
  
  // Only providers can update tracking data
  if (user.type !== 'provider') {
    throw new ApiError('Only providers can update tracking data', 403)
  }
  
  const booking = await Booking.findById(id)
  if (!booking) {
    throw new ApiError('Booking not found', 404)
  }
  
  if (booking.provider.toString() !== user._id) {
    throw new ApiError('Access denied', 403)
  }
  
  const body = await request.json()
  const { lat, lng, status, estimatedArrival } = body
  
  const updateData: any = {}
  
  // Update location if provided
  if (lat && lng) {
    const locationUpdate = {
      lat,
      lng,
      timestamp: new Date()
    }
    
    updateData.$push = {
      'trackingData.providerLocation': locationUpdate
    }
  }
  
  // Update status if provided
  if (status) {
    updateData.status = status
    
    if (status === 'in-progress' && !booking.actualStartTime) {
      updateData.actualStartTime = new Date()
    } else if (status === 'completed' && !booking.actualEndTime) {
      updateData.actualEndTime = new Date()
    }
  }
  
  // Update estimated arrival if provided
  if (estimatedArrival) {
    updateData['trackingData.estimatedArrival'] = new Date(estimatedArrival)
  }
  
  const updatedBooking = await Booking.findByIdAndUpdate(
    id,
    updateData,
    { new: true }
  ).populate([
    { path: 'customer', select: 'firstName lastName phone avatar' },
    { path: 'provider', select: 'firstName lastName businessName phone avatar' }
  ])
  
  return successResponse(updatedBooking)
})