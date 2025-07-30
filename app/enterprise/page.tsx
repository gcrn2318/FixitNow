"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
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
  Settings,
  Lock,
  Database,
  Workflow,
  PieChart,
  Mail,
  ChevronDown,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const features = [
  {
    icon: Building,
    title: "Multi-Location Management",
    description: "Manage maintenance across all your properties and locations from a single, unified dashboard.",
    benefits: [
      "Centralized property oversight",
      "Location-specific reporting",
      "Bulk service scheduling",
      "Cross-location analytics"
    ]
  },
  {
    icon: Users,
    title: "Dedicated Account Management",
    description: "Get a dedicated account manager who understands your business and ensures seamless service delivery.",
    benefits: [
      "Personal account manager",
      "Priority customer support",
      "Custom service agreements",
      "Regular business reviews"
    ]
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics & Reporting",
    description: "Make data-driven decisions with comprehensive analytics, custom reports, and performance insights.",
    benefits: [
      "Custom dashboard creation",
      "Automated reporting",
      "Cost analysis tools",
      "Performance benchmarking"
    ]
  },
  {
    icon: Workflow,
    title: "Custom Workflows",
    description: "Create custom approval workflows, service protocols, and automated processes that fit your organization.",
    benefits: [
      "Approval workflow automation",
      "Custom service protocols",
      "Automated notifications",
      "Integration capabilities"
    ]
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-level security with SSO integration, role-based access controls, and compliance management.",
    benefits: [
      "Single Sign-On (SSO)",
      "Role-based permissions",
      "Audit trail logging",
      "Compliance reporting"
    ]
  },
  {
    icon: Database,
    title: "API & Integrations",
    description: "Seamlessly integrate with your existing systems through our robust API and pre-built integrations.",
    benefits: [
      "RESTful API access",
      "ERP system integration",
      "Custom integrations",
      "Real-time data sync"
    ]
  }
]

const solutions = [
  {
    title: "Property Management",
    description: "Streamline maintenance operations across your entire property portfolio",
    icon: Building,
    stats: "500+ Properties Managed",
    features: [
      "Tenant request management",
      "Preventive maintenance scheduling",
      "Vendor performance tracking",
      "Cost center reporting"
    ]
  },
  {
    title: "Facilities Management",
    description: "Comprehensive facility maintenance for corporate offices and commercial spaces",
    icon: Briefcase,
    stats: "1M+ Sq Ft Managed",
    features: [
      "Asset lifecycle management",
      "Emergency response protocols",
      "Compliance tracking",
      "Energy efficiency monitoring"
    ]
  },
  {
    title: "Retail Chain Management",
    description: "Consistent service delivery across all your retail locations",
    icon: Globe,
    stats: "200+ Locations Served",
    features: [
      "Brand standard compliance",
      "Multi-location scheduling",
      "Regional manager dashboards",
      "Store performance analytics"
    ]
  },
  {
    title: "Healthcare Facilities",
    description: "Specialized maintenance solutions for healthcare and medical facilities",
    icon: Shield,
    stats: "50+ Healthcare Clients",
    features: [
      "HIPAA compliance",
      "Critical system monitoring",
      "Infection control protocols",
      "Emergency service priority"
    ]
  }
]

const testimonials = [
  {
    name: "Jennifer Martinez",
    role: "VP of Operations",
    company: "Metro Property Group",
    content: "FixItNow Enterprise has revolutionized how we manage maintenance across our 200+ properties. The cost savings and efficiency gains have been remarkable.",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60",
    stats: "40% Cost Reduction",
    properties: "200+ Properties"
  },
  {
    name: "David Chen",
    role: "Facilities Director", 
    company: "TechCorp Industries",
    content: "The enterprise dashboard gives us complete visibility into our facilities operations. We've reduced downtime by 60% since implementing FixItNow.",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60",
    stats: "60% Less Downtime",
    properties: "15 Office Locations"
  },
  {
    name: "Sarah Johnson",
    role: "Regional Manager",
    company: "RetailMax Chain",
    content: "Managing maintenance across 150 retail locations used to be a nightmare. Now it's streamlined, efficient, and we have full visibility into every job.",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60",
    stats: "150 Locations",
    properties: "99.8% Uptime"
  }
]

const pricing = [
  {
    name: "Professional",
    price: "Custom",
    description: "For growing businesses with multiple locations",
    features: [
      "Up to 50 locations",
      "Basic analytics dashboard",
      "Email support",
      "Standard integrations",
      "Monthly reporting"
    ],
    popular: false
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations with complex needs",
    features: [
      "Unlimited locations",
      "Advanced analytics & reporting",
      "Dedicated account manager",
      "Custom integrations",
      "24/7 priority support",
      "SLA guarantees"
    ],
    popular: true
  },
  {
    name: "Enterprise Plus",
    price: "Custom",
    description: "For mission-critical operations requiring maximum support",
    features: [
      "Everything in Enterprise",
      "White-label solutions",
      "Custom development",
      "On-site training",
      "Dedicated success team",
      "Custom SLAs"
    ],
    popular: false
  }
]

