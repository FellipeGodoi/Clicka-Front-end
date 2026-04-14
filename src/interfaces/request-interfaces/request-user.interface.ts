export type PhoneResponse = {
  id: string
  number: string
  nickname: string
}

export type AddressResponse = {
  id: string
  nickname: string
  neighborhood: string
  street: string
  number: string
  city: string
  state: string
  zipCode: string
  complement: string
}

export type CardResponse = {
  id: string
  cardNumber: string
  nickname: string
  expirationDate: string
}

export type UserMyDataResponse = {
  id?: string
  name?: string
  cpf?: string
  email?: string
  credit?: number
  isActive?: boolean
  phones?: PhoneResponse[]
  addresses?: AddressResponse[]
  cards?: CardResponse[]
}