'use client'

import { useState } from "react"

import { Button } from "@/components/button/Button"
import TextInput from "@/components/inputs/text-input/TextInput"

import ModalBody from "@/components/modals/ModalBody"
import AlertModal from "@/components/modals/alert-modal/AlertModal"
import Toast from "@/components/modals/toast/Toast"

import {
    ReturnResponse
} from "@/service/admin/getAllReturns"

import { formatDate } from "@/utils/helpers/format-date"

import { receivedReturn } from "@/service/admin/receivedReturn"
import { finishReturn } from "@/service/admin/finishReturn"
import { InfoCard } from "@/components/cards/InfoCard"
import { SectionTitle } from "@/components/layout/SectionTitle"
import { approveReturn } from "@/service/admin/approveReturn"

interface Props {
    isOpen: boolean
    onClose: () => void
    returnData: ReturnResponse | null
    statusMap: Record<string, string>
}

export default function AdminReturnDetailsModal({
    isOpen,
    onClose,
    returnData,
    statusMap
}: Props) {

    const [confirmModal, setConfirmModal] =
        useState(false)

    const [confirmTitle, setConfirmTitle] =
        useState("")

    const [confirmMessage, setConfirmMessage] =
        useState("")

    const [rejectionReason, setRejectionReason] =
        useState("")

    const [toastOpen, setToastOpen] =
        useState(false)

    const [toastMessage, setToastMessage] =
        useState("")

    const [toastType, setToastType] =
        useState<"success" | "error">("success")

    const [confirmAction, setConfirmAction] =
        useState<() => Promise<void>>(
            async () => { }
        )

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

            setToastMessage(
                "Opps, algo deu errado"
            )

            setToastOpen(true)
        }
    }

    if (!returnData) return null

    return (
        <>
            <ModalBody
                isOpen={isOpen}
                onClose={onClose}
                maxWidth="850px"
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
                                Detalhes da devolução
                            </h2>

                            <span
                                style={{
                                    color: "#666",
                                    fontSize: "14px"
                                }}
                            >
                                {returnData.id}
                            </span>

                        </div>

                        <div
    style={{
        display: "flex",
        gap: "12px",
        flexWrap: "wrap"
    }}
>

    {/* BOTÃO DE RECUSA SEMPRE VISÍVEL */}
    {returnData.status === "REQUESTED" &&
        !["APPROVED", "REJECTED"].includes(returnData.status) && (
            <Button
                id="btn-refuse"
                bgColor="var(--yellow-100)"
                ftColor="white"
                maxWidth="170px"
                fontSize="14px"
                height="32px"

                onClick={() => {

                    setConfirmTitle(
                        "Recusar devolução"
                    )

                    setConfirmMessage(
                        "Informe o motivo da recusa."
                    )

                    setConfirmAction(
                        () => async () => {

                            await handleAction(
                                () => finishReturn(
                                    returnData.id,
                                    {
                                        approved: false,
                                        rejectionReason
                                    }
                                ),
                                "Devolução recusada"
                            )

                        }
                    )

                    setConfirmModal(true)

                }}
            >
                Recusar devolução
            </Button>
        )
    }

    {/* REQUESTED -> APROVAR SOLICITAÇÃO */}
    {
        returnData.status === "RECEIVED" && (
            <Button
                id="btn-approve"
                bgColor="var(--dark-blue-80)"
                ftColor="white"
                maxWidth="170px"
                fontSize="14px"
                height="32px"
                onClick={() => {

                    setConfirmTitle(
                        "Aprovar solicitação"
                    )

                    setConfirmMessage(
                        "Deseja aprovar esta solicitação de devolução?"
                    )

                    setConfirmAction(
                        () => async () => {

                            await handleAction(
                                () => approveReturn(returnData.id),
                                "Solicitação aprovada"
                            )

                        }
                    )

                    setConfirmModal(true)

                }}
            >
                Aprovar solicitação
            </Button>
        )
    }

    {/* SENT -> RECEBER DEVOLUÇÃO */}
    {
        returnData.status === "SENT" && (
            <Button
                id="btn-sent"
                bgColor="var(--dark-blue-80)"
                ftColor="white"
                maxWidth="170px"
                fontSize="14px"
                height="32px"

                onClick={() => {

                    setConfirmTitle(
                        "Confirmar recebimento"
                    )

                    setConfirmMessage(
                        "Deseja confirmar o recebimento da devolução?"
                    )

                    setConfirmAction(
                        () => async () => {

                            await handleAction(
                                () => receivedReturn(returnData.id),
                                "Devolução recebida"
                            )

                        }
                    )

                    setConfirmModal(true)

                }}
            >
                Confirmar recebimento
            </Button>
        )
    }

    {/* RECEIVED -> FINALIZAR COMO APROVADO */}
    {
        returnData.status === "RECEIVED" && (
            <Button
                id="btn-approve"
                bgColor="var(--dark-blue-80)"
                ftColor="white"
                maxWidth="170px"
                fontSize="14px"
                height="32px"

                onClick={() => {

                    setConfirmTitle(
                        "Aprovar devolução"
                    )

                    setConfirmMessage(
                        "Deseja aprovar esta devolução?"
                    )

                    setConfirmAction(
                        () => async () => {

                            await handleAction(
                                () => finishReturn(
                                    returnData.id,
                                    {
                                        approved: true
                                    }
                                ),
                                "Devolução aprovada"
                            )

                        }
                    )

                    setConfirmModal(true)

                }}
            >
                Aprovar devolução
            </Button>
        )
    }

</div>

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
                            value={
                                statusMap[returnData.status]
                                ?? returnData.status
                            }
                        />

                        <InfoCard
                            title="Pedido"
                            value={returnData.orderId}
                        />

                        <InfoCard
                            title="Criação"
                            value={
                                formatDate(returnData.createdAt)
                            }
                        />

                        <InfoCard
                            title="Quantidade de itens"
                            value={
                                String(returnData.items.length)
                            }
                        />

                    </div>

                    <SectionTitle title="Itens da devolução" />

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column"
                        }}
                    >

                        {returnData.items.map((item) => (

                            <div
                                key={item.id}
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
                                        {item.productName}
                                    </h3>

                                    <p>
                                        Quantidade devolvida:
                                        {" "}
                                        {item.quantity}
                                    </p>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </ModalBody>

            <AlertModal
                isOpen={confirmModal}

                onCancel={() => {
                    setConfirmModal(false)
                }}

                title={confirmTitle}

                message={confirmMessage}

                onConfirm={confirmAction}

                form={
                    confirmTitle === "Recusar devolução"
                        ? (
                            <TextInput
                                id="reason"
                                label="Motivo da recusa"
                                placeholder="Digite o motivo"

                                value={rejectionReason}

                                onChange={(e) =>
                                    setRejectionReason(
                                        e.target.value
                                    )
                                }
                            />
                        )
                        : undefined
                }
            />

            <Toast
                isOpen={toastOpen}

                onClose={() =>
                    setToastOpen(false)
                }

                message={toastMessage}

                type={toastType}
            />
        </>
    )
}

