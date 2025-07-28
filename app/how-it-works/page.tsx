"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
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
  Play,
  ChevronRight,
  Target,
  Headphones,
  ThumbsUp,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const steps = [
  {
    number: "01",
    title: "Tell Us What You Need",
    description: "Describe your project or service need in detail. Our smart matching system will understand exactly what you're looking for.",
    icon: FileText,
    features: [
      "Detailed service descriptions",
      "Photo uploads for better context",
      "Preferred timing selection",
      "Budget range specification"
    ],
    color: "from-blue-500 to-blue-600"
  },
  {
    number: "02", 
    title: "Get Matched with Experts",
    description: "Our AI-powered system instantly connects you with verified professionals in your area who specialize in your specific needs.",
    icon: Brain,
    features: [
      "AI-powered matching algorithm",
      "Location-based recommendations",
      "Skill and experience verification",
      "Real-time availability check"
    ],
    color: "from-purple-500 to-purple-600"
  },
  {
    number: "03",
    title: "Compare & Choose",
    description: "Review profiles, ratings, and quotes from multiple professionals. Chat with them directly to discuss your project details.",
    icon: UserCheck,
    features: [
      "Detailed provider profiles",
      "Customer reviews and ratings",
      "Transparent pricing quotes",
      "Direct messaging system"
    ],
    color: "from-green-500 to-green-600"
  },
  {
    number: "04",
    title: "Book & Track Progress",
    description: "Schedule your service and track progress in real-time. Get updates, photos, and communicate throughout the job.",
    icon: Calendar,
    features: [
      "Easy online booking",
      "Real-time job tracking",
      "Progress photos and updates",
      "Secure payment processing"
    ],
    color: "from-orange-500 to-orange-600"
  }
]

const benefits = [
  {
    icon: Shield,
    title: "Verified Professionals",
    description: "All service providers are background-checked, licensed, and insured for your peace of mind.",
    stats: "100% Verified"
  },
  {
    icon: Clock,
    title: "Fast Response Times",
    description: "Get matched with available professionals in minutes, not hours or days.",
    stats: "< 10 min avg"
  },
  {
    icon: Star,
    title: "Quality Guarantee",
    description: "We guarantee satisfaction with our work quality promise and customer protection.",
    stats: "4.9/5 rating"
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description: "Pay securely through our platform with protection for both customers and providers.",
    stats: "100% Secure"
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our customer support team is available around the clock to help with any issues.",
    stats: "24/7 Available"
  },
  {
    icon: ThumbsUp,
    title: "Satisfaction Promise",
    description: "If you're not completely satisfied, we'll make it right or refund your money.",
    stats: "100% Guarantee"
  }
]

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Homeowner",
    content: "The process was incredibly smooth. I had a plumber at my door within 2 hours of posting my request!",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60",
    location: "New York, NY",
    service: "Emergency Plumbing"
  },
  {
    name: "Mike Chen", 
    role: "Business Owner",
    content: "As a service provider, FixItNow has transformed my business. The booking system is seamless and I get quality leads.",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60",
    location: "Los Angeles, CA",
    service: "Electrical Services"
  },
  {
    name: "Emily Rodriguez",
    role: "Property Manager",
    content: "Managing maintenance for 50+ properties has never been easier. The dashboard gives me complete visibility.",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60",
    location: "Chicago, IL",
    service: "Property Management"
  }
]

const faqs = [
  {
    question: "How quickly can I get matched with a service provider?",
    answer: "Most customers get matched with qualified professionals within 10 minutes of posting their request. Emergency services can be matched even faster."
  },
  {
    question: "Are all service providers background checked?",
    answer: "Yes, every professional on our platform undergoes thorough background checks, license verification, and insurance validation before being approved."
  },
  {
    question: "What if I'm not satisfied with the service?",
    answer: "We offer a 100% satisfaction guarantee. If you're not happy with the work, we'll help resolve the issue or provide a full refund."
  },
  {
    question: "How does pricing work?",
    answer: "Service providers set their own rates, which you can see upfront. You can compare quotes from multiple professionals before making a decision."
  },
  {
    question: "Can I track the progress of my service request?",
    answer: "Absolutely! Our platform provides real-time updates, progress photos, and direct communication with your service provider throughout the job."
  },
  {
    question: "Is there a fee to use FixItNow?",
    answer: "It's free to post requests and get matched with professionals. We only charge a small service fee when you book and complete a job."
  }
]

export default function HowItWorksPage() {
  const [activeStep, setActiveStep] = useState(0)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

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
                    item === "How It Works" ? "text-black dark:text-white font-semibold" : ""
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
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent dark:from-white dark:via-gray-300 dark:to-white">
              How It Works
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Getting professional services has never been easier. Our streamlined process connects you 
            with verified experts in just a few simple steps.
          </p>

          {/* Video Preview */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="relative bg-gradient-to-br from-gray-900 to-black dark:from-gray-100 dark:to-white rounded-3xl p-1">
              <div className="bg-white dark:bg-black rounded-3xl p-8 md:p-16">
                <div className="flex items-center justify-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300">
                    <Play className="w-10 h-10 text-white ml-1" />
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-6 text-lg">
                  Watch how FixItNow works in under 2 minutes
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Steps Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-black dark:text-white mb-4">
              Simple 4-Step Process
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              From request to completion in minutes
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Steps Navigation */}
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
                        <div className={`w-12 h-12 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
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
                  <div className={`w-16 h-16 bg-gradient-to-br ${steps[activeStep].color} rounded-3xl flex items-center justify-center mb-6`}>
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
                    <h4 className="font-semibold text-black dark:text-white">Key Features:</h4>
                    {steps[activeStep].features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-black dark:text-white mb-4">
              Why Choose FixItNow?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Built with your safety, convenience, and satisfaction in mind
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black rounded-3xl hover:border-black dark:hover:border-white transition-all duration-300 group">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="w-8 h-8 text-gray-700 dark:text-gray-300" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-black dark:text-white mb-3">
                    {benefit.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    {benefit.description}
                  </p>

                  <Badge className="bg-black dark:bg-white text-white dark:text-black font-semibold">
                    {benefit.stats}
                  </Badge>
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
              See how FixItNow has helped thousands of customers and providers
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
                      <div className="text-sm text-gray-500">{testimonial.role} • {testimonial.location}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{testimonial.service}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-black dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Everything you need to know about using FixItNow
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black rounded-2xl">
                <CardContent className="p-0">
                  <button
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-900 rounded-2xl transition-colors duration-200"
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  >
                    <h3 className="text-lg font-semibold text-black dark:text-white pr-4">
                      {faq.question}
                    </h3>
                    <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                      expandedFaq === index ? "rotate-90" : ""
                    }`} />
                  </button>
                  
                  {expandedFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-gray-900 to-black dark:from-gray-100 dark:to-white rounded-3xl p-12">
          <h2 className="text-4xl font-black text-white dark:text-black mb-4">
            Ready to Experience the Difference?
          </h2>
          <p className="text-xl text-gray-300 dark:text-gray-700 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have discovered a better way to get things done.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button className="bg-white dark:bg-black text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 font-semibold px-8 py-4 rounded-full text-lg">
                Get Started Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" className="border-white dark:border-black text-white dark:text-black hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white font-semibold px-8 py-4 rounded-full text-lg">
                Browse Services
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}