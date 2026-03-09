"use client";

import React, { useState } from "react";
import {
  Plus,
  Pencil,
  TrendingUp,
  LucideIcon,
  Calendar,
  Zap,
  Crosshair,
  RefreshCw,
  ShieldCheck,
  Shield,
  AlertTriangle,
  FileText,
  Swords,
  Lightbulb,
  Target,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { CustomSelect } from "@/components/ui/custom/CustomSelect";
import { SwotCreateModal } from "./components/modal/SwotCreateModal";
import { SwotItemModal } from "./components/modal/SwotItemModal";

// Novos componentes separados (Certifique-se de que os nomes dos arquivos batem)
import { SwotResumo } from "./components/charts/SwotResumo";
import { SwotRadarChart } from "./components/charts/SwotRadarChart";
import { SwotComparativo } from "./components/charts/SwotComparativo";

import { SwotCreateValues } from "@/lib/validators/swot.schema";
import { cn } from "@/lib/utils/utils";

type SwotTipo = "Força" | "Fraqueza" | "Oportunidade" | "Ameaça";

interface SwotItem {
  label: string;
  value: number;
}

interface SwotCardProps {
  title: string;
  corKey: "emerald" | "rose" | "blue" | "amber";
  icon: LucideIcon;
  items: SwotItem[];
  total?: number;
  onAdd: () => void;
  emptyText?: string;
  emptyActionText?: string;
}

export const SwotAnalysisPage = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isCruzada, setIsCruzada] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeSwot, setActiveSwot] = useState<SwotCreateValues | null>(null);

  const [showItemModal, setShowItemModal] = useState(false);
  const [currentTipo, setCurrentTipo] = useState<SwotTipo>("Força");

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

  // Dados para o componente Radar (calculados ou mockados)
  const radarData = [
    { subject: "FORÇAS", A: 0, fullMark: 100 },
    { subject: "FRAQUEZAS", A: 0, fullMark: 100 },
    { subject: "OPORTUNIDADES", A: 0, fullMark: 100 },
    { subject: "AMEAÇAS", A: 0, fullMark: 100 },
  ];

  return (
    <div className="space-y-10 p-10 max-w-[1600px] mx-auto min-h-screen bg-[#f8fafc]">
      {/* 1. HEADER INTEGRADO */}
      <div className="flex justify-between items-start px-1">
        <div className="text-left">
          <h1 className="text-[32px] font-black text-gray-900 tracking-tight uppercase leading-none">
            Análise SWOT
          </h1>
          <div className="h-1 w-12 bg-[#10b981] mt-4 rounded-full" />
        </div>

        <div className="w-full md:w-[320px] text-left">
          <div className="flex items-center gap-2 mb-2 ml-1">
            <Calendar size={14} className="text-gray-400" />
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[1.5px]">
              Planejamento
            </label>
          </div>
          <CustomSelect
            placeholder="Selecione o projeto..."
            value="p1"
            options={[{ value: "p1", label: selectedProject }]}
            onValueChange={() => {}}
          />
        </div>
      </div>

      {/* 2. BARRA DE FERRAMENTAS */}
      <div className="flex flex-col md:flex-row items-end gap-6 px-1">
        <div className="w-full md:w-[320px] text-left relative">
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[1.5px] mb-2 ml-1">
            Análise SWOT
          </label>
          <div className="relative">
            <CustomSelect
              placeholder="Selecione ou crie..."
              value={isInitialized ? "active" : ""}
              options={[
                { value: "new", label: "+ Criar Nova Análise" },
                ...(isInitialized
                  ? [{ value: "active", label: activeSwot?.nome || "" }]
                  : []),
              ]}
              onValueChange={(val) => val === "new" && setShowCreateModal(true)}
            />
            {isInitialized && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#10b981] transition-colors"
              >
                <Pencil size={14} strokeWidth={2} />
              </button>
            )}
          </div>
        </div>

        <div className="w-full md:w-[320px] text-left">
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[1.5px] mb-2 ml-1">
            Departamento
          </label>
          <CustomSelect
            placeholder="Todos os setores"
            options={[
              { value: "comercial", label: "Comercial" },
              { value: "ti", label: "T.I / Desenvolvimento" },
            ]}
            onValueChange={() => {}}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!isInitialized ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-[400px] flex items-center justify-center border-2 border-dashed border-slate-200 rounded-md bg-white/50"
          >
            <div className="text-center space-y-4 opacity-40">
              <FileText size={64} className="mx-auto text-slate-400" />
              <p className="font-black uppercase tracking-widest text-[10px] text-slate-500">
                Crie ou selecione uma análise para começar
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="active"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 px-1"
          >
            {/* TABS DE SELEÇÃO */}
            <div className="flex justify-start items-center border-b border-gray-100 pb-6 gap-6">
              <div className="bg-gray-100 p-1 rounded-md flex gap-1 border border-gray-200">
                <button
                  onClick={() => setIsCruzada(false)}
                  className={cn(
                    "px-6 py-2 rounded-md text-[10px] font-black transition-all",
                    !isCruzada
                      ? "bg-white text-[#10b981] shadow-sm"
                      : "text-gray-400",
                  )}
                >
                  TRADICIONAL
                </button>
                <button
                  onClick={() => setIsCruzada(true)}
                  className={cn(
                    "px-6 py-2 rounded-md text-[10px] font-black transition-all",
                    isCruzada
                      ? "bg-white text-[#10b981] shadow-sm"
                      : "text-gray-400",
                  )}
                >
                  SWOT CRUZADO
                </button>
              </div>
              <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[3px]">
                {isCruzada ? "Matriz de Estratégias" : "Matriz de Confronto"}
              </h2>
            </div>

            {/* GRID DE CARDS SWOT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {!isCruzada ? (
                <>
                  <SwotCard
                    title="Forças"
                    corKey="emerald"
                    icon={Shield}
                    items={[]}
                    onAdd={() => openAddItem("Força")}
                  />
                  <SwotCard
                    title="Fraquezas"
                    corKey="rose"
                    icon={AlertTriangle}
                    items={[]}
                    onAdd={() => openAddItem("Fraqueza")}
                  />
                  <SwotCard
                    title="Oportunidades"
                    corKey="blue"
                    icon={TrendingUp}
                    items={[]}
                    onAdd={() => openAddItem("Oportunidade")}
                  />
                  <SwotCard
                    title="Ameaças"
                    corKey="amber"
                    icon={Zap}
                    items={[]}
                    onAdd={() => openAddItem("Ameaça")}
                  />
                </>
              ) : (
                <>
                  <SwotCard
                    title="FO – Ofensivas"
                    corKey="emerald"
                    icon={Swords}
                    items={[]}
                    onAdd={() => {}}
                  />
                  <SwotCard
                    title="FA – Defensivas"
                    corKey="blue"
                    icon={ShieldCheck}
                    items={[]}
                    onAdd={() => {}}
                  />
                  <SwotCard
                    title="WO – Melhoria"
                    corKey="amber"
                    icon={Lightbulb}
                    items={[]}
                    onAdd={() => {}}
                  />
                  <SwotCard
                    title="WT – Sobrevivência"
                    corKey="rose"
                    icon={Target}
                    items={[]}
                    onAdd={() => {}}
                  />
                </>
              )}
            </div>

            {/* SEÇÃO DE DASHBOARDS (COM COMPONENTES SEPARADOS) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-gray-100">
              {/* 1. RESUMO SWOT */}
              <SwotResumo
                data={{
                  forcas: 0,
                  fraquezas: 0,
                  oportunidades: 0,
                  ameacas: 0,
                }}
              />

              {/* 2. GRÁFICO RADAR SWOT */}
              <SwotRadarChart data={radarData} />

              {/* 3. COMPARATIVO DE IMPACTO */}
              <SwotComparativo interno={0} externo={0} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
    </div>
  );
};

