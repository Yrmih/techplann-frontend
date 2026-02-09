import { z } from "zod";

export const organizationStepOneSchema = z.object({
  razaoSocial: z
    .string()
    .min(1, "Razão Social é obrigatória")
    .max(100, "Razão Social muito longa"),
  nomeFantasia: z.string().max(100, "Nome Fantasia muito longo").optional(),

  cnpj: z.string().min(18, "CNPJ incompleto").max(18, "CNPJ inválido"),

  inscricaoEstadual: z.string().max(20, "IE muito longa").optional(),
  inscricaoMunicipal: z.string().max(20, "IM muito longa").optional(),

  email: z.string().email("E-mail inválido").max(100, "E-mail muito longo"),

  telefone: z
    .string()
    .min(14, "Telefone incompleto")
    .max(14, "Telefone inválido"),

  celular: z.string().min(15, "Celular incompleto").max(15, "Celular inválido"),

  cep: z.string().min(9, "CEP incompleto").max(9, "CEP inválido"),

  endereco: z
    .string()
    .min(1, "Endereço é obrigatório")
    .max(150, "Endereço muito longo"),
  numero: z
    .string()
    .min(1, "Número é obrigatório")
    .max(10, "Número muito longo"),
  complemento: z.string().max(50, "Complemento muito longo").optional(),
  bairro: z
    .string()
    .min(1, "Bairro é obrigatório")
    .max(50, "Bairro muito longo"),
  cidade: z
    .string()
    .min(1, "Cidade é obrigatória")
    .max(50, "Cidade muito longa"),

  estado: z.string().length(2, "UF inválida"),
});

export type OrganizationStepOneData = z.infer<typeof organizationStepOneSchema>;
