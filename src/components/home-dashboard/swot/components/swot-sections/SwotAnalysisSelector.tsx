"use client";

import { SwotAnalysis } from "@/hooks/useSwotAnalyses";
import { CustomSelect } from "@/components/ui/custom/CustomSelect";
import { Pencil, Trash2, LayoutGrid } from "lucide-react";

interface SwotAnalysisSelectorProps {
  analyses: SwotAnalysis[];
  selectedAnalysis: SwotAnalysis | null;
  onSelect: (analysis: SwotAnalysis | null) => void;
  onCreate: () => void;
  onUpdate: (id: string, data: { nome: string; descricao?: string }) => void;
  onDelete: (params: {id:string; planejamentoId: string}) => void;
  selectedPlanId: string;
  isCreating?: boolean;
  isUpdating?: boolean;
}

export const SwotAnalysisSelector = ({
  analyses,
  selectedAnalysis,
  onSelect,
  onCreate,
  onUpdate,
  onDelete,
  selectedPlanId,
}: SwotAnalysisSelectorProps) => {
  const handleEdit = () => {
    if (!selectedAnalysis) return;
    const novoNome = prompt("Novo nome da análise:", selectedAnalysis.nome);
    if (novoNome && novoNome.trim() !== "") {
      onUpdate(selectedAnalysis.id, { nome: novoNome });
    }
  };

  return (
    <div className="flex items-end gap-3">
      {/* SELETOR COM SUA UI PREMIUM */}
      <div className="w-[320px] text-left">
        <div className="flex items-center gap-2 mb-2 ml-1">
          <LayoutGrid size={14} className="text-slate-400" />
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[1.5px]">
            Diagnóstico SWOT Ativo
          </label>
        </div>

        <CustomSelect
          placeholder="Selecione ou crie uma análise..."
          value={selectedAnalysis?.id || ""}
          options={[
            { value: "new", label: "+ Criar Novo Diagnóstico" },
            ...analyses.map((a) => ({
              value: a.id,
              label: a.nome.toUpperCase(),
            })),
          ]}
          onValueChange={(val) => {
            if (val === "new") {
              onCreate();
            } else {
              const found = analyses.find((a) => a.id === val);
              if (found) onSelect(found);
            }
          }}
        />
      </div>

      {/* BOTÕES DE AÇÃO COM SUA UI QUADRICULADA */}
      {selectedAnalysis && (
        <div className="flex items-center gap-2">
          <button
            onClick={handleEdit}
            className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-slate-900 hover:border-slate-300 transition-all shadow-sm"
            title="Editar nome da análise"
          >
            <Pencil size={16} strokeWidth={2.5} />
          </button>

          <button
            onClick={() => {
              if (
                confirm(
                  "Deseja realmente excluir este diagnóstico? Todos os itens vinculados serão perdidos.",
                )
              ) {
                onDelete({
                  id: selectedAnalysis.id,
                  planejamentoId: selectedPlanId
                });
              }
            }}
            className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-rose-600 hover:border-rose-100 hover:bg-rose-50 transition-all shadow-sm"
            title="Excluir diagnóstico"
          >
            <Trash2 size={16} strokeWidth={2.5} />
          </button>
        </div>
      )}
    </div>
  );
};
