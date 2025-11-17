import { Card, CardContent, CardHeader, CardTitle } from '@/core/ui/components/card'
import { Skeleton } from '@/core/ui/components/skeleton'
import { Wallet, Card as CardType } from '@/core/api/types'
import { formatCardNumber, maskCardNumber } from '@/packages/util'
import { Wifi, MoreVertical } from 'lucide-react'
import { Button } from '@/core/ui/components/button'

interface WalletCardsProps {
    data?: Wallet | undefined
    isLoading?: boolean
}

export default function WalletCards({ data, isLoading }: WalletCardsProps) {
    if (isLoading) {
        return (
            <Card className="rounded-[10px]">
                <CardHeader>
                    <Skeleton className="h-6 w-24" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <Skeleton className="h-48 w-full rounded-2xl" />
                        <Skeleton className="h-20 w-full rounded-lg" />
                    </div>
                </CardContent>
            </Card>
        )
    }

    if (!data || !Array.isArray(data.cards) || data.cards.length === 0) {
        return (
            <Card className="rounded-[10px]">
                <CardHeader>
                    <CardTitle className="text-xl font-bold">Wallet</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex h-[200px] items-center justify-center text-muted-foreground">
                        No cards available
                    </div>
                </CardContent>
            </Card>
        )
    }

    const primaryCard = data.cards[0]!
    const secondaryCard = data.cards[1]

    const getExpiryDate = (card: CardType): string => {
        if (card.expiryDate) return card.expiryDate
        return `${String(card.expiryMonth).padStart(2, '0')}/${String(card.expiryYear).slice(-2)}`
    }

    const getBrandName = (network: string): 'visa' | 'mastercard' | undefined => {
        const normalized = network.toLowerCase()
        if (normalized === 'visa') return 'visa'
        if (normalized === 'mastercard') return 'mastercard'
        return undefined
    }

    return (
        <Card className="rounded-[10px]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-xl font-bold">Wallet</CardTitle>
                <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                </Button>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="relative h-48 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-6 text-white shadow-xl">
                    <div className="flex h-full flex-col justify-between">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-300">Maglo.</p>
                                <p className="mt-0.5 text-xs text-slate-400">
                                    {primaryCard.bank}
                                </p>
                            </div>
                            <Wifi className="h-6 w-6 rotate-90 text-slate-400" />
                        </div>

                        <div>
                            <div className="mb-1 flex h-8 w-12 items-center justify-center rounded bg-slate-700/50">
                                <div className="h-6 w-8 rounded-sm bg-gradient-to-br from-amber-200 to-amber-400" />
                            </div>
                            <p className="mt-4 font-mono text-xl tracking-wider">
                                {formatCardNumber(primaryCard.cardNumber)}
                            </p>
                        </div>
                    </div>
                </div>

                {secondaryCard && (
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-300 to-slate-400 p-6 shadow-lg">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-semibold text-slate-800">Maglo.</p>
                                <p className="mt-0.5 text-xs text-slate-600">
                                    {secondaryCard.bank}
                                </p>
                            </div>
                            <div className="absolute right-6 top-6">
                                <Wifi className="h-6 w-6 rotate-90 text-slate-600" />
                            </div>
                        </div>

                        <div className="mt-8">
                            <div className="mb-1 flex h-8 w-12 items-center justify-center rounded bg-white/30">
                                <div className="h-6 w-8 rounded-sm bg-gradient-to-br from-orange-400 to-pink-500" />
                            </div>
                        </div>
                    </div>
                )}

                <div className="rounded-lg bg-slate-50 p-4">
                    <div className="flex items-center justify-between">
                        <p className="font-mono text-lg font-semibold">
                            {maskCardNumber(primaryCard.cardNumber)}
                        </p>
                        <div className="flex items-center gap-2">
                            {getBrandName(primaryCard.network) === 'visa' && (
                                <div className="text-sm font-bold text-blue-600">VISA</div>
                            )}
                            {getBrandName(primaryCard.network) === 'mastercard' && (
                                <div className="text-sm font-bold text-red-600">MASTERCARD</div>
                            )}
                        </div>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                        {getExpiryDate(primaryCard)}
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}