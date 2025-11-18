import { FieldErrors, FieldValues } from 'react-hook-form'

export type ComponentMetaProp<T extends FieldValues = FieldValues> = {
  meta?: Partial<FieldErrors<T>>
}
