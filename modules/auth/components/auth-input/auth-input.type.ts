import type { ComponentPropsWithoutRef } from 'react'

type NativeProps = Omit<ComponentPropsWithoutRef<'input'>, 'className' | 'size'>

export type AuthInputProps = NativeProps & {
  id: string
  label: string
  type?: 'text' | 'email' | 'password'
  placeholder?: string
  error?: string
  disabled?: boolean
  className?: string
  size?: 'default' | 'sm'
}
