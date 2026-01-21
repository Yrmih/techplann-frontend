import { z } from "zod";

export const authLoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "O e-mail é obrigatório" })
    .email({ message: "Insira um e-mail válido" }),
  senha: z
    .string()
    .min(1, { message: "A senha é obrigatória" })
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
});