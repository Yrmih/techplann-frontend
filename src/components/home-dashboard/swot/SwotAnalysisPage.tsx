"use client";

import React, { useState } from "react";
import { 
  Plus, 
  Pencil, 
  TrendingUp, 
  ShieldAlert, 
  Lightbulb, 
  AlertCircle, 
  LucideIcon, 
  Calendar,
  Zap,
  Crosshair,
  RefreshCw,
  ShieldCheck
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { CustomSelect } from "@/components/ui/custom/CustomSelect";
import { SwotCreateModal } from "./SwotCreateModal";
import { SwotCreateValues } from "@/lib/validators/swot.schema";
import { SWOT_MOCK_DATA } from "@/lib/mock/swot.mock";

interface SwotItem {
  label: string;
  value: number;
}

interface SwotCardProps {
  title: string;
  color: string;
  icon: LucideIcon;
  items: SwotItem[];
  total?: number;
  onAdd: () => void;
  isCruzado?: boolean;
}

export const SwotAnalysisPage = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isCruzada, setIsCruzada] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeSwot, setActiveSwot] = useState<SwotCreateValues | null>(null);

  const selectedProject = "Planejamento Estratégico 2025";

  const handleInit = (data: SwotCreateValues) => {
    setActiveSwot(data);
    setIsInitialized(true);
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-10 p-10 max-w-[1600px] mx-auto min-h-screen bg-[#f8fafc]">
      
      {/* 1. HEADER - TÍTULO E PLANEJAMENTO NA DIREITA */}
      <div className="flex justify-between items-start px-1">
        <div className="text-left">
          <h1 className="text-[32px] font-black text-gray-900 tracking-tight uppercase leading-none">Análise SWOT</h1>
          <div className="h-1 w-12 bg-[#10b981] mt-4 rounded-full" />
        </div>

        <div className="w-full md:w-[320px] text-left">
          <div className="flex items-center gap-2 mb-2 ml-1">
            <Calendar size={14} className="text-gray-400" />
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[1.5px]">Planejamento</label>
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
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[1.5px] mb-2 ml-1">Análise SWOT</label>
          <div className="relative">
            <CustomSelect 
              placeholder="Selecione ou crie..." 
              value={isInitialized ? "active" : ""}
              options={[
                { value: "new", label: "+ Criar Nova Análise" },
                ...(isInitialized ? [{ value: "active", label: activeSwot?.nome || "" }] : [])
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
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[1.5px] mb-2 ml-1">Departamento</label>
          <CustomSelect 
            placeholder="Todos os setores" 
            options={[
              { value: "comercial", label: "Comercial" },
              { value: "ti", label: "T.I / Desenvolvimento" }
            ]} 
            onValueChange={() => {}} 
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!isInitialized ? (
          <div key="empty" className="h-[500px]" />
        ) : (
          <motion.div key="active" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 px-1">
            
            <div className="flex justify-start items-center border-b border-gray-100 pb-6 gap-6">
              <div className="bg-gray-100 p-1.5 rounded-2xl flex gap-1 border border-gray-200">
                <button 
                  onClick={() => setIsCruzada(false)} 
                  className={`px-6 py-2.5 rounded-xl text-[10px] font-black transition-all ${!isCruzada ? 'bg-white text-[#10b981]' : 'text-gray-400'}`}
                >
                  TRADICIONAL
                </button>
                <button 
                  onClick={() => setIsCruzada(true)} 
                  className={`px-6 py-2.5 rounded-xl text-[10px] font-black transition-all ${isCruzada ? 'bg-white text-[#10b981]' : 'text-gray-400'}`}
                >
                  SWOT CRUZADO
                </button>
              </div>
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-[3px]">
                {isCruzada ? "Matriz de Estratégias (Cruzamento)" : "Matriz de Confronto"}
              </h2>
            </div>

            {!isCruzada ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {SWOT_MOCK_DATA.tradicional.map((card, index) => (
                  <SwotCard 
                    key={index} 
                    title={card.title}
                    color={card.color}
                    icon={card.icon}
                    items={card.items}
                    total={card.total}
                    onAdd={() => {}} 
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <SwotCard title="ESTRATÉGIA OFENSIVA (F + O)" color="bg-emerald-500" icon={Zap} items={[{ label: SWOT_MOCK_DATA.cruzada.ofensiva, value: 90 }]} onAdd={() => {}} isCruzado />
                <SwotCard title="ESTRATÉGIA DE CONFRONTO (F + A)" color="bg-amber-500" icon={Crosshair} items={[{ label: SWOT_MOCK_DATA.cruzada.confronto, value: 85 }]} onAdd={() => {}} isCruzado />
                <SwotCard title="ESTRATÉGIA DE REFORÇO (F + O)" color="bg-blue-500" icon={RefreshCw} items={[{ label: SWOT_MOCK_DATA.cruzada.reforco, value: 75 }]} onAdd={() => {}} isCruzado />
                <SwotCard title="ESTRATÉGIA DEFENSIVA (F + A)" color="bg-rose-500" icon={ShieldCheck} items={[{ label: SWOT_MOCK_DATA.cruzada.defensiva, value: 95 }]} onAdd={() => {}} isCruzado />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <SwotCreateModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} onSuccess={handleInit} />
    </div>
  );
};

const SwotCard = ({ title, color, icon: Icon, items, total, onAdd, isCruzado }: SwotCardProps) => (
  <div className="bg-white rounded-[32px] border border-gray-100 flex flex-col h-full text-left transition-all overflow-hidden">
    <div className={`p-6 ${color} text-white flex items-center justify-between`}>
      <span className="font-black text-[11px] tracking-[1.5px] uppercase flex items-center gap-3">
        <Icon size={18} strokeWidth={2.5} /> {title}
      </span>
      <button onClick={onAdd} className="bg-white/20 hover:bg-white/30 p-2 rounded-xl transition-all">
        <Plus size={22} />
      </button>
    </div>
    <div className="p-10 space-y-6 flex-1">
      {items.map((item, i) => (
        <div key={i} className="flex flex-col gap-2 border-b border-gray-50 pb-5 last:border-0">
          <div className="flex justify-between items-start gap-4">
            <span className="text-sm font-bold leading-relaxed text-gray-700">
              {item.label}
            </span>
            <span className="bg-gray-50 px-3 py-1 rounded-lg text-[10px] font-black text-[#10b981] whitespace-nowrap">
              {item.value}%
            </span>
          </div>
        </div>
      ))}
    </div>
    {total !== undefined && (
      <div className="p-6 bg-gray-50/50 border-t border-gray-100 flex justify-between text-[11px] font-bold uppercase text-gray-400 tracking-widest">
        <span>Impacto Estratégico:</span>
        <span className="text-gray-900 font-bold">{total} pts</span>
      </div>
    )}
  </div>
);