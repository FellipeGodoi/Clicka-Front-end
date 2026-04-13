'use client'

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import styles from "../style.module.css"
import { User } from "@/interfaces/front-interfaces/User.front.interface"

interface PaymentStepProps {
  user: User
  totalAmount: number
  onCancel: () => void
}

interface CardPayment {
  cardId: string
  value: number
}

const PaymentStep = ({
  user,
  totalAmount,
  onCancel
}: PaymentStepProps) => {

  const router = useRouter()
  const [payments, setPayments] = useState<CardPayment[]>([])

  const updateCardValue = (cardId: string, value: number) => {
    setPayments(prev => {
      const existing = prev.find(p => p.cardId === cardId)

      if (existing) {
        return prev.map(p =>
          p.cardId === cardId ? { ...p, value } : p
        )
      }

      return [...prev, { cardId, value }]
    })
  }

  const totalPaid = useMemo(() => {
    return payments.reduce((acc, p) => acc + (Number(p.value) || 0), 0)
  }, [payments])

  const remaining = totalAmount - totalPaid

  const isValid =
    Number(totalPaid.toFixed(2)) === Number(totalAmount.toFixed(2))

  const handleFinish = () => {
    if (!isValid) return

    const orderId = `order_${Date.now()}`
    router.push(`/order/${orderId}`)
  }

  return (
    <div className={styles.paymentCard}>

      <h2>Pagamento</h2>

      <div className={styles.paymentSummary}>
        <p>Total da compra:</p>
        <strong>R$ {totalAmount.toFixed(2)}</strong>

        <p>
          Pago: R$ {totalPaid.toFixed(2)}
        </p>

        <p>
          Restante: R$ {remaining.toFixed(2)}
        </p>
      </div>

      <div className={styles.cardsList}>
        {user.creditCards?.map(card => (
          <div key={card.id} className={styles.cardItem}>
            <strong>{card.apelido}</strong>

            <input
              type="number"
              min={0}
              step="0.01"
              placeholder="Valor neste cartão"
              onChange={(e) =>
                updateCardValue(card.id, Number(e.target.value))
              }
            />
          </div>
        ))}
      </div>

      <div className={styles.paymentFooter}>
        <button
          className={styles.cancelButton}
          onClick={onCancel}
        >
          Cancelar
        </button>

        <button
          className={styles.finishButton}
          disabled={!isValid}
          style={{
            opacity: isValid ? 1 : 0.6,
            cursor: isValid ? "pointer" : "not-allowed"
          }}
          onClick={handleFinish}
        >
          Finalizar Pedido
        </button>
      </div>

    </div>
  )
}

export default PaymentStep