import { ReactNode } from 'react'
import { cn } from '@/packages/util/cn'

interface RootBodyProps {
  children: ReactNode
  className?: string
}

export const RootBody = ({ children, className }: RootBodyProps) => {
  return (
    <body
      className={cn('min-h-screen bg-background font-sans antialiased', className)}
      suppressHydrationWarning
    >
      {children}
    </body>
  )
}
