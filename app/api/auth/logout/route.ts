import { NextRequest } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/lib/models/User'
import { getCurrentUser } from '@/lib/auth'
import { validateRequestBody, createApiHandler } from '@/lib/api-utils'
import { refreshTokenSchema } from '@/lib/validations'

export const POST = createApiHandler(async (request: NextRequest) => {
  await connectDB()
  
  // Get current user
  const user = await getCurrentUser(request)
  
  // Get refresh token from body (optional)
  let refreshToken: string | undefined
  try {
    const body = await validateRequestBody(request, refreshTokenSchema)
    refreshToken = body.refreshToken
  } catch (error) {
    // If no refresh token provided, logout from all devices
  }
  
  // Remove refresh token(s)
  const dbUser = await User.findById(user._id)
  if (dbUser) {
    if (refreshToken) {
      // Remove specific refresh token
      dbUser.refreshTokens = dbUser.refreshTokens.filter(token => token !== refreshToken)
    } else {
      // Remove all refresh tokens (logout from all devices)
      dbUser.refreshTokens = []
    }
    await dbUser.save()
  }
  
  return Response.json({
    success: true,
    message: 'Logged out successfully'
  })
})