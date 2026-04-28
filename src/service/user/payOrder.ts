export async function payOrder(
  orderId: string,
  payments: { cardId: string; amount: number }[]
) {
  const token = localStorage.getItem("token")

  if (!token) {
    throw new Error("Usuário não autenticado")
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/my-data/orders/${orderId}/pay`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        payments,
      }),
    }
  )

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Erro ao processar pagamento")
  }

  return response.json()
}