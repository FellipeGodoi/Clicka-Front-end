import RefundContent from "@/contents/refunds-content/RefundsContent"
import { Suspense } from "react"

const RefundPage = () => {
    return (
        <Suspense fallback={null}>
            <RefundContent />
        </Suspense>
    )
}

export default RefundPage