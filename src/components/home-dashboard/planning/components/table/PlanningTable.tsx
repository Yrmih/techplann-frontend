"use client";

import React from "react";
import { MoreHorizontal, Pencil, Trash2, Users, Check, X } from "lucide-react";
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
        container: "bg-emerald-50 text-emerald-600 border-emerald-100",
        icon: <Check size={12} strokeWidth={2.5} />,
        label: "Ativo",
      },
      concluído: {
        container: "bg-teal-50 text-teal-600 border-teal-100",
        icon: <Check size={12} strokeWidth={2.5} />,
        label: "Concluído",
      },
      cancelado: {
        container: "bg-rose-50 text-rose-500 border-rose-100",
        icon: <X size={12} strokeWidth={2.5} />,
        label: "Cancelado",
      },
      pausado: {
        container: "bg-gray-50 text-gray-500 border-gray-200",
        icon: <X size={12} strokeWidth={2.5} />,
        label: "Pausado",
      },
    };

    const current = styles[s] || styles["ativo"];

    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border",
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
      {/* Container que forma o "Retângulo" da tabela conforme o MVP */}
      <div className="rounded-xl border border-gray-100 bg-white overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          {/* Header com tom cinza diferente conforme a imagem */}
          <thead className="bg-gray-50/50 border-b border-gray-100">
            <tr>
              <th className="py-4 px-6 text-sm font-bold text-slate-800">
                Nome
              </th>
              <th className="py-4 px-6 text-sm font-bold text-slate-800">
                Parceiros
              </th>
              <th className="py-4 px-6 text-sm font-bold text-slate-800 text-right pr-12">
                Status
              </th>
              <th className="w-[50px]"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50">
            {data.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-slate-50/30 transition-colors group"
              >
                <td className="py-5 px-6">
                  <div className="flex flex-col text-left">
                    <span className="text-[14px] font-semibold text-slate-700 group-hover:text-emerald-600 transition-colors">
                      {item.nome.toLowerCase()}
                    </span>
                    <span className="text-[12px] text-slate-400 font-normal mt-1 max-w-[420px] truncate leading-relaxed">
                      Gerenciamento estratégico de stakeholders e objetivos...
                    </span>
                  </div>
                </td>

                <td className="py-5 px-6">
                  <div className="flex items-center gap-2.5 text-left">
                    <Users size={16} className="text-slate-300" />
                    <span className="text-sm font-normal text-slate-500">
                      {item.cliente}
                    </span>
                  </div>
                </td>

                <td className="py-5 px-6 text-right pr-12">
                  <div className="flex justify-end">
                    {renderStatus(item.status)}
                  </div>
                </td>

                <td className="py-5 px-6 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1.5 text-slate-300 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-all outline-none border border-transparent">
                        <MoreHorizontal size={18} />
                      </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      align="end"
                      className="w-40 bg-white rounded-xl shadow-xl border-gray-100 p-1 z-[110]"
                    >
                      <DropdownMenuItem
                        onClick={() => onEdit(item)}
                        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 focus:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                      >
                        <Pencil size={14} className="text-slate-900" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDelete(item.id)}
                        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-rose-500 focus:bg-rose-50 focus:text-rose-600 rounded-lg cursor-pointer transition-colors"
                      >
                        <Trash2 size={14} />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Rodapé da tabela */}
      <div className="py-6 text-left">
        <span className="text-[13px] font-normal text-slate-400">
          Mostrando {data.length} de {data.length} planejamentos
        </span>
      </div>
    </div>
  );
}
