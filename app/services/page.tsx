"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  MapPin,
  Star,
  Clock,
  Shield,
  Zap,
  Wrench,
  Droplets,
  Hammer,
  Settings,
  CheckCircle,
  Users,
  Award,
  TrendingUp,
  ArrowRight,
  Phone,
  MessageCircle,
  Calendar,
  Globe,
  Brain,
  Sparkles,
  Home,
  Car,
  Paintbrush,
  Scissors,
  TreePine,
  Camera,
  Laptop,
  Truck,
  Filter,
  SortAsc,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const allServices = [
  {
    icon: Droplets,
    name: "Plumbing",
    category: "Home Maintenance",
    jobs: "2,340+",
    avgPrice: "$85/hr",
    rating: 4.9,
    providers: 156,
    description: "Expert plumbing solutions for all your water and drainage needs",
    features: ["Emergency repairs", "Pipe installation", "Leak detection", "Drain cleaning"],
    popular: true,
  },
  {
    icon: Zap,
    name: "Electrical",
    category: "Home Maintenance",
    jobs: "1,890+",
    avgPrice: "$95/hr",
    rating: 4.8,
    providers: 134,
    description: "Professional electrical work from certified electricians",
    features: ["Wiring installation", "Circuit repairs", "Panel upgrades", "Smart home setup"],
    popular: true,
  },
  {
    icon: Hammer,
    name: "Carpentry",
    category: "Home Improvement",
    jobs: "1,567+",
    avgPrice: "$75/hr",
    rating: 4.9,
    providers: 98,
    description: "Custom woodwork and carpentry solutions",
    features: ["Custom furniture", "Cabinet installation", "Trim work", "Deck building"],
    popular: false,
  },
  {
    icon: Settings,
    name: "Appliance Repair",
    category: "Home Maintenance",
    jobs: "1,234+",
    avgPrice: "$80/hr",
    rating: 4.7,
    providers: 87,
    description: "Fix all your home appliances quickly and efficiently",
    features: ["Refrigerator repair", "Washer/dryer service", "Dishwasher fix", "Oven repair"],
    popular: true,
  },
  {
    icon: Wrench,
    name: "HVAC",
    category: "Home Maintenance",
    jobs: "945+",
    avgPrice: "$90/hr",
    rating: 4.8,
    providers: 76,
    description: "Heating, ventilation, and air conditioning experts",
    features: ["AC installation", "Heating repair", "Duct cleaning", "System maintenance"],
    popular: false,
  },
  {
    icon: Shield,
    name: "Security Systems",
    category: "Home Security",
    jobs: "678+",
    avgPrice: "$100/hr",
    rating: 4.9,
    providers: 54,
    description: "Professional home security system installation and maintenance",
    features: ["Camera installation", "Alarm systems", "Smart locks", "Monitoring setup"],
    popular: false,
  },
  {
    icon: Paintbrush,
    name: "Painting",
    category: "Home Improvement",
    jobs: "1,123+",
    avgPrice: "$65/hr",
    rating: 4.6,
    providers: 112,
    description: "Interior and exterior painting services",
    features: ["Interior painting", "Exterior painting", "Color consultation", "Wall preparation"],
    popular: true,
  },
  {
    icon: TreePine,
    name: "Landscaping",
    category: "Outdoor Services",
    jobs: "834+",
    avgPrice: "$70/hr",
    rating: 4.7,
    providers: 89,
    description: "Transform your outdoor space with professional landscaping",
    features: ["Garden design", "Lawn maintenance", "Tree trimming", "Irrigation systems"],
    popular: false,
  },
  {
    icon: Scissors,
    name: "Cleaning Services",
    category: "Home Maintenance",
    jobs: "2,156+",
    avgPrice: "$55/hr",
    rating: 4.8,
    providers: 203,
    description: "Professional cleaning services for your home",
    features: ["Deep cleaning", "Regular maintenance", "Move-in/out cleaning", "Post-construction cleanup"],
    popular: true,
  },
  {
    icon: Home,
    name: "Roofing",
    category: "Home Improvement",
    jobs: "567+",
    avgPrice: "$110/hr",
    rating: 4.9,
    providers: 43,
    description: "Professional roofing installation and repair services",
    features: ["Roof installation", "Leak repairs", "Gutter cleaning", "Roof inspection"],
    popular: false,
  },
  {
    icon: Car,
    name: "Auto Services",
    category: "Vehicle Services",
    jobs: "789+",
    avgPrice: "$85/hr",
    rating: 4.7,
    providers: 67,
    description: "Mobile auto repair and maintenance services",
    features: ["Oil changes", "Brake repair", "Battery replacement", "Diagnostic services"],
    popular: false,
  },
  {
    icon: Laptop,
    name: "Tech Support",
    category: "Technology",
    jobs: "1,045+",
    avgPrice: "$75/hr",
    rating: 4.6,
    providers: 78,
    description: "Computer and technology support services",
    features: ["Computer repair", "Network setup", "Software installation", "Data recovery"],
    popular: true,
  },
]

