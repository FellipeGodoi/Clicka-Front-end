'use client'

import { useState } from 'react'

import TextInput from '@/components/inputs/text-input/TextInput'
import ModalBody from '../ModalBody'
import Button from '@/components/forms/button/Button'
import { api } from '@/api/api'

interface EditUserModalProps {
    isOpen: boolean
    onClose: () => void
    user: {
        name: string
        cpf: string
        email: string
    }
    onSave: (updatedUser: {
        name: string
        cpf: string
        email: string
    }) => void
}

const EditUserModal = ({
    isOpen,
    onClose,
    user,
    onSave,
}: EditUserModalProps) => {

    const [formData, setFormData] = useState({
        name: user.name,
        cpf: user.cpf,
        email: user.email,
    })

    const [loading, setLoading] = useState(false)

    function handleChange(
        field: keyof typeof formData,
        value: string
    ) {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    async function handleSubmit() {
        try {
            setLoading(true)

            const token = localStorage.getItem("token")

            await api.put(
                "/my-data",
                {
                    name: formData.name,
                    cpf: formData.cpf,
                    email: formData.email,
                    isActive: true
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            onSave(formData)
            onClose()

        } catch (error) {
            console.error("Erro ao atualizar usuário", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <ModalBody isOpen={isOpen} onClose={onClose} maxWidth='800px'>
            <div style={{ padding: 24 }}>
                <h2 style={{ marginBottom: 24 }}>
                    Editar dados pessoais
                </h2>

                <div
                    style={{
                        display:'flex',
                        flexDirection:'column',
                        gap: 16,
                    }}
                >
                    <TextInput
                        label="Nome completo"
                        value={formData.name}
                        onChange={e =>
                            handleChange('name', e.target.value)
                        }
                    />

                    <TextInput
                        label="CPF"
                        mask="cpf"
                        value={formData.cpf}
                        onChange={e =>
                            handleChange('cpf', e.target.value)
                        }
                    />

                    <TextInput
                        label="E-mail"
                        type="email"
                        value={formData.email}
                        onChange={e =>
                            handleChange('email', e.target.value)
                        }
                    />
                </div>

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 12,
                        marginTop: 24,
                    }}
                >
                    <Button onClick={onClose} color='--gray-60'>
                        Cancelar
                    </Button>

                    <Button
                        onClick={handleSubmit}
                        color='--dark-blue-80'
                    >
                        {loading ? "Salvando..." : "Salvar alterações"}
                    </Button>
                </div>
            </div>
        </ModalBody>
    )
}

export default EditUserModal