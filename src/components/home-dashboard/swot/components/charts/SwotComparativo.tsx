"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

interface SwotComparativoData {
  category: string;
  value: number;
}

interface SwotComparativoProps {
  data?: SwotComparativoData[];
}

export const SwotComparativo = ({ data = [] }: SwotComparativoProps) => {
  // Dados iniciais para visualização da grade
  const defaultData = [
    { category: "Forças", value: 4 },
    { category: "Fraquezas", value: 3 },
    { category: "Oportunidades", value: 2 },
    { category: "Ameaças", value: 1 },
  ];

  const chartData = data.length > 0 ? data : defaultData;

  return (
    /* Card com fundo branco puro e bordas md */
    <div className="bg-white p-8 rounded-md border border-gray-100 shadow-sm text-left h-full flex flex-col">
      
      {/* Título fiel ao MVP */}
      <h3 className="font-black text-gray-900 mb-8 uppercase text-xs tracking-wider">
        Comparativo
      </h3>

      <div className="flex-1 min-h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={chartData}
            margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
            barSize={40} // Largura da barra que simula o destaque da linha
          >
            {/* Grade técnica tracejada horizontal */}
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              stroke="#d1d5db" 
            />

            {/* Eixo X: Escala de 0 a 4 */}
            <XAxis 
              type="number" 
              domain={[0, 4]} 
              tickCount={5}
              axisLine={{ stroke: '#374151', strokeWidth: 1 }}
              tick={{ fill: '#9ca3af', fontSize: 10 }}
            />

            {/* Eixo Y: Categorias alinhadas à esquerda */}
            <YAxis 
              type="category" 
              dataKey="category" 
              axisLine={{ stroke: '#374151', strokeWidth: 1 }}
              tick={{ fill: '#374151', fontSize: 11, fontWeight: 700 }}
              width={100}
            />

            {/* Tooltip Customizado para o efeito de Hover informativo */}
            <Tooltip 
              cursor={{ fill: '#e5e7eb', opacity: 0.4 }} // O "traço" cinza ao passar o mouse
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-md">
                      <p className="font-bold text-gray-900 text-sm">{payload[0].payload.category}</p>
                      <p className="text-gray-500 text-xs mt-1">Impacto: <span className="font-black text-[#10b981]">{payload[0].value}</span></p>
                    </div>
                  );
                }
                return null;
              }}
            />

            {/* A barra em si - No estado normal é quase invisível ou Emerald sutil */}
            <Bar 
              dataKey="value" 
              radius={[0, 4, 4, 0]}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill="#10b981" 
                  fillOpacity={0.3} // Deixa sutil como na imagem, destacando no hover
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};