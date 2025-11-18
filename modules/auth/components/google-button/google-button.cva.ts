import { cva, type VariantProps } from 'class-variance-authority'

export const rootCva = cva(
  'w-full h-12 rounded-[10px] border border-[#F5F5F5] bg-white text-[#78778B] text-[16px] font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-3',
  {
    variants: {
      variant: {
        default: '',
        secondary: 'border-[#E5E5E5] hover:bg-gray-100',
      },
      size: {
        default: 'h-12',
        sm: 'h-10',
        lg: 'h-14',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export const iconCva = cva('flex-shrink-0')

export const textCva = cva('font-semibold')

export type GoogleButtonVariants = VariantProps<typeof rootCva>
