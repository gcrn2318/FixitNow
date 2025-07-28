"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar as CalendarIcon,
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
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"

const upcomingBookings = [
  {
    id: "SCH001",
    service: "Premium Plumbing Repair",
    provider: {
      name: "John Smith",
      rating: 4.9,
      image: "/placeholder.svg?height=40&width=40",
      phone: "(555) 123-4567"
    },
    date: "2024-12-20",
    time: "2:00 PM - 4:00 PM",
    address: "123 Main St, Apt 4B",
    price: "$150",
    status: "Confirmed",
    priority: "High",
    description: "Kitchen sink leak and garbage disposal repair",
    estimatedDuration: "2 hours"
  },
  {
    id: "SCH002", 
    service: "Smart Home Electrical Setup",
    provider: {
      name: "Sarah Johnson",
      rating: 4.8,
      image: "/placeholder.svg?height=40&width=40",
      phone: "(555) 987-6543"
    },
    date: "2024-12-21",
    time: "10:00 AM - 12:00 PM",
    address: "456 Oak Ave",
    price: "$280",
    status: "Confirmed",
    priority: "Medium",
    description: "Install smart switches and outlets throughout home",
    estimatedDuration: "2 hours"
  },
  {
    id: "SCH003",
    service: "HVAC System Maintenance",
    provider: {
      name: "Mike Wilson",
      rating: 4.7,
      image: "/placeholder.svg?height=40&width=40",
      phone: "(555) 456-7890"
    },
    date: "2024-12-22",
    time: "9:00 AM - 11:00 AM",
    address: "789 Pine St",
    price: "$120",
    status: "Pending Confirmation",
    priority: "Low",
    description: "Annual HVAC system inspection and cleaning",
    estimatedDuration: "2 hours"
  }
]

const availableServices = [
  { id: 1, name: "Plumbing", icon: "🔧" },
  { id: 2, name: "Electrical", icon: "⚡" },
  { id: 3, name: "HVAC", icon: "❄️" },
  { id: 4, name: "Carpentry", icon: "🔨" },
  { id: 5, name: "Cleaning", icon: "🧽" },
  { id: 6, name: "Appliance Repair", icon: "🔧" },
]

const timeSlots = [
  "8:00 AM - 10:00 AM",
  "10:00 AM - 12:00 PM", 
  "12:00 PM - 2:00 PM",
  "2:00 PM - 4:00 PM",
  "4:00 PM - 6:00 PM",
  "6:00 PM - 8:00 PM"
]

