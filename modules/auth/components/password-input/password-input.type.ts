import type { ComponentPropsWithoutRef } from 'react'

type NativeProps = Omit<ComponentPropsWithoutRef<'input'>, 'className' | 'size' | 'type'>

export type PasswordInputProps = NativeProps & {
  id: string
  label: string
  placeholder?: string
  error?: string
  disabled?: boolean
  className?: string
  size?: 'default' | 'sm'
}
