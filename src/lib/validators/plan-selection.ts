import { z } from "zod";

// Definimos os valores como literais constantes
const PLANS = ["monthly", "yearly"] as const;

export const planSelectionSchema = z.object({
  plan: z.enum(PLANS, {
    errorMap: () => ({ message: "Por favor, selecione um plano para continuar." }),
  }),
});

export type PlanSelectionData = z.infer<typeof planSelectionSchema>;