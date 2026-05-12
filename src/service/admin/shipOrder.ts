import { api } from "@/api/api"

export async function shipOrder(
  orderId: string
): Promise<void> {

  const token = localStorage.getItem("token")

  await api.patch(
    `/admin/orders/${orderId}/ship`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
}