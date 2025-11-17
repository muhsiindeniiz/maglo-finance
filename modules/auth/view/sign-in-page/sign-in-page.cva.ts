import { cva, type VariantProps } from 'class-variance-authority'

export const signInPageVariants = cva('min-h-screen flex', {
  variants: {
    layout: {
      default: 'flex-row',
      stacked: 'flex-col',
    },
  },
  defaultVariants: {
    layout: 'default',
  },
})

export type SignInPageVariants = VariantProps<typeof signInPageVariants>
