"use client";

import { useState } from "react";
import { Plus, FileText, Search } from "lucide-react";
import Link from "next/link";
import { PlanningTable } from "./PlanningTable";
import { EmptyPlanning } from "./EmptyPlanning";

export default function Planning() {
  const [plannings] = useState([
    { id: 1, nome: "Planejamento Estratégico 2025", cliente: "BC Development", projetos: 4, status: "ATIVO" },
    { id: 2, nome: "Planejamento Comercial Q1", cliente: "ACME LTDA", projetos: 2, status: "ATIVO" },
    { id: 3, nome: "Planejamento Estratégico 2023-2025", cliente: "Delta LTDA", projetos: 8, status: "CONCLUÍDO" },
  ]);

  return (
    <div className="space-y-8 p-8 max-w-[1600px] mx-auto">
      <div className="flex justify-between items-start">
        <div className="text-left">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Planejamentos</h1>
          <p className="text-gray-500 font-medium mt-1">Gerencie os planejamentos estratégicos da organização</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 shadow-sm transition-all">
            <FileText size={16} /> Relatório Gerencial
          </button>
          <Link href="/dashboard/planning/new">
            <button className="flex items-center gap-2 px-6 py-2.5 bg-[#10b981] text-white rounded-xl text-xs font-black hover:bg-[#0da673] shadow-lg shadow-emerald-100 transition-all uppercase tracking-wider">
              <Plus size={16} strokeWidth={3} /> Novo Planejamento
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden min-h-[500px]">
        {plannings.length > 0 ? (
          <>
            <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/20">
              <h3 className="font-black text-gray-900 text-sm uppercase tracking-wider">Lista de Registros</h3>
              <div className="relative w-80">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text"
                  placeholder="Pesquisar por nome ou cliente..."
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs font-medium outline-none focus:border-[#10b981] focus:ring-4 focus:ring-emerald-50 transition-all"
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