'use client'

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { LoadingOverlay } from "@/components/loading/LoadingOverlay"
import { getMyOrderById } from "@/service/user/getMyOrder"
import PageContainer from "@/components/layout/PageContainer"

const statusMap: Record<string, string> = {
    CREATED: "Criado",
    AWAITING_PAYMENT: "Aguardando pagamento",
    AWAITING_APPROVAL: "Aguardando aprovação",
    APPROVED: "Aprovado",
    SHIPPED: "Enviado",
    DELIVERED: "Entregue",
    CANCELLED: "Cancelado",
}

export function OrderContent() {
    const { id } = useParams()

    const [loading, setLoading] = useState(true)
    const [order, setOrder] = useState<any>(null)

    useEffect(() => {
        async function fetchOrder() {
            try {
                const data = await getMyOrderById(id as string)
                setOrder(data)
            } catch (error) {
                console.error("Erro ao buscar pedido", error)
            } finally {
                setLoading(false)
            }
        }

        if (id) fetchOrder()
    }, [id])

    if (loading) {
        return <LoadingOverlay isLoading />
    }

    if (!order) {
        return (
            <PageContainer gap={16}>
                <p className="text-center mt-10">Pedido não encontrado</p>
            </PageContainer>
        )
    }

    return (
        <PageContainer gap={16}>
            <h1 className="text-xl font-semibold">
                Pedido: {order.id}
            </h1>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p>
                    <span className="font-medium">Status:</span>{" "}
                    {statusMap[order.status] || order.status}
                </p>

                <p>
                    <span className="font-medium">Total produtos:</span>{" "}
                    R$ {Number(order.totalAmount).toFixed(2)}
                </p>

                <p>
                    <span className="font-medium">Desconto:</span>{" "}
                    R$ {Number(order.discountAmount).toFixed(2)}
                </p>
            </div>


            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p>
                    <span className="font-medium">Crédito usado:</span>{" "}
                    R$ {Number(order.creditUsed).toFixed(2)}
                </p>

                <p>
                    <span className="font-medium">Total final:</span>{" "}
                    <span className="font-bold">
                        R$ {Number(order.finalAmount).toFixed(2)}
                    </span>
                </p>

                {order.couponCode && (
                    <p>
                        <span className="font-medium">Cupom:</span>{" "}
                        {order.couponCode}
                    </p>
                )}
            </div>

            {/* NAO ESQUEÇA DE ADICIONAR NO ENDPOINT A DATA DE ENTREGA E DATA ESPERADA */}
            {/* PROXIMO PASSO CRIAR A PARTE DO PAGAMENTO */}
            {/* DPS O CANCELAR PEDIDO */}
            {/* E FINALIZAR COM A VISUALIZAÇÃO DOS ITENS DE PEDIDO, E PEDIDOS A PAGAR */}

        </PageContainer>
    )
}