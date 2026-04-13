'use client'

import Image, { StaticImageData } from 'next/image'
import styles from './product-card.module.css'

interface ProductCardProps {
  image: StaticImageData
  name: string
  originalPrice: number
  promotionalPrice: number
}

const ProductCard = ({
  image,
  name,
  originalPrice,
  promotionalPrice
}: ProductCardProps) => {
  return (
    <div className={styles.card}>
      
      {/* Imagem */}
      <div className={styles.imageWrapper}>
        <Image
          src={image}
          alt={name}
          fill
          className={styles.image}
        />
      </div>

      {/* Nome */}
      <h3 className={styles.name}>
        {name}
      </h3>

      {/* Preços */}
      <div className={styles.prices}>
        <span className={styles.originalPrice}>
          R$ {originalPrice.toFixed(2)}
        </span>

        <span className={styles.promotionalPrice}>
          R$ {promotionalPrice.toFixed(2)}
        </span>
      </div>
    </div>
  )
}

export default ProductCard