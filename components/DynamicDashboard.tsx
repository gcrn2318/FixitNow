'use client'

import React, { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useAppData } from '@/contexts/AppDataContext'
import { useSocket } from '@/contexts/SocketContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Calendar, 
  Clock, 
  DollarSign, 
  MapPin, 
  MessageCircle, 
  Star, 
  TrendingUp, 
  Users,
  CheckCircle,
  AlertCircle,
  XCircle,
  Loader2
} from 'lucide-react'
import { format } from 'date-fns'

interface DashboardStats {
  totalBookings: number
  activeBookings: number
  completedBookings: number
  totalEarnings: number
  averageRating: number
  totalReviews: number
  responseTime: string
  completionRate: number
}

export function DynamicDashboard() {
  const { user } = useAuth()
  const { state, fetchBookings, fetchReviews, searchProviders } = useAppData()
  const { isConnected } = useSocket()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [selectedTab, setSelectedTab] = useState('overview')

  useEffect(() => {
    if (user) {
      // Fetch initial data based on user type
      fetchBookings()
      
      if (user.type === 'provider') {
        fetchReviews({ providerId: user.id })
      }
      
      if (user.type === 'customer') {
        searchProviders({ limit: 5 })
      }
    }
  }, [user])

  useEffect(() => {
    // Calculate stats from bookings data
    if (state.bookings.length > 0) {
      const totalBookings = state.bookings.length
      const activeBookings = state.bookings.filter(b => 
        ['pending', 'confirmed', 'in-progress'].includes(b.status)
      ).length
      const completedBookings = state.bookings.filter(b => b.status === 'completed').length
      const totalEarnings = state.bookings
        .filter(b => b.status === 'completed' && b.finalPrice)
        .reduce((sum, b) => sum + (b.finalPrice || 0), 0)
      
      const avgRating = user?.rating || 0
      const totalReviews = user?.totalReviews || 0
      const completionRate = totalBookings > 0 ? (completedBookings / totalBookings) * 100 : 0

      setStats({
        totalBookings,
        activeBookings,
        completedBookings,
        totalEarnings,
        averageRating: avgRating,
        totalReviews,
        responseTime: '< 2 hours',
        completionRate
      })
    }
  }, [state.bookings, user])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'in-progress':
        return <Clock className="h-4 w-4 text-blue-500" />
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'in-progress':
        return 'bg-blue-100 text-blue-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (state.loading.bookings && !stats) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading dashboard...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-muted-foreground">
            {user?.type === 'customer' && 'Manage your service requests and bookings'}
            {user?.type === 'provider' && 'Track your jobs and grow your business'}
            {user?.type === 'admin' && 'Monitor platform performance and users'}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant={isConnected ? 'default' : 'destructive'}>
            {isConnected ? 'Connected' : 'Disconnected'}
          </Badge>
          <Avatar>
            <AvatarImage src={user?.avatar} />
            <AvatarFallback>
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBookings}</div>
              <p className="text-xs text-muted-foreground">
                {stats.activeBookings} active
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {user?.type === 'provider' ? 'Earnings' : 'Spent'}
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${stats.totalEarnings.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageRating.toFixed(1)}</div>
              <p className="text-xs text-muted-foreground">
                {stats.totalReviews} reviews
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completionRate.toFixed(0)}%</div>
              <Progress value={stats.completionRate} className="mt-2" />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="bookings">Recent Bookings</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Recent Bookings */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>Your latest service requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {state.bookings.slice(0, 5).map((booking) => (
                    <div key={booking._id} className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {getStatusIcon(booking.status)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {booking.service}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(booking.scheduledDate), 'MMM dd, yyyy')}
                        </p>
                      </div>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                    </div>
                  ))}
                  {state.bookings.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No bookings yet
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {user?.type === 'customer' && (
                  <>
                    <Button className="w-full justify-start" variant="outline">
                      <Calendar className="mr-2 h-4 w-4" />
                      Book a Service
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Message Provider
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <MapPin className="mr-2 h-4 w-4" />
                      Track Service
                    </Button>
                  </>
                )}
                {user?.type === 'provider' && (
                  <>
                    <Button className="w-full justify-start" variant="outline">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Update Job Status
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Message Customer
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Star className="mr-2 h-4 w-4" />
                      View Reviews
                    </Button>
                  </>
                )}
                {user?.type === 'admin' && (
                  <>
                    <Button className="w-full justify-start" variant="outline">
                      <Users className="mr-2 h-4 w-4" />
                      Manage Users
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      View Analytics
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Bookings</CardTitle>
              <CardDescription>Complete list of your bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {state.bookings.map((booking) => (
                  <div key={booking._id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{booking.service}</h3>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {booking.description}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4" />
                        {format(new Date(booking.scheduledDate), 'MMM dd, yyyy')} at {booking.scheduledTime}
                      </span>
                      <span className="flex items-center">
                        <DollarSign className="mr-1 h-4 w-4" />
                        ${booking.estimatedPrice}
                      </span>
                    </div>
                    <div className="flex items-center mt-2 text-sm text-muted-foreground">
                      <MapPin className="mr-1 h-4 w-4" />
                      {booking.address}
                    </div>
                  </div>
                ))}
                {state.bookings.length === 0 && (
                  <p className="text-center py-8 text-muted-foreground">
                    No bookings found
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest actions and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Activity feed would go here */}
                <p className="text-center py-8 text-muted-foreground">
                  Activity feed coming soon...
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default DynamicDashboard