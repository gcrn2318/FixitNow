"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  Eye,
  Cpu,
  Waves,
  Satellite,
  Microscope,
  Atom,
  Dna,
  Bot,
  Globe,
  Rocket,
  Star,
  Lightbulb,
  Activity,
} from "lucide-react"

const futuristicFeatures = [
  {
    icon: Brain,
    title: "Neural Network Matching",
    description: "Advanced AI that learns from millions of service interactions to predict perfect matches",
    color: "from-purple-500 to-pink-500",
    status: "active",
    accuracy: "99.7%",
  },
  {
    icon: Eye,
    title: "Computer Vision Diagnostics",
    description: "AI-powered image analysis instantly identifies problems from photos",
    color: "from-blue-500 to-cyan-500",
    status: "beta",
    accuracy: "94.2%",
  },
  {
    icon: Waves,
    title: "Predictive Maintenance",
    description: "IoT sensors predict equipment failures before they happen",
    color: "from-green-500 to-emerald-500",
    status: "coming-soon",
    accuracy: "87.5%",
  },
  {
    icon: Satellite,
    title: "Quantum Communication",
    description: "Ultra-secure, instantaneous communication using quantum encryption",
    color: "from-orange-500 to-red-500",
    status: "research",
    accuracy: "100%",
  },
  {
    icon: Atom,
    title: "Molecular Analysis",
    description: "Nano-sensors analyze material composition for precise repair recommendations",
    color: "from-indigo-500 to-purple-500",
    status: "prototype",
    accuracy: "91.8%",
  },
  {
    icon: Dna,
    title: "Genetic Algorithms",
    description: "Self-evolving optimization algorithms that improve service efficiency",
    color: "from-teal-500 to-blue-500",
    status: "active",
    accuracy: "96.3%",
  },
]

const aiCapabilities = [
  {
    name: "Natural Language Processing",
    level: 98,
    description: "Understanding complex service requests in any language",
  },
  {
    name: "Computer Vision",
    level: 94,
    description: "Analyzing images and videos for instant problem diagnosis",
  },
  {
    name: "Predictive Analytics",
    level: 89,
    description: "Forecasting maintenance needs and service demands",
  },
  {
    name: "Machine Learning",
    level: 96,
    description: "Continuously improving from every service interaction",
  },
  {
    name: "Neural Networks",
    level: 92,
    description: "Deep learning for complex pattern recognition",
  },
]

