'use client'

import React, { forwardRef } from 'react'
import styles from './text-input.module.css'
import { applyMask } from '@/utils/helpers/Masks'

type MaskType =
  | 'date'
  | 'cpf'
  | 'cnpj'
  | 'phone'
  | 'zipcode'
  | 'number'
  | 'sus'
  | 'no-space'
  | 'only-letters'
  | 'capitalize-name'
  | 'none'

type AfterBlurConfig = {
  suffix: string
  separator?: string
}

interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  mask?: MaskType
  afterBlur?: AfterBlurConfig
  maxWidth?: string
  error?: string
  textColor?: string
  textSize?: string
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      mask = 'none',
      afterBlur,
      maxWidth,
      error,
      textColor,
      textSize,
      readOnly = false,
      className,
      onChange,
      onBlur,
      ...props
    },
    ref
  ) => {
    const applyAfterBlur = (
      value: string,
      { suffix, separator = ' ' }: AfterBlurConfig
    ) => {
      const regex = new RegExp(`\\s*${suffix}$`, 'i')
      const normalizedValue = value.replace(regex, '').trim()
      if (!normalizedValue) return ''
      return `${normalizedValue}${separator}${suffix}`
    }

    return (
      <div className={styles.container} style={{ maxWidth }}>
        <label className={styles.label}>{label}</label>

        <input
          ref={ref}
          readOnly={readOnly}
          className={`
            ${styles.input}
            ${error ? styles.error : ''}
            ${className ?? ''}
          `}
          style={{ color: textColor, fontSize: textSize }}
          onChange={(e) => {
            if (readOnly) return

            const value = mask !== 'none'
              ? applyMask(e.target.value, mask)
              : e.target.value

              e.target.value = value

            if (onChange) {
              const event = {
                ...e,
                target: { ...e.target, value },
              } as React.ChangeEvent<HTMLInputElement>

              onChange(event)
            }
          }}
          onBlur={(e) => {
            if (!afterBlur || readOnly) {
              onBlur?.(e)
              return
            }

            const newValue = applyAfterBlur(e.target.value, afterBlur)

            if (onChange) {
              const event = {
                ...e,
                target: { ...e.target, value: newValue },
              } as React.ChangeEvent<HTMLInputElement>

              onChange(event)
            }

            onBlur?.(e)
          }}
          {...props}
        />

        {error && (
          <span className={styles.errorMessage}>{error}</span>
        )}
      </div>
    )
  }
)

TextInput.displayName = 'TextInput'

export default TextInput