import * as z from "zod";

// Schema para o Modal de Criação Inicial
export const swotCreateSchema = z.object({
  nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  descricao: z.string().optional(),
});

// Schema para Itens das Matrizes (Forças, Fraquezas, etc)
// ATUALIZADO: Agora inclui os fatores de cálculo para bater com a UI
export const swotItemSchema = z.object({
  descricao: z.string().min(5, "Descreva o item com mais detalhes"),
  importancia: z.string(),
  intensidade: z.string(),
  tendencia: z.string(),
  pontuacaao: z.number().min(1).max(125), // 5 * 5 * 5 = 125
});

export type SwotCreateValues = z.infer<typeof swotCreateSchema>;
export type SwotItemValues = z.infer<typeof swotItemSchema>;
