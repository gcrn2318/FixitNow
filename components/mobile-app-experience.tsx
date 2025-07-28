"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Smartphone,
  Download,
  Star,
  Bell,
  MapPin,
  Clock,
  Shield,
  Camera,
  Mic,
  QrCode,
  Wifi,
  Battery,
  Signal,
  Home,
  Search,
  MessageCircle,
  User,
  ArrowLeft,
  Heart,
  MoreVertical,
  Send,
} from "lucide-react"

export function MobileAppExperience() {
  const [currentScreen, setCurrentScreen] = useState("home")
  const [notifications, setNotifications] = useState(3)

  const mockServices = [
    { name: "Plumbing", icon: "🔧", color: "bg-blue-100 dark:bg-blue-900" },
    { name: "Electrical", icon: "⚡", color: "bg-yellow-100 dark:bg-yellow-900" },
    { name: "Cleaning", icon: "🧽", color: "bg-green-100 dark:bg-green-900" },
    { name: "HVAC", icon: "❄️", color: "bg-purple-100 dark:bg-purple-900" },
  ]

  const mockProviders = [
    {
      name: "John Smith",
      service: "Plumbing Expert",
      rating: 4.9,
      distance: "2.3 mi",
      price: "$85/hr",
      image: "/placeholder.svg?height=60&width=60",
      available: true,
    },
    {
      name: "Sarah Johnson",
      service: "Electrical Pro",
      rating: 4.8,
      distance: "3.1 mi",
      price: "$75/hr",
      image: "/placeholder.svg?height=60&width=60",
      available: true,
    },
  ]

  const renderMobileFrame = (content: React.ReactNode) => (
    <div className="mx-auto max-w-sm">
      <div className="relative bg-black rounded-[3rem] p-2 shadow-2xl">
        {/* Phone Frame */}
        <div className="bg-white dark:bg-black rounded-[2.5rem] overflow-hidden">
          {/* Status Bar */}
          <div className="flex items-center justify-between px-6 py-2 bg-black dark:bg-white text-white dark:text-black text-sm">
            <div className="flex items-center space-x-1">
              <span className="font-semibold">9:41</span>
            </div>
            <div className="flex items-center space-x-1">
              <Signal className="w-4 h-4" />
              <Wifi className="w-4 h-4" />
              <Battery className="w-4 h-4" />
            </div>
          </div>

          {/* Screen Content */}
          <div className="h-[600px] bg-white dark:bg-black overflow-hidden">{content}</div>
        </div>
      </div>
    </div>
  )

  const HomeScreen = () => (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-black text-black dark:text-white">Good morning!</h1>
            <p className="text-gray-600 dark:text-gray-400">What can we fix today?</p>
          </div>
          <div className="relative">
            <Button size="sm" variant="ghost" className="w-10 h-10 rounded-full">
              <Bell className="w-5 h-5 text-black dark:text-white" />
            </Button>
            {notifications > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">{notifications}</span>
              </div>
            )}
          </div>
        </div>

        {/* Quick Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            placeholder="Search services..."
            className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-900 rounded-2xl border-0 text-black dark:text-white placeholder-gray-500"
          />
        </div>
      </div>

      {/* Services Grid */}
      <div className="px-6 py-4">
        <h2 className="text-lg font-bold text-black dark:text-white mb-4">Popular Services</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {mockServices.map((service, index) => (
            <div
              key={index}
              className={`${service.color} p-4 rounded-2xl cursor-pointer transition-transform active:scale-95`}
              onClick={() => setCurrentScreen("search")}
            >
              <div className="text-2xl mb-2">{service.icon}</div>
              <div className="font-semibold text-black dark:text-white">{service.name}</div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <h2 className="text-lg font-bold text-black dark:text-white mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-950 rounded-2xl">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-black dark:text-white">Service Completed</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Kitchen sink repair - $120</div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500">2h ago</div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-950 rounded-2xl">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-black dark:text-white">Upcoming Appointment</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Electrical work - Tomorrow 2PM</div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500">1 day</div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="mt-auto border-t border-gray-200 dark:border-gray-800 px-6 py-3">
        <div className="flex items-center justify-around">
          <Button variant="ghost" className="flex-col space-y-1 h-auto py-2">
            <Home className="w-5 h-5 text-black dark:text-white" />
            <span className="text-xs text-black dark:text-white">Home</span>
          </Button>
          <Button variant="ghost" className="flex-col space-y-1 h-auto py-2" onClick={() => setCurrentScreen("search")}>
            <Search className="w-5 h-5 text-gray-400" />
            <span className="text-xs text-gray-400">Search</span>
          </Button>
          <Button variant="ghost" className="flex-col space-y-1 h-auto py-2" onClick={() => setCurrentScreen("chat")}>
            <MessageCircle className="w-5 h-5 text-gray-400" />
            <span className="text-xs text-gray-400">Messages</span>
          </Button>
          <Button variant="ghost" className="flex-col space-y-1 h-auto py-2">
            <User className="w-5 h-5 text-gray-400" />
            <span className="text-xs text-gray-400">Profile</span>
          </Button>
        </div>
      </div>
    </div>
  )

  const SearchScreen = () => (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center space-x-4 mb-4">
          <Button size="sm" variant="ghost" onClick={() => setCurrentScreen("home")} className="w-10 h-10 rounded-full">
            <ArrowLeft className="w-5 h-5 text-black dark:text-white" />
          </Button>
          <h1 className="text-xl font-bold text-black dark:text-white">Find Professionals</h1>
        </div>

        {/* Search with Voice/Camera */}
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            placeholder="What service do you need?"
            className="w-full pl-10 pr-20 py-3 bg-gray-100 dark:bg-gray-900 rounded-2xl border-0 text-black dark:text-white placeholder-gray-500"
          />
          <div className="absolute right-2 top-2 flex space-x-1">
            <Button size="sm" variant="ghost" className="w-8 h-8 rounded-full">
              <Mic className="w-4 h-4 text-gray-400" />
            </Button>
            <Button size="sm" variant="ghost" className="w-8 h-8 rounded-full">
              <Camera className="w-4 h-4 text-gray-400" />
            </Button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 px-6 py-4 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">2 professionals nearby</span>
          <Button size="sm" variant="ghost" className="text-black dark:text-white">
            <MapPin className="w-4 h-4 mr-1" />
            Map
          </Button>
        </div>

        <div className="space-y-4">
          {mockProviders.map((provider, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-4">
              <div className="flex items-start space-x-3">
                <Avatar className="w-12 h-12 border-2 border-gray-200 dark:border-gray-800">
                  <AvatarImage src={provider.image || "/placeholder.svg"} />
                  <AvatarFallback className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white">
                    {provider.name[0]}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-black dark:text-white">{provider.name}</h3>
                    <div className="flex items-center space-x-1">
                      <Heart className="w-4 h-4 text-gray-400" />
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{provider.service}</p>

                  <div className="flex items-center space-x-4 text-sm mb-3">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-black dark:text-white" />
                      <span className="font-semibold text-black dark:text-white">{provider.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">{provider.distance}</span>
                    </div>
                    <div className="text-black dark:text-white font-semibold">{provider.price}</div>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1 bg-black dark:bg-white text-white dark:text-black rounded-xl">
                      Book Now
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-2 border-gray-200 dark:border-gray-800 rounded-xl bg-transparent"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="border-t border-gray-200 dark:border-gray-800 px-6 py-3">
        <div className="flex items-center justify-around">
          <Button variant="ghost" className="flex-col space-y-1 h-auto py-2" onClick={() => setCurrentScreen("home")}>
            <Home className="w-5 h-5 text-gray-400" />
            <span className="text-xs text-gray-400">Home</span>
          </Button>
          <Button variant="ghost" className="flex-col space-y-1 h-auto py-2">
            <Search className="w-5 h-5 text-black dark:text-white" />
            <span className="text-xs text-black dark:text-white">Search</span>
          </Button>
          <Button variant="ghost" className="flex-col space-y-1 h-auto py-2" onClick={() => setCurrentScreen("chat")}>
            <MessageCircle className="w-5 h-5 text-gray-400" />
            <span className="text-xs text-gray-400">Messages</span>
          </Button>
          <Button variant="ghost" className="flex-col space-y-1 h-auto py-2">
            <User className="w-5 h-5 text-gray-400" />
            <span className="text-xs text-gray-400">Profile</span>
          </Button>
        </div>
      </div>
    </div>
  )

  const ChatScreen = () => (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center space-x-4 mb-4">
          <Button size="sm" variant="ghost" onClick={() => setCurrentScreen("home")} className="w-10 h-10 rounded-full">
            <ArrowLeft className="w-5 h-5 text-black dark:text-white" />
          </Button>
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10 border-2 border-gray-200 dark:border-gray-800">
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white">JS</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-bold text-black dark:text-white">John Smith</h3>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 px-6 py-4 overflow-y-auto space-y-4">
        <div className="flex justify-start">
          <div className="bg-gray-100 dark:bg-gray-900 rounded-2xl px-4 py-3 max-w-xs">
            <p className="text-black dark:text-white text-sm">
              Hi! I'm on my way to fix your kitchen sink. ETA: 15 minutes.
            </p>
            <span className="text-xs text-gray-500 dark:text-gray-500">2:30 PM</span>
          </div>
        </div>

        <div className="flex justify-end">
          <div className="bg-black dark:bg-white rounded-2xl px-4 py-3 max-w-xs">
            <p className="text-white dark:text-black text-sm">Great! I'll be waiting. The leak is getting worse.</p>
            <span className="text-xs text-gray-300 dark:text-gray-700">2:32 PM</span>
          </div>
        </div>

        <div className="flex justify-start">
          <div className="bg-gray-100 dark:bg-gray-900 rounded-2xl px-4 py-3 max-w-xs">
            <p className="text-black dark:text-white text-sm">No worries! I have all the tools needed. See you soon!</p>
            <span className="text-xs text-gray-500 dark:text-gray-500">2:33 PM</span>
          </div>
        </div>
      </div>

      {/* Message Input */}
      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <input
              placeholder="Type a message..."
              className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-900 rounded-2xl border-0 text-black dark:text-white placeholder-gray-500"
            />
          </div>
          <Button size="sm" className="w-10 h-10 rounded-full bg-black dark:bg-white text-white dark:text-black">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="border-t border-gray-200 dark:border-gray-800 px-6 py-3">
        <div className="flex items-center justify-around">
          <Button variant="ghost" className="flex-col space-y-1 h-auto py-2" onClick={() => setCurrentScreen("home")}>
            <Home className="w-5 h-5 text-gray-400" />
            <span className="text-xs text-gray-400">Home</span>
          </Button>
          <Button variant="ghost" className="flex-col space-y-1 h-auto py-2" onClick={() => setCurrentScreen("search")}>
            <Search className="w-5 h-5 text-gray-400" />
            <span className="text-xs text-gray-400">Search</span>
          </Button>
          <Button variant="ghost" className="flex-col space-y-1 h-auto py-2">
            <MessageCircle className="w-5 h-5 text-black dark:text-white" />
            <span className="text-xs text-black dark:text-white">Messages</span>
          </Button>
          <Button variant="ghost" className="flex-col space-y-1 h-auto py-2">
            <User className="w-5 h-5 text-gray-400" />
            <span className="text-xs text-gray-400">Profile</span>
          </Button>
        </div>
      </div>
    </div>
  )

  const getCurrentScreen = () => {
    switch (currentScreen) {
      case "search":
        return <SearchScreen />
      case "chat":
        return <ChatScreen />
      default:
        return <HomeScreen />
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="bg-black dark:bg-white text-white dark:text-black border-0 px-6 py-3 rounded-full mb-6">
            <Smartphone className="w-4 h-4 mr-2" />
            Mobile Experience
          </Badge>
          <h1 className="text-5xl font-black text-black dark:text-white mb-6">Native Mobile App</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Experience the full power of FixItNow on your mobile device with our native iOS and Android apps.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Mobile Preview */}
          <div className="order-2 lg:order-1">
            {renderMobileFrame(getCurrentScreen())}

            {/* Screen Navigation */}
            <div className="flex justify-center space-x-4 mt-8">
              <Button
                variant={currentScreen === "home" ? "default" : "outline"}
                onClick={() => setCurrentScreen("home")}
                className={
                  currentScreen === "home"
                    ? "bg-black dark:bg-white text-white dark:text-black"
                    : "border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black text-black dark:text-white"
                }
              >
                Home
              </Button>
              <Button
                variant={currentScreen === "search" ? "default" : "outline"}
                onClick={() => setCurrentScreen("search")}
                className={
                  currentScreen === "search"
                    ? "bg-black dark:bg-white text-white dark:text-black"
                    : "border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black text-black dark:text-white"
                }
              >
                Search
              </Button>
              <Button
                variant={currentScreen === "chat" ? "default" : "outline"}
                onClick={() => setCurrentScreen("chat")}
                className={
                  currentScreen === "chat"
                    ? "bg-black dark:bg-white text-white dark:text-black"
                    : "border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black text-black dark:text-white"
                }
              >
                Chat
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="order-1 lg:order-2 space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-black dark:text-white mb-6">Mobile-First Features</h2>
              <div className="space-y-6">
                {[
                  {
                    icon: Camera,
                    title: "Visual Search",
                    description:
                      "Take a photo of your problem and let AI identify the issue and find the right professional.",
                  },
                  {
                    icon: Mic,
                    title: "Voice Commands",
                    description:
                      "Use voice commands to book services, check status, and communicate with professionals.",
                  },
                  {
                    icon: MapPin,
                    title: "Real-time Tracking",
                    description:
                      "Track your service professional in real-time with live GPS updates and ETA notifications.",
                  },
                  {
                    icon: Bell,
                    title: "Smart Notifications",
                    description:
                      "Get intelligent notifications about booking confirmations, arrival times, and service updates.",
                  },
                  {
                    icon: QrCode,
                    title: "QR Code Payments",
                    description: "Quick and secure payments using QR codes, with automatic receipt generation.",
                  },
                  {
                    icon: Shield,
                    title: "Biometric Security",
                    description:
                      "Secure your account with fingerprint or face ID authentication for ultimate security.",
                  },
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-900 rounded-2xl flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-black dark:text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-black dark:text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Download Buttons */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-black dark:text-white">Download Now</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 rounded-2xl px-6 py-4 h-auto">
                  <div className="flex items-center space-x-3">
                    <Download className="w-6 h-6" />
                    <div className="text-left">
                      <div className="text-xs opacity-80">Download on the</div>
                      <div className="font-bold">App Store</div>
                    </div>
                  </div>
                </Button>
                <Button className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 rounded-2xl px-6 py-4 h-auto">
                  <div className="flex items-center space-x-3">
                    <Download className="w-6 h-6" />
                    <div className="text-left">
                      <div className="text-xs opacity-80">Get it on</div>
                      <div className="font-bold">Google Play</div>
                    </div>
                  </div>
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-gray-50 dark:bg-gray-950 rounded-2xl">
                <div className="text-3xl font-black text-black dark:text-white mb-2">4.9★</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">App Store Rating</div>
              </div>
              <div className="text-center p-6 bg-gray-50 dark:bg-gray-950 rounded-2xl">
                <div className="text-3xl font-black text-black dark:text-white mb-2">100k+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Downloads</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
