import { NextRequest } from 'next/server'
import { createApiHandler, successResponse, ApiError } from '@/lib/api-utils'
import { seedHandler } from '@/lib/seed'

export const POST = createApiHandler(async (request: NextRequest) => {
  // Only allow in development
  if (process.env.NODE_ENV !== 'development') {
    throw new ApiError('Seeding is only allowed in development environment', 403)
  }
  
  const result = await seedHandler()
  
  return successResponse(result)
})