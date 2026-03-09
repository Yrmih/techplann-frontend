"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

interface SwotRadarData {
  subject: string;
  A: number;
  fullMark: number;
}

interface SwotRadarChartProps {
  data: SwotRadarData[];
}

export const SwotRadarChart = ({ data }: SwotRadarChartProps) => {
  return (
    /* Card com fundo branco e bordas ponteagudas (md) conforme o MVP */
    <div className="bg-white p-8 rounded-md border border-gray-100 shadow-sm text-left h-full flex flex-col">
      
      {/* Título idêntico à imagem de referência */}
      <h3 className="font-black text-gray-900 mb-6 uppercase text-xs tracking-wider">
        Gráfico Radar
      </h3>

      {/* Área do gráfico com raio reduzido para evitar corte das labels laterais */}
      <div className="flex-1 min-h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="60%" data={data}>
            {/* Grid em linhas tracejadas cinzas */}
            <PolarGrid stroke="#d1d5db" strokeDasharray="3 3" />

            {/* Labels dos eixos em cinza escuro e nítidas */}
            <PolarAngleAxis
              dataKey="subject"
              tick={{
                fill: "#374151",
                fontSize: 11,
                fontWeight: 600,
              }}
            />

            {/* Traço métrico central com numeração de 0 a 4 */}
            <PolarRadiusAxis 
              angle={45} 
              domain={[0, 4]} 
              tick={{ fill: "#9ca3af", fontSize: 10 }}
              axisLine={{ stroke: "#9ca3af" }}
            />

            {/* Radar técnico: linha cinza com pontos Emerald sólidos */}
            <Radar
              name="SWOT"
              dataKey="A"
              stroke="#9ca3af"
              strokeWidth={1}
              fill="#10b981"
              fillOpacity={0.05}
              dot={{
                r: 4,
                fill: "#10b981",
                strokeWidth: 2,
                stroke: "#fff",
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};