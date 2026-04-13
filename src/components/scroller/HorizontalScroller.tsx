'use client'

import { ReactNode, useRef } from 'react'
import styles from './style.module.css'

interface HorizontalScrollerProps {
  children: ReactNode
  scrollAmount?: number
}

const HorizontalScroller = ({
  children,
  scrollAmount = 300
}: HorizontalScrollerProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const scrollLeftFn = () => {
    containerRef.current?.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    })
  }

  const scrollRightFn = () => {
    containerRef.current?.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    })
  }

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.sideButton}
        onClick={scrollLeftFn}
        aria-label="Scroll para esquerda"
      >
        ‹
      </button>

      <div ref={containerRef} className={styles.container}>
        {children}
      </div>

      <button
        className={styles.sideButton}
        onClick={scrollRightFn}
        aria-label="Scroll para direita"
      >
        ›
      </button>
    </div>
  )
}

export default HorizontalScroller