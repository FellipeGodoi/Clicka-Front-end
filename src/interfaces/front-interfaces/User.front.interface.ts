export interface User {
    id: string
    nomeCompleto: string
    documento: string
    email: string
    telefone: string
    senha: string
    enderecos?: Address[]
    phones?: Phone[]
    creditCards?: CreditCard[]
}

export interface Phone {
    id: string,
    apelindo: string,
    numero: string,
}

export interface CreditCard {
    id: string,
    apelido: string,
    number: string,
    validate: string
}

export interface Address {
  id: string
  apelido: string        
  cep: string
  logradouro: string   
  numero: string
  complemento?: string
  bairro: string
  cidade: string
  estado: string      
}


export const userMock: User = {
  id: 'user_01',
  nomeCompleto: 'Fellipe Godoi',
  documento: '123.456.789-00',
  email: 'fellipe@email.com',
  telefone: '(51) 99999-9999',
  senha: 'hashed_password',

  phones: [
    {
      id: 'phone_01',
      apelindo: 'Pessoal',
      numero: '(51) 98888-7777',
    },
    {
      id: 'phone_02',
      apelindo: 'Trabalho',
      numero: '(51) 97777-6666',
    },
  ],

  creditCards: [
    {
      id: 'card_01',
      apelido: 'Cartão Principal',
      number: '4111 1111 1111 1111',
      validate: '12/29',
    },
    {
      id: 'card_02',
      apelido: 'Cartão Azul',
      number: '4111 1111 1111 1111',
      validate: '12/29',
    },
  ],

  enderecos: [
    {
      id: 'address_01',
      apelido: 'Casa',
      cep: '90000-000',
      logradouro: 'Rua Exemplo',
      numero: '123',
      complemento: 'Apto 301',
      bairro: 'Centro',
      cidade: 'Porto Alegre',
      estado: 'RS',
    },
  ],
}