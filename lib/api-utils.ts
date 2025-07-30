import { NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod'

export class ApiError extends Error {
  statusCode: number
  
  constructor(message: string, statusCode: number = 500) {
    super(message)
    this.statusCode = statusCode
    this.name = 'ApiError'
  }
}

export const handleApiError = (error: any): NextResponse => {
  console.error('API Error:', error)
  
  if (error instanceof ApiError) {
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode }
    )
  }
  
  if (error instanceof ZodError) {
    return NextResponse.json(
      { 
        error: 'Validation error',
        details: error.errors
      },
      { status: 400 }
    )
  }
  
  if (error.code === 11000) {
    // MongoDB duplicate key error
    const field = Object.keys(error.keyPattern)[0]
    return NextResponse.json(
      { error: `${field} already exists` },
      { status: 409 }
    )
  }
  
  if (error.name === 'ValidationError') {
    // Mongoose validation error
    const errors = Object.values(error.errors).map((err: any) => err.message)
    return NextResponse.json(
      { error: 'Validation error', details: errors },
      { status: 400 }
    )
  }
  
  return NextResponse.json(
    { error: 'Internal server error' },
    { status: 500 }
  )
}

export const validateRequestBody = async (request: NextRequest, schema: any) => {
  try {
    const body = await request.json()
    return schema.parse(body)
  } catch (error) {
    if (error instanceof ZodError) {
      throw error
    }
    throw new ApiError('Invalid JSON body', 400)
  }
}

export const createApiHandler = (handler: Function) => {
  return async (request: NextRequest, context?: any) => {
    try {
      return await handler(request, context)
    } catch (error) {
      return handleApiError(error)
    }
  }
}

export const successResponse = (data: any, status: number = 200) => {
  return NextResponse.json(
    { success: true, data },
    { status }
  )
}

export const errorResponse = (message: string, status: number = 400) => {
  return NextResponse.json(
    { success: false, error: message },
    { status }
  )
}

export const paginateResults = (query: any, page: number = 1, limit: number = 10) => {
  const skip = (page - 1) * limit
  return query.skip(skip).limit(limit)
}

export const buildSearchQuery = (searchTerm: string, fields: string[]) => {
  if (!searchTerm) return {}
  
  return {
    $or: fields.map(field => ({
      [field]: { $regex: searchTerm, $options: 'i' }
    }))
  }
}