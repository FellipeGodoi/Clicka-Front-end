import { api } from "@/api/api"

export async function deliverOrder(
  orderId: string
): Promise<void> {

  const token = localStorage.getItem("token")

  await api.patch(
    `/admin/orders/${orderId}/deliver`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
}