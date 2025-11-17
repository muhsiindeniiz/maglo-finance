import MagloLogo from '@/packages/assets/images/maglo-logo'
import { cn } from '@/packages/util/cn'

interface LogoProps {
  className?: string
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <span className={cn('text-[18px] flex items-center gap-3 font-bold text-[#1B212D]', className)}>
      <MagloLogo />
      Maglo.
    </span>
  )
}
