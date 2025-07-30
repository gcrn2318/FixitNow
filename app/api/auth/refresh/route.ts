import { NextRequest } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/lib/models/User'
import { generateAccessToken, verifyRefreshToken } from '@/lib/auth'
import { validateRequestBody, createApiHandler, ApiError } from '@/lib/api-utils'
import { refreshTokenSchema } from '@/lib/validations'

export const POST = createApiHandler(async (request: NextRequest) => {
  await connectDB()
  
  const { refreshToken } = await validateRequestBody(request, refreshTokenSchema)
  
  // Verify refresh token
  let decoded
  try {
    decoded = verifyRefreshToken(refreshToken)
  } catch (error) {
    throw new ApiError('Invalid refresh token', 401)
  }
  
  // Find user and check if refresh token exists
  const user = await User.findById(decoded.userId)
  if (!user || !user.refreshTokens.includes(refreshToken)) {
    throw new ApiError('Invalid refresh token', 401)
  }
  
  // Check if user is active
  if (!user.isActive) {
    throw new ApiError('Account is deactivated', 401)
  }
  
  // Generate new access token
  const newAccessToken = generateAccessToken(user._id.toString(), user.type)
  
  return Response.json({
    success: true,
    data: {
      accessToken: newAccessToken
    }
  })
})