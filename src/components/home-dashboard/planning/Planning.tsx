"use client";

import { useState } from "react";
import { Plus, Search, Printer } from "lucide-react";
import { PlanningTable } from "./components/table/PlanningTable";
import { EmptyPlanning } from "./EmptyPlanning";
import { NewPlanningForm } from "./components/form/NewPlanningForm";
import { IPlanning } from "@/types/interfaces/planning.interface";
import { Input } from "@/components/ui/input";

export default function Planning() {
  const [view, setView] = useState<"list" | "form">("list");
  const [searchTerm, setSearchTerm] = useState("");

  const [editingPlanning, setEditingPlanning] = useState<IPlanning | null>(
    null,
  );

  const [plannings, setPlannings] = useState<IPlanning[]>([
    {
      id: 1,
      nome: "Planejamento Estratégico de Expansão Digital 2026",
      cliente: "BC Development S/S LTDA",
      projetos: 4,
      status: "Ativo",
    },
    {
      id: 2,
      nome: "Planejamento Comercial Q1",
      cliente: "Acme LTDA",
      projetos: 2,
      status: "Ativo",
    },
    {
      id: 3,
      nome: "Planejamento Estratégico 2023-2025",
      cliente: "Delta LTDA",
      projetos: 8,
      status: "Concluído",
    },
  ]);

  const handleFormSubmit = (data: IPlanning) => {
    setPlannings((prev) => {
      const exists = prev.find((p) => p.id === data.id);
      if (exists) {
        return prev.map((p) => (p.id === data.id ? data : p));
      } else {
        return [data, ...prev];
      }
    });

    setView("list");
    setEditingPlanning(null);
  };

  const handleEdit = (item: IPlanning) => {
    setEditingPlanning(item);
    setView("form");
  };

  const handleDelete = (id: number | string) => {
    if (
      window.confirm(
        "Deseja realmente excluir este planejamento? Esta ação é irreversível.",
      )
    ) {
      setPlannings((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const filteredPlannings = plannings.filter(
    (p) =>
      p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.cliente.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (view === "form") {
    return (
      <NewPlanningForm
        initialData={editingPlanning}
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
            <Printer size={18} className="text-slate-900" /> Relatório
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
        {plannings.length > 0 ? (
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
