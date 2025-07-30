"use client"

import { withAuth } from "@/contexts/AuthContext"
import DynamicDashboard from "@/components/DynamicDashboard"

function CustomerDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-950 dark:via-blue-950 dark:to-indigo-950">
      <div className="container mx-auto px-4 py-8">
        <DynamicDashboard />
      </div>
    </div>
  )
}

export default withAuth(CustomerDashboard, ['customer'])