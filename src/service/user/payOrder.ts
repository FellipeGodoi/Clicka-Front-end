import { api } from "@/api/api"

export async function payOrder(
  orderId: string,
  payments: { cardId: string; amount: number }[]
) {
  try {
    const response = await api.post(
      `/my-data/orders/${orderId}/pay`,
      {
        payments,
      }
    )

    return response.data
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message ||
      "Erro ao processar pagamento"
    )
  }
}