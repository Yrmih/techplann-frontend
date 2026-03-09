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
    <div className="bg-white p-8 rounded-md border border-gray-100 shadow-sm text-left h-full flex flex-col">
      {/* Título */}
      <h3 className="font-black text-gray-900 mb-6 uppercase text-xs tracking-wider">
        Gráfico Radar
      </h3>

      {/* Área do gráfico */}
      <div className="h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            {/* GRID PRINCIPAL */}
            <PolarGrid stroke="#d1d5db" strokeDasharray="4 4" />

            {/* LABELS (Forças, Fraquezas, etc) */}
            <PolarAngleAxis
              dataKey="subject"
              tick={{
                fill: "#6b7280",
                fontSize: 11,
                fontWeight: 500,
              }}
            />

            {/* ESCALA DO RADAR */}
            <PolarRadiusAxis domain={[0, 4]} tick={false} axisLine={false} />

            {/* RADAR */}
            <Radar
              name="SWOT"
              dataKey="A"
              stroke="#9ca3af"
              strokeWidth={2}
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
