'use client'
import { useEffect, useState } from "react"

import banner01 from "@/media/images/banner-01.png"
import banner02 from "@/media/images/banner-02.png"

import mouse from "@/media/images/mouse-generic.png"
import teclado from "@/media/images/teclado-generic.png"

import style from "./style.module.css"
import PageContainer from "@/components/layout/PageContainer"
import ProductCard from "@/components/layout/ProductCard"
import HorizontalScroller from "@/components/scroller/HorizontalScroller"
import PageBanner from "@/components/page-banner/PageBanner"
import { getProductsByType, ProductResponse } from "@/service/user/getProducts"


const ShopContent = () => {
    const [keyboards, setKeyboards] = useState<ProductResponse[]>([])
    const [mouses, setMouses] = useState<ProductResponse[]>([])
    const [headsets, setHeadses] = useState<ProductResponse[]>([])

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const [keyboardRes, mouseRes, headsetRes] = await Promise.all([
                    getProductsByType("KEYBOARD"),
                    getProductsByType("MOUSE"),
                    getProductsByType("HEADSET")
                ])

                setKeyboards(keyboardRes.content)
                setMouses(mouseRes.content)
                setHeadses(headsetRes.content)
            } catch (error) {
                console.error("Erro ao carregar produtos", error)
            }
        }

        loadProducts()
    }, [])

    return (
        <PageContainer>
            <PageBanner
                banners={[
                    { image: banner01, link: "/" },
                    { image: banner02, link: "/" },
                    { image: banner01, link: "/" },
                ]}
            />

            {/* TECLADOS */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <span className={style.title}>Teclados</span>

                <HorizontalScroller>
                    {keyboards.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            image={teclado}
                            name={product.name}
                            originalPrice={product.defaultPrice}
                            promotionalPrice={product.promotionalPrice}
                        />
                    ))}
                </HorizontalScroller>
            </div>

            {/* MOUSES */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <span className={style.title}>Mouses</span>

                <HorizontalScroller>
                    {mouses.map((product) => (
                        <ProductCard
                            id={product.id}
                            key={product.id}
                            image={mouse}
                            name={product.name}
                            originalPrice={product.defaultPrice}
                            promotionalPrice={product.promotionalPrice}
                        />
                    ))}
                </HorizontalScroller>
            </div>

            {/* HEADSET */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <span className={style.title}>Headsets</span>

                <HorizontalScroller>
                    {headsets.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            image={mouse}
                            name={product.name}
                            originalPrice={product.defaultPrice}
                            promotionalPrice={product.promotionalPrice}
                        />
                    ))}
                </HorizontalScroller>
            </div>
        </PageContainer>
    )
}

export default ShopContent