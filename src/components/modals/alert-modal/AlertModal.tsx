'use client'

import ModalBody from '../ModalBody'
import Button from '@/components/forms/button/Button'

interface AlertModalProps {
    isOpen: boolean
    title: string
    message: string
    confirmText?: string
    cancelText?: string
    onConfirm: () => void
    onCancel: () => void
}

const AlertModal = ({
    isOpen,
    title,
    message,
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    onConfirm,
    onCancel,
}: AlertModalProps) => {

    return (
        <ModalBody
            isOpen={isOpen}
            onClose={onCancel}
            maxWidth="420px"
            maxHeight="300px"
        >
            <div
                style={{
                    padding: 24,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                }}
            >
                <h2
                    style={{
                        marginBottom: 12,
                        fontSize: 18,
                        fontWeight:600
                    }}
                >
                    {title}
                </h2>

                <p
                    style={{
                        marginBottom: 24,
                        lineHeight: 1.5,
                        fontSize: 16,
                        fontWeight:500
                    }}
                >
                    {message}
                </p>

                <div
                    style={{
                        display: "flex",
                        gap: 12,
                        justifyContent: "center",
                        width: "100%",
                    }}
                >
                    <Button
                        onClick={onCancel}
                        color="--gray-60"
                    >
                        {cancelText}
                    </Button>

                    <Button
                        onClick={onConfirm}
                        color="--error-1"
                    >
                        {confirmText}
                    </Button>
                </div>
            </div>
        </ModalBody>
    )
}

export default AlertModal