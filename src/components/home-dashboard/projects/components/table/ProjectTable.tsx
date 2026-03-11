"use client";

import React from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { IProject } from "@/types/project.interface";
import { cn } from "@/lib/utils/utils";

interface ProjectTableProps {
  projects: IProject[];
  onViewDetails: (project: IProject) => void;
  onEdit: (project: IProject) => void;
  onDelete: (projectId: string) => void; // Adicionado para fechar o ciclo de CRUD
}

export const ProjectTable = ({
  projects,
  onViewDetails,
  onEdit,
  onDelete,
}: ProjectTableProps) => {
  return (
    <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 font-sans">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-[#249c74] text-white">
            <th className="p-5 text-[10px] font-black uppercase tracking-widest">
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
            <th className="p-5 text-[10px] font-black uppercase tracking-widest text-center">
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
                <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onViewDetails(proj)}
                    className="p-2 hover:bg-emerald-50 text-gray-400 hover:text-[#10b981] rounded-lg transition-all border border-transparent hover:border-emerald-100"
                    title="Visualizar Detalhes"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => onEdit(proj)}
                    className="p-2 hover:bg-emerald-50 text-gray-400 hover:text-[#10b981] rounded-lg transition-all border border-transparent hover:border-emerald-100"
                    title="Editar"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(proj.id)}
                    className="p-2 hover:bg-rose-50 text-gray-400 hover:text-rose-500 rounded-lg transition-all border border-transparent hover:border-rose-100"
                    title="Excluir"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
