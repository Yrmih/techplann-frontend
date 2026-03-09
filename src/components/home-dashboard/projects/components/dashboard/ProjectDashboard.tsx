"use client";

import {
  ArrowLeft,
  Plus,
  FileText,
  BarChart2,
  Printer,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  Search,
  ChevronDown,
  MoreVertical,
} from "lucide-react";
import { cn } from "@/lib/utils/utils";

interface Activity {
  id: string;
  descricao: string;
  responsavel: string;
  prazo: string;
  status: "atrasada" | "concluida" | "em-andamento";
  progresso: number;
}

interface ProjectDashboardProps {
  projectTitle: string;
  onBack: () => void;
}

export const ProjectDashboard = ({
  projectTitle,
  onBack,
}: ProjectDashboardProps) => {
  // Mock de atividades para a tabela interna conforme o MVP
  const activities: Activity[] = [
    {
      id: "01",
      descricao: "Definição de escopo do sistema de gestão",
      responsavel: "Lucas Almeida",
      prazo: "15/04/2026",
      status: "concluida",
      progresso: 100,
    },
    {
      id: "02",
      descricao: "Desenvolvimento da interface do dashboard",
      responsavel: "Ian Oliveira",
      prazo: "20/05/2026",
      status: "atrasada",
      progresso: 45,
    },
  ];

  return (
    <div className="space-y-8 pb-10 animate-in fade-in duration-500">
      {/* 1. HEADER EMERALD [Fiel à imagem f60654] */}
      <div className="bg-[#10b981] rounded-[32px] p-8 text-white shadow-xl shadow-emerald-100/20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="text-left">
            <div className="flex items-center gap-2 text-emerald-100 text-[10px] font-black uppercase tracking-[2px] mb-2">
              <span className="bg-white/20 px-2 py-0.5 rounded">
                Atividades
              </span>
              <span>•</span>
              <span>Expansão Regional 2026</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight uppercase leading-none">
              {projectTitle}
            </h1>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl font-black text-[11px] transition-all flex items-center gap-2 border border-white/10 uppercase tracking-wider"
              onClick={onBack}
            >
              <ArrowLeft size={16} strokeWidth={3} /> Voltar
            </button>
            <button className="bg-[#059669] hover:bg-[#047857] text-white px-5 py-2.5 rounded-xl font-black text-[11px] transition-all flex items-center gap-2 shadow-lg uppercase tracking-wider">
              <Plus size={16} strokeWidth={3} /> Novo
            </button>
            <button className="bg-white text-emerald-700 px-5 py-2.5 rounded-xl font-black text-[11px] transition-all flex items-center gap-2 shadow-md uppercase tracking-wider">
              <FileText size={16} strokeWidth={3} /> FCAs
            </button>
            <button className="bg-white text-emerald-700 px-5 py-2.5 rounded-xl font-black text-[11px] transition-all flex items-center gap-2 shadow-md uppercase tracking-wider">
              <BarChart2 size={16} strokeWidth={3} /> Gantt
            </button>
            <button className="bg-white text-emerald-700 px-4 py-2.5 rounded-xl font-black text-xs transition-all shadow-md">
              <Printer size={16} strokeWidth={3} />
            </button>
          </div>
        </div>
      </div>

      {/* 2. CARDS DE RESUMO [Fiel à imagem f60654] */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card Atrasadas */}
        <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm flex items-center gap-5">
          <div className="bg-rose-50 text-rose-500 p-4 rounded-2xl">
            <AlertCircle size={32} strokeWidth={2.5} />
          </div>
          <div className="text-left">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Atrasadas
            </p>
            <p className="text-3xl font-black text-rose-500 leading-none mt-1">
              02
            </p>
          </div>
        </div>

        {/* Card Concluídas */}
        <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm flex items-center gap-5">
          <div className="bg-emerald-50 text-[#10b981] p-4 rounded-2xl">
            <CheckCircle2 size={32} strokeWidth={2.5} />
          </div>
          <div className="text-left">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Concluídas
            </p>
            <p className="text-3xl font-black text-[#10b981] leading-none mt-1">
              14
            </p>
          </div>
        </div>

        {/* Card Progresso Global */}
        <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm flex items-center gap-5">
          <div className="bg-blue-50 text-blue-500 p-4 rounded-2xl">
            <TrendingUp size={32} strokeWidth={2.5} />
          </div>
          <div className="text-left flex-1">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Progresso Global
            </p>
            <div className="flex items-center gap-3 mt-1">
              <p className="text-3xl font-black text-blue-600 leading-none">
                65%
              </p>
              <div className="flex-1 h-2 bg-blue-50 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: "65%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. FILTROS DA LISTA */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search
            className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300"
            size={18}
          />
          <input
            placeholder="Filtrar atividades do projeto..."
            className="w-full h-14 pl-14 pr-6 bg-white border border-gray-100 rounded-2xl text-sm font-bold outline-none focus:border-[#10b981] shadow-sm"
          />
        </div>
        <div className="bg-white border border-gray-100 px-6 rounded-2xl shadow-sm flex items-center gap-10">
          <div className="text-left">
            <p className="text-[9px] font-black text-gray-400 uppercase">
              Status
            </p>
            <div className="flex items-center gap-2 cursor-pointer">
              <span className="text-xs font-black text-gray-700">Todos</span>
              <ChevronDown size={14} className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* 4. TABELA DE ATIVIDADES [Seguindo o padrão da ProjectTable] */}
      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#249c74] text-white">
              <th className="p-5 text-[10px] font-black uppercase tracking-widest w-16">
                ID
              </th>
              <th className="p-5 text-[10px] font-black uppercase tracking-widest">
                Atividade
              </th>
              <th className="p-5 text-[10px] font-black uppercase tracking-widest">
                Responsável
              </th>
              <th className="p-5 text-[10px] font-black uppercase tracking-widest">
                Prazo
              </th>
              <th className="p-5 text-[10px] font-black uppercase tracking-widest text-center">
                Progresso
              </th>
              <th className="p-5 text-[10px] font-black uppercase tracking-widest text-center">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {activities.map((act) => (
              <tr
                key={act.id}
                className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
              >
                <td className="p-5 text-sm font-bold text-gray-400">
                  {act.id}
                </td>
                <td className="p-5 text-sm font-black text-gray-800 uppercase tracking-tight">
                  {act.descricao}
                </td>
                <td className="p-5 text-sm font-bold text-gray-400">
                  {act.responsavel}
                </td>
                <td className="p-5 text-sm font-bold text-gray-400">
                  {act.prazo}
                </td>
                <td className="p-5 w-48">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full",
                          act.status === "concluida"
                            ? "bg-[#10b981]"
                            : act.status === "atrasada"
                              ? "bg-rose-500"
                              : "bg-blue-500",
                        )}
                        style={{ width: `${act.progresso}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-black text-gray-600">
                      {act.progresso}%
                    </span>
                  </div>
                </td>
                <td className="p-5 text-center">
                  <button className="p-2 text-gray-300 hover:text-gray-600">
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
