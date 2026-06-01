import { api } from "@/api/api"

export interface ProductResponse {
  id: string
  name: string
  imageUrl: string
  defaultPrice: number
  promotionalPrice: number
  stockQuantity: number
  type:string
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


export async function searchProducts(params: {
  search: string
  minPrice?: number
  maxPrice?: number
  type?: string
  includeOutOfStock?: boolean
  orderByPrice?: string
  size?: number
  page?: number
}) {
  const response = await api.get(`/products`, {
    params: {
      search: params.search,
      minPrice: params.minPrice,
      maxPrice: params.maxPrice,
      type: params.type,
      includeOutOfStock: params.includeOutOfStock,
      orderByPrice: params.orderByPrice,
      size: params.size,
      page: params.page,
    }
  })

  return response.data
}