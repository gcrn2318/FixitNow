import { NextRequest } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/lib/models/User'
import { requireAuth } from '@/lib/auth'
import { validateRequestBody, createApiHandler, successResponse, ApiError } from '@/lib/api-utils'
import { adminUpdateUserSchema } from '@/lib/validations'

export const GET = requireAuth(createApiHandler(async (request: NextRequest, { params }: { params: { id: string } }) => {
  await connectDB()
  
  const { id } = params
  const user = await User.findById(id).select('-password -refreshTokens')
  
  if (!user) {
    throw new ApiError('User not found', 404)
  }
  
  return successResponse(user)
}), ['admin'])

export const PUT = requireAuth(createApiHandler(async (request: NextRequest, { params }: { params: { id: string } }) => {
  await connectDB()
  
  const { id } = params
  const updateData = await validateRequestBody(request, adminUpdateUserSchema)
  
  const user = await User.findByIdAndUpdate(
    id,
    updateData,
    { new: true, runValidators: true }
  ).select('-password -refreshTokens')
  
  if (!user) {
    throw new ApiError('User not found', 404)
  }
  
  return successResponse(user)
}), ['admin'])

export const DELETE = requireAuth(createApiHandler(async (request: NextRequest, { params }: { params: { id: string } }) => {
  await connectDB()
  
  const { id } = params
  
  // Don't actually delete, just deactivate
  const user = await User.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  ).select('-password -refreshTokens')
  
  if (!user) {
    throw new ApiError('User not found', 404)
  }
  
  return successResponse({ message: 'User deactivated successfully' })
}), ['admin'])