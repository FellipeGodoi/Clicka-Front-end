import { api } from "@/api/api"

type ShippingItem = {
  productId: string
  quantity: number
}

type ShippingRequest = {
  items: ShippingItem[]
  addressId: string
}

type ShippingResponse = {
  estimatedDeliveryDate: string
  shippingCost: number
}

export async function simulateShipping(data: ShippingRequest): Promise<ShippingResponse> {
  const token = localStorage.getItem("token")

  const response = await api.post<ShippingResponse>(
    "/shipping/simulate",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  return response.data
}