const faqs = [
  {
    question: "What makes FixItNow Enterprise different from the standard platform?",
    answer: "Enterprise includes advanced features like multi-location management, dedicated account management, custom workflows, enterprise security, API access, and comprehensive analytics that aren't available in our standard offering."
  },
  {
    question: "How does pricing work for Enterprise customers?",
    answer: "Enterprise pricing is customized based on your specific needs, number of locations, service volume, and required features. Contact our sales team for a personalized quote."
  },
  {
    question: "Can FixItNow integrate with our existing systems?",
    answer: "Yes, we offer robust API access and pre-built integrations with popular ERP, property management, and facilities management systems. Custom integrations are also available."
  },
  {
    question: "What kind of support do Enterprise customers receive?",
    answer: "Enterprise customers get dedicated account management, priority support, custom SLAs, and access to our enterprise success team for ongoing optimization and support."
  },
  {
    question: "How long does implementation typically take?",
    answer: "Implementation timelines vary based on complexity, but most Enterprise customers are fully operational within 2-4 weeks. We provide dedicated implementation support throughout the process."
  },
  {
    question: "Do you offer training for our team?",
    answer: "Yes, we provide comprehensive training including online sessions, documentation, and for Enterprise Plus customers, on-site training is available."
  }
]

export default function EnterprisePage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
    locations: "",
    message: ""
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

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
                    item === "Enterprise" ? "text-black dark:text-white font-semibold" : ""
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
              <Button className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 font-semibold px-6 py-2 rounded-full">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h1 className="text-5xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent dark:from-white dark:via-gray-300 dark:to-white">
                Enterprise Solutions
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Scale your maintenance operations with enterprise-grade tools, dedicated support, 
              and custom solutions designed for large organizations and multi-location businesses.
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <div className="text-3xl font-black text-black dark:text-white mb-1">500+</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">Enterprise Clients</div>
              </div>
              <div>
                <div className="text-3xl font-black text-black dark:text-white mb-1">10k+</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">Locations Managed</div>
              </div>
              <div>
                <div className="text-3xl font-black text-black dark:text-white mb-1">40%</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">Cost Reduction</div>
              </div>
              <div>
                <div className="text-3xl font-black text-black dark:text-white mb-1">99.9%</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">Uptime SLA</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 font-semibold px-8 py-4 rounded-full text-lg">
                Schedule Demo
                <Calendar className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-black dark:hover:border-white font-semibold px-8 py-4 rounded-full text-lg">
                <Phone className="w-5 h-5 mr-2" />
                Contact Sales
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black rounded-3xl">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-black dark:text-white mb-6">
                Get Started Today
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Input
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className="h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-black dark:focus:border-white"
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className="h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-black dark:focus:border-white"
                    />
                  </div>
                </div>
                <Input
                  type="email"
                  placeholder="Work Email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-black dark:focus:border-white"
                />
                <Input
                  placeholder="Company Name"
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  className="h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-black dark:focus:border-white"
                />
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-black dark:focus:border-white"
                />
                <Input
                  placeholder="Number of Locations"
                  value={formData.locations}
                  onChange={(e) => handleInputChange("locations", e.target.value)}
                  className="h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-black dark:focus:border-white"
                />
                <Textarea
                  placeholder="Tell us about your needs..."
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  className="rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-black dark:focus:border-white"
                  rows={3}
                />
                <Button type="submit" className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 font-semibold py-3 rounded-xl">
                  Request Demo
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-black dark:text-white mb-4">
              Enterprise Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Powerful tools designed for large-scale operations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black rounded-3xl hover:border-black dark:hover:border-white transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-black dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    {feature.description}
                  </p>

                  <div className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Solutions Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-black dark:text-white mb-4">
              Industry Solutions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Tailored solutions for your industry's unique needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {solutions.map((solution, index) => (
              <Card key={index} className="border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black rounded-3xl hover:border-black dark:hover:border-white transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <solution.icon className="w-8 h-8 text-gray-700 dark:text-gray-300" />
                    </div>
                    <Badge className="bg-black dark:bg-white text-white dark:text-black text-xs">
                      {solution.stats}
                    </Badge>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-black dark:text-white mb-3">
                    {solution.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {solution.description}
                  </p>

                  <div className="space-y-2">
                    {solution.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
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
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              See how enterprises are transforming their operations
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
                      <div className="text-sm text-gray-600 dark:text-gray-400">{testimonial.company}</div>
                    </div>
                  </div>

                  <div className="flex justify-between text-sm">
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      {testimonial.stats}
                    </Badge>
                    <span className="text-gray-500">{testimonial.properties}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Pricing Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-black dark:text-white mb-4">
              Enterprise Pricing
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Flexible plans designed to scale with your business
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricing.map((plan, index) => (
              <Card key={index} className={`border-2 ${
                plan.popular 
                  ? "border-black dark:border-white bg-gray-50 dark:bg-gray-900" 
                  : "border-gray-200 dark:border-gray-800 bg-white dark:bg-black"
              } rounded-3xl relative`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-black dark:bg-white text-white dark:text-black px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-black dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <div className="text-3xl font-black text-black dark:text-white mb-2">
                    {plan.price}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {plan.description}
                  </p>

                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button className={`w-full font-semibold py-3 rounded-xl ${
                    plan.popular
                      ? "bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
                      : "bg-gray-100 dark:bg-gray-800 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}>
                    Contact Sales
                  </Button>
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
              Everything you need to know about FixItNow Enterprise
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
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                      expandedFaq === index ? "rotate-180" : ""
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
            Ready to Transform Your Operations?
          </h2>
          <p className="text-xl text-gray-300 dark:text-gray-700 mb-8 max-w-2xl mx-auto">
            Join hundreds of enterprises who have revolutionized their maintenance operations with FixItNow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white dark:bg-black text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 font-semibold px-8 py-4 rounded-full text-lg">
              Schedule Demo
              <Calendar className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" className="border-white dark:border-black text-white dark:text-black hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white font-semibold px-8 py-4 rounded-full text-lg">
              <Phone className="w-5 h-5 mr-2" />
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}