import { api } from "@/api/api"

export interface CouponResponse {
  id: string
  code: string
  type: "PERCENTAGE" | "FLAT"
  value: number
  minPurchaseAmount: number
  active: boolean
  expirationDate: string
}

export async function validateCoupon(code: string): Promise<CouponResponse> {
  const token = localStorage.getItem("token")

  const response = await api.get<CouponResponse>(
    `/coupons/validate`,
    {
      params: { code },
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  return response.data
}