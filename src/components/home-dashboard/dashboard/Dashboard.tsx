"use client";

import { 
  ClipboardList, 
  FolderKanban, 
  Target, 
  TrendingUp, 
  PieChart as PieIcon,
  AlertCircle,
  Activity,
  BarChart3,
  Zap,
  Clock,
  Calendar
} from "lucide-react";

// Importações dos seus componentes especialistas
import { MetricCard } from "./MetricCard";
import { PerformanceChart } from "./PerformanceChart";
import { StatusProjectsChart } from "./StatusProjectsChart";
import { LateProjects } from "./LateProjects";
import { BSCCard } from "./BSCCard";
import { SWOTRadar } from "./SWOTRadar";
import { ActivityChart } from "./ActivityChart";
import { RecentActivities } from "./RecentActivities";

export default function Dashboard() {
  return (
    <div className="space-y-6 pb-10">
      {/* 1. Header com informações da Empresa */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm">Visão geral do seu planejamento estratégico.</p>
        </div>
        <div className="text-[10px] md:text-xs text-gray-400 bg-gray-50 px-4 py-2 rounded-full border border-gray-100 shadow-sm">
          Empresa: <span className="font-semibold text-gray-600">BC Development S/S LTDA</span> • Frank Pereira Cardoso
        </div>
      </div>
      
      {/* 2. Linha 1: Cards de Métricas (Top Bar) */}
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

      {/* 3. Linha 2: Gráficos de Performance e Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-8">
            <div className="p-2 bg-emerald-50 text-emerald-500 rounded-lg">
              <TrendingUp size={18} />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-sm">Performance Geral</h3>
              <p className="text-[10px] text-gray-400 font-medium">Evolução mensal</p>
            </div>
          </div>
          <PerformanceChart />
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
          <div className="flex items-center gap-2 mb-8">
            <div className="p-2 bg-emerald-50 text-emerald-500 rounded-lg">
              <PieIcon size={18} />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-sm">Status Projetos</h3>
              <p className="text-[10px] text-gray-400 font-medium">Distribuição atual</p>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <StatusProjectsChart />
          </div>
        </div>
      </div>

      {/* 4. Linha 3: Projetos Atrasados, Atividades e BSC */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <LateProjects />
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-amber-50 text-amber-500 rounded-lg">
              <Activity size={18} />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-sm">Atividades</h3>
              <p className="text-[10px] text-gray-400 font-medium">Evolução mensal</p>
            </div>
          </div>
          <ActivityChart />
        </div>
        <BSCCard />
      </div>

      {/* 5. Linha 4: SWOT e Recentes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-emerald-50 text-emerald-500 rounded-lg">
                <Zap size={18} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-sm">Análise SWOT</h3>
                <p className="text-[10px] text-gray-400 font-medium">Resumo geral</p>
              </div>
            </div>
            <button className="text-[10px] font-bold text-gray-400 hover:text-gray-600">Ver análise →</button>
          </div>
          <SWOTRadar />
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-blue-50 text-blue-400 rounded-lg">
              <Clock size={18} />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-sm">Atividades Recentes</h3>
              <p className="text-[10px] text-gray-400 font-medium">Últimas atualizações</p>
            </div>
          </div>
          <RecentActivities />
        </div>
      </div>

      {/* 6. Linha 5: Agenda */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm border-dashed">
        <div className="flex items-center gap-2 mb-8">
          <div className="p-2 bg-blue-50 text-blue-400 rounded-lg">
            <Calendar size={18} />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-sm">Agenda</h3>
            <p className="text-[10px] text-gray-400 font-medium">Próximos compromissos</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-8 text-gray-300">
           <Calendar size={40} className="mb-2 opacity-20" />
           <p className="text-xs font-medium">Sem agendamentos próximos</p>
        </div>
      </div>
    </div>
  );
}