export interface CartItemInterface {
  productId: string
  name: string
  price: number
  quantity: number
  stock: number
}

export const cartMock: CartItemInterface[] = [
  {
    productId: "0001",
    name: "Mouse Gamer Pro X",
    price: 180.00,
    quantity: 2,
    stock: 20,
  },
  {
    productId: "0002",
    name: "Teclado Mecânico RGB",
    price: 350.00,
    quantity: 1,
    stock: 8,
  },
]