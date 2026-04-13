'use client'

import Image, { StaticImageData } from 'next/image'
import { useRef } from 'react'
import styles from './style.module.css'

interface BannerItem {
  image: string | StaticImageData
  link: string
}

interface PageBannerProps {
  banners: BannerItem[]
}

const PageBanner = ({ banners }: PageBannerProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const scrollNext = () => {
    if (!containerRef.current) return
    containerRef.current.scrollBy({
      left: containerRef.current.clientWidth,
      behavior: 'smooth'
    })
  }

  const scrollPrev = () => {
    if (!containerRef.current) return
    containerRef.current.scrollBy({
      left: -containerRef.current.clientWidth,
      behavior: 'smooth'
    })
  }

  return (
    <div className={styles.wrapper}>
      <button
        className={`${styles.navButton} ${styles.left}`}
        onClick={scrollPrev}
        aria-label="Banner anterior"
      >
        ‹
      </button>

      <div ref={containerRef} className={styles.container}>
        {banners.map((banner, index) => (
          <a
            key={index}
            href={banner.link}
            className={styles.banner}
          >
            <Image
              src={banner.image}
              alt={`Banner ${index + 1}`}
              fill
              className={styles.image}
              priority={index === 0}
            />
          </a>
        ))}
      </div>

      <button
        className={`${styles.navButton} ${styles.right}`}
        onClick={scrollNext}
        aria-label="Próximo banner"
      >
        ›
      </button>
    </div>
  )
}

export default PageBanner