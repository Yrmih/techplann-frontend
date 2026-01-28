"use client";

import * as React from "react";
import { 
  FileText, 
  Plus, 
  Search, 
  MoreHorizontal, 
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link"; 

export const PlanningTable = () => {
  // Dados simulados com base na imagem
  const plannings = [
    { id: "1", name: "Planejamento Estratégico 2025", client: "BC Development", projects: 4, status: "Ativo" },
    { id: "2", name: "Planejamento Comercial Q1", client: "ACME LTDA", projects: 2, status: "Ativo" },
    { id: "3", name: "Planejamento Estratégico 2023-2025", client: "Delta LTDA", projects: 8, status: "Concluído" },
    { id: "4", name: "Planejamento TechSys Brasil - 2025", client: "TechSys Brasil", projects: 3, status: "Ativo" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Planejamentos</h1>
          <p className="text-gray-500 font-medium text-sm">Gerencie os planejamentos estratégicos</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 shadow-sm transition-all">
            <FileText size={18} /> Relatório
          </button>
          
        
          <Link href="/dashboard/planning/new">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#10b981] text-white rounded-lg text-sm font-bold hover:bg-[#0da673] shadow-sm shadow-emerald-100 transition-all active:scale-95">
              <Plus size={18} /> Novo Planejamento
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        {/* Barra de Busca */}
        <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-white">
          <h2 className="font-bold text-gray-900">Lista de Planejamentos</h2>
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar planejamentos..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] transition-all"
            />
          </div>
        </div>

       
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-[11px] uppercase font-bold text-gray-400 tracking-widest border-b border-gray-50">
                <th className="px-8 py-4">Nome</th>
                <th className="px-8 py-4">Cliente</th>
                <th className="px-8 py-4 text-center">Projetos</th>
                <th className="px-8 py-4 text-center">Status</th>
                <th className="px-8 py-4 w-20"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {plannings.map((plan) => (
                <tr key={plan.id} className="group hover:bg-gray-50/40 transition-colors">
                  <td className="px-8 py-4 font-bold text-gray-700 group-hover:text-[#10b981] transition-colors">
                    {plan.name}
                  </td>
                  <td className="px-8 py-4 text-sm text-gray-500 font-medium">
                    {plan.client}
                  </td>
                  <td className="px-8 py-4 text-center">
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-md text-xs font-bold border border-gray-200">
                      {plan.projects}
                    </span>
                  </td>
                  <td className="px-8 py-4 text-center">
                    <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight border ${
                      plan.status === "Ativo" 
                        ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                        : "bg-gray-100 text-gray-400 border-gray-200"
                    }`}>
                      {plan.status}
                    </span>
                  </td>
                  <td className="px-8 py-4 text-right">
                    <button className="text-gray-300 hover:text-gray-900 p-1 rounded-md transition-colors">
                      <MoreHorizontal size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

       
        <div className="p-6 border-t border-gray-50 flex items-center justify-between bg-gray-50/20">
          <span className="text-xs text-gray-400 font-medium">
            Mostrando <strong>{plannings.length}</strong> planejamentos
          </span>
          <div className="flex items-center gap-2">
            <button className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:bg-white hover:text-gray-900 transition-all">
              <ChevronLeft size={16} />
            </button>
            <button className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:bg-white hover:text-gray-900 transition-all">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};