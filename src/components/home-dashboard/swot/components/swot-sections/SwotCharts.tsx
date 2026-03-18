"use client";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
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
  // Mapeamento para o Radar
  const radarData = [
    { subject: "Forças", A: totals.forca },
    { subject: "Fraquezas", A: totals.fraqueza },
    { subject: "Oportunidades", A: totals.oportunidade },
    { subject: "Ameaças", A: totals.ameaca },
  ];

  // Mapeamento para o Gráfico de Barras
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
      {/* 1. RESUMO SWOT */}
      <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm text-left h-full flex flex-col">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 size={18} className="text-emerald-500" />
          <h3 className="font-bold text-gray-800 uppercase text-xs tracking-wider">
            Resumo SWOT
          </h3>
        </div>

        <div className="space-y-3 flex-1">
          {[
            {
              label: "Forças",
              val: totals.forca,
              icon: Shield,
              bg: "bg-emerald-50/50",
              txt: "text-emerald-600",
              iconCol: "text-emerald-500",
            },
            {
              label: "Fraquezas",
              val: totals.fraqueza,
              icon: AlertTriangle,
              bg: "bg-rose-50/50",
              txt: "text-rose-600",
              iconCol: "text-rose-500",
            },
            {
              label: "Oportunidades",
              val: totals.oportunidade,
              icon: TrendingUp,
              bg: "bg-blue-50/50",
              txt: "text-blue-600",
              iconCol: "text-blue-500",
            },
            {
              label: "Ameaças",
              val: totals.ameaca,
              icon: Target,
              bg: "bg-amber-50/50",
              txt: "text-amber-600",
              iconCol: "text-amber-500",
            },
          ].map((item) => (
            <div
              key={item.label}
              className={cn(
                "flex items-center justify-between p-4 rounded-xl border border-transparent transition-all",
                item.bg,
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} className={item.iconCol} />
                <span className="text-[13px] font-semibold text-gray-700">
                  {item.label}
                </span>
              </div>
              <span className={cn("text-lg font-bold", item.txt)}>
                {item.val}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between text-gray-400">
          <span className="text-[11px] font-medium uppercase tracking-wider">
            Total Geral:
          </span>
          <span className="text-xl font-bold text-emerald-500">
            {totalGeral}
          </span>
        </div>
      </div>

      {/* 2. GRÁFICO RADAR */}
      <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm text-left h-full flex flex-col">
        <h3 className="font-bold text-gray-800 mb-6 uppercase text-xs tracking-wider">
          Gráfico Radar
        </h3>
        <div className="flex-1 min-h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
              <PolarGrid stroke="#e2e8f0" strokeDasharray="4 4" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: "#4b5563", fontSize: 11, fontWeight: 600 }}
              />
              <PolarRadiusAxis
                angle={45}
                domain={[0, "auto"]}
                tick={{ fill: "#9ca3af", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <Radar
                name="SWOT"
                dataKey="A"
                stroke="#9ca3af"
                strokeWidth={1.5}
                fill="#10b981"
                fillOpacity={0.08}
                dot={{ r: 4, fill: "#10b981", strokeWidth: 2, stroke: "#fff" }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. COMPARATIVO */}
      <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm text-left h-full flex flex-col">
        <h3 className="font-bold text-gray-800 mb-6 uppercase text-xs tracking-wider">
          Comparativo
        </h3>
        <div className="flex-1 min-h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={barData}
              layout="vertical"
              margin={{ left: -10, right: 20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={true}
                vertical={false}
                stroke="#f1f5f9"
              />
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="category"
                tick={{ fill: "#4b5563", fontSize: 11, fontWeight: 600 }}
                width={100}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                cursor={{ fill: "#f8fafc" }}
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                {barData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    fillOpacity={0.9}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
