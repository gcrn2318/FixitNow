import { NextRequest } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/lib/models/User'
import { getCurrentUser } from '@/lib/auth'
import { validateRequestBody, createApiHandler, successResponse } from '@/lib/api-utils'
import { updateProfileSchema } from '@/lib/validations'

export const GET = createApiHandler(async (request: NextRequest) => {
  const user = await getCurrentUser(request)
  
  await connectDB()
  const fullUser = await User.findById(user._id).select('-password -refreshTokens').populate('favoriteProviders', 'firstName lastName businessName rating')
  
  return successResponse(fullUser)
})

export const PUT = createApiHandler(async (request: NextRequest) => {
  await connectDB()
  
  const user = await getCurrentUser(request)
  const updateData = await validateRequestBody(request, updateProfileSchema)
  
  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    updateData,
    { new: true, runValidators: true }
  ).select('-password -refreshTokens')
  
  return successResponse(updatedUser)
})