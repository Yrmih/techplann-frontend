"use client";

import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer 
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
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-left h-full">
      <h3 className="font-bold text-gray-900 mb-4 text-left">Análise Radar SWOT</h3>
      
      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
           
            <PolarGrid stroke="#e2e8f0" />
            
            
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }} 
            />
            
            
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, 100]} 
              tick={{ fontSize: 10, fill: '#cbd5e1' }}
              axisLine={false}
            />
            
           
            <Radar
              name="Pontuação"
              dataKey="A"
              stroke="#10b981"
              strokeWidth={2}
              fill="#10b981"
              fillOpacity={0.4}
              dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

     
      <div className="flex justify-center items-center gap-2 mt-4">
        <div className="w-3 h-3 bg-[#10b981] rounded-sm"></div>
        <span className="text-xs font-bold text-[#10b981]">Pontuação</span>
      </div>
    </div>
  );
};