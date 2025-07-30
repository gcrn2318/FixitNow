import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'
import connectDB from './mongodb'
import User from './models/User'

interface JWTPayload {
  userId: string
  type: 'customer' | 'provider' | 'admin'
  iat?: number
  exp?: number
}

export const generateAccessToken = (userId: string, userType: string): string => {
  return jwt.sign(
    { userId, type: userType },
    process.env.JWT_ACCESS_SECRET!,
    { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m' }
  )
}

export const generateRefreshToken = (userId: string): string => {
  return jwt.sign(
    { userId },
    process.env.JWT_REFRESH_SECRET!,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' }
  )
}

export const verifyAccessToken = (token: string): JWTPayload => {
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as JWTPayload
  } catch (error) {
    throw new Error('Invalid access token')
  }
}

export const verifyRefreshToken = (token: string): any => {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET!)
  } catch (error) {
    throw new Error('Invalid refresh token')
  }
}

export const getTokenFromHeader = (request: NextRequest): string | null => {
  const authorization = request.headers.get('authorization')
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return null
  }
  return authorization.split(' ')[1]
}

export const getCurrentUser = async (request: NextRequest) => {
  try {
    const token = getTokenFromHeader(request)
    if (!token) {
      throw new Error('No token provided')
    }

    const decoded = verifyAccessToken(token)
    
    await connectDB()
    const user = await User.findById(decoded.userId).select('-password -refreshTokens')
    
    if (!user || !user.isActive) {
      throw new Error('User not found or inactive')
    }

    return user
  } catch (error) {
    throw new Error('Authentication failed')
  }
}

export const requireAuth = (handler: Function, allowedTypes?: string[]) => {
  return async (request: NextRequest, context?: any) => {
    try {
      const user = await getCurrentUser(request)
      
      if (allowedTypes && !allowedTypes.includes(user.type)) {
        return Response.json(
          { error: 'Insufficient permissions' },
          { status: 403 }
        )
      }
      
      // Add user to request context
      (request as any).user = user
      
      return handler(request, context)
    } catch (error: any) {
      return Response.json(
        { error: error.message },
        { status: 401 }
      )
    }
  }
}

export const createAuthResponse = (user: any, accessToken: string, refreshToken: string) => {
  const userData = {
    id: user._id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    type: user.type,
    phone: user.phone,
    avatar: user.avatar,
    isVerified: user.isVerified,
    ...(user.type === 'customer' && {
      totalBookings: user.totalBookings,
      totalSpent: user.totalSpent,
      favoriteProviders: user.favoriteProviders?.length || 0,
    }),
    ...(user.type === 'provider' && {
      businessName: user.businessName,
      services: user.services,
      rating: user.rating,
      totalReviews: user.totalReviews,
      completedJobs: user.completedJobs,
      totalEarnings: user.totalEarnings,
    })
  }

  return {
    user: userData,
    tokens: {
      accessToken,
      refreshToken
    }
  }
}