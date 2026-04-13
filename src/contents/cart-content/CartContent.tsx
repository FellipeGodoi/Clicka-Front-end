'use client'

import { useState } from "react"
import PageContainer from "@/components/layout/PageContainer"
import {
    ShoppingCartIcon,
    CreditCardIcon,
    ClipboardDocumentListIcon
} from "@heroicons/react/24/outline"

import { cartMock } from "@/interfaces/front-interfaces/Cart.front.interface"
import styles from "./style.module.css"
import CartStep from "@/contents/cart-content/cart-step/CartStep"
import { userMock } from "@/interfaces/front-interfaces/User.front.interface"
import InformationStep from "./cart-step/InformationStep"
import PaymentStep from "./cart-step/PaymentStep"

const CartContent = () => {
    const [finalAmount, setFinalAmount] = useState(0)

    const [cartItems, setCartItems] = useState(cartMock)
    const [currentStep, setCurrentStep] = useState(1)

    const updateQuantity = (productId: string, newQuantity: number, stock: number) => {
        if (newQuantity < 1) return
        if (newQuantity > stock) return

        setCartItems(prev =>
            prev.map(item =>
                item.productId === productId
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        )
    }

    const removeItem = (productId: string) => {
        setCartItems(prev => prev.filter(item => item.productId !== productId))
    }

    const clearCart = () => {
        setCartItems([])
    }

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    )

    return (
        <PageContainer gap={32}>
            <div className={styles.container} style={{ minHeight: "75dvh" }}>

                <div className={styles.stepper}>

                    <div className={`${styles.step} ${currentStep === 1 ? styles.activeStep : ""}`}>
                        <ShoppingCartIcon className={styles.stepIcon} />
                        <span>Carrinho</span>
                    </div>

                    <div className={styles.stepLine} />

                    <div className={`${styles.step} ${currentStep === 2 ? styles.activeStep : ""}`}>
                        <ClipboardDocumentListIcon className={styles.stepIcon} />
                        <span>Informações</span>
                    </div>

                    <div className={styles.stepLine} />

                    <div className={`${styles.step} ${currentStep === 3 ? styles.activeStep : ""}`}>
                        <CreditCardIcon className={styles.stepIcon} />
                        <span>Pagamento</span>
                    </div>

                </div>

                {/* Render Step */}
                {currentStep === 1 && (
                    <CartStep
                        cartItems={cartItems}
                        updateQuantity={updateQuantity}
                        removeItem={removeItem}
                        clearCart={clearCart}
                        onContinue={() => setCurrentStep(2)}
                    />
                )}

                {currentStep === 2 && (
                    <InformationStep
                        user={userMock}
                        cartTotal={subtotal}
                        onBack={() => setCurrentStep(1)}
                        onContinue={(amount) => {
                            setFinalAmount(amount)
                            setCurrentStep(3)
                        }}
                    />
                )}

                {currentStep === 3 && (
                    <PaymentStep
                        user={userMock}
                        totalAmount={finalAmount}
                        onCancel={() => setCurrentStep(1)}
                    />
                )}

            </div>
        </PageContainer>
    )
}

export default CartContent