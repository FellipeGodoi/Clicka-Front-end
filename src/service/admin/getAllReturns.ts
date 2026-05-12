import { api } from "@/api/api"

export interface ReturnItemResponse {
  id: string

  orderItemId: string

  productName: string

  quantity: number
}

export interface ReturnResponse {
  id: string

  status: string

  createdAt: string

  orderId: string

  items: ReturnItemResponse[]
}

export interface GetAllReturnsResponse {
  content: ReturnResponse[]

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

export async function getAllReturns({
  search,
  status,
  page = 0
}: Params): Promise<GetAllReturnsResponse> {

  const token = localStorage.getItem("token")

  const response = await api.get<GetAllReturnsResponse>(
    "/admin/returning",
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