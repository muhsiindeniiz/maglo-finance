import { Card, CardContent, CardHeader, CardTitle } from '@/core/ui/components/card'
import { Skeleton } from '@/core/ui/components/skeleton'
import { Button } from '@/core/ui/components/button'
import { RecentTransactions as RecentTransactionsType } from '@/core/api/types'
import { formatCurrency, formatDate } from '@/packages/util'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface RecentTransactionsProps {
    data?: RecentTransactionsType | undefined
    isLoading?: boolean
}

export default function RecentTransactions({
    data,
    isLoading,
}: RecentTransactionsProps) {
    if (isLoading) {
        return (
            <Card className="rounded-[10px]">
                <CardHeader>
                    <Skeleton className="h-6 w-48" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
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
                </CardContent>
            </Card>
        )
    }

    if (!data || !Array.isArray(data.transactions) || data.transactions.length === 0) {
        return (
            <Card className="rounded-[10px]">
                <CardHeader>
                    <CardTitle className="text-xl font-bold">Recent Transaction</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex h-[200px] items-center justify-center text-muted-foreground">
                        No transactions available
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="rounded-[10px]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-xl font-bold">Recent Transaction</CardTitle>
                <Button variant="ghost" size="sm" className="text-emerald-600 hover:text-emerald-700" asChild>
                    <Link href="/transactions">
                        View All
                        <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-1">
                    <div className="grid grid-cols-4 gap-4 px-4 py-2 text-xs font-medium text-muted-foreground">
                        <div>NAME/BUSINESS</div>
                        <div>TYPE</div>
                        <div>AMOUNT</div>
                        <div className="text-right">DATE</div>
                    </div>

                    <div className="space-y-0">
                        {data.transactions.map((transaction) => {
                            const displayIcon = transaction.icon || transaction.image

                            return (
                                <div
                                    key={transaction.id}
                                    className="grid grid-cols-4 gap-4 rounded-lg px-4 py-3 transition-colors hover:bg-accent"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100">
                                            {displayIcon ? (
                                                <Image
                                                    src={displayIcon}
                                                    alt={transaction.name}
                                                    width={48}
                                                    height={48}
                                                    className="object-contain p-2"
                                                    unoptimized
                                                />
                                            ) : (
                                                <div className="flex h-full items-center justify-center text-lg font-bold text-slate-400">
                                                    {transaction.name.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate font-medium">{transaction.name}</p>
                                            <p className="truncate text-sm text-muted-foreground">
                                                {transaction.business}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="text-sm text-muted-foreground">
                                            {transaction.type}
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="font-semibold">
                                            {formatCurrency(transaction.amount, transaction.currency)}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-end">
                                        <span className="text-sm text-muted-foreground">
                                            {formatDate(transaction.date, 'short')}
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}