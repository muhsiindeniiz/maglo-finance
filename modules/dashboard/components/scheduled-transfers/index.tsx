import { Card, CardContent, CardHeader, CardTitle } from '@/core/ui/components/card'
import { Skeleton } from '@/core/ui/components/skeleton'
import { Button } from '@/core/ui/components/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/core/ui/components/avatar'
import { ScheduledTransfers as ScheduledTransfersType } from '@/core/api/types'
import { formatCurrency, formatDate } from '@/packages/util'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface ScheduledTransfersProps {
  data?: ScheduledTransfersType | undefined
  isLoading?: boolean
}

export default function ScheduledTransfers({ data, isLoading }: ScheduledTransfersProps) {
  if (isLoading) {
    return (
      <Card className="rounded-[10px] border-none shadow-none">
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-12 w-12 rounded-full md:h-14 md:w-14" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32 md:h-5 md:w-40" />
                  <Skeleton className="h-3 w-24 md:h-4 md:w-32" />
                </div>
                <Skeleton className="h-5 w-20 md:h-6 md:w-24" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!data || !Array.isArray(data.transfers) || data.transfers.length === 0) {
    return (
      <Card className="rounded-[10px] border-none p-0 shadow-none">
        <CardHeader className="px-0">
          <CardTitle className="text-xl font-bold md:text-2xl">Scheduled Transfers</CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          <div className="flex h-[200px] items-center justify-center text-muted-foreground">
            No scheduled transfers
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="rounded-[10px] border-none p-0 shadow-none">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 px-0 pb-5 pt-0 md:pb-6">
        <CardTitle className="text-xl font-bold md:text-2xl">Scheduled Transfers</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="h-auto p-0 text-emerald-600 hover:bg-transparent hover:text-emerald-700"
          asChild
        >
          <Link
            href="/transfers"
            className="flex items-center gap-1 text-sm font-semibold md:text-base"
          >
            <span className="hidden sm:inline">View All</span>
            <span className="sm:hidden">All</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-0">
          {data.transfers.map((transfer, index) => {
            const displayName = transfer.recipientName || transfer.name
            const displayAvatar = transfer.recipientAvatar || transfer.image
            const displayDate = transfer.scheduledDate || transfer.date

            return (
              <div
                key={transfer.id}
                className={`flex items-center justify-between rounded-lg px-0 py-3 transition-colors hover:bg-gray-50 md:py-4 ${
                  index === data.transfers.length - 1 ? '' : 'border-b border-b-[#FAFAFA]'
                }`}
              >
                <div className="flex items-center gap-3 md:gap-4">
                  <Avatar className="h-10 w-10 md:h-12 md:w-12">
                    <AvatarImage src={displayAvatar} alt={displayName} />
                    <AvatarFallback className="bg-[#C8EE44] text-sm font-semibold text-[#1B212D] md:text-base">
                      {displayName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="mb-1 text-sm font-semibold text-[#1B212D] md:text-base">
                      {displayName}
                    </p>
                    <p className="text-xs text-[#929EAE] md:text-sm">
                      {formatDate(displayDate, 'long')}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-black md:text-base lg:text-lg">
                    {formatCurrency(transfer.amount, transfer.currency)}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
