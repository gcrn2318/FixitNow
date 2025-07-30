"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Search,
  MapPin,
  Star,
  Filter,
  SortDesc,
  Camera,
  Mic,
  Brain,
  Clock,
  Shield,
  Award,
  ChevronDown,
  X,
  Sparkles,
  Eye,
  Heart,
  MessageCircle,
  Phone,
  Wrench,
  Bell,
  Settings,
  Calendar,
  DollarSign,
  User,
  CheckCircle,
  ArrowRight,
  Zap,
  Home,
  Droplets,
  Hammer,
  Scissors,
  TreePine,
  Laptop,
  Car,
} from "lucide-react"
import Link from "next/link"

interface Provider {
  id: string
  name: string
  service: string
  rating: number
  reviews: number
  hourlyRate: number
  distance: number
  responseTime: string
  completedJobs: number
  image: string
  specialties: string[]
  availability: string
  verified: boolean
  premium: boolean
  description: string
  phone: string
  location: string
  yearsExperience: number
  badges: string[]
}

const mockProviders: Provider[] = [
  {
    id: "1",
    name: "John Smith",
    service: "Premium Plumbing",
    rating: 4.9,
    reviews: 156,
    hourlyRate: 85,
    distance: 2.3,
    responseTime: "< 5 min",
    completedJobs: 234,
    image: "/placeholder.svg?height=80&width=80",
    specialties: ["Emergency Repairs", "Pipe Installation", "Water Heaters"],
    availability: "Available Now",
    verified: true,
    premium: true,
    description: "Expert plumber with 15+ years experience. Specializing in emergency repairs and modern installations.",
    phone: "(555) 123-4567",
    location: "Downtown Area",
    yearsExperience: 15,
    badges: ["Top Rated", "Fast Response", "Licensed"]
  },
  {
    id: "2",
    name: "Sarah Johnson",
    service: "Smart Electrical",
    rating: 4.8,
    reviews: 89,
    hourlyRate: 95,
    distance: 1.8,
    responseTime: "< 3 min",
    completedJobs: 167,
    image: "/placeholder.svg?height=80&width=80",
    specialties: ["Smart Home", "Wiring", "Panel Upgrades"],
    availability: "Available Today",
    verified: true,
    premium: true,
    description: "Certified electrician specializing in smart home installations and electrical upgrades.",
    phone: "(555) 234-5678",
    location: "Midtown",
    yearsExperience: 12,
    badges: ["Smart Home Expert", "Licensed", "Insured"]
  },
  {
    id: "3",
    name: "Mike Wilson",
    service: "HVAC Solutions",
    rating: 4.7,
    reviews: 203,
    hourlyRate: 90,
    distance: 3.1,
    responseTime: "< 10 min",
    completedJobs: 298,
    image: "/placeholder.svg?height=80&width=80",
    specialties: ["AC Repair", "Heating", "Duct Cleaning"],
    availability: "Available Tomorrow",
    verified: true,
    premium: false,
    description: "HVAC specialist with expertise in residential and commercial systems.",
    phone: "(555) 345-6789",
    location: "Uptown",
    yearsExperience: 18,
    badges: ["HVAC Certified", "Energy Efficient"]
  },
  {
    id: "4",
    name: "Lisa Chen",
    service: "Home Cleaning",
    rating: 4.6,
    reviews: 124,
    hourlyRate: 55,
    distance: 1.2,
    responseTime: "< 15 min",
    completedJobs: 189,
    image: "/placeholder.svg?height=80&width=80",
    specialties: ["Deep Cleaning", "Move-in/out", "Regular Maintenance"],
    availability: "Available Now",
    verified: true,
    premium: false,
    description: "Professional cleaning service with eco-friendly products and attention to detail.",
    phone: "(555) 456-7890",
    location: "Westside",
    yearsExperience: 8,
    badges: ["Eco-Friendly", "Bonded", "Insured"]
  },
  {
    id: "5",
    name: "David Rodriguez",
    service: "Carpentry & Handyman",
    rating: 4.8,
    reviews: 167,
    hourlyRate: 75,
    distance: 2.7,
    responseTime: "< 8 min",
    completedJobs: 245,
    image: "/placeholder.svg?height=80&width=80",
    specialties: ["Custom Furniture", "Home Repairs", "Installations"],
    availability: "Available Today",
    verified: true,
    premium: true,
    description: "Skilled carpenter and handyman for all your home improvement needs.",
    phone: "(555) 567-8901",
    location: "Eastside",
    yearsExperience: 20,
    badges: ["Master Craftsman", "Licensed", "Custom Work"]
  }
]

