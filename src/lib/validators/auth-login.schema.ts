import { z } from "zod";

export const authLoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "O e-mail é obrigatório" })
    .email({ message: "Insira um e-mail válido" }),
  // Mudamos de 'senha' para 'password' para bater com o DTO do NestJS
  password: z
    .string()
    .min(1, { message: "A senha é obrigatória" })
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
});

// Extraímos o tipo para usar no useForm do React
export type AuthLoginData = z.infer<typeof authLoginSchema>;
