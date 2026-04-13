import { z } from 'zod'

export const registerSchema = z.object({
  nomeCompleto: z
    .string()
    .min(3, 'Informe o nome completo'),

  documento: z
    .string()
    .min(11, 'CPF ou CNPJ inválido'),

  email: z
    .string()
    .email('Email inválido'),

  senha: z
    .string()
    .min(8, 'A senha deve ter no mínimo 8 caracteres')
    .regex(/[A-Za-z]/, 'A senha deve conter pelo menos uma letra')
    .regex(/[0-9]/, 'A senha deve conter pelo menos um número')
    .regex(/[^A-Za-z0-9]/, 'A senha deve conter um caractere especial'),
})
