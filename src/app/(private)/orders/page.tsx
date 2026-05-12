import OrdersContent from "@/contents/orders-content/OrdersContent"
import { Suspense } from "react"

const OrdersPage = () => {
    return(
        <Suspense fallback={null}>
            <OrdersContent/>
        </Suspense>
    )
}

export default OrdersPage