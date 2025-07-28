"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Send,
  Phone,
  Video,
  MoreHorizontal,
  Paperclip,
  Smile,
  ImageIcon,
  Check,
  CheckCheck,
  Star,
  User,
  MessageSquare,
  Clock,
  MapPin,
  Wrench,
  Bell,
  Settings,
  Activity,
  ArrowLeft,
  Plus,
  Filter,
  Archive,
  Trash2,
  Edit,
  Calendar,
  DollarSign,
} from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  senderId: string
  senderName: string
  content: string
  timestamp: string
  type: "text" | "image" | "location" | "booking" | "payment"
  status: "sent" | "delivered" | "read"
  isOwn: boolean
  attachments?: string[]
  bookingId?: string
}

interface Conversation {
  id: string
  name: string
  avatar: string
  lastMessage: string
  timestamp: string
  unreadCount: number
  isOnline: boolean
  type: "provider" | "support" | "booking"
  rating?: number
  service?: string
  bookingId?: string
  phone?: string
  status?: "active" | "completed" | "cancelled"
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    name: "John Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "I'll be there in 15 minutes",
    timestamp: "2 min ago",
    unreadCount: 2,
    isOnline: true,
    type: "provider",
    rating: 4.9,
    service: "Plumbing Repair",
    bookingId: "BK001",
    phone: "(555) 123-4567",
    status: "active"
  },
  {
    id: "2", 
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "The electrical work is scheduled for tomorrow",
    timestamp: "1 hour ago",
    unreadCount: 0,
    isOnline: false,
    type: "provider",
    rating: 4.8,
    service: "Electrical Setup",
    bookingId: "BK002",
    phone: "(555) 234-5678",
    status: "active"
  },
  {
    id: "3",
    name: "FixItNow Support",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "How can we help you today?",
    timestamp: "3 hours ago",
    unreadCount: 1,
    isOnline: true,
    type: "support"
  },
  {
    id: "4",
    name: "Mike Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "HVAC maintenance completed successfully",
    timestamp: "1 day ago",
    unreadCount: 0,
    isOnline: false,
    type: "provider",
    rating: 4.7,
    service: "HVAC Maintenance",
    bookingId: "BK003",
    phone: "(555) 345-6789",
    status: "completed"
  }
]

