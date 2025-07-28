"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Calendar,
  Clock,
  MapPin,
  Star,
  Phone,
  MessageCircle,
  DollarSign,
  Wrench,
  Bell,
  Settings,
  Search,
  TrendingUp,
  Award,
  Activity,
  BarChart3,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Navigation,
  FileText,
  Heart,
  Filter,
  SortDesc,
  MoreHorizontal,
  Eye,
  Download,
  Plus,
  Edit,
  Trash2,
  User,
  Home,
  XCircle,
  PlayCircle,
  PauseCircle,
  RefreshCw,
} from "lucide-react"
import Link from "next/link"

interface Booking {
  id: string
  service: string
  provider: {
    name: string
    rating: number
    image: string
    phone: string
    specialties: string[]
    responseTime: string
    completedJobs: number
  }
  customer: {
    name: string
    email: string
    phone: string
    address: string
  }
  status: "pending" | "confirmed" | "in-progress" | "completed" | "cancelled"
  progress: number
  scheduledTime: string
  date: string
  estimatedCompletion: string
  price: string
  priority: "High" | "Medium" | "Low"
  description: string
  images: string[]
  timeline: Array<{
    time: string
    status: string
    completed: boolean
    current?: boolean
  }>
  paymentStatus: "pending" | "paid" | "refunded"
  rating?: number
  notes?: string
  createdAt: string
}

const mockBookings: Booking[] = [
  {
    id: "BK001",
    service: "Premium Plumbing Repair",
    provider: {
      name: "John Smith",
      rating: 4.9,
      image: "/placeholder.svg?height=40&width=40",
      phone: "(555) 123-4567",
      specialties: ["Emergency Repairs", "Pipe Installation"],
      responseTime: "< 5 min",
      completedJobs: 156,
    },
    customer: {
      name: "John Doe",
      email: "john@example.com",
      phone: "(555) 987-6543",
      address: "123 Main St, Apt 4B"
    },
    status: "in-progress",
    progress: 65,
    scheduledTime: "2:00 PM - 4:00 PM",
    date: "2024-12-20",
    estimatedCompletion: "3:30 PM",
    price: "$150",
    priority: "High",
    description: "Kitchen sink leak and garbage disposal repair",
    images: ["/placeholder.svg?height=100&width=100"],
    timeline: [
      { time: "2:00 PM", status: "Arrived", completed: true },
      { time: "2:15 PM", status: "Diagnosis Complete", completed: true },
      { time: "2:30 PM", status: "Repair in Progress", completed: true, current: true },
      { time: "3:15 PM", status: "Testing", completed: false },
      { time: "3:30 PM", status: "Complete", completed: false },
    ],
    paymentStatus: "pending",
    createdAt: "2024-12-19"
  },
  {
    id: "BK002",
    service: "Smart Home Electrical Setup",
    provider: {
      name: "Sarah Johnson",
      rating: 4.8,
      image: "/placeholder.svg?height=40&width=40",
      phone: "(555) 234-5678",
      specialties: ["Smart Home", "Wiring"],
      responseTime: "< 3 min",
      completedJobs: 89,
    },
    customer: {
      name: "John Doe",
      email: "john@example.com", 
      phone: "(555) 987-6543",
      address: "456 Oak Ave"
    },
    status: "confirmed",
    progress: 0,
    scheduledTime: "10:00 AM - 12:00 PM",
    date: "2024-12-21",
    estimatedCompletion: "11:30 AM",
    price: "$280",
    priority: "Medium",
    description: "Install smart switches and outlets throughout home",
    images: [],
    timeline: [],
    paymentStatus: "pending",
    createdAt: "2024-12-18"
  },
  {
    id: "BK003",
    service: "HVAC System Maintenance",
    provider: {
      name: "Mike Wilson",
      rating: 4.7,
      image: "/placeholder.svg?height=40&width=40",
      phone: "(555) 345-6789",
      specialties: ["HVAC", "Maintenance"],
      responseTime: "< 10 min",
      completedJobs: 234,
    },
    customer: {
      name: "John Doe",
      email: "john@example.com",
      phone: "(555) 987-6543", 
      address: "789 Pine St"
    },
    status: "completed",
    progress: 100,
    scheduledTime: "9:00 AM - 11:00 AM",
    date: "2024-12-15",
    estimatedCompletion: "10:30 AM",
    price: "$120",
    priority: "Low",
    description: "Annual HVAC system inspection and cleaning",
    images: ["/placeholder.svg?height=100&width=100", "/placeholder.svg?height=100&width=100"],
    timeline: [
      { time: "9:00 AM", status: "Arrived", completed: true },
      { time: "9:15 AM", status: "Inspection Started", completed: true },
      { time: "9:45 AM", status: "Cleaning in Progress", completed: true },
      { time: "10:15 AM", status: "Final Testing", completed: true },
      { time: "10:30 AM", status: "Complete", completed: true },
    ],
    paymentStatus: "paid",
    rating: 5,
    createdAt: "2024-12-10"
  },
  {
    id: "BK004",
    service: "Appliance Repair",
    provider: {
      name: "Lisa Chen",
      rating: 4.6,
      image: "/placeholder.svg?height=40&width=40",
      phone: "(555) 456-7890",
      specialties: ["Appliances", "Diagnostics"],
      responseTime: "< 15 min",
      completedJobs: 67,
    },
    customer: {
      name: "John Doe",
      email: "john@example.com",
      phone: "(555) 987-6543",
      address: "321 Elm St"
    },
    status: "cancelled",
    progress: 0,
    scheduledTime: "3:00 PM - 5:00 PM",
    date: "2024-12-18",
    estimatedCompletion: "4:30 PM",
    price: "$95",
    priority: "Medium",
    description: "Washing machine not draining properly",
    images: [],
    timeline: [],
    paymentStatus: "refunded",
    createdAt: "2024-12-17"
  }
]

