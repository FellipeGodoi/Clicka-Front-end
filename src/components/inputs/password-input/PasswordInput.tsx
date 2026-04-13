'use client'

import { useState, forwardRef } from 'react'

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, error, className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
      <div className="flex flex-col gap-2 w-full">
        {label && (
          <label className="font-medium text-[18px] text-neutral-800">
            {label}
          </label>
        )}

        <div className="relative w-full">
          <input
            style={{paddingLeft:16}}
            ref={ref}
            type={showPassword ? 'text' : 'password'}
            className={`
              w-full h-11 px-4 pr-12 rounded-lg border
              border-gray-300 bg-white
              text-sm text-neutral-700
              focus:outline-none
              ${error ? 'border-red-500' : ''}
              ${className ?? ''}
            `}
            {...props}
          />

          <button
            type="button"
            style={{cursor: 'pointer'}}
            onClick={() => setShowPassword(!showPassword)}
            className="
              absolute right-3 top-1/2 -translate-y-1/2
              text-sm text-gray-500
              hover:text-gray-700
            "
          >
            {showPassword ? 'Ocultar' : 'Mostrar'}
          </button>
        </div>

        {error && (
          <span className="text-red-500 text-sm">
            {error}
          </span>
        )}
      </div>
    )
  }
)

PasswordInput.displayName = 'PasswordInput'

export default PasswordInput