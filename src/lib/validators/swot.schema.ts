import * as z from "zod";

export const swotItemSchema = z.object({
  descricao: z.string().min(3, "A descrição deve ter pelo menos 3 caracteres"),
  pontuacaao: z.number().min(1, "Mínimo 1").max(100, "Máximo 100"),
});

export type SwotItemValues = z.infer<typeof swotItemSchema>;