import { NextRequest } from 'next/server'
import connectDB from '@/lib/mongodb'
import Booking from '@/lib/models/Booking'
import User from '@/lib/models/User'
import { getCurrentUser } from '@/lib/auth'
import { validateRequestBody, createApiHandler, successResponse, ApiError } from '@/lib/api-utils'
import { updateBookingSchema } from '@/lib/validations'

export const GET = createApiHandler(async (request: NextRequest, { params }: { params: { id: string } }) => {
  await connectDB()
  
  const user = await getCurrentUser(request)
  const { id } = params
  
  const booking = await Booking.findById(id)
    .populate('customer', 'firstName lastName phone email avatar')
    .populate('provider', 'firstName lastName businessName phone email avatar rating')
    .populate('messages')
  
  if (!booking) {
    throw new ApiError('Booking not found', 404)
  }
  
  // Check if user has access to this booking
  if (user.type === 'customer' && booking.customer._id.toString() !== user._id) {
    throw new ApiError('Access denied', 403)
  }
  
  if (user.type === 'provider' && booking.provider._id.toString() !== user._id) {
    throw new ApiError('Access denied', 403)
  }
  
  return successResponse(booking)
})

export const PUT = createApiHandler(async (request: NextRequest, { params }: { params: { id: string } }) => {
  await connectDB()
  
  const user = await getCurrentUser(request)
  const { id } = params
  const updateData = await validateRequestBody(request, updateBookingSchema)
  
  const booking = await Booking.findById(id)
  if (!booking) {
    throw new ApiError('Booking not found', 404)
  }
  
  // Check permissions
  const isCustomer = user.type === 'customer' && booking.customer.toString() === user._id
  const isProvider = user.type === 'provider' && booking.provider.toString() === user._id
  
  if (!isCustomer && !isProvider) {
    throw new ApiError('Access denied', 403)
  }
  
  // Handle status updates
  if (updateData.status) {
    // Business logic for status transitions
    switch (updateData.status) {
      case 'confirmed':
        if (booking.status !== 'pending' || !isProvider) {
          throw new ApiError('Cannot confirm this booking', 400)
        }
        break
      case 'in-progress':
        if (booking.status !== 'confirmed' || !isProvider) {
          throw new ApiError('Cannot start this booking', 400)
        }
        updateData.actualStartTime = new Date().toISOString()
        break
      case 'completed':
        if (booking.status !== 'in-progress' || !isProvider) {
          throw new ApiError('Cannot complete this booking', 400)
        }
        updateData.actualEndTime = new Date().toISOString()
        // Update provider stats
        await User.findByIdAndUpdate(booking.provider, {
          $inc: { 
            completedJobs: 1,
            totalEarnings: updateData.finalPrice || booking.estimatedPrice
          }
        })
        // Update customer stats
        await User.findByIdAndUpdate(booking.customer, {
          $inc: { totalSpent: updateData.finalPrice || booking.estimatedPrice }
        })
        break
      case 'cancelled':
        if (booking.status === 'completed') {
          throw new ApiError('Cannot cancel completed booking', 400)
        }
        updateData.cancelledBy = user._id
        break
    }
  }
  
  const updatedBooking = await Booking.findByIdAndUpdate(
    id,
    updateData,
    { new: true, runValidators: true }
  ).populate([
    { path: 'customer', select: 'firstName lastName phone email avatar' },
    { path: 'provider', select: 'firstName lastName businessName phone email avatar rating' }
  ])
  
  return successResponse(updatedBooking)
})

export const DELETE = createApiHandler(async (request: NextRequest, { params }: { params: { id: string } }) => {
  await connectDB()
  
  const user = await getCurrentUser(request)
  const { id } = params
  
  const booking = await Booking.findById(id)
  if (!booking) {
    throw new ApiError('Booking not found', 404)
  }
  
  // Only allow deletion if user is the customer and booking is pending
  if (user.type !== 'customer' || booking.customer.toString() !== user._id) {
    throw new ApiError('Access denied', 403)
  }
  
  if (booking.status !== 'pending') {
    throw new ApiError('Can only delete pending bookings', 400)
  }
  
  await Booking.findByIdAndDelete(id)
  
  return successResponse({ message: 'Booking deleted successfully' })
})