export function FuturisticFeatures() {
  const [selectedFeature, setSelectedFeature] = useState(0)
  const [aiProcessing, setAiProcessing] = useState(false)
  const [quantumState, setQuantumState] = useState("stable")

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedFeature((prev) => (prev + 1) % futuristicFeatures.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const aiInterval = setInterval(() => {
      setAiProcessing(true)
      setTimeout(() => setAiProcessing(false), 2000)
    }, 8000)
    return () => clearInterval(aiInterval)
  }, [])

  useEffect(() => {
    const quantumInterval = setInterval(() => {
      const states = ["stable", "entangled", "superposition", "collapsed"]
      setQuantumState(states[Math.floor(Math.random() * states.length)])
    }, 3000)
    return () => clearInterval(quantumInterval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500 text-white"
      case "beta":
        return "bg-blue-500 text-white"
      case "coming-soon":
        return "bg-yellow-500 text-black"
      case "research":
        return "bg-purple-500 text-white"
      case "prototype":
        return "bg-orange-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Neural Network Visualization */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full">
          {[...Array(20)].map((_, i) => (
            <g key={i}>
              <circle
                cx={Math.random() * 100 + "%"}
                cy={Math.random() * 100 + "%"}
                r="2"
                fill="url(#gradient)"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
              <line
                x1={Math.random() * 100 + "%"}
                y1={Math.random() * 100 + "%"}
                x2={Math.random() * 100 + "%"}
                y2={Math.random() * 100 + "%"}
                stroke="url(#gradient)"
                strokeWidth="0.5"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            </g>
          ))}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-full flex items-center justify-center animate-spin-slow">
              <Cpu className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-6xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Future Tech
            </h1>
          </div>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Experience the next generation of AI-powered home services with cutting-edge technology
          </p>
        </div>

        {/* AI Status Dashboard */}
        <Card className="mb-16 bg-black/40 backdrop-blur-xl border border-gray-700 rounded-3xl overflow-hidden">
          <CardContent className="p-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* AI Processing Status */}
              <div className="text-center">
                <div
                  className={`w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center ${
                    aiProcessing ? "bg-gradient-to-r from-green-500 to-emerald-500 animate-pulse" : "bg-gray-700"
                  }`}
                >
                  <Bot className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">AI Neural Core</h3>
                <p className="text-gray-400">{aiProcessing ? "Processing..." : "Standby"}</p>
                <div className="mt-4 flex justify-center space-x-2">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-8 rounded-full ${aiProcessing ? "bg-green-500 animate-pulse" : "bg-gray-600"}`}
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
              </div>

              {/* Quantum State */}
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center relative">
                  <Atom className="w-12 h-12 text-white animate-spin" />
                  <div className="absolute inset-0 border-4 border-purple-300 rounded-full animate-ping"></div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Quantum State</h3>
                <Badge className={`${getStatusColor("active")} capitalize`}>{quantumState}</Badge>
                <div className="mt-4">
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full animate-pulse"
                      style={{ width: "87%" }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Coherence: 87%</p>
                </div>
              </div>

              {/* Network Status */}
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <Globe className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Global Network</h3>
                <p className="text-green-400 font-medium">Online</p>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {[...Array(9)].map((_, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Futuristic Features Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Feature Showcase */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-white mb-8">Advanced Capabilities</h2>
            {futuristicFeatures.map((feature, index) => (
              <Card
                key={index}
                className={`group cursor-pointer transition-all duration-500 ${
                  selectedFeature === index
                    ? "bg-gradient-to-r from-gray-800 to-gray-900 border-2 border-blue-500 scale-105"
                    : "bg-black/40 border border-gray-700 hover:border-gray-600"
                } backdrop-blur-xl rounded-2xl overflow-hidden`}
                onClick={() => setSelectedFeature(index)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                        <Badge className={getStatusColor(feature.status)}>{feature.status.replace("-", " ")}</Badge>
                      </div>
                      <p className="text-gray-400 mb-3 leading-relaxed">{feature.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Activity className="w-4 h-4 text-green-500" />
                          <span className="text-green-500 font-medium">Accuracy: {feature.accuracy}</span>
                        </div>
                        {selectedFeature === index && (
                          <div className="flex space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* AI Capabilities */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-white mb-8">AI Intelligence Levels</h2>
            <Card className="bg-black/40 backdrop-blur-xl border border-gray-700 rounded-2xl">
              <CardContent className="p-8">
                <div className="space-y-6">
                  {aiCapabilities.map((capability, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-white">{capability.name}</h3>
                        <span className="text-2xl font-bold text-blue-400">{capability.level}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full transition-all duration-1000 ease-out relative"
                          style={{ width: `${capability.level}%` }}
                        >
                          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm">{capability.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quantum Computing Status */}
            <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-xl border border-purple-500 rounded-2xl">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center relative">
                    <Atom className="w-10 h-10 text-white animate-spin" />
                    <div className="absolute inset-0 border-2 border-purple-300 rounded-full animate-ping"></div>
                    <div className="absolute inset-2 border-2 border-pink-300 rounded-full animate-ping delay-500"></div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Quantum Processing Unit</h3>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-purple-300 text-sm">Qubits Active</p>
                      <p className="text-2xl font-bold text-white">1,024</p>
                    </div>
                    <div>
                      <p className="text-purple-300 text-sm">Coherence Time</p>
                      <p className="text-2xl font-bold text-white">100μs</p>
                    </div>
                  </div>
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full px-8">
                    <Rocket className="w-4 h-4 mr-2" />
                    Initialize Quantum Core
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Technology Roadmap */}
        <Card className="bg-black/40 backdrop-blur-xl border border-gray-700 rounded-3xl">
          <CardContent className="p-8">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Technology Roadmap</h2>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500"></div>
              <div className="space-y-12">
                {[
                  { year: "2024", title: "Neural Network Integration", status: "active", icon: Brain },
                  { year: "2025", title: "Quantum Communication", status: "development", icon: Satellite },
                  { year: "2026", title: "Molecular Analysis", status: "research", icon: Microscope },
                  { year: "2027", title: "Consciousness Interface", status: "concept", icon: Lightbulb },
                ].map((milestone, index) => (
                  <div key={index} className={`flex items-center ${index % 2 === 0 ? "justify-start" : "justify-end"}`}>
                    <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8"}`}>
                      <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 rounded-2xl">
                        <CardContent className="p-6">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                              <milestone.icon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-white">{milestone.title}</h3>
                              <p className="text-gray-400">{milestone.year}</p>
                              <Badge className={getStatusColor(milestone.status)}>{milestone.status}</Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-gray-900"></div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
