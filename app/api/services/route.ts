import { NextRequest } from 'next/server'
import connectDB from '@/lib/mongodb'
import Service from '@/lib/models/Service'
import { createApiHandler, successResponse, paginateResults, buildSearchQuery } from '@/lib/api-utils'

export const GET = createApiHandler(async (request: NextRequest) => {
  await connectDB()
  
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const search = searchParams.get('search')
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '20')
  const sortBy = searchParams.get('sortBy') || 'popularity'
  
  let query: any = { isActive: true }
  
  // Filter by category
  if (category) {
    query.category = category
  }
  
  // Text search
  if (search) {
    const searchQuery = buildSearchQuery(search, ['name', 'description'])
    query = { ...query, ...searchQuery }
  }
  
  // Build sort criteria
  let sortCriteria: any = {}
  switch (sortBy) {
    case 'popularity':
      sortCriteria = { popularity: -1 }
      break
    case 'name':
      sortCriteria = { name: 1 }
      break
    case 'price':
      sortCriteria = { basePrice: 1 }
      break
    default:
      sortCriteria = { popularity: -1 }
  }
  
  const servicesQuery = Service.find(query).sort(sortCriteria)
  
  const [services, total] = await Promise.all([
    paginateResults(servicesQuery, page, limit),
    Service.countDocuments(query)
  ])
  
  return successResponse({
    services,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  })
})