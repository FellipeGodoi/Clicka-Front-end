'use client'

'use client'


import PageContainer from "@/components/layout/PageContainer"
import styles from './style.module.css'
import { useState } from "react"
import { productMock } from "@/interfaces/front-interfaces/Product.front.interface"

const ProductContent = () => {
    const [added, setAdded] = useState(false)

    const handleAddToCart = () => {
        const existingCart = localStorage.getItem('cart')
        const parsedCart: string[] = existingCart ? JSON.parse(existingCart) : []

        if (!parsedCart.includes(productMock.id)) {
            parsedCart.push(productMock.id)
            localStorage.setItem('cart', JSON.stringify(parsedCart))
        }

        setAdded(true)
    }

    return (
        <PageContainer gap={32}>
            <div className={styles.container}>

                {/* Top section */}
                <div className={styles.topSection}>

                    {/* Left - Image */}
                    <div className={styles.imageContainer}>
                        <div className={styles.imageMock}>
                            Imagem do Produto
                        </div>
                    </div>

                    {/* Right - Info */}
                    <div className={styles.infoContainer}>
                        <h1 className={styles.title}>{productMock.name}</h1>
                        <span className={styles.code}>Código: {productMock.code}</span>

                        <div className={styles.priceContainer}>
                            <span className={styles.originalPrice}>
                                R$ {productMock.originalPrice.toFixed(2)}
                            </span>
                            <span className={styles.promoPrice}>
                                R$ {productMock.promoPrice.toFixed(2)}
                            </span>
                        </div>

                        <span className={styles.stock}>
                            Estoque disponível: {productMock.estoque}
                        </span>

                        <button
                            className={styles.button}
                            onClick={handleAddToCart}
                        >
                            {added ? "Adicionado ao carrinho" : "Adicionar ao carrinho"}
                        </button>
                    </div>
                </div>

                {/* Description */}
                <div className={styles.description}>
                    {productMock.describe}
                </div>

                {/* Details */}
                {productMock.details && (
                    <div className={styles.detailsContainer}>
                        <h2>Detalhes</h2>
                        <div className={styles.detailsGrid}>
                            {productMock.details.map(detail => (
                                <div key={detail.id} className={styles.detailItem}>
                                    <span className={styles.detailLabel}>
                                        {detail.label}
                                    </span>
                                    <span className={styles.detailValue}>
                                        {detail.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </PageContainer>
    )
}

export default ProductContent