import { api } from "@/api/api"

export interface ProductDetail {
  id: string
  name: string
  defaultPrice: number
  promotionalPrice: number | null
  description: string
  imageUrl: string
  type: string
  stockQuantity: number
  tags: string[]
  details: {
    name: string
    value: string
  }[]
}

export async function getProductById(id: string): Promise<ProductDetail> {
  const response = await api.get<ProductDetail>(
    `/products/${id}`
  )

  return response.data
}