const mockMessages: { [key: string]: Message[] } = {
  "1": [
    {
      id: "1",
      senderId: "provider1",
      senderName: "John Smith",
      content: "Hi! I'm on my way to your location for the plumbing repair.",
      timestamp: "10:30 AM",
      type: "text",
      status: "read",
      isOwn: false
    },
    {
      id: "2",
      senderId: "customer",
      senderName: "You",
      content: "Great! I'll be waiting. The kitchen sink is still leaking.",
      timestamp: "10:32 AM",
      type: "text",
      status: "read",
      isOwn: true
    },
    {
      id: "3",
      senderId: "provider1",
      senderName: "John Smith",
      content: "I'll be there in 15 minutes. I have all the necessary tools.",
      timestamp: "10:45 AM",
      type: "text",
      status: "delivered",
      isOwn: false
    }
  ],
  "2": [
    {
      id: "1",
      senderId: "provider2",
      senderName: "Sarah Johnson",
      content: "Hello! I've reviewed your electrical setup requirements.",
      timestamp: "9:00 AM",
      type: "text",
      status: "read",
      isOwn: false
    },
    {
      id: "2",
      senderId: "customer",
      senderName: "You",
      content: "Perfect! When can you start the installation?",
      timestamp: "9:15 AM",
      type: "text",
      status: "read",
      isOwn: true
    },
    {
      id: "3",
      senderId: "provider2",
      senderName: "Sarah Johnson",
      content: "The electrical work is scheduled for tomorrow at 10 AM. I'll bring all smart switches and outlets.",
      timestamp: "9:30 AM",
      type: "text",
      status: "read",
      isOwn: false
    }
  ],
  "3": [
    {
      id: "1",
      senderId: "support",
      senderName: "FixItNow Support",
      content: "Hello! Welcome to FixItNow support. How can we help you today?",
      timestamp: "8:00 AM",
      type: "text",
      status: "read",
      isOwn: false
    },
    {
      id: "2",
      senderId: "customer",
      senderName: "You",
      content: "I have a question about my recent booking payment.",
      timestamp: "8:05 AM",
      type: "text",
      status: "read",
      isOwn: true
    },
    {
      id: "3",
      senderId: "support",
      senderName: "FixItNow Support",
      content: "I'd be happy to help with your payment inquiry. Can you provide your booking ID?",
      timestamp: "8:07 AM",
      type: "text",
      status: "delivered",
      isOwn: false
    }
  ]
}

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>("1")
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [currentTime, setCurrentTime] = useState(new Date())
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [selectedConversation])

  const filteredConversations = mockConversations.filter(conv => {
    const matchesSearch = conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesTab = activeTab === "all" || 
                      (activeTab === "providers" && conv.type === "provider") ||
                      (activeTab === "support" && conv.type === "support") ||
                      (activeTab === "unread" && conv.unreadCount > 0)
    
    return matchesSearch && matchesTab
  })

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      // In a real app, this would send the message to the server
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const selectedConv = mockConversations.find(c => c.id === selectedConversation)
  const messages = selectedConversation ? mockMessages[selectedConversation] || [] : []

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sent":
        return <Check className="w-3 h-3 text-gray-400" />
      case "delivered":
        return <CheckCheck className="w-3 h-3 text-gray-400" />
      case "read":
        return <CheckCheck className="w-3 h-3 text-blue-500" />
      default:
        return null
    }
  }

  const getConversationTypeColor = (type: string) => {
    switch (type) {
      case "provider":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "support":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "booking":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-950 dark:via-blue-950 dark:to-indigo-950">
      {/* Header */}
      <header className="bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-6">
              <Link href="/dashboard" className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg rotate-3 hover:rotate-0 transition-transform duration-300">
                    <Wrench className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    FixItNow
                  </span>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Messages</div>
                </div>
              </Link>

              <div className="hidden md:flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-full p-1">
                <div className="px-4 py-2 bg-white dark:bg-gray-700 rounded-full text-sm font-medium shadow-sm">
                  Personal
                </div>
                <div className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer transition-colors">
                  Business
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
                <Clock className="w-4 h-4" />
                <span>{currentTime.toLocaleTimeString()}</span>
              </div>

              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              </Button>

              <Avatar className="ring-2 ring-blue-500/20 hover:ring-blue-500/40 transition-all duration-300">
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold">
                  JD
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <div className="lg:col-span-1">
            <Card className="border-0 bg-white dark:bg-gray-800 rounded-2xl shadow-lg h-full flex flex-col">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <CardTitle className="flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Messages
                  </CardTitle>
                  <Button variant="ghost" size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-10 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
                  />
                </div>

                {/* Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-4 bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
                    <TabsTrigger value="all" className="text-xs rounded-lg">All</TabsTrigger>
                    <TabsTrigger value="providers" className="text-xs rounded-lg">Providers</TabsTrigger>
                    <TabsTrigger value="support" className="text-xs rounded-lg">Support</TabsTrigger>
                    <TabsTrigger value="unread" className="text-xs rounded-lg">Unread</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>

              <CardContent className="flex-1 overflow-hidden p-0">
                <ScrollArea className="h-full">
                  <div className="space-y-2 p-4">
                    {filteredConversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        onClick={() => setSelectedConversation(conversation.id)}
                        className={`p-4 rounded-xl cursor-pointer transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                          selectedConversation === conversation.id
                            ? "bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800"
                            : "border-2 border-transparent"
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="relative">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={conversation.avatar} />
                              <AvatarFallback>{conversation.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            {conversation.isOnline && (
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                                {conversation.name}
                              </h3>
                              <div className="flex items-center space-x-2">
                                {conversation.unreadCount > 0 && (
                                  <Badge className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                                    {conversation.unreadCount}
                                  </Badge>
                                )}
                                <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                {conversation.lastMessage}
                              </p>
                            </div>

                            {conversation.service && (
                              <div className="flex items-center justify-between mt-2">
                                <Badge className={getConversationTypeColor(conversation.type)}>
                                  {conversation.service}
                                </Badge>
                                {conversation.rating && (
                                  <div className="flex items-center space-x-1">
                                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                    <span className="text-xs text-gray-500">{conversation.rating}</span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2">
            {selectedConv ? (
              <Card className="border-0 bg-white dark:bg-gray-800 rounded-2xl shadow-lg h-full flex flex-col">
                {/* Chat Header */}
                <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={selectedConv.avatar} />
                          <AvatarFallback>{selectedConv.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        {selectedConv.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">{selectedConv.name}</h3>
                        <div className="flex items-center space-x-2">
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {selectedConv.isOnline ? "Online" : "Offline"}
                          </p>
                          {selectedConv.service && (
                            <>
                              <span className="text-gray-400">•</span>
                              <span className="text-sm text-gray-600 dark:text-gray-400">{selectedConv.service}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {selectedConv.phone && (
                        <Button variant="ghost" size="sm">
                          <Phone className="w-4 h-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <Video className="w-4 h-4" />
                      </Button>
                      {selectedConv.bookingId && (
                        <Link href={`/tracking/${selectedConv.bookingId}`}>
                          <Button variant="ghost" size="sm">
                            <Calendar className="w-4 h-4" />
                          </Button>
                        </Link>
                      )}
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 overflow-hidden p-0">
                  <ScrollArea className="h-full">
                    <div className="p-4 space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
                        >
                          <div className={`max-w-xs lg:max-w-md ${message.isOwn ? "order-2" : "order-1"}`}>
                            <div
                              className={`px-4 py-2 rounded-2xl ${
                                message.isOwn
                                  ? "bg-blue-500 text-white rounded-br-md"
                                  : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-md"
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                            </div>
                            <div className={`flex items-center mt-1 space-x-1 ${message.isOwn ? "justify-end" : "justify-start"}`}>
                              <span className="text-xs text-gray-500">{message.timestamp}</span>
                              {message.isOwn && getStatusIcon(message.status)}
                            </div>
                          </div>
                          {!message.isOwn && (
                            <Avatar className="w-8 h-8 order-1 mr-2">
                              <AvatarImage src={selectedConv.avatar} />
                              <AvatarFallback className="text-xs">{selectedConv.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>
                </CardContent>

                {/* Message Input */}
                <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ImageIcon className="w-4 h-4" />
                    </Button>
                    <div className="flex-1 relative">
                      <Input
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="pr-12 rounded-full border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
                      />
                      <Button variant="ghost" size="sm" className="absolute right-2 top-1/2 transform -translate-y-1/2">
                        <Smile className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="border-0 bg-white dark:bg-gray-800 rounded-2xl shadow-lg h-full flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Select a conversation
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Choose a conversation from the list to start messaging
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
