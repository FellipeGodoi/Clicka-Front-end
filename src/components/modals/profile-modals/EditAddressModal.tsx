'use client'

import { useEffect, useState } from 'react'
import ModalBody from '../ModalBody'
import TextInput from '@/components/inputs/text-input/TextInput'
import Button from '@/components/forms/button/Button'
import { AddressResponse } from '@/interfaces/request-interfaces/request-user.interface'
import { api } from '@/api/api'
import AlertModal from '../alert-modal/AlertModal'

interface EditAddressModalProps {
  isOpen: boolean
  onClose: () => void
  address?: AddressResponse | null
  onSave: (address: AddressResponse) => void
}

const EditAddressModal = ({
  isOpen,
  onClose,
  address,
  onSave,
}: EditAddressModalProps) => {

  const [loading, setLoading] = useState(false)
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)
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
        apelido: address.nickname,
        cep: address.zipCode,
        logradouro: address.street,
        numero: address.number,
        complemento: '',
        bairro: address.neighborhood,
        cidade: address.city,
        estado: address.state,
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

  async function handleSubmit() {
    try {
      setLoading(true)

      const payload = {
        nickname: formData.apelido,
        zipCode: formData.cep,
        street: formData.logradouro,
        number: formData.numero,
        neighborhood: formData.bairro,
        city: formData.cidade,
        state: formData.estado,
      }

      let response

      const token = localStorage.getItem("token")

      if (address?.id) {
        response = await api.put(
          `/my-data/addresses/${address.id}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
      } else {
        response = await api.post(
          `/my-data/addresses`,
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
      console.error("Erro ao salvar endereço", error)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete() {
    if (!address?.id) return

    try {
      setLoading(true)

      const token = localStorage.getItem("token")

      await api.delete(
        `/my-data/addresses/${address.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      onSave({} as AddressResponse)
      onClose()

    } catch (error) {
      console.error("Erro ao excluir endereço", error)
    } finally {
      setLoading(false)
    }
  }

  async function fetchCep(cep: string) {
    const cleanCep = cep.replace(/\D/g, "")

    if (cleanCep.length !== 8) return

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)
      const data = await response.json()

      if (data.erro) return

      setFormData(prev => ({
        ...prev,
        logradouro: data.logradouro || '',
        bairro: data.bairro || '',
        cidade: data.localidade || '',
        estado: data.uf || '',
      }))

    } catch (error) {
      console.error("Erro ao buscar CEP", error)
    }
  }

  return (
    <ModalBody isOpen={isOpen} onClose={onClose} maxWidth="800px">
      <div style={{ padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h2 style={{ marginBottom: 24, fontSize: 22, fontWeight: 600 }}>Endereço</h2>

          <div>
            {address?.id && (
              <Button onClick={() => setConfirmDeleteOpen(true)} style={{ width: 120, color: "var(--error-1)" }}>
                {loading ? "Excluindo..." : "Excluir"}
              </Button>
            )}
          </div>

        </div>

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
            onChange={e => {
              const value = e.target.value
              setFormData({ ...formData, cep: value })
              fetchCep(value)
            }}
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

          {/* <TextInput
            label="Complemento"
            value={formData.complemento}
            onChange={e => setFormData({ ...formData, complemento: e.target.value })}
          /> */}

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
        title="Excluir endereço"
        message="Tem certeza que deseja excluir este endereço?"
        onCancel={() => setConfirmDeleteOpen(false)}
        onConfirm={() => {
          handleDelete()
          setConfirmDeleteOpen(false)
        }}
      />
    </ModalBody>
  )
}

export default EditAddressModal