/* COMPONENTE DE CARD SWOT (Sólido e Fiel ao MVP) */
const SwotCard = ({
  title,
  corKey,
  icon: Icon,
  items,
  total,
  onAdd,
}: SwotCardProps) => {
  const styles = {
    emerald: {
      header: "bg-[#10b981]",
      body: "bg-[#10b981]/5",
      text: "text-emerald-600",
      stroke: "#10b981",
      border: "border-[#10b981]",
    },
    rose: {
      header: "bg-[#f43f5e]",
      body: "bg-[#f43f5e]/5",
      text: "text-rose-600",
      stroke: "#f43f5e",
      border: "border-[#f43f5e]",
    },
    blue: {
      header: "bg-[#3b82f6]",
      body: "bg-[#3b82f6]/5",
      text: "text-blue-600",
      stroke: "#3b82f6",
      border: "border-[#3b82f6]",
    },
    amber: {
      header: "bg-[#f59e0b]",
      body: "bg-[#f59e0b]/5",
      text: "text-amber-600",
      stroke: "#f59e0b",
      border: "border-[#f59e0b]",
    },
  };

  const current = styles[corKey];

  return (
    <div
      className={cn(
        "rounded-md border-2 flex flex-col h-full text-left transition-all overflow-hidden shadow-sm",
        current.border,
        current.body,
      )}
    >
      <div
        className={cn(
          "p-5 text-white flex items-center justify-between shadow-sm",
          current.header,
        )}
      >
        <span className="font-black text-[11px] tracking-[1.5px] uppercase flex items-center gap-3">
          <Icon size={18} strokeWidth={3} /> {title}
        </span>
        <button
          onClick={onAdd}
          className="bg-white/20 hover:bg-white/30 p-2 rounded-md transition-all"
        >
          <Plus size={20} strokeWidth={3} />
        </button>
      </div>

      <div className="p-8 space-y-5 flex-1 min-h-[220px]">
        {items.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center gap-3 py-10 rounded-md bg-white/40">
            <Icon
              size={48}
              strokeWidth={2}
              stroke={current.stroke}
              fill="none"
              className="opacity-100"
            />
            <p
              className={cn(
                "text-[10px] font-black uppercase tracking-widest text-center",
                current.text,
              )}
            >
              NENHUM ITEM ADICIONADO
            </p>
          </div>
        ) : (
          items.map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-center border-b border-gray-200/50 pb-4 last:border-0 last:pb-0"
            >
              <span className={cn("text-sm font-black", current.text)}>
                {item.label}
              </span>
              <span
                className={cn(
                  "px-3 py-1 rounded-md text-[10px] font-black text-white shadow-sm",
                  current.header,
                )}
              >
                {item.value}%
              </span>
            </div>
          ))
        )}
      </div>

      <div className="p-5 bg-white/60 border-t border-gray-200/50 flex justify-between text-[10px] font-black uppercase text-gray-400 tracking-widest">
        <span>Impacto Estratégico:</span>
        <span className={cn("font-black", current.text)}>{total || 0} pts</span>
      </div>
    </div>
  );
};
