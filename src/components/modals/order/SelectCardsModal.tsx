'use client'

import { useState, useEffect } from "react"
import { CardResponse } from "@/interfaces/request-interfaces/request-user.interface"
import { Button } from "@/components/button/Button"
import ModalBody from "../ModalBody"

interface Props {
  isOpen: boolean
  onClose: () => void
  cards: CardResponse[]
  onConfirm: (selected: CardResponse[]) => void
  initialSelected?: CardResponse[]
}

export default function SelectCardsModal({
  isOpen,
  onClose,
  cards,
  onConfirm,
  initialSelected = []
}: Props) {

  const [selectedCards, setSelectedCards] = useState<CardResponse[]>([])

  useEffect(() => {
    setSelectedCards(initialSelected)
  }, [initialSelected, isOpen])

  function toggleCard(card: CardResponse) {
    const alreadySelected = selectedCards.some(c => c.id === card.id)

    if (alreadySelected) {
      setSelectedCards(prev => prev.filter(c => c.id !== card.id))
    } else {
      setSelectedCards(prev => [...prev, card])
    }
  }

  function handleConfirm() {
    onConfirm(selectedCards)
    onClose()
  }
  

  return (
    <ModalBody isOpen={isOpen} onClose={onClose} maxWidth="500px">
      <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>

        <h2 style={{ fontSize: "18px", fontWeight: 600 }}>
          Selecionar cartões
        </h2>

        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          maxHeight: "300px",
          overflowY: "auto"
        }}>
          {cards.map((card,index)=> {
            const isSelected = selectedCards.some(c => c.id === card.id)

            return (
              <label
                id={'select-card-' + index}
                key={card.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: isSelected ? "2px solid #3b82f6" : "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "12px",
                  cursor: "pointer",
                  backgroundColor: isSelected ? "#eff6ff" : "#fff"
                }}
              >
                <div>
                  <p style={{ fontWeight: 500 }}>{card.nickname}</p>
                  <p style={{ fontSize: "14px", color: "#666" }}>
                    **** **** **** {card.cardNumber.slice(-4)}
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleCard(card)}
                />
              </label>
            )
          })}
        </div>

        <div style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "8px",
          paddingTop: "8px"
        }}>
          <Button
            id="cancel-card-button"
            height="36px"
            onClick={onClose}
          >
            Cancelar
          </Button>

          <Button
            id = 'confirm-card-button'
            height="36px"
            onClick={handleConfirm}
          >
            Confirmar
          </Button>
        </div>

      </div>
    </ModalBody>
  )
}