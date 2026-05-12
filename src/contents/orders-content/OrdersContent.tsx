'use client'
import OrderStatusFilter from "@/components/inputs/order-status-input/OrderStatusInput"
import TextInput from "@/components/inputs/text-input/TextInput"
import AdminContainer from "@/components/layout/AdminContainer"
import { LoadingOverlay } from "@/components/loading/LoadingOverlay"
import AdminOrderDetailsModal from "@/components/modals/admin-orders-modals/AdminOrderDetailsModal"
import AdminOrdersTable from "@/components/tables/AdminOrdersTable"
import Pagination from "@/components/tables/Pagination"
import { OrderResponse } from "@/service/user/getMyOrder"
import { AdminOrdersResponse, getAdminOrders } from "@/service/admin/getAdminOrders"
import { useEffect, useState } from "react"

const OrdersContent = () => {
    const [search, setSearch] = useState('')
    const [selectedStatus, setSelectedStatus] = useState('ALL')
    const [orders, setOrders] = useState<AdminOrdersResponse | null>(null)
    const [page, setPage] = useState(0)
    const [loading, setLoading] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState<OrderResponse | null>(null)
    const [detailsOpen, setDetailsOpen] = useState(false)

    const statusMap: Record<string, string> = {
        CREATED: "Criado",
        AWAITING_PAYMENT: "Aguardando pagamento",
        AWAITING_APPROVAL: "Aguardando aprovação",
        APPROVED: "Aprovado",
        SHIPPED: "Enviado",
        DELIVERED: "Entregue",
        CANCELLED: "Cancelado",
    }

    useEffect(() => {
        const timeout = setTimeout(async () => {

            try {
                setLoading(true)

                const response = await getAdminOrders({
                    search: search || undefined,

                    status:
                        selectedStatus === "ALL"
                            ? undefined
                            : selectedStatus,

                    page
                })

                setOrders(response)

            } catch (error) {
                console.error(error)

            } finally {
                setLoading(false)
            }

        }, 500)

        return () => clearTimeout(timeout)

    }, [search, selectedStatus, page])


    return (
        <AdminContainer title="Pedidos">
            <>
                <LoadingOverlay isLoading={loading} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                    <TextInput placeholder="Busque por ID ou CPF do cliente" value={search} onChange={(e) => setSearch(e.target.value)} />

                    <OrderStatusFilter
                        selectedStatus={selectedStatus}
                        setSelectedStatus={setSelectedStatus}
                        statusMap={statusMap}
                        height={44}
                        width={130}
                    />
                </div>

                <AdminOrdersTable
                    orders={orders?.content || []}
                    statusMap={statusMap}
                    onSelectOrder={(order) => {
                        setSelectedOrder(order)
                        setDetailsOpen(true)
                    }}
                />

                <Pagination
                    currentPage={page}
                    totalPages={orders?.totalPages || 0}
                    onPageChange={setPage}
                />
                <AdminOrderDetailsModal
                    isOpen={detailsOpen}
                    onClose={() => setDetailsOpen(false)}
                    order={selectedOrder || null}
                    statusMap={statusMap}
                />

            </>
        </AdminContainer>
    )
}

export default OrdersContent