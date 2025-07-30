"use client"

import { useAuth } from "@/contexts/AuthContext"
import DynamicDashboard from "@/components/DynamicDashboard"
import DashboardRedirect from "./redirect"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return <DashboardRedirect />
  }

  // If user has a specific type, redirect to their dashboard
  if (user.type !== 'admin') {
    return <DashboardRedirect />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <DynamicDashboard />
    </div>
  )
}
