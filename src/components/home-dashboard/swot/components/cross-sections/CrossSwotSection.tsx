"use client";

import { useState } from "react";
import { SwotItem } from "@/hooks/useSwot";
import { SwotAnalysis } from "@/hooks/useSwotAnalyses";
import {
  useCrossStrategies,
  useCrossStrategyMutations,
  CrossStrategy,
  CrossStrategyType,
  CrossStrategyInput,
} from "@/hooks/useSwotCrossStrategies";
import { CrossSwotQuadrant } from "./CrossSwotQuadrant";
import { CrossSwotStrategyDialog } from "./CrossSwotStrategyDialog";
import { CrossSwotProjects } from "./CrossSwotProjects";
import { Swords } from "lucide-react";
import { motion } from "framer-motion";

interface CrossSwotSectionProps {
  analysis: SwotAnalysis;
  swotItems: SwotItem[];
}

export const CrossSwotSection = ({
  analysis,
  swotItems,
}: CrossSwotSectionProps) => {
  // HOOKS DE DADOS
  const { data: strategies = [], isLoading } = useCrossStrategies(analysis.id);
  const { createStrategy, updateStrategy, deleteStrategy } =
    useCrossStrategyMutations();

  // ESTADOS DE UI
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingStrategy, setEditingStrategy] = useState<CrossStrategy | null>(
    null,
  );
  const [currentTipo, setCurrentTipo] = useState<CrossStrategyType>("FO");

  // AGRUPAMENTO LÓGICO DAS ESTRATÉGIAS
  const grouped = {
    FO: strategies.filter((s) => s.tipo === "FO"),
    FA: strategies.filter((s) => s.tipo === "FA"),
    WO: strategies.filter((s) => s.tipo === "WO"),
    WT: strategies.filter((s) => s.tipo === "WT"),
  };

  // HANDLERS DE AÇÃO
  const handleAdd = (tipo: CrossStrategyType) => {
    setEditingStrategy(null);
    setCurrentTipo(tipo);
    setDialogOpen(true);
  };

  const handleEdit = (strategy: CrossStrategy) => {
    setEditingStrategy(strategy);
    setCurrentTipo(strategy.tipo);
    setDialogOpen(true);
  };

  const handleDelete = (strategy: CrossStrategy) => {
    if (
      confirm(
        "Deseja realmente excluir esta estratégia? Esta ação não pode ser desfeita.",
      )
    ) {
      deleteStrategy.mutate({ id: strategy.id, analysisId: analysis.id });
    }
  };

  const handleSave = (data: Partial<CrossStrategyInput>) => {
    const payload = {
      titulo: data.titulo || "",
      descricao: data.descricao || null,
      tipo: currentTipo,
      prioridade: data.prioridade || "media",
      status: data.status || "planejada",
      impacto: data.impacto || 3,
      esforco: data.esforco || 3,
      risco: data.risco || 3,
      responsavel: data.responsavel || null,
      prazo: data.prazo || null,
      swot_analysis_id: analysis.id,
      swot_item_ids: data.swot_item_ids || [],
    };

    if (editingStrategy) {
      updateStrategy.mutate({ id: editingStrategy.id, ...payload });
    } else {
      createStrategy.mutate(payload as CrossStrategyInput);
    }
    setDialogOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10"
    >
      {/* HEADER DA SEÇÃO - UI PREMIUM */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 text-left">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100">
            <Swords size={28} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase leading-none">
              SWOT Cruzada
            </h2>
            <p className="text-slate-400 font-bold text-[11px] uppercase tracking-[2px] mt-2">
              Cruzamento de fatores internos e externos para inteligência
              estratégica
            </p>
          </div>
        </div>
      </div>

      {/* GRADE DE QUADRANTES CRUZADOS (FO, FA, WO, WT) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {(["FO", "FA", "WO", "WT"] as CrossStrategyType[]).map((tipo) => (
          <CrossSwotQuadrant
            key={tipo}
            tipo={tipo}
            strategies={grouped[tipo]}
            onAdd={() => handleAdd(tipo)}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isLoading={isLoading}
          />
        ))}
      </div>

      {/* SEÇÃO DE PROJETOS / PLANOS DE AÇÃO VINCULADOS */}
      <div className="pt-10 border-t border-slate-100">
        <CrossSwotProjects swotItems={swotItems} />
      </div>

      {/* DIALOG DE EDIÇÃO/CRIAÇÃO - SHADCN + UI ELITE */}
      <CrossSwotStrategyDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        tipo={currentTipo}
        strategy={editingStrategy}
        swotItems={swotItems}
        onSave={handleSave}
        isSaving={createStrategy.isPending || updateStrategy.isPending}
      />
    </motion.div>
  );
};
