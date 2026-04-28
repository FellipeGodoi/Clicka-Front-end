import { api } from "@/api/api"

export interface OrderResponse {
  id: string
  status: string
  totalAmount: number
  finalAmount: number
  discountAmount: number
  creditUsed: number
  couponCode: string | null

  address: {
    city: string
    neighborhood: string
    nickname: string
    number: string
    state: string
    street: string
    zipCode: string
  }

  phone: {
    nickname: string
    number: string
  }

  items: {
    batchCode: string
    productId: string
    productName: string
    productType: string
    quantity: number
    subtotal: number
    unitPrice: number
  }[]
}

export async function getMyOrderById(id: string): Promise<OrderResponse> {
  const token = localStorage.getItem("token")

  const response = await api.get<OrderResponse>(
    `/my-data/order/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  return response.data
}