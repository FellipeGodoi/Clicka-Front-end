'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import TextInput from '@/components/inputs/text-input/TextInput'
import Button from '../button/Button'
import { registerSchema } from './register.schema'
import PasswordInput from '@/components/inputs/password-input/PasswordInput'
import { registerUser } from '@/service/auth/new-user'
import { useNavigate } from '@/utils/hooks/UseNavigate'

type RegisterFormData = z.infer<typeof registerSchema>

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const {navigateTo, goBack} = useNavigate()

async function handleFormSubmit(data: RegisterFormData) {
    try {
      const response = await registerUser(data)

      localStorage.setItem('userId', response.id)
      goBack()
    } catch (error) {
      console.error('Erro ao cadastrar', error)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 26,
      }}
    >
      <TextInput
        label="Nome completo"
        placeholder="Seu nome completo"
        error={errors.nomeCompleto?.message}
        {...register('nomeCompleto')}
      />

      <TextInput
        label="CPF / CNPJ"
        placeholder="000.000.000-00"
        mask="cpf"
        error={errors.documento?.message}
        {...register('documento')}
      />

      <TextInput
        label="Email"
        type="email"
        placeholder="seu@email.com"
        error={errors.email?.message}
        {...register('email')}
      />

      <PasswordInput
        label="Senha"
        placeholder="••••••••"
        error={errors.senha?.message}
        {...register('senha')}
      />

      <Button type="submit" color="--dark-blue-100">
        Cadastrar
      </Button>
    </form>
  )
}

export default RegisterForm