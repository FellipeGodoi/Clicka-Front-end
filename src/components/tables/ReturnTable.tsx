'use client'

import {
    ReturnResponse
} from "@/service/admin/getAllReturns"

import { formatDate } from "@/utils/helpers/format-date"

interface Props {
    returns: ReturnResponse[]

    statusMap: Record<string, string>

    onSelectReturn: (
        returnData: ReturnResponse
    ) => void
}

export default function AdminReturnsTable({
    returns,
    statusMap,
    onSelectReturn
}: Props) {

    if (!returns.length) {

        return (
            <div
                style={{ padding: 12 }}
                className="
                    w-full
                    rounded-xl
                    border
                    border-[var(--neutral-20)]
                    text-sm
                    text-gray-500
                "
            >
                Nenhuma devolução encontrada
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

                        <th
                            style={{ padding: "12px 16px" }}
                            className="text-sm font-semibold"
                        >
                            Devolução
                        </th>

                        <th
                            style={{ padding: "12px 16px" }}
                            className="text-sm font-semibold"
                        >
                            Pedido
                        </th>

                        <th
                            style={{ padding: "12px 16px" }}
                            className="text-sm font-semibold"
                        >
                            Criação
                        </th>


                        <th
                            style={{ padding: "12px 16px" }}
                            className="text-sm font-semibold"
                        >
                            Status
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {returns.map((returnData, index) => (

                        <tr
                            key={returnData.id}

                            id={`return-${index}`}

                            onClick={() =>
                                onSelectReturn(returnData)
                            }

                            style={{
                                cursor: "pointer"
                            }}

                            className="
                                border-t
                                border-[var(--neutral-20)]
                                hover:bg-gray-50
                                transition-colors
                            "
                        >

                            <td
                                className="text-sm"
                                style={{ padding: "12px 16px" }}
                            >
                                {returnData.id
                                    .slice(0, 10)
                                    .toUpperCase()}
                            </td>

                            <td
                                className="text-sm"
                                style={{ padding: "12px 16px" }}
                            >
                                {returnData.orderId
                                    .slice(0, 10)
                                    .toUpperCase()}
                            </td>

                            <td
                                className="text-sm"
                                style={{ padding: "12px 16px" }}
                            >
                                {returnData.createdAt
                                    ? formatDate(returnData.createdAt)
                                    : "-"
                                }
                            </td>


                            <td
                                className="text-sm"
                                style={{ padding: "12px 16px" }}
                            >
                                {statusMap[returnData.status]
                                    ?? returnData.status}
                            </td>
                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    )
}