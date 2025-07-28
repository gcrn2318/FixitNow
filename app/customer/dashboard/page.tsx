"use client"

import { useState } from "react"
import Link from "next/link"
import { withAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Calendar,
  Star,
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  DollarSign,
  Heart,
  Filter,
  Plus,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  User,
  CreditCard,
  Bell,
  Settings,
  Activity,
  BookOpen,
  Wrench,
  Navigation,
} from "lucide-react"

interface Booking {
  id: string
  service: string
  provider: {
    name: string
    image: string
    rating: number
    phone: string
  }
  date: string
  time: string
  status: "upcoming" | "in-progress" | "completed" | "cancelled"
  price: number
  address: string
  description: string
}

interface Provider {
  id: string
  name: string
  image: string
  rating: number
  reviews: number
  services: string[]
  hourlyRate: number
  distance: string
  responseTime: string
  isFavorite: boolean
}

function CustomerDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedService, setSelectedService] = useState("")

  // Mock data
  const customerStats = {
    totalBookings: 24,
    activeBookings: 2,
    totalSpent: 2850,
    favoriteProviders: 8,
    savedMoney: 450,
    avgRating: 4.8,
  }

  const recentBookings: Booking[] = [
    {
      id: "BK001",
      service: "Plumbing Repair",
      provider: {
        name: "John Smith",
        image: "/placeholder.svg",
        rating: 4.9,
        phone: "+1 (555) 123-4567",
      },
      date: "2024-01-15",
      time: "2:00 PM",
      status: "upcoming",
      price: 125,
      address: "123 Main St, New York, NY",
      description: "Kitchen sink leak repair",
    },
    {
      id: "BK002",
      service: "House Cleaning",
      provider: {
        name: "Sarah Johnson",
        image: "/placeholder.svg",
        rating: 4.8,
        phone: "+1 (555) 987-6543",
      },
      date: "2024-01-12",
      time: "10:00 AM",
      status: "completed",
      price: 85,
      address: "123 Main St, New York, NY",
      description: "Deep cleaning service",
    },
  ]

  const favoriteProviders: Provider[] = [
    {
      id: "PR001",
      name: "John Smith",
      image: "/placeholder.svg",
      rating: 4.9,
      reviews: 156,
      services: ["Plumbing", "Electrical"],
      hourlyRate: 75,
      distance: "2.3 miles",
      responseTime: "< 5 min",
      isFavorite: true,
    },
    {
      id: "PR002",
      name: "Sarah Johnson",
      image: "/placeholder.svg",
      rating: 4.8,
      reviews: 203,
      services: ["Cleaning", "Organization"],
      hourlyRate: 45,
      distance: "1.8 miles",
      responseTime: "< 10 min",
      isFavorite: true,
    },
  ]

  const quickActions = [
    {
      title: "Book Service",
      description: "Find & book a service",
      icon: Plus,
      href: "/search",
      color: "from-blue-500 to-purple-500",
    },
    {
      title: "Track Service",
      description: "Live tracking",
      icon: Navigation,
      href: "/tracking",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Messages",
      description: "Chat with providers",
      icon: MessageCircle,
      href: "/messages",
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Favorites",
      description: "Saved providers",
      icon: Heart,
      href: "/favorites",
      color: "from-pink-500 to-rose-500",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "in-progress":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Clock className="w-4 h-4" />
      case "in-progress":
        return <Activity className="w-4 h-4" />
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      case "cancelled":
        return <AlertCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-950 dark:via-blue-950 dark:to-indigo-950">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-white/20 dark:border-gray-700/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-6">
              <Link href="/" className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg rotate-3 hover:rotate-0 transition-transform duration-300">
                    <Wrench className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    FixItNow
                  </span>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Customer Dashboard</div>
                </div>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </Button>
              <Link href="/profile">
                <Avatar className="w-10 h-10 ring-2 ring-blue-500/20">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold">
                    JD
                  </AvatarFallback>
                </Avatar>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-4xl font-black mb-2">
                <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Welcome back, John!
                </span>
                <span className="wave">👋</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                You have <span className="font-semibold text-blue-600">{customerStats.activeBookings} active bookings</span> and{" "}
                <span className="font-semibold text-green-600">{favoriteProviders.length} favorite providers</span>
              </p>
            </div>

            <Link href="/search">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-full px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Plus className="w-5 h-5 mr-2" />
                Book New Service
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {quickActions.map((action, index) => (
            <Link key={index} href={action.href}>
              <Card className="group relative overflow-hidden border-0 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] cursor-pointer">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />
                <CardContent className="p-6 text-center relative">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                  >
                    <action.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{action.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{action.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-6 mb-12">
          <Card className="border-0 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{customerStats.totalBookings}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Bookings</p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{customerStats.activeBookings}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">${customerStats.totalSpent}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Spent</p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{customerStats.favoriteProviders}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Favorites</p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{customerStats.avgRating}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg Rating</p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">${customerStats.savedMoney}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Saved</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="bookings" className="space-y-8">
          <TabsList className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-2 grid grid-cols-2 lg:grid-cols-4 gap-1">
            <TabsTrigger
              value="bookings"
              className="rounded-xl px-4 py-3 font-semibold data-[state=active]:bg-black dark:data-[state=active]:bg-white data-[state=active]:text-white dark:data-[state=active]:text-black"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Bookings
            </TabsTrigger>
            <TabsTrigger
              value="favorites"
              className="rounded-xl px-4 py-3 font-semibold data-[state=active]:bg-black dark:data-[state=active]:bg-white data-[state=active]:text-white dark:data-[state=active]:text-black"
            >
              <Heart className="w-4 h-4 mr-2" />
              Favorites
            </TabsTrigger>
            <TabsTrigger
              value="search"
              className="rounded-xl px-4 py-3 font-semibold data-[state=active]:bg-black dark:data-[state=active]:bg-white data-[state=active]:text-white dark:data-[state=active]:text-black"
            >
              <Search className="w-4 h-4 mr-2" />
              Find Services
            </TabsTrigger>
            <TabsTrigger
              value="account"
              className="rounded-xl px-4 py-3 font-semibold data-[state=active]:bg-black dark:data-[state=active]:bg-white data-[state=active]:text-white dark:data-[state=active]:text-black"
            >
              <User className="w-4 h-4 mr-2" />
              Account
            </TabsTrigger>
          </TabsList>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Bookings</h2>
              <Link href="/bookings">
                <Button variant="outline" className="rounded-full">
                  View All
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <Card key={booking.id} className="border-0 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-16 h-16 ring-2 ring-blue-500/20">
                          <AvatarImage src={booking.provider.image} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold">
                            {booking.provider.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{booking.service}</h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-2">{booking.provider.name}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {booking.date}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {booking.time}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {booking.address}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={`${getStatusColor(booking.status)} mb-2`}>
                          {getStatusIcon(booking.status)}
                          <span className="ml-1 capitalize">{booking.status}</span>
                        </Badge>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">${booking.price}</div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-full">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Message Provider
                      </Button>
                      <Button variant="outline" className="flex-1 rounded-full">
                        <Phone className="w-4 h-4 mr-2" />
                        Call Provider
                      </Button>
                      {booking.status === "upcoming" && (
                        <Button variant="outline" className="flex-1 rounded-full">
                          <Navigation className="w-4 h-4 mr-2" />
                          Track Live
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Favorite Providers</h2>
              <Link href="/search">
                <Button variant="outline" className="rounded-full">
                  Find More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {favoriteProviders.map((provider) => (
                <Card key={provider.id} className="border-0 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-16 h-16 ring-2 ring-blue-500/20">
                          <AvatarImage src={provider.image} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold">
                            {provider.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{provider.name}</h3>
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-semibold text-gray-900 dark:text-white ml-1">{provider.rating}</span>
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">({provider.reviews} reviews)</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {provider.services.map((service, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {service}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-pink-500 hover:text-pink-600">
                        <Heart className="w-5 h-5 fill-current" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                      <div className="text-center">
                        <div className="font-semibold text-gray-900 dark:text-white">${provider.hourlyRate}/hr</div>
                        <div className="text-gray-500 dark:text-gray-400">Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-gray-900 dark:text-white">{provider.distance}</div>
                        <div className="text-gray-500 dark:text-gray-400">Distance</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-gray-900 dark:text-white">{provider.responseTime}</div>
                        <div className="text-gray-500 dark:text-gray-400">Response</div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-full">
                        Book Now
                      </Button>
                      <Button variant="outline" className="flex-1 rounded-full">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Message
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Search Tab */}
          <TabsContent value="search" className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Find Services</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">Search for the perfect service provider for your needs</p>

              <div className="max-w-2xl mx-auto space-y-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="What service do you need?"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 pr-4 py-3 text-lg rounded-full border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {["Plumbing", "Electrical", "Cleaning", "HVAC", "Painting", "Carpentry", "Landscaping", "Appliance Repair"].map((service) => (
                    <Button
                      key={service}
                      variant="outline"
                      className="rounded-full py-3 hover:bg-blue-50 hover:border-blue-300 dark:hover:bg-blue-950"
                      onClick={() => setSelectedService(service)}
                    >
                      {service}
                    </Button>
                  ))}
                </div>

                <Link href="/search">
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-full px-8 py-3 text-lg font-semibold">
                    <Search className="w-5 h-5 mr-2" />
                    Search Providers
                  </Button>
                </Link>
              </div>
            </div>
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-0 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Account Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Link href="/profile">
                    <Button variant="outline" className="w-full justify-start rounded-full">
                      <User className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  </Link>
                  <Link href="/settings">
                    <Button variant="outline" className="w-full justify-start rounded-full">
                      <Settings className="w-4 h-4 mr-2" />
                      Preferences
                    </Button>
                  </Link>
                  <Link href="/settings">
                    <Button variant="outline" className="w-full justify-start rounded-full">
                      <Bell className="w-4 h-4 mr-2" />
                      Notifications
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Payment & Billing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Link href="/settings">
                    <Button variant="outline" className="w-full justify-start rounded-full">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Payment Methods
                    </Button>
                  </Link>
                  <Link href="/bookings">
                    <Button variant="outline" className="w-full justify-start rounded-full">
                      <DollarSign className="w-4 h-4 mr-2" />
                      Billing History
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default withAuth(CustomerDashboard, ['customer'])
