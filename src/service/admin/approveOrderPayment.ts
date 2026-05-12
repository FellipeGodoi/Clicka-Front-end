import { api } from "@/api/api"

interface ApprovePaymentRequest {
  approved: boolean
}

export async function approveOrderPayment(
  orderId: string,
  data: ApprovePaymentRequest
): Promise<void> {

  const token = localStorage.getItem("token")

  await api.patch(
    `/admin/orders/${orderId}/payment`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
}