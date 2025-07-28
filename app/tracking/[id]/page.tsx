"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { MapPin, Clock, Phone, MessageCircle, CheckCircle, Navigation, Star, AlertCircle, Wrench } from "lucide-react"
import Link from "next/link"

const trackingData = {
  id: "BK001",
  service: "Plumbing Repair",
  provider: {
    name: "John Smith",
    rating: 4.9,
    image: "/placeholder.svg?height=60&width=60",
    phone: "+1 (555) 123-4567",
    location: {
      lat: 40.7128,
      lng: -74.006,
      address: "En route to your location",
    },
  },
  customer: {
    address: "123 Main St, Apt 4B, New York, NY 10001",
  },
  status: "In Progress",
  progress: 65,
  estimatedCompletion: "3:30 PM",
  startTime: "2:00 PM",
  timeline: [
    {
      time: "2:00 PM",
      status: "Job Started",
      description: "Provider arrived and began assessment",
      completed: true,
      icon: CheckCircle,
    },
    {
      time: "2:15 PM",
      status: "Problem Diagnosed",
      description: "Identified leaky pipe joint and clogged drain",
      completed: true,
      icon: CheckCircle,
    },
    {
      time: "2:30 PM",
      status: "Work in Progress",
      description: "Replacing pipe joint and clearing drain blockage",
      completed: true,
      icon: Wrench,
      current: true,
    },
    {
      time: "3:15 PM",
      status: "Testing & Cleanup",
      description: "Testing repairs and cleaning work area",
      completed: false,
      icon: CheckCircle,
    },
    {
      time: "3:30 PM",
      status: "Job Complete",
      description: "Final inspection and customer approval",
      completed: false,
      icon: CheckCircle,
    },
  ],
  updates: [
    {
      time: "2:45 PM",
      message: "Found additional issue with water pressure. Will fix at no extra cost.",
      type: "info",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      time: "2:30 PM",
      message: "Work is progressing well. Should be completed on schedule.",
      type: "success",
    },
    {
      time: "2:15 PM",
      message: "Issue diagnosed. Starting repair work now.",
      type: "info",
    },
  ],
}

export default function TrackingPage({ params }: { params: { id: string } }) {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">FixItNow</span>
              </Link>
              <span className="text-gray-400">|</span>
              <h1 className="text-xl font-semibold">Live Tracking</h1>
            </div>

            <Link href="/dashboard">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Tracking Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Overview */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={trackingData.provider.image || "/placeholder.svg"} />
                      <AvatarFallback>{trackingData.provider.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-2xl font-bold">{trackingData.service}</h2>
                      <p className="text-gray-600 dark:text-gray-400">{trackingData.provider.name}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm">{trackingData.provider.rating}</span>
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {trackingData.status}
                  </Badge>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Started</p>
                      <p className="font-medium">{trackingData.startTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Est. Completion</p>
                      <p className="font-medium">{trackingData.estimatedCompletion}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Progress</span>
                    <span>{trackingData.progress}%</span>
                  </div>
                  <Progress value={trackingData.progress} className="h-3" />
                </div>

                <div className="flex space-x-3">
                  <Button className="flex-1">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message Provider
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Provider
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Live Map */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>Live Location</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative h-64 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                  {/* Placeholder for map */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                      <p className="font-medium">Provider Location</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {trackingData.provider.location.address}
                      </p>
                    </div>
                  </div>

                  {/* Simulated provider marker */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse" />
                  </div>
                </div>

                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Navigation className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium">Provider is at your location</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Job Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trackingData.timeline.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          item.completed
                            ? "bg-green-100 dark:bg-green-900"
                            : item.current
                              ? "bg-blue-100 dark:bg-blue-900"
                              : "bg-gray-100 dark:bg-gray-800"
                        }`}
                      >
                        <item.icon
                          className={`w-4 h-4 ${
                            item.completed ? "text-green-600" : item.current ? "text-blue-600" : "text-gray-400"
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className={`font-medium ${item.current ? "text-blue-600" : ""}`}>{item.status}</h3>
                          <span className="text-sm text-gray-500">{item.time}</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.description}</p>
                        {item.current && (
                          <Badge className="mt-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            Current Step
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Live Updates */}
            <Card>
              <CardHeader>
                <CardTitle>Live Updates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {trackingData.updates.map((update, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <div className="flex items-start justify-between mb-2">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${
                          update.type === "success"
                            ? "bg-green-500"
                            : update.type === "info"
                              ? "bg-blue-500"
                              : "bg-yellow-500"
                        }`}
                      />
                      <span className="text-xs text-gray-500">{update.time}</span>
                    </div>
                    <p className="text-sm mb-2">{update.message}</p>
                    {update.image && (
                      <img
                        src={update.image || "/placeholder.svg"}
                        alt="Progress update"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Service Details */}
            <Card>
              <CardHeader>
                <CardTitle>Service Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Service ID</p>
                  <p className="font-medium">{trackingData.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
                  <p className="font-medium">{trackingData.customer.address}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Provider Phone</p>
                  <p className="font-medium">{trackingData.provider.phone}</p>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="border-red-200 dark:border-red-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-red-600">
                  <AlertCircle className="w-5 h-5" />
                  <span>Emergency</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  If you have an emergency or urgent concern, contact us immediately.
                </p>
                <Button variant="destructive" className="w-full">
                  <Phone className="w-4 h-4 mr-2" />
                  Emergency Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
