'use client'

import { Button } from '@/core/ui/components/button'
import GoogleLogo from '@/packages/assets/icons/google-logo'
import { cn } from '@/packages/util/cn'

interface GoogleButtonProps {
  onClick?: () => void
  disabled?: boolean
  className?: string
}

export const GoogleButton = ({ onClick, disabled, className }: GoogleButtonProps) => {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'w-full h-12 rounded-[10px] border border-[#F5F5F5] bg-white text-[#78778B] text-[16px] font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-3',
        className
      )}
    >
      <GoogleLogo />
      Sign in with Google
    </Button>
  )
}
