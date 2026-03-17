"use client";

import React from "react";
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  Users,
  Check,
  X,
  Calendar,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IPlanning } from "@/types/interfaces/planning.interface";
import { cn } from "@/lib/utils/utils";

interface PlanningTableProps {
  data: IPlanning[];
  onEdit: (item: IPlanning) => void;
  onDelete: (id: number | string) => void;
}

export function PlanningTable({ data, onEdit, onDelete }: PlanningTableProps) {
  const renderStatus = (status: string) => {
    const s = status.toLowerCase();

    const styles: Record<
      string,
      { container: string; icon: React.ReactNode; label: string }
    > = {
      ativo: {
        container: "bg-emerald-50 text-emerald-700 border-emerald-100/50",
        icon: <Check size={12} strokeWidth={3} />,
        label: "Ativo",
      },
      concluído: {
        container: "bg-blue-50 text-blue-700 border-blue-100/50",
        icon: <Check size={12} strokeWidth={3} />,
        label: "Concluído",
      },
      cancelado: {
        container: "bg-rose-50 text-rose-600 border-rose-100/50",
        icon: <X size={12} strokeWidth={3} />,
        label: "Cancelado",
      },
      pausado: {
        container: "bg-amber-50 text-amber-700 border-amber-100/50",
        icon: <Calendar size={12} strokeWidth={3} />,
        label: "Pausado",
      },
    };

    const current = styles[s] || styles["ativo"];

    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border uppercase tracking-wider",
          current.container,
        )}
      >
        {current.icon}
        {current.label}
      </span>
    );
  };

  return (
    <div className="w-full animate-in fade-in duration-500 px-8 pb-8">
      <div className="rounded-2xl border border-slate-100 bg-white overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                Identificação do Planejamento
              </th>
              <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                Parceiros Vinculados
              </th>
              <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">
                Situação
              </th>
              <th className="w-[80px]"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-50">
            {data.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-slate-50/40 transition-colors group cursor-default"
              >
                <td className="py-5 px-6">
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-bold text-slate-700 group-hover:text-emerald-600 transition-colors">
                      {item.nome}
                    </span>
                    <span className="text-xs text-slate-400 font-medium mt-1 max-w-[400px] truncate">
                      Análise estratégica e definição de objetivos para o ciclo.
                    </span>
                  </div>
                </td>

                <td className="py-5 px-6">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-slate-100 rounded-lg text-slate-400">
                      <Users size={14} />
                    </div>
                    <span className="text-xs font-semibold text-slate-600">
                      {item.cliente}
                    </span>
                  </div>
                </td>

                <td className="py-5 px-6">
                  <div className="flex justify-center">
                    {renderStatus(item.status)}
                  </div>
                </td>

                <td className="py-5 px-6 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all outline-none">
                        <MoreHorizontal size={20} />
                      </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      align="end"
                      className="w-48 bg-white rounded-2xl shadow-xl border border-slate-100 p-1.5 z-[110]"
                    >
                      <DropdownMenuItem
                        onClick={() => onEdit(item)}
                        className="flex items-center gap-2 px-3 py-2.5 text-xs font-bold text-slate-700 focus:bg-slate-50 focus:text-slate-900 rounded-xl cursor-pointer transition-colors"
                      >
                        <Pencil size={14} className="text-slate-500" />
                        EDITAR DADOS
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDelete(item.id)}
                        className="flex items-center gap-2 px-3 py-2.5 text-xs font-bold text-rose-500 focus:bg-rose-50 focus:text-rose-600 rounded-xl cursor-pointer transition-colors"
                      >
                        <Trash2 size={14} />
                        EXCLUIR REGISTRO
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="py-6 flex items-center justify-between">
        <span className="text-[12px] font-bold text-slate-400 uppercase tracking-tight">
          Exibindo {data.length} registros ativos
        </span>
      </div>
    </div>
  );
}
