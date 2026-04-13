'use client'

import { useMemo } from "react"
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline"
import styles from "../style.module.css"
import { CartItemInterface } from "@/interfaces/front-interfaces/Cart.front.interface"

interface CartStepProps {
  cartItems: CartItemInterface[]
  updateQuantity: (productId: string, newQuantity: number, stock: number) => void
  removeItem: (productId: string) => void
  clearCart: () => void
  onContinue: () => void
}

const CartStep = ({
  cartItems,
  updateQuantity,
  removeItem,
  clearCart,
  onContinue
}: CartStepProps) => {

  const total = useMemo(() => {
    return cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    )
  }, [cartItems])

  return (
    <div className={styles.cartCard}>
      {cartItems.map(item => (
        <div key={item.productId} className={styles.cartItem}>

          <div className={styles.itemContent}>
            <div className={styles.imageWrapper}>
              <img
                src="/"
                alt={item.name}
              />
            </div>

            <div className={styles.itemInfo}>
              <h2>{item.name}</h2>
              <p>Estoque disponível: {item.stock}</p>
            </div>
          </div>

          <div className={styles.quantityControl}>
            <button
              onClick={() =>
                updateQuantity(item.productId, item.quantity - 1, item.stock)
              }
            >
              <MinusIcon className={styles.icon} />
            </button>

            <span>{item.quantity}</span>

            <button
              onClick={() =>
                updateQuantity(item.productId, item.quantity + 1, item.stock)
              }
            >
              <PlusIcon className={styles.icon} />
            </button>
          </div>

          <div className={styles.itemActions}>
            <div className={styles.itemPrice}>
              R$ {(item.price * item.quantity).toFixed(2)}
            </div>

            <button
              className={styles.removeButton}
              onClick={() => removeItem(item.productId)}
            >
              Remover
            </button>
          </div>

        </div>
      ))}

      <div className={styles.footerSection}>

        <div className={styles.footerLeft}>
          <button
            className={styles.clearButton}
            onClick={clearCart}
          >
            Limpar carrinho
          </button>
        </div>

        <div className={styles.footerRight}>
          <div>
            <p>Total</p>
            <strong>R$ {total.toFixed(2)}</strong>
          </div>

          <button
            className={styles.continueButton}
            onClick={onContinue}
          >
            Continuar
          </button>
        </div>

      </div>
    </div>
  )
}

export default CartStep