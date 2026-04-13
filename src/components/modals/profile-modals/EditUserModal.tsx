'use client'

import { useState } from 'react'

import TextInput from '@/components/inputs/text-input/TextInput'

import { User } from '@/interfaces/front-interfaces/User.front.interface'
import ModalBody from '../ModalBody'
import Button from '@/components/forms/button/Button'

interface EditUserModalProps {
    isOpen: boolean
    onClose: () => void
    user: User
    onSave: (updatedUser: User) => void
}

const EditUserModal = ({
    isOpen,
    onClose,
    user,
    onSave,
}: EditUserModalProps) => {
    const [formData, setFormData] = useState({
        nomeCompleto: user.nomeCompleto,
        documento: user.documento,
        email: user.email,
        telefone: user.telefone,
        senha: '',
        confirmSenha: '',
    })

    const [error, setError] = useState<string | null>(null)

    function handleChange(
        field: keyof typeof formData,
        value: string
    ) {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    function handleSubmit() {
        if (formData.senha && formData.senha !== formData.confirmSenha) {
            setError('As senhas não conferem')
            return
        }

        const updatedUser: User = {
            ...user,
            nomeCompleto: formData.nomeCompleto,
            documento: formData.documento,
            email: formData.email,
            telefone: formData.telefone,
            senha: formData.senha || user.senha,
        }

        onSave(updatedUser)
        onClose()
    }

    return (
        <ModalBody isOpen={isOpen} onClose={onClose} maxWidth='800px'>
            <div style={{ padding: 24 }}>
                <h2 style={{ marginBottom: 24 }}>Editar dados pessoais</h2>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: 16,
                    }}
                >
                    <TextInput
                        label="Nome completo"
                        value={formData.nomeCompleto}
                        onChange={e => handleChange('nomeCompleto', e.target.value)}
                    />

                    <TextInput
                        label="CPF / CNPJ"
                        mask="cpf"
                        value={formData.documento}
                        onChange={e => handleChange('documento', e.target.value)}
                    />

                    <TextInput
                        label="E-mail"
                        type="email"
                        value={formData.email}
                        onChange={e => handleChange('email', e.target.value)}
                    />

                    <TextInput
                        label="Telefone"
                        mask="phone"
                        value={formData.telefone}
                        onChange={e => handleChange('telefone', e.target.value)}
                    />

                    <TextInput
                        label="Nova senha"
                        type="password"
                        value={formData.senha}
                        onChange={e => handleChange('senha', e.target.value)}
                    />

                    <TextInput
                        label="Confirmar senha"
                        type="password"
                        value={formData.confirmSenha}
                        onChange={e =>
                            handleChange('confirmSenha', e.target.value)
                        }
                        error={error ?? undefined}
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

                    <Button onClick={handleSubmit} color='--dark-blue-80'>
                        Salvar alterações
                    </Button>
                </div>
            </div>
        </ModalBody>
    )
}

export default EditUserModal