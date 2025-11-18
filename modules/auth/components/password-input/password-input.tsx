'use client'

import { forwardRef } from 'react'
import { Label } from '@/core/ui/components/label'
import { cn } from '@/packages/util/cn'
import { useClassnames } from '@/packages/hook/use-classnames'
import * as cva from './password-input.cva'
import { type PasswordInputProps } from './password-input.type'

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ id, label, placeholder, error, disabled, className, size = 'default', ...props }, ref) => {
    const cx = useClassnames({
      root: cva.rootCva({ size }),
      label: cva.labelCva(),
      inputContainer: cva.inputContainerCva(),
      input: cva.inputCva({ error: !!error }),
      errorContainer: cva.errorContainerCva(),
      errorIcon: cva.errorIconCva(),
    })

    return (
      <div className={cn(cx.root, className)}>
        <Label htmlFor={id} className={cx.label}>
          {label}
        </Label>
        <div className={cx.inputContainer}>
          <input
            ref={ref}
            id={id}
            type="password"
            placeholder={placeholder}
            disabled={disabled}
            className={cx.input}
            {...props}
          />
        </div>
        {error && (
          <div className={cx.errorContainer}>
            <svg
              className={cx.errorIcon}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </div>
        )}
      </div>
    )
  }
)

PasswordInput.displayName = 'PasswordInput'
