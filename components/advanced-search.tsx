"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
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
} from "lucide-react"

const mockProviders = [
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
    description:
      "Expert plumber with 15+ years experience. Specializing in emergency repairs and modern installations.",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    service: "Electrical Services",
    rating: 4.8,
    reviews: 89,
    hourlyRate: 75,
    distance: 3.1,
    responseTime: "< 10 min",
    completedJobs: 167,
    image: "/placeholder.svg?height=80&width=80",
    specialties: ["Smart Home", "Wiring", "Panel Upgrades"],
    availability: "Available Today",
    verified: true,
    premium: false,
    description: "Licensed electrician specializing in smart home installations and electrical upgrades.",
  },
  {
    id: "3",
    name: "Mike Wilson",
    service: "HVAC Expert",
    rating: 4.7,
    reviews: 203,
    hourlyRate: 90,
    distance: 4.2,
    responseTime: "< 15 min",
    completedJobs: 298,
    image: "/placeholder.svg?height=80&width=80",
    specialties: ["AC Repair", "Heating", "Duct Cleaning"],
    availability: "Available Tomorrow",
    verified: true,
    premium: true,
    description: "HVAC specialist with expertise in energy-efficient systems and emergency repairs.",
  },
]

const services = [
  "Plumbing",
  "Electrical",
  "HVAC",
  "Carpentry",
  "Appliance Repair",
  "Painting",
  "Cleaning",
  "Landscaping",
  "Roofing",
  "Security",
]

const sortOptions = [
  { value: "relevance", label: "Best Match" },
  { value: "rating", label: "Highest Rated" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "distance", label: "Nearest First" },
  { value: "availability", label: "Available Now" },
]

