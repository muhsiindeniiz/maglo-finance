import { cva, type VariantProps } from 'class-variance-authority'

export const authInputVariants = cva('space-y-2', {
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

export type AuthInputVariants = VariantProps<typeof authInputVariants>
