import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section Skeleton */}
      <div className="mb-8">
        <Skeleton className="h-8 w-64 mb-2 bg-gray-800/50" />
        <Skeleton className="h-5 w-96 bg-gray-800/50" />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          {/* Platform Selection Skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-32 bg-gray-800/50" />
            <div className="grid grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full rounded-lg bg-gray-800/50" />
              ))}
            </div>
          </div>

          {/* Tone Selection Skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-24 bg-gray-800/50" />
            <div className="grid grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full rounded-lg bg-gray-800/50" />
              ))}
            </div>
          </div>

          {/* Topic Input Skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-28 bg-gray-800/50" />
            <Skeleton className="h-24 w-full rounded-lg bg-gray-800/50" />
          </div>

          {/* Generate Button Skeleton */}
          <Skeleton className="h-12 w-full rounded-lg bg-gray-800/50" />
        </div>

        {/* Output Section */}
        <div className="space-y-6">
          <div className="p-6 rounded-xl border border-gray-800 bg-gray-900/50">
            <div className="space-y-4">
              <Skeleton className="h-5 w-32 bg-gray-800/50" />
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-4 w-full bg-gray-800/50" />
                ))}
              </div>
              <div className="pt-4 flex justify-end gap-2">
                {[...Array(2)].map((_, i) => (
                  <Skeleton key={i} className="h-9 w-24 rounded-lg bg-gray-800/50" />
                ))}
              </div>
            </div>
          </div>

          {/* History Section */}
          <div className="space-y-4">
            <Skeleton className="h-5 w-36 bg-gray-800/50" />
            {[...Array(3)].map((_, i) => (
              <div key={i} className="p-4 rounded-lg border border-gray-800 bg-gray-900/50">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-3/4 bg-gray-800/50" />
                  <Skeleton className="h-4 w-1/2 bg-gray-800/50" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}