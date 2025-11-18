import { Card, CardContent } from '@/core/ui/components/card'
import { Skeleton } from '@/core/ui/components/skeleton'
import { cn, formatCurrency } from '@/packages/util'
import { FinancialAmount } from '@/core/api/types'
import { ForwardRefExoticComponent, RefAttributes } from 'react'
import { WalletCloseIconProps } from '@/packages/assets/icons/wallet-close'

interface SummaryCardProps {
  title: string
  data?: FinancialAmount | undefined
  icon: ForwardRefExoticComponent<Omit<WalletCloseIconProps, 'ref'> & RefAttributes<SVGSVGElement>>
  variant: 'balance' | 'default'
  isLoading?: boolean
}

export default function SummaryCard({
  title,
  data,
  icon: Icon,
  variant,
  isLoading,
}: SummaryCardProps) {
  if (isLoading) {
    return (
      <Card className="rounded-[10px] border-none shadow-none">
        <CardContent className="px-5 py-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-[42px] w-[42px] rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-32" />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const isBalance = variant === 'balance'

  return (
    <Card
      className={cn(
        'rounded-[10px] border-none shadow-none',
        isBalance ? 'bg-[#363A3F]' : 'bg-[#F8F8F8]'
      )}
    >
      <CardContent className="px-5 py-6">
        <div className="flex items-center gap-4">
          <div>
            {' '}
            <div
              className={cn(
                'flex h-[42px] w-[42px] items-center justify-center rounded-full',
                isBalance ? 'bg-[#4E5257]' : 'bg-[#EBE8E8]'
              )}
            >
              <Icon
                className={cn('h-5 w-5', isBalance ? 'text-[#C8EE44]' : 'text-[#363A3F]')}
                strokeWidth={2}
              />
            </div>
          </div>
          <div className="flex-1">
            <p
              className={cn('text-sm font-normal', isBalance ? 'text-[#929EAE]' : 'text-[#929EAE]')}
            >
              {title}
            </p>
            <h3
              className={cn('mt-1 text-2xl font-bold', isBalance ? 'text-white' : 'text-[#1B212D]')}
            >
              {data ? formatCurrency(data.amount, data.currency) : '$0.00'}
            </h3>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
