import * as z from "zod";

export const partnerSchema = z.object({
  nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  documento: z.string().min(11, "CPF ou CNPJ inválido"),
  email: z.string().email("E-mail inválido"),
  telefone: z.string().min(10, "Telefone inválido"),
  categoria: z.string().min(1, "Selecione uma categoria"),
  influencia: z.string().min(1, "Selecione o nível de influência"),
  status: z.boolean(),
});

export type PartnerFormValues = z.infer<typeof partnerSchema>;