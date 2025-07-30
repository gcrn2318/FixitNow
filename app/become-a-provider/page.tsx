"use client"

import { useState } from "react"
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
  CreditCard,
  FileText,
  UserCheck,
  Smartphone,
  DollarSign,
  BarChart3,
  Target,
  Headphones,
  ThumbsUp,
  Building,
  Briefcase,
  GraduationCap,
  ChevronRight,
  Play,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const benefits = [
  {
    icon: DollarSign,
    title: "Increase Your Income",
    description: "Earn up to 40% more than traditional service platforms with our competitive rates and no hidden fees.",
    stat: "40% Higher Earnings",
    color: "from-green-500 to-green-600"
  },
  {
    icon: Users,
    title: "Quality Customers",
    description: "Connect with serious customers who value quality work and are willing to pay fair prices.",
    stat: "95% Customer Satisfaction",
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: Calendar,
    title: "Flexible Scheduling",
    description: "Work when you want, where you want. Set your own schedule and availability preferences.",
    stat: "100% Schedule Control",
    color: "from-purple-500 to-purple-600"
  },
  {
    icon: Smartphone,
    title: "Easy-to-Use App",
    description: "Manage your business on the go with our intuitive mobile app designed for professionals.",
    stat: "4.9 App Store Rating",
    color: "from-orange-500 to-orange-600"
  },
  {
    icon: Shield,
    title: "Insurance Protection",
    description: "Work with confidence knowing you're protected by our comprehensive insurance coverage.",
    stat: "$2M Coverage",
    color: "from-red-500 to-red-600"
  },
  {
    icon: BarChart3,
    title: "Business Growth Tools",
    description: "Access analytics, customer insights, and marketing tools to grow your business faster.",
    stat: "3x Business Growth",
    color: "from-indigo-500 to-indigo-600"
  }
]

const steps = [
  {
    number: "01",
    title: "Create Your Profile",
    description: "Sign up and create a detailed professional profile showcasing your skills, experience, and certifications.",
    icon: UserCheck,
    details: [
      "Upload professional photos",
      "List your services and specialties", 
      "Add certifications and licenses",
      "Set your service areas and rates"
    ]
  },
  {
    number: "02",
    title: "Get Verified",
    description: "Complete our verification process including background checks, license validation, and skill assessment.",
    icon: Shield,
    details: [
      "Background check completion",
      "License and insurance verification",
      "Skill assessment tests",
      "Reference checks"
    ]
  },
  {
    number: "03",
    title: "Start Receiving Jobs",
    description: "Once approved, start receiving job requests from customers in your area that match your expertise.",
    icon: Target,
    details: [
      "Instant job notifications",
      "Smart matching algorithm",
      "Customer details and requirements",
      "Flexible acceptance options"
    ]
  },
  {
    number: "04",
    title: "Grow Your Business",
    description: "Build your reputation, earn great reviews, and watch your business grow with our platform tools.",
    icon: TrendingUp,
    details: [
      "Customer review system",
      "Performance analytics",
      "Marketing support",
      "Business growth insights"
    ]
  }
]

const testimonials = [
  {
    name: "Mike Rodriguez",
    role: "Electrician",
    business: "Rodriguez Electric",
    content: "FixItNow has completely transformed my business. I'm booked solid and earning 50% more than I was before joining the platform.",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60",
    location: "Austin, TX",
    experience: "3 years on platform",
    jobs: "500+ completed"
  },
  {
    name: "Sarah Chen",
    role: "Plumber", 
    business: "Chen Plumbing Services",
    content: "The quality of customers is amazing. They respect my time, pay fairly, and the booking system makes everything so easy.",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60",
    location: "Seattle, WA",
    experience: "2 years on platform",
    jobs: "350+ completed"
  },
  {
    name: "David Johnson",
    role: "Handyman",
    business: "Johnson Home Services",
    content: "I love the flexibility. I can work when I want and the app makes managing my schedule and customers incredibly simple.",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60",
    location: "Denver, CO",
    experience: "4 years on platform",
    jobs: "800+ completed"
  }
]

const requirements = [
  {
    category: "Professional Requirements",
    items: [
      "Valid business license (where required)",
      "General liability insurance ($1M minimum)",
      "Relevant trade certifications",
      "Minimum 2 years of experience",
      "Professional references"
    ]
  },
  {
    category: "Background & Safety",
    items: [
      "Clean background check",
      "Valid driver's license",
      "No major criminal convictions",
      "Drug screening (for certain services)",
      "Safety training completion"
    ]
  },
  {
    category: "Equipment & Tools",
    items: [
      "Professional-grade tools",
      "Reliable transportation",
      "Smartphone for app usage",
      "Safety equipment and gear",
      "Uniform or professional appearance"
    ]
  }
]

const earnings = [
  {
    service: "Plumbing",
    hourly: "$85-120",
    monthly: "$6,800-9,600",
    demand: "High"
  },
  {
    service: "Electrical",
    hourly: "$90-130",
    monthly: "$7,200-10,400",
    demand: "High"
  },
  {
    service: "HVAC",
    hourly: "$80-115",
    monthly: "$6,400-9,200",
    demand: "High"
  },
  {
    service: "Carpentry",
    hourly: "$70-100",
    monthly: "$5,600-8,000",
    demand: "Medium"
  },
  {
    service: "Appliance Repair",
    hourly: "$75-105",
    monthly: "$6,000-8,400",
    demand: "Medium"
  },
  {
    service: "Cleaning",
    hourly: "$50-75",
    monthly: "$4,000-6,000",
    demand: "Very High"
  }
]

