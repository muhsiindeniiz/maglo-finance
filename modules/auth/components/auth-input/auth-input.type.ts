export interface AuthInputProps {
  id: string
  label: string
  type?: 'text' | 'email' | 'password'
  placeholder?: string
  error?: string
  disabled?: boolean
  className?: string
}
