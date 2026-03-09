"use client";

import {
  BarChart3,
  Shield,
  AlertTriangle,
  TrendingUp,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils/utils";

interface SwotResumoProps {
  data: {
    forcas: number;
    fraquezas: number;
    oportunidades: number;
    ameacas: number;
  };
}

export const SwotResumo = ({ data }: SwotResumoProps) => {
  const stats = [
    {
      label: "FORÇAS",
      val: data.forcas,
      color: "text-emerald-500",
      bg: "bg-emerald-50/50",
      icon: Shield,
    },
    {
      label: "FRAQUEZAS",
      val: data.fraquezas,
      color: "text-rose-500",
      bg: "bg-rose-50/50",
      icon: AlertTriangle,
    },
    {
      label: "OPORTUNIDADES",
      val: data.oportunidades,
      color: "text-blue-500",
      bg: "bg-blue-50/50",
      icon: TrendingUp,
    },
    {
      label: "AMEAÇAS",
      val: data.ameacas,
      color: "text-amber-500",
      bg: "bg-amber-50/50",
      icon: Zap,
    },
  ];

  return (
    <div className="bg-white p-8 rounded-md border border-gray-100 shadow-sm text-left flex flex-col justify-between h-full">
      <div>
        <h3 className="font-black text-gray-900 mb-8 flex items-center gap-2 uppercase text-[10px] tracking-[2px]">
          <BarChart3 size={16} className="text-[#10b981]" /> Resumo SWOT
        </h3>
        <div className="space-y-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={cn(
                "flex justify-between items-center p-4 rounded-md",
                stat.bg,
              )}
            >
              <span
                className={cn(
                  "text-[11px] font-black uppercase tracking-tight flex items-center gap-2",
                  stat.color,
                )}
              >
                <stat.icon size={14} strokeWidth={3} /> {stat.label}
              </span>
              <span className={cn("text-xl font-black", stat.color)}>
                {stat.val}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="pt-6 mt-auto border-t border-gray-50 flex justify-between items-center">
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
          Total Geral:
        </span>
        <span className="text-xl font-black text-[#10b981]">
          {data.forcas + data.fraquezas + data.oportunidades + data.ameacas}
        </span>
      </div>
    </div>
  );
};
