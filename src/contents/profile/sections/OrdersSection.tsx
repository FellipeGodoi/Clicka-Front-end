import { useEffect, useState } from "react"
import ProfileSection from "@/components/profile-sections/ProfileSections"
import style from "../style.module.css"
import { OrderResponse } from "@/interfaces/front-interfaces/Order.front.interface"
import { getMyOrders } from "@/service/user/getOrders"
import OrderTable from "@/components/customTables/OrderTable"

const statusMap: Record<string, string> = {
  CREATED: "Criado",
  AWAITING_PAYMENT: "Aguardando pagamento",
  AWAITING_APPROVAL: "Aguardando aprovação",
  APPROVED: "Aprovado",
  SHIPPED: "Enviado",
  DELIVERED: "Entregue",
  CANCELLED: "Cancelado",
}

const OrdersSection = () => {
  const [orders, setOrders] = useState<OrderResponse[]>([])
  const [loading, setLoading] = useState(true)

  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL")
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true)
        const data = await getMyOrders()
        setOrders(data)
      } finally {
        setLoading(false)
      }
    }

    loadOrders()
  }, [])

  const filteredOrders =
    selectedStatus === "ALL"
      ? orders
      : orders.filter((o) => o.status === selectedStatus)

  return (
    <ProfileSection
      title="Pedidos"
      action={
        <div style={{ position: "relative" }}>
          <button
            className={style.addButton}
            onClick={() => setOpen((prev) => !prev)}
          >
            {selectedStatus === "ALL"
              ? "Todos os status"
              : statusMap[selectedStatus]}
          </button>

          {open && (
            <div style={{border:"1px solid #cacaca"}} className="absolute top-full right-0 bg-white rounded-md z-10 min-w-[200px]">
              <div
                style={{padding:8}}
                className=" cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  setSelectedStatus("ALL")
                  setOpen(false)
                }}
              >
                Todos os status
              </div>

              {Object.entries(statusMap).map(([key, label]) => (
                <div
                  key={key}
                  style={{padding:8}}
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    setSelectedStatus(key)
                    setOpen(false)
                  }}
                >
                  {label}
                </div>
              ))}
            </div>
          )}
        </div>
      }
    >
      {loading ? (
        <p className="text-sm text-gray-500 mt-4">
          Carregando pedidos...
        </p>
      ) : (
        <OrderTable
          isEmptyMessage={
            "Nenhum pedido " + (statusMap[selectedStatus] ?? "")
          }
          items={filteredOrders.map((order) => {
            const shortId = order.id.slice(0, 8).toUpperCase()

            return {
              id: order.id,
              code: shortId,
              status: statusMap[order.status] ?? order.status,
              total: order.finalAmount,
              onClick: () => {
                setSelectedOrderId(order.id)
                console.log("Pedido:", order.id)
              },
            }
          })}
        />
      )}
    </ProfileSection>
  )
}

export default OrdersSection