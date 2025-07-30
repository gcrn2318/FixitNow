import { NextRequest } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/lib/models/User'
import { requireAuth } from '@/lib/auth'
import { createApiHandler, successResponse, paginateResults, buildSearchQuery } from '@/lib/api-utils'

export const GET = requireAuth(createApiHandler(async (request: NextRequest) => {
  await connectDB()
  
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '20')
  const userType = searchParams.get('type')
  const search = searchParams.get('search')
  const isVerified = searchParams.get('isVerified')
  const isActive = searchParams.get('isActive')
  
  let query: any = {}
  
  // Filter by user type
  if (userType) {
    query.type = userType
  }
  
  // Filter by verification status
  if (isVerified !== null) {
    query.isVerified = isVerified === 'true'
  }
  
  // Filter by active status
  if (isActive !== null) {
    query.isActive = isActive === 'true'
  }
  
  // Text search
  if (search) {
    const searchQuery = buildSearchQuery(search, ['firstName', 'lastName', 'email', 'businessName'])
    query = { ...query, ...searchQuery }
  }
  
  const usersQuery = User.find(query)
    .select('-password -refreshTokens')
    .sort({ createdAt: -1 })
  
  const [users, total] = await Promise.all([
    paginateResults(usersQuery, page, limit),
    User.countDocuments(query)
  ])
  
  return successResponse({
    users,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  })
}), ['admin'])