'use client'
import banner01 from "@/media/images/banner-01.png"
import banner02 from "@/media/images/banner-02.png"

import mouse from "@/media/images/mouse-generic.png"
import teclado from "@/media/images/teclado-generic.png"

import style from "./style.module.css"
import PageContainer from "@/components/layout/PageContainer"
import ProductCard from "@/components/layout/ProductCard"
import HorizontalScroller from "@/components/scroller/HorizontalScroller"
import PageBanner from "@/components/page-banner/PageBanner"


const ShopContent = () => {
    return (
        <PageContainer>

            <PageBanner
                banners={[
                    {
                        image: banner01,
                        link: '/'
                    },
                    {
                        image: banner02,
                        link: '/'
                    },
                    {
                        image: banner01,
                        link: '/'
                    },
                ]}
            />

            <div style={{
                display: "flex", flexDirection: "column", gap: 12
            }}>
                <span className={style.title}>Teclados</span>

                <HorizontalScroller>
                    {Array.from({ length: 10 }).map((_, index) => (
                        <ProductCard
                            key={index}
                            image={teclado}
                            name="Teclado Mecânico RGB Switch Blue"
                            originalPrice={399.9}
                            promotionalPrice={299.9}
                        />
                    ))}
                </HorizontalScroller>
                </div>

                <div style={{
                    display: "flex", flexDirection: "column", gap: 12
                }}>
                    <span  className={style.title}>Mouses</span>
                    <HorizontalScroller>
                        {Array.from({ length: 10 }).map((_, index) => (
                            <ProductCard
                                key={index}
                                image={mouse}
                                name="Mouse preto"
                                originalPrice={399.9}
                                promotionalPrice={299.9}
                            />
                        ))}
                    </HorizontalScroller>
                
            </div>


        </PageContainer>
    )
}

export default ShopContent