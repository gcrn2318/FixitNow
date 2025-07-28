"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Clock,
  Star,
  Activity,
  BarChart3,
  PieChartIcon,
  Calendar,
  Filter,
} from "lucide-react"

const revenueData = [
  { month: "Jan", revenue: 12000, bookings: 45, satisfaction: 4.8 },
  { month: "Feb", revenue: 15000, bookings: 52, satisfaction: 4.7 },
  { month: "Mar", revenue: 18000, bookings: 61, satisfaction: 4.9 },
  { month: "Apr", revenue: 22000, bookings: 73, satisfaction: 4.8 },
  { month: "May", revenue: 25000, bookings: 84, satisfaction: 4.9 },
  { month: "Jun", revenue: 28000, bookings: 92, satisfaction: 4.9 },
]

const serviceData = [
  { name: "Plumbing", value: 35, color: "#000000" },
  { name: "Electrical", value: 25, color: "#404040" },
  { name: "HVAC", value: 20, color: "#606060" },
  { name: "Carpentry", value: 12, color: "#808080" },
  { name: "Other", value: 8, color: "#A0A0A0" },
]

const performanceData = [
  { time: "00:00", activeUsers: 120, responseTime: 2.3, satisfaction: 4.8 },
  { time: "04:00", activeUsers: 80, responseTime: 1.9, satisfaction: 4.9 },
  { time: "08:00", activeUsers: 350, responseTime: 3.1, satisfaction: 4.7 },
  { time: "12:00", activeUsers: 520, responseTime: 2.8, satisfaction: 4.8 },
  { time: "16:00", activeUsers: 480, responseTime: 2.5, satisfaction: 4.9 },
  { time: "20:00", activeUsers: 290, responseTime: 2.1, satisfaction: 4.8 },
]

const kpiData = [
  {
    title: "Total Revenue",
    value: "$120,000",
    change: "+15.3%",
    trend: "up",
    icon: DollarSign,
    description: "Monthly recurring revenue",
  },
  {
    title: "Active Users",
    value: "2,847",
    change: "+8.2%",
    trend: "up",
    icon: Users,
    description: "Monthly active customers",
  },
  {
    title: "Avg Response Time",
    value: "2.4 min",
    change: "-12.5%",
    trend: "down",
    icon: Clock,
    description: "Provider response time",
  },
  {
    title: "Satisfaction Score",
    value: "4.8/5",
    change: "+0.2",
    trend: "up",
    icon: Star,
    description: "Customer satisfaction rating",
  },
]

export function AdvancedCharts() {
  const [timeRange, setTimeRange] = useState("30d")
  const [chartType, setChartType] = useState("revenue")

  return (
    <div className="min-h-screen bg-white dark:bg-black p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black text-black dark:text-white mb-2">Analytics Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">Real-time insights and performance metrics</p>
          </div>

          <div className="flex items-center space-x-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32 border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-black border-gray-200 dark:border-gray-800">
                <SelectItem value="7d">7 Days</SelectItem>
                <SelectItem value="30d">30 Days</SelectItem>
                <SelectItem value="90d">90 Days</SelectItem>
                <SelectItem value="1y">1 Year</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiData.map((kpi, index) => (
            <Card key={index} className="border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-900 rounded-2xl flex items-center justify-center">
                    <kpi.icon className="w-6 h-6 text-black dark:text-white" />
                  </div>
                  <Badge
                    className={`${
                      kpi.trend === "up"
                        ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                        : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                    } border-0`}
                  >
                    {kpi.trend === "up" ? (
                      <TrendingUp className="w-3 h-3 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mr-1" />
                    )}
                    {kpi.change}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{kpi.title}</h3>
                  <div className="text-3xl font-black text-black dark:text-white">{kpi.value}</div>
                  <p className="text-xs text-gray-500 dark:text-gray-500">{kpi.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Chart */}
          <Card className="border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-black dark:text-white" />
                <span className="text-black dark:text-white">Revenue Trends</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "2px solid #e5e7eb",
                      borderRadius: "12px",
                      color: "black",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#000000"
                    fill="#000000"
                    fillOpacity={0.1}
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Service Distribution */}
          <Card className="border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PieChartIcon className="w-5 h-5 text-black dark:text-white" />
                <span className="text-black dark:text-white">Service Distribution</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={serviceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {serviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "2px solid #e5e7eb",
                      borderRadius: "12px",
                      color: "black",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <Card className="border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-black dark:text-white" />
              <span className="text-black dark:text-white">Real-time Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="time" stroke="#6b7280" />
                <YAxis yAxisId="left" stroke="#6b7280" />
                <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "2px solid #e5e7eb",
                    borderRadius: "12px",
                    color: "black",
                  }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="activeUsers" fill="#000000" fillOpacity={0.8} name="Active Users" />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="responseTime"
                  stroke="#666666"
                  strokeWidth={3}
                  name="Response Time (min)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="satisfaction"
                  stroke="#333333"
                  strokeWidth={3}
                  name="Satisfaction Score"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Detailed Metrics */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
            <CardHeader>
              <CardTitle className="text-black dark:text-white">Top Performers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "John Smith", service: "Plumbing", rating: 4.9, jobs: 156 },
                { name: "Sarah Johnson", service: "Electrical", rating: 4.8, jobs: 134 },
                { name: "Mike Wilson", service: "HVAC", rating: 4.7, jobs: 128 },
              ].map((provider, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-950 rounded-xl"
                >
                  <div>
                    <div className="font-semibold text-black dark:text-white">{provider.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{provider.service}</div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-black dark:text-white" />
                      <span className="font-semibold text-black dark:text-white">{provider.rating}</span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{provider.jobs} jobs</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
            <CardHeader>
              <CardTitle className="text-black dark:text-white">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { action: "New booking", user: "Alice Johnson", time: "2 min ago" },
                { action: "Service completed", user: "Bob Smith", time: "5 min ago" },
                { action: "Payment received", user: "Carol Davis", time: "8 min ago" },
                { action: "Review submitted", user: "David Wilson", time: "12 min ago" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-950 rounded-xl">
                  <div className="w-2 h-2 bg-black dark:bg-white rounded-full"></div>
                  <div className="flex-1">
                    <div className="font-medium text-black dark:text-white">{activity.action}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{activity.user}</div>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-500">{activity.time}</div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
            <CardHeader>
              <CardTitle className="text-black dark:text-white">System Health</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { metric: "API Response Time", value: "120ms", status: "good" },
                { metric: "Database Performance", value: "98%", status: "good" },
                { metric: "Active Connections", value: "1,247", status: "good" },
                { metric: "Error Rate", value: "0.02%", status: "good" },
              ].map((health, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-950 rounded-xl"
                >
                  <div>
                    <div className="font-medium text-black dark:text-white">{health.metric}</div>
                    <div className="text-lg font-bold text-black dark:text-white">{health.value}</div>
                  </div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
