"use client"

import { useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"

export default function DashboardRedirect() {
  const { user, isLoading, redirectToDashboard } = useAuth()

  useEffect(() => {
    if (!isLoading) {
      redirectToDashboard()
    }
  }, [isLoading, redirectToDashboard])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-950 dark:via-blue-950 dark:to-indigo-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Loading Dashboard...</h2>
          <p className="text-gray-600 dark:text-gray-400">Redirecting you to your personalized dashboard</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-950 dark:via-blue-950 dark:to-indigo-950">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Redirecting...</h2>
        <p className="text-gray-600 dark:text-gray-400">Taking you to your dashboard</p>
      </div>
    </div>
  )
}
