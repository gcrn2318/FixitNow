import { NextRequest } from 'next/server'
import connectDB from '@/lib/mongodb'
import Message from '@/lib/models/Message'
import User from '@/lib/models/User'
import { getCurrentUser } from '@/lib/auth'
import { validateRequestBody, createApiHandler, successResponse, ApiError, paginateResults } from '@/lib/api-utils'
import { sendMessageSchema } from '@/lib/validations'

export const GET = createApiHandler(async (request: NextRequest) => {
  await connectDB()
  
  const user = await getCurrentUser(request)
  const { searchParams } = new URL(request.url)
  
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '20')
  const recipientId = searchParams.get('recipientId')
  const bookingId = searchParams.get('bookingId')
  
  let query: any = {
    $or: [
      { sender: user._id },
      { recipient: user._id }
    ]
  }
  
  // Filter by specific conversation
  if (recipientId) {
    query = {
      $or: [
        { sender: user._id, recipient: recipientId },
        { sender: recipientId, recipient: user._id }
      ]
    }
  }
  
  // Filter by booking
  if (bookingId) {
    query.booking = bookingId
  }
  
  const messagesQuery = Message.find(query)
    .populate('sender', 'firstName lastName avatar')
    .populate('recipient', 'firstName lastName avatar')
    .populate('booking', 'service status')
    .sort({ createdAt: -1 })
  
  const [messages, total] = await Promise.all([
    paginateResults(messagesQuery, page, limit),
    Message.countDocuments(query)
  ])
  
  return successResponse({
    messages: messages.reverse(), // Show oldest first
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  })
})

export const POST = createApiHandler(async (request: NextRequest) => {
  await connectDB()
  
  const user = await getCurrentUser(request)
  const messageData = await validateRequestBody(request, sendMessageSchema)
  
  // Verify recipient exists
  const recipient = await User.findById(messageData.recipientId)
  if (!recipient) {
    throw new ApiError('Recipient not found', 404)
  }
  
  // Create message
  const message = new Message({
    sender: user._id,
    recipient: messageData.recipientId,
    content: messageData.content,
    type: messageData.type || 'text',
    booking: messageData.bookingId,
    attachments: messageData.attachments,
    location: messageData.location,
    isDelivered: true,
    deliveredAt: new Date()
  })
  
  await message.save()
  
  // Populate the message
  await message.populate([
    { path: 'sender', select: 'firstName lastName avatar' },
    { path: 'recipient', select: 'firstName lastName avatar' },
    { path: 'booking', select: 'service status' }
  ])
  
  // TODO: Emit socket event for real-time messaging
  // We'll implement this when we create the Socket.io server
  
  return successResponse(message, 201)
})