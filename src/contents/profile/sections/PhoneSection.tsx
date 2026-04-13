import { useState } from "react"
import ProfileSection from "@/components/profile-sections/ProfileSections"
import ProfileList from "@/components/profile-sections/ProfileList"
import EditPhoneModal from "@/components/modals/profile-modals/EditPhoneModal"
import style from "../style.module.css"

type Props = {
  phones: any[]
  onSave: (phones: any[]) => void
}

const PhonesSection = ({ phones = [], onSave }: Props) => {
  const [phoneModalOpen, setPhoneModalOpen] = useState(false)
  const [selectedPhone, setSelectedPhone] = useState<any>(null)

  const savePhone = (phone: any) => {
    const updated = [
      ...phones.filter(p => p.id !== phone.id),
      phone,
    ]
    onSave(updated)
  }

  return (
    <>
      <ProfileSection
        title="Telefones"
        action={
          <button
            className={style.addButton}
            onClick={() => {
              setSelectedPhone(null)
              setPhoneModalOpen(true)
            }}
          >
            <span>+</span> Adicionar
          </button>
        }
      >
        <ProfileList
          items={phones.map(phone => ({
            id: phone.id,
            label: phone.apelindo,
            onClick: () => {
              setSelectedPhone(phone)
              setPhoneModalOpen(true)
            },
          }))}
        />
      </ProfileSection>

      <EditPhoneModal
        isOpen={phoneModalOpen}
        onClose={() => setPhoneModalOpen(false)}
        phone={selectedPhone}
        onSave={savePhone}
      />
    </>
  )
}

export default PhonesSection