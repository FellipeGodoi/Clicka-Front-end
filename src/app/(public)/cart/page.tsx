import CartContent from "@/contents/cart-content/CartContent"
import { Suspense } from "react"

const CartPage = () => {
    return (
        <Suspense fallback ={null}>
            <CartContent/>
        </Suspense>
    )
}

export default CartPage