"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Send,
  Paperclip,
  Smile,
  Phone,
  Video,
  MoreVertical,
  ImageIcon,
  MapPin,
  CheckCheck,
  Mic,
  Star,
  Shield,
} from "lucide-react"

interface Message {
  id: string
  sender: "user" | "provider"
  content: string
  timestamp: Date
  type: "text" | "image" | "location" | "quote"
  status?: "sent" | "delivered" | "read"
  metadata?: any
}

const mockMessages: Message[] = [
  {
    id: "1",
    sender: "provider",
    content: "Hi! I'm John, your plumber. I see you need help with a kitchen sink leak. I can be there in 30 minutes.",
    timestamp: new Date(Date.now() - 300000),
    type: "text",
    status: "read",
  },
  {
    id: "2",
    sender: "user",
    content: "That sounds great! The leak is getting worse. How much will it cost?",
    timestamp: new Date(Date.now() - 240000),
    type: "text",
    status: "read",
  },
  {
    id: "3",
    sender: "provider",
    content:
      "I'll need to see it first, but typically sink repairs range from $75-150. I'll give you an exact quote when I arrive.",
    timestamp: new Date(Date.now() - 180000),
    type: "quote",
    status: "read",
    metadata: { minPrice: 75, maxPrice: 150, service: "Sink Repair" },
  },
  {
    id: "4",
    sender: "user",
    content: "Perfect! I'm at 123 Main Street, Apt 4B. The building entrance is on the left side.",
    timestamp: new Date(Date.now() - 120000),
    type: "text",
    status: "read",
  },
  {
    id: "5",
    sender: "provider",
    content: "Got it! I'm on my way. You can track my location in real-time. ETA: 25 minutes.",
    timestamp: new Date(Date.now() - 60000),
    type: "location",
    status: "delivered",
  },
]

