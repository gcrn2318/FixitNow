"use client"

import { RealTimeChat } from "@/components/real-time-chat"

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-950 dark:via-blue-950 dark:to-indigo-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent mb-4">
            Real-Time Communication
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Connect instantly with service professionals through our advanced chat system
          </p>
        </div>
        <RealTimeChat />
      </div>
    </div>
  )
}
