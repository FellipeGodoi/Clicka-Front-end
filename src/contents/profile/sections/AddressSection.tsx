import { useState } from "react"
import ProfileSection from "@/components/profile-sections/ProfileSections"
import ProfileList from "@/components/profile-sections/ProfileList"
import EditAddressModal from "@/components/modals/profile-modals/EditAddressModal"
import style from "../style.module.css"

type Props = {
  addresses: any[]
  onSave: (addresses: any[]) => void
}

const AddressesSection = ({ addresses = [], onSave }: Props) => {
  const [addressModalOpen, setAddressModalOpen] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState<any>(null)

  const saveAddress = (address: any) => {
    const updated = [
      ...addresses.filter(a => a.id !== address.id),
      address,
    ]
    onSave(updated)
  }

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
            label: address.apelido,
            onClick: () => {
              setSelectedAddress(address)
              setAddressModalOpen(true)
            },
          }))}
        />
      </ProfileSection>

      <EditAddressModal
        isOpen={addressModalOpen}
        onClose={() => setAddressModalOpen(false)}
        address={selectedAddress}
        onSave={saveAddress}
      />
    </>
  )
}

export default AddressesSection