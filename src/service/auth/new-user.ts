import { api } from "@/api/api";
import { registerSchema } from "@/components/forms/register-form/register.schema";
import { z } from "zod";

type RegisterInput = z.infer<typeof registerSchema>;

export async function registerUser(data: RegisterInput) {
  const body = {
    name: data.nomeCompleto,
    cpf: data.documento.replace(/\D/g, ""),
    email: data.email,
    password: data.senha,
  };

  const response = await api.post("/users", body);

  return response.data;
}