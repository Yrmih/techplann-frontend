"use client";

import { useState, useMemo } from "react";
import { toast } from "sonner";

export interface Planejamento {
  id: string;
  nome: string;
  descricao: string | null;
  status: "Ativo" | "Concluído" | "Suspenso";
  data_inicio: string | null;
  data_fim: string | null;
  organization_id: string;
  parceiros_nomes?: string[];
}

// DADOS SIMULADOS (MOCK)
const MOCK_PLAN_DATA: Planejamento[] = [
  {
    id: "plan_1",
    nome: "Planejamento Estratégico 2025",
    descricao: "Foco em expansão comercial e retenção de talentos.",
    status: "Ativo",
    data_inicio: "2025-01-01",
    data_fim: "2025-12-31",
    organization_id: "org_1",
    parceiros_nomes: ["Consultoria Alpha", "Agência de Marketing"],
  },
  {
    id: "plan_2",
    nome: "Reestruturação Operacional Q3",
    descricao: "Otimização de processos internos e redução de custos.",
    status: "Concluído",
    data_inicio: "2024-06-01",
    data_fim: "2024-09-30",
    organization_id: "org_1",
    parceiros_nomes: ["Logística Global"],
  },
];

export const usePlanejamentos = () => {
  const [planejamentos, setPlanejamentos] =
    useState<Planejamento[]>(MOCK_PLAN_DATA);
  const [isLoading, setIsLoading] = useState(false);

  // Estado para controlar qual planejamento está selecionado no seletor do topo
  const [selectedPlanId, setSelectedPlanId] = useState<string>(
    MOCK_PLAN_DATA[0].id,
  );

  // Retorna o objeto do planejamento que está selecionado no momento
  const selectedPlanejamento = useMemo(() => {
    return planejamentos.find((p) => p.id === selectedPlanId) || null;
  }, [planejamentos, selectedPlanId]);

  // Simulação de Criar (POST /api/planejamentos)
  const createPlanejamento = (newData: Partial<Planejamento>) => {
    setIsLoading(true);
    setTimeout(() => {
      const newPlan: Planejamento = {
        id: Math.random().toString(36).substr(2, 9),
        nome: newData.nome || "Novo Planejamento",
        descricao: newData.descricao || null,
        status: "Ativo",
        data_inicio: newData.data_inicio || null,
        data_fim: newData.data_fim || null,
        organization_id: "org_1",
      };
      setPlanejamentos((prev) => [newPlan, ...prev]);
      setIsLoading(false);
      toast.success("Planejamento criado com sucesso!");
    }, 800);
  };

  // Simulação de Deletar
  const deletePlanejamento = (id: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setPlanejamentos((prev) => prev.filter((p) => p.id !== id));
      setIsLoading(false);
      toast.success("Planejamento excluído.");
    }, 500);
  };

  return {
    planejamentos,
    selectedPlanejamento,
    selectedPlanId,
    setSelectedPlanId,
    isLoading,
    createPlanejamento,
    deletePlanejamento,
  };
};