export function AdvancedSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [location, setLocation] = useState("")
  const [selectedService, setSelectedService] = useState("")
  const [priceRange, setPriceRange] = useState([0, 200])
  const [sortBy, setSortBy] = useState("relevance")
  const [showFilters, setShowFilters] = useState(false)
  const [isVoiceSearch, setIsVoiceSearch] = useState(false)
  const [isCameraSearch, setIsCameraSearch] = useState(false)
  const [filters, setFilters] = useState({
    verified: false,
    premium: false,
    availableNow: false,
    highRated: false,
  })

  const handleVoiceSearch = () => {
    setIsVoiceSearch(true)
    // Simulate voice recognition
    setTimeout(() => {
      setSearchQuery("Fix my kitchen sink leak")
      setIsVoiceSearch(false)
    }, 2000)
  }

  const handleCameraSearch = () => {
    setIsCameraSearch(true)
    // Simulate image recognition
    setTimeout(() => {
      setSearchQuery("Electrical outlet repair")
      setIsCameraSearch(false)
    }, 3000)
  }

  const filteredProviders = mockProviders.filter((provider) => {
    if (filters.verified && !provider.verified) return false
    if (filters.premium && !provider.premium) return false
    if (filters.availableNow && provider.availability !== "Available Now") return false
    if (filters.highRated && provider.rating < 4.8) return false
    if (priceRange[0] > provider.hourlyRate || priceRange[1] < provider.hourlyRate) return false
    return true
  })

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-black text-black dark:text-white">Find Your Perfect Service Professional</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">AI-powered matching with real-time availability</p>
            </div>
            <Badge className="bg-black dark:bg-white text-white dark:text-black border-0 px-4 py-2">
              <Brain className="w-4 h-4 mr-2" />
              AI Enhanced
            </Badge>
          </div>

          {/* Advanced Search Bar */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
              <Input
                placeholder="What service do you need?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-24 h-14 border-2 border-gray-200 dark:border-gray-800 rounded-2xl bg-white dark:bg-black text-black dark:text-white focus:border-black dark:focus:border-white"
              />
              <div className="absolute right-2 top-2 flex space-x-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleVoiceSearch}
                  disabled={isVoiceSearch}
                  className="w-10 h-10 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900"
                >
                  <Mic className={`w-4 h-4 ${isVoiceSearch ? "text-red-500 animate-pulse" : "text-gray-400"}`} />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleCameraSearch}
                  disabled={isCameraSearch}
                  className="w-10 h-10 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900"
                >
                  <Camera className={`w-4 h-4 ${isCameraSearch ? "text-blue-500 animate-pulse" : "text-gray-400"}`} />
                </Button>
              </div>
            </div>

            <div className="relative">
              <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Enter your location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-12 h-14 border-2 border-gray-200 dark:border-gray-800 rounded-2xl bg-white dark:bg-black text-black dark:text-white focus:border-black dark:focus:border-white"
              />
            </div>

            <Select value={selectedService} onValueChange={setSelectedService}>
              <SelectTrigger className="h-14 border-2 border-gray-200 dark:border-gray-800 rounded-2xl bg-white dark:bg-black text-black dark:text-white">
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-black border-gray-200 dark:border-gray-800">
                {services.map((service) => (
                  <SelectItem key={service} value={service.toLowerCase()}>
                    {service}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Filters and Sort */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-950"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
                <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? "rotate-180" : ""}`} />
              </Button>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black text-black dark:text-white">
                  <SortDesc className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-black border-gray-200 dark:border-gray-800">
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-400">
              {filteredProviders.length} professionals found
            </div>
          </div>

          {/* Advanced Filters Panel */}
          {showFilters && (
            <Card className="mt-6 border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-4 gap-6">
                  <div>
                    <h3 className="font-semibold text-black dark:text-white mb-4">Price Range</h3>
                    <div className="space-y-4">
                      <Slider value={priceRange} onValueChange={setPriceRange} max={200} step={5} className="w-full" />
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                        <span>${priceRange[0]}/hr</span>
                        <span>${priceRange[1]}/hr</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-black dark:text-white mb-4">Verification</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={filters.verified}
                          onCheckedChange={(checked) => setFilters((prev) => ({ ...prev, verified: !!checked }))}
                        />
                        <label className="text-sm text-gray-700 dark:text-gray-300">Verified Only</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={filters.premium}
                          onCheckedChange={(checked) => setFilters((prev) => ({ ...prev, premium: !!checked }))}
                        />
                        <label className="text-sm text-gray-700 dark:text-gray-300">Premium Providers</label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-black dark:text-white mb-4">Availability</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={filters.availableNow}
                          onCheckedChange={(checked) => setFilters((prev) => ({ ...prev, availableNow: !!checked }))}
                        />
                        <label className="text-sm text-gray-700 dark:text-gray-300">Available Now</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={filters.highRated}
                          onCheckedChange={(checked) => setFilters((prev) => ({ ...prev, highRated: !!checked }))}
                        />
                        <label className="text-sm text-gray-700 dark:text-gray-300">4.8+ Rating</label>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-end">
                    <Button
                      variant="outline"
                      onClick={() =>
                        setFilters({ verified: false, premium: false, availableNow: false, highRated: false })
                      }
                      className="w-full border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-950"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Clear Filters
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {filteredProviders.map((provider) => (
            <Card
              key={provider.id}
              className="border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black hover:border-black dark:hover:border-white transition-all duration-300 group"
            >
              <CardContent className="p-8">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-6">
                    <div className="relative">
                      <Avatar className="w-20 h-20 border-2 border-gray-200 dark:border-gray-800">
                        <AvatarImage src={provider.image || "/placeholder.svg"} />
                        <AvatarFallback className="bg-gray-100 dark:bg-gray-900 text-black dark:text-white font-bold text-lg">
                          {provider.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      {provider.verified && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-black dark:bg-white rounded-full flex items-center justify-center">
                          <Shield className="w-3 h-3 text-white dark:text-black" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-2xl font-bold text-black dark:text-white">{provider.name}</h3>
                        {provider.premium && (
                          <Badge className="bg-black dark:bg-white text-white dark:text-black border-0">
                            <Sparkles className="w-3 h-3 mr-1" />
                            Premium
                          </Badge>
                        )}
                      </div>

                      <p className="text-lg text-gray-600 dark:text-gray-400 mb-3">{provider.service}</p>
                      <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{provider.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {provider.specialties.map((specialty, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                          >
                            {specialty}
                          </Badge>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-black dark:text-white" />
                          <span className="font-semibold text-black dark:text-white">{provider.rating}</span>
                          <span className="text-gray-600 dark:text-gray-400">({provider.reviews})</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700 dark:text-gray-300">{provider.responseTime}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700 dark:text-gray-300">{provider.distance} miles</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Award className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700 dark:text-gray-300">{provider.completedJobs} jobs</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-3xl font-black text-black dark:text-white mb-2">
                      ${provider.hourlyRate}
                      <span className="text-lg font-normal text-gray-600 dark:text-gray-400">/hr</span>
                    </div>
                    <Badge
                      className={`mb-4 ${
                        provider.availability === "Available Now"
                          ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                          : "bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                      } border-0`}
                    >
                      {provider.availability}
                    </Badge>

                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-950"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-950"
                      >
                        <Heart className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                    </div>

                    <div className="flex space-x-2 mt-3">
                      <Button
                        size="sm"
                        className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Chat
                      </Button>
                      <Button
                        size="sm"
                        className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-950 px-8 py-3"
          >
            Load More Results
          </Button>
        </div>
      </div>
    </div>
  )
}
