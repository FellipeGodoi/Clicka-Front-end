import { api } from "@/api/api"
import { OrderResponse } from "../user/getMyOrder"

export interface AdminOrdersResponse {
  content: OrderResponse[]
  empty: boolean
  first: boolean
  last: boolean
  number: number
  numberOfElements: number
  size: number
  totalElements: number
  totalPages: number

  pageable: {
    offset: number
    pageNumber: number
    pageSize: number
    paged: boolean
    unpaged: boolean

    sort: {
      empty: boolean
      sorted: boolean
      unsorted: boolean
    }
  }

  sort: {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }
}

interface Params {
  search?: string
  status?: string
  page?: number
}

export async function getAdminOrders({
  search,
  status,
  page = 0
}: Params): Promise<AdminOrdersResponse> {

  const token = localStorage.getItem("token")

  const response = await api.get<AdminOrdersResponse>(
    "/admin/orders",
    {
      headers: {
        Authorization: `Bearer ${token}`
      },

      params: {
        search,
        status,
        page,
        size: 10
      }
    }
  )

  return response.data
}