const categories = [
  "All Services",
  "Home Maintenance",
  "Home Improvement", 
  "Home Security",
  "Outdoor Services",
  "Vehicle Services",
  "Technology",
]

const testimonials = [
  {
    name: "Sarah Johnson",
    service: "Plumbing",
    content: "Found an excellent plumber through FixItNow. Fixed my kitchen leak in under 2 hours!",
    rating: 5,
    image: "/placeholder.svg?height=50&width=50",
    location: "New York, NY",
  },
  {
    name: "Mike Chen",
    service: "Electrical",
    content: "The electrician was professional and completed the job perfectly. Highly recommend!",
    rating: 5,
    image: "/placeholder.svg?height=50&width=50",
    location: "Los Angeles, CA",
  },
  {
    name: "Emily Rodriguez",
    service: "Cleaning",
    content: "Amazing cleaning service! My house has never looked better. Will definitely book again.",
    rating: 5,
    image: "/placeholder.svg?height=50&width=50",
    location: "Chicago, IL",
  },
]

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Services")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("popular")

  const filteredServices = allServices.filter((service) => {
    const matchesCategory = selectedCategory === "All Services" || service.category === selectedCategory
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const sortedServices = [...filteredServices].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.jobs.localeCompare(a.jobs, undefined, { numeric: true })
      case "rating":
        return b.rating - a.rating
      case "price":
        return parseInt(a.avgPrice.replace(/\D/g, "")) - parseInt(b.avgPrice.replace(/\D/g, ""))
      case "name":
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-950 dark:via-blue-950 dark:to-indigo-950">
      {/* Header */}
      <div className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-black to-gray-800 dark:from-white dark:to-gray-200 rounded-2xl flex items-center justify-center">
                <Wrench className="w-6 h-6 text-white dark:text-black" />
              </div>
              <div>
                <span className="text-2xl font-black text-black dark:text-white">FixItNow</span>
                <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">Professional Services</div>
              </div>
            </Link>

            <div className="hidden lg:flex items-center space-x-8">
              {["Services", "How It Works", "Become a Provider", "Enterprise"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-300 font-medium ${
                    item === "Services" ? "text-black dark:text-white font-semibold" : ""
                  }`}
                >
                  {item}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost" className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 font-semibold px-6 py-2 rounded-full">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent dark:from-white dark:via-gray-300 dark:to-white">
              All Services
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Find trusted professionals for any job, big or small. From emergency repairs to home improvements, 
            we've got you covered with vetted experts in your area.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg rounded-2xl border-2 border-gray-200 dark:border-gray-700 focus:border-black dark:focus:border-white bg-white dark:bg-gray-900"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-black text-black dark:text-white mb-2">12+</div>
              <div className="text-gray-600 dark:text-gray-400">Service Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-black dark:text-white mb-2">1,200+</div>
              <div className="text-gray-600 dark:text-gray-400">Verified Providers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-black dark:text-white mb-2">15k+</div>
              <div className="text-gray-600 dark:text-gray-400">Jobs Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-black dark:text-white mb-2">4.8</div>
              <div className="text-gray-600 dark:text-gray-400">Average Rating</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full ${
                  selectedCategory === category
                    ? "bg-black dark:bg-white text-white dark:text-black"
                    : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-black dark:hover:border-white"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <SortAsc className="w-4 h-4 text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price">Lowest Price</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {sortedServices.map((service, index) => (
            <Card key={index} className="group cursor-pointer border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black rounded-3xl hover:border-black dark:hover:border-white transition-all duration-500 h-full">
              <CardContent className="p-8 h-full flex flex-col">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-8 h-8 text-gray-700 dark:text-gray-300" />
                  </div>
                  {service.popular && (
                    <Badge className="bg-black dark:bg-white text-white dark:text-black text-xs px-2 py-1">
                      Popular
                    </Badge>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-black dark:text-white mb-2">{service.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-semibold text-black dark:text-white">{service.rating}</span>
                      <span className="text-gray-500">({service.jobs} jobs)</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-black dark:text-white">{service.avgPrice}</div>
                      <div className="text-xs text-gray-500">{service.providers} providers</div>
                    </div>
                  </div>

                  <Link href={`/search?service=${service.name.toLowerCase()}`}>
                    <Button className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 font-semibold py-3 rounded-xl group-hover:scale-105 transition-transform duration-300">
                      Find {service.name} Experts
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-black dark:text-white mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Real reviews from real customers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black rounded-3xl">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={testimonial.image} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-black dark:text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.service} • {testimonial.location}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-gray-900 to-black dark:from-gray-100 dark:to-white rounded-3xl p-12">
          <h2 className="text-4xl font-black text-white dark:text-black mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 dark:text-gray-700 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust FixItNow for all their service needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button className="bg-white dark:bg-black text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 font-semibold px-8 py-4 rounded-full text-lg">
                Find Services
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/become-a-provider">
              <Button variant="outline" className="border-white dark:border-black text-white dark:text-black hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white font-semibold px-8 py-4 rounded-full text-lg">
                Become a Provider
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}