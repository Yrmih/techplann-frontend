import { z } from "zod";

export const projectSchema = z.object({
  titulo: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
  descricao: z.string(),
  responsavelId: z.string().min(1, "O responsável é obrigatório"),
  departamentoId: z.string().min(1, "O departamento é obrigatório"),
  dataInicio: z.string().min(1, "Data de início é obrigatória"),
  dataFinal: z.string().min(1, "Data final é obrigatória"),
  situacao: z.string().min(1, "A situação é obrigatória"),
  parceiros: z.array(z.string()),
  swot: z.array(z.string()),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;
