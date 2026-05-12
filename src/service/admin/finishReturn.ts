import { api } from "@/api/api"

interface FinishReturnDTO {
  approved: boolean
  rejectionReason?: string
}

export async function finishReturn(
  returnId: string,
  data: FinishReturnDTO
): Promise<void> {

  const token = localStorage.getItem("token")

  await api.patch(
    `/admin/returning/${returnId}/finish`,
    {
      approved: data.approved,
      rejectionReason: data.rejectionReason
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
}