export default function BecomeProviderPage() {
  const [activeStep, setActiveStep] = useState(0)

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
                    item === "Become a Provider" ? "text-black dark:text-white font-semibold" : ""
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
                  Join as Provider
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent dark:from-white dark:via-gray-300 dark:to-white">
              Grow Your Business
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Join thousands of successful service professionals who have transformed their businesses 
            with FixItNow. Get more customers, increase your income, and build your reputation.
          </p>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-black text-black dark:text-white mb-2">5,000+</div>
              <div className="text-gray-600 dark:text-gray-400">Active Providers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-black dark:text-white mb-2">$2.5M+</div>
              <div className="text-gray-600 dark:text-gray-400">Earned Monthly</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-black dark:text-white mb-2">40%</div>
              <div className="text-gray-600 dark:text-gray-400">Higher Earnings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-black dark:text-white mb-2">4.9</div>
              <div className="text-gray-600 dark:text-gray-400">Provider Rating</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup?type=provider">
              <Button className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 font-semibold px-8 py-4 rounded-full text-lg">
                Start Earning Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button variant="outline" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-black dark:hover:border-white font-semibold px-8 py-4 rounded-full text-lg">
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-black dark:text-white mb-4">
              Why Choose FixItNow?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Everything you need to succeed as a service professional
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black rounded-3xl hover:border-black dark:hover:border-white transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-black dark:text-white mb-3">
                    {benefit.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    {benefit.description}
                  </p>

                  <Badge className="bg-black dark:bg-white text-white dark:text-black font-semibold">
                    {benefit.stat}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Earnings Potential */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-black dark:text-white mb-4">
              Earnings Potential
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              See what you could earn in your field
            </p>
          </div>

          <Card className="border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black rounded-3xl overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-900">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-black dark:text-white">Service Type</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-black dark:text-white">Hourly Rate</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-black dark:text-white">Monthly Potential</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-black dark:text-white">Demand</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                    {earnings.map((earning, index) => (
                      <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                        <td className="px-6 py-4 text-black dark:text-white font-medium">{earning.service}</td>
                        <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{earning.hourly}</td>
                        <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{earning.monthly}</td>
                        <td className="px-6 py-4">
                          <Badge className={`${
                            earning.demand === "Very High" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" :
                            earning.demand === "High" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" :
                            "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          }`}>
                            {earning.demand}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-black dark:text-white mb-4">
              How to Get Started
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Four simple steps to start growing your business
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Steps */}
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`cursor-pointer transition-all duration-300 ${
                    activeStep === index ? "scale-105" : "hover:scale-102"
                  }`}
                  onClick={() => setActiveStep(index)}
                >
                  <Card className={`border-2 ${
                    activeStep === index 
                      ? "border-black dark:border-white bg-gray-50 dark:bg-gray-900" 
                      : "border-gray-200 dark:border-gray-800 bg-white dark:bg-black hover:border-gray-400 dark:hover:border-gray-600"
                  } rounded-3xl transition-all duration-300`}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                          <step.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="text-2xl font-black text-gray-400">{step.number}</span>
                            <h3 className="text-xl font-bold text-black dark:text-white">{step.title}</h3>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                        <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                          activeStep === index ? "rotate-90" : ""
                        }`} />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>

            {/* Step Details */}
            <div className="lg:sticky lg:top-8">
              <Card className="border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black rounded-3xl">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mb-6">
                    {(() => {
                      const IconComponent = steps[activeStep].icon;
                      return <IconComponent className="w-8 h-8 text-white" />;
                    })()}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-black dark:text-white mb-4">
                    {steps[activeStep].title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {steps[activeStep].description}
                  </p>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-black dark:text-white">What's Included:</h4>
                    {steps[activeStep].details.map((detail, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{detail}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Requirements */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-black dark:text-white mb-4">
              Requirements
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              What you need to join our platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {requirements.map((req, index) => (
              <Card key={index} className="border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black rounded-3xl">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-black dark:text-white mb-6">
                    {req.category}
                  </h3>
                  <div className="space-y-3">
                    {req.items.map((item, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-black dark:text-white mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Hear from providers who've transformed their businesses
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
                  
                  <div className="flex items-center space-x-4 mb-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={testimonial.image} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-black dark:text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{testimonial.business}</div>
                    </div>
                  </div>

                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{testimonial.experience}</span>
                    <span>{testimonial.jobs}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-gray-900 to-black dark:from-gray-100 dark:to-white rounded-3xl p-12">
          <h2 className="text-4xl font-black text-white dark:text-black mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-300 dark:text-gray-700 mb-8 max-w-2xl mx-auto">
            Join thousands of successful service professionals who have grown their businesses with FixItNow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup?type=provider">
              <Button className="bg-white dark:bg-black text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 font-semibold px-8 py-4 rounded-full text-lg">
                Join as Provider
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button variant="outline" className="border-white dark:border-black text-white dark:text-black hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white font-semibold px-8 py-4 rounded-full text-lg">
              <Phone className="w-5 h-5 mr-2" />
              Call Us: (555) 123-4567
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}