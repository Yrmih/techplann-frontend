"use client";

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip } from "recharts";

const data = [
  { name: "Jan", total: 12 },
  { name: "Fev", total: 18 },
  { name: "Mar", total: 15 },
  { name: "Abr", total: 22 },
  { name: "Mai", total: 19 },
  { name: "Jun", total: 28 },
];

export function ActivityChart() {
  return (
    <div className="h-[180px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f9fafb" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "#9ca3af", fontSize: 10 }} 
          />
          <YAxis hide domain={[0, 40]} />
          <Tooltip 
            cursor={{ fill: "#f9fafb" }}
            contentStyle={{ borderRadius: "8px", border: "none", fontSize: "10px" }}
          />
          <Bar dataKey="total" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={15} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}