"use client";

import { useState } from "react";
import { toast } from "sonner";

export type SwotTipo = "forca" | "fraqueza" | "oportunidade" | "ameaca";

export interface SwotItem {
  id: string;
  planejamento_id: string;
  swot_analysis_id: string | null;
  tipo: SwotTipo;
  titulo: string;
  descricao: string | null;
  departamento_id: string | null;
  importancia: number;
  intensidade: number;
  tendencia: number;
  pontuacao: number;
  projetos: number;
}

export interface SwotItemInput {
  planejamento_id: string;
  swot_analysis_id: string;
  tipo: SwotTipo;
  titulo: string;
  descricao?: string | null;
  departamento_id?: string | null;
  importancia: number;
  intensidade: number;
  tendencia: number;
}

const MOCK_ITEMS: SwotItem[] = [
  {
    id: "1",
    planejamento_id: "plan_1",
    swot_analysis_id: "ana_1",
    tipo: "forca",
    titulo: "Equipe Qualificada",
    descricao: "Mão de obra com certificação internacional",
    departamento_id: "dep_1",
    importancia: 5,
    intensidade: 4,
    tendencia: 4,
    pontuacao: 80,
    projetos: 2,
  },
  {
    id: "2",
    planejamento_id: "plan_1",
    swot_analysis_id: "ana_1",
    tipo: "fraqueza",
    titulo: "Custo de Aquisição Alto",
    descricao: "CAC acima da média do mercado",
    departamento_id: "dep_2",
    importancia: 4,
    intensidade: 5,
    tendencia: 3,
    pontuacao: 60,
    projetos: 1,
  },
];

export const useSwotItems = (planejamentoId: string | null) => {
  const [data] = useState<SwotItem[]>(MOCK_ITEMS);
  const filtered = planejamentoId
    ? data.filter((i) => i.planejamento_id === planejamentoId)
    : [];
  return { data: filtered, isLoading: false };
};

export const useSwotMutations = () => {
  return {
    createItem: {
      mutate: (data: SwotItemInput) =>
        toast.success(`Item "${data.titulo}" criado (Mock)`),
      isPending: false,
    },
    updateItem: {
      mutate: (data: Partial<SwotItemInput> & { id: string }) =>
        toast.success("Item atualizado (Mock)"),
      isPending: false,
    },
    deleteItem: {
      mutate: (params: { id: string; planejamentoId: string }) =>
        toast.success("Item excluído (Mock)"),
      isPending: false,
    },
  };
};

export const useDepartamentos = () => {
  return {
    data: [
      { id: "dep_1", nome: "Comercial" },
      { id: "dep_2", nome: "Tecnologia da Informação" },
    ],
    isLoading: false,
  };
};
