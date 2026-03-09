"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp } from "lucide-react";

interface SwotRadarChartProps {
  data: { subject: string; A: number; fullMark: number }[];
}

export const SwotRadarChart = ({ data }: SwotRadarChartProps) => {
  return (
    <div className="bg-[#10b981]/5 p-8 rounded-md border border-gray-100 shadow-sm text-left h-full relative flex flex-col">
      <h3 className="font-black text-[10px] text-gray-900 mb-4 uppercase tracking-[3px]">
        ANÁLISE RADAR SWOT
      </h3>

      <div className="flex-1 min-h-[300px] w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: "#475569", fontSize: 10, fontWeight: 900 }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={false}
              axisLine={false}
            />
            <Radar
              name="Pontuação"
              dataKey="A"
              stroke="#10b981"
              strokeWidth={4}
              fill="#10b981"
              fillOpacity={0.1}
            />
          </RadarChart>
        </ResponsiveContainer>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <div className="bg-white p-3 rounded-full shadow-lg border-2 border-emerald-500/20">
            <TrendingUp size={28} strokeWidth={3} className="text-[#10b981]" />
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center gap-2 mt-6">
        <div className="w-2.5 h-2.5 bg-[#10b981] rounded-full shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
        <span className="text-[10px] font-black text-[#10b981] uppercase tracking-[1.5px]">
          INTENSIDADE ESTRATÉGICA
        </span>
      </div>
    </div>
  );
};
