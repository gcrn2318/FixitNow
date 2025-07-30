import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function SearchLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-950 dark:via-blue-950 dark:to-indigo-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Skeleton */}
        <div className="text-center mb-12">
          <Skeleton className="h-12 w-96 mx-auto mb-4" />
          <Skeleton className="h-6 w-64 mx-auto" />
        </div>

        {/* Search Interface Skeleton */}
        <Card className="mb-8 shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl">
          <CardContent className="p-8">
            <div className="grid lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2">
                <Skeleton className="h-14 w-full rounded-2xl" />
              </div>
              <Skeleton className="h-14 w-full rounded-2xl" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-24 rounded-2xl" />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Results Skeleton */}
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="border-0 bg-white dark:bg-gray-800 rounded-3xl">
              <CardContent className="p-8">
                <div className="flex items-center space-x-8">
                  <Skeleton className="w-20 h-20 rounded-full" />
                  <div className="flex-1 space-y-4">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-32" />
                    <div className="flex space-x-4">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-10 w-32" />
                    <Skeleton className="h-10 w-32" />
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
