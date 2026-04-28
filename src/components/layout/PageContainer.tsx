'use client'

import { ReactNode } from 'react'

interface PageContainerProps {
  children: ReactNode
  minHeight?: string | number
  maxWidth?: number
  margin?: string
  gap?:number
}

const PageContainer = ({
  children,
  maxWidth = 1200,
  minHeight = "70vh",
  margin = '24px',
  gap=60
}: PageContainerProps) => {
  return (
    <div
      style={{
        width: '100%',
        maxWidth,
        minHeight,
        margin,
        display:'flex',
        flexDirection:'column',
        gap

      }}
    >
      {children}
    </div>
  )
}

export default PageContainer