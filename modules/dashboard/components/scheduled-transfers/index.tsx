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
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-5 w-20" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!data || !Array.isArray(data.transfers) || data.transfers.length === 0) {
    return (
      <Card className="rounded-[10px] border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Scheduled Transfers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-[200px] items-center justify-center text-muted-foreground">
            No scheduled transfers
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="rounded-[10px] border-none shadow-none p-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-[23px] px-0 pt-t">
        <CardTitle className="text-xl font-bold">Scheduled Transfers</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="text-emerald-600 hover:text-emerald-700"
          asChild
        >
          <Link href="/transfers" className="text-[14px] font-semibold">
            View All
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="px-0">
          {data.transfers.map(transfer => {
            const displayName = transfer.recipientName || transfer.name
            const displayAvatar = transfer.recipientAvatar || transfer.image
            const displayDate = transfer.scheduledDate || transfer.date

            return (
              <div
                key={transfer.id}
                className={`flex items-center justify-between rounded-lg py-3 px-0 transition-colors ${
                  data.transfers.indexOf(transfer) === data.transfers.length - 1
                    ? ''
                    : 'border-b border-b-[#FAFAFA]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-[33px] w-[33px]">
                    <AvatarImage src={displayAvatar} />
                  </Avatar>
                  <div>
                    <p className="font-semibold text-[14px] text-[#1B212D] mb-[4px]">
                      {displayName}
                    </p>
                    <p className="text-[12px] text-[#929EAE]">{formatDate(displayDate, 'long')}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-black text-base">
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
