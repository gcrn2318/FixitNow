"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Edit3,
  Star,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Award,
  Shield,
  Camera,
  Settings,
  Bell,
  Heart,
  Clock,
  Wrench,
  CheckCircle2,
  Upload,
  Share2,
  Briefcase,
  Activity,
  AlertCircle,
  Lock,
} from "lucide-react"

// Mock user data - in real app this would come from API/auth
const mockUser = {
  type: "provider", // "customer" or "provider"
  id: "USR001",
  firstName: "John",
  lastName: "Smith",
  email: "john.smith@example.com",
  phone: "+1 (555) 123-4567",
  avatar: "/placeholder.svg?height=120&width=120",
  joinDate: "March 2023",
  verified: true,

  // Customer specific
  totalBookings: 24,
  totalSpent: 2850,
  favoriteProviders: 8,

  // Provider specific
  businessName: "Smith Professional Services",
  services: ["Plumbing", "Electrical", "HVAC"],
  rating: 4.9,
  totalReviews: 156,
  completedJobs: 189,
  responseTime: "< 5 min",
  earnings: {
    thisMonth: 4250,
    lastMonth: 3890,
    total: 45600,
  },
  availability: "Available",
  serviceRadius: 25,
  hourlyRate: 85,
  experience: "8+ years",
  certifications: ["Licensed Professional", "Insured & Bonded", "EPA Certified"],

  // Common
  address: "123 Main Street, New York, NY 10001",
  bio: "Professional service provider with over 8 years of experience. Specializing in residential and commercial plumbing, electrical work, and HVAC systems. Committed to quality work and customer satisfaction.",
  preferences: {
    notifications: true,
    emailUpdates: true,
    smsAlerts: false,
    darkMode: false,
  },
}

const recentActivity = [
  {
    id: 1,
    type: "job_completed",
    title: "Kitchen Sink Repair",
    customer: "Sarah Johnson",
    date: "2 hours ago",
    amount: "$150",
    rating: 5,
  },
  {
    id: 2,
    type: "job_booked",
    title: "Electrical Outlet Installation",
    customer: "Mike Wilson",
    date: "1 day ago",
    amount: "$120",
    status: "scheduled",
  },
  {
    id: 3,
    type: "review_received",
    title: "Excellent plumbing work!",
    customer: "Lisa Chen",
    date: "3 days ago",
    rating: 5,
  },
]

const portfolio = [
  {
    id: 1,
    title: "Modern Kitchen Renovation",
    category: "Plumbing",
    image: "/placeholder.svg?height=200&width=300",
    description: "Complete kitchen plumbing overhaul with new fixtures",
  },
  {
    id: 2,
    title: "Smart Home Electrical Setup",
    category: "Electrical",
    image: "/placeholder.svg?height=200&width=300",
    description: "Installation of smart switches and outlets",
  },
  {
    id: 3,
    title: "HVAC System Maintenance",
    category: "HVAC",
    image: "/placeholder.svg?height=200&width=300",
    description: "Annual maintenance and filter replacement",
  },
]

