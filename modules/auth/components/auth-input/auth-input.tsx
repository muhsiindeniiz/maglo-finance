'use client'

import { forwardRef } from 'react'
import { Input } from '@/core/ui/components/input'
import { Label } from '@/core/ui/components/label'
import { cn } from '@/packages/util/cn'
import { authInputVariants, type AuthInputVariants } from './auth-input.cva'
import { type AuthInputProps } from './auth-input.type'

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps & AuthInputVariants>(
  ({ id, label, type = 'text', placeholder, error, disabled, className, size, ...props }, ref) => {
    return (
      <div className={cn(authInputVariants({ size }), className)}>
        <Label htmlFor={id} className="text-[14px] font-medium text-[#1B212D] mb-[10px] block">
          {label}
        </Label>
        <Input
          ref={ref}
          id={id}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            'rounded-[10px] border shadow-none placeholder:text-[#78778B] border-[#F2F2F2] pt-[15px] pr-[25px] pb-[16px] pl-[20px] bg-white transition-colors h-auto',
            error && 'border-red-500 focus-visible:ring-red-500 bg-red-50'
          )}
          {...props}
        />
        {error && (
          <div className="text-sm text-red-500 flex items-center gap-1 mt-1">
            <svg
              className="w-4 h-4"
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

AuthInput.displayName = 'AuthInput'
