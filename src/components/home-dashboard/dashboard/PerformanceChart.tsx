"use client";

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from "recharts";

// Dados mockados baseados no mvp
const data = [
  { name: "Jan", meta: 80, realizado: 65 },
  { name: "Fev", meta: 80, realizado: 72 },
  { name: "Mar", meta: 82, realizado: 68 },
  { name: "Abr", meta: 85, realizado: 85 },
  { name: "Mai", meta: 85, realizado: 78 },
  { name: "Jun", meta: 88, realizado: 92 },
  { name: "Jul", meta: 90, realizado: 87 },
  { name: "Ago", meta: 90, realizado: 95 },
];

export function PerformanceChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "#9ca3af", fontSize: 12 }} 
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "#9ca3af", fontSize: 12 }}
            domain={[0, 100]}
            ticks={[0, 25, 50, 75, 100]}
            unit="%"
          />
          <Tooltip 
            cursor={{ fill: "#f9fafb" }}
            contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
          />
          <Legend 
            verticalAlign="top" 
            align="center" 
            iconType="square"
            wrapperStyle={{ paddingBottom: "20px", fontSize: "12px" }}
          />
          {/* Meta - Cinza */}
          <Bar 
            name="Meta" 
            dataKey="meta" 
            fill="#6b7280" 
            radius={[4, 4, 0, 0]} 
            barSize={20} 
          />
          {/* Realizado - Verde TechPlann */}
          <Bar 
            name="Realizado" 
            dataKey="realizado" 
            fill="#10b981" 
            radius={[4, 4, 0, 0]} 
            barSize={20} 
          />
        </BarChart>
      </ResponsiveContainer>

      {/* Rodapé com as médias mockadas do print */}
      <div className="grid grid-cols-3 mt-6 pt-6 border-t border-gray-50 text-center">
        <div>
          <p className="text-xl font-bold text-gray-900">80.1%</p>
          <p className="text-[10px] text-gray-400 uppercase font-semibold">Média Realizada</p>
        </div>
        <div>
          <p className="text-xl font-bold text-emerald-500">85%</p>
          <p className="text-[10px] text-gray-400 uppercase font-semibold">Meta Média</p>
        </div>
        <div>
          <p className="text-xl font-bold text-amber-500">-4.9%</p>
          <p className="text-[10px] text-gray-400 uppercase font-semibold">Gap</p>
        </div>
      </div>
    </div>
  );
}