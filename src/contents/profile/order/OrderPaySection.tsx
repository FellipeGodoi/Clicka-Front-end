'use client'

import { Button } from "@/components/button/Button"
import TextInput from "@/components/inputs/text-input/TextInput"
import { CardResponse } from "@/interfaces/request-interfaces/request-user.interface"
import { payOrder } from "@/service/user/payOrder"
import { useRouter } from "next/navigation"

type Props = {
    order: any
    selectedCards: CardResponse[]
    cardValues: Record<string, number>

    setCardModalOpen: (value: boolean) => void
    handleChangeCardValue: (cardId: string, value: string) => void
    handleRemoveCard: (cardId: string) => void

    isValidPayment: boolean
}

export function OrderPaySection({
    order,
    selectedCards,
    cardValues,
    setCardModalOpen,
    handleChangeCardValue,
    handleRemoveCard,
    isValidPayment
}: Props) {

    const totalCardsValue = Object.values(cardValues).reduce(
        (sum, value) => sum + value,
        0
    )

    const router = useRouter()

    return (
        <>
            <div>
                <Button
                    id='add-payment'
                    maxWidth="300px"
                    height="40px"
                    bgColor="var(--light-blue-100)"
                    ftColor="white"
                    onClick={() => setCardModalOpen(true)}
                >
                    Adicionar metodo de pagamento
                </Button>
            </div>

            {/* 1 cartão */}
            {selectedCards.length === 1 && (
                <div style={{ marginTop: "16px" }}>
                    <h3 style={{ fontWeight: 600, marginBottom: "8px" }}>
                        Pagamento
                    </h3>

                    <div
                        style={{
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            padding: "12px"
                        }}
                    >
                        <p style={{ fontWeight: 500 }}>
                            {selectedCards[0].nickname}
                        </p>
                        <p style={{ fontSize: "14px", color: "#666" }}>
                            **** **** **** {selectedCards[0].cardNumber.slice(-4)}
                        </p>

                        <p style={{ marginTop: "8px", fontWeight: 500 }}>
                            Valor: R$ {Number(order.finalAmount).toFixed(2)}
                        </p>
                    </div>
                </div>
            )}

            {/* 2+ cartões */}
            {selectedCards.length > 1 && (
                <div style={{ marginTop: "16px" }}>
                    <h3 style={{ fontWeight: 600, marginBottom: "8px" }}>
                        Dividir pagamento
                    </h3>

                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        {selectedCards.map((card,index) => (
                            <div
                                key={card.id}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    gap: "12px"
                                }}
                            >
                                <span style={{ minWidth: "150px" }}>
                                    {card.nickname}
                                </span>

                                <TextInput
                                    id={`value-${index}`}
                                    value={
                                        cardValues[card.id]
                                            ? cardValues[card.id].toLocaleString("pt-BR", {
                                                style: "currency",
                                                currency: "BRL"
                                            })
                                            : ""
                                    }
                                    placeholder="00.00"
                                    label=""
                                    onChange={(e) =>
                                        handleChangeCardValue(card.id, e.target.value)
                                    }
                                    mask="currency"
                                    maxWidth={'200px'}
                                />

                                <Button
                                    borderColor="1px dashed var(--error-1)"
                                    ftColor="var(--error-1)"
                                    height="38px"
                                    maxWidth="220px"
                                    onClick={() => handleRemoveCard(card.id)}
                                >
                                    Remover Cartão
                                </Button>
                            </div>
                        ))}
                    </div>

                    <p style={{ marginTop: "8px", fontSize: "14px" }}>
                        Total informado: R$ {totalCardsValue.toFixed(2)}
                    </p>

                    {!isValidPayment && (
                        <p style={{ color: "red", fontSize: "13px" }}>
                            A soma deve ser igual ao total e cada cartão deve ter no mínimo R$ 10,00
                        </p>
                    )}
                </div>
            )}

            {/* Botão */}
            <div style={{ marginTop: "16px" }}>
                <Button
                    id='finish-payment'
                    maxWidth="300px"
                    height="40px"
                    bgColor="var(--success-1)"
                    ftColor="white"
                    onClick={async () => {
                        try {
                            let payments

                            if (selectedCards.length === 1) {
                                payments = [
                                    {
                                        cardId: selectedCards[0].id,
                                        amount: Number(order.finalAmount)
                                    }
                                ]
                            } else {
                                payments = selectedCards.map(card => ({
                                    cardId: card.id,
                                    amount: Number(cardValues[card.id] || 0)
                                }))
                            }

                            await payOrder(order.id, payments)
                            window.location.reload()

                        } catch (error) {
                            console.error("Erro ao pagar pedido", error)
                        }
                    }}
                    status={!isValidPayment}
                >
                    Finalizar pagamento
                </Button>
            </div>
        </>
    )
}