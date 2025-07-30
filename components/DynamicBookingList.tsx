'use client'

import React, { useEffect, useState } from 'react'
import { useAppData } from '@/contexts/AppDataContext'
import { useSocket } from '@/contexts/SocketContext'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Calendar, 
  Clock, 
  DollarSign, 
  MapPin, 
  MessageCircle, 
  Star, 
  Phone,
  CheckCircle,
  AlertCircle,
  XCircle,
  Loader2,
  Search,
  Filter
} from 'lucide-react'
import { format } from 'date-fns'
import { toast } from 'sonner'

export function DynamicBookingList() {
  const { user } = useAuth()
  const { state, fetchBookings, updateBooking } = useAppData()
  const { updateBookingStatus } = useSocket()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isUpdating, setIsUpdating] = useState<string | null>(null)

  useEffect(() => {
    fetchBookings()
  }, [])

  const filteredBookings = state.bookings.filter(booking => {
    const matchesSearch = 
      booking.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.address.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const handleStatusUpdate = async (bookingId: string, newStatus: string) => {
    setIsUpdating(bookingId)
    try {
      await updateBooking(bookingId, { status: newStatus })
      updateBookingStatus(bookingId, newStatus)
      toast.success(`Booking status updated to ${newStatus}`)
    } catch (error) {
      toast.error('Failed to update booking status')
    } finally {
      setIsUpdating(null)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'in-progress':
        return <Clock className="h-4 w-4 text-blue-500" />
      case 'confirmed':
        return <CheckCircle className="h-4 w-4 text-blue-500" />
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
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getAvailableActions = (booking: any) => {
    const actions = []
    
    if (user?.type === 'provider') {
      switch (booking.status) {
        case 'pending':
          actions.push(
            { label: 'Accept', status: 'confirmed', variant: 'default' },
            { label: 'Decline', status: 'cancelled', variant: 'destructive' }
          )
          break
        case 'confirmed':
          actions.push({ label: 'Start Job', status: 'in-progress', variant: 'default' })
          break
        case 'in-progress':
          actions.push({ label: 'Complete', status: 'completed', variant: 'default' })
          break
      }
    }
    
    if (user?.type === 'customer') {
      switch (booking.status) {
        case 'pending':
        case 'confirmed':
          actions.push({ label: 'Cancel', status: 'cancelled', variant: 'destructive' })
          break
      }
    }
    
    return actions
  }

  if (state.loading.bookings) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading bookings...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            {user?.type === 'customer' ? 'My Bookings' : 'Job Requests'}
          </h2>
          <p className="text-muted-foreground">
            {filteredBookings.length} {filteredBookings.length === 1 ? 'booking' : 'bookings'} found
          </p>
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
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
      </div>

      {/* Error State */}
      {state.errors.bookings && (
        <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
          <CardContent className="pt-6">
            <p className="text-red-600 dark:text-red-400">{state.errors.bookings}</p>
          </CardContent>
        </Card>
      )}

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">No bookings found</p>
            </CardContent>
          </Card>
        ) : (
          filteredBookings.map((booking) => (
            <Card key={booking._id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2">
                      {booking.service}
                      {getStatusIcon(booking.status)}
                    </CardTitle>
                    <CardDescription>{booking.description}</CardDescription>
                  </div>
                  <Badge className={getStatusColor(booking.status)}>
                    {booking.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Booking Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{format(new Date(booking.scheduledDate), 'MMM dd, yyyy')}</span>
                      <Clock className="h-4 w-4 text-muted-foreground ml-2" />
                      <span>{booking.scheduledTime}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate">{booking.address}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span>${booking.estimatedPrice}</span>
                      {booking.finalPrice && booking.finalPrice !== booking.estimatedPrice && (
                        <span className="text-muted-foreground">
                          (Final: ${booking.finalPrice})
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Customer/Provider Info */}
                  <div className="space-y-2">
                    {user?.type === 'provider' && booking.customer && (
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={booking.customer.avatar} />
                          <AvatarFallback>
                            {booking.customer.firstName?.[0]}{booking.customer.lastName?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">
                            {booking.customer.firstName} {booking.customer.lastName}
                          </p>
                          <p className="text-xs text-muted-foreground">Customer</p>
                        </div>
                      </div>
                    )}
                    
                    {user?.type === 'customer' && booking.provider && (
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={booking.provider.avatar} />
                          <AvatarFallback>
                            {booking.provider.firstName?.[0]}{booking.provider.lastName?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">
                            {booking.provider.firstName} {booking.provider.lastName}
                          </p>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-500 fill-current" />
                            <span className="text-xs">{booking.provider.rating || 'N/A'}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    
                    {((user?.type === 'customer' && booking.provider?.phone) || 
                      (user?.type === 'provider' && booking.customer?.phone)) && (
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    {getAvailableActions(booking).map((action, index) => (
                      <Button
                        key={index}
                        variant={action.variant as any}
                        size="sm"
                        disabled={isUpdating === booking._id}
                        onClick={() => handleStatusUpdate(booking._id, action.status)}
                      >
                        {isUpdating === booking._id ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : null}
                        {action.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

export default DynamicBookingList