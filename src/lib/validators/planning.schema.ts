import * as z from "zod";

export const planningSchema = z.object({
  titulo: z.string().min(5, "O título deve ter pelo menos 5 caracteres"),
  parceiroId: z.string().min(1, "Selecione um parceiro"),

  // 'status' de boolean para string para aceitar as opções do Select
  // E o nome para 'situacao' para bater com o defaultValues do form
  situacao: z.string().min(1, "Selecione uma situação"),

  // Opcionais se você não estiver usando as listas agora,
  // mas mantidos como string/array para não quebrar o form
  departamentoId: z.string().optional(),
  responsaveisIds: z.array(z.string()).optional(),

  // Se ainda precisar do campo status como booleano por algum motivo de banco de dados,
  // mantemos ele como opcional, mas a UI usará 'situacao'
  status: z.boolean().optional(),
});

export type PlanningFormValues = z.infer<typeof planningSchema>;
