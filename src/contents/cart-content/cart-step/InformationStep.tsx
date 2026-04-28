'use client'

import { useState, useMemo, useEffect } from "react"
import styles from "../style.module.css"
import { UserMyDataResponse } from "@/interfaces/request-interfaces/request-user.interface"
import { CouponResponse, validateCoupon } from "@/service/user/validadeCoupons"
import { CartItemInterface } from "@/interfaces/front-interfaces/Cart.front.interface"

import EditAddressModal from "@/components/modals/profile-modals/EditAddressModal"
import EditPhoneModal from "@/components/modals/profile-modals/EditPhoneModal"
import { simulateShipping } from "@/service/user/shippingSimulate"
import { createOrder } from "@/service/user/createOrder"
import { useRouter } from "next/navigation"

interface InformationStepProps {
    user: UserMyDataResponse
    cartTotal: number
    products: CartItemInterface[]
    onBack: () => void
    onContinue: (finalTotal: number) => void
    onReload: () => Promise<void>
}

const InformationStep = ({
    user,
    cartTotal,
    onBack,
    onContinue,
    onReload,
    products
}: InformationStepProps) => {

    const [selectedAddress, setSelectedAddress] = useState(user.addresses?.[0]?.id)
    const [selectedPhone, setSelectedPhone] = useState(user.phones?.[0]?.id)
    const [useCredit, setUseCredit] = useState(false)
    const [coupon, setCoupon] = useState("")
    const [couponData, setCouponData] = useState<CouponResponse | null>(null)
    const [couponError, setCouponError] = useState<string | null>(null)

    const [addressModalOpen, setAddressModalOpen] = useState(false)
    const [phoneModalOpen, setPhoneModalOpen] = useState(false)

    const [shippingCost, setShippingCost] = useState<number>(0)
    const [shippingLoading, setShippingLoading] = useState(false)
    const [estimatedDate, setEstimatedDate] = useState<string | null>(null)

    const shippingItems = products.map(item => ({
        productId: item.productId,
        quantity: item.quantity
    }))

    const router = useRouter()

    const handleCreateOrder = async () => {
        try {
            if (!selectedAddress || !selectedPhone) {
                alert("Selecione endereço e telefone")
                return
            }

            const items = products.map(item => ({
                productId: item.productId,
                quantity: item.quantity
            }))

            const response = await createOrder({
                items,
                addressId: selectedAddress,
                phoneId: selectedPhone,
                creditToUse: useCredit ? creditUsed : 0,
                couponCode: couponData?.code || null
            })

            router.push(`/profile/order/${response.id}`)

        } catch (error) {
            console.error("Erro ao criar pedido", error)
            alert("Erro ao finalizar pedido")
        }
    }

    useEffect(() => {
        async function fetchShipping() {
            if (!selectedAddress) return

            try {
                setShippingLoading(true)

                const response = await simulateShipping({
                    items: shippingItems,
                    addressId: selectedAddress
                })

                setShippingCost(response.shippingCost)
                setEstimatedDate(response.estimatedDeliveryDate)
            } catch (error) {
                console.error("Erro ao calcular frete", error)
                setShippingCost(0)
            } finally {
                setShippingLoading(false)
            }
        }

        fetchShipping()
    }, [selectedAddress])

    function getDeliveryRange(dateString: string) {
        const baseDate = new Date(dateString)

        const min = new Date(baseDate)
        min.setDate(baseDate.getDate() - 1)

        const max = new Date(baseDate)
        max.setDate(baseDate.getDate() + 3)

        return {
            min: min.toLocaleDateString("pt-BR"),
            max: max.toLocaleDateString("pt-BR")
        }
    }

    const creditUsed = useMemo(() => {
        if (!useCredit) return 0

        const totalBeforeCredit = (() => {
            let total = Number(cartTotal) || 0
            total += Number(shippingCost) || 0

            if (couponData) {
                if (couponData.type === "PERCENTAGE") {
                    total -= total * (Number(couponData.value) / 100)
                } else {
                    total -= Number(couponData.value)
                }
            }

            return total
        })()

        const userCredit = Number(user.credit) || 0

        return Math.min(userCredit, totalBeforeCredit)
    }, [useCredit, cartTotal, shippingCost, couponData, user.credit])



    const handleApplyCoupon = async () => {
        try {
            const data = await validateCoupon(coupon)

            const now = new Date()
            const expiration = new Date(data.expirationDate)

            const isValid =
                data.active &&
                expiration > now &&
                cartTotal >= data.minPurchaseAmount

            if (!isValid) {
                setCouponData(null)
                setCouponError("Condições para aplicação do cupom não atendidas")
                return
            }

            setCouponData(data)
            setCouponError(null)

        } catch (error) {
            setCouponData(null)
            setCouponError("Cupom inválido ou inexistente")
        }
    }

    const finalTotal = useMemo(() => {
        let total = Number(cartTotal) || 0
        total += Number(shippingCost) || 0

        if (couponData) {
            if (couponData.type === "PERCENTAGE") {
                total -= total * (Number(couponData.value) / 100)
            } else {
                total -= Number(couponData.value)
            }
        }

        total -= creditUsed

        return total < 0 ? 0 : total
    }, [cartTotal, shippingCost, couponData, creditUsed])

    return (
        <div className={styles.informationCard}>

            <div className={styles.sectionBlock}>
                <h2>Usar crédito em conta</h2>

                <label className={styles.optionItem}>
                    <input
                        type="checkbox"
                        checked={useCredit}
                        onChange={(e) => setUseCredit(e.target.checked)}
                    />
                    <div>
                        <strong>Usar saldo disponível</strong>
                        <p>Saldo: R$ {Number(user.credit || 0).toFixed(2)}</p>
                    </div>
                </label>
            </div>

            {/* Endereços */}
            <div className={styles.sectionBlock}>
                <div className={styles.sectionHeader}>
                    <h2>Endereço de entrega</h2>

                    <button
                        className={styles.addButton}
                        onClick={() => setAddressModalOpen(true)}
                    >
                        <span>+</span> Adicionar
                    </button>
                </div>

                {user.addresses?.map(address => (
                    <label key={address.id} className={styles.optionItem}>
                        <input
                            type="radio"
                            name="address"
                            checked={selectedAddress === address.id}
                            onChange={() => setSelectedAddress(address.id)}
                        />
                        <div>
                            <strong>{address.nickname}</strong>
                            <p>
                                {address.state}, {address.number} - {address.neighborhood}
                            </p>
                            <p>{address.city} - {address.state}</p>
                        </div>
                    </label>
                ))}
            </div>

            {/* Telefones */}
            <div className={styles.sectionBlock}>
                <div className={styles.sectionHeader}>
                    <h2>Telefone para contato</h2>

                    <button
                        className={styles.addButton}
                        onClick={() => setPhoneModalOpen(true)}
                    >
                        <span>+</span> Adicionar
                    </button>
                </div>

                {user.phones?.map(phone => (
                    <label key={phone.id} className={styles.optionItem}>
                        <input
                            type="radio"
                            name="phone"
                            checked={selectedPhone === phone.id}
                            onChange={() => setSelectedPhone(phone.id)}
                        />
                        <div>
                            <strong>{phone.nickname}</strong>
                            <p>{phone.number}</p>
                        </div>
                    </label>
                ))}
            </div>

            {/* Cupom */}
            <div className={styles.sectionBlock}>
                <h2>Cupom</h2>

                <div className={styles.couponArea}>
                    <input
                        type="text"
                        placeholder="Digite seu cupom"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                    />
                    <button onClick={handleApplyCoupon}>
                        Aplicar
                    </button>
                </div>

                {couponData && (
                    <p className={styles.successText}>
                        Cupom aplicado (
                        {couponData.type === "PERCENTAGE"
                            ? `-${couponData.value}%`
                            : `-R$ ${couponData.value.toFixed(2)}`
                        })
                    </p>
                )}

                {couponError && (
                    <p className={styles.errorText}>{couponError}</p>
                )}
            </div>

            {/* Resumo */}
            <div className={styles.summaryBox}>
                <p>Subtotal: R$ {cartTotal.toFixed(2)}</p>
                {useCredit && creditUsed > 0 && (
                    <p>
                        Crédito aplicado: - R$ {creditUsed.toFixed(2)}
                    </p>
                )}
                <p>
                    Frete:{" "}
                    {shippingLoading
                        ? "Calculando..."
                        : `R$ ${Number(shippingCost).toFixed(2)}`}
                </p>
                {couponData && (
                    <p>
                        Desconto: - R$ {
                            (() => {
                                const subtotal = Number(cartTotal) || 0
                                const shipping = Number(shippingCost) || 0
                                const value = Number(couponData.value) || 0

                                if (couponData.type === "PERCENTAGE") {
                                    return ((subtotal + shipping) * (value / 100)).toFixed(2)
                                }

                                return value.toFixed(2)
                            })()
                        }
                    </p>
                )}
                <strong>Total Final: R$ {finalTotal.toFixed(2)}</strong>

                {estimatedDate && !shippingLoading && (
                    <p>
                        Entrega entre{" "}
                        {getDeliveryRange(estimatedDate).min} e{" "}
                        {getDeliveryRange(estimatedDate).max}
                    </p>
                )}
            </div>

            {/* Footer */}
            <div className={styles.informationFooter}>
                <button
                    className={styles.backButton}
                    onClick={onBack}
                >
                    Voltar
                </button>

                <button
                    className={styles.continueButton}
                    onClick={handleCreateOrder}
                >
                    Ir para pagamento
                </button>
            </div>

            <EditAddressModal
                isOpen={addressModalOpen}
                onClose={() => setAddressModalOpen(false)}
                address={null}
                onSave={async () => {
                    await onReload()
                    setAddressModalOpen(false)
                }}
            />

            <EditPhoneModal
                isOpen={phoneModalOpen}
                onClose={() => setPhoneModalOpen(false)}
                phone={null}
                onSave={async () => {
                    await onReload()
                    setPhoneModalOpen(false)
                }}
            />

        </div>
    )
}

export default InformationStep