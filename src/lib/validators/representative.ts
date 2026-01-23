import { z } from "zod";

export const OrganizationSchema = z.object({
  fullName: z.string().min(3, "O nome completo é obrigatório"),
  cpf: z.string().min(11, "CPF inválido"),
  email: z.string().email("E-mail corporativo inválido"),
  phone: z.string().optional(),
  jobTitle: z.string().min(1, "O cargo é obrigatório"),
});

export type RepresentativeData = z.infer<typeof OrganizationSchema>;