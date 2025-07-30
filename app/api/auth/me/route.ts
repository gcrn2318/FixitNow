import { NextRequest } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { createApiHandler } from '@/lib/api-utils'

export const GET = createApiHandler(async (request: NextRequest) => {
  const user = await getCurrentUser(request)
  
  const userData = {
    id: user._id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    type: user.type,
    phone: user.phone,
    avatar: user.avatar,
    isVerified: user.isVerified,
    ...(user.type === 'customer' && {
      totalBookings: user.totalBookings,
      totalSpent: user.totalSpent,
      favoriteProviders: user.favoriteProviders?.length || 0,
    }),
    ...(user.type === 'provider' && {
      businessName: user.businessName,
      services: user.services,
      rating: user.rating,
      totalReviews: user.totalReviews,
      completedJobs: user.completedJobs,
      totalEarnings: user.totalEarnings,
      availability: user.availability,
      location: user.location
    })
  }
  
  return Response.json({
    success: true,
    data: userData
  })
})