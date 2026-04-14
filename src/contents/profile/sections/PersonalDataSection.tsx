import { useState } from "react"
import ProfileSection from "@/components/profile-sections/ProfileSections"
import ProfileGrid from "@/components/profile-sections/ProfileGrid"
import EditUserModal from "@/components/modals/profile-modals/EditUserModal"
import style from "../style.module.css"
import { UserMyDataResponse } from "@/interfaces/request-interfaces/request-user.interface"
import UpdatePasswordModal from "@/components/modals/profile-modals/UpdatePasswordModal"


type Props = {
  user: UserMyDataResponse | null
  onSave: (user: UserMyDataResponse) => void
}

const PersonalDataSection = ({ user, onSave }: Props) => {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false)
  const [passwordModal, setPasswordModal] = useState(false)

  return (
    <>
      <ProfileSection
        title="Dados pessoais"
        action={
          <div style={{display:"flex", gap:12}}>
            <button
              className={style.iconButton}
              onClick={() => setIsUserModalOpen(true)}
            >
              Editar dados
            </button>

            <button
              className={style.iconButton}
              onClick={() => setPasswordModal(true)}
            >
              Trocar senha
            </button>
          </div>
        }
      >
        <ProfileGrid
          items={[
            { label: "Nome", value: user?.name || '--' },
            { label: "E-mail", value: user?.email || '--' },
            { label: "CPF", value: user?.cpf || '--' },
            { label: "Ativo", value: user?.isActive && user.isActive ? "Sim" : "Não" },
            { label: "Crédito atual", value: 'R$' + user?.credit?.toFixed(2) || '--' }
          ]}
        />
      </ProfileSection>

      <EditUserModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        user={{
          cpf: user?.cpf || '',
          email: user?.email || '',
          name: user?.name || ''
        }}
        onSave={onSave}
      />

      <UpdatePasswordModal
        isOpen={passwordModal}
        onClose={() => setPasswordModal(false)}
      />

    </>
  )
}

export default PersonalDataSection