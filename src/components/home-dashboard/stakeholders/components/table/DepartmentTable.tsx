"use client";

import { MoreHorizontal, Pencil, Trash2, Check, Users2 } from "lucide-react";
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

export interface DepartmentData {
  id: string;
  nome: string;
  status: "Ativo" | "Inativo";
}

interface DepartmentTableProps {
  data: DepartmentData[];
  onEdit: (item: DepartmentData) => void;
  onDelete: (id: string) => void;
}

export const DepartmentTable = ({
  data,
  onEdit,
  onDelete,
}: DepartmentTableProps) => {
  return (
    <div className="w-full animate-in fade-in duration-500 pb-8">
      {/* Container Retangular (Caixa) conforme padrão unificado */}
      <div className="rounded-xl border border-gray-100 bg-white overflow-hidden shadow-sm">
        <Table className="border-collapse">
          {/* Header */}
          <TableHeader className="bg-gray-50/50 border-b border-gray-100">
            <TableRow className="hover:bg-transparent">
              <TableHead className="py-4 px-6 text-sm font-bold text-slate-800">
                Unidade Administrativa
              </TableHead>
              <TableHead className="py-4 px-6 text-sm font-bold text-slate-800 text-right pr-12">
                Situação
              </TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-50">
            {data.map((item) => (
              <TableRow
                key={item.id}
                className="hover:bg-slate-50/30 transition-colors group"
              >
                {/* Nome com ícone e Padding px-6 */}
                <TableCell className="py-5 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-[#10b981] transition-colors border border-transparent group-hover:border-emerald-100">
                      <Users2 size={16} />
                    </div>
                    <span className="font-medium text-gray-700">
                      {item.nome.toLowerCase()}
                    </span>
                  </div>
                </TableCell>

                {/* Status */}
                <TableCell className="py-5 px-6 text-right pr-12">
                  <div className="flex justify-end">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border",
                        item.status === "Ativo"
                          ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                          : "bg-gray-50 text-gray-400 border-gray-200",
                      )}
                    >
                      {item.status === "Ativo" && (
                        <Check className="w-3 h-3 stroke-[3px]" />
                      )}
                      {item.status}
                    </span>
                  </div>
                </TableCell>

                {/* Ações compactas */}
                <TableCell className="py-5 px-6 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1.5 text-slate-300 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-all outline-none border border-transparent">
                        <MoreHorizontal size={18} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-40 bg-white rounded-xl shadow-xl border-gray-100 p-1 z-[100]"
                    >
                      <DropdownMenuItem
                        onClick={() => onEdit(item)}
                        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 focus:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                      >
                        <Pencil size={14} className="text-gray-900" /> Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDelete(item.id)}
                        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-rose-500 focus:bg-rose-50 focus:text-rose-600 rounded-lg cursor-pointer transition-colors"
                      >
                        <Trash2 size={14} className="w-4 h-4" /> Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Rodapé Externo conforme StakeholderTable */}
      <div className="py-6 text-left">
        <span className="text-[13px] font-normal text-slate-400">
          Mostrando {data.length} de {data.length} departamentos
        </span>
      </div>
    </div>
  );
};
