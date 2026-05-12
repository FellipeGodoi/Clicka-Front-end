import { OrderResponse } from "@/service/user/getMyOrder"
import { formatDate } from "@/utils/helpers/format-date"

interface Props {
    order: OrderResponse
    statusMap: Record<string, string>
}

export function OrderSummarySection({
    order,
    statusMap
}: Props) {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                {order.createdAt && (<p style={{ width: "25%" }}> <span className="font-medium">Criação do pedido:</span>{" "} {formatDate(order.createdAt)} </p>)}

                {order.updatedAt && (<p style={{ width: "25%" }}> <span className="font-medium">Pedido atualizado em:</span>{" "} {formatDate(order.updatedAt)} </p>)}

                {order.estimatedDeliveryDate && (<p style={{ width: "25%" }}> <span className="font-medium">Prazo para entrega:</span>{" "} {formatDate(order.estimatedDeliveryDate)} </p>)}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ width: "25%" }}>
                    <span className="font-medium">Status:</span>{" "}
                    {statusMap[order.status] || order.status}
                </p>

                <p style={{ width: "25%" }}>
                    <span className="font-medium">Total produtos:</span>{" "}
                    R$ {Number(order.totalAmount).toFixed(2)}
                </p>

                <p style={{ width: "25%" }}>
                    <span className="font-medium">Desconto:</span>{" "}
                    R$ {Number(order.discountAmount).toFixed(2)}
                </p>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ width: "25%" }}>
                    <span className="font-medium">Crédito usado:</span>{" "}
                    R$ {Number(order.creditUsed).toFixed(2)}
                </p>

                <p style={{ width: "25%" }}>
                    <span className="font-medium">Total final:</span>{" "}
                    <span className="font-bold">
                        R$ {Number(order.finalAmount).toFixed(2)}
                    </span>
                </p>

                <p style={{ width: "25%" }}>
                    {order.couponCode && (
                        <>
                            <span className="font-medium">Cupom:</span>{" "}
                            {order.couponCode}
                        </>
                    )}
                </p>
            </div>
        </div>
    )
}