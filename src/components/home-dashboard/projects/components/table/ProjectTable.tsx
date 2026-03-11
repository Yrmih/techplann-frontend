"use client";

import React from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { IProject } from "@/types/project.interface";
import { cn } from "@/lib/utils/utils";

interface ProjectTableProps {
  projects: IProject[];
  onViewDetails: (project: IProject) => void;
  onEdit: (project: IProject) => void;
  onDelete: (projectId: string) => void;
}

export const ProjectTable = ({
  projects,
  onViewDetails,
  onEdit,
  onDelete,
}: ProjectTableProps) => {
  return (
    /* Removido overflow-hidden para o tooltip não ser cortado */
    <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 font-sans">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-[#249c74] text-white">
            <th className="p-5 text-[10px] font-black uppercase tracking-widest rounded-tl-[32px]">
              Código
            </th>
            <th className="p-5 text-[10px] font-black uppercase tracking-widest">
              Projeto
            </th>
            <th className="p-5 text-[10px] font-black uppercase tracking-widest">
              Responsável
            </th>
            <th className="p-5 text-[10px] font-black uppercase tracking-widest">
              Data Inicial
            </th>
            <th className="p-5 text-[10px] font-black uppercase tracking-widest">
              Data Final
            </th>
            <th className="p-5 text-[10px] font-black uppercase tracking-widest text-center">
              Atividades
            </th>
            <th className="p-5 text-[10px] font-black uppercase tracking-widest text-center">
              Sub-Ativ.
            </th>
            <th className="p-5 text-[10px] font-black uppercase tracking-widest">
              % Andamento
            </th>
            <th className="p-5 text-[10px] font-black uppercase tracking-widest text-center rounded-tr-[32px]">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {projects.map((proj) => (
            <tr
              key={proj.id}
              className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group"
            >
              <td className="p-5 text-sm font-bold text-gray-500">{proj.id}</td>
              <td className="p-5 text-sm font-black text-gray-800 uppercase tracking-tight">
                {proj.titulo}
              </td>
              <td className="p-5 text-sm font-bold text-gray-400">
                {proj.responsavelNome}
              </td>
              <td className="p-5 text-sm font-bold text-gray-400">
                {proj.dataInicio}
              </td>
              <td className="p-5 text-sm font-bold text-gray-400">
                {proj.dataFinal}
              </td>

              <td className="p-5 text-center">
                <span className="bg-[#dcfce7] text-[#10b981] px-3 py-1 rounded-full text-xs font-black">
                  {proj.atividades}
                </span>
              </td>

              <td className="p-5 text-center">
                <span className="bg-gray-100 text-gray-400 px-3 py-1 rounded-full text-xs font-black">
                  {proj.subAtividades}
                </span>
              </td>

              <td className="p-5 w-40">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full transition-all duration-1000",
                        proj.progresso < 50
                          ? "bg-[#f59e0b]"
                          : proj.progresso < 100
                            ? "bg-[#10b981]"
                            : "bg-[#3b82f6]",
                      )}
                      style={{ width: `${proj.progresso}%` }}
                    />
                  </div>
                  <span
                    className={cn(
                      "text-[10px] font-black",
                      proj.progresso < 50
                        ? "text-amber-600"
                        : proj.progresso < 100
                          ? "text-emerald-600"
                          : "text-blue-600",
                    )}
                  >
                    {proj.progresso}%
                  </span>
                </div>
              </td>

              <td className="p-5">
                <div className="flex items-center justify-center gap-3">
                  {/* Botão Visualizar - Preto por padrão, Verde no Hover */}
                  <div className="relative group/tooltip">
                    <button
                      onClick={() => onViewDetails(proj)}
                      className="p-2.5 bg-gray-50 text-gray-900 rounded-xl hover:bg-emerald-50 hover:text-[#10b981] transition-all shadow-sm border border-gray-100"
                    >
                      <Eye size={18} strokeWidth={2.5} />
                    </button>
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-black px-2.5 py-1.5 rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-all z-[100] pointer-events-none uppercase tracking-widest border border-white/10">
                      Ver atividades
                    </span>
                  </div>

                  {/* Botão Editar - Preto por padrão, Verde no Hover */}
                  <div className="relative group/tooltip">
                    <button
                      onClick={() => onEdit(proj)}
                      className="p-2.5 bg-gray-50 text-gray-900 rounded-xl hover:bg-emerald-50 hover:text-[#10b981] transition-all shadow-sm border border-gray-100"
                    >
                      <Pencil size={18} strokeWidth={2.5} />
                    </button>
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-black px-2.5 py-1.5 rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-all z-[100] pointer-events-none uppercase tracking-widest border border-white/10">
                      Editar projeto
                    </span>
                  </div>

                  {/* Botão Excluir - Sempre Vermelho */}
                  <div className="relative group/tooltip">
                    <button
                      onClick={() => onDelete(proj.id)}
                      className="p-2.5 bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-100 transition-all shadow-sm border border-rose-100"
                    >
                      <Trash2 size={18} strokeWidth={2.5} />
                    </button>
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-rose-600 text-white text-[10px] font-black px-2.5 py-1.5 rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-all z-[100] pointer-events-none uppercase tracking-widest">
                      Excluir
                    </span>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
