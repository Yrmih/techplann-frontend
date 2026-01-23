import { z } from "zod";

export const accountCreationSchema = z.object({
  fullName: z.string().min(3, "O nome completo é obrigatório"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  confirmPassword: z.string().min(6, "Repita a senha"),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "Você deve aceitar os Termos de Uso",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

export type AccountCreationData = z.infer<typeof accountCreationSchema>;