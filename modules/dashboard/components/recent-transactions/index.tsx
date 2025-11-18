import { Card, CardContent, CardHeader, CardTitle } from '@/core/ui/components/card'
import { Skeleton } from '@/core/ui/components/skeleton'
import { Button } from '@/core/ui/components/button'
import { RecentTransactions as RecentTransactionsType } from '@/core/api/types'
import { formatCurrency, formatDate } from '@/packages/util'
import { ChevronRight } from 'lucide-react'
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
            <Card className="rounded-[10px] border-[#F5F5F5] shadow-none">
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
            <Card className="rounded-[10px] border-[#F5F5F5] shadow-none">
                <CardHeader>
                    <CardTitle className="text-[18px] font-semibold text-[#1B212D]">
                        Recent Transaction
                    </CardTitle>
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
        <Card className="rounded-[10px] border-[#F5F5F5] shadow-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-[18px] font-semibold text-[#1B212D]">
                    Recent Transaction
                </CardTitle>
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 hover:bg-transparent"
                    asChild
                >
                    <Link
                        href="/transactions"
                        className="flex items-center text-[14px] font-semibold text-[#29A073]"
                        style={{ gap: '6px' }}
                    >
                        View All
                        <ChevronRight className="h-[10px] w-[10px]" strokeWidth={3} />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-0">
                    <div className="grid grid-cols-4 gap-4 px-4 py-2 text-[12px] font-semibold text-[#929EAE]">
                        <div className='text-left'>NAME/BUSINESS</div>
                        <div className='text-center'>TYPE</div>
                        <div className='text-center'>AMOUNT</div>
                        <div className='text-center'>DATE</div>
                    </div>

                    <div className="space-y-0">
                        {data.transactions.map((transaction, index) => {
                            const displayIcon = transaction.icon || transaction.image

                            return (
                                <div
                                    key={transaction.id}
                                    className={`grid grid-cols-4 gap-4 px-4 py-3 transition-colors hover:bg-accent ${index !== data.transactions.length - 1 ? 'border-b border-[#F5F5F5]' : ''
                                        }`}
                                >
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="relative h-12 w-12 flex justify-center items-center flex-shrink-0 overflow-hidden">
                                            {displayIcon ? (
                                                <Image
                                                    src={displayIcon}
                                                    alt={transaction.name}
                                                    width={40}
                                                    height={40}
                                                    className="object-contain"
                                                    unoptimized
                                                />
                                            ) : (
                                                <div className="flex h-full items-center justify-center text-lg font-bold text-slate-400">
                                                    {transaction.name.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium text-[#1B212D]">{transaction.name}</p>
                                            <p className="truncate text-[12px] text-[#929EAE] font-normal">
                                                {transaction.business}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <span className="text-sm text-[#929EAE] font-medium">
                                            {transaction.type}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <span className="font-semibold text-[#1B212D]">
                                            {formatCurrency(transaction.amount, transaction.currency)}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <span className="text-sm text-[#929EAE] font-medium">
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