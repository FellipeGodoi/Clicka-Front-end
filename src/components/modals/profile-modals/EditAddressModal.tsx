'use client'

import { useEffect, useState } from 'react'
import ModalBody from '../ModalBody'
import TextInput from '@/components/inputs/text-input/TextInput'
import Button from '@/components/forms/button/Button'
import { Address } from '@/interfaces/front-interfaces/User.front.interface'

interface EditAddressModalProps {
  isOpen: boolean
  onClose: () => void
  address?: Address
  onSave: (address: Address) => void
}

const EditAddressModal = ({ isOpen, onClose, address, onSave }: EditAddressModalProps) => {
  const [formData, setFormData] = useState({
    apelido: '',
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
  })

  useEffect(() => {
    if (address) {
      setFormData({
        apelido: address.apelido,
        cep: address.cep,
        logradouro: address.logradouro,
        numero: address.numero,
        complemento: address.complemento || '',
        bairro: address.bairro,
        cidade: address.cidade,
        estado: address.estado,
      })
    } else {
      setFormData({
        apelido: '',
        cep: '',
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
      })
    }
  }, [address, isOpen])

  function handleSubmit() {
    onSave({
      id: address?.id ?? crypto.randomUUID(),
      ...formData,
    })
    onClose()
  }

  return (
    <ModalBody isOpen={isOpen} onClose={onClose} maxWidth="800px">
      <div style={{ padding: 24 }}>
        <h2 style={{ marginBottom: 24 }}>Endereço</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          <TextInput
            label="Apelido"
            value={formData.apelido}
            onChange={e => setFormData({ ...formData, apelido: e.target.value })}
          />

          <TextInput
            label="CEP"
            mask="zipcode"
            value={formData.cep}
            onChange={e => setFormData({ ...formData, cep: e.target.value })}
          />

          <TextInput
            label="Logradouro"
            value={formData.logradouro}
            onChange={e => setFormData({ ...formData, logradouro: e.target.value })}
            style={{ gridColumn: '1 / -1' }}
          />

          <TextInput
            label="Número"
            value={formData.numero}
            onChange={e => setFormData({ ...formData, numero: e.target.value })}
          />

          <TextInput
            label="Complemento"
            value={formData.complemento}
            onChange={e => setFormData({ ...formData, complemento: e.target.value })}
          />

          <TextInput
            label="Bairro"
            value={formData.bairro}
            onChange={e => setFormData({ ...formData, bairro: e.target.value })}
          />

          <TextInput
            label="Cidade"
            value={formData.cidade}
            onChange={e => setFormData({ ...formData, cidade: e.target.value })}
          />

          <TextInput
            label="Estado"
            value={formData.estado}
            onChange={e => setFormData({ ...formData, estado: e.target.value })}
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

export default EditAddressModal