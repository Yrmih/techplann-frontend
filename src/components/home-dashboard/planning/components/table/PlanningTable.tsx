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

    // Configuração de cores e ícones baseada nas imagens image_78825a.png e image_782f6a.png
    const styles: Record<string, { container: string; icon: React.ReactNode; label: string }> = {
      ativo: {
        container: "bg-emerald-50 text-emerald-700 border-emerald-200",
        icon: <Check size={12} strokeWidth={3} />,
        label: "Ativo",
      },
      concluído: {
        container: "bg-teal-50 text-teal-600 border-teal-100",
        icon: <Check size={12} strokeWidth={3} />,
        label: "Concluído",
      },
      cancelado: {
        container: "bg-rose-50 text-rose-500 border-rose-100",
        icon: <X size={12} strokeWidth={3} />,
        label: "Cancelado",
      },
      pausado: {
        container: "bg-gray-50 text-gray-500 border-gray-200",
        icon: <X size={12} strokeWidth={3} />,
        label: "Pausado",
      },
    };

    const current = styles[s] || styles["ativo"];

    return (
      <span className={cn(
        "flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black border transition-all",
        current.container
      )}>
        {current.icon}
        {current.label}
      </span>
    );
  };

  return (
    <div className="mx-8 mb-8 border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm font-sans">
      <table className="w-full text-left border-collapse">
        <thead className="bg-[#f9fafb] border-b border-gray-200">
          <tr className="text-sm font-black text-gray-700">
            <th className="px-8 py-5">Nome</th>
            <th className="px-8 py-5">Parceiros</th>
            <th className="px-8 py-5 text-center">Status</th>
            <th className="px-8 py-5"></th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-emerald-50/40 transition-colors group cursor-default">
              <td className="px-8 py-5">
                <div className="flex flex-col text-left">
                  <span className="text-sm font-black text-black group-hover:text-[#10b981] transition-colors">
                    {item.nome}
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium truncate max-w-[350px]">
                    Gerenciamento estratégico de stakeholders e objetivos...
                  </span>
                </div>
              </td>

              <td className="px-8 py-5">
                <div className="flex items-center gap-2 text-gray-500 text-left">
                  <div className="p-1.5 bg-gray-50 rounded-lg text-gray-400">
                    <Users size={14} />
                  </div>
                  <span className="text-xs font-bold text-gray-700">{item.cliente}</span>
                </div>
              </td>

              <td className="px-8 py-5">
                <div className="flex justify-center">
                  {renderStatus(item.status)}
                </div>
              </td>

              <td className="px-8 py-5 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-2 text-gray-400 hover:text-[#10b981] transition-all outline-none rounded-lg hover:bg-white active:scale-90">
                      <MoreHorizontal size={18} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="rounded-xl border-gray-100 shadow-2xl p-1 min-w-[140px] z-[110]">
                    <DropdownMenuItem onClick={() => onEdit(item)} className="text-xs font-bold text-gray-600 cursor-pointer py-2.5 rounded-lg flex items-center gap-2 focus:bg-[#10b981] focus:text-white transition-colors">
                      <Pencil size={14} /> Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDelete(item.id)} className="text-xs font-bold text-rose-500 cursor-pointer py-2.5 rounded-lg flex items-center gap-2 focus:bg-rose-500 focus:text-white transition-colors">
                      <Trash2 size={14} /> Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Rodapé fiel à imagem image_789961.png */}
      <div className="px-8 py-4 bg-gray-50/50 border-t border-gray-100 text-left">
        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
          Mostrando {data.length} de {data.length} registros
        </span>
      </div>
    </div>
  );
}