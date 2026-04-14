import { useState } from "react"
import ProfileSection from "@/components/profile-sections/ProfileSections"
import ProfileList from "@/components/profile-sections/ProfileList"
import EditAddressModal from "@/components/modals/profile-modals/EditAddressModal"
import style from "../style.module.css"
import { AddressResponse } from "@/interfaces/request-interfaces/request-user.interface"
import AlertModal from "@/components/modals/alert-modal/AlertModal"
import { api } from "@/api/api"

type Props = {
  addresses: AddressResponse[]
  onReload: () => void
}

const AddressesSection = ({ addresses = [], onReload }: Props) => {

  const [addressModalOpen, setAddressModalOpen] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState<AddressResponse | null>(null)

  return (
    <>
      <ProfileSection
        title="Endereços"
        action={
          <button
            className={style.addButton}
            onClick={() => {
              setSelectedAddress(null)
              setAddressModalOpen(true)
            }}
          >
            <span>+</span> Adicionar
          </button>
        }
      >
        <ProfileList
          items={addresses.map(address => ({
            id: address.id,
            label: address.nickname,
            onClick: () => {
              setSelectedAddress(address)
              setAddressModalOpen(true)
            }
          }))}
        />
      </ProfileSection>

      <EditAddressModal
        isOpen={addressModalOpen}
        onClose={() => setAddressModalOpen(false)}
        address={selectedAddress}
        onSave={onReload}
      />

    </>
  )
}

export default AddressesSection