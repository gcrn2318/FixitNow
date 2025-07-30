import { NextRequest } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/lib/models/User'
import Booking from '@/lib/models/Booking'
import Review from '@/lib/models/Review'
import { requireAuth } from '@/lib/auth'
import { createApiHandler, successResponse } from '@/lib/api-utils'

export const GET = requireAuth(createApiHandler(async (request: NextRequest) => {
  await connectDB()
  
  const { searchParams } = new URL(request.url)
  const days = parseInt(searchParams.get('days') || '30')
  
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)
  
  // Get overall statistics
  const [
    totalUsers,
    totalCustomers,
    totalProviders,
    totalBookings,
    completedBookings,
    totalRevenue,
    averageRating,
    newUsersThisPeriod,
    newBookingsThisPeriod
  ] = await Promise.all([
    User.countDocuments({ isActive: true }),
    User.countDocuments({ type: 'customer', isActive: true }),
    User.countDocuments({ type: 'provider', isActive: true }),
    Booking.countDocuments(),
    Booking.countDocuments({ status: 'completed' }),
    Booking.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$finalPrice' } } }
    ]).then(result => result[0]?.total || 0),
    Review.aggregate([
      { $group: { _id: null, avgRating: { $avg: '$rating' } } }
    ]).then(result => result[0]?.avgRating || 0),
    User.countDocuments({ createdAt: { $gte: startDate }, isActive: true }),
    Booking.countDocuments({ createdAt: { $gte: startDate } })
  ])
  
  // Get booking status distribution
  const bookingStatusDistribution = await Booking.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ])
  
  // Get popular services
  const popularServices = await Booking.aggregate([
    {
      $group: {
        _id: '$service',
        count: { $sum: 1 },
        totalRevenue: { $sum: '$finalPrice' }
      }
    },
    { $sort: { count: -1 } },
    { $limit: 10 }
  ])
  
  // Get daily booking trends
  const bookingTrends = await Booking.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate }
      }
    },
    {
      $group: {
        _id: {
          $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
        },
        bookings: { $sum: 1 },
        revenue: { $sum: '$finalPrice' }
      }
    },
    { $sort: { _id: 1 } }
  ])
  
  // Get top providers
  const topProviders = await User.aggregate([
    {
      $match: {
        type: 'provider',
        isActive: true
      }
    },
    {
      $sort: {
        rating: -1,
        totalReviews: -1,
        completedJobs: -1
      }
    },
    {
      $limit: 10
    },
    {
      $project: {
        firstName: 1,
        lastName: 1,
        businessName: 1,
        rating: 1,
        totalReviews: 1,
        completedJobs: 1,
        totalEarnings: 1
      }
    }
  ])
  
  // Get user registration trends
  const userRegistrationTrends = await User.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate },
        isActive: true
      }
    },
    {
      $group: {
        _id: {
          date: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          type: '$type'
        },
        count: { $sum: 1 }
      }
    },
    { $sort: { '_id.date': 1 } }
  ])
  
  const analytics = {
    overview: {
      totalUsers,
      totalCustomers,
      totalProviders,
      totalBookings,
      completedBookings,
      totalRevenue: Math.round(totalRevenue * 100) / 100,
      averageRating: Math.round(averageRating * 10) / 10,
      completionRate: totalBookings > 0 ? Math.round((completedBookings / totalBookings) * 100) : 0,
      newUsersThisPeriod,
      newBookingsThisPeriod
    },
    charts: {
      bookingStatusDistribution,
      popularServices,
      bookingTrends,
      userRegistrationTrends
    },
    topProviders
  }
  
  return successResponse(analytics)
}), ['admin'])