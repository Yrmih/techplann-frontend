import { z } from "zod";

export const PLAN_TYPES = ["starter", "professional", "enterprise"] as const;

export const planSelectionSchema = z.object({
  planKey: z
    .string()
    .min(1, "Por favor, selecione um plano para continuar.")
    .refine(
      (value): value is (typeof PLAN_TYPES)[number] =>
        PLAN_TYPES.includes(value as (typeof PLAN_TYPES)[number]),
      {
        message: "Plano inválido.",
      }
    ),
});

// 👇 IMPORTANTE
export type PlanSelectionInput = z.input<typeof planSelectionSchema>;
export type PlanSelectionOutput = z.output<typeof planSelectionSchema>;
