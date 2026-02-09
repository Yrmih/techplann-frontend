"use client";

import { ClipboardList, FolderKanban, Target } from "lucide-react";
import { MetricCard } from "./MetricCard";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm">Visão geral do seu planejamento estratégico.</p>
        </div>
        <div className="text-xs text-gray-400 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
          Empresa: <span className="font-semibold text-gray-600">BC Development S/S LTDA</span> • Frank Pereira Cardoso
        </div>
      </div>
      
      {/* Linha 1: Cards de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard 
          title="Planejamentos"
          value="8"
          label="Cadastrados"
          trend="+1"
          icon={ClipboardList}
          iconBg="bg-blue-600"
        />
        <MetricCard 
          title="Projetos"
          value="8"
          label="Em Andamento"
          trend="+2"
          icon={FolderKanban}
          iconBg="bg-amber-500"
        />
        <MetricCard 
          title="Metas"
          value="67%"
          label="Alcançadas"
          trend="+5%"
          icon={Target}
          iconBg="bg-emerald-500"
        />
      </div>

      {/* Linha 2: Gráficos Principais */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Geral */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm min-h-[400px]">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-emerald-50 text-emerald-500 rounded-lg">
              <span className="text-lg">📈</span>
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Performance Geral</h3>
              <p className="text-xs text-gray-400">Evolução mensal</p>
            </div>
          </div>
          {/* Aqui entrará o componente do Gráfico de Barras da Recharts */}
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-50 text-gray-300">
            [Gráfico de Barras: Meta vs Realizado]
          </div>
        </div>

        {/* Status Projetos */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-emerald-50 text-emerald-500 rounded-lg">
              <span className="text-lg">🕒</span>
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Status Projetos</h3>
              <p className="text-xs text-gray-400">Distribuição atual</p>
            </div>
          </div>
          {/* Aqui entrará o componente do Gráfico Donut da Recharts */}
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-50 text-gray-300">
            [Gráfico Donut: Status]
          </div>
        </div>
      </div>
    </div>
  );
}