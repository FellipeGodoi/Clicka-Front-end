'use client'

import { useEffect, useState } from 'react'
import ModalBody from '../ModalBody'
import TextInput from '@/components/inputs/text-input/TextInput'
import Button from '@/components/forms/button/Button'
import { CardResponse } from '@/interfaces/request-interfaces/request-user.interface'
import { api } from '@/api/api'
import AlertModal from '../alert-modal/AlertModal'

interface EditCreditCardModalProps {
  isOpen: boolean
  onClose: () => void
  card?: CardResponse | null
  onSave: (card: CardResponse) => void
}

const EditCreditCardModal = ({
  isOpen,
  onClose,
  card,
  onSave,
}: EditCreditCardModalProps) => {

  const [loading, setLoading] = useState(false)
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)

  const [formData, setFormData] = useState({
    apelido: '',
    number: '',
    validate: '',
  })

  useEffect(() => {
    if (card) {
      setFormData({
        apelido: card.nickname,
        number: card.cardNumber,
        validate: card.expirationDate,
      })
    } else {
      setFormData({
        apelido: '',
        number: '',
        validate: '',
      })
    }
  }, [card, isOpen])

  async function handleSubmit() {
    try {
      setLoading(true)

      const payload = {
        nickname: formData.apelido,
        cardNumber: formData.number,
        expirationDate: formData.validate,
      }

      let response

      const token = localStorage.getItem("token")

      if (card?.id) {
        response = await api.put(
          `/my-data/cards/${card.id}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
      } else {
        response = await api.post(
          `/my-data/cards`,
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
      console.error("Erro ao salvar cartão", error)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete() {
    if (!card?.id) return

    try {
      setLoading(true)

      const token = localStorage.getItem("token")

      await api.delete(
        `/my-data/cards/${card.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      onSave({} as CardResponse)
      onClose()

    } catch (error) {
      console.error("Erro ao excluir cartão", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ModalBody isOpen={isOpen} onClose={onClose} maxWidth="700px">
      <div style={{ padding: 24 }}>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h2 style={{ marginBottom: 24, fontSize: 22, fontWeight: 600 }}>
            Cartão de crédito
          </h2>

          {card?.id && (
            <Button
              onClick={() => setConfirmDeleteOpen(true)}
              style={{ width: 120, color: "var(--error-1)" }}
            >
              {loading ? "Excluindo..." : "Excluir"}
            </Button>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          <TextInput
            label="Apelido"
            value={formData.apelido}
            onChange={e => setFormData({ ...formData, apelido: e.target.value })}
            style={{ gridColumn: '1 / -1' }}
          />

          <TextInput
            label="Número do cartão"
            value={formData.number}
            onChange={e => setFormData({ ...formData, number: e.target.value })}
            style={{ gridColumn: '1 / -1' }}
          />

          <TextInput
            label="Validade"
            placeholder="MM/AA"
            value={formData.validate}
            onChange={e => setFormData({ ...formData, validate: e.target.value })}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24 }}>
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
        title="Excluir cartão"
        message="Tem certeza que deseja excluir este cartão?"
        onCancel={() => setConfirmDeleteOpen(false)}
        onConfirm={() => {
          handleDelete()
          setConfirmDeleteOpen(false)
        }}
      />

    </ModalBody>
  )
}

export default EditCreditCardModal