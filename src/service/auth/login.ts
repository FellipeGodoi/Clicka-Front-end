import { api } from "@/api/api"

export type LoginRequest = {
  email: string
  password: string
}

export type LoginResponse = {
  role: string
  token: string
}

export async function login(
  data: LoginRequest
): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>(
    "/auth/login",
    data
  )

  return response.data
}