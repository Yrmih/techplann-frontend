"use client";

import { useState } from "react";
import { toast } from "sonner";

export interface SwotAnalysis {
  id: string;
  planejamento_id: string;
  nome: string;
  descricao: string | null;
}

export interface SwotAnalysisInput {
  planejamento_id: string;
  nome: string;
  descricao?: string | null;
}

const MOCK_ANALYSES: SwotAnalysis[] = [
  {
    id: "ana_1",
    planejamento_id: "plan_1",
    nome: "Análise Inicial 2025",
    descricao: "SWOT Geral da empresa",
  },
];

export const useSwotAnalyses = (planejamentoId: string | null) => {
  const [data] = useState<SwotAnalysis[]>(MOCK_ANALYSES);
  const filtered = planejamentoId
    ? data.filter((a) => a.planejamento_id === planejamentoId)
    : [];
  return { data: filtered, isLoading: false };
};

interface MutationOptions {
  onSuccess?: (data: SwotAnalysis) => void;
}

export const useSwotAnalysesMutations = () => {
  return {
    createAnalysis: {
      mutate: (data: SwotAnalysisInput, options?: MutationOptions) => {
        toast.success("Análise criada");
        if (options?.onSuccess) options.onSuccess(MOCK_ANALYSES[0]);
      },
      isPending: false,
    },
    updateAnalysis: {
      mutate: (
        data: Partial<SwotAnalysisInput> & { id: string },
        options?: MutationOptions,
      ) => {
        toast.success("Análise atualizada");
        if (options?.onSuccess) options.onSuccess(MOCK_ANALYSES[0]);
      },
      isPending: false,
    },
    deleteAnalysis: {
      mutate: (
        params: { id: string; planejamentoId: string },
        options?: { onSuccess?: () => void },
      ) => {
        toast.success("Análise excluída");
        if (options?.onSuccess) options.onSuccess();
      },
      isPending: false,
    },
  };
};
