import { NextRequest } from 'next/server'
import connectDB from '@/lib/mongodb'
import Message from '@/lib/models/Message'
import { getCurrentUser } from '@/lib/auth'
import { createApiHandler, successResponse } from '@/lib/api-utils'

export const GET = createApiHandler(async (request: NextRequest) => {
  await connectDB()
  
  const user = await getCurrentUser(request)
  
  // Get all unique conversations for this user
  const conversations = await Message.aggregate([
    {
      $match: {
        $or: [
          { sender: user._id },
          { recipient: user._id }
        ]
      }
    },
    {
      $sort: { createdAt: -1 }
    },
    {
      $group: {
        _id: {
          $cond: [
            { $eq: ['$sender', user._id] },
            '$recipient',
            '$sender'
          ]
        },
        lastMessage: { $first: '$$ROOT' },
        unreadCount: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $eq: ['$recipient', user._id] },
                  { $eq: ['$isRead', false] }
                ]
              },
              1,
              0
            ]
          }
        }
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'participant'
      }
    },
    {
      $lookup: {
        from: 'bookings',
        localField: 'lastMessage.booking',
        foreignField: '_id',
        as: 'booking'
      }
    },
    {
      $project: {
        participant: { $arrayElemAt: ['$participant', 0] },
        lastMessage: 1,
        booking: { $arrayElemAt: ['$booking', 0] },
        unreadCount: 1
      }
    },
    {
      $project: {
        'participant.password': 0,
        'participant.refreshTokens': 0
      }
    },
    {
      $sort: { 'lastMessage.createdAt': -1 }
    }
  ])
  
  return successResponse(conversations)
})