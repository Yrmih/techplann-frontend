import { z } from "zod";

export const ResponsibleSchema = z.object({
  fullName: z
    .string()
    .min(3, "O nome completo é obrigatório")
    .max(100, "Nome muito longo"),

  cpf: z.string().min(11, "CPF incompleto").max(14, "CPF inválido"),

  email: z
    .string()
    .email("E-mail corporativo inválido")
    .max(100, "E-mail muito longo"),

  phone: z
    .string()
    .min(10, "Telefone incompleto")
    .max(15, "Telefone inválido")
    .optional()
    .or(z.literal("")),

  jobTitle: z
    .string()
    .min(1, "O cargo é obrigatório")
    .max(50, "Cargo muito longo"),
});

export type RepresentativeData = z.infer<typeof ResponsibleSchema>;