export default function BookingsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])
  const [newBooking, setNewBooking] = useState({
    service: "",
    date: "",
    time: "",
    address: "",
    description: "",
    priority: "Medium"
  })

  const filteredBookings = mockBookings.filter(booking => {
    const matchesSearch = booking.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter
    const matchesTab = activeTab === "all" || booking.status === activeTab
    
    return matchesSearch && matchesStatus && matchesTab
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "in-progress":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "pending":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "Low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle2 className="w-4 h-4" />
      case "in-progress":
        return <PlayCircle className="w-4 h-4" />
      case "completed":
        return <CheckCircle2 className="w-4 h-4" />
      case "cancelled":
        return <XCircle className="w-4 h-4" />
      case "pending":
        return <Clock className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const handleNewBooking = () => {
    console.log("New booking:", newBooking)
    setIsCreateDialogOpen(false)
    // Reset form
    setNewBooking({
      service: "",
      date: "",
      time: "",
      address: "",
      description: "",
      priority: "Medium"
    })
  }

  const bookingStats = {
    total: mockBookings.length,
    pending: mockBookings.filter(b => b.status === "pending").length,
    confirmed: mockBookings.filter(b => b.status === "confirmed").length,
    inProgress: mockBookings.filter(b => b.status === "in-progress").length,
    completed: mockBookings.filter(b => b.status === "completed").length,
    cancelled: mockBookings.filter(b => b.status === "cancelled").length,
    totalValue: mockBookings.reduce((sum, b) => sum + parseInt(b.price.replace('$', '')), 0)
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
                  <div className="text-xs text-gray-500 dark:text-gray-400">Bookings</div>
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
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-8">
          <div>
            <h1 className="text-4xl font-black mb-2">
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                My Bookings
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Track and manage all your service appointments
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full px-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <Plus className="w-4 h-4 mr-2" />
                  New Booking
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Create New Booking</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Service Type</label>
                    <Select value={newBooking.service} onValueChange={(value) => setNewBooking({...newBooking, service: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="plumbing">🔧 Plumbing</SelectItem>
                        <SelectItem value="electrical">⚡ Electrical</SelectItem>
                        <SelectItem value="hvac">❄️ HVAC</SelectItem>
                        <SelectItem value="carpentry">🔨 Carpentry</SelectItem>
                        <SelectItem value="cleaning">🧽 Cleaning</SelectItem>
                        <SelectItem value="appliance">🔧 Appliance Repair</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Date</label>
                      <Input 
                        type="date" 
                        value={newBooking.date}
                        onChange={(e) => setNewBooking({...newBooking, date: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Time</label>
                      <Input 
                        type="time" 
                        value={newBooking.time}
                        onChange={(e) => setNewBooking({...newBooking, time: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Address</label>
                    <Input 
                      placeholder="Enter service address"
                      value={newBooking.address}
                      onChange={(e) => setNewBooking({...newBooking, address: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Priority</label>
                    <Select value={newBooking.priority} onValueChange={(value) => setNewBooking({...newBooking, priority: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="High">High Priority</SelectItem>
                        <SelectItem value="Medium">Medium Priority</SelectItem>
                        <SelectItem value="Low">Low Priority</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Description</label>
                    <Textarea 
                      placeholder="Describe the service needed..."
                      value={newBooking.description}
                      onChange={(e) => setNewBooking({...newBooking, description: e.target.value})}
                      rows={3}
                    />
                  </div>

                  <Button onClick={handleNewBooking} className="w-full">
                    Create Booking
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button variant="outline" className="rounded-full">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: "Total Bookings",
              value: bookingStats.total.toString(),
              icon: FileText,
              color: "from-blue-500 to-cyan-500",
              change: "+2 this week"
            },
            {
              title: "Active Services",
              value: (bookingStats.confirmed + bookingStats.inProgress).toString(),
              icon: Activity,
              color: "from-green-500 to-emerald-500",
              change: "2 in progress"
            },
            {
              title: "Completed",
              value: bookingStats.completed.toString(),
              icon: CheckCircle2,
              color: "from-purple-500 to-pink-500",
              change: "+1 this month"
            },
            {
              title: "Total Spent",
              value: `$${bookingStats.totalValue}`,
              icon: DollarSign,
              color: "from-yellow-500 to-orange-500",
              change: "+$150 this month"
            }
          ].map((stat, index) => (
            <Card key={index} className="border-0 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-sm text-green-600 dark:text-green-400">
                    <TrendingUp className="w-4 h-4 mr-1 inline" />
                    {stat.change}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.title}</p>
                  <p className="text-3xl font-black text-gray-900 dark:text-white">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48 h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="bg-white dark:bg-gray-800 rounded-2xl p-2 shadow-lg border-0">
            <TabsTrigger
              value="all"
              className="rounded-xl px-6 py-3 font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
            >
              All ({bookingStats.total})
            </TabsTrigger>
            <TabsTrigger
              value="in-progress"
              className="rounded-xl px-6 py-3 font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
            >
              Active ({bookingStats.inProgress})
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="rounded-xl px-6 py-3 font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
            >
              Completed ({bookingStats.completed})
            </TabsTrigger>
            <TabsTrigger
              value="cancelled"
              className="rounded-xl px-6 py-3 font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
            >
              Cancelled ({bookingStats.cancelled})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-6">
            <div className="grid gap-6">
              {filteredBookings.map((booking) => (
                <Card key={booking.id} className="border-0 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={booking.provider.image} />
                          <AvatarFallback>{booking.provider.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{booking.service}</h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-2">{booking.provider.name}</p>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">{booking.provider.rating}</span>
                            </div>
                            <Badge className={getPriorityColor(booking.priority)}>
                              {booking.priority} Priority
                            </Badge>
                            <Badge className={getStatusColor(booking.status)}>
                              {getStatusIcon(booking.status)}
                              <span className="ml-1 capitalize">{booking.status.replace('-', ' ')}</span>
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-black text-gray-900 dark:text-white mb-2">{booking.price}</div>
                        <div className="text-sm text-gray-500">Booking #{booking.id}</div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(booking.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>{booking.scheduledTime}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                        <MapPin className="w-4 h-4" />
                        <span>{booking.customer.address}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                        <User className="w-4 h-4" />
                        <span>{booking.provider.completedJobs} jobs</span>
                      </div>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 mb-6">{booking.description}</p>

                    {booking.status === "in-progress" && (
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
                          <span className="text-sm text-gray-500">{booking.progress}%</span>
                        </div>
                        <Progress value={booking.progress} className="h-2" />
                      </div>
                    )}

                    {booking.timeline.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Timeline</h4>
                        <div className="space-y-2">
                          {booking.timeline.map((item, idx) => (
                            <div key={idx} className={`flex items-center space-x-3 ${item.completed ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`}>
                              <div className={`w-2 h-2 rounded-full ${item.completed ? 'bg-green-500' : 'bg-gray-300'} ${item.current ? 'animate-pulse' : ''}`} />
                              <span className="text-sm">{item.time} - {item.status}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Message
                        </Button>
                        <Button variant="outline" size="sm">
                          <Phone className="w-4 h-4 mr-2" />
                          Call
                        </Button>
                        <Link href={`/tracking/${booking.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            Track
                          </Button>
                        </Link>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredBookings.length === 0 && (
              <Card className="border-0 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                <CardContent className="p-12 text-center">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No bookings found</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {searchTerm || statusFilter !== "all" 
                      ? "Try adjusting your search or filters" 
                      : "You haven't made any bookings yet"}
                  </p>
                  <Button onClick={() => setIsCreateDialogOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Booking
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
