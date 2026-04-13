'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'

import TextInput from '@/components/inputs/text-input/TextInput'
import { loginSchema } from './login.schema'
import Button from '../button/Button'

import { login } from '@/service/auth/login'
import PasswordInput from '@/components/inputs/password-input/PasswordInput'

type LoginFormData = z.infer<typeof loginSchema>

const LoginForm = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  async function handleFormSubmit(data: LoginFormData) {
    try {
      const response = await login(data)

      localStorage.setItem("token", response.token);
      localStorage.setItem("role", response.role)

      if (response.role === "ROLE_USER") {
        router.push("/profile")
      }

      if (response.role === "ROLE_ADMIN") {
        router.push("/users")
      }

    } catch (error) {
      console.error("Erro ao fazer login", error)
    }
  }

  return (
    <form 
      onSubmit={handleSubmit(handleFormSubmit)} 
      style={{
        width: "100%",
        display:'flex',
        flexDirection:'column',
        gap: 26
      }}
    >
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
        error={errors.password?.message}
        {...register('password')}
      />

      <Button
        type="submit"
        color="--dark-blue-100"
      >
        Entrar
      </Button>
    </form>
  )
}

export default LoginForm