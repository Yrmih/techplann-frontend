"use client";

import { SwotItem } from "@/hooks/useSwot";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { FolderKanban, User, Hash, Target, SearchX } from "lucide-react";
import { cn } from "@/lib/utils/utils";

// Interface rigorosa para os projetos que virão do Backend (Laravel)
export interface ProjetoComSwot {
  id: string;
  nome: string;
  codigo: number;
  status: string;
  responsavel: string | null;
  swotItems: SwotItem[];
  andamentoMedio: number;
}

interface CrossSwotProjectsProps {
  swotItems: SwotItem[];
}

// Simulando o Hook que consumirá o Laravel (Para não sujar o componente)
// Depois você deve criar este arquivo em @/hooks/useCrossSwotProjects.ts
const useCrossSwotProjects = (swotItems: SwotItem[]) => {
  // Aqui no futuro você fará o fetch para o seu endpoint Laravel
  // Por enquanto, retornamos vazio para seguir o fluxo do MVP
  return {
    projetos: [] as ProjetoComSwot[],
    isLoading: false,
  };
};

const statusColors: Record<string, string> = {
  "Não Iniciado": "bg-slate-100 text-slate-600 border-slate-200",
  "Em Andamento": "bg-blue-50 text-blue-700 border-blue-100",
  Concluído: "bg-emerald-50 text-emerald-700 border-emerald-100",
  Pausado: "bg-amber-50 text-amber-700 border-amber-100",
  Cancelado: "bg-rose-50 text-rose-700 border-rose-100",
};

const tipoColors: Record<string, string> = {
  forca: "text-emerald-600 border-emerald-100 bg-emerald-50",
  fraqueza: "text-rose-600 border-rose-100 bg-rose-50",
  oportunidade: "text-blue-600 border-blue-100 bg-blue-50",
  ameaca: "text-amber-600 border-amber-100 bg-amber-50",
};

export const CrossSwotProjects = ({ swotItems }: CrossSwotProjectsProps) => {
  const { projetos, isLoading } = useCrossSwotProjects(swotItems);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-xl" />
          <Skeleton className="h-6 w-48" />
        </div>
        <Skeleton className="h-48 w-full rounded-[32px]" />
      </div>
    );
  }

  if (projetos.length === 0) {
    return (
      <div className="bg-white border-2 border-dashed border-slate-100 rounded-[32px] p-16 text-center shadow-sm">
        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-300">
          <SearchX size={32} />
        </div>
        <h4 className="text-[13px] font-black text-slate-900 uppercase tracking-widest text-center">
          Nenhum Projeto Vinculado
        </h4>
        <p className="text-slate-400 font-bold uppercase text-[9px] tracking-[2px] mt-2 max-w-xs mx-auto leading-relaxed text-center">
          Vincule projetos aos itens SWOT na gestão operacional para visualizar
          o impacto estratégico aqui.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-left">
          <div className="p-3 rounded-2xl bg-slate-900 text-white shadow-lg">
            <FolderKanban size={24} strokeWidth={2.5} />
          </div>
          <div className="text-left">
            <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase leading-none">
              Mural de Execução
            </h3>
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[2px] mt-1.5 text-left">
              Projetos Operacionais vs Estratégia
            </p>
          </div>
        </div>
        <Badge
          variant="secondary"
          className="h-8 rounded-xl font-black px-4 text-[11px] bg-slate-100 text-slate-600 border-none"
        >
          {projetos.length} PROJETOS
        </Badge>
      </div>

      <div className="bg-white border border-slate-100 rounded-[32px] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900">
              <tr>
                <th className="px-6 py-4 text-left text-[10px] font-black text-white uppercase tracking-widest w-24">
                  Code
                </th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-white uppercase tracking-widest">
                  Projeto & Squad
                </th>
                <th className="px-6 py-4 text-center text-[10px] font-black text-white uppercase tracking-widest w-32">
                  Status
                </th>
                <th className="px-6 py-4 text-center text-[10px] font-black text-white uppercase tracking-widest w-40">
                  Performance
                </th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-white uppercase tracking-widest">
                  Impacto SWOT
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {projetos.map((projeto) => (
                <tr
                  key={projeto.id}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="px-6 py-5 text-left">
                    <span className="flex items-center gap-1 font-mono text-[11px] font-black text-slate-400">
                      <Hash size={10} /> {projeto.codigo}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-left">
                    <div className="flex flex-col gap-1 text-left">
                      <span className="text-[13px] font-black text-slate-800 uppercase tracking-tighter leading-none group-hover:text-indigo-600 transition-colors text-left">
                        {projeto.nome}
                      </span>
                      <div className="flex items-center gap-1.5 text-slate-400 text-left">
                        <User size={12} strokeWidth={2.5} />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-left">
                          {projeto.responsavel || "Sem Gestor"}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <Badge
                      className={cn(
                        "text-[9px] font-black uppercase tracking-widest border-2 shadow-none",
                        statusColors[projeto.status],
                      )}
                      variant="outline"
                    >
                      {projeto.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-5">
                    <div className="space-y-1.5 px-2">
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-tighter">
                        <span className="text-slate-400">Progresso</span>
                        <span className="text-slate-900">
                          {projeto.andamentoMedio}%
                        </span>
                      </div>
                      <Progress
                        value={projeto.andamentoMedio}
                        className="h-2 bg-slate-100"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-5 text-left">
                    <div className="flex flex-wrap gap-1.5 justify-start">
                      {projeto.swotItems.map((item) => (
                        <div
                          key={item.id}
                          className={cn(
                            "px-2 py-1 rounded-lg border-2 text-[9px] font-black uppercase tracking-tighter flex items-center gap-1",
                            tipoColors[item.tipo],
                          )}
                        >
                          <Target size={10} strokeWidth={3} />
                          {item.tipo}
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
