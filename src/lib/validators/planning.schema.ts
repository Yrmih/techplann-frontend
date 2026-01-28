import * as z from "zod";

export const planningSchema = z.object({
  titulo: z.string().min(5, "O título deve ter pelo menos 5 caracteres"),
  parceiroId: z.string().min(1, "Selecione um parceiro"),
  departamentoId: z.string().min(1, "Selecione um departamento"),
  responsaveisIds: z.array(z.string()).min(1, "Selecione pelo menos um responsável"),
});

export type PlanningFormValues = z.infer<typeof planningSchema>;