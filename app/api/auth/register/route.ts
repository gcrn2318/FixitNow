import { NextRequest } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/lib/models/User'
import { generateAccessToken, createAuthResponse } from '@/lib/auth'
import { validateRequestBody, createApiHandler, ApiError } from '@/lib/api-utils'
import { registerSchema } from '@/lib/validations'

export const POST = createApiHandler(async (request: NextRequest) => {
  await connectDB()
  
  const userData = await validateRequestBody(request, registerSchema)
  
  // Check if user already exists
  const existingUser = await User.findOne({ email: userData.email.toLowerCase() })
  if (existingUser) {
    throw new ApiError('User already exists with this email', 409)
  }
  
  // Create new user
  const user = new User({
    ...userData,
    email: userData.email.toLowerCase(),
    // Initialize provider specific fields if type is provider
    ...(userData.type === 'provider' && {
      businessName: userData.businessName,
      services: userData.services || [],
      availability: {
        days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
        hours: { start: '09:00', end: '17:00' }
      }
    })
  })
  
  await user.save()
  
  // Generate tokens
  const accessToken = generateAccessToken(user._id.toString(), user.type)
  const refreshToken = user.generateRefreshToken()
  
  // Save refresh token to user
  await user.save()
  
  const response = createAuthResponse(user, accessToken, refreshToken)
  
  return Response.json({
    success: true,
    message: 'Registration successful',
    data: response
  }, { status: 201 })
})