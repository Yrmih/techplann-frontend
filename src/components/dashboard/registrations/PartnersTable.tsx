"use client";


import { 
  Printer,
  Search, 
  MoreHorizontal, 
  CheckCircle2, 
  XCircle,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import { PartnerFormModal } from "./PartnerFormModal";

// Simulando a estrutura do shadcn DataTable
export default function PartnersTable() {
  const partners = [
    { id: "1", name: "ACME LTDA", status: "Ativo" },
    { id: "2", name: "BC GESTÃO", status: "Ativo" },
    { id: "3", name: "DELTA LTDA", status: "Ativo" },
    { id: "4", name: "DISMELO DISTRIBUIDORA LTDA", status: "Ativo" },
    { id: "5", name: "DL DISTRIBUIDORA", status: "Ativo" },
    { id: "6", name: "OLINDA DISTRIBUIDORA", status: "Inativo" },
    { id: "7", name: "TECHSYS BRASIL", status: "Ativo" },
    { id: "8", name: "SETE COMPANY", status: "Ativo" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
     
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Parceiros</h1>
          <p className="text-gray-500 font-medium">Gerencie os parceiros cadastrados no sistema</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 shadow-sm transition-all">
            <Printer size={18} /> Imprimir
          </button>
          < PartnerFormModal/>
        </div>
      </div>

     
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        
       
        <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-white">
          <h2 className="font-bold text-gray-900">Lista de Parceiros</h2>
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Filtrar parceiros..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] transition-all"
            />
          </div>
        </div>

        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-[11px] uppercase font-bold text-gray-400 tracking-widest border-b border-gray-50">
                <th className="px-8 py-4">Parceiro</th>
                <th className="px-8 py-4 text-right">Situação</th>
                <th className="px-8 py-4 w-20"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {partners.map((partner) => (
                <tr key={partner.id} className="group hover:bg-gray-50/40 transition-colors">
                  <td className="px-8 py-4 font-bold text-gray-700 group-hover:text-[#10b981] transition-colors">
                    {partner.name}
                  </td>
                  <td className="px-8 py-4">
                    <div className="flex justify-end">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${
                        partner.status === "Ativo" 
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
                          : "bg-gray-100 text-gray-500 border border-gray-200"
                      }`}>
                        {partner.status === "Ativo" ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                        {partner.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-4 text-center">
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
            Mostrando <strong>8</strong> de <strong>42</strong> parceiros
          </span>
          <div className="flex items-center gap-2">
            <button className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:bg-white hover:text-gray-900 disabled:opacity-50 transition-all" disabled>
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-1">
              {[1, 2, 3].map((page) => (
                <button 
                  key={page}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                    page === 1 ? "bg-[#10b981] text-white shadow-sm" : "bg-white border border-gray-200 text-gray-600 hover:border-[#10b981]"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:bg-white hover:text-gray-900 transition-all">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}