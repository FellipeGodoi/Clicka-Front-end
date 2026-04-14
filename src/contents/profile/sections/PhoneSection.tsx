import { useState } from "react"
import ProfileSection from "@/components/profile-sections/ProfileSections"
import ProfileList from "@/components/profile-sections/ProfileList"
import EditPhoneModal from "@/components/modals/profile-modals/EditPhoneModal"
import style from "../style.module.css"
import { PhoneResponse } from "@/interfaces/request-interfaces/request-user.interface"

type Props = {
  phones: PhoneResponse[]
  onReload: () => void

}

const PhonesSection = ({ phones = [], onReload }: Props) => {
  const [phoneModalOpen, setPhoneModalOpen] = useState(false)
  const [selectedPhone, setSelectedPhone] = useState<any>(null)


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
            label: phone.nickname,
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
        onSave={onReload}
      />
    </>
  )
}

export default PhonesSection