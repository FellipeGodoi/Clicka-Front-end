import ProductContent from "@/contents/product-content/ProductContent"
import { Suspense } from "react"

const ProductPage = () => {
    return (
        <Suspense fallback={null}>
            <ProductContent/>
        </Suspense>
    )
}

export default ProductPage