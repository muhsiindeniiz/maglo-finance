import { cva, type VariantProps } from 'class-variance-authority'

export const passwordInputVariants = cva('space-y-2', {
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

export type PasswordInputVariants = VariantProps<typeof passwordInputVariants>
