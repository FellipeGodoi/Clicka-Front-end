'use client'

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { LoadingOverlay } from "@/components/loading/LoadingOverlay"
import { getMyOrderById, OrderResponse } from "@/service/user/getMyOrder"
import PageContainer from "@/components/layout/PageContainer"
import { formatDate } from "@/utils/helpers/format-date"
import { isStatusAllowed } from "@/utils/helpers/is-status-allowed"
import { Button } from "@/components/button/Button"
import ProfileSection from "@/components/profile-sections/ProfileSections"
import { CardResponse, UserMyDataResponse } from "@/interfaces/request-interfaces/request-user.interface"
import { getMyData } from "@/service/user/getUser"
import SelectCardsModal from "@/components/modals/order/SelectCardsModal"
import { OrderPaySection } from "./OrderPaySection"

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
    const router = useRouter()


    const [loading, setLoading] = useState(true)
    const [order, setOrder] = useState<OrderResponse | null>(null)
    const [user, setUser] = useState<UserMyDataResponse | null>(null)

    const [cardModalOpen, setCardModalOpen] = useState(false)
    const [selectedCards, setSelectedCards] = useState<CardResponse[]>([])
    const [cardValues, setCardValues] = useState<Record<string, number>>({})


    useEffect(() => {
        async function fetchOrder() {
            const token = localStorage.getItem("token")

            if (!token) {
                setLoading(false)
                router.push("/auth")
                return
            }
            try {
                const data = await getMyOrderById(id as string)
                setOrder(data)

                const userData = await getMyData()
                setUser(userData)
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

    const canShowButton = isStatusAllowed(order.status, [
        "CREATED",
        "AWAITING_PAYMENT"
    ])

    function handleChangeCardValue(cardId: string, value: string) {
        const numericValue = Number(
            value
                .replace("R$", "")
                .replace(/\./g, "")
                .replace(",", ".")
                .trim()
        ) || 0

        setCardValues(prev => ({
            ...prev,
            [cardId]: numericValue
        }))
    }

    const totalCardsValue = Object.values(cardValues).reduce(
        (sum, value) => sum + value,
        0
    )

    const isValidPayment = (() => {
        const total = Number(order.finalAmount)

        if (selectedCards.length === 1) {
            return true
        }

        if (selectedCards.length > 1) {
            const isTotalCorrect =
                Math.abs(totalCardsValue - total) < 0.01

            const hasMinValue = selectedCards.every(card => {
                const value = cardValues[card.id] || 0
                return value >= 10
            })

            return isTotalCorrect && hasMinValue
        }

        return false
    })()

    function handleRemoveCard(cardId: string) {
        setSelectedCards(prev =>
            prev.filter(card => card.id !== cardId)
        )

        setCardValues(prev => {
            const updated = { ...prev }
            delete updated[cardId]
            return updated
        })
    }

    return (
        <PageContainer gap={24}>
            <ProfileSection
                title=""
            >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", alignItems: "center" }}>
                    <h1 className="text-xl font-semibold">
                        Pedido: {order.id}
                    </h1>

                    {
                        canShowButton &&
                        <Button
                            maxWidth="200px"
                            height="38px"
                            ftColor="var(--error-1)"
                            borderColor="var(--error-1) dashed"
                        >
                            Cancelar pedido
                        </Button>
                    }
                </div>
            </ProfileSection>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
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
                        {order.couponCode && (<>
                            <span className="font-medium">Cupom:</span>{" "}
                            {order.couponCode}
                        </>
                        )}
                    </p>

                </div>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    {order.createdAt && (
                        <p style={{ width: "25%" }}>
                            <span className="font-medium">Criação do pedido:</span>{" "}
                            {formatDate(order.createdAt)}
                        </p>
                    )}
                    {order.updatedAt && (
                        <p style={{ width: "25%" }}>
                            <span className="font-medium">Pedido atualizado em:</span>{" "}
                            {formatDate(order.updatedAt)}
                        </p>
                    )}
                    {order.estimatedDeliveryDate && (
                        <p style={{ width: "25%" }}>
                            <span className="font-medium">Prazo para entrega:</span>{" "}
                            {formatDate(order.estimatedDeliveryDate)}
                        </p>
                    )}
                    {order.deliveredAt && (
                        <p style={{ width: "25%" }}>
                            <span className="font-medium">Criação do pedido:</span>{" "}
                            {formatDate(order.deliveredAt)}
                        </p>
                    )}
                </div>


            </div>

            <hr style={{ border: "lightgray dashed 1px" }} />

            {
                order.status === "AWAITING_PAYMENT" &&
                <OrderPaySection
                    order={order}
                    selectedCards={selectedCards}
                    cardValues={cardValues}
                    setCardModalOpen={setCardModalOpen}
                    handleChangeCardValue={handleChangeCardValue}
                    handleRemoveCard={handleRemoveCard}
                    isValidPayment={isValidPayment}
                />
            }



            <SelectCardsModal
                isOpen={cardModalOpen}
                onClose={() => setCardModalOpen(false)}
                cards={user?.cards || []}
                initialSelected={selectedCards}
                onConfirm={(cards) => {
                    setSelectedCards(cards)

                    const initialValues: Record<string, number> = {}

                    cards.forEach(card => {
                        initialValues[card.id] = 0
                    })

                    setCardValues(initialValues)
                }}
            />
        </PageContainer>
    )
}