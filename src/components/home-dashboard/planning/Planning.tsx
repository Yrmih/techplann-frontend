"use client";

import { useState } from "react";
import { Plus, FileText, Search } from "lucide-react";
import Link from "next/link";
import { PlanningTable } from "./PlanningTable";
import { EmptyPlanning } from "./EmptyPlanning";

export default function Planning() {
  const [plannings, setPlannings] = useState([
    { id: 1, nome: "Planejamento Estratégico 2025", cliente: "BC Development", projetos: 4, status: "ATIVO" },
    { id: 2, nome: "Planejamento Comercial Q1", cliente: "ACME LTDA", projetos: 2, status: "ATIVO" },
    { id: 3, nome: "Planejamento Estratégico 2023-2025", cliente: "Delta LTDA", projetos: 8, status: "CONCLUÍDO" },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Planejamentos</h1>
          <p className="text-gray-500 text-sm">Gerencie os planejamentos estratégicos</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 shadow-sm transition-all">
            <FileText size={16} /> Relatório
          </button>
          <Link href="/dashboard/planning/new">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#10b981] text-white rounded-xl text-xs font-bold hover:bg-[#0da673] shadow-lg shadow-emerald-100/50 transition-all">
              <Plus size={16} /> Novo Planejamento
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden min-h-[400px]">
        {plannings.length > 0 ? (
          <>
            <div className="p-6 border-b border-gray-50 flex justify-between items-center">
              <h3 className="font-bold text-gray-800">Lista de Planejamentos</h3>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text"
                  placeholder="Buscar planejamentos..."
                  className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:border-[#10b981] w-64 transition-all"
                />
              </div>
            </div>
            <PlanningTable data={plannings} />
          </>
        ) : (
          <EmptyPlanning />
        )}
      </div>
    </div>
  );
}