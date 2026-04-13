'use client'

import { ButtonHTMLAttributes } from 'react'
import styles from './button.module.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string
}

const Button = ({
  children,
  type = 'button',
  color,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      style={
        color
          ? { backgroundColor: `var(${color})` }
          : undefined
      }
      className={`${styles.button} ${className ?? ''}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button