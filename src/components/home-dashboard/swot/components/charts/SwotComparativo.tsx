"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { cn } from "@/lib/utils/utils";

export interface SwotComparativoData {
  category: string;
  value: number;
}

interface SwotComparativoProps {
  data?: SwotComparativoData[];
}

// Mapeamento de cores semânticas idêntico aos cards SWOT
const categoryStyles: Record<
  string,
  { fill: string; border: string; text: string }
> = {
  Forças: {
    fill: "#10b981",
    border: "border-emerald-200",
    text: "text-emerald-600",
  },
  Fraquezas: {
    fill: "#f43f5e",
    border: "border-rose-200",
    text: "text-rose-600",
  },
  Oportunidades: {
    fill: "#3b82f6",
    border: "border-blue-200",
    text: "text-blue-600",
  },
  Ameaças: {
    fill: "#f59e0b",
    border: "border-amber-200",
    text: "text-amber-600",
  },
};

export const SwotComparativo = ({ data = [] }: SwotComparativoProps) => {
  const defaultData = [
    { category: "Forças", value: 0 },
    { category: "Fraquezas", value: 0 },
    { category: "Oportunidades", value: 0 },
    { category: "Ameaças", value: 0 },
  ];

  const chartData = data.length > 0 ? data : defaultData;

  return (
    <div className="bg-white p-8 rounded-md border border-gray-100 shadow-sm text-left h-full flex flex-col">
      <h3 className="font-black text-gray-900 mb-8 uppercase text-xs tracking-wider">
        Comparativo
      </h3>

      <div className="flex-1 min-h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            barSize={32}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#d1d5db"
            />

            <XAxis
              type="number"
              domain={[0, 4]}
              tickCount={5}
              axisLine={{ stroke: "#374151", strokeWidth: 1 }}
              tick={{ fill: "#9ca3af", fontSize: 10 }}
            />

            <YAxis
              type="category"
              dataKey="category"
              axisLine={{ stroke: "#374151", strokeWidth: 1 }}
              tick={{ fill: "#374151", fontSize: 11, fontWeight: 700 }}
              width={100}
            />

            {/* Tooltip Dinâmico com Cores Semânticas */}
            <Tooltip
              cursor={{ fill: "#f1f5f9", opacity: 0.5 }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const category = payload[0].payload.category;
                  const style = categoryStyles[category] || {
                    border: "border-gray-200",
                    text: "text-gray-600",
                  };

                  return (
                    <div
                      className={cn(
                        "bg-white p-3 border-2 shadow-xl rounded-md",
                        style.border,
                      )}
                    >
                      <p
                        className={cn(
                          "font-black text-[10px] uppercase tracking-wider",
                          style.text,
                        )}
                      >
                        {category}
                      </p>
                      <p className="text-gray-900 font-black text-lg mt-1">
                        Impacto: {payload[0].value}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />

            <Bar dataKey="value" radius={[0, 4, 4, 0]} animationDuration={1000}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={categoryStyles[entry.category]?.fill || "#cbd5e1"}
                  fillOpacity={0.8}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
