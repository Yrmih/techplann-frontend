"use client";

import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, FileText, Filter } from "lucide-react";

// 1. COMPONENTES MODULARES (FIDELIDADE AO LOVABLE)
import { SwotAnalysisSelector } from "./components/swot-sections/SwotAnalysisSelector";
import { SwotQuadrant } from "./components/swot-sections/SwotQuadrant";
import { SwotCharts } from "./components/swot-sections/SwotCharts";
import { CrossSwotSection } from "./components/cross-sections/CrossSwotSection";

// 2. MODAIS E UI
import { SwotCreateModal } from "./components/modal/SwotCreateModal";
import { SwotItemModal } from "./components/modal/SwotItemModal";
import { CustomSelect } from "@/components/ui/custom/CustomSelect";

// 3. HOOKS E TIPAGEM (ESTRITO REACT 19 / NEXT.JS 16)
import {
  useSwotItems,
  useDepartamentos,
  SwotTipo,
  SwotItem,
  useSwotMutations,
} from "@/hooks/useSwot";
import {
  useSwotAnalyses,
  useSwotAnalysesMutations,
} from "@/hooks/useSwotAnalyses";
import { usePlanejamentos } from "@/hooks/usePlanejamentos";

// SCHEMA DE VALIDAÇÃO
import { SwotCreateValues } from "@/lib/validators/swot.schema";
import { cn } from "@/lib/utils/utils";

