"use client";

import React, { useState, useMemo } from "react";
import {
  Plus,
  TrendingUp,
  Zap,
  Shield,
  AlertTriangle,
  FileText,
  Swords,
  ShieldCheck,
  Lightbulb,
  Target,
  Filter,
  Loader2,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { CustomSelect } from "@/components/ui/custom/CustomSelect";
import { SwotCreateModal } from "./components/modal/SwotCreateModal";
import { SwotItemModal } from "./components/modal/SwotItemModal";

import { SwotResumo } from "./components/charts/SwotResumo";
import { SwotRadarChart } from "./components/charts/SwotRadarChart";
import {
  SwotComparativo,
  SwotComparativoData,
} from "./components/charts/SwotComparativo";

import {
  useSwotItems,
  useDepartamentos,
  SwotItem,
  SwotTipo,
} from "@/hooks/useSwot";
import {
  useSwotAnalyses,
  useSwotAnalysesMutations,
} from "@/hooks/useSwotAnalyses";
import { usePlanejamentos } from "@/hooks/usePlanejamentos";

import { SwotCreateValues } from "@/lib/validators/swot.schema";
import { cn } from "@/lib/utils/utils";

interface SwotCardProps {
  title: string;
  cor: "emerald" | "rose" | "blue" | "amber";
  icon: React.ElementType;
  onAdd: () => void;
  items: SwotItem[];
}

export const SwotAnalysisPage = () => {
  const { selectedPlanId, planejamentos } = usePlanejamentos();

  // Hooks de Dados - Agora lendo corretamente os estados de carregamento
  const { data: allSwotItems, isLoading: loadingItems } =
    useSwotItems(selectedPlanId);
  const { data: analyses, isLoading: loadingAnalyses } =
    useSwotAnalyses(selectedPlanId);
  const { data: departamentos } = useDepartamentos();
  const { createAnalysis } = useSwotAnalysesMutations();

  // Controle de Estado
  const [isInitialized, setIsInitialized] = useState(false);
  const [selectedAnalysisId, setSelectedAnalysisId] = useState<string | null>(
    null,
  );

  const [isCruzada, setIsCruzada] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);
  const [currentTipo, setCurrentTipo] = useState<SwotTipo>("forca");
  const [filterDept, setFilterDept] = useState("all");

  // Análise selecionada derivada
  const selectedAnalysis = useMemo(() => {
    if (analyses.length === 0) return null;
    return analyses.find((a) => a.id === selectedAnalysisId) || analyses[0];
  }, [analyses, selectedAnalysisId]);

  // Filtro de Itens: Só exibe se isInitialized for true
  const filteredItems = useMemo(() => {
    if (!selectedAnalysis || !isInitialized) return [];
    return allSwotItems.filter((item) => {
      const matchesAnalysis = item.swot_analysis_id === selectedAnalysis.id;
      const matchesDept =
        filterDept === "all" ? true : item.departamento_id === filterDept;
      return matchesAnalysis && matchesDept;
    });
  }, [allSwotItems, selectedAnalysis, filterDept, isInitialized]);

  const grouped = {
    forca: filteredItems.filter((i) => i.tipo === "forca"),
    fraqueza: filteredItems.filter((i) => i.tipo === "fraqueza"),
    oportunidade: filteredItems.filter((i) => i.tipo === "oportunidade"),
    ameaca: filteredItems.filter((i) => i.tipo === "ameaca"),
  };

  const totals = {
    forca: grouped.forca.reduce((sum, i) => sum + i.pontuacao, 0),
    fraqueza: grouped.fraqueza.reduce((sum, i) => sum + i.pontuacao, 0),
    oportunidade: grouped.oportunidade.reduce((sum, i) => sum + i.pontuacao, 0),
    ameaca: grouped.ameaca.reduce((sum, i) => sum + i.pontuacao, 0),
  };

  const radarChartData = [
    { subject: "Forças", A: totals.forca, fullMark: 150 },
    { subject: "Fraquezas", A: totals.fraqueza, fullMark: 150 },
    { subject: "Oportunidades", A: totals.oportunidade, fullMark: 150 },
    { subject: "Ameaças", A: totals.ameaca, fullMark: 150 },
  ];

  const comparativoData: SwotComparativoData[] = [
    { category: "Forças", value: totals.forca },
    { category: "Fraquezas", value: totals.fraqueza },
    { category: "Oportunidades", value: totals.oportunidade },
    { category: "Ameaças", value: totals.ameaca },
  ];

  const handleInit = (data: SwotCreateValues) => {
    createAnalysis.mutate(
      {
        planejamento_id: selectedPlanId || "",
        nome: data.nome,
        descricao: data.descricao,
      },
      {
        onSuccess: (newAna) => {
          setSelectedAnalysisId(newAna.id);
          setIsInitialized(true);
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
      {/* HEADER */}
      <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight text-left">
            Análise SWOT
          </h1>
          <p className="text-slate-500 font-medium text-sm text-left">
            Forças, Fraquezas, Oportunidades e Ameaças
          </p>
        </div>

        <div className="w-[320px]">
          <CustomSelect
            placeholder="Planejamento Estratégico 2025"
            value={selectedPlanId || ""}
            options={planejamentos.map((p) => ({ value: p.id, label: p.nome }))}
            onValueChange={() => {}}
          />
        </div>
      </header>

      {/* TOOLBAR */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="w-[280px]">
          <CustomSelect
            placeholder="Selecione a análise..."
            value={isInitialized && selectedAnalysis ? selectedAnalysis.id : ""}
            options={[
              { value: "new", label: "+ Criar Nova Análise" },
              ...analyses.map((a) => ({ value: a.id, label: a.nome })),
            ]}
            onValueChange={(val) =>
              val === "new"
                ? setShowCreateModal(true)
                : setSelectedAnalysisId(val)
            }
          />
        </div>

        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 h-10 shadow-sm">
          <Filter className="h-4 w-4 text-slate-400" />
          <select
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
            className="text-sm font-medium text-slate-700 bg-transparent outline-none pr-2"
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

      {/* TABS */}
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
            SWOT Tradicional
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
            SWOT Cruzada
          </button>
        </div>
      </div>

      {/* CONTAINER PRINCIPAL */}
      <div className="bg-white border border-gray-100 rounded-[32px] shadow-sm overflow-hidden min-h-[600px]">
        <div className="p-8">
          <AnimatePresence mode="wait">
            {/* LENDO AS VARIÁVEIS DE LOADING PARA FEEDBACK VISUAL */}
            {loadingItems || loadingAnalyses ? (
              <div
                key="loading"
                className="py-24 flex flex-col items-center justify-center text-slate-400"
              >
                <Loader2 className="w-10 h-10 animate-spin text-[#10b981] mb-4" />
                <p className="text-sm font-bold uppercase tracking-widest">
                  Sincronizando Matriz...
                </p>
              </div>
            ) : !isInitialized ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-24 flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-[32px] bg-slate-50/30 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-[#10b981] mb-4 mx-auto">
                  <FileText size={32} strokeWidth={1.5} />
                </div>
                <p className="text-sm font-medium text-slate-400 mb-6 max-w-sm mx-auto">
                  Crie uma nova análise SWOT para começar a identificar seus
                  fatores críticos.
                </p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="text-[#10b981] font-bold text-sm hover:underline uppercase tracking-widest"
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  {!isCruzada ? (
                    <>
                      <SwotCard
                        title="Forças"
                        cor="emerald"
                        icon={Shield}
                        onAdd={() => {
                          setCurrentTipo("forca");
                          setShowItemModal(true);
                        }}
                        items={grouped.forca}
                      />
                      <SwotCard
                        title="Fraquezas"
                        cor="rose"
                        icon={AlertTriangle}
                        onAdd={() => {
                          setCurrentTipo("fraqueza");
                          setShowItemModal(true);
                        }}
                        items={grouped.fraqueza}
                      />
                      <SwotCard
                        title="Oportunidades"
                        cor="blue"
                        icon={TrendingUp}
                        onAdd={() => {
                          setCurrentTipo("oportunidade");
                          setShowItemModal(true);
                        }}
                        items={grouped.oportunidade}
                      />
                      <SwotCard
                        title="Ameaças"
                        cor="amber"
                        icon={Zap}
                        onAdd={() => {
                          setCurrentTipo("ameaca");
                          setShowItemModal(true);
                        }}
                        items={grouped.ameaca}
                      />
                    </>
                  ) : (
                    <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <SwotCard
                        title="Ofensivas (FO)"
                        cor="emerald"
                        icon={Swords}
                        onAdd={() => {}}
                        items={[]}
                      />
                      <SwotCard
                        title="Defensivas (FA)"
                        cor="blue"
                        icon={ShieldCheck}
                        onAdd={() => {}}
                        items={[]}
                      />
                      <SwotCard
                        title="Melhoria (WO)"
                        cor="amber"
                        icon={Lightbulb}
                        onAdd={() => {}}
                        items={[]}
                      />
                      <SwotCard
                        title="Sobrevivência (WT)"
                        cor="rose"
                        icon={Target}
                        onAdd={() => {}}
                        items={[]}
                      />
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-10 border-t border-slate-100">
                  <SwotResumo
                    data={{
                      forcas: totals.forca,
                      fraquezas: totals.fraqueza,
                      oportunidades: totals.oportunidade,
                      ameacas: totals.ameaca,
                    }}
                  />
                  <SwotRadarChart data={radarChartData} />
                  <SwotComparativo data={comparativoData} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <SwotCreateModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={handleInit}
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
      />
    </motion.div>
  );
};

const SwotCard = ({ title, cor, icon: Icon, onAdd, items }: SwotCardProps) => {
  const themes = {
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-100/50",
    rose: "bg-rose-50 text-rose-700 border-rose-100/50",
    blue: "bg-blue-50 text-blue-700 border-blue-100/50",
    amber: "bg-amber-50 text-amber-700 border-amber-100/50",
  };

  const totalGUT = items.reduce((sum, i) => sum + i.pontuacao, 0);

  return (
    <div
      className={cn(
        "rounded-3xl border transition-all flex flex-col shadow-sm",
        themes[cor],
      )}
    >
      <div className="p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-white shadow-sm text-current">
            <Icon size={20} strokeWidth={2.5} />
          </div>
          <h4 className="text-[12px] font-bold uppercase tracking-widest">
            {title}
          </h4>
        </div>
        <button
          onClick={onAdd}
          className="p-2 hover:bg-white/60 rounded-lg transition-colors"
        >
          <Plus size={20} strokeWidth={3} />
        </button>
      </div>

      <div className="px-5 pb-5 flex-1 min-h-[220px]">
        {items.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center opacity-30 border border-dashed border-current/30 rounded-2xl text-center">
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Vazio
            </span>
          </div>
        ) : (
          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-white/70 p-4 rounded-2xl border border-white/40 shadow-sm group hover:bg-white transition-all text-left"
              >
                <div className="flex flex-col">
                  <span className="text-[13px] font-bold text-slate-800 leading-snug">
                    {item.titulo}
                  </span>
                  {item.descricao && (
                    <span className="text-[10px] text-slate-500 font-medium truncate max-w-[180px] mt-0.5">
                      {item.descricao}
                    </span>
                  )}
                </div>
                <div className="text-right flex flex-col items-end">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                    Score
                  </span>
                  <span className="text-[13px] font-black text-current">
                    {item.pontuacao}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="px-5 py-4 bg-white/40 border-t border-white/20 flex justify-between items-center rounded-b-3xl">
        <span className="text-[10px] font-bold opacity-60 uppercase tracking-widest text-left">
          Soma Pontuação
        </span>
        <span className="text-[15px] font-black">
          {totalGUT}{" "}
          <span className="text-[10px] font-bold opacity-60">PTS</span>
        </span>
      </div>
    </div>
  );
};
