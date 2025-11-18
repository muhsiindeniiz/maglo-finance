import { cva, type VariantProps } from 'class-variance-authority'

export const rootCva = cva('space-y-2', {
  variants: {
    size: {
      default: '',
      sm: 'space-y-1',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

export const labelCva = cva('text-[14px] font-medium text-[#1B212D] mb-[10px] block')

export const inputCva = cva(
  'rounded-[10px] border shadow-none placeholder:text-[#78778B] border-[#F2F2F2] pt-[15px] pr-[25px] pb-[16px] pl-[20px] bg-white transition-colors h-auto w-full',
  {
    variants: {
      error: {
        true: 'border-red-500 focus-visible:ring-red-500 bg-red-50',
        false: '',
      },
    },
    defaultVariants: {
      error: false,
    },
  }
)

export const errorContainerCva = cva('text-sm text-red-500 flex items-center gap-1 mt-1')

export const errorIconCva = cva('w-4 h-4')

export type AuthInputVariants = VariantProps<typeof rootCva>
