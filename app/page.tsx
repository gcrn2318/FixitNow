"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
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
  Moon,
  Sun,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"

const services = [
  {
    icon: Droplets,
    name: "Plumbing",
    jobs: "2.3k+",
    description: "Expert plumbing solutions",
  },
  {
    icon: Zap,
    name: "Electrical",
    jobs: "1.8k+",
    description: "Professional electrical work",
  },
  {
    icon: Hammer,
    name: "Carpentry",
    jobs: "1.5k+",
    description: "Custom woodwork & repairs",
  },
  {
    icon: Settings,
    name: "Appliance Repair",
    jobs: "1.2k+",
    description: "Fix all home appliances",
  },
  {
    icon: Wrench,
    name: "HVAC",
    jobs: "900+",
    description: "Heating & cooling experts",
  },
  {
    icon: Shield,
    name: "Security",
    jobs: "600+",
    description: "Home security systems",
  },
]

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Homeowner",
    content: "FixItNow connected me with an amazing electrician in under 10 minutes. The service was exceptional!",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60",
    location: "New York, NY",
    service: "Electrical Repair",
  },
  {
    name: "Mike Chen",
    role: "Business Owner",
    content: "As a plumber, this platform has transformed my business. The booking system is seamless and efficient.",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60",
    location: "Los Angeles, CA",
    service: "Plumbing Services",
  },
  {
    name: "Emily Rodriguez",
    role: "Property Manager",
    content: "Managing maintenance for 50+ properties has never been easier. The dashboard gives me complete control.",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60",
    location: "Chicago, IL",
    service: "Property Management",
  },
]

const stats = [
  { icon: Users, value: "50k+", label: "Active Users", change: "+12%" },
  { icon: CheckCircle, value: "200k+", label: "Jobs Completed", change: "+18%" },
  { icon: Award, value: "4.9/5", label: "Average Rating", change: "+0.2" },
  { icon: TrendingUp, value: "99.9%", label: "Uptime", change: "+0.1%" },
]

