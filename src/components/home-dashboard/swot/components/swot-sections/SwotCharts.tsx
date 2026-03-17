"use client";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import {
  Shield,
  AlertTriangle,
  TrendingUp,
  Target,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils/utils";

interface SwotChartsProps {
  totals: {
    forca: number;
    fraqueza: number;
    oportunidade: number;
    ameaca: number;
  };
}

const COLORS = {
  forca: "#10b981", // emerald-500
  fraqueza: "#f43f5e", // rose-500
  oportunidade: "#3b82f6", // blue-500
  ameaca: "#f59e0b", // amber-500
};

export const SwotCharts = ({ totals }: SwotChartsProps) => {
  const radarData = [
    { subject: "Forças", value: totals.forca },
    { subject: "Fraquezas", value: totals.fraqueza },
    { subject: "Oportunidades", value: totals.oportunidade },
    { subject: "Ameaças", value: totals.ameaca },
  ];

  const barData = [
    { category: "Forças", value: totals.forca, color: COLORS.forca },
    { category: "Fraquezas", value: totals.fraqueza, color: COLORS.fraqueza },
    {
      category: "Oportunidades",
      value: totals.oportunidade,
      color: COLORS.oportunidade,
    },
    { category: "Ameaças", value: totals.ameaca, color: COLORS.ameaca },
  ];

  const totalGeral =
    totals.forca + totals.fraqueza + totals.oportunidade + totals.ameaca;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-10 border-t border-slate-100">
      {/* 1. CARD RESUMO QUANTITATIVO */}
      <div className="bg-white border border-slate-100 rounded-[32px] p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8 text-left">
          <div className="p-2.5 rounded-xl bg-slate-50 text-slate-900 shadow-sm">
            <BarChart3 size={20} strokeWidth={2.5} />
          </div>
          <h3 className="text-[13px] font-black uppercase tracking-widest text-slate-800">
            Resumo Estratégico
          </h3>
        </div>

        <div className="space-y-3">
          {[
            {
              label: "Forças",
              val: totals.forca,
              icon: Shield,
              bg: "bg-emerald-50",
              txt: "text-emerald-600",
              iconCol: "text-emerald-500",
            },
            {
              label: "Fraquezas",
              val: totals.fraqueza,
              icon: AlertTriangle,
              bg: "bg-rose-50",
              txt: "text-rose-600",
              iconCol: "text-rose-500",
            },
            {
              label: "Oportunidades",
              val: totals.oportunidade,
              icon: TrendingUp,
              bg: "bg-blue-50",
              txt: "text-blue-600",
              iconCol: "text-blue-500",
            },
            {
              label: "Ameaças",
              val: totals.ameaca,
              icon: Target,
              bg: "bg-amber-50",
              txt: "text-amber-600",
              iconCol: "text-amber-500",
            },
          ].map((item) => (
            <div
              key={item.label}
              className={cn(
                "flex items-center justify-between p-4 rounded-2xl transition-all border border-transparent hover:border-white shadow-sm",
                item.bg,
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} className={item.iconCol} />
                <span className="text-[12px] font-bold text-slate-700 uppercase tracking-tight">
                  {item.label}
                </span>
              </div>
              <span className={cn("text-xl font-black", item.txt)}>
                {item.val}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Total Acumulado:
          </span>
          <span className="text-2xl font-black text-slate-900">
            {totalGeral} <span className="text-[10px] text-slate-400">PTS</span>
          </span>
        </div>
      </div>

      {/* 2. CARD GRÁFICO RADAR */}
      <div className="bg-white border border-slate-100 rounded-[32px] p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8 text-left">
          <div className="p-2.5 rounded-xl bg-slate-50 text-slate-900 shadow-sm">
            <Target size={20} strokeWidth={2.5} />
          </div>
          <h3 className="text-[13px] font-black uppercase tracking-widest text-slate-800">
            Equilíbrio da Matriz
          </h3>
        </div>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: "#64748b", fontSize: 10, fontWeight: 800 }}
              />
              <Radar
                name="Score"
                dataKey="value"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.15}
                strokeWidth={3}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. CARD COMPARATIVO DE IMPACTO */}
      <div className="bg-white border border-slate-100 rounded-[32px] p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8 text-left">
          <div className="p-2.5 rounded-xl bg-slate-50 text-slate-900 shadow-sm">
            <TrendingUp size={20} strokeWidth={2.5} />
          </div>
          <h3 className="text-[13px] font-black uppercase tracking-widest text-slate-800">
            Comparativo de Impacto
          </h3>
        </div>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} layout="vertical" margin={{ left: -20 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={false}
                stroke="#f1f5f9"
              />
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="category"
                tick={{ fill: "#64748b", fontSize: 10, fontWeight: 700 }}
                width={80}
              />
              <Tooltip
                cursor={{ fill: "#f8fafc" }}
                contentStyle={{
                  borderRadius: "16px",
                  border: "none",
                  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                  fontWeight: "bold",
                }}
              />
              <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={32}>
                {barData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
