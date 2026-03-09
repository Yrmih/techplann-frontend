import { z } from "zod";

export const projectSchema = z.object({
  titulo: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
  descricao: z.string().optional(),
  responsavelId: z.string().min(1, "Selecione um responsável"),
  departamentoId: z.string().min(1, "Selecione um departamento"),
  dataInicio: z.string().min(10, "Data inválida"),
  dataFinal: z.string().min(10, "Data inválida"),
  situacao: z.string().default("nao-iniciado"),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;