const features = [
  {
    icon: Brain,
    title: "AI-Powered Matching",
    description:
      "Advanced algorithms match you with the perfect professional based on your specific needs and location.",
  },
  {
    icon: Globe,
    title: "Real-Time Tracking",
    description: "Track your service professional in real-time with live updates and estimated arrival times.",
  },
  {
    icon: Shield,
    title: "Verified Professionals",
    description: "All service providers are thoroughly vetted, background-checked, and continuously monitored.",
  },
  {
    icon: Zap,
    title: "Instant Booking",
    description: "Book services instantly with our streamlined process and get confirmed within minutes.",
  },
]

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [location, setLocation] = useState("")
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-black dark:bg-white rounded-2xl flex items-center justify-center">
                <Wrench className="w-6 h-6 text-white dark:text-black" />
              </div>
              <div>
                <span className="text-2xl font-black text-black dark:text-white">FixItNow</span>
                <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">Professional Services</div>
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-8">
              {["Services", "How It Works", "Become a Provider", "Enterprise"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-300 font-medium"
                >
                  {item}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-900"
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="font-medium hover:bg-gray-100 dark:hover:bg-gray-900 rounded-full px-6"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 font-medium px-8 rounded-full">
                  Get Started
                  <Sparkles className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <Badge className="bg-black dark:bg-white text-white dark:text-black border-0 px-4 py-2 rounded-full">
                    <Sparkles className="w-4 h-4 mr-2" />
                    AI-Powered Platform
                  </Badge>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-black dark:text-white fill-current" />
                    ))}
                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">4.9/5 from 10k+ reviews</span>
                  </div>
                </div>

                <h1 className="text-6xl lg:text-7xl font-black leading-tight text-black dark:text-white">
                  The Future of
                  <br />
                  <span className="text-gray-600 dark:text-gray-400">Home Services</span>
                </h1>

                <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  Experience next-generation home services with{" "}
                  <span className="font-semibold text-black dark:text-white">AI-powered matching</span>,{" "}
                  <span className="font-semibold text-black dark:text-white">real-time tracking</span>, and{" "}
                  <span className="font-semibold text-black dark:text-white">guaranteed satisfaction</span>.
                </p>
              </div>

              {/* Search Interface */}
              <Card className="p-8 border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black rounded-3xl hover:border-black dark:hover:border-white transition-all duration-500">
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">
                      Find Your Perfect Service Professional
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Powered by advanced AI matching algorithms
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="relative">
                      <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                      <Input
                        placeholder="What service do you need?"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-12 h-14 border-2 border-gray-200 dark:border-gray-800 rounded-2xl focus:border-black dark:focus:border-white bg-white dark:bg-black text-black dark:text-white"
                      />
                    </div>

                    <div className="relative">
                      <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                      <Input
                        placeholder="Enter your location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="pl-12 h-14 border-2 border-gray-200 dark:border-gray-800 rounded-2xl focus:border-black dark:focus:border-white bg-white dark:bg-black text-black dark:text-white"
                      />
                    </div>
                  </div>

                  <Link href="/search">
                    <Button className="w-full h-16 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 font-semibold text-lg rounded-2xl transition-all duration-300">
                      Find Perfect Match
                      <ArrowRight className="w-5 h-5 ml-3" />
                    </Button>
                  </Link>
                </div>
              </Card>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-900 rounded-2xl flex items-center justify-center">
                      <stat.icon className="w-8 h-8 text-black dark:text-white" />
                    </div>
                    <div className="text-3xl font-black text-black dark:text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden border-2 border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white transition-all duration-500">
                <Image
                  src="/placeholder.svg?height=700&width=600"
                  alt="Professional service"
                  width={600}
                  height={700}
                  className="w-full h-auto"
                />

                {/* Floating Elements */}
                <div className="absolute top-6 left-6">
                  <Card className="p-4 bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-2xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <div className="font-bold text-black dark:text-white">Verified Professional</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Background checked ✓</div>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="absolute bottom-6 right-6">
                  <Card className="p-4 bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-2xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center">
                        <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <div className="font-bold text-black dark:text-white">Real-time Tracking</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Live updates 📍</div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="bg-black dark:bg-white text-white dark:text-black border-0 px-6 py-3 rounded-full mb-6">
              <Wrench className="w-4 h-4 mr-2" />
              Premium Services
            </Badge>
            <h2 className="text-5xl lg:text-6xl font-black mb-6 text-black dark:text-white">Exceptional Services</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Choose from our curated selection of premium home services, each backed by our satisfaction guarantee
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Link key={index} href={`/services/${service.name.toLowerCase()}`}>
                <Card className="group cursor-pointer border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black rounded-3xl hover:border-black dark:hover:border-white transition-all duration-500 h-full">
                  <CardContent className="p-8 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-900 rounded-2xl flex items-center justify-center group-hover:bg-black dark:group-hover:bg-white transition-all duration-300">
                        <service.icon className="w-8 h-8 text-black dark:text-white group-hover:text-white dark:group-hover:text-black" />
                      </div>
                      <Badge className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-0 px-3 py-1 rounded-full">
                        {service.jobs}
                      </Badge>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-3 text-black dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors duration-300">
                        {service.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">{service.description}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-black dark:text-white fill-current" />
                        ))}
                        <span className="ml-2 text-gray-600 dark:text-gray-400 font-medium">4.9</span>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-black dark:group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-black dark:bg-white text-white dark:text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="bg-white/10 dark:bg-black/10 text-white dark:text-black border border-white/20 dark:border-black/20 px-6 py-3 rounded-full mb-6">
              <Brain className="w-4 h-4 mr-2" />
              Advanced Technology
            </Badge>
            <h2 className="text-5xl lg:text-6xl font-black mb-6">Powered by Innovation</h2>
            <p className="text-xl text-gray-300 dark:text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Experience the future of home services with cutting-edge technology and intelligent automation
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-white/5 dark:bg-black/5 border border-white/10 dark:border-black/10 rounded-3xl p-8 hover:bg-white/10 dark:hover:bg-black/10 transition-all duration-500"
              >
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-white/10 dark:bg-black/10 rounded-2xl flex items-center justify-center">
                    <feature.icon className="w-8 h-8 text-white dark:text-black" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                    <p className="text-gray-300 dark:text-gray-700 leading-relaxed text-lg">{feature.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="bg-black dark:bg-white text-white dark:text-black border-0 px-6 py-3 rounded-full mb-6">
              <Users className="w-4 h-4 mr-2" />
              Customer Stories
            </Badge>
            <h2 className="text-5xl lg:text-6xl font-black mb-6 text-black dark:text-white">Loved by Thousands</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Join over 50,000 satisfied customers who trust FixItNow for their home service needs
            </p>
          </div>

          <Card className="p-12 bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-800 rounded-3xl">
            <div className="text-center">
              <div className="mb-8">
                <Avatar className="w-24 h-24 mx-auto mb-6 border-4 border-gray-200 dark:border-gray-800">
                  <AvatarImage src={testimonials[currentTestimonial].image || "/placeholder.svg"} />
                  <AvatarFallback className="text-2xl font-bold bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
                    {testimonials[currentTestimonial].name[0]}
                  </AvatarFallback>
                </Avatar>

                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-black dark:text-white fill-current mx-1" />
                  ))}
                </div>

                <blockquote className="text-2xl lg:text-3xl font-light italic mb-8 text-gray-700 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>

                <div className="space-y-2">
                  <div className="text-xl font-bold text-black dark:text-white">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    {testimonials[currentTestimonial].role} • {testimonials[currentTestimonial].location}
                  </div>
                  <Badge className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 border-0 px-4 py-2 rounded-full">
                    {testimonials[currentTestimonial].service}
                  </Badge>
                </div>
              </div>
            </div>
          </Card>

          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentTestimonial ? "bg-black dark:bg-white scale-125" : "bg-gray-300 dark:bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black dark:bg-white text-white dark:text-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-12">
            <h2 className="text-5xl lg:text-6xl font-black mb-8 leading-tight">
              Ready to Experience
              <br />
              <span className="text-gray-400 dark:text-gray-600">The Future?</span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-300 dark:text-gray-700 mb-12 leading-relaxed max-w-3xl mx-auto">
              Join thousands of satisfied customers and experience the next generation of home services today
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-white dark:bg-black text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 font-bold px-12 py-6 rounded-full text-lg"
              >
                Start Your Journey
                <ArrowRight className="ml-3 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/become-provider">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white dark:border-black text-white dark:text-black hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white font-bold px-12 py-6 rounded-full text-lg bg-transparent"
              >
                Become a Provider
                <Wrench className="ml-3 w-5 h-5" />
              </Button>
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Shield, label: "100% Secure" },
              { icon: Clock, label: "24/7 Support" },
              { icon: Award, label: "Quality Guaranteed" },
              { icon: Users, label: "50k+ Happy Customers" },
            ].map((item, index) => (
              <div
                key={index}
                className="text-white/80 dark:text-black/80 hover:text-white dark:hover:text-black transition-colors duration-300"
              >
                <item.icon className="w-8 h-8 mx-auto mb-3" />
                <div className="font-medium">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-100 text-white dark:text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-white dark:bg-black rounded-2xl flex items-center justify-center">
                  <Wrench className="w-6 h-6 text-black dark:text-white" />
                </div>
                <div>
                  <span className="text-2xl font-bold">FixItNow</span>
                  <div className="text-sm text-gray-400 dark:text-gray-600">Professional Services</div>
                </div>
              </div>
              <p className="text-gray-300 dark:text-gray-700 mb-8 text-lg leading-relaxed max-w-md">
                The next-generation platform connecting you with trusted home service professionals through advanced
                technology.
              </p>
              <div className="flex space-x-4">
                {[Phone, MessageCircle, Calendar].map((Icon, index) => (
                  <div
                    key={index}
                    className="w-12 h-12 bg-gray-800 dark:bg-gray-200 hover:bg-white dark:hover:bg-black rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300"
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                ))}
              </div>
            </div>

            {[
              {
                title: "Services",
                links: ["Plumbing", "Electrical", "Carpentry", "HVAC", "Appliance Repair", "Security Systems"],
              },
              {
                title: "Company",
                links: ["About Us", "Careers", "Press", "Contact", "Blog", "Help Center"],
              },
            ].map((section, index) => (
              <div key={index}>
                <h3 className="font-bold text-lg mb-6">{section.title}</h3>
                <ul className="space-y-4">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={`/${link.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-gray-400 dark:text-gray-600 hover:text-white dark:hover:text-black transition-colors duration-300"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 dark:border-gray-200 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 dark:text-gray-600 mb-4 md:mb-0">
              &copy; 2024 FixItNow. All rights reserved. Built with precision and care.
            </p>
            <div className="flex items-center space-x-6 text-gray-400 dark:text-gray-600">
              <Link href="/privacy" className="hover:text-white dark:hover:text-black transition-colors duration-300">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-white dark:hover:text-black transition-colors duration-300">
                Terms
              </Link>
              <Link href="/cookies" className="hover:text-white dark:hover:text-black transition-colors duration-300">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
