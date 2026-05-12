import { api } from "@/api/api"

export async function cancelMyOrder(orderId: string): Promise<void> {
  const token = localStorage.getItem("token")

  await api.patch(
    `/my-data/order/${orderId}/cancel`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
}