"use client";

import { useState } from "react";
import { Plus, Search, Printer } from "lucide-react";
import { PlanningTable } from "./components/table/PlanningTable";
import { EmptyPlanning } from "./EmptyPlanning";
import { NewPlanningForm } from "./components/form/NewPlanningForm";
import { IPlanning } from "@/types/interfaces/planning.interface";
import { Input } from "@/components/ui/input";

import { usePlanejamentos, Planejamento } from "@/hooks/usePlanejamentos";

export default function Planning() {
  // Consumindo o Hook mockado
  const { planejamentos, isLoading, createPlanejamento, deletePlanejamento } =
    usePlanejamentos();

  const [view, setView] = useState<"list" | "form">("list");
  const [searchTerm, setSearchTerm] = useState("");

  const [editingPlanning, setEditingPlanning] = useState<Planejamento | null>(
    null,
  );

  // 1. MAPEAMENTO SEGURO: Converte Planejamento (Hook) -> IPlanning (Tabela)
  // Isso garante que o TypeScript valide cada campo
  const mappedPlannings: IPlanning[] = planejamentos.map((p) => ({
    id: p.id,
    nome: p.nome,
    cliente:
      p.parceiros_nomes && p.parceiros_nomes.length > 0
        ? p.parceiros_nomes.join(", ")
        : "Sem parceiros vinculados",
    projetos: 0, // Valor mockado, será substituído pelo count do Laravel
    status: p.status,
  }));

  // 2. HANDLER DE SUBMIT TIPADO
  // Aqui assumimos que o formulário retorna dados compatíveis com IPlanning ou Planejamento
  const handleFormSubmit = (data: IPlanning) => {
    createPlanejamento({
      nome: data.nome,
      status: "Ativo",
      // Aqui você pode adicionar outros campos conforme seu form crescer
    });

    setView("list");
    setEditingPlanning(null);
  };

  const handleEdit = (item: IPlanning) => {
    // Busca o objeto original do hook para garantir que o formulário tenha todos os dados (como datas e descrição)
    const fullItem = planejamentos.find((p) => p.id === item.id) || null;
    setEditingPlanning(fullItem);
    setView("form");
  };

  const handleDelete = (id: string | number) => {
    if (
      window.confirm(
        "Deseja realmente excluir este planejamento? Esta ação é irreversível.",
      )
    ) {
      deletePlanejamento(id.toString());
    }
  };

  const filteredPlannings = mappedPlannings.filter(
    (p) =>
      p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.cliente.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (view === "form") {
    return (
      <NewPlanningForm
        initialData={editingPlanning} // Agora tipado como Planejamento | null
        onBack={() => {
          setView("list");
          setEditingPlanning(null);
        }}
        onSubmitSuccess={handleFormSubmit}
      />
    );
  }

  return (
    <div className="space-y-8 p-8 max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-3 duration-500 font-sans text-left">
      <header className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Planejamentos
          </h1>
          <p className="text-slate-500 font-medium mt-1 text-sm">
            Gerencie os planejamentos estratégicos
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
            <Printer size={18} className="text-slate-900" /> Imprimir
          </button>

          <button
            onClick={() => {
              setEditingPlanning(null);
              setView("form");
            }}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#10b981] text-white rounded-lg text-sm font-semibold hover:bg-[#0da673] transition-colors shadow-sm active:scale-95"
          >
            <Plus size={18} strokeWidth={2.5} /> Novo Planejamento
          </button>
        </div>
      </header>

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden min-h-[500px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-[500px] text-slate-400 font-medium">
            <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4" />
            Carregando planejamentos...
          </div>
        ) : mappedPlannings.length > 0 ? (
          <>
            <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/20">
              <h3 className="font-bold text-slate-900 text-[16px] tracking-tight">
                Lista de Planejamentos ({filteredPlannings.length})
              </h3>

              <div className="relative w-80 group">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#10b981] transition-colors"
                />
                <Input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Pesquisar planejamentos..."
                  className="w-full pl-10 pr-4 h-10 bg-white border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-emerald-50 focus:border-[#10b981] transition-all shadow-sm"
                />
              </div>
            </div>

            <PlanningTable
              data={filteredPlannings}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </>
        ) : (
          <EmptyPlanning />
        )}
      </div>
    </div>
  );
}
