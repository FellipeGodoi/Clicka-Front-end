'use client'

import { useState } from 'react'

import TextInput from '@/components/inputs/text-input/TextInput'
import ModalBody from '../ModalBody'
import Button from '@/components/forms/button/Button'
import { api } from '@/api/api'
import PasswordInput from '@/components/inputs/password-input/PasswordInput'

interface UpdatePasswordModalProps {
  isOpen: boolean
  onClose: () => void
}

const UpdatePasswordModal = ({
  isOpen,
  onClose,
}: UpdatePasswordModalProps) => {

  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  function handleChange(
    field: keyof typeof formData,
    value: string
  ) {
    setFormData(prev => ({ ...prev, [field]: value }))
    setError(null)
  }

  async function handleSubmit() {

    if (formData.newPassword !== formData.confirmPassword) {
      setError("As novas senhas não conferem")
      return
    }

    try {
      setLoading(true)

      const token = localStorage.getItem("token")

      await api.put(
        "/my-data/new-password",
        {
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      onClose()

    } catch (error) {
      console.error("Erro ao atualizar senha", error)
      setError("Erro ao atualizar senha. Verifique a senha atual.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <ModalBody isOpen={isOpen} onClose={onClose} maxWidth='600px'>
      <div style={{ padding: 24 }}>


        <div
          style={{
            display: 'flex',
            flexDirection:'column',
            gap: 16,
          }}
        >
          <PasswordInput
            label="Senha atual"
            value={formData.oldPassword}
            onChange={e =>
              handleChange('oldPassword', e.target.value)
            }
          />

          <PasswordInput
            label="Nova senha"
            value={formData.newPassword}
            onChange={e =>
              handleChange('newPassword', e.target.value)
            }
          />

          <PasswordInput
            label="Confirmar nova senha"
            value={formData.confirmPassword}
            onChange={e =>
              handleChange('confirmPassword', e.target.value)
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

          <Button
            onClick={handleSubmit}
            color='--dark-blue-80'
          >
            {loading ? "Salvando..." : "Salvar nova senha"}
          </Button>
        </div>
      </div>
    </ModalBody>
  )
}

export default UpdatePasswordModal