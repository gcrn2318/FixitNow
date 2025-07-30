import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function MessagesLoading() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8 h-[calc(100vh-8rem)]">
          {/* Conversations List Skeleton */}
          <Card className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex flex-col">
            <CardHeader className="border-b-2 border-gray-100 dark:border-gray-800 pb-4">
              <div className="flex items-center justify-between mb-4">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
              <Skeleton className="h-10 w-full rounded-xl" />
            </CardHeader>
            <CardContent className="flex-1 p-0">
              <div className="space-y-1">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="p-4">
                    <div className="flex items-center space-x-3">
                      <Skeleton className="w-12 h-12 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-3 w-16" />
                        </div>
                        <Skeleton className="h-3 w-48" />
                        <div className="flex justify-between">
                          <Skeleton className="h-3 w-20" />
                          <Skeleton className="h-4 w-8" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Area Skeleton */}
          <div className="lg:col-span-2 flex flex-col">
            <Card className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex flex-col h-full">
              {/* Chat Header Skeleton */}
              <CardHeader className="border-b-2 border-gray-100 dark:border-gray-800 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-3 w-48" />
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                </div>
              </CardHeader>

              {/* Messages Skeleton */}
              <CardContent className="flex-1 p-6 space-y-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
                    <div className="flex items-end space-x-2 max-w-[70%]">
                      {i % 2 === 0 && <Skeleton className="w-8 h-8 rounded-full" />}
                      <div className="space-y-2">
                        <Skeleton className={`h-16 ${i % 2 === 0 ? "w-48" : "w-40"} rounded-2xl`} />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>

              {/* Message Input Skeleton */}
              <div className="border-t-2 border-gray-100 dark:border-gray-800 p-4">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-2">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                  <Skeleton className="flex-1 h-12 rounded-xl" />
                  <Skeleton className="h-12 w-16 rounded-xl" />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
