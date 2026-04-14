import { useState } from "react"
import ProfileSection from "@/components/profile-sections/ProfileSections"
import ProfileList from "@/components/profile-sections/ProfileList"
import EditCreditCardModal from "@/components/modals/profile-modals/EditCreditCardModal"
import style from "../style.module.css"
import { CardResponse } from "@/interfaces/request-interfaces/request-user.interface"

type Props = {
  cards: CardResponse[]
  onReload: () => void
}

const CreditCardsSection = ({ cards = [], onReload }: Props) => {

  const [cardModalOpen, setCardModalOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState<CardResponse | null>(null)

  return (
    <>
      <ProfileSection
        title="Cartões de crédito"
        action={
          <button
            className={style.addButton}
            onClick={() => {
              setSelectedCard(null)
              setCardModalOpen(true)
            }}
          >
            <span>+</span> Adicionar
          </button>
        }
      >
        <ProfileList
          items={cards.map(card => ({
            id: card.id,
            label: card.nickname,
            onClick: () => {
              setSelectedCard(card)
              setCardModalOpen(true)
            },
          }))}
        />
      </ProfileSection>

      <EditCreditCardModal
        isOpen={cardModalOpen}
        onClose={() => setCardModalOpen(false)}
        card={selectedCard}
        onSave={onReload}
      />
    </>
  )
}

export default CreditCardsSection