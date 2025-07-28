"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { withAuth } from "@/contexts/AuthContext"
import {
  User,
  Calendar,
  DollarSign,
  Star,
  MapPin,
  Phone,
  Clock,
  CheckCircle,
  AlertCircle,
  Edit,
  Eye,
  Navigation,
  MessageSquare,
  Filter,
  Search,
  TrendingUp,
  Users,
  Briefcase,
  Award,
  Settings,
  Bell,
  BarChart3,
  Activity,
  Zap,
  Target,
  Wrench,
  ArrowRight,
  Plus,
  Calendar as CalendarIcon,
  TrendingDown,
  Percent,
} from "lucide-react"

interface Job {
  id: string
  customer: string
  service: string
  address: string
  date: string
  time: string
  status: "pending" | "confirmed" | "in-progress" | "completed" | "cancelled"
  price: number
  description: string
  phone: string
  email: string
  urgency: "low" | "medium" | "high"
  estimatedDuration: string
}

interface Stats {
  totalEarnings: number
  completedJobs: number
  averageRating: number
  responseTime: string
  activeJobs: number
  monthlyGrowth: number
}

function ProviderDashboard() {
  const [isAvailable, setIsAvailable] = useState(true)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "John Smith",
    business: "Smith Plumbing Services",
    phone: "+1 (555) 123-4567",
    email: "john@smithplumbing.com",
    address: "123 Business Ave, New York, NY 10001",
    hourlyRate: 75,
    description:
      "Professional plumber with 10+ years of experience. Specializing in residential and commercial plumbing services.",
    workingHours: "8:00 AM - 6:00 PM",
    serviceRadius: "25 miles",
  })

  const [stats, setStats] = useState<Stats>({
    totalEarnings: 12450,
    completedJobs: 89,
    averageRating: 4.8,
    responseTime: "< 15 min",
    activeJobs: 5,
    monthlyGrowth: 23,
  })

  const [jobs, setJobs] = useState<Job[]>([
    {
      id: "1",
      customer: "Sarah Johnson",
      service: "Kitchen Sink Repair",
      address: "456 Oak Street, Brooklyn, NY",
      date: "2024-01-15",
      time: "10:00 AM",
      status: "pending",
      price: 150,
      description: "Kitchen sink is leaking from the faucet base. Water damage starting to show.",
      phone: "+1 (555) 987-6543",
      email: "sarah.j@email.com",
      urgency: "high",
      estimatedDuration: "2 hours",
    },
    {
      id: "2",
      customer: "Mike Chen",
      service: "Bathroom Installation",
      address: "789 Pine Avenue, Queens, NY",
      date: "2024-01-16",
      time: "2:00 PM",
      status: "confirmed",
      price: 850,
      description: "Complete bathroom renovation - toilet, sink, and shower installation.",
      phone: "+1 (555) 456-7890",
      email: "mike.chen@email.com",
      urgency: "medium",
      estimatedDuration: "6 hours",
    },
    {
      id: "3",
      customer: "Emily Davis",
      service: "Water Heater Repair",
      address: "321 Elm Street, Manhattan, NY",
      date: "2024-01-14",
      time: "9:00 AM",
      status: "in-progress",
      price: 300,
      description: "Water heater not producing hot water. Possible heating element issue.",
      phone: "+1 (555) 234-5678",
      email: "emily.davis@email.com",
      urgency: "high",
      estimatedDuration: "3 hours",
    },
    {
      id: "4",
      customer: "Robert Wilson",
      service: "Pipe Replacement",
      address: "654 Maple Drive, Bronx, NY",
      date: "2024-01-13",
      time: "11:00 AM",
      status: "completed",
      price: 450,
      description: "Replace old galvanized pipes with copper pipes in basement.",
      phone: "+1 (555) 345-6789",
      email: "robert.w@email.com",
      urgency: "low",
      estimatedDuration: "4 hours",
    },
    {
      id: "5",
      customer: "Lisa Anderson",
      service: "Drain Cleaning",
      address: "987 Cedar Lane, Staten Island, NY",
      date: "2024-01-12",
      time: "3:00 PM",
      status: "completed",
      price: 120,
      description: "Main drain clogged, water backing up in basement.",
      phone: "+1 (555) 567-8901",
      email: "lisa.anderson@email.com",
      urgency: "medium",
      estimatedDuration: "1.5 hours",
    },
  ])

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.address.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || job.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleJobAction = (jobId: string, action: string) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) => {
        if (job.id === jobId) {
          switch (action) {
            case "accept":
              return { ...job, status: "confirmed" as const }
            case "start":
              return { ...job, status: "in-progress" as const }
            case "complete":
              return { ...job, status: "completed" as const }
            case "decline":
              return { ...job, status: "cancelled" as const }
            default:
              return job
          }
        }
        return job
      }),
    )
  }

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, "_self")
  }

  const handleMessage = (phone: string) => {
    window.open(`sms:${phone}`, "_self")
  }

  const handleNavigate = (address: string) => {
    const encodedAddress = encodeURIComponent(address)
    window.open(`https://maps.google.com?q=${encodedAddress}`, "_blank")
  }

  const handleProfileSave = () => {
    setIsEditingProfile(false)
    // Here you would typically save to backend
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "confirmed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "in-progress":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "text-red-600 dark:text-red-400"
      case "medium":
        return "text-yellow-600 dark:text-yellow-400"
      case "low":
        return "text-green-600 dark:text-green-400"
      default:
        return "text-gray-600 dark:text-gray-400"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-950 dark:via-blue-950 dark:to-indigo-950">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-white/20 dark:border-gray-700/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-6">
              <Link href="/" className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg rotate-3 hover:rotate-0 transition-transform duration-300">
                    <Wrench className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    FixItNow
                  </span>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Provider Dashboard</div>
                </div>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </Button>
              <Link href="/profile">
                <Avatar className="w-10 h-10 ring-2 ring-blue-500/20">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold">
                    JS
                  </AvatarFallback>
                </Avatar>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black mb-2">
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Welcome back, {profileData.name.split(' ')[0]}!
              </span>
              <span className="wave">👋</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              You have <span className="font-semibold text-blue-600">{stats.activeJobs} active jobs</span> and{" "}
              <span className="font-semibold text-green-600">{stats.monthlyGrowth}% growth</span> this month
            </p>
          </div>

          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            {/* Availability Toggle */}
            <div className="flex items-center space-x-3 bg-white dark:bg-gray-800 px-4 py-2 rounded-full border-2 border-gray-200 dark:border-gray-700">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Available</span>
              <Switch
                checked={isAvailable}
                onCheckedChange={setIsAvailable}
                className="data-[state=checked]:bg-green-600"
              />
              <div className={`w-3 h-3 rounded-full ${isAvailable ? "bg-green-500" : "bg-red-500"}`} />
            </div>

            {/* Notifications */}
            <Button
              variant="outline"
              size="icon"
              className="relative border-2 border-gray-200 dark:border-gray-700 bg-transparent"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
            </Button>

            {/* Settings */}
            <Link href="/settings">
              <Button
                variant="outline"
                size="icon"
                className="border-2 border-gray-200 dark:border-gray-700 bg-transparent"
              >
                <Settings className="w-5 h-5" />
              </Button>
            </Link>

            {/* Quick Action */}
            <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-full px-6 py-3 shadow-lg">
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-6 mb-12">
          <Card className="border-0 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-xs text-green-600 dark:text-green-400 font-medium">+12%</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                ${stats.totalEarnings.toLocaleString()}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Earnings</p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">+8</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stats.completedJobs}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Completed Jobs</p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">+0.2</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stats.averageRating}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Average Rating</p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-xs text-purple-600 dark:text-purple-400 font-medium">-2min</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stats.responseTime}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Response Time</p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-xs text-orange-600 dark:text-orange-400 font-medium">+2</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stats.activeJobs}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Jobs</p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-xs text-green-600 dark:text-green-400 font-medium">+5%</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">+{stats.monthlyGrowth}%</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Monthly Growth</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="jobs" className="space-y-8">
          <TabsList className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-2 grid grid-cols-2 lg:grid-cols-4 gap-1">
            <TabsTrigger
              value="jobs"
              className="rounded-xl px-4 py-3 font-semibold data-[state=active]:bg-black dark:data-[state=active]:bg-white data-[state=active]:text-white dark:data-[state=active]:text-black"
            >
              <Briefcase className="w-4 h-4 mr-2" />
              Jobs
            </TabsTrigger>
            <TabsTrigger
              value="profile"
              className="rounded-xl px-4 py-3 font-semibold data-[state=active]:bg-black dark:data-[state=active]:bg-white data-[state=active]:text-white dark:data-[state=active]:text-black"
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="schedule"
              className="rounded-xl px-4 py-3 font-semibold data-[state=active]:bg-black dark:data-[state=active]:bg-white data-[state=active]:text-white dark:data-[state=active]:text-black"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Schedule
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="rounded-xl px-4 py-3 font-semibold data-[state=active]:bg-black dark:data-[state=active]:bg-white data-[state=active]:text-white dark:data-[state=active]:text-black"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Jobs Tab */}
          <TabsContent value="jobs" className="space-y-6">
            {/* Search and Filter */}
            <Card className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <Input
                        placeholder="Search jobs by customer, service, or address..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-40 h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                        <Filter className="w-4 h-4 mr-2" />
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
              </CardContent>
            </Card>

            {/* Jobs List */}
            <div className="grid gap-6">
              {filteredJobs.map((job) => (
                <Card
                  key={job.id}
                  className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{job.service}</h3>
                            <p className="text-gray-600 dark:text-gray-400">{job.customer}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getStatusColor(job.status)}>
                              {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                            </Badge>
                            <AlertCircle className={`w-4 h-4 ${getUrgencyColor(job.urgency)}`} />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600 dark:text-gray-400 truncate">{job.address}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600 dark:text-gray-400">
                              {job.date} at {job.time}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600 dark:text-gray-400">{job.estimatedDuration}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <DollarSign className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-900 dark:text-white font-semibold">${job.price}</span>
                          </div>
                        </div>

                        <p className="text-gray-600 dark:text-gray-400 text-sm">{job.description}</p>
                      </div>

                      <div className="flex flex-col lg:flex-row items-stretch lg:items-center space-y-2 lg:space-y-0 lg:space-x-2">
                        {/* Communication Buttons */}
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCall(job.phone)}
                            className="border-2 border-gray-200 dark:border-gray-700"
                          >
                            <Phone className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleMessage(job.phone)}
                            className="border-2 border-gray-200 dark:border-gray-700"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleNavigate(job.address)}
                            className="border-2 border-gray-200 dark:border-gray-700"
                          >
                            <Navigation className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-2">
                          {job.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => handleJobAction(job.id, "accept")}
                                className="bg-green-600 hover:bg-green-700 text-white border-2 border-green-600"
                              >
                                Accept
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleJobAction(job.id, "decline")}
                                className="border-2 border-red-500 text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                              >
                                Decline
                              </Button>
                            </>
                          )}
                          {job.status === "confirmed" && (
                            <Button
                              size="sm"
                              onClick={() => handleJobAction(job.id, "start")}
                              className="bg-blue-600 hover:bg-blue-700 text-white border-2 border-blue-600"
                            >
                              Start Job
                            </Button>
                          )}
                          {job.status === "in-progress" && (
                            <Button
                              size="sm"
                              onClick={() => handleJobAction(job.id, "complete")}
                              className="bg-purple-600 hover:bg-purple-700 text-white border-2 border-purple-600"
                            >
                              Complete
                            </Button>
                          )}

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedJob(job)}
                                className="border-2 border-gray-200 dark:border-gray-700"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Job Details</DialogTitle>
                              </DialogHeader>
                              {selectedJob && (
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Customer
                                      </label>
                                      <p className="text-gray-900 dark:text-white">{selectedJob.customer}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Service
                                      </label>
                                      <p className="text-gray-900 dark:text-white">{selectedJob.service}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Phone
                                      </label>
                                      <p className="text-gray-900 dark:text-white">{selectedJob.phone}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Email
                                      </label>
                                      <p className="text-gray-900 dark:text-white">{selectedJob.email}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Date & Time
                                      </label>
                                      <p className="text-gray-900 dark:text-white">
                                        {selectedJob.date} at {selectedJob.time}
                                      </p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Price
                                      </label>
                                      <p className="text-gray-900 dark:text-white font-semibold">
                                        ${selectedJob.price}
                                      </p>
                                    </div>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                      Address
                                    </label>
                                    <p className="text-gray-900 dark:text-white">{selectedJob.address}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                      Description
                                    </label>
                                    <p className="text-gray-900 dark:text-white">{selectedJob.description}</p>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Profile Information</CardTitle>
                <Button
                  variant="outline"
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                  className="border-2 border-gray-200 dark:border-gray-700"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  {isEditingProfile ? "Cancel" : "Edit"}
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {isEditingProfile ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Name</label>
                      <Input
                        value={profileData.name}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, name: e.target.value }))}
                        className="h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Business Name
                      </label>
                      <Input
                        value={profileData.business}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, business: e.target.value }))}
                        className="h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Phone</label>
                      <Input
                        value={profileData.phone}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, phone: e.target.value }))}
                        className="h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Email</label>
                      <Input
                        value={profileData.email}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
                        className="h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Hourly Rate ($)
                      </label>
                      <Input
                        type="number"
                        value={profileData.hourlyRate}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, hourlyRate: Number(e.target.value) }))}
                        className="h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Service Radius
                      </label>
                      <Input
                        value={profileData.serviceRadius}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, serviceRadius: e.target.value }))}
                        className="h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Address</label>
                      <Input
                        value={profileData.address}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, address: e.target.value }))}
                        className="h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Description
                      </label>
                      <Textarea
                        value={profileData.description}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, description: e.target.value }))}
                        className="rounded-xl border-2 border-gray-200 dark:border-gray-700 min-h-[100px]"
                      />
                    </div>
                    <div className="md:col-span-2 flex space-x-4">
                      <Button
                        onClick={handleProfileSave}
                        className="bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-gray-900 border-2 border-gray-900 dark:border-white"
                      >
                        Save Changes
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditingProfile(false)}
                        className="border-2 border-gray-200 dark:border-gray-700"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Name</label>
                        <p className="text-lg text-gray-900 dark:text-white">{profileData.name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Business</label>
                        <p className="text-lg text-gray-900 dark:text-white">{profileData.business}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Phone</label>
                        <p className="text-lg text-gray-900 dark:text-white">{profileData.phone}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Email</label>
                        <p className="text-lg text-gray-900 dark:text-white">{profileData.email}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Hourly Rate</label>
                        <p className="text-lg text-gray-900 dark:text-white">${profileData.hourlyRate}/hour</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Service Radius</label>
                        <p className="text-lg text-gray-900 dark:text-white">{profileData.serviceRadius}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Working Hours</label>
                        <p className="text-lg text-gray-900 dark:text-white">{profileData.workingHours}</p>
                      </div>
                    </div>
                    <div className="md:col-span-2 space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Address</label>
                        <p className="text-lg text-gray-900 dark:text-white">{profileData.address}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Description</label>
                        <p className="text-gray-900 dark:text-white">{profileData.description}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-6">
            <Card className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle>Working Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Weekly Schedule</h3>
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                      <div
                        key={day}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <span className="font-medium text-gray-900 dark:text-white">{day}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600 dark:text-gray-400">8:00 AM - 6:00 PM</span>
                          <Switch defaultChecked={day !== "Sunday"} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Upcoming Jobs</h3>
                    <div className="space-y-3">
                      {jobs
                        .filter((job) => job.status === "confirmed" || job.status === "in-progress")
                        .map((job) => (
                          <div key={job.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">{job.service}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{job.customer}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">{job.date}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{job.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5" />
                    <span>Performance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Job Completion Rate</span>
                      <span className="font-semibold text-gray-900 dark:text-white">94%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Customer Satisfaction</span>
                      <span className="font-semibold text-gray-900 dark:text-white">4.8/5</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">On-Time Arrival</span>
                      <span className="font-semibold text-gray-900 dark:text-white">96%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="w-5 h-5" />
                    <span>Earnings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">This Month</span>
                      <span className="font-semibold text-gray-900 dark:text-white">$3,240</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Last Month</span>
                      <span className="font-semibold text-gray-900 dark:text-white">$2,890</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Growth</span>
                      <span className="font-semibold text-green-600 dark:text-green-400">+12%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>Customers</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Total Customers</span>
                      <span className="font-semibold text-gray-900 dark:text-white">67</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Repeat Customers</span>
                      <span className="font-semibold text-gray-900 dark:text-white">23</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Referrals</span>
                      <span className="font-semibold text-gray-900 dark:text-white">12</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default withAuth(ProviderDashboard, ['provider'])
