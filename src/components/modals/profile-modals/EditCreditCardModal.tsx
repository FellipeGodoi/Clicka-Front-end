'use client'

import { useEffect, useState } from 'react'
import ModalBody from '../ModalBody'
import TextInput from '@/components/inputs/text-input/TextInput'
import Button from '@/components/forms/button/Button'
import { CreditCard } from '@/interfaces/front-interfaces/User.front.interface'

interface EditCreditCardModalProps {
  isOpen: boolean
  onClose: () => void
  card?: CreditCard
  onSave: (card: CreditCard) => void
}

const EditCreditCardModal = ({ isOpen, onClose, card, onSave }: EditCreditCardModalProps) => {
  const [formData, setFormData] = useState({
    apelido: '',
    number: '',
    validate: '',
  })

  useEffect(() => {
    if (card) {
      setFormData({
        apelido: card.apelido,
        number: card.number,
        validate: card.validate,
      })
    } else {
      setFormData({
        apelido: '',
        number: '',
        validate: '',
      })
    }
  }, [card, isOpen])

  function handleSubmit() {
    onSave({
      id: card?.id ?? crypto.randomUUID(),
      ...formData,
    })
    onClose()
  }

  return (
    <ModalBody isOpen={isOpen} onClose={onClose} maxWidth="700px">
      <div style={{ padding: 24 }}>
        <h2 style={{ marginBottom: 24 }}>Cartão de crédito</h2>

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
          <Button onClick={onClose} color="--gray-60">Cancelar</Button>
          <Button onClick={handleSubmit} color="--dark-blue-80">Salvar</Button>
        </div>
      </div>
    </ModalBody>
  )
}

export default EditCreditCardModal