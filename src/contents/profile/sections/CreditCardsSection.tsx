import { useState } from "react"
import ProfileSection from "@/components/profile-sections/ProfileSections"
import ProfileList from "@/components/profile-sections/ProfileList"
import EditCreditCardModal from "@/components/modals/profile-modals/EditCreditCardModal"
import style from "../style.module.css"

type Props = {
  cards: any[]
  onSave: (cards: any[]) => void
}

const CreditCardsSection = ({ cards = [], onSave }: Props) => {
  const [cardModalOpen, setCardModalOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState<any>(null)

  const saveCard = (card: any) => {
    const updated = [
      ...cards.filter(c => c.id !== card.id),
      card,
    ]
    onSave(updated)
  }

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
            label: card.apelido,
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
        onSave={saveCard}
      />
    </>
  )
}

export default CreditCardsSection