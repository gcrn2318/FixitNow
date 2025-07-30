'use client'

import React, { useEffect, useState } from 'react'
import { useAppData } from '@/contexts/AppDataContext'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { 
  Search, 
  MapPin, 
  Star, 
  Clock, 
  DollarSign, 
  Phone, 
  MessageCircle,
  Heart,
  Filter,
  Loader2,
  CheckCircle,
  Award,
  Zap
} from 'lucide-react'
import { toast } from 'sonner'

interface SearchFilters {
  service: string
  location: string
  radius: number
  minRating: number
  maxPrice: number
  sortBy: string
  search: string
}

export function DynamicProviderSearch() {
  const { user } = useAuth()
  const { state, searchProviders, fetchServices } = useAppData()
  const [filters, setFilters] = useState<SearchFilters>({
    service: '',
    location: '',
    radius: 25,
    minRating: 0,
    maxPrice: 200,
    sortBy: 'rating',
    search: ''
  })
  const [showFilters, setShowFilters] = useState(false)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  useEffect(() => {
    fetchServices()
    handleSearch()
  }, [])

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      handleSearch()
    }, 500)

    return () => clearTimeout(debounceTimer)
  }, [filters])

  const handleSearch = async () => {
    const searchParams = {
      service: filters.service || undefined,
      radius: filters.radius,
      minRating: filters.minRating,
      maxPrice: filters.maxPrice,
      sortBy: filters.sortBy,
      search: filters.search || undefined,
      page: 1,
      limit: 20
    }

    await searchProviders(searchParams)
  }

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const toggleFavorite = (providerId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(providerId)) {
        newFavorites.delete(providerId)
        toast.success('Removed from favorites')
      } else {
        newFavorites.add(providerId)
        toast.success('Added to favorites')
      }
      return newFavorites
    })
  }

  const handleBookProvider = (providerId: string) => {
    // Navigate to booking page with provider pre-selected
    toast.success('Redirecting to booking page...')
  }

  const handleContactProvider = (providerId: string, method: 'call' | 'message') => {
    if (method === 'call') {
      toast.success('Initiating call...')
    } else {
      toast.success('Opening message...')
    }
  }

  const getProviderBadges = (provider: any) => {
    const badges = []
    
    if (provider.isVerified) {
      badges.push({ label: 'Verified', color: 'bg-blue-100 text-blue-800', icon: CheckCircle })
    }
    
    if (provider.rating >= 4.8) {
      badges.push({ label: 'Top Rated', color: 'bg-yellow-100 text-yellow-800', icon: Award })
    }
    
    if (provider.responseTime && provider.responseTime.includes('< 5')) {
      badges.push({ label: 'Quick Response', color: 'bg-green-100 text-green-800', icon: Zap })
    }
    
    return badges
  }

  if (state.loading.providers) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Searching providers...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search providers, services, or locations..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Search Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Service</label>
                  <Select value={filters.service} onValueChange={(value) => handleFilterChange('service', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Services" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Services</SelectItem>
                      {state.services.map((service) => (
                        <SelectItem key={service._id} value={service.name}>
                          {service.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Sort By</label>
                  <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange('sortBy', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="price">Lowest Price</SelectItem>
                      <SelectItem value="distance">Nearest</SelectItem>
                      <SelectItem value="reviews">Most Reviews</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Radius: {filters.radius} miles
                  </label>
                  <Slider
                    value={[filters.radius]}
                    onValueChange={(value) => handleFilterChange('radius', value[0])}
                    max={50}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Min Rating: {filters.minRating}+
                  </label>
                  <Slider
                    value={[filters.minRating]}
                    onValueChange={(value) => handleFilterChange('minRating', value[0])}
                    max={5}
                    min={0}
                    step={0.1}
                    className="w-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {state.providers.length} Providers Found
          </h2>
          <p className="text-sm text-muted-foreground">
            Showing results within {filters.radius} miles
          </p>
        </div>

        {state.errors.providers && (
          <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
            <CardContent className="pt-6">
              <p className="text-red-600 dark:text-red-400">{state.errors.providers}</p>
            </CardContent>
          </Card>
        )}

        {state.providers.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No providers found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or expanding your search radius
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {state.providers.map((provider) => (
              <Card key={provider.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={provider.avatar} />
                        <AvatarFallback>
                          {provider.firstName?.[0]}{provider.lastName?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <CardTitle className="text-lg">
                          {provider.firstName} {provider.lastName}
                        </CardTitle>
                        <CardDescription>{provider.businessName}</CardDescription>
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFavorite(provider.id)}
                      className={favorites.has(provider.id) ? 'text-red-500' : ''}
                    >
                      <Heart className={`h-4 w-4 ${favorites.has(provider.id) ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Rating and Reviews */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{provider.rating || 'N/A'}</span>
                      <span className="text-sm text-muted-foreground">
                        ({provider.totalReviews || 0} reviews)
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>2.3 miles</span>
                    </div>
                  </div>

                  {/* Services */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Services:</p>
                    <div className="flex flex-wrap gap-1">
                      {provider.services?.slice(0, 3).map((service, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                      {provider.services && provider.services.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{provider.services.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Provider Badges */}
                  <div className="flex flex-wrap gap-1">
                    {getProviderBadges(provider).map((badge, index) => (
                      <Badge key={index} className={`text-xs ${badge.color}`}>
                        <badge.icon className="h-3 w-3 mr-1" />
                        {badge.label}
                      </Badge>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span>Response: &lt; 15 min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3 text-muted-foreground" />
                      <span>From $75/hr</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button 
                      className="flex-1"
                      onClick={() => handleBookProvider(provider.id)}
                    >
                      Book Now
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleContactProvider(provider.id, 'message')}
                    >
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleContactProvider(provider.id, 'call')}
                    >
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default DynamicProviderSearch