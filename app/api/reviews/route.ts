import { NextRequest } from 'next/server'
import connectDB from '@/lib/mongodb'
import Review from '@/lib/models/Review'
import Booking from '@/lib/models/Booking'
import User from '@/lib/models/User'
import { getCurrentUser } from '@/lib/auth'
import { validateRequestBody, createApiHandler, successResponse, ApiError, paginateResults } from '@/lib/api-utils'
import { createReviewSchema } from '@/lib/validations'

export const GET = createApiHandler(async (request: NextRequest) => {
  await connectDB()
  
  const { searchParams } = new URL(request.url)
  const providerId = searchParams.get('providerId')
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  
  let query: any = { isVisible: true }
  
  if (providerId) {
    query.reviewee = providerId
  }
  
  const reviewsQuery = Review.find(query)
    .populate('reviewer', 'firstName lastName avatar')
    .populate('reviewee', 'firstName lastName businessName')
    .populate('booking', 'service')
    .sort({ createdAt: -1 })
  
  const [reviews, total] = await Promise.all([
    paginateResults(reviewsQuery, page, limit),
    Review.countDocuments(query)
  ])
  
  return successResponse({
    reviews,
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
  const reviewData = await validateRequestBody(request, createReviewSchema)
  
  // Find the booking
  const booking = await Booking.findById(reviewData.bookingId)
  if (!booking) {
    throw new ApiError('Booking not found', 404)
  }
  
  // Check if booking is completed
  if (booking.status !== 'completed') {
    throw new ApiError('Can only review completed bookings', 400)
  }
  
  // Determine reviewer and reviewee
  let reviewerId = user._id
  let revieweeId
  
  if (user.type === 'customer' && booking.customer.toString() === user._id) {
    revieweeId = booking.provider
  } else if (user.type === 'provider' && booking.provider.toString() === user._id) {
    revieweeId = booking.customer
  } else {
    throw new ApiError('You can only review bookings you participated in', 403)
  }
  
  // Check if review already exists
  const existingReview = await Review.findOne({
    booking: reviewData.bookingId,
    reviewer: reviewerId
  })
  
  if (existingReview) {
    throw new ApiError('You have already reviewed this booking', 409)
  }
  
  // Create review
  const review = new Review({
    booking: reviewData.bookingId,
    reviewer: reviewerId,
    reviewee: revieweeId,
    rating: reviewData.rating,
    comment: reviewData.comment,
    categories: reviewData.categories,
    photos: reviewData.photos
  })
  
  await review.save()
  
  // Update reviewee's rating if they are a provider
  if (user.type === 'customer') {
    await updateProviderRating(revieweeId)
  }
  
  // Populate the review
  await review.populate([
    { path: 'reviewer', select: 'firstName lastName avatar' },
    { path: 'reviewee', select: 'firstName lastName businessName' },
    { path: 'booking', select: 'service' }
  ])
  
  return successResponse(review, 201)
})

// Helper function to update provider's average rating
async function updateProviderRating(providerId: string) {
  const reviews = await Review.find({ reviewee: providerId, isVisible: true })
  
  if (reviews.length === 0) return
  
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
  const averageRating = totalRating / reviews.length
  
  await User.findByIdAndUpdate(providerId, {
    rating: Math.round(averageRating * 10) / 10, // Round to 1 decimal place
    totalReviews: reviews.length
  })
}