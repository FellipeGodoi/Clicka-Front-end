import { api } from "@/api/api"

export async function approveReturn(
  returnId: string
): Promise<void> {

  const token = localStorage.getItem("token")

  await api.patch(
    `/admin/returning/${returnId}/approve`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
}
