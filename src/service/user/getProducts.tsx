import { api } from "@/api/api"

export interface ProductResponse {
  id: string
  name: string
  imageUrl: string
  defaultPrice: number
  promotionalPrice: number
  stockQuantity: number
  tags: string[]
}

export interface ProductPageResponse {
  content: ProductResponse[]
}

export async function getProductsByType(
  type: string,
  page = 0,
  size = 30
): Promise<ProductPageResponse> {

  const response = await api.get<ProductPageResponse>(
    `/products?type=${type}&size=${size}&page=${page}`
  )

  return response.data
}