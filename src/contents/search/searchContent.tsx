'use client'

import PageContainer from "@/components/layout/PageContainer"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

import styles from "./style.module.css"

import mouse from "@/media/images/mouse-generic.png"
import teclado from "@/media/images/teclado-generic.png"
import fone from "@/media/images/fone-generic.png"

import { ProductResponse, searchProducts } from "@/service/user/getProducts"
import ProductCard from "@/components/layout/ProductCard"
import { LoadingOverlay } from "@/components/loading/LoadingOverlay"
import { div } from "framer-motion/client"

export const SearchContent = () => {
    const searchParams = useSearchParams()
    const query = searchParams.get("query") || ""

    const [products, setProducts] = useState<ProductResponse[]>([])
    const [loading, setLoading] = useState(true)
    const [type, setType] = useState("")
    const [minPrice, setMinPrice] = useState("")
    const [maxPrice, setMaxPrice] = useState("")
    const [orderByPrice, setOrderByPrice] = useState("ASC")
    const [includeOutOfStock, setIncludeOutOfStock] = useState(true)


    const [categoryOpen, setCategoryOpen] = useState(false)
    const [orderOpen, setOrderOpen] = useState<boolean>(false)
    const [selected, setSelected] = useState("")

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true)

                const data = await searchProducts({
                    search: query,
                    minPrice: minPrice ? Number(minPrice) : undefined,
                    maxPrice: maxPrice ? Number(maxPrice) : undefined,
                    type: selected || undefined,
                    includeOutOfStock,
                    orderByPrice,
                    size: 8,
                    page: 0
                })

                setProducts(data.content)
            } finally {
                setLoading(false)
            }
        }



        if (query) load()
    }, [query, selected, minPrice, maxPrice, orderByPrice, includeOutOfStock])

    const getProductImage = (name: string) => {
        const lower = name.toLowerCase()

        if (lower.includes("mouse")) return mouse
        if (lower.includes("teclado") || lower.includes("keyboard")) return teclado
        if (lower.includes("fone") || lower.includes("headset")) return fone

        return teclado
    }

    return (
        <PageContainer gap={12}>
            <LoadingOverlay isLoading={loading} />
            <>

                <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>

                    <div className={styles.dropdown}>
                        <button onClick={() => setCategoryOpen(!categoryOpen)}>
                            {selected || "Todas categorias"}
                        </button>

                        {categoryOpen && (
                            <div className={styles.menu}>
                                <div onClick={() => setSelected("MOUSE")}>Mouse</div>
                                <div onClick={() => setSelected("KEYBOARD")}>Teclado</div>
                                <div onClick={() => setSelected("HEADSET")}>Headset</div>
                            </div>
                        )}
                    </div>
                    <input
                        className={styles.input}
                        placeholder="Preço mínimo"
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                    />
                    <input
                        className={styles.input}
                        placeholder="Preço limite"
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                    />
                    <div className={styles.dropdown}>
                        <button onClick={() => setOrderOpen(!orderOpen)}>
                            {orderByPrice === "ASC" ? "Menor preço" : "Maior preço"}
                        </button>

                        {orderOpen && (
                            <div className={styles.menu}>
                                <div
                                    onClick={() => {
                                        setOrderByPrice("ASC")
                                        setOrderOpen(false)
                                    }}
                                >
                                    Menor preço
                                </div>

                                <div
                                    onClick={() => {
                                        setOrderByPrice("DESC")
                                        setOrderOpen(false)
                                    }}
                                >
                                    Maior preço
                                </div>
                            </div>
                        )}
                    </div>

                    <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <input
                            type="checkbox"
                            checked={includeOutOfStock}
                            onChange={(e) => setIncludeOutOfStock(e.target.checked)}
                        />
                        Incluir sem estoque
                    </label>

                </div>
                <h2 style={{ marginBottom: 16 }}>
                    Resultados para: "{query}"
                </h2>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap: 16
                    }}
                >
                    {products.length > 0 ? products.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            image={getProductImage(product.name)}
                            name={product.name}
                            originalPrice={product.defaultPrice}
                            promotionalPrice={product.promotionalPrice}
                        />
                    )) : (
                        <>
                            <div>
                                nenhum produto encontrado
                            </div>
                        </>
                    )}
                </div>
            </>
        </PageContainer>
    )
}