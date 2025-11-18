import { Skeleton } from '@/core/ui/components/skeleton'

export default function DashboardLoading() {
  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <div className="flex-1 space-y-6">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="rounded-[10px] border-none bg-[#F8F8F8] p-6">
              <div className="flex items-center gap-4">
                <Skeleton className="h-[42px] w-[42px] rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-32" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-[10px] border-[#F5F5F5] bg-white p-6 shadow-none">
          <div className="mb-4 flex items-center justify-between">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-8 w-32" />
          </div>
          <Skeleton className="h-[280px] w-full" />
        </div>

        <div className="rounded-[10px] border-[#F5F5F5] bg-white p-6 shadow-none">
          <Skeleton className="mb-4 h-6 w-48" />
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-5 w-20" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[380px] space-y-6">
        <div className="rounded-[10px] bg-white p-6 shadow-none">
          <Skeleton className="mb-4 h-6 w-24" />
          <Skeleton className="h-48 w-full rounded-2xl" />
        </div>

        <div className="rounded-[10px] bg-white p-6 shadow-none">
          <Skeleton className="mb-4 h-6 w-48" />
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-5 w-20" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
