'use client'

import Image, { StaticImageData } from 'next/image'
import styles from './product-card.module.css'
import { useNavigate } from '@/utils/hooks/UseNavigate'

interface ProductCardProps {
  image: StaticImageData
  name: string
  originalPrice: number
  promotionalPrice?: number
  id: string
}

const ProductCard = ({
  image,
  name,
  originalPrice,
  promotionalPrice,
  id,
}: ProductCardProps) => {
  const hasPromotion = promotionalPrice !== undefined && promotionalPrice !== null
  const { navigateTo } = useNavigate()

  return (
    <div  id={`prod-card-${id}`} className={styles.card} onClick={() => navigateTo('/product/' + id)}>

      <div className={styles.imageWrapper}>
        <Image
          src={image}
          alt={name}
          fill
          className={styles.image}
        />
      </div>

      <h3 className={styles.name}>
        {name}
      </h3>

      <div className={styles.prices}>
        {hasPromotion ? (
          <>
            <span className={styles.originalPrice}>
              R$ {originalPrice.toFixed(2)}
            </span>

            <span className={styles.promotionalPrice}>
              R$ {promotionalPrice.toFixed(2)}
            </span>
          </>
        ) : (
          <span className={styles.promotionalPrice}>
            R$ {originalPrice.toFixed(2)}
          </span>
        )}
      </div>
    </div>
  )
}

export default ProductCard