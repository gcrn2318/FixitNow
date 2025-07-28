import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function BookingsLoading() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Skeleton className="h-10 w-64 mb-2" />
            <Skeleton className="h-5 w-80" />
          </div>
          <div className="flex space-x-4">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
          {Array.from({ length: 7 }).map((_, i) => (
            <Card key={i} className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <CardContent className="p-4 text-center">
                <Skeleton className="h-8 w-12 mx-auto mb-2" />
                <Skeleton className="h-4 w-16 mx-auto" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters Skeleton */}
        <Card className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex space-x-4">
                <Skeleton className="h-10 w-64" />
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-10 w-32" />
              </div>
              <div className="flex space-x-4">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-8" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Skeleton */}
        <div className="flex space-x-2 mb-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-32 rounded-xl" />
          ))}
        </div>

        {/* Bookings List Skeleton */}
        <div className="space-y-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <Card key={i} className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="w-12 h-12 rounded-2xl" />
                    <div className="space-y-2">
                      <Skeleton className="h-6 w-48" />
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-64" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-5 w-24" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <div key={j} className="flex items-center space-x-3">
                      <Skeleton className="w-10 h-10 rounded-full" />
                      <div className="space-y-1">
                        <Skeleton className="h-3 w-16" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Skeleton className="w-4 h-4" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <div className="flex space-x-2">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-8 w-16" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
