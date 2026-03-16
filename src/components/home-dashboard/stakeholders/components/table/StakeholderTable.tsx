"use client";

import {
  MoreHorizontal,
  Pencil,
  Trash2,
  Check,
  Building2,
  Users2,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils/utils";

interface StakeholderData {
  id: string;
  nome: string;
  tipo: string;
  empresaRelacionada?: string;
  status: "Ativo" | "Inativo";
}

interface StakeholderTableProps {
  data: StakeholderData[];
  type: "parceiros" | "departamentos";
  onEdit: (item: StakeholderData) => void;
  onDelete: (id: string) => void;
}

export const StakeholderTable = ({
  data,
  type,
  onEdit,
  onDelete,
}: StakeholderTableProps) => {
  return (
    <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 font-sans overflow-hidden">
      <Table>
        <TableHeader>
          {/* Header Verde Premium - Idêntico à ProjectTable */}
          <TableRow className="bg-[#249c74] hover:bg-[#249c74] border-none">
            <TableHead className="p-5 text-[10px] font-black uppercase tracking-widest text-white rounded-tl-[32px]">
              {type === "parceiros" ? "Stakeholder" : "Departamento"}
            </TableHead>
            <TableHead className="p-5 text-[10px] font-black uppercase tracking-widest text-white">
              Tipo
            </TableHead>
            {type === "parceiros" && (
              <TableHead className="p-5 text-[10px] font-black uppercase tracking-widest text-white">
                Empresa Relacionada
              </TableHead>
            )}
            <TableHead className="p-5 text-[10px] font-black uppercase tracking-widest text-white">
              Situação
            </TableHead>
            <TableHead className="p-5 text-[10px] font-black uppercase tracking-widest text-white text-center rounded-tr-[32px] w-[80px]">
              Ações
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((item) => (
            <TableRow
              key={item.id}
              className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group"
            >
              {/* Nome com Ícone Contextual usando TableCell */}
              <TableCell className="p-5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-[#10b981] group-hover:bg-emerald-50 transition-all border border-transparent group-hover:border-emerald-100">
                    {type === "parceiros" ? (
                      <Building2 size={18} />
                    ) : (
                      <Users2 size={18} />
                    )}
                  </div>
                  <span className="text-sm font-black text-gray-800 uppercase tracking-tight">
                    {item.nome}
                  </span>
                </div>
              </TableCell>

              {/* Tipo usando TableCell */}
              <TableCell className="p-5 text-sm font-bold text-gray-500">
                {item.tipo}
              </TableCell>

              {/* Empresa Relacionada usando TableCell */}
              {type === "parceiros" && (
                <TableCell className="p-5 text-sm font-bold text-gray-400">
                  {item.empresaRelacionada || "—"}
                </TableCell>
              )}

              {/* Status Badge usando TableCell */}
              <TableCell className="p-5">
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight border",
                    item.status === "Ativo"
                      ? "bg-[#dcfce7] text-[#10b981] border-emerald-100/50"
                      : "bg-gray-100 text-gray-400 border-gray-200/50",
                  )}
                >
                  {item.status === "Ativo" && (
                    <Check className="w-3 h-3 stroke-[4px]" />
                  )}
                  {item.status}
                </span>
              </TableCell>

              {/* Menu de Ações usando TableCell */}
              <TableCell className="p-5 text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-2.5 hover:bg-gray-100 rounded-xl transition-all outline-none text-gray-400 hover:text-gray-900 border border-transparent hover:border-gray-200">
                      <MoreHorizontal size={20} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-48 bg-white rounded-2xl shadow-xl border-gray-100 p-2 z-[100] animate-in zoom-in-95"
                  >
                    <DropdownMenuItem
                      onClick={() => onEdit(item)}
                      className="flex items-center gap-2 p-3 text-[10px] font-black uppercase tracking-widest text-emerald-600 focus:bg-emerald-50 focus:text-emerald-700 rounded-xl cursor-pointer transition-colors"
                    >
                      <Pencil size={14} strokeWidth={3} />
                      Editar Registro
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onDelete(item.id)}
                      className="flex items-center gap-2 p-3 text-[10px] font-black uppercase tracking-widest text-rose-500 focus:bg-rose-50 focus:text-rose-600 rounded-xl cursor-pointer transition-colors"
                    >
                      <Trash2 size={14} strokeWidth={3} />
                      Excluir Stakeholder
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
