"use client";

import React, { useState } from "react";
import {
  Plus,
  TrendingUp,
  Zap,
  ShieldCheck,
  Shield,
  AlertTriangle,
  FileText,
  Swords,
  Lightbulb,
  Target,
  Filter,
  FileBarChart,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { CustomSelect } from "@/components/ui/custom/CustomSelect";
import { SwotCreateModal } from "./components/modal/SwotCreateModal";
import { SwotItemModal } from "./components/modal/SwotItemModal";

import { SwotResumo } from "./components/charts/SwotResumo";
import { SwotRadarChart } from "./components/charts/SwotRadarChart";
import { SwotComparativo } from "./components/charts/SwotComparativo";

import { SwotCreateValues } from "@/lib/validators/swot.schema";
import { cn } from "@/lib/utils/utils";

// 1. Definição de Tipos Estritos alinhados à lógica Lovable (Regras de Negócio)
type SwotTipo = "Força" | "Fraqueza" | "Oportunidade" | "Ameaça";

export interface SwotItem {
  id: string;
  swot_analysis_id: string;
  tipo: "forca" | "fraqueza" | "oportunidade" | "ameaca";
  titulo: string;
  descricao?: string;
  departamento_id?: string;
  importancia: number; // Peso 1 a 5
  intensidade: number; // Peso 1 a 5
  tendencia: number; // Peso 1 a 5
  pontuacao: number; // Cálculo GUT (Importância * Intensidade * Tendência)
}

interface SwotCardProps {
  title: string;
  cor: "emerald" | "rose" | "blue" | "amber";
  icon: React.ElementType;
  onAdd: () => void;
  items: SwotItem[];
}

export const SwotAnalysisPage = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isCruzada, setIsCruzada] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeSwot, setActiveSwot] = useState<SwotCreateValues | null>(null);

  const [showItemModal, setShowItemModal] = useState(false);
  const [currentTipo, setCurrentTipo] = useState<SwotTipo>("Força");
  const [filterDept, setFilterDept] = useState("all");

  const selectedProject = "Planejamento Estratégico 2025";

  const handleInit = (data: SwotCreateValues) => {
    setActiveSwot(data);
    setIsInitialized(true);
    setShowCreateModal(false);
  };

  const openAddItem = (tipo: SwotTipo) => {
    setCurrentTipo(tipo);
    setShowItemModal(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 p-8 max-w-[1600px] mx-auto font-sans"
    >
      {/* 1. HEADER DA PÁGINA (ESTILO LOVABLE) */}
      <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 text-left">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Análise SWOT
          </h1>
          <p className="text-slate-500 font-medium text-sm">
            Forças, Fraquezas, Oportunidades e Ameaças
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-[320px]">
            <CustomSelect
              placeholder="Selecione o planejamento..."
              value="p1"
              options={[{ value: "p1", label: selectedProject }]}
              onValueChange={() => {}}
            />
          </div>
        </div>
      </header>

      {/* 2. BARRA DE FERRAMENTAS (SWOT SELECTOR + FILTRO + RELATÓRIO) */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="w-[280px]">
          <CustomSelect
            placeholder="Selecione ou crie uma análise..."
            value={isInitialized ? "active" : ""}
            options={[
              { value: "new", label: "+ Criar Nova Análise" },
              ...(isInitialized
                ? [{ value: "active", label: activeSwot?.nome || "" }]
                : []),
            ]}
            onValueChange={(val) => val === "new" && setShowCreateModal(true)}
          />
        </div>

        {/* FILTRO DE DEPARTAMENTO CONFORME O CÓDIGO DO LOVABLE */}
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 h-10 shadow-sm">
          <Filter className="h-4 w-4 text-slate-400" />
          <select
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
            className="text-sm font-medium text-slate-700 bg-transparent outline-none pr-2"
          >
            <option value="all">Todos os departamentos</option>
            <option value="comercial">Comercial</option>
            <option value="ti">T.I / Desenvolvimento</option>
          </select>
        </div>

        {isInitialized && (
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm h-10">
            <FileBarChart size={18} className="text-emerald-500" /> Relatório
            SWOT
          </button>
        )}
      </div>

      {/* 3. SWITCH DE TABS (TRADICIONAL VS CRUZADA) */}
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

      {/* 4. CARD BRANCO PRINCIPAL (CONTAINER DE DADOS) */}
      <div className="bg-white border border-gray-100 rounded-[32px] shadow-sm overflow-hidden min-h-[600px]">
        <div className="p-8">
          <AnimatePresence mode="wait">
            {!isInitialized ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-24 flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-[32px] bg-slate-50/30"
              >
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500 mb-4">
                  <FileText size={32} strokeWidth={1.5} />
                </div>
                <p className="text-sm font-medium text-slate-400 mb-6 max-w-xs text-center">
                  Crie uma nova análise SWOT para começar a identificar seus
                  fatores críticos.
                </p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="text-emerald-500 font-bold text-sm hover:underline"
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
                {/* QUADRANTES */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {!isCruzada ? (
                    <>
                      <SwotCard
                        title="Forças"
                        cor="emerald"
                        icon={Shield}
                        onAdd={() => openAddItem("Força")}
                        items={[]}
                      />
                      <SwotCard
                        title="Fraquezas"
                        cor="rose"
                        icon={AlertTriangle}
                        onAdd={() => openAddItem("Fraqueza")}
                        items={[]}
                      />
                      <SwotCard
                        title="Oportunidades"
                        cor="blue"
                        icon={TrendingUp}
                        onAdd={() => openAddItem("Oportunidade")}
                        items={[]}
                      />
                      <SwotCard
                        title="Ameaças"
                        cor="amber"
                        icon={Zap}
                        onAdd={() => openAddItem("Ameaça")}
                        items={[]}
                      />
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
                </div>

                {/* GRÁFICOS (DASHBOARD) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-10 border-t border-slate-100">
                  <SwotResumo
                    data={{
                      forcas: 0,
                      fraquezas: 0,
                      oportunidades: 0,
                      ameacas: 0,
                    }}
                  />
                  <SwotRadarChart data={[]} />
                  <SwotComparativo data={[]} />
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
        tipo={currentTipo}
      />
    </motion.div>
  );
};

const SwotCard = ({ title, cor, icon: Icon, onAdd, items }: SwotCardProps) => {
  const themes = {
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    rose: "bg-rose-50 text-rose-600 border-rose-100",
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
  };

  return (
    <div
      className={cn(
        "rounded-2xl border transition-all overflow-hidden flex flex-col",
        themes[cor],
      )}
    >
      <div className="p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-white/60 shadow-sm text-current">
            <Icon size={20} strokeWidth={2.5} />
          </div>
          <h4 className="text-[13px] font-bold uppercase tracking-wider">
            {title}
          </h4>
        </div>
        <button
          onClick={onAdd}
          className="p-2 hover:bg-white/40 rounded-lg transition-colors text-current"
        >
          <Plus size={20} strokeWidth={3} />
        </button>
      </div>

      <div className="px-5 pb-5 flex-1 min-h-[180px]">
        {items.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center opacity-40 border border-dashed border-current/20 rounded-xl">
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Nenhum fator listado
            </span>
          </div>
        ) : (
          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-white/40 p-3 rounded-xl border border-current/5"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{item.titulo}</span>
                  {item.descricao && (
                    <span className="text-[10px] opacity-60 truncate max-w-[200px]">
                      {item.descricao}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold opacity-40">
                    GUT: {item.pontuacao}
                  </span>
                  <span className="text-xs font-bold px-2 py-1 rounded-lg bg-white/60">
                    {item.importancia}/5
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="px-5 py-3 bg-white/30 border-t border-current/5 flex justify-between items-center">
        <span className="text-[10px] font-medium opacity-60 uppercase tracking-widest">
          Pontuação Total (GUT)
        </span>
        <span className="text-xs font-bold">0 pts</span>
      </div>
    </div>
  );
};