export const SwotAnalysisPage = () => {
  const { selectedPlanId, planejamentos } = usePlanejamentos();

  // Hooks de Dados
  const { data: allSwotItems = [], isLoading: loadingItems } =
    useSwotItems(selectedPlanId);
  const { deleteItem } = useSwotMutations();
  const { data: analyses = [], isLoading: loadingAnalyses } =
    useSwotAnalyses(selectedPlanId);
  const { data: departamentos = [] } = useDepartamentos();
  const { createAnalysis, updateAnalysis, deleteAnalysis } =
    useSwotAnalysesMutations();

  // CONTROLE DE ESTADO
  const [selectedAnalysisId, setSelectedAnalysisId] = useState<string | null>(
    null,
  );
  const [isCruzada, setIsCruzada] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);
  const [editingItem, setEditingItem] = useState<SwotItem | null>(null);
  const [currentTipo, setCurrentTipo] = useState<SwotTipo>("forca");
  const [filterDept, setFilterDept] = useState("all");

  // --- SOLUÇÃO DE ELITE: DERIVAÇÃO DE ESTADO ---
  // Substitui o useEffect problemático. Se há análises ou um ID selecionado, o sistema está pronto.
  const isInitialized = analyses.length > 0 || !!selectedAnalysisId;

  // ANÁLISE SELECIONADA: Cálculo puro
  const selectedAnalysis = useMemo(() => {
    if (analyses.length === 0) return null;
    return analyses.find((a) => a.id === selectedAnalysisId) || analyses[0];
  }, [analyses, selectedAnalysisId]);

  // FILTRO DE ITENS
  const filteredItems = useMemo(() => {
    if (!selectedAnalysis || !isInitialized) return [];
    return allSwotItems.filter((item) => {
      const matchesAnalysis = item.swot_analysis_id === selectedAnalysis.id;
      const matchesDept =
        filterDept === "all" ? true : item.departamento_id === filterDept;
      return matchesAnalysis && matchesDept;
    });
  }, [allSwotItems, selectedAnalysis, filterDept, isInitialized]);

  // AGRUPAMENTO PARA OS QUADRANTES
  const grouped = {
    forca: filteredItems.filter((i) => i.tipo === "forca"),
    fraqueza: filteredItems.filter((i) => i.tipo === "fraqueza"),
    oportunidade: filteredItems.filter((i) => i.tipo === "oportunidade"),
    ameaca: filteredItems.filter((i) => i.tipo === "ameaca"),
  };

  const totals = {
    forca: grouped.forca.reduce((sum, i) => sum + (i.pontuacao || 0), 0),
    fraqueza: grouped.fraqueza.reduce((sum, i) => sum + (i.pontuacao || 0), 0),
    oportunidade: grouped.oportunidade.reduce(
      (sum, i) => sum + (i.pontuacao || 0),
      0,
    ),
    ameaca: grouped.ameaca.reduce((sum, i) => sum + (i.pontuacao || 0), 0),
  };

  // HANDLERS
  const handleAddItem = (tipo: SwotTipo) => {
    setEditingItem(null);
    setCurrentTipo(tipo);
    setShowItemModal(true);
  };

  const handleEditItem = (item: SwotItem) => {
    setEditingItem(item);
    setCurrentTipo(item.tipo as SwotTipo);
    setShowItemModal(true);
  };

  const handleCreateAnalysis = (data: SwotCreateValues) => {
    createAnalysis.mutate(
      { planejamento_id: selectedPlanId || "", ...data },
      {
        onSuccess: (newAna) => {
          setSelectedAnalysisId(newAna.id);
          setShowCreateModal(false);
        },
      },
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 p-8 max-w-[1600px] mx-auto font-sans text-left"
    >
      <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="space-y-1 text-left">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight text-left uppercase">
            Análise SWOT
          </h1>
          <p className="text-slate-500 font-medium text-sm text-left">
            Gestão Estratégica Next.js 16
          </p>
        </div>
        <div className="w-[320px]">
          <CustomSelect
            placeholder="Planejamento Ativo"
            value={selectedPlanId || ""}
            options={planejamentos.map((p) => ({
              value: p.id,
              label: p.nome.toUpperCase(),
            }))}
            onValueChange={() => {}}
          />
        </div>
      </header>

      {/* TOOLBAR COM SELETOR CORRIGIDO */}
      <div className="flex flex-wrap items-center gap-4">
        <SwotAnalysisSelector
          analyses={analyses}
          selectedAnalysis={isInitialized ? selectedAnalysis : null}
          onSelect={(a) => setSelectedAnalysisId(a?.id || null)}
          onCreate={() => setShowCreateModal(true)}
          onUpdate={(id, data) => updateAnalysis.mutate({ id, ...data })}
          onDelete={(params) => {
            deleteAnalysis.mutate(params);
            setSelectedAnalysisId(null);
          }}
          selectedPlanId={selectedPlanId || ""}
        />

        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 h-10 shadow-sm self-end">
          <Filter className="h-4 w-4 text-slate-400" />
          <select
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
            className="text-sm font-medium text-slate-700 bg-transparent outline-none pr-2 cursor-pointer"
          >
            <option value="all">Todos os departamentos</option>
            {departamentos.map((d) => (
              <option key={d.id} value={d.id}>
                {d.nome}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-start">
        <div className="bg-slate-100/80 p-1 rounded-xl border border-slate-100 flex gap-1">
          <button
            onClick={() => setIsCruzada(false)}
            className={cn(
              "px-6 py-2 rounded-lg text-xs font-bold transition-all",
              !isCruzada
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700",
            )}
          >
            Tradicional
          </button>
          <button
            onClick={() => setIsCruzada(true)}
            className={cn(
              "px-6 py-2 rounded-lg text-xs font-bold transition-all",
              isCruzada
                ? "bg-white text-[#10b981] shadow-sm"
                : "text-slate-500 hover:text-slate-700",
            )}
          >
            Cruzada (BI)
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-[32px] shadow-sm overflow-hidden min-h-[600px]">
        <div className="p-8 text-left">
          <AnimatePresence mode="wait">
            {loadingItems || loadingAnalyses ? (
              <div
                key="loading"
                className="py-24 flex flex-col items-center justify-center"
              >
                <Loader2 className="w-10 h-10 animate-spin text-[#10b981] mb-4" />
                <p className="text-sm font-bold uppercase tracking-widest text-slate-400 text-center">
                  Sincronizando Matriz...
                </p>
              </div>
            ) : !isInitialized ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-24 flex flex-col items-center justify-center text-center border-2 border-dashed border-slate-100 rounded-[32px] bg-slate-50/30"
              >
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-[#10b981] mb-4 mx-auto">
                  <FileText size={32} strokeWidth={1.5} />
                </div>
                <p className="text-sm font-medium text-slate-400 mb-6 max-w-sm mx-auto">
                  Crie uma nova análise SWOT para começar.
                </p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="text-[#10b981] font-bold text-sm uppercase tracking-widest mx-auto hover:underline"
                >
                  Cadastrar Primeira Análise
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="active"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-12"
              >
                {!isCruzada ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {(
                        [
                          "forca",
                          "fraqueza",
                          "oportunidade",
                          "ameaca",
                        ] as SwotTipo[]
                      ).map((tipo) => (
                        <SwotQuadrant
                          key={tipo}
                          tipo={tipo}
                          items={grouped[tipo]}
                          total={totals[tipo]}
                          onAdd={() => handleAddItem(tipo)}
                          onEdit={handleEditItem}
                          onDelete={(item: SwotItem) => {
                            if (confirm("Excluir fator?")) {
                              deleteItem.mutate({
                                id: item.id,
                                planejamentoId: selectedPlanId || "",
                              });
                            }
                          }}
                          isLoading={loadingItems}
                        />
                      ))}
                    </div>
                    <SwotCharts totals={totals} />
                  </>
                ) : (
                  selectedAnalysis && (
                    <CrossSwotSection
                      analysis={selectedAnalysis}
                      swotItems={filteredItems}
                    />
                  )
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* MODAIS */}
      <SwotCreateModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={handleCreateAnalysis}
      />
      <SwotItemModal
        isOpen={showItemModal}
        onClose={() => setShowItemModal(false)}
        tipo={
          currentTipo === "forca"
            ? "Força"
            : currentTipo === "fraqueza"
              ? "Fraqueza"
              : currentTipo === "oportunidade"
                ? "Oportunidade"
                : "Ameaça"
        }
        item={editingItem}
      />
    </motion.div>
  );
};
