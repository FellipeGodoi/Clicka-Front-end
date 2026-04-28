'use client'

import PageContainer from "@/components/layout/PageContainer"
import styles from './style.module.css'
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { LoadingOverlay } from "@/components/loading/LoadingOverlay"
import { getProductById, ProductDetail } from "@/service/user/getProduct"


const ProductContent = () => {
    const params = useParams()
    const id = params.id as string
    const token = localStorage.getItem("token")


    const [product, setProduct] = useState<ProductDetail | null>(null)
    const [added, setAdded] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getProductById(id)
                setProduct(data)
            } finally {
                setLoading(false)
            }
        }

        if (id) load()
    }, [id])

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getProductById(id)
                setProduct(data)

                const existingCart = localStorage.getItem('cart')
                const parsedCart: string[] = existingCart ? JSON.parse(existingCart) : []

                if (parsedCart.includes(data.id)) {
                    setAdded(true)
                }

            } finally {
                setLoading(false)
            }
        }

        if (id) load()
    }, [id])

    const router = useRouter()

    const handleAddToCart = () => {
        if (!product) return

        if (!token) {
            setLoading(false)
            router.push("/auth")
            return
        }

        const existingCart = localStorage.getItem('cart')
        const parsedCart: string[] = existingCart ? JSON.parse(existingCart) : []

        if (!parsedCart.includes(product.id)) {
            parsedCart.push(product.id)
            localStorage.setItem('cart', JSON.stringify(parsedCart))
        }

        setAdded(true)
    }

    if (!product) return <LoadingOverlay isLoading={loading} />

    return (
        <PageContainer gap={32}>
            <LoadingOverlay isLoading={loading} />

            <div className={styles.container}>
                <div className={styles.topSection}>


                    <div className={styles.imageContainer}>
                        <div className={styles.imageMock}>
                            {product.imageUrl}
                        </div>
                    </div>


                    <div className={styles.infoContainer}>
                        <h1 className={styles.title}>{product.name}</h1>
                        <span className={styles.code}>Código: {product.id}</span>

                        <div className={styles.priceContainer}>
                            {product.promotionalPrice ? (
                                <>
                                    <span className={styles.originalPrice}>
                                        R$ {product.defaultPrice.toFixed(2)}
                                    </span>
                                    <span className={styles.promoPrice}>
                                        R$ {product.promotionalPrice.toFixed(2)}
                                    </span>
                                </>
                            ) : (
                                <span className={styles.promoPrice}>
                                    R$ {product.defaultPrice.toFixed(2)}
                                </span>
                            )}
                        </div>

                        <span className={styles.stock}>
                            Estoque disponível: {product.stockQuantity}
                        </span>

                        <button
                            className={styles.button}
                            onClick={handleAddToCart}
                            disabled={added}
                        >
                            {added ? "Adicionado ao carrinho" : "Adicionar ao carrinho"}
                        </button>

                        {product.tags && product.tags.length > 0 && (
                            <div className={styles.tagsContainer}>
                                {product.tags.map((tag, index) => (
                                    <span key={index} className={styles.tag}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Description */}
                <div className={styles.description}>
                    {product.description}
                </div>

                {/* Details */}
                {product.details && product.details.length > 0 && (
                    <div className={styles.detailsContainer}>
                        <h2>Detalhes</h2>
                        <div className={styles.detailsGrid}>
                            {product.details.map((detail, index) => (
                                <div key={index} className={styles.detailItem}>
                                    <span className={styles.detailLabel}>
                                        {detail.name}
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