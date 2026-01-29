import * as z from "zod";

export const canvasItemSchema = z.object({
  descricao: z.string().min(3, "A descrição deve ter pelo menos 3 caracteres"),
});

export type CanvasItemValues = z.infer<typeof canvasItemSchema>;