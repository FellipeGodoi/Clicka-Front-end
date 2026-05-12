import { api } from "@/api/api"

interface CreateReturningRequest {
  orderId: string

  items: {
    orderItemId: string
    quantity: number
  }[]
}

export async function createReturning(
  data: CreateReturningRequest
): Promise<void> {

  const token = localStorage.getItem("token")

  await api.post(
    "/my-data/returning",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  console.log(data)
}