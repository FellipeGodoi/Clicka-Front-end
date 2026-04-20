export interface OrderAddress {
  city: string
  neighborhood: string
  nickname: string
  number: string
  state: string
  street: string
  zipCode: string
}

export interface OrderPhone {
  nickname: string
  number: string
}

export interface OrderItem {
  batchCode: string
  productId: string
  productName: string
  productType: string
  quantity: number
  subtotal: number
  unitPrice: number
}

export interface OrderResponse {
  id: string
  status: string
  totalAmount: number
  finalAmount: number
  discountAmount: number
  creditUsed: number
  couponCode: string | null
  address: OrderAddress
  phone: OrderPhone
  items: OrderItem[]
}

