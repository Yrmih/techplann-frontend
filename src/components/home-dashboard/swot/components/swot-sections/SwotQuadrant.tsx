"use client";

import { useState, useMemo } from "react";
import { SwotItem, SwotTipo } from "@/hooks/useSwot";
import {
  Plus,
  Pencil,
  Trash2,
  Shield,
  Target,
  TrendingUp,
  AlertTriangle,
  Loader2,
  ArrowUpDown,
} from "lucide-react";
import { cn } from "@/lib/utils/utils";

interface SwotQuadrantProps {
  tipo: SwotTipo;
  items: SwotItem[];
  total: number;
  onAdd: () => void;
  onEdit: (item: SwotItem) => void;
  onDelete: (item: SwotItem) => void;
  isLoading?: boolean;
}

const tipoConfig = {
  forca: {
    label: "Forças",
    icon: Shield,
    theme: "bg-emerald-50 border-emerald-100 text-emerald-700",
    header: "bg-[#10b981]",
    accent: "text-emerald-600",
  },
  fraqueza: {
    label: "Fraquezas",
    icon: AlertTriangle,
    theme: "bg-rose-50 border-rose-100 text-rose-700",
    header: "bg-[#f43f5e]",
    accent: "text-rose-600",
  },
  oportunidade: {
    label: "Oportunidades",
    icon: TrendingUp,
    theme: "bg-blue-50 border-blue-100 text-blue-700",
    header: "bg-[#3b82f6]",
    accent: "text-blue-600",
  },
  ameaca: {
    label: "Ameaças",
    icon: Target,
    theme: "bg-amber-50 border-amber-100 text-amber-700",
    header: "bg-[#f59e0b]",
    accent: "text-amber-600",
  },
};

export const SwotQuadrant = ({
  tipo,
  items,
  total,
  onAdd,
  onEdit,
  onDelete,
  isLoading,
}: SwotQuadrantProps) => {
  const config = tipoConfig[tipo];
  const Icon = config.icon;

  // ESTADOS DE ORDENAÇÃO
  const [sortBy, setSortBy] = useState<"created" | "pontuacao">("pontuacao");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // LÓGICA DE ORDENAÇÃO ATIVA
  const sortedItems = useMemo(() => {
    const sorted = [...items];

    if (sortBy === "pontuacao") {
      sorted.sort((a, b) => b.pontuacao - a.pontuacao);
    } else {
      // Ordenação por data (mockada ou vinda do created_at)
      sorted.sort((a, b) => b.id.localeCompare(a.id));
    }

    if (sortDirection === "asc") sorted.reverse();
    return sorted;
  }, [items, sortBy, sortDirection]);

  // FUNÇÕES PARA ALTERNAR ORDENAÇÃO (USANDO OS SETTERS)
  const toggleSortScore = () => {
    if (sortBy === "pontuacao") {
      setSortDirection((prev) => (prev === "desc" ? "asc" : "desc"));
    } else {
      setSortBy("pontuacao");
      setSortDirection("desc");
    }
  };

  const toggleSortDescription = () => {
    setSortBy("created");
    setSortDirection((prev) => (prev === "desc" ? "asc" : "desc"));
  };

  return (
    <div
      className={cn(
        "rounded-[32px] border-2 flex flex-col shadow-sm overflow-hidden min-h-[450px]",
        config.theme,
      )}
    >
      {/* HEADER SÓLIDO PREMIUM */}
      <div
        className={cn(
          "p-6 text-white flex items-center justify-between shadow-md",
          config.header,
        )}
      >
        <div className="flex items-center gap-3">
          <Icon size={20} strokeWidth={3} />
          <h4 className="text-[13px] font-black uppercase tracking-[2px]">
            {config.label}
          </h4>
        </div>
        <button
          onClick={onAdd}
          className="bg-white/20 hover:bg-white/30 p-2.5 rounded-xl transition-all active:scale-95"
        >
          <Plus size={20} strokeWidth={3} />
        </button>
      </div>

      {/* ÁREA DA TABELA */}
      <div className="flex-1 flex flex-col">
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin opacity-20" />
          </div>
        ) : items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center opacity-30 p-10">
            <Icon size={48} strokeWidth={1.5} className="mb-3" />
            <p className="text-[10px] font-black uppercase tracking-widest text-center">
              Nenhum fator cadastrado
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-black/5">
                  <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest opacity-40">
                    <button
                      onClick={toggleSortDescription}
                      className="flex items-center gap-1 hover:opacity-100 transition-opacity"
                    >
                      Descrição{" "}
                      {sortBy === "created" && <ArrowUpDown size={12} />}
                    </button>
                  </th>
                  <th className="py-4 px-4 text-center text-[10px] font-black uppercase tracking-widest opacity-40 w-24">
                    <button
                      onClick={toggleSortScore}
                      className="flex items-center gap-1 mx-auto hover:opacity-100 transition-opacity"
                    >
                      GUT{" "}
                      <ArrowUpDown
                        size={12}
                        className={cn(sortBy === "pontuacao" && "text-current")}
                      />
                    </button>
                  </th>
                  <th className="py-4 px-6 text-right w-20"></th>
                </tr>
              </thead>
              <tbody>
                {sortedItems.map((item) => (
                  <tr
                    key={item.id}
                    className="group border-b border-black/5 hover:bg-white/40 transition-colors"
                  >
                    <td className="py-4 px-6 text-left">
                      <div className="flex flex-col">
                        <span className="text-[13px] font-bold text-slate-800 leading-tight">
                          {item.titulo}
                        </span>
                        {item.descricao && (
                          <span className="text-[10px] text-slate-500 font-medium truncate max-w-[200px] mt-1 italic">
                            {item.descricao}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span
                        className={cn("text-[15px] font-black", config.accent)}
                      >
                        {item.pontuacao}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => onEdit(item)}
                          className="p-1.5 hover:bg-white rounded-lg text-slate-400 hover:text-slate-900 transition-all"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => onDelete(item)}
                          className="p-1.5 hover:bg-rose-50 rounded-lg text-rose-400 transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* FOOTER COM TOTALIZADOR */}
      <div className="px-6 py-5 bg-black/5 border-t border-black/5 flex justify-between items-center">
        <span className="text-[10px] font-black opacity-50 uppercase tracking-[1.5px]">
          Soma Estratégica
        </span>
        <span className={cn("text-[18px] font-black", config.accent)}>
          {total} <span className="text-[10px] opacity-50">PTS</span>
        </span>
      </div>
    </div>
  );
};
