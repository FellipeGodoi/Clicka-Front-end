'use client'

import { Button } from "@/components/button/Button"
import ModalBody from "@/components/modals/ModalBody"
import { OrderResponse } from "@/service/user/getMyOrder"
import { formatDate } from "@/utils/helpers/format-date"
import { div } from "framer-motion/client"
import AlertModal from "../alert-modal/AlertModal"
import { useState } from "react"
import { approveOrderPayment } from "@/service/admin/approveOrderPayment"
import { shipOrder } from "@/service/admin/shipOrder"
import { deliverOrder } from "@/service/admin/deliverOrder"
import { InfoCard } from "@/components/cards/InfoCard"
import { SectionTitle } from "@/components/layout/SectionTitle"

interface Props {
    isOpen: boolean
    onClose: () => void
    order: OrderResponse | null
    statusMap: Record<string, string>
}

export default function AdminOrderDetailsModal({
    isOpen,
    onClose,
    order = null,
    statusMap
}: Props) {
    const [confirmModal, setConfirmModal] = useState<boolean>(false)
    const [confirmTitle, setConfirmTitle] = useState<string>('')
    const [confirmMessage, setConfirmMessage] = useState<string>('')
    const [toastOpen, setToastOpen] = useState(false)
    const [toastMessage, setToastMessage] = useState("")
    const [toastType, setToastType] =
        useState<"success" | "error">("success")

    const [confirmAction, setConfirmAction] =
        useState<() => Promise<void>>(async () => { })

    async function handleAction(
        action: () => Promise<void>,
        successMessage: string
    ) {
        try {

            await action()

            setToastType("success")
            setToastMessage(successMessage)
            setToastOpen(true)

            setConfirmModal(false)

            window.location.reload()

        } catch (error) {

            console.error(error)

            setToastType("error")
            setToastMessage("Opps, algo deu errado")
            setToastOpen(true)
        }
    }

    if (!order) return null

    return (
        <ModalBody
            isOpen={isOpen}
            onClose={onClose}
            maxWidth="900px"
            maxHeight="90vh"
        >
            <div
                style={{
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    overflowY: "auto",
                    maxHeight: "90vh"
                }}
            >

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "24px"
                    }}
                >
                    <div>
                        <h2
                            style={{
                                fontSize: "22px",
                                fontWeight: 600,
                                color: "var(--dark-blue-100)"
                            }}
                        >
                            Detalhes do pedido
                        </h2>

                        <span
                            style={{
                                color: "#666",
                                fontSize: "14px"
                            }}
                        >
                            {order.id}
                        </span>
                    </div>

{
    order.status === "AWAITING_APPROVAL" && (
        <div
            style={{
                display: "flex",
                gap: "12px"
            }}
        >

            <Button
                bgColor="var(--yellow-100)"
                ftColor="white"
                maxWidth="160px"
                fontSize="14px"
                height="32px"
                onClick={() => {
                    setConfirmTitle("Recusar pagamento")
                    setConfirmMessage(
                        "Deseja realmente recusar o pagamento deste pedido?"
                    )

                    setConfirmAction(() => async () => {
                        await handleAction(
                            () => approveOrderPayment(order.id, {
                                approved: false
                            }),
                            "Pagamento recusado"
                        )
                    })

                    setConfirmModal(true)
                }}
            >
                Recusar pagamento
            </Button>

            <Button
                bgColor="var(--dark-blue-80)"
                ftColor="white"
                maxWidth="160px"
                fontSize="14px"
                height="32px"

                onClick={() => {

                    setConfirmTitle("Aprovar pagamento")
                    setConfirmMessage(
                        "Deseja realmente aprovar o pagamento deste pedido?"
                    )

                    setConfirmAction(() => async () => {
                        await handleAction(
                            () => approveOrderPayment(order.id, {
                                approved: true
                            }),
                            "Pagamento aprovado"
                        )
                    })

                    setConfirmModal(true)
                }}
            >
               Aprovar pagamento
            </Button>

        </div>
    )
}