const serviceCategories = [
  { id: "plumbing", name: "Plumbing", icon: Droplets, count: 45 },
  { id: "electrical", name: "Electrical", icon: Zap, count: 38 },
  { id: "hvac", name: "HVAC", icon: Home, count: 29 },
  { id: "carpentry", name: "Carpentry", icon: Hammer, count: 34 },
  { id: "cleaning", name: "Cleaning", icon: Scissors, count: 52 },
  { id: "landscaping", name: "Landscaping", icon: TreePine, count: 27 },
  { id: "tech", name: "Tech Support", icon: Laptop, count: 19 },
  { id: "auto", name: "Auto Services", icon: Car, count: 23 }
]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 200])
  const [sortBy, setSortBy] = useState("rating")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [favorites, setFavorites] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("providers")

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const filteredProviders = mockProviders.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         provider.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         provider.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = selectedCategory === "all" || 
                           provider.service.toLowerCase().includes(selectedCategory)
    
    const matchesPrice = provider.hourlyRate >= priceRange[0] && provider.hourlyRate <= priceRange[1]
    
    return matchesSearch && matchesCategory && matchesPrice
  })

  const sortedProviders = [...filteredProviders].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating
      case "price":
        return a.hourlyRate - b.hourlyRate
      case "distance":
        return a.distance - b.distance
      case "response":
        return parseInt(a.responseTime.replace(/\D/g, "")) - parseInt(b.responseTime.replace(/\D/g, ""))
      default:
        return 0
    }
  })

  const toggleFavorite = (providerId: string) => {
    setFavorites(prev => 
      prev.includes(providerId) 
        ? prev.filter(id => id !== providerId)
        : [...prev, providerId]
    )
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
                  <div className="text-xs text-gray-500 dark:text-gray-400">Search</div>
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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black mb-4">
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Find the Perfect Service Provider
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            AI-powered matching connects you with verified professionals in your area
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-4 w-6 h-6 text-gray-400" />
            <Input
              type="text"
              placeholder="What service do you need? (e.g., plumbing, electrical, cleaning...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-14 pr-4 py-4 text-lg rounded-2xl border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-900 shadow-lg"
            />
            <Button className="absolute right-2 top-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-6">
              <Brain className="w-4 h-4 mr-2" />
              AI Search
            </Button>
          </div>
        </div>

        {/* Service Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {serviceCategories.map((category) => (
              <Card
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 border-2 ${
                  selectedCategory === category.id
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500"
                } rounded-2xl`}
              >
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">{category.name}</h3>
                  <p className="text-xs text-gray-500">{category.count} providers</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="rounded-full border-2 border-gray-200 dark:border-gray-700"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {showFilters && <X className="w-4 h-4 ml-2" />}
            </Button>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48 rounded-full border-2 border-gray-200 dark:border-gray-700">
                <SortDesc className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price">Lowest Price</SelectItem>
                <SelectItem value="distance">Nearest</SelectItem>
                <SelectItem value="response">Fastest Response</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
            <Sparkles className="w-4 h-4 mr-2" />
            {sortedProviders.length} providers found
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <Card className="border-0 bg-white dark:bg-gray-800 rounded-2xl shadow-lg mb-8">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">
                    Price Range (per hour)
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={200}
                    min={0}
                    step={5}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">
                    Availability
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="available-now" />
                      <label htmlFor="available-now" className="text-sm">Available Now</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="available-today" />
                      <label htmlFor="available-today" className="text-sm">Available Today</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="available-week" />
                      <label htmlFor="available-week" className="text-sm">This Week</label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">
                    Provider Features
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="verified" />
                      <label htmlFor="verified" className="text-sm">Verified Only</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="premium" />
                      <label htmlFor="premium" className="text-sm">Premium Providers</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="fast-response" />
                      <label htmlFor="fast-response" className="text-sm">Fast Response</label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        <div className="grid lg:grid-cols-1 gap-6">
          {sortedProviders.map((provider) => (
            <Card key={provider.id} className="border-0 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start space-x-6">
                    <div className="relative">
                      <Avatar className="w-20 h-20">
                        <AvatarImage src={provider.image} />
                        <AvatarFallback className="text-lg font-bold">{provider.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      {provider.verified && (
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{provider.name}</h3>
                        {provider.premium && (
                          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                            <Award className="w-3 h-3 mr-1" />
                            Premium
                          </Badge>
                        )}
                      </div>

                      <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold mb-2">{provider.service}</p>
                      
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-semibold">{provider.rating}</span>
                          <span className="text-gray-500">({provider.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                          <MapPin className="w-4 h-4" />
                          <span>{provider.distance} mi away</span>
                        </div>
                        <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                          <Clock className="w-4 h-4" />
                          <span>Responds {provider.responseTime}</span>
                        </div>
                      </div>

                      <p className="text-gray-700 dark:text-gray-300 mb-4">{provider.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {provider.specialties.map((specialty, idx) => (
                          <Badge key={idx} variant="secondary" className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                            {specialty}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {provider.badges.map((badge, idx) => (
                          <Badge key={idx} className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-3xl font-black text-gray-900 dark:text-white mb-1">
                      ${provider.hourlyRate}
                      <span className="text-lg font-normal text-gray-500">/hr</span>
                    </div>
                    <div className="text-sm text-gray-500 mb-2">{provider.availability}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {provider.completedJobs} jobs completed
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6">
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Now
                    </Button>
                    <Button variant="outline" className="rounded-full">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                    <Button variant="outline" className="rounded-full">
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </Button>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFavorite(provider.id)}
                      className={favorites.includes(provider.id) ? "text-red-500" : "text-gray-400"}
                    >
                      <Heart className={`w-4 h-4 ${favorites.includes(provider.id) ? "fill-current" : ""}`} />
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View Profile
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>{provider.name} - Full Profile</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="flex items-center space-x-4">
                            <Avatar className="w-16 h-16">
                              <AvatarImage src={provider.image} />
                              <AvatarFallback>{provider.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="text-xl font-bold">{provider.name}</h3>
                              <p className="text-blue-600">{provider.service}</p>
                              <p className="text-gray-600">{provider.yearsExperience} years experience</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold mb-2">Contact Info</h4>
                              <p className="text-sm text-gray-600">Phone: {provider.phone}</p>
                              <p className="text-sm text-gray-600">Location: {provider.location}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Stats</h4>
                              <p className="text-sm text-gray-600">Rating: {provider.rating}/5</p>
                              <p className="text-sm text-gray-600">Jobs: {provider.completedJobs}</p>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2">Specialties</h4>
                            <div className="flex flex-wrap gap-2">
                              {provider.specialties.map((specialty, idx) => (
                                <Badge key={idx} variant="secondary">{specialty}</Badge>
                              ))}
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            <Button className="flex-1">Book Service</Button>
                            <Button variant="outline">Message</Button>
                            <Button variant="outline">Call</Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedProviders.length === 0 && (
          <Card className="border-0 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
            <CardContent className="p-12 text-center">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No providers found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Try adjusting your search criteria or browse our service categories
              </p>
              <Button onClick={() => {
                setSearchQuery("")
                setSelectedCategory("all")
                setPriceRange([0, 200])
              }}>
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
