'use client'

import { useEffect, useState } from "react"
import PageContainer from "@/components/layout/PageContainer"
import { useRouter } from 'next/navigation'

import styles from "./style.module.css"
import CartStep from "@/contents/cart-content/cart-step/CartStep"
import InformationStep from "./cart-step/InformationStep"
import PaymentStep from "./cart-step/PaymentStep"

import { getProductById } from "@/service/user/getProduct"
import { CartItemInterface } from "@/interfaces/front-interfaces/Cart.front.interface"
import { getMyData } from "@/service/user/getUser"
import { UserMyDataResponse } from "@/interfaces/request-interfaces/request-user.interface"

const CartContent = () => {
    const [finalAmount, setFinalAmount] = useState(0)
    const [cartItems, setCartItems] = useState<CartItemInterface[]>([])
    const [currentStep, setCurrentStep] = useState(1)

    const router = useRouter()
    const [user, setUser] = useState<UserMyDataResponse | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const init = async () => {
            const token = localStorage.getItem("token")

            if (!token) {
                setLoading(false)
                router.push("/auth")
                return
            }

            try {
                const data = await getMyData()
                setUser(data)
            } catch (error: any) {
                const status = error?.response?.status

                if (status === 401 || status === 403) {
                    localStorage.removeItem("token")
                    localStorage.removeItem("role")
                    router.push("/auth")
                } else {
                    console.error("Erro inesperado:", error)
                }
            } finally {
                setLoading(false)
            }
        }

        init()
    }, [router])

    useEffect(() => {
        const loadCart = async () => {
            const stored = localStorage.getItem("cart")
            const ids: string[] = stored ? JSON.parse(stored) : []

            if (ids.length === 0) {
                setLoading(false)
                return
            }

            try {
                const products = await Promise.all(
                    ids.map(id => getProductById(id))
                )

                const mapped: CartItemInterface[] = products.map(p => ({
                    productId: p.id,
                    name: p.name,
                    price: p.promotionalPrice ?? p.defaultPrice,
                    quantity: 1,
                    stock: p.stockQuantity
                }))

                setCartItems(mapped)
            } finally {
                setLoading(false)
            }
        }

        loadCart()
    }, [])

    
const reloadProfile = async () => {
  try {
    setLoading(true)
    const data = await getMyData()
    setUser(data)
  } catch (error) {
    console.error("Erro ao recarregar perfil", error)
  } finally {
    setLoading(false)
  }
}

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

        const stored = localStorage.getItem("cart")
        const ids: string[] = stored ? JSON.parse(stored) : []

        const updated = ids.filter(id => id !== productId)
        localStorage.setItem("cart", JSON.stringify(updated))
    }

    const clearCart = () => {
        setCartItems([])
        localStorage.removeItem("cart")
    }

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    )

    if (loading) return null

    return (
        <PageContainer gap={32}>
            <div className={styles.container} style={{ minHeight: "75dvh" }}>

                {/* <div className={styles.stepper}>

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

                </div> */}

                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <CartStep
                        cartItems={cartItems}
                        updateQuantity={updateQuantity}
                        removeItem={removeItem}
                        clearCart={clearCart}
                        onContinue={() => setCurrentStep(2)}
                    />
                    {
                        user && (
                            <InformationStep
                                onReload={reloadProfile}
                                products={cartItems}
                                user={user}
                                cartTotal={subtotal}
                                onBack={() => setCurrentStep(1)}
                                onContinue={(amount) => {
                                    setFinalAmount(amount)
                                    setCurrentStep(3)
                                }}
                            />
                        )
                    }

                </ div>

                {/* <PaymentStep
                        user={userMock}
                        totalAmount={finalAmount}
                        onCancel={() => setCurrentStep(1)}
                    /> */}

            </div>
        </PageContainer>
    )
}

export default CartContent