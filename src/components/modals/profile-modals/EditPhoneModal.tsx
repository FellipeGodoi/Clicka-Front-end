'use client'

import { useEffect, useState } from 'react'
import ModalBody from '../ModalBody'
import TextInput from '@/components/inputs/text-input/TextInput'
import Button from '@/components/forms/button/Button'
import { Phone } from '@/interfaces/front-interfaces/User.front.interface'

interface EditPhoneModalProps {
  isOpen: boolean
  onClose: () => void
  phone?: Phone | null
  onSave: (phone: Phone) => void
}

const EditPhoneModal = ({ isOpen, onClose, phone, onSave }: EditPhoneModalProps) => {
  const [formData, setFormData] = useState({
    apelindo: '',
    numero: '',
  })

  /* 🔥 SINCRONIZA QUANDO O MODAL ABRE OU O PHONE MUDA */
  useEffect(() => {
    if (phone) {
      setFormData({
        apelindo: phone.apelindo,
        numero: phone.numero,
      })
    } else {
      setFormData({
        apelindo: '',
        numero: '',
      })
    }
  }, [phone, isOpen])

  function handleSubmit() {
    onSave({
      id: phone?.id ?? crypto.randomUUID(),
      ...formData,
    })
    onClose()
  }

  return (
    <ModalBody isOpen={isOpen} onClose={onClose} maxWidth="600px">
      <div style={{ padding: 24 }}>
        <h2 style={{ marginBottom: 24 }}>
          {phone ? 'Editar telefone' : 'Adicionar telefone'}
        </h2>

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
            Salvar
          </Button>
        </div>
      </div>
    </ModalBody>
  )
}

export default EditPhoneModal