export default function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [currentTime, setCurrentTime] = useState(new Date())
  const [activeTab, setActiveTab] = useState("calendar")
  const [isNewBookingOpen, setIsNewBookingOpen] = useState(false)
  const [selectedView, setSelectedView] = useState("month")
  const [newBooking, setNewBooking] = useState({
    service: "",
    date: "",
    time: "",
    address: "",
    description: "",
    priority: "Medium"
  })

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const handleNewBooking = () => {
    console.log("New booking:", newBooking)
    setIsNewBookingOpen(false)
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Pending Confirmation":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "Cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
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
                  <div className="text-xs text-gray-500 dark:text-gray-400">Schedule</div>
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
                Schedule & Calendar
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Manage your appointments and book new services
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <Dialog open={isNewBookingOpen} onOpenChange={setIsNewBookingOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full px-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <Plus className="w-4 h-4 mr-2" />
                  New Booking
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Schedule New Service</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Service Type</label>
                    <Select value={newBooking.service} onValueChange={(value) => setNewBooking({...newBooking, service: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableServices.map((service) => (
                          <SelectItem key={service.id} value={service.name}>
                            {service.icon} {service.name}
                          </SelectItem>
                        ))}
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
                      <label className="text-sm font-medium mb-2 block">Time Slot</label>
                      <Select value={newBooking.time} onValueChange={(value) => setNewBooking({...newBooking, time: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((slot) => (
                            <SelectItem key={slot} value={slot}>
                              {slot}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                    Schedule Service
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-full p-1 shadow-lg">
              <Button
                variant={selectedView === "month" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedView("month")}
                className="rounded-full"
              >
                Month
              </Button>
              <Button
                variant={selectedView === "week" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedView("week")}
                className="rounded-full"
              >
                Week
              </Button>
              <Button
                variant={selectedView === "day" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedView("day")}
                className="rounded-full"
              >
                Day
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: "Upcoming",
              value: "3",
              icon: CalendarIcon,
              color: "from-blue-500 to-cyan-500",
              description: "This week"
            },
            {
              title: "Confirmed",
              value: "2",
              icon: CheckCircle2,
              color: "from-green-500 to-emerald-500",
              description: "Ready to go"
            },
            {
              title: "Pending",
              value: "1",
              icon: Clock,
              color: "from-yellow-500 to-orange-500",
              description: "Awaiting confirmation"
            },
            {
              title: "This Month",
              value: "$550",
              icon: DollarSign,
              color: "from-purple-500 to-pink-500",
              description: "Total scheduled"
            }
          ].map((stat, index) => (
            <Card key={index} className="border-0 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.title}</p>
                  <p className="text-3xl font-black text-gray-900 dark:text-white mb-1">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="bg-white dark:bg-gray-800 rounded-2xl p-2 shadow-lg border-0">
            <TabsTrigger
              value="calendar"
              className="rounded-xl px-6 py-3 font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
            >
              <CalendarIcon className="w-4 h-4 mr-2" />
              Calendar View
            </TabsTrigger>
            <TabsTrigger
              value="list"
              className="rounded-xl px-6 py-3 font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
            >
              <FileText className="w-4 h-4 mr-2" />
              List View
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Calendar */}
              <div className="lg:col-span-1">
                <Card className="border-0 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CalendarIcon className="w-5 h-5 mr-2" />
                      Calendar
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border-0"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Upcoming Bookings */}
              <div className="lg:col-span-2">
                <Card className="border-0 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 mr-2" />
                        Upcoming Appointments
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {upcomingBookings.length} scheduled
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {upcomingBookings.map((booking) => (
                      <div key={booking.id} className="p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl hover:shadow-lg transition-all duration-300">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={booking.provider.image} />
                              <AvatarFallback>{booking.provider.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-bold text-lg text-gray-900 dark:text-white">{booking.service}</h3>
                              <p className="text-gray-600 dark:text-gray-400">{booking.provider.name}</p>
                              <div className="flex items-center space-x-1 mt-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                <span className="text-sm text-gray-600 dark:text-gray-400">{booking.provider.rating}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge className={getPriorityColor(booking.priority)}>
                              {booking.priority}
                            </Badge>
                            <div className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{booking.price}</div>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                            <CalendarIcon className="w-4 h-4" />
                            <span>{new Date(booking.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                            <Clock className="w-4 h-4" />
                            <span>{booking.time}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                            <MapPin className="w-4 h-4" />
                            <span>{booking.address}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                            <Activity className="w-4 h-4" />
                            <span>{booking.estimatedDuration}</span>
                          </div>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">{booking.description}</p>

                        <div className="flex items-center justify-between">
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status}
                          </Badge>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <MessageCircle className="w-4 h-4 mr-2" />
                              Message
                            </Button>
                            <Button variant="outline" size="sm">
                              <Phone className="w-4 h-4 mr-2" />
                              Call
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="list" className="space-y-6">
            <Card className="border-0 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    All Appointments
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <SortDesc className="w-4 h-4 mr-2" />
                      Sort
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={booking.provider.image} />
                          <AvatarFallback>{booking.provider.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{booking.service}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{booking.provider.name} • {new Date(booking.date).toLocaleDateString()} • {booking.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                        <div className="text-lg font-bold text-gray-900 dark:text-white">{booking.price}</div>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}