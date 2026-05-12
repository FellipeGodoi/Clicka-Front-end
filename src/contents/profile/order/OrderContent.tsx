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
import AlertModal from "@/components/modals/alert-modal/AlertModal"
import { OrderItemsSection } from "./OrderItemSection"
import { OrderSummarySection } from "./OrderSumarySection"
import { OrderHeader } from "./OrderHeader"
import { cancelMyOrder } from "@/service/user/cancelOrder"
import Toast from "@/components/modals/toast/Toast"
import ReturnOrderModal from "@/components/modals/return-order-modal/ReturnOrderModal"
import { createReturning } from "@/service/user/createReturning"
import EditCreditCardModal from "@/components/modals/profile-modals/EditCreditCardModal"

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

    const [alertModal, setAlertModal] = useState<boolean>(false)
    const [toastOpen, setToastOpen] = useState(false)

    const [toastData, setToastData] = useState({
        message: "",
        type: "success" as "success" | "error"
    })
    const [loading, setLoading] = useState(true)
    const [order, setOrder] = useState<OrderResponse | null>(null)
    const [user, setUser] = useState<UserMyDataResponse | null>(null)

    const [cardModalOpen, setCardModalOpen] = useState(false)
    const [selectedCards, setSelectedCards] = useState<CardResponse[]>([])
    const [cardValues, setCardValues] = useState<Record<string, number>>({})
    const [createCardModalOpen, setCreateCardModalOpen] = useState(false)
    const [returnModalOpen, setReturnModalOpen] = useState(false)


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
        "AWAITING_PAYMENT",
        "AWAITING_APPROVAL"
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

    async function handleCancelOrder() {
        if (order !== null) {
            try {
                await cancelMyOrder(order.id)

                window.location.reload()

            } catch (error) {
                console.error(error)

                setToastData({
                    message: "Opps, algo deu errado ao cancelar o pedido.",
                    type: "error"
                })

                setToastOpen(true)
            }

        }
    }

    return (
        <PageContainer gap={24}>
            <ProfileSection title="">
                <OrderHeader
                    orderId={order.id}
                    canShowButton={canShowButton}
                    cancelOrder={() => setAlertModal(true)}
                />

            </ProfileSection>

            <OrderSummarySection
                order={order}
                statusMap={statusMap}
            />

            <hr style={{ border: "lightgray dashed 1px" }} />

            {order.status === "AWAITING_PAYMENT" && (
                <OrderPaySection
                    order={order}
                    selectedCards={selectedCards}
                    cardValues={cardValues}
                    setCardModalOpen={setCardModalOpen}
                    handleChangeCardValue={handleChangeCardValue}
                    handleRemoveCard={handleRemoveCard}
                    isValidPayment={isValidPayment}
                    openCreateCardModal={() => setCreateCardModalOpen(true)}
                />
            )}

            <OrderItemsSection items={order.items} />

            <div style={{ display: "flex", justifyContent: "center" }}>
                {
                    order.status === "DELIVERED" && (
                        <Button
                            bgColor="var( --warning-1)"
                            height="36px"
                            maxWidth="200px"
                            onClick={() => setReturnModalOpen(true)}
                        >
                            Solicitar devolução
                        </Button>
                    )
                }
            </div>

            <ReturnOrderModal
                isOpen={returnModalOpen}
                onClose={() => setReturnModalOpen(false)}
                order={order}
                onSubmit={createReturning}
            />


            <AlertModal
                isOpen={alertModal}
                title="Certeza que deseja cancelar esse pedido?"
                onConfirm={handleCancelOrder}
                onCancel={() => setAlertModal(false)}
                message="Essa ação não poderá ser desfeita."
            />

            <Toast
                isOpen={toastOpen}
                message={toastData.message}
                type={toastData.type}
                onClose={() => setToastOpen(false)}
            />

            <EditCreditCardModal
    isOpen={createCardModalOpen}
    onClose={() => setCreateCardModalOpen(false)}
    card={null}
    onSave={(newCard) => {

        setUser(prev => {
            if (!prev) return prev

            return {
                ...prev,
                cards: [...(prev.cards || []), newCard]
            }
        })

        setSelectedCards(prev => [...prev, newCard])

        setCardValues(prev => ({
            ...prev,
            [newCard.id]: 0
        }))
    }}
/>

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