{
    order.status === "APPROVED" && (
        <Button
                bgColor="var(--dark-blue-80)"
                ftColor="white"
                maxWidth="160px"
                fontSize="14px"
                height="32px"

        
            onClick={() => {

                setConfirmTitle("Liberar entrega")
                setConfirmMessage(
                    "Deseja liberar este pedido para entrega?"
                )

                setConfirmAction(() => async () => {
                    await handleAction(
                        () => shipOrder(order.id),
                        "Pedido enviado para entrega"
                    )
                })

                setConfirmModal(true)
            }}
        >
            Liberar para entrega
        </Button>
    )
}

{
    order.status === "SHIPPED" && (
        <Button
                        bgColor="var(--dark-blue-80)"
                ftColor="white"
                maxWidth="160px"
                fontSize="14px"
                height="32px"

            onClick={() => {

                setConfirmTitle("Confirmar entrega")
                setConfirmMessage(
                    "Deseja atualizar o pedido para entregue?"
                )

                setConfirmAction(() => async () => {
                    await handleAction(
                        () => deliverOrder(order.id),
                        "Pedido entregue"
                    )
                })

                setConfirmModal(true)
            }}
        >
            Atualizar para Entregue
        </Button>
    )
}

                    <AlertModal
                        isOpen={confirmModal}
                        onCancel={() => setConfirmModal(false)}
                        title={confirmTitle}
                        message={confirmMessage}
                        onConfirm={confirmAction}
                    />

                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "16px",
                        marginBottom: "24px"
                    }}
                >

                    <InfoCard
                        title="Status"
                        value={statusMap[order.status] ?? order.status}
                    />

                    <InfoCard
                        title="Valor final"
                        value={`R$ ${Number(order.finalAmount).toFixed(2)}`}
                    />

                    <InfoCard
                        title="Total produtos"
                        value={`R$ ${Number(order.totalAmount).toFixed(2)}`}
                    />

                    <InfoCard
                        title="Desconto"
                        value={`R$ ${Number(order.discountAmount).toFixed(2)}`}
                    />

                    <InfoCard
                        title="Criação"
                        value={
                            order.createdAt
                                ? formatDate(order.createdAt)
                                : "-"
                        }
                    />

                    <InfoCard
                        title="Atualização"
                        value={
                            order.updatedAt
                                ? formatDate(order.updatedAt)
                                : "-"
                        }
                    />

                </div>

                <SectionTitle title="Endereço" />

                <div
                    style={{
                        border: "1px solid var(--neutral-20)",
                        borderRadius: "12px",
                        padding: "16px",
                        marginBottom: "24px"
                    }}
                >
                    <p>
                        {order.address?.street || '--'}, {order.address?.number || '--'}
                    </p>

                    <p>
                        {order.address?.neighborhood || '--'} - {order.address?.city}/{order.address?.state|| '--'}
                    </p>

                    <p>
                        CEP: {order.address?.zipCode|| '--'}
                    </p>
                </div>

                <SectionTitle title="Contato" />

                <div
                    style={{
                        border: "1px solid var(--neutral-20)",
                        borderRadius: "12px",
                        padding: "16px",
                        marginBottom: "24px"
                    }}
                >
                    <p>
                        {order.phone?.nickname  || "--"}
                    </p>

                    <p>
                        {order.phone?.number || "--"}
                    </p>
                </div>

                <SectionTitle title="Produtos" />

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column"
                    }}
                >

                    {order.items.map((item, index) => (
                        <div
                            key={index}
                            style={{
                                border: "1px solid var(--neutral-20)",
                                borderRadius: "12px",
                                padding: "16px",
                                marginBottom: "16px",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}
                        >

                            <div>
                                <h3
                                    style={{
                                        fontWeight: 600,
                                        marginBottom: "8px"
                                    }}
                                >
                                    {item?.productName}
                                </h3>

                                <p>
                                    Tipo: {item?.productType}
                                </p>

                                <p>
                                    Quantidade: {item?.quantity}
                                </p>

                                <p>
                                    Lote: {item?.batchCode}
                                </p>
                            </div>

                            <div style={{ textAlign: "right" }}>
                                <p>
                                    Unitário
                                </p>

                                <strong>
                                    R$ {Number(item?.unitPrice).toFixed(2)}
                                </strong>

                                <p style={{ marginTop: "12px" }}>
                                    Subtotal
                                </p>

                                <strong>
                                    R$ {Number(item?.subtotal).toFixed(2)}
                                </strong>
                            </div>

                        </div>
                    ))}

                </div>

            </div>
        </ModalBody>
    )
}

