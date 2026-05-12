'use client'

import { OrderResponse } from "@/service/user/getMyOrder"
import { formatDate } from "@/utils/helpers/format-date"

interface Props {
    orders: OrderResponse[]
    statusMap: Record<string, string>
    onSelectOrder: (order: OrderResponse) => void
}

export default function AdminOrdersTable({
    orders,
    statusMap,
    onSelectOrder
}: Props) {

    if (!orders.length) {
        return (
            <div
             style={{padding:12}}
                className="
          w-full
          rounded-xl
          border
          border-[var(--neutral-20)]
          text-sm
          text-gray-500
        "
            >
                Nenhum pedido encontrado
            </div>
        )
    }

    return (
        <div
            className="
        overflow-hidden
        rounded-2xl
        border
        border-[var(--neutral-20)]
      "
        >
            <table className="w-full border-collapse">
                <thead
                    className="
            bg-[var(--neutral-10)]
            text-left
          "
                >
                    <tr>
                        <th style={{ padding: "12px 16px" }} className="text-sm font-semibold">
                            Pedido
                        </th>

                        <th style={{ padding: "12px 16px" }} className="text-sm font-semibold">
                            Criação
                        </th>

                        <th style={{ padding: "12px 16px" }} className="text-sm font-semibold">
                            Atualização
                        </th>

                        <th style={{ padding: "12px 16px" }} className="text-sm font-semibold">
                            Status
                        </th>

                        <th style={{ padding: "12px 16px" }} className="text-sm font-semibold">
                            Valor final
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map((order, index) => (
                        <tr
                            onClick={() => onSelectOrder(order)}
                            style={{ cursor: "pointer" }}
                            key={order.id}
                            id={'order-' + index}
                            className=" border-t
                                        border-[var(--neutral-20)]
                                        hover:bg-gray-50
                                        transition-colors
                                    "
                        >
                            <td className="text-sm" style={{ padding: "12px 16px" }}>
                                {order.id.slice(0, 10).toUpperCase()}
                            </td>

                            <td className="text-sm" style={{ padding: "12px 16px" }}>
                                {order.createdAt
                                    ? formatDate(order.createdAt)
                                    : "-"
                                }
                            </td>

                            <td className="text-sm" style={{ padding: "12px 16px" }}>
                                {order.updatedAt
                                    ? formatDate(order.updatedAt)
                                    : "-"
                                }
                            </td>

                            <td className="text-sm" style={{ padding: "12px 16px" }}>
                                {statusMap[order.status] ?? order.status}
                            </td>

                            <td className="text-sm font-medium" style={{ padding: "12px 16px" }}>
                                R$ {Number(order.finalAmount).toFixed(2)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


        </div>
    )
}