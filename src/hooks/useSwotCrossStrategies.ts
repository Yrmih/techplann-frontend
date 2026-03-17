"use client";

import { useState } from "react";
import { toast } from "sonner";

export type CrossStrategyType = "FO" | "FA" | "WO" | "WT";
export type CrossStrategyPriority = "baixa" | "media" | "alta";
export type CrossStrategyStatus = "planejada" | "em_andamento" | "concluida";

export interface CrossStrategy {
  id: string;
  swot_analysis_id: string;
  tipo: CrossStrategyType;
  titulo: string;
  descricao: string | null;
  prioridade: CrossStrategyPriority;
  impacto: number;
  esforco: number;
  risco: number;
  responsavel: string | null;
  status: CrossStrategyStatus;
  prazo?: string | null;
  swot_items?: { id: string; titulo: string; tipo: string }[];
}

export interface CrossStrategyInput {
  swot_analysis_id: string;
  tipo: CrossStrategyType;
  titulo: string;
  descricao?: string | null;
  prioridade: CrossStrategyPriority;
  impacto: number;
  esforco: number;
  risco: number;
  responsavel?: string | null;
  status: CrossStrategyStatus;
  prazo?: string | null;
  swot_item_ids?: string[];
}

export const useCrossStrategies = (analysisId: string | null) => {
  const [data] = useState<CrossStrategy[]>([]);
  return { data, isLoading: false };
};

export const useCrossStrategyMutations = () => {
  return {
    createStrategy: {
      mutate: (data: CrossStrategyInput) =>
        toast.success("Estratégia cruzada criada"),
      isPending: false,
    },
    updateStrategy: {
      mutate: (data: Partial<CrossStrategyInput> & { id: string }) =>
        toast.success("Estratégia atualizada"),
      isPending: false,
    },
    deleteStrategy: {
      mutate: (params: { id: string; analysisId: string }) =>
        toast.success("Estratégia excluída"),
      isPending: false,
    },
  };
};
