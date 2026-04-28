import { OrderContent } from "@/contents/profile/order/OrderContent"
import { Suspense } from "react"

const MyOrderPage = () => {
    return (
        <Suspense fallback={null}>
            <OrderContent/>
        </Suspense>
    )
}

export default MyOrderPage