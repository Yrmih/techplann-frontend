import { z } from "zod";

export const organizationStepOneSchema = z.object({
  razaoSocial: z.string().min(1, "Razão Social é obrigatória"),
  nomeFantasia: z.string().optional(),
  cnpj: z.string().min(18, "CNPJ inválido"), 
  inscricaoEstadual: z.string().optional(),
  inscricaoMunicipal: z.string().optional(),
  email: z.string().email("E-mail inválido"),
  telefone: z.string().min(14, "Telefone inválido"), 
  celular: z.string().min(15, "Celular inválido"),  
  cep: z.string().min(9, "CEP inválido"),           
  endereco: z.string().min(1, "Endereço é obrigatório"),
  numero: z.string().min(1, "Número é obrigatório"),
  complemento: z.string().optional(),
  bairro: z.string().min(1, "Bairro é obrigatório"),
  cidade: z.string().min(1, "Cidade é obrigatória"),
  estado: z.string().length(2, "UF inválida"),
});

export type OrganizationStepOneData = z.infer<typeof organizationStepOneSchema>;