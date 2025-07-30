import { NextRequest } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/lib/models/User'
import { createApiHandler, successResponse, paginateResults, buildSearchQuery } from '@/lib/api-utils'

export const GET = createApiHandler(async (request: NextRequest) => {
  await connectDB()
  
  const { searchParams } = new URL(request.url)
  
  const service = searchParams.get('service')
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')
  const radius = parseInt(searchParams.get('radius') || '25')
  const minRating = parseFloat(searchParams.get('minRating') || '0')
  const maxPrice = parseFloat(searchParams.get('maxPrice') || '999999')
  const sortBy = searchParams.get('sortBy') || 'rating'
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  const search = searchParams.get('search')
  
  // Build base query for providers
  let query: any = {
    type: 'provider',
    isActive: true,
    isVerified: true
  }
  
  // Filter by service
  if (service) {
    query.services = { $in: [service] }
  }
  
  // Filter by rating
  if (minRating > 0) {
    query.rating = { $gte: minRating }
  }
  
  // Location-based search
  if (lat && lng) {
    query['location.coordinates'] = {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [parseFloat(lng), parseFloat(lat)]
        },
        $maxDistance: radius * 1609.34 // Convert miles to meters
      }
    }
  }
  
  // Text search
  if (search) {
    const searchQuery = buildSearchQuery(search, ['firstName', 'lastName', 'businessName', 'services'])
    query = { ...query, ...searchQuery }
  }
  
  // Build sort criteria
  let sortCriteria: any = {}
  switch (sortBy) {
    case 'rating':
      sortCriteria = { rating: -1, totalReviews: -1 }
      break
    case 'price':
      sortCriteria = { 'pricing.hourlyRate': 1 }
      break
    case 'distance':
      // Distance sorting is handled by $near in the query
      sortCriteria = {}
      break
    case 'reviews':
      sortCriteria = { totalReviews: -1, rating: -1 }
      break
    default:
      sortCriteria = { rating: -1 }
  }
  
  const providersQuery = User.find(query)
    .select('-password -refreshTokens -favoriteProviders -totalBookings -totalSpent')
    .sort(sortCriteria)
  
  const [providers, total] = await Promise.all([
    paginateResults(providersQuery, page, limit),
    User.countDocuments(query)
  ])
  
  // Calculate additional data for each provider
  const enrichedProviders = providers.map(provider => {
    const basePrice = 75 // Default hourly rate
    return {
      ...provider.toObject(),
      hourlyRate: basePrice,
      distance: lat && lng ? calculateDistance(
        parseFloat(lat),
        parseFloat(lng),
        provider.location?.coordinates?.lat || 0,
        provider.location?.coordinates?.lng || 0
      ).toFixed(1) + ' miles' : 'Unknown',
      responseTime: '< 10 min',
      availability: provider.availability || {
        days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
        hours: { start: '09:00', end: '17:00' }
      }
    }
  })
  
  return successResponse({
    providers: enrichedProviders,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  })
})

// Helper function to calculate distance between two points
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3959 // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}