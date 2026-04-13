import { api } from "@/api/api"
import { UserMyDataResponse } from "@/interfaces/request-interfaces/request-user.interface"

export async function getMyData(): Promise<UserMyDataResponse> {
  const token = localStorage.getItem("token")
  const response = await api.get<UserMyDataResponse>(
    "/my-data",
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  return response.data
}