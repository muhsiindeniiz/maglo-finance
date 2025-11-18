import { Card, CardContent, CardHeader, CardTitle } from '@/core/ui/components/card'
import { Skeleton } from '@/core/ui/components/skeleton'
import { Wallet, Card as CardType } from '@/core/api/types'
import { formatCardNumber, maskCardNumber } from '@/packages/util'
import { Button } from '@/core/ui/components/button'
import { Ellipses, SimCard, Wireless, Visa, MasterCard } from '@/packages/assets/icons'

interface WalletCardsProps {
  data?: Wallet | undefined
  isLoading?: boolean
}

export default function WalletCards({ data, isLoading }: WalletCardsProps) {
  if (isLoading) {
    return (
      <Card className="rounded-[10px] border-none shadow-none">
        <CardHeader>
          <Skeleton className="h-6 w-24" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-48 w-full rounded-2xl md:h-56" />
            <Skeleton className="h-20 w-full rounded-lg md:h-24" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!data || !Array.isArray(data.cards) || data.cards.length === 0) {
    return (
      <Card className="rounded-[10px] border-none p-0 shadow-none">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-xl font-bold md:text-2xl">Wallet</CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          <div className="flex h-[200px] items-center justify-center text-muted-foreground">
            No cards available
          </div>
        </CardContent>
      </Card>
    )
  }

  const primaryCard = data.cards[0]
  const secondaryCard = data.cards.length > 1 ? data.cards[1] : null

  if (!primaryCard) {
    return (
      <Card className="rounded-[10px] border-none p-0 shadow-none">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-xl font-bold md:text-2xl">Wallet</CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          <div className="flex h-[200px] items-center justify-center text-muted-foreground">
            No cards available
          </div>
        </CardContent>
      </Card>
    )
  }

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

  const formatBankName = (bankName: string): string => {
    return bankName.replace(/^Maglo\s*\|\s*/i, '')
  }

  return (
    <Card className="rounded-[10px] border-none p-0 shadow-none">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 px-0 pb-4 pt-0 md:pb-6">
        <CardTitle className="text-xl font-semibold text-[#1B212D] md:text-2xl">Wallet</CardTitle>
        <Button variant="ghost" size="icon" className="h-8 w-8 md:h-10 md:w-10">
          <Ellipses className="h-5 w-5 md:h-6 md:w-6" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4 px-0 md:space-y-5">
        <div
          className="relative h-[200px] overflow-hidden rounded-2xl p-5 text-white shadow-xl md:h-[230px] md:p-6 lg:h-[240px] lg:p-7"
          style={{
            background: 'linear-gradient(104.3deg, #4A4A49 2.66%, #20201F 90.57%)',
          }}
        >
          <div className="flex h-full flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <p className="text-base font-bold text-[#FFFFFF] md:text-lg">Maglo.</p>
                <svg
                  width="1"
                  height="20"
                  viewBox="0 0 1 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="1" height="20" fill="#626261" />
                </svg>
                <p className="mt-0.5 text-xs font-medium text-[#626260] md:text-sm">
                  {formatBankName(primaryCard.bank)}
                </p>
              </div>
            </div>

            <div>
              <div className="mb-2 flex h-8 w-full items-center justify-between rounded md:mb-3 md:h-10">
                <SimCard />
                <Wireless />
              </div>
              <p className="mt-3 font-mono text-base font-bold tracking-wider text-white md:mt-4 md:text-lg lg:text-xl">
                {formatCardNumber(primaryCard.cardNumber)}
              </p>
              <div className="ml-auto mt-3 w-max md:mt-4">
                <MasterCard className="h-6 w-auto md:h-8" />
              </div>
            </div>
          </div>
        </div>

        {secondaryCard && (
          <div
            className="-mt-16 mx-auto w-full max-w-[calc(100%_-_24px)] overflow-hidden rounded-[15px] p-4 shadow-lg md:-mt-24 md:max-w-[calc(100%_-_30px)] md:p-5 lg:-mt-22 lg:p-6"
            style={{
              background:
                'linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 100%)',
              backdropFilter: 'blur(5px)',
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <p className="text-base font-bold text-[#FFFFFF] md:text-lg">Maglo.</p>
                <svg
                  width="1"
                  height="20"
                  viewBox="0 0 1 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="1" height="20" fill="#F5F5F5" />
                </svg>
                <p className="text-xs font-medium text-[#F5F5F5] md:text-sm">
                  {formatBankName(secondaryCard.bank)}
                </p>
              </div>
            </div>

            <div className="mt-3 flex items-start justify-between md:mt-4">
              <SimCard />
              <Wireless />
            </div>

            <div className="mt-6 md:mt-8">
              <div className="flex items-center justify-between">
                <p className="font-mono text-sm font-bold tracking-wider text-[#1B212D] md:text-base lg:text-lg">
                  {maskCardNumber(secondaryCard.cardNumber)}
                </p>
                <div className="flex items-center gap-2">
                  {getBrandName(secondaryCard.network) === 'visa' && (
                    <Visa className="h-5 w-auto md:h-6 lg:h-7" />
                  )}
                  {getBrandName(secondaryCard.network) === 'mastercard' && (
                    <MasterCard className="h-5 w-auto md:h-6 lg:h-7" />
                  )}
                </div>
              </div>
              <p className="mt-[5px] text-[12px] font-medium text-[#929EAE] md:text-sm">
                {getExpiryDate(secondaryCard)}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
