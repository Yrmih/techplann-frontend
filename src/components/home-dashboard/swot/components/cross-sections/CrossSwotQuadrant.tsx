"use client";

import React from "react";
import { CrossStrategy, CrossStrategyType } from "@/hooks/useSwotCrossStrategies";
import { 
  Plus, Pencil, Trash2, Loader2, Swords, 
  ShieldCheck, Lightbulb, LifeBuoy, Calendar, User 
} from "lucide-react";
import { cn } from "@/lib/utils/utils";

const tipoConfig: Record<CrossStrategyType, {
  label: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  border: string;
  lightBg: string;
}> = {
  FO: {
    label: "Ofensivas (FO)",
    subtitle: "Forças × Oportunidades",
    icon: Swords,
    color: "text-emerald-600",
    bg: "bg-emerald-500",
    border: "border-emerald-100",
    lightBg: "bg-emerald-50/50",
  },
  FA: {
    label: "Confronto (FA)",
    subtitle: "Forças × Ameaças",
    icon: ShieldCheck,
    color: "text-blue-600",
    bg: "bg-blue-500",
    border: "border-blue-100",
    lightBg: "bg-blue-50/50",
  },
  WO: {
    label: "Reforço (WO)",
    subtitle: "Fraquezas × Oportunidades",
    icon: Lightbulb,
    color: "text-amber-600",
    bg: "bg-amber-500",
    border: "border-amber-100",
    lightBg: "bg-amber-50/50",
  },
  WT: {
    label: "Defensivas (WT)",
    subtitle: "Fraquezas × Ameaças",
    icon: LifeBuoy,
    color: "text-rose-600",
    bg: "bg-rose-500",
    border: "border-rose-100",
    lightBg: "bg-rose-50/50",
  },
};

const prioridadeConfig: Record<string, string> = {
  baixa: "bg-slate-100 text-slate-600 border-slate-200",
  media: "bg-amber-50 text-amber-700 border-amber-100",
  alta: "bg-rose-50 text-rose-700 border-rose-100",
};

interface CrossSwotQuadrantProps {
  tipo: CrossStrategyType;
  strategies: CrossStrategy[];
  onAdd: () => void;
  onEdit: (strategy: CrossStrategy) => void;
  onDelete: (strategy: CrossStrategy) => void;
  isLoading?: boolean;
}

export const CrossSwotQuadrant = ({
  tipo,
  strategies,
  onAdd,
  onEdit,
  onDelete,
  isLoading,
}: CrossSwotQuadrantProps) => {
  const config = tipoConfig[tipo];
  const Icon = config.icon;

  return (
    <div className={cn("flex flex-col bg-white rounded-[32px] border-2 overflow-hidden shadow-sm transition-all hover:shadow-md", config.border)}>
      {/* HEADER DO QUADRANTE */}
      <div className={cn("px-6 py-5 flex items-center justify-between border-b", config.border, config.lightBg)}>
        <div className="flex items-center gap-4 text-left">
          <div className={cn("p-2.5 rounded-xl text-white shadow-lg", config.bg)}>
            <Icon size={20} strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="text-[13px] font-black uppercase tracking-widest text-slate-800 leading-none">
              {config.label}
            </h3>
            <p className={cn("text-[10px] font-bold uppercase tracking-wider mt-1.5 opacity-70", config.color)}>
              {config.subtitle}
            </p>
          </div>
        </div>
        <button
          onClick={onAdd}
          className={cn("p-2 rounded-xl bg-white border shadow-sm hover:scale-105 transition-all", config.border, config.color)}
        >
          <Plus size={18} strokeWidth={3} />
        </button>
      </div>

      {/* LISTA DE ESTRATÉGIAS */}
      <div className="p-5 flex-1 min-h-[300px] max-h-[500px] overflow-y-auto custom-scrollbar space-y-4">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <Loader2 className="animate-spin text-slate-300" size={32} />
          </div>
        ) : strategies.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-40 py-10">
            <Icon size={40} className="mb-3 text-slate-300" />
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Nenhuma Estratégia
            </p>
          </div>
        ) : (
          strategies.map((s) => (
            <div 
              key={s.id} 
              className="group relative bg-slate-50 border border-slate-100 rounded-[24px] p-5 transition-all hover:bg-white hover:border-slate-200 hover:shadow-lg hover:shadow-slate-100"
            >
              <div className="flex justify-between items-start gap-4 mb-3">
                <div className="text-left space-y-1">
                  <h4 className="text-[14px] font-black text-slate-800 leading-tight">
                    {s.titulo}
                  </h4>
                  {s.descricao && (
                    <p className="text-[11px] font-medium text-slate-500 line-clamp-2 italic">
                      {s.descricao}
                    </p>
                  )}
                </div>
                
                {/* AÇÕES FLUTUANTES (STYLE ELITE) */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => onEdit(s)}
                    className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-900 transition-colors"
                  >
                    <Pencil size={14} />
                  </button>
                  <button 
                    onClick={() => onDelete(s)}
                    className="p-1.5 hover:bg-rose-50 rounded-lg text-slate-400 hover:text-rose-600 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {/* METADADOS E PONTUAÇÃO */}
              <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100">
                <span className={cn("px-2.5 py-1 rounded-full text-[9px] font-black uppercase border tracking-widest", prioridadeConfig[s.prioridade])}>
                  {s.prioridade}
                </span>
                
                <div className="flex items-center gap-3 ml-auto">
                  <div className="flex items-center gap-1 text-slate-400">
                    <span className="text-[9px] font-black uppercase">IMP:</span>
                    <span className="text-[11px] font-black text-slate-700">{s.impacto}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400">
                    <span className="text-[9px] font-black uppercase">ESF:</span>
                    <span className="text-[11px] font-black text-slate-700">{s.esforco}</span>
                  </div>
                </div>
              </div>

              {/* RESPONSÁVEL E PRAZO */}
              {(s.responsavel || s.prazo) && (
                <div className="mt-3 flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase">
                  {s.responsavel && (
                    <span className="flex items-center gap-1">
                      <User size={12} /> {s.responsavel}
                    </span>
                  )}
                  {s.prazo && (
                    <span className="flex items-center gap-1">
                      <Calendar size={12} /> {new Date(s.prazo).toLocaleDateString('pt-BR')}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};