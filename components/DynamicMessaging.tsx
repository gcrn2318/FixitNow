'use client'

import React, { useEffect, useState, useRef } from 'react'
import { useAppData } from '@/contexts/AppDataContext'
import { useSocket } from '@/contexts/SocketContext'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  Send, 
  MessageCircle, 
  Phone, 
  Video,
  Paperclip,
  Smile,
  MoreVertical,
  Check,
  CheckCheck,
  Clock,
  Loader2
} from 'lucide-react'
import { format, isToday, isYesterday } from 'date-fns'
import { toast } from 'sonner'

interface Conversation {
  id: string
  participant: {
    id: string
    name: string
    avatar?: string
    type: 'customer' | 'provider'
    isOnline: boolean
  }
  lastMessage: {
    content: string
    timestamp: string
    isRead: boolean
    senderId: string
  }
  unreadCount: number
  bookingId?: string
}

export function DynamicMessaging() {
  const { user } = useAuth()
  const { state, fetchMessages, sendMessage, fetchConversations } = useAppData()
  const { sendMessage: socketSendMessage, startTyping, stopTyping } = useSocket()
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [messageText, setMessageText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    fetchConversations()
  }, [])

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages({ recipientId: selectedConversation })
    }
  }, [selectedConversation])

  useEffect(() => {
    scrollToBottom()
  }, [state.messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = async () => {
    if (!messageText.trim() || !selectedConversation || isSending) return

    setIsSending(true)
    const messageData = {
      recipientId: selectedConversation,
      content: messageText.trim(),
      type: 'text'
    }

    try {
      // Send via API
      await sendMessage(messageData)
      
      // Send via socket for real-time delivery
      socketSendMessage(messageData)
      
      setMessageText('')
      stopTyping(selectedConversation)
    } catch (error) {
      toast.error('Failed to send message')
    } finally {
      setIsSending(false)
    }
  }

  const handleTyping = (value: string) => {
    setMessageText(value)
    
    if (!selectedConversation) return

    if (value.trim() && !isTyping) {
      setIsTyping(true)
      startTyping(selectedConversation)
    }

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    // Set new timeout to stop typing
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false)
      stopTyping(selectedConversation)
    }, 1000)
  }

  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp)
    
    if (isToday(date)) {
      return format(date, 'HH:mm')
    } else if (isYesterday(date)) {
      return 'Yesterday'
    } else {
      return format(date, 'MMM dd')
    }
  }

  const getMessageStatus = (message: any) => {
    if (message.sender._id !== user?.id) return null
    
    if (message.isRead) {
      return <CheckCheck className="h-3 w-3 text-blue-500" />
    } else if (message.isDelivered) {
      return <CheckCheck className="h-3 w-3 text-gray-400" />
    } else {
      return <Check className="h-3 w-3 text-gray-400" />
    }
  }

  // Mock conversations data - in real app this would come from API
  const conversations: Conversation[] = state.conversations.map(conv => ({
    id: conv.participant.id,
    participant: {
      id: conv.participant.id,
      name: `${conv.participant.firstName} ${conv.participant.lastName}`,
      avatar: conv.participant.avatar,
      type: conv.participant.type,
      isOnline: Math.random() > 0.5 // Mock online status
    },
    lastMessage: conv.lastMessage || {
      content: 'No messages yet',
      timestamp: new Date().toISOString(),
      isRead: true,
      senderId: conv.participant.id
    },
    unreadCount: conv.unreadCount || 0,
    bookingId: conv.bookingId
  }))

  const selectedConversationData = conversations.find(c => c.id === selectedConversation)
  const conversationMessages = state.messages.filter(m => 
    (m.sender._id === selectedConversation && m.recipient._id === user?.id) ||
    (m.sender._id === user?.id && m.recipient._id === selectedConversation)
  )

  return (
    <div className="flex h-[600px] border rounded-lg overflow-hidden">
      {/* Conversations List */}
      <div className="w-1/3 border-r bg-muted/30">
        <div className="p-4 border-b">
          <h3 className="font-semibold">Messages</h3>
          <p className="text-sm text-muted-foreground">
            {conversations.length} conversations
          </p>
        </div>
        
        <ScrollArea className="h-[calc(600px-80px)]">
          <div className="p-2 space-y-1">
            {conversations.length === 0 ? (
              <div className="text-center py-8">
                <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">No conversations yet</p>
              </div>
            ) : (
              conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${
                    selectedConversation === conversation.id ? 'bg-muted' : ''
                  }`}
                  onClick={() => setSelectedConversation(conversation.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={conversation.participant.avatar} />
                        <AvatarFallback>
                          {conversation.participant.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.participant.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium truncate">
                          {conversation.participant.name}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {formatMessageTime(conversation.lastMessage.timestamp)}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground truncate">
                          {conversation.lastMessage.content}
                        </p>
                        {conversation.unreadCount > 0 && (
                          <Badge variant="default" className="h-5 w-5 p-0 text-xs">
                            {conversation.unreadCount}
                          </Badge>
                        )}
                      </div>
                      
                      <Badge variant="outline" className="text-xs mt-1">
                        {conversation.participant.type}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversationData ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b bg-muted/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={selectedConversationData.participant.avatar} />
                      <AvatarFallback>
                        {selectedConversationData.participant.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {selectedConversationData.participant.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                    )}
                  </div>
                  
                  <div>
                    <h4 className="font-semibold">{selectedConversationData.participant.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedConversationData.participant.isOnline ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {conversationMessages.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Start a conversation with {selectedConversationData.participant.name}
                    </p>
                  </div>
                ) : (
                  conversationMessages.map((message) => {
                    const isOwn = message.sender._id === user?.id
                    
                    return (
                      <div
                        key={message._id}
                        className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[70%] ${isOwn ? 'order-2' : 'order-1'}`}>
                          <div
                            className={`p-3 rounded-lg ${
                              isOwn
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                          </div>
                          
                          <div className={`flex items-center gap-1 mt-1 text-xs text-muted-foreground ${
                            isOwn ? 'justify-end' : 'justify-start'
                          }`}>
                            <span>{formatMessageTime(message.createdAt)}</span>
                            {getMessageStatus(message)}
                          </div>
                        </div>
                      </div>
                    )
                  })
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Paperclip className="h-4 w-4" />
                </Button>
                
                <div className="flex-1 relative">
                  <Input
                    placeholder="Type a message..."
                    value={messageText}
                    onChange={(e) => handleTyping(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                    disabled={isSending}
                  />
                </div>
                
                <Button variant="ghost" size="sm">
                  <Smile className="h-4 w-4" />
                </Button>
                
                <Button 
                  onClick={handleSendMessage}
                  disabled={!messageText.trim() || isSending}
                  size="sm"
                >
                  {isSending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageCircle className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Select a conversation</h3>
              <p className="text-muted-foreground">
                Choose a conversation from the list to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DynamicMessaging