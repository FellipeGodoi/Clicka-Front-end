import { useState } from "react"
import ProfileSection from "@/components/profile-sections/ProfileSections"
import ProfileGrid from "@/components/profile-sections/ProfileGrid"
import EditUserModal from "@/components/modals/profile-modals/EditUserModal"
import style from "../style.module.css"
import { UserMyDataResponse } from "@/interfaces/request-interfaces/request-user.interface"


type Props = {
  user: UserMyDataResponse | null
  onSave: (user: UserMyDataResponse) => void
}

const PersonalDataSection = ({ user, onSave }: Props) => {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false)

  return (
    <>
      <ProfileSection
        title="Dados pessoais"
        action={
          <button
            className={style.iconButton}
            onClick={() => setIsUserModalOpen(true)}
          >
            Editar dados
          </button>
        }
      >
        <ProfileGrid
          items={[
            { label: "Nome", value: user?.name || '--'},
            { label: "E-mail", value: user?.email || '--' },
            { label: "CPF", value: user?.cpf || '--'},
            { label: "Ativo", value: user?.isActive && user.isActive ? "Sim" : "Não"},
          ]}
        />
      </ProfileSection>

      {/* <EditUserModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        user={user}
        onSave={onSave}
      /> */}
    </>
  )
}

export default PersonalDataSection