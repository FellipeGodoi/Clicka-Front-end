import { api } from "@/api/api"

type CreateOrderItem = {
  productId: string
  quantity: number
}

type CreateOrderRequest = {
  items: CreateOrderItem[]
  addressId: string
  phoneId: string
  creditToUse: number
  couponCode?: string | null
}

type CreateOrderResponse = {
  id: string
}

export async function createOrder(data: CreateOrderRequest): Promise<CreateOrderResponse> {
  const token = localStorage.getItem("token")

  const response = await api.post<CreateOrderResponse>(
    "/my-data/orders",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  return response.data
}