export function RealTimeChat() {
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const provider = {
    name: "John Smith",
    service: "Premium Plumbing",
    rating: 4.9,
    image: "/placeholder.svg?height=40&width=40",
    status: "online",
    verified: true,
    eta: "25 min",
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    // Simulate provider typing
    const typingInterval = setInterval(() => {
      if (Math.random() > 0.8) {
        setIsTyping(true)
        setTimeout(() => setIsTyping(false), 2000)
      }
    }, 10000)

    return () => clearInterval(typingInterval)
  }, [])

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: newMessage,
      timestamp: new Date(),
      type: "text",
      status: "sent",
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")

    // Simulate provider response
    setTimeout(() => {
      const responses = [
        "Thanks for the info! I'll be there soon.",
        "Perfect, I have all the tools needed for this repair.",
        "I'll send you a photo when I arrive at your building.",
        "No problem! I'll take care of this quickly.",
      ]

      const response: Message = {
        id: (Date.now() + 1).toString(),
        sender: "provider",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        type: "text",
        status: "delivered",
      }

      setMessages((prev) => [...prev, response])
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const renderMessage = (message: Message) => {
    const isUser = message.sender === "user"

    return (
      <div key={message.id} className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
        <div
          className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${isUser ? "flex-row-reverse space-x-reverse" : ""}`}
        >
          {!isUser && (
            <Avatar className="w-8 h-8 border border-gray-200 dark:border-gray-800">
              <AvatarImage src={provider.image || "/placeholder.svg"} />
              <AvatarFallback className="bg-gray-100 dark:bg-gray-900 text-black dark:text-white text-xs">
                {provider.name[0]}
              </AvatarFallback>
            </Avatar>
          )}

          <div
            className={`rounded-2xl px-4 py-3 ${
              isUser
                ? "bg-black dark:bg-white text-white dark:text-black"
                : "bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-200 dark:border-gray-800"
            }`}
          >
            {message.type === "quote" && message.metadata && (
              <div className="mb-2 p-3 bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-gray-800">
                <div className="text-sm font-semibold text-black dark:text-white mb-1">Service Quote</div>
                <div className="text-lg font-bold text-black dark:text-white">
                  ${message.metadata.minPrice} - ${message.metadata.maxPrice}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">{message.metadata.service}</div>
              </div>
            )}

            {message.type === "location" && (
              <div className="mb-2 p-3 bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-gray-800">
                <div className="flex items-center space-x-2 text-black dark:text-white">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-semibold">Live Location</span>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">ETA: {provider.eta}</div>
              </div>
            )}

            <p className="text-sm leading-relaxed">{message.content}</p>

            <div
              className={`flex items-center justify-between mt-2 text-xs ${
                isUser ? "text-gray-300 dark:text-gray-700" : "text-gray-500 dark:text-gray-500"
              }`}
            >
              <span>{formatTime(message.timestamp)}</span>
              {isUser && (
                <div className="flex items-center space-x-1">
                  <CheckCheck className={`w-3 h-3 ${message.status === "read" ? "text-blue-400" : "text-gray-400"}`} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Card className="h-[600px] flex flex-col border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      {/* Chat Header */}
      <CardHeader className="border-b border-gray-200 dark:border-gray-800 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Avatar className="w-12 h-12 border-2 border-gray-200 dark:border-gray-800">
                <AvatarImage src={provider.image || "/placeholder.svg"} />
                <AvatarFallback className="bg-gray-100 dark:bg-gray-900 text-black dark:text-white font-bold">
                  {provider.name[0]}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-black"></div>
              {provider.verified && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-black dark:bg-white rounded-full flex items-center justify-center">
                  <Shield className="w-3 h-3 text-white dark:text-black" />
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-black dark:text-white">{provider.name}</h3>
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 text-black dark:text-white" />
                  <span className="text-sm font-semibold text-black dark:text-white">{provider.rating}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{provider.service}</p>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Online • ETA {provider.eta}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="ghost"
              className="w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900"
            >
              <Phone className="w-4 h-4 text-black dark:text-white" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900"
            >
              <Video className="w-4 h-4 text-black dark:text-white" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900"
            >
              <MoreVertical className="w-4 h-4 text-black dark:text-white" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {/* Messages */}
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
          {messages.map(renderMessage)}

          {isTyping && (
            <div className="flex justify-start mb-4">
              <div className="flex items-end space-x-2">
                <Avatar className="w-8 h-8 border border-gray-200 dark:border-gray-800">
                  <AvatarImage src={provider.image || "/placeholder.svg"} />
                  <AvatarFallback className="bg-gray-100 dark:bg-gray-900 text-black dark:text-white text-xs">
                    {provider.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl px-4 py-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </ScrollArea>
      </CardContent>

      {/* Message Input */}
      <div className="border-t border-gray-200 dark:border-gray-800 p-4">
        <div className="flex items-center space-x-3">
          <Button size="sm" variant="ghost" className="w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900">
            <Paperclip className="w-4 h-4 text-gray-400" />
          </Button>

          <div className="flex-1 relative">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="pr-20 border-2 border-gray-200 dark:border-gray-800 rounded-2xl bg-white dark:bg-black text-black dark:text-white focus:border-black dark:focus:border-white"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
              <Button
                size="sm"
                variant="ghost"
                className="w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900"
              >
                <ImageIcon className="w-3 h-3 text-gray-400" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900"
              >
                <Smile className="w-3 h-3 text-gray-400" />
              </Button>
            </div>
          </div>

          <Button
            size="sm"
            variant="ghost"
            className="w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900"
            onMouseDown={() => setIsRecording(true)}
            onMouseUp={() => setIsRecording(false)}
            onMouseLeave={() => setIsRecording(false)}
          >
            <Mic className={`w-4 h-4 ${isRecording ? "text-red-500" : "text-gray-400"}`} />
          </Button>

          <Button
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            className="w-10 h-10 rounded-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
