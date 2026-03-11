"use client";

import {
  ArrowLeft,
  Plus,
  FileText,
  BarChart2,
  Printer,
  ChevronDown,
  MoreVertical,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Search,
} from "lucide-react";

interface ProjectDashboardProps {
  projectTitle: string;
  onBack: () => void;
}

export const ProjectDashboard = ({
  projectTitle,
  onBack,
}: ProjectDashboardProps) => {
  return (
    <div className="space-y-6 pb-10 animate-in fade-in duration-500 font-sans">
      {/* 1. HEADER ESTRATÉGICO COM GRADIENTE */}
      <div className="bg-gradient-to-r from-[#34a87a] to-[#248c64] rounded-2xl p-6 text-white shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-left flex-1">
            <h1 className="text-xl font-black tracking-tight uppercase mb-1">
              Atividades
            </h1>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-bold text-emerald-50 uppercase tracking-wide opacity-90">
              <p>
                Planejamento:{" "}
                <span className="text-white font-black">
                  Planejamento Estratégico de Expansão Digital 2026
                </span>
              </p>
              <p>
                Projeto:{" "}
                <span className="text-white font-black">
                  {projectTitle || "EXEMPLO DE PROJETO"}
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button className="bg-[#10b981] hover:bg-[#0da673] text-white px-5 py-2 rounded-xl font-bold text-xs transition-all flex items-center gap-2 shadow-sm uppercase tracking-wider">
              <Plus size={16} strokeWidth={3} /> Novo
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl font-bold text-xs transition-all flex items-center gap-2 border border-white/10 uppercase tracking-wider">
              <FileText size={16} /> FCAs
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl font-bold text-xs transition-all flex items-center gap-2 border border-white/10 uppercase tracking-wider">
              <BarChart2 size={16} /> Gantt
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl font-bold text-xs transition-all flex items-center gap-2 border border-white/10 uppercase tracking-wider">
              <Printer size={16} /> Imprimir
            </button>
            <button
              onClick={onBack}
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl font-bold text-xs transition-all flex items-center gap-2 border border-white/10 uppercase tracking-wider"
            >
              <ArrowLeft size={16} /> Voltar
            </button>
          </div>
        </div>
      </div>

      {/* 2. CARDS DE RESUMO */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Atrasadas */}
        <div className="bg-[#fff1f2] p-5 rounded-2xl border border-rose-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-rose-500 shadow-sm">
            <AlertTriangle size={24} />
          </div>
          <div className="text-left">
            <p className="text-2xl font-black text-rose-600 leading-none">0</p>
            <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest mt-1">
              Atrasadas
            </p>
          </div>
        </div>

        {/* Concluídas */}
        <div className="bg-[#f0fdf4] p-5 rounded-2xl border border-emerald-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#10b981] shadow-sm">
            <CheckCircle size={24} />
          </div>
          <div className="text-left">
            <p className="text-2xl font-black text-[#10b981] leading-none">0</p>
            <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mt-1">
              Concluídas
            </p>
          </div>
        </div>

        {/* Progresso Global */}
        <div className="bg-[#f0fdfa] p-5 rounded-2xl border border-teal-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-teal-500 shadow-sm">
            <TrendingUp size={24} />
          </div>
          <div className="text-left flex-1">
            <p className="text-2xl font-black text-teal-600 leading-none">0%</p>
            <p className="text-[10px] font-black text-teal-400 uppercase tracking-widest mt-1">
              Progresso Global
            </p>
          </div>
        </div>
      </div>

      {/* 3. FILTROS DA LISTA */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            placeholder="Pesquisar atividade..."
            className="w-full h-12 pl-12 pr-4 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-[#10b981] transition-all font-medium"
          />
        </div>
        <div className="flex gap-2">
          <button className="bg-white border border-gray-200 px-4 py-2 rounded-xl text-xs font-bold text-gray-600 flex items-center gap-2 hover:bg-gray-50 transition-all">
            Responsável <ChevronDown size={14} className="text-gray-400" />
          </button>
          <button className="bg-white border border-gray-200 px-4 py-2 rounded-xl text-xs font-bold text-gray-600 flex items-center gap-2 hover:bg-gray-50 transition-all">
            Status <ChevronDown size={14} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* 4. TABELA DE ATIVIDADES */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[250px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#34a87a] text-white">
              <th className="p-4 text-[11px] font-black uppercase tracking-widest">
                Atividades
              </th>
              <th className="p-4 text-[11px] font-black uppercase tracking-widest">
                Responsável
              </th>
              <th className="p-4 text-[11px] font-black uppercase tracking-widest">
                Data Inicial
              </th>
              <th className="p-4 text-[11px] font-black uppercase tracking-widest">
                Data Final
              </th>
              <th className="p-4 text-[11px] font-black uppercase tracking-widest">
                % Andamento
              </th>
              <th className="p-4 text-[11px] font-black uppercase tracking-widest text-center">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                colSpan={6}
                className="p-20 text-center text-sm font-bold text-gray-400 italic"
              >
                <div className="flex flex-col items-center gap-2">
                  <span>Nenhuma atividade cadastrada</span>
                  <MoreVertical size={0} className="opacity-0" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 5. LEGENDA */}
      <div className="flex items-center gap-6 pt-2">
        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
          Legenda:
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 bg-orange-50 px-3 py-1.5 rounded-full border border-orange-100">
            <div className="w-2 h-2 rounded-full bg-orange-500" />
            <span className="text-[10px] font-black text-orange-700 uppercase">
              Abaixo de 50%
            </span>
          </div>
          <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-black text-emerald-700 uppercase">
              Acima de 50%
            </span>
          </div>
          <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-[10px] font-black text-blue-700 uppercase">
              Igual a 100%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
