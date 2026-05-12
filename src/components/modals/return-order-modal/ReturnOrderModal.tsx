'use client'

import { useState } from "react"

import { Button } from "@/components/button/Button"
import ModalBody from "@/components/modals/ModalBody"
import Toast from "@/components/modals/toast/Toast"

import { OrderResponse } from "@/service/user/getMyOrder"

interface Props {
  isOpen: boolean
  onClose: () => void
  order: OrderResponse

  onSubmit: (data: {
    orderId: string
    items: {
      orderItemId: string
      quantity: number
    }[]
  }) => Promise<void>
}

export default function ReturnOrderModal({
  isOpen,
  onClose,
  order,
  onSubmit
}: Props) {

  const [loading, setLoading] = useState(false)

  const [selectedItems, setSelectedItems] = useState<
    Record<string, number>
  >({})

  const [toastOpen, setToastOpen] = useState(false)

  const [toastData, setToastData] = useState({
    message: "",
    type: "success" as "success" | "error"
  })

  function handleChangeQuantity(
    itemId: string,
    value: string,
    max: number
  ) {

    let quantity = Number(value)

    if (isNaN(quantity)) {
      quantity = 0
    }

    if (quantity < 0) {
      quantity = 0
    }

    if (quantity > max) {
      quantity = max
    }

    setSelectedItems(prev => ({
      ...prev,
      [itemId]: quantity
    }))
  }

  async function handleSubmit() {

    const items = order.items
      .filter(item => item.canReturn)
      .map(item => ({
        orderItemId: item.id,
        quantity: selectedItems[item.id] || 0
      }))
      .filter(item => item.quantity > 0)

    if (!items.length) {

      setToastData({
        message: "Selecione ao menos um item",
        type: "error"
      })

      setToastOpen(true)

      return
    }

    try {

      setLoading(true)

      await onSubmit({
        orderId: order.id,
        items
      })

      setToastData({
        message: "Solicitação de devolução criada",
        type: "success"
      })

      setToastOpen(true)

      setTimeout(() => {
        window.location.reload()
      }, 1200)

    } catch (error) {

      console.error(error)

      setToastData({
        message: "Opps, algo deu errado",
        type: "error"
      })

      setToastOpen(true)

    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <ModalBody
        isOpen={isOpen}
        onClose={onClose}
        maxWidth="850px"
        maxHeight="90vh"
      >

        <div
          style={{
            padding: "24px",
            display: "flex",
            flexDirection: "column"
          }}
        >

          <div
            style={{
              marginBottom: "24px"
            }}
          >

            <h2
              style={{
                fontSize: "22px",
                fontWeight: 600,
                color: "var(--dark-blue-100)"
              }}
            >
              Solicitar devolução
            </h2>

            <p
              style={{
                marginTop: "8px",
                color: "#666"
              }}
            >
              Selecione os itens e quantidades que deseja devolver.
            </p>

          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxHeight: "500px",
              overflowY: "auto"
            }}
          >

            {order.items.map((item) => {

              const isDisabled =
                !item.canReturn ||
                item.availableReturnQuantity <= 0

              return (
                <div
                  key={item.id}
                  style={{
                    border: "1px solid var(--neutral-20)",
                    borderRadius: "12px",
                    padding: "16px",
                    marginBottom: "16px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "16px",
                    opacity: isDisabled ? 0.6 : 1,
                    background: isDisabled
                      ? "#f8f8f8"
                      : "#fff"
                  }}
                >

                  <div>

                    <h3
                      style={{
                        fontWeight: 600,
                        marginBottom: "8px"
                      }}
                    >
                      {item.productName}
                    </h3>

                    <p>
                      Quantidade comprada: {item.quantity}
                    </p>

                    <p>
                      Disponível para devolução:
                      {" "}
                      {item.availableReturnQuantity}
                    </p>

                    <p>
                      Valor unitário:
                      {" "}
                      R$ {Number(item.unitPrice).toFixed(2)}
                    </p>

                    {!item.canReturn && (
                      <p
                        style={{
                          marginTop: "8px",
                          color: "var(--error-1)",
                          fontSize: "14px",
                          fontWeight: 500
                        }}
                      >
                        Item indisponível para devolução
                      </p>
                    )}

                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end"
                    }}
                  >

                    <label
                      style={{
                        marginBottom: "8px",
                        fontSize: "14px"
                      }}
                    >
                      Quantidade para devolver
                    </label>

                    <input
                      type="number"
                      min={0}
                      max={item.availableReturnQuantity}
                      disabled={isDisabled}
                      value={selectedItems[item.id] ?? 0}
                      onChange={(e) =>
                        handleChangeQuantity(
                          item.id,
                          e.target.value,
                          item.availableReturnQuantity
                        )
                      }
                      style={{
                        width: "90px",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        padding: "10px",
                        background: isDisabled
                          ? "#ececec"
                          : "#fff",
                        cursor: isDisabled
                          ? "not-allowed"
                          : "pointer"
                      }}
                    />

                  </div>

                </div>
              )
            })}

          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "24px"
            }}
          >

            <Button
              bgColor="var(--warning-1)"
              height="36px"
              maxWidth="220px"
              onClick={handleSubmit}
              status={loading}
            >
              Solicitar devolução
            </Button>

          </div>

        </div>

      </ModalBody>

      <Toast
        isOpen={toastOpen}
        onClose={() => setToastOpen(false)}
        message={toastData.message}
        type={toastData.type}
      />
    </>
  )
}