'use client'

import { useState, useMemo } from "react"
import styles from "../style.module.css"
import { User } from "@/interfaces/front-interfaces/User.front.interface"

interface InformationStepProps {
    user: User
    cartTotal: number
    onBack: () => void
    onContinue: (finalTotal: number) => void
}

const InformationStep = ({
    user,
    cartTotal,
    onBack,
    onContinue
}: InformationStepProps) => {

    const [selectedAddress, setSelectedAddress] = useState(user.enderecos?.[0]?.id)
    const [selectedPhone, setSelectedPhone] = useState(user.phones?.[0]?.id)
    const [coupon, setCoupon] = useState("")
    const [couponApplied, setCouponApplied] = useState(false)

    const handleApplyCoupon = () => {
        if (coupon === "101010") {
            setCouponApplied(true)
        } else {
            setCouponApplied(false)
        }
    }

    const finalTotal = useMemo(() => {
        let total = cartTotal

        if (selectedAddress) {
            total = total * 1.05
        }


        if (couponApplied) {
            total = total * 0.9
        }

        return total
    }, [cartTotal, selectedAddress, couponApplied])

    return (
        <div className={styles.informationCard}>

            {/* Endereços */}
            <div className={styles.sectionBlock}>
                <h2>Endereço de entrega</h2>

                {user.enderecos?.map(address => (
                    <label key={address.id} className={styles.optionItem}>
                        <input
                            type="radio"
                            name="address"
                            checked={selectedAddress === address.id}
                            onChange={() => setSelectedAddress(address.id)}
                        />
                        <div>
                            <strong>{address.apelido}</strong>
                            <p>
                                {address.logradouro}, {address.numero} - {address.bairro}
                            </p>
                            <p>{address.cidade} - {address.estado}</p>
                        </div>
                    </label>
                ))}
            </div>

            {/* Telefones */}
            <div className={styles.sectionBlock}>
                <h2>Telefone para contato</h2>

                {user.phones?.map(phone => (
                    <label key={phone.id} className={styles.optionItem}>
                        <input
                            type="radio"
                            name="phone"
                            checked={selectedPhone === phone.id}
                            onChange={() => setSelectedPhone(phone.id)}
                        />
                        <div>
                            <strong>{phone.apelindo}</strong>
                            <p>{phone.numero}</p>
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

                {couponApplied && (
                    <p className={styles.successText}>Cupom aplicado (-10%)</p>
                )}
            </div>

            {/* Resumo */}
            <div className={styles.summaryBox}>
                <p>Subtotal: R$ {cartTotal.toFixed(2)}</p>
                <p>Taxa endereço (+5%): R$ {(cartTotal * 0.05).toFixed(2)}</p>
                {couponApplied && (
                    <p>Desconto (-10%): - R$ {(cartTotal * 0.10).toFixed(2)}</p>
                )}
                <strong>Total Final: R$ {finalTotal.toFixed(2)}</strong>
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
                    onClick={() => onContinue(finalTotal)}
                >
                    Ir para pagamento
                </button>
            </div>

        </div>
    )
}

export default InformationStep