export default function ProfilePage() {
  const [user, setUser] = useState(mockUser)
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [editForm, setEditForm] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    bio: user.bio,
    hourlyRate: user.hourlyRate,
    serviceRadius: user.serviceRadius,
  })

  const handleSave = () => {
    setUser({ ...user, ...editForm })
    setIsEditing(false)
  }

  const CustomerProfile = () => (
    <div className="space-y-8">
      {/* Customer Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-black dark:bg-white rounded-2xl flex items-center justify-center">
              <Calendar className="w-8 h-8 text-white dark:text-black" />
            </div>
            <div className="text-3xl font-black text-black dark:text-white mb-2">{user.totalBookings}</div>
            <p className="text-gray-600 dark:text-gray-400 font-medium">Total Bookings</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-black dark:bg-white rounded-2xl flex items-center justify-center">
              <DollarSign className="w-8 h-8 text-white dark:text-black" />
            </div>
            <div className="text-3xl font-black text-black dark:text-white mb-2">${user.totalSpent}</div>
            <p className="text-gray-600 dark:text-gray-400 font-medium">Total Spent</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-black dark:bg-white rounded-2xl flex items-center justify-center">
              <Heart className="w-8 h-8 text-white dark:text-black" />
            </div>
            <div className="text-3xl font-black text-black dark:text-white mb-2">{user.favoriteProviders}</div>
            <p className="text-gray-600 dark:text-gray-400 font-medium">Favorite Providers</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <CardHeader className="border-b-2 border-gray-100 dark:border-gray-800">
          <CardTitle className="text-2xl font-black text-black dark:text-white flex items-center">
            <Clock className="w-6 h-6 mr-3" />
            Recent Bookings
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {[1, 2, 3].map((booking) => (
              <div
                key={booking}
                className="flex items-center justify-between p-4 border-2 border-gray-100 dark:border-gray-800 rounded-xl hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-black dark:bg-white rounded-xl flex items-center justify-center">
                    <Wrench className="w-6 h-6 text-white dark:text-black" />
                  </div>
                  <div>
                    <h4 className="font-bold text-black dark:text-white">Kitchen Sink Repair</h4>
                    <p className="text-gray-600 dark:text-gray-400">John Smith • Dec 15, 2024</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className="bg-black dark:bg-white text-white dark:text-black border-0 mb-2">Completed</Badge>
                  <div className="text-xl font-bold text-black dark:text-white">$150</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const ProviderProfile = () => (
    <div className="space-y-8">
      {/* Provider Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-black dark:bg-white rounded-2xl flex items-center justify-center">
              <Star className="w-8 h-8 text-white dark:text-black" />
            </div>
            <div className="text-3xl font-black text-black dark:text-white mb-2">{user.rating}</div>
            <p className="text-gray-600 dark:text-gray-400 font-medium">Rating</p>
            <p className="text-xs text-gray-500 dark:text-gray-500">{user.totalReviews} reviews</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-black dark:bg-white rounded-2xl flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-white dark:text-black" />
            </div>
            <div className="text-3xl font-black text-black dark:text-white mb-2">{user.completedJobs}</div>
            <p className="text-gray-600 dark:text-gray-400 font-medium">Jobs Completed</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-black dark:bg-white rounded-2xl flex items-center justify-center">
              <DollarSign className="w-8 h-8 text-white dark:text-black" />
            </div>
            <div className="text-3xl font-black text-black dark:text-white mb-2">${user.earnings.thisMonth}</div>
            <p className="text-gray-600 dark:text-gray-400 font-medium">This Month</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-black dark:bg-white rounded-2xl flex items-center justify-center">
              <Clock className="w-8 h-8 text-white dark:text-black" />
            </div>
            <div className="text-3xl font-black text-black dark:text-white mb-2">{user.responseTime}</div>
            <p className="text-gray-600 dark:text-gray-400 font-medium">Response Time</p>
          </CardContent>
        </Card>
      </div>

      {/* Services & Portfolio */}
      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <CardHeader className="border-b-2 border-gray-100 dark:border-gray-800">
            <CardTitle className="text-2xl font-black text-black dark:text-white flex items-center">
              <Wrench className="w-6 h-6 mr-3" />
              Services Offered
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {user.services.map((service, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border-2 border-gray-100 dark:border-gray-800 rounded-xl"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-black dark:bg-white rounded-lg flex items-center justify-center">
                      <Wrench className="w-5 h-5 text-white dark:text-black" />
                    </div>
                    <span className="font-bold text-black dark:text-white">{service}</span>
                  </div>
                  <Badge className="bg-gray-100 dark:bg-gray-800 text-black dark:text-white border-2 border-gray-200 dark:border-gray-700">
                    Active
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <CardHeader className="border-b-2 border-gray-100 dark:border-gray-800">
            <CardTitle className="text-2xl font-black text-black dark:text-white flex items-center">
              <Award className="w-6 h-6 mr-3" />
              Certifications
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {user.certifications.map((cert, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 border-2 border-gray-100 dark:border-gray-800 rounded-xl"
                >
                  <Shield className="w-5 h-5 text-black dark:text-white" />
                  <span className="font-medium text-black dark:text-white">{cert}</span>
                  <CheckCircle2 className="w-4 h-4 text-black dark:text-white ml-auto" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <CardHeader className="border-b-2 border-gray-100 dark:border-gray-800">
          <CardTitle className="text-2xl font-black text-black dark:text-white flex items-center">
            <Activity className="w-6 h-6 mr-3" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-4 border-2 border-gray-100 dark:border-gray-800 rounded-xl hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-black dark:bg-white rounded-xl flex items-center justify-center">
                    {activity.type === "job_completed" && (
                      <CheckCircle2 className="w-6 h-6 text-white dark:text-black" />
                    )}
                    {activity.type === "job_booked" && <Calendar className="w-6 h-6 text-white dark:text-black" />}
                    {activity.type === "review_received" && <Star className="w-6 h-6 text-white dark:text-black" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-black dark:text-white">{activity.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {activity.customer} • {activity.date}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  {activity.rating && (
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(activity.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-black dark:text-white fill-current" />
                      ))}
                    </div>
                  )}
                  {activity.amount && (
                    <div className="text-xl font-bold text-black dark:text-white">{activity.amount}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <Avatar className="w-32 h-32 border-4 border-gray-200 dark:border-gray-700">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-black dark:bg-white text-white dark:text-black text-3xl font-black">
                      {user.firstName[0]}
                      {user.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    className="absolute -bottom-2 -right-2 w-10 h-10 bg-black dark:bg-white text-white dark:text-black border-2 border-white dark:border-black rounded-full hover:bg-gray-800 dark:hover:bg-gray-200"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                  {user.verified && (
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-black dark:bg-white rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-white dark:text-black" />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-4xl font-black text-black dark:text-white">
                      {user.firstName} {user.lastName}
                    </h1>
                    <Badge className="bg-black dark:bg-white text-white dark:text-black border-0 px-3 py-1">
                      {user.type === "provider" ? "Service Provider" : "Customer"}
                    </Badge>
                  </div>

                  {user.type === "provider" && user.businessName && (
                    <p className="text-xl text-gray-600 dark:text-gray-400 font-medium mb-2">{user.businessName}</p>
                  )}

                  <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400 mb-4">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span>{user.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {user.joinDate}</span>
                    </div>
                  </div>

                  {user.type === "provider" && (
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-1">
                        <Star className="w-5 h-5 text-black dark:text-white fill-current" />
                        <span className="font-bold text-black dark:text-white">{user.rating}</span>
                        <span className="text-gray-600 dark:text-gray-400">({user.totalReviews} reviews)</span>
                      </div>
                      <Badge className="bg-gray-100 dark:bg-gray-800 text-black dark:text-white border-2 border-gray-200 dark:border-gray-700">
                        {user.availability}
                      </Badge>
                      <span className="text-gray-600 dark:text-gray-400">${user.hourlyRate}/hour</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 border-2 border-black dark:border-white font-bold px-6"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  {isEditing ? "Cancel" : "Edit Profile"}
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white hover:border-gray-300 dark:hover:border-gray-600 font-bold px-6"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Profile
                </Button>
              </div>
            </div>

            {user.bio && (
              <div className="mt-6 pt-6 border-t-2 border-gray-100 dark:border-gray-800">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{user.bio}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Edit Form */}
        {isEditing && (
          <Card className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 mb-8">
            <CardHeader className="border-b-2 border-gray-100 dark:border-gray-800">
              <CardTitle className="text-2xl font-black text-black dark:text-white">Edit Profile</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-2 text-black dark:text-white">First Name</label>
                  <Input
                    value={editForm.firstName}
                    onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                    className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-black dark:text-white">Last Name</label>
                  <Input
                    value={editForm.lastName}
                    onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                    className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 text-black dark:text-white">Bio</label>
                <Textarea
                  value={editForm.bio}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                  className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white min-h-[100px]"
                  placeholder="Tell us about yourself..."
                />
              </div>

              {user.type === "provider" && (
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold mb-2 text-black dark:text-white">Hourly Rate ($)</label>
                    <Input
                      type="number"
                      value={editForm.hourlyRate}
                      onChange={(e) => setEditForm({ ...editForm, hourlyRate: Number.parseInt(e.target.value) })}
                      className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 text-black dark:text-white">
                      Service Radius (miles)
                    </label>
                    <Input
                      type="number"
                      value={editForm.serviceRadius}
                      onChange={(e) => setEditForm({ ...editForm, serviceRadius: Number.parseInt(e.target.value) })}
                      className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white"
                    />
                  </div>
                </div>
              )}

              <div className="flex space-x-4">
                <Button
                  onClick={handleSave}
                  className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 font-bold px-8"
                >
                  Save Changes
                </Button>
                <Button
                  onClick={() => setIsEditing(false)}
                  variant="outline"
                  className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white hover:border-gray-300 dark:hover:border-gray-600 font-bold px-8"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Profile Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-2">
            <TabsTrigger
              value="overview"
              className="rounded-xl px-6 py-3 font-bold data-[state=active]:bg-black dark:data-[state=active]:bg-white data-[state=active]:text-white dark:data-[state=active]:text-black"
            >
              Overview
            </TabsTrigger>
            {user.type === "provider" && (
              <TabsTrigger
                value="portfolio"
                className="rounded-xl px-6 py-3 font-bold data-[state=active]:bg-black dark:data-[state=active]:bg-white data-[state=active]:text-white dark:data-[state=active]:text-black"
              >
                Portfolio
              </TabsTrigger>
            )}
            <TabsTrigger
              value="reviews"
              className="rounded-xl px-6 py-3 font-bold data-[state=active]:bg-black dark:data-[state=active]:bg-white data-[state=active]:text-white dark:data-[state=active]:text-black"
            >
              Reviews
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="rounded-xl px-6 py-3 font-bold data-[state=active]:bg-black dark:data-[state=active]:bg-white data-[state=active]:text-white dark:data-[state=active]:text-black"
            >
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            {user.type === "customer" ? <CustomerProfile /> : <ProviderProfile />}
          </TabsContent>

          <TabsContent value="portfolio">
            {user.type === "provider" && (
              <Card className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <CardHeader className="border-b-2 border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-black text-black dark:text-white flex items-center">
                      <Briefcase className="w-6 h-6 mr-3" />
                      Portfolio
                    </CardTitle>
                    <Button className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 font-bold">
                      <Upload className="w-4 h-4 mr-2" />
                      Add Work
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {portfolio.map((item) => (
                      <Card
                        key={item.id}
                        className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300"
                      >
                        <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-t-xl overflow-hidden">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <Badge className="bg-gray-100 dark:bg-gray-800 text-black dark:text-white border-2 border-gray-200 dark:border-gray-700 mb-2">
                            {item.category}
                          </Badge>
                          <h3 className="font-bold text-black dark:text-white mb-2">{item.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="reviews">
            <Card className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <CardHeader className="border-b-2 border-gray-100 dark:border-gray-800">
                <CardTitle className="text-2xl font-black text-black dark:text-white flex items-center">
                  <Star className="w-6 h-6 mr-3" />
                  {user.type === "provider" ? "Customer Reviews" : "Reviews Given"}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {[1, 2, 3].map((review) => (
                    <div key={review} className="border-2 border-gray-100 dark:border-gray-800 rounded-xl p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <Avatar className="w-12 h-12 border-2 border-gray-200 dark:border-gray-700">
                            <AvatarImage src="/placeholder.svg?height=48&width=48" />
                            <AvatarFallback className="bg-black dark:bg-white text-white dark:text-black font-bold">
                              SC
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-bold text-black dark:text-white">Sarah Chen</h4>
                            <p className="text-gray-600 dark:text-gray-400">2 days ago</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-black dark:text-white fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        "Excellent work! John was professional, punctual, and did a fantastic job fixing our kitchen
                        sink. The quality of work exceeded our expectations. Highly recommended!"
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <CardHeader className="border-b-2 border-gray-100 dark:border-gray-800">
                  <CardTitle className="text-2xl font-black text-black dark:text-white flex items-center">
                    <Bell className="w-6 h-6 mr-3" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-black dark:text-white">Push Notifications</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Receive notifications on your device</p>
                    </div>
                    <Switch checked={user.preferences.notifications} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-black dark:text-white">Email Updates</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Get updates via email</p>
                    </div>
                    <Switch checked={user.preferences.emailUpdates} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-black dark:text-white">SMS Alerts</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Receive SMS notifications</p>
                    </div>
                    <Switch checked={user.preferences.smsAlerts} />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <CardHeader className="border-b-2 border-gray-100 dark:border-gray-800">
                  <CardTitle className="text-2xl font-black text-black dark:text-white flex items-center">
                    <Settings className="w-6 h-6 mr-3" />
                    Account Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-black dark:text-white">Dark Mode</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Toggle dark/light theme</p>
                    </div>
                    <Switch checked={user.preferences.darkMode} />
                  </div>
                  <Button
                    variant="outline"
                    className="w-full border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white hover:border-gray-300 dark:hover:border-gray-600 font-bold"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Change Password
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-2 border-red-200 dark:border-red-800 bg-white dark:bg-gray-900 text-red-600 dark:text-red-400 hover:border-red-300 dark:hover:border-red-700 font-bold"
                  >
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
