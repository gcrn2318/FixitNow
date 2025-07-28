"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Wrench,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Star,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Shield,
  BarChart3,
} from "lucide-react"
import Link from "next/link"

const dashboardStats = {
  totalUsers: 12450,
  activeProviders: 890,
  totalRevenue: 245000,
  completedJobs: 8750,
  pendingIssues: 23,
  averageRating: 4.8,
}

const recentUsers = [
  {
    id: "U001",
    name: "Alice Johnson",
    email: "alice@example.com",
    joinDate: "Dec 20, 2024",
    status: "Active",
    totalSpent: "$450",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "U002",
    name: "Bob Smith",
    email: "bob@example.com",
    joinDate: "Dec 19, 2024",
    status: "Active",
    totalSpent: "$280",
    image: "/placeholder.svg?height=40&width=40",
  },
]

const recentProviders = [
  {
    id: "P001",
    name: "John Smith",
    service: "Plumbing",
    rating: 4.9,
    completedJobs: 156,
    status: "Active",
    earnings: "$12,450",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "P002",
    name: "Sarah Wilson",
    service: "Electrical",
    rating: 4.8,
    completedJobs: 89,
    status: "Active",
    earnings: "$8,750",
    image: "/placeholder.svg?height=40&width=40",
  },
]

const pendingIssues = [
  {
    id: "I001",
    type: "Dispute",
    customer: "Mike Chen",
    provider: "Lisa Johnson",
    service: "HVAC Repair",
    priority: "High",
    createdAt: "2 hours ago",
    description: "Customer claims work was not completed properly",
  },
  {
    id: "I002",
    type: "Payment",
    customer: "Emma Davis",
    provider: "Tom Wilson",
    service: "Carpentry",
    priority: "Medium",
    createdAt: "4 hours ago",
    description: "Payment processing failed, needs manual review",
  },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">FixItNow</span>
              </Link>
              <span className="text-gray-400">|</span>
              <h1 className="text-xl font-semibold">Admin Dashboard</h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Users</p>
                  <p className="text-2xl font-bold">{dashboardStats.totalUsers.toLocaleString()}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <div className="flex items-center mt-2 text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                +12% this month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Active Providers</p>
                  <p className="text-2xl font-bold">{dashboardStats.activeProviders}</p>
                </div>
                <Wrench className="w-8 h-8 text-purple-600" />
              </div>
              <div className="flex items-center mt-2 text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                +8% this month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
                  <p className="text-2xl font-bold">${dashboardStats.totalRevenue.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
              <div className="flex items-center mt-2 text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                +15% this month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Completed Jobs</p>
                  <p className="text-2xl font-bold">{dashboardStats.completedJobs.toLocaleString()}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              <div className="flex items-center mt-2 text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                +18% this month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Pending Issues</p>
                  <p className="text-2xl font-bold">{dashboardStats.pendingIssues}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-yellow-600" />
              </div>
              <div className="flex items-center mt-2 text-sm text-red-600">
                <AlertTriangle className="w-4 h-4 mr-1" />
                Needs attention
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Avg Rating</p>
                  <p className="text-2xl font-bold">{dashboardStats.averageRating}</p>
                </div>
                <Star className="w-8 h-8 text-yellow-600" />
              </div>
              <div className="flex items-center mt-2 text-sm text-green-600">
                <Star className="w-4 h-4 mr-1" />
                Excellent
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="providers">Providers</TabsTrigger>
            <TabsTrigger value="issues">Issues</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Users */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Recent Users
                    <Link href="/admin/users">
                      <Button variant="outline" size="sm">
                        View All
                      </Button>
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={user.image || "/placeholder.svg"} />
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{user.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                          <p className="text-xs text-gray-500">Joined {user.joinDate}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">{user.status}</Badge>
                        <p className="text-sm font-medium mt-1">{user.totalSpent}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Providers */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Recent Providers
                    <Link href="/admin/providers">
                      <Button variant="outline" size="sm">
                        View All
                      </Button>
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentProviders.map((provider) => (
                    <div key={provider.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={provider.image || "/placeholder.svg"} />
                          <AvatarFallback>{provider.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{provider.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{provider.service}</p>
                          <div className="flex items-center space-x-1 mt-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                            <span className="text-xs">{provider.rating}</span>
                            <span className="text-xs text-gray-500">({provider.completedJobs} jobs)</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">{provider.status}</Badge>
                        <p className="text-sm font-medium mt-1">{provider.earnings}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Pending Issues */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Pending Issues
                  <Link href="/admin/issues">
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingIssues.map((issue) => (
                    <div key={issue.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <Badge variant={issue.priority === "High" ? "destructive" : "default"}>
                              {issue.priority}
                            </Badge>
                            <Badge variant="outline">{issue.type}</Badge>
                          </div>
                          <h3 className="font-medium">{issue.service}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {issue.customer} → {issue.provider}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                          <Button size="sm">Resolve</Button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{issue.description}</p>
                      <p className="text-xs text-gray-500">{issue.createdAt}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  User Management
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                    <Button size="sm">Export</Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={user.image || "/placeholder.svg"} />
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{user.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                          <p className="text-xs text-gray-500">
                            ID: {user.id} • Joined {user.joinDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <Badge variant="outline">{user.status}</Badge>
                          <p className="text-sm font-medium mt-1">Total: {user.totalSpent}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="providers">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Provider Management
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                    <Button size="sm">Export</Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentProviders.map((provider) => (
                    <div key={provider.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={provider.image || "/placeholder.svg"} />
                          <AvatarFallback>{provider.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{provider.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{provider.service}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3 text-yellow-500 fill-current" />
                              <span className="text-xs">{provider.rating}</span>
                            </div>
                            <span className="text-xs text-gray-500">•</span>
                            <span className="text-xs text-gray-500">{provider.completedJobs} jobs</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <Badge variant="outline">{provider.status}</Badge>
                          <p className="text-sm font-medium mt-1">Earned: {provider.earnings}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Shield className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="issues">
            <Card>
              <CardHeader>
                <CardTitle>Issue Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingIssues.map((issue) => (
                    <div key={issue.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant={issue.priority === "High" ? "destructive" : "default"}>
                              {issue.priority} Priority
                            </Badge>
                            <Badge variant="outline">{issue.type}</Badge>
                            <span className="text-xs text-gray-500">ID: {issue.id}</span>
                          </div>
                          <h3 className="text-lg font-medium mb-1">{issue.service}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            Customer: {issue.customer} • Provider: {issue.provider}
                          </p>
                          <p className="text-sm">{issue.description}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                          <Button size="sm">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Resolve
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Created {issue.createdAt}</span>
                        <span>Assigned to: Support Team</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5" />
                    <span>Platform Analytics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Analytics Dashboard</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Detailed analytics and reporting tools</p>
                    <Button>
                      <BarChart3 className="w-4 h-4 mr-2" />
                      View Full Analytics
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-medium">System Status</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Operational
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">API Response Time</span>
                      <span className="text-sm font-medium">120ms</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Database Performance</span>
                      <span className="text-sm font-medium">Excellent</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Active Connections</span>
                      <span className="text-sm font-medium">1,247</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Uptime</span>
                      <span className="text-sm font-medium">99.98%</span>
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
