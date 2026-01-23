import { z } from "zod";

const PLAN_TYPES = ["starter", "professional", "enterprise"] as const;

export const planSelectionSchema = z.object({
  plan: z.enum(PLAN_TYPES, {
    // Estas chaves são nativas e extremamente estáveis
    required_error: "Por favor, selecione um plano para continuar.",
    invalid_type_error: "Por favor, selecione um plano para continuar.",
  }),
});

export type PlanSelectionData = z.infer<typeof planSelectionSchema>;