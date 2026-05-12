'use client'

import { useEffect, useState } from "react"

import OrderStatusFilter from "@/components/inputs/order-status-input/OrderStatusInput"
import TextInput from "@/components/inputs/text-input/TextInput"

import AdminContainer from "@/components/layout/AdminContainer"
import { LoadingOverlay } from "@/components/loading/LoadingOverlay"

import Pagination from "@/components/tables/Pagination"

import {
    getAllReturns,
    GetAllReturnsResponse,
    ReturnResponse
} from "@/service/admin/getAllReturns"
import AdminReturnsTable from "@/components/tables/ReturnTable"
import AdminReturnDetailsModal from "@/components/modals/admin-return-modals/AdminReturnModal"

const RefundContent = () => {

    const statusMap: Record<string, string> = {
        REQUESTED: "Aguardando aprovação",
        SENT: "Devolução enviada",
        RECEIVED: "Devolução recebida",
        APPROVED: "Devolução aprovada",
        REJECTED: "Devolução negada",
    }

    const [detailsOpen, setDetailsOpen] = useState<boolean>(false)
    const [search, setSearch] = useState('')
    const [selectedStatus, setSelectedStatus] = useState('ALL')

    const [loading, setLoading] = useState(false)

    const [returns, setReturns] =
        useState<GetAllReturnsResponse | null>(null)

    const [page, setPage] = useState(0)

    const [selectedReturn, setSelectedReturn] =
        useState<ReturnResponse | null>(null)

    useEffect(() => {

        const timeout = setTimeout(async () => {

            try {

                setLoading(true)

                const response = await getAllReturns({
                    search: search || undefined,

                    status:
                        selectedStatus === "ALL"
                            ? undefined
                            : selectedStatus,

                    page
                })

                setReturns(response)

            } catch (error) {

                console.error(error)

            } finally {

                setLoading(false)

            }

        }, 500)

        return () => clearTimeout(timeout)

    }, [search, selectedStatus, page])

    return (
        <AdminContainer title="Devoluções">

            <>

                <LoadingOverlay isLoading={loading} />

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 8
                    }}
                >

                    <TextInput
                        placeholder="Busque por ID ou CPF do cliente"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value)
                            setPage(0)
                        }}
                    />

                    <OrderStatusFilter
                        selectedStatus={selectedStatus}
                        setSelectedStatus={(value) => {
                            setSelectedStatus(value)
                            setPage(0)
                        }}
                        statusMap={statusMap}
                        height={44}
                        width={180}
                    />

                </div>

                <AdminReturnsTable
                    returns={returns?.content || []}
                    statusMap={statusMap}
                    onSelectReturn={(returnData) => {
                        setSelectedReturn(returnData)
                        setDetailsOpen(true)
                    }}
                />

                <Pagination
                    currentPage={page}
                    totalPages={returns?.totalPages || 0}
                    onPageChange={setPage}
                />

                <AdminReturnDetailsModal 
                    isOpen={detailsOpen}
                    onClose={() => setDetailsOpen(false)}
                    returnData={selectedReturn}
                    statusMap={statusMap}
                />

            </>

        </AdminContainer>
    )
}

export default RefundContent