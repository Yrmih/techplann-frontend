import * as z from "zod";

export const partnerSchema = z.object({
  
  nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  
  categoria: z.string().min(1, "Selecione o tipo de parceiro"),
  
  email: z.string().email("E-mail inválido").optional().or(z.literal("")),
  telefone: z.string().optional().or(z.literal("")),
  
  status: z.string().min(1, "Selecione a situação atual"),
});

export type PartnerFormValues = z.infer<typeof partnerSchema>;