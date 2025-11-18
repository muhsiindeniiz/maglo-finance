'use client'

import { Button } from '@/core/ui/components/button'
import { GoogleLogo } from '@/packages/assets/icons'
import { cn } from '@/packages/util/cn'
import { useClassnames } from '@/packages/hook/use-classnames'
import * as cva from './google-button.cva'
import { type GoogleButtonProps } from './google-button.type'

export const GoogleButton = ({
  onClick,
  disabled,
  className,
  variant = 'default',
  size = 'default',
}: GoogleButtonProps) => {
  const cx = useClassnames({
    root: cva.rootCva({ variant, size }),
    icon: cva.iconCva(),
    text: cva.textCva(),
  })

  return (
    <Button
      type="button"
      variant="outline"
      onClick={onClick}
      disabled={disabled}
      className={cn(cx.root, className)}
    >
      <GoogleLogo className={cx.icon} />
      <span className={cx.text}>Sign in with Google</span>
    </Button>
  )
}
