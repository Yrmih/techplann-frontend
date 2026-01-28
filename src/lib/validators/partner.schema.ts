import * as z from "zod";

export const partnerSchema = z.object({
  nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  documento: z.string().min(11, "CPF ou CNPJ inválido"),
  email: z.string().email("E-...mail inválido"),
  status: z.enum(["Ativo", "Inativo"]),
});

export type PartnerFormValues = z.infer<typeof partnerSchema>;