"use client";

import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer 
} from "recharts";

const data = [
  { subject: 'Forças', A: 80, fullMark: 100 },
  { subject: 'Fraquezas', A: 50, fullMark: 100 },
  { subject: 'Oportunidades', A: 90, fullMark: 100 },
  { subject: 'Ameaças', A: 40, fullMark: 100 },
];

export function SWOTRadar() {
  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#f3f4f6" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: "#9ca3af", fontSize: 10, fontWeight: 600 }} 
          />
          <Radar
            name="SWOT"
            dataKey="A"
            stroke="#10b981"
            fill="#10b981"
            fillOpacity={0.2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}