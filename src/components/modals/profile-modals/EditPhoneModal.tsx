'use client'

import { useEffect, useState } from 'react'
import ModalBody from '../ModalBody'
import TextInput from '@/components/inputs/text-input/TextInput'
import Button from '@/components/forms/button/Button'
import { PhoneResponse } from '@/interfaces/request-interfaces/request-user.interface'
import { api } from '@/api/api'
import AlertModal from '../alert-modal/AlertModal'

interface EditPhoneModalProps {
  isOpen: boolean
  onClose: () => void
  phone?: PhoneResponse | null
  onSave: (phone: PhoneResponse) => void
}

const EditPhoneModal = ({ isOpen, onClose, phone, onSave }: EditPhoneModalProps) => {

  const [formData, setFormData] = useState({
    apelindo: '',
    numero: '',
  })

  const [loading, setLoading] = useState(false)
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)

  useEffect(() => {
    if (phone) {
      setFormData({
        apelindo: phone.nickname,
        numero: phone.number,
      })
    } else {
      setFormData({
        apelindo: '',
        numero: '',
      })
    }
  }, [phone, isOpen])

  async function handleSubmit() {
    try {
      setLoading(true)

      const token = localStorage.getItem("token")

      const payload = {
        number: formData.numero,
        nickname: formData.apelindo,
      }

      let response

      if (phone?.id) {
        response = await api.put(
          `/my-data/phones/${phone.id}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
      } else {
        response = await api.post(
          `/my-data/phones`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
      }

      onSave(response.data)
      onClose()

    } catch (error) {
      console.error("Erro ao salvar telefone", error)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete() {
    if (!phone?.id) return

    try {
      setLoading(true)

      const token = localStorage.getItem("token")

      await api.delete(
        `/my-data/phones/${phone.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      onSave({} as PhoneResponse)
      onClose()

    } catch (error) {
      console.error("Erro ao excluir telefone", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ModalBody isOpen={isOpen} onClose={onClose} maxWidth="600px">
      <div style={{ padding: 24 }}>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h2 style={{ marginBottom: 24, fontSize: 22, fontWeight: 600 }}>
            {phone ? 'Editar telefone' : 'Adicionar telefone'}
          </h2>

          {phone?.id && (
            <Button
              onClick={() => setConfirmDeleteOpen(true)}
              style={{ width: 120, color: "var(--error-1)" }}
            >
              {loading ? "Excluindo..." : "Excluir"}
            </Button>
          )}
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 16,
          }}
        >
          <TextInput
            label="Apelido"
            value={formData.apelindo}
            onChange={e =>
              setFormData({ ...formData, apelindo: e.target.value })
            }
          />

          <TextInput
            label="Número"
            mask="phone"
            value={formData.numero}
            onChange={e =>
              setFormData({ ...formData, numero: e.target.value })
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
          <Button onClick={onClose} color="--gray-60">
            Cancelar
          </Button>

          <Button onClick={handleSubmit} color="--dark-blue-80">
            {loading ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </div>

      <AlertModal
        isOpen={confirmDeleteOpen}
        title="Excluir telefone"
        message="Tem certeza que deseja excluir este telefone?"
        onCancel={() => setConfirmDeleteOpen(false)}
        onConfirm={() => {
          handleDelete()
          setConfirmDeleteOpen(false)
        }}
      />

    </ModalBody>
  )
}

export default EditPhoneModal