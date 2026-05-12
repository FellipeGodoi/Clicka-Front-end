import { api } from "@/api/api"

export async function receivedReturn(
  returnId: string
): Promise<void> {

  const token = localStorage.getItem("token")

  await api.patch(
    `/admin/returning/${returnId}/received`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
}