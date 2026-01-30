import * as z from "zod";

export const companySchema = z.object({
  razaoSocial: z.string().min(3, "Razão Social obrigatória"),
  fantasia: z.string().optional().or(z.literal("")),
  cnpj: z.string().min(14, "CNPJ inválido"),
  endereco: z.string().min(5, "Endereço obrigatório"),
  numero: z.string().min(1, "Obrigatório"),
  cep: z.string().min(8, "CEP inválido"),
  bairro: z.string().min(2, "Bairro obrigatório"),
  complemento: z.string().optional().or(z.literal("")),
  municipio: z.string().min(2, "Município obrigatório"),
  uf: z.string().min(1, "Selecione o estado"),
  responsavel: z.string().min(3, "Responsável obrigatório"),
  email: z.string().email("E-mail inválido"),
  telefone: z.string().min(10, "Telefone inválido"),
  situacao: z.string().min(1, "Obrigatório"), 
  pagamento: z.string().min(1, "Selecione o pagamento"),
});

export type CompanyFormValues = z.infer<typeof companySchema>;