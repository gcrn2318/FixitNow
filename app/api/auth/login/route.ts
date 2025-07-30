import { NextRequest } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/lib/models/User'
import { generateAccessToken, createAuthResponse } from '@/lib/auth'
import { validateRequestBody, createApiHandler, ApiError } from '@/lib/api-utils'
import { loginSchema } from '@/lib/validations'

export const POST = createApiHandler(async (request: NextRequest) => {
  await connectDB()
  
  const { email, password, userType } = await validateRequestBody(request, loginSchema)
  
  // Find user by email
  const user = await User.findOne({ email: email.toLowerCase() })
  if (!user) {
    throw new ApiError('Invalid credentials', 401)
  }
  
  // Check if user is active
  if (!user.isActive) {
    throw new ApiError('Account is deactivated', 401)
  }
  
  // Verify password
  const isPasswordValid = await user.comparePassword(password)
  if (!isPasswordValid) {
    throw new ApiError('Invalid credentials', 401)
  }
  
  // Check user type if specified
  if (userType && user.type !== userType) {
    throw new ApiError(`Invalid user type. Expected ${userType}, got ${user.type}`, 401)
  }
  
  // Generate tokens
  const accessToken = generateAccessToken(user._id.toString(), user.type)
  const refreshToken = user.generateRefreshToken()
  
  // Save refresh token to user
  await user.save()
  
  const response = createAuthResponse(user, accessToken, refreshToken)
  
  return Response.json({
    success: true,
    message: 'Login successful',
    data: response
  })
})