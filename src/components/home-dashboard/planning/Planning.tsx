"use client";

import { useState } from "react";
import { Plus, FileText, Search } from "lucide-react";
import { PlanningTable } from "./PlanningTable";
import { EmptyPlanning } from "./EmptyPlanning";
import { NewPlanningForm } from "./NewPlanningForm";
import { IPlanning } from "@/types/interfaces/planning.interface";

export default function Planning() {
  const [view, setView] = useState<"list" | "form">("list");
  const [searchTerm, setSearchTerm] = useState("");

  // Estado tipado corretamente para evitar erros de compilação
  const [editingPlanning, setEditingPlanning] = useState<IPlanning | null>(
    null,
  );

  // Dados iniciais formatados em Title Case conforme a nova regra
  const [plannings, setPlannings] = useState<IPlanning[]>([
    {
      id: 1,
      nome: "Planejamento Estratégico de Expansão Digital 2026",
      cliente: "BC Development S/S LTDA",
      projetos: 4,
      status: "ATIVO",
    },
    {
      id: 2,
      nome: "Planejamento Comercial Q1",
      cliente: "Acme LTDA",
      projetos: 2,
      status: "ATIVO",
    },
    {
      id: 3,
      nome: "Planejamento Estratégico 2023-2025",
      cliente: "Delta LTDA",
      projetos: 8,
      status: "CONCLUÍDO",
    },
  ]);

  const handleEdit = (item: IPlanning) => {
    setEditingPlanning(item);
    setView("form");
  };

  const handleDelete = (id: number | string) => {
    // Mantendo o confirm nativo conforme solicitado até a aprovação do chefe
    if (
      window.confirm(
        "Deseja realmente excluir este planejamento? Esta ação é irreversível.",
      )
    ) {
      setPlannings((prev) => prev.filter((p) => p.id !== id));
    }
  };

  // Lógica de filtro para a busca
  const filteredPlannings = plannings.filter(
    (p) =>
      p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.cliente.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Renderização condicional do formulário
  if (view === "form") {
    return (
      <NewPlanningForm
        initialData={editingPlanning}
        onBack={() => {
          setView("list");
          setEditingPlanning(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-8 p-8 max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-3 duration-500 font-sans">
      {/* Header do Planejamento */}
      <div className="flex justify-between items-start">
        <div className="text-left">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight text-left">
            Planejamentos
          </h1>
          <p className="text-gray-500 font-medium mt-1 text-left text-sm">
            Gerencie os planejamentos estratégicos da organização
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 shadow-sm transition-all uppercase tracking-wider">
            <FileText size={16} /> Relatório Gerencial
          </button>
          <button
            onClick={() => {
              setEditingPlanning(null);
              setView("form");
            }}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#10b981] text-white rounded-xl text-xs font-black hover:bg-[#0da673] shadow-lg shadow-emerald-100 transition-all uppercase tracking-widest active:scale-95"
          >
            <Plus size={16} strokeWidth={3} /> Novo Planejamento
          </button>
        </div>
      </div>

      {/* Área da Tabela ou Estado Vazio */}
      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden min-h-[500px]">
        {plannings.length > 0 ? (
          <>
            <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/20">
              <h3 className="font-black text-gray-900 text-[10px] uppercase tracking-[2px]">
                Lista de Registros ({filteredPlannings.length})
              </h3>
              <div className="relative w-80 group">
                <Search
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#10b981] transition-colors"
                />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Pesquisar por nome ou cliente..."
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs font-medium outline-none focus:border-[#10b981] focus:ring-4 focus:ring-emerald-50 transition-all"
                />
              </div>
            </div>
            <PlanningTable
              data={filteredPlannings} // Passando os dados filtrados
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
