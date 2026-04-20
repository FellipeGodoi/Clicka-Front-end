import { api } from "@/api/api"
import { OrderResponse } from "@/interfaces/front-interfaces/Order.front.interface"

export async function getMyOrders(): Promise<OrderResponse[]> {
  const token = localStorage.getItem("token")

  const response = await api.get<OrderResponse[]>(
    "/my-data/orders",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.data
}