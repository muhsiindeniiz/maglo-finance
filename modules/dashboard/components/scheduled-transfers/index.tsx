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

export default function ScheduledTransfers({
    data,
    isLoading,
}: ScheduledTransfersProps) {
    if (isLoading) {
        return (
            <Card className="rounded-[10px]">
                <CardHeader>
                    <Skeleton className="h-6 w-48" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
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
            <Card className="rounded-[10px]">
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

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
    }

    return (
        <Card className="rounded-[10px]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-xl font-bold">Scheduled Transfers</CardTitle>
                <Button variant="ghost" size="sm" className="text-emerald-600 hover:text-emerald-700" asChild>
                    <Link href="/transfers">
                        View All
                        <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {data.transfers.map((transfer) => {
                        const displayName = transfer.recipientName || transfer.name
                        const displayAvatar = transfer.recipientAvatar || transfer.image
                        const displayDate = transfer.scheduledDate || transfer.date

                        return (
                            <div
                                key={transfer.id}
                                className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-accent"
                            >
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src={displayAvatar} />
                                        <AvatarFallback className="bg-slate-100 text-sm font-semibold">
                                            {getInitials(displayName)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium">{displayName}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {formatDate(displayDate, 'long')}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold">
                                        - {formatCurrency(transfer.amount, transfer.currency)}
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