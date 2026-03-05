"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Search, 
  ChevronDown, 
  ClipboardList, 
  Check, 
  X, 
  FolderOpen, 
  ListTodo, 
  FileStack,
  FolderKanban
} from "lucide-react";

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [toast, setToast] = useState<{ message: string } | null>(null);

  const showToast = (message: string) => {
    setToast({ message });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="space-y-8 pb-10 relative min-h-screen bg-gray-50/30">
      
      {/* Toast Notification - Padronizado conforme image_224304.png */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="fixed bottom-10 right-10 z-[100] bg-[#050b18] border border-slate-800 text-white px-5 py-4 rounded-xl shadow-2xl flex items-center gap-4 min-w-[300px] justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="bg-[#10b981] rounded-full p-1.5 flex items-center justify-center">
                <Check size={14} className="text-white stroke-[3px]" />
              </div>
              <span className="text-sm font-bold tracking-tight">{toast.message}</span>
            </div>
            <button onClick={() => setToast(null)} className="text-slate-500 hover:text-white transition-colors">
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Banner Superior com Gradiente - Idêntico ao image_2159cb.png */}
      <div className="relative w-full h-48 bg-gradient-to-r from-[#10b981] via-[#10b981] to-[#3b82f6] rounded-3xl p-10 flex flex-col justify-between shadow-lg shadow-emerald-100/20 overflow-hidden">
        {/* Detalhe de luz abstrato ao fundo */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        
        <div className="flex justify-between items-start relative z-10">
          <div className="text-left">
            <h1 className="text-4xl font-black text-white tracking-tight leading-none mb-2">Projetos</h1>
            <p className="text-emerald-50 text-sm font-medium opacity-90 tracking-tight">Gerencie projetos, atividades e sub-atividades com foco total em resultados</p>
          </div>
          
          <button 
            onClick={() => showToast("Funcionalidade em desenvolvimento")}
            className="flex items-center gap-2 bg-[#059669] hover:bg-[#047857] text-white px-6 py-3 rounded-2xl font-black text-sm transition-all shadow-xl active:scale-95"
          >
            <Plus size={18} strokeWidth={3} /> NOVO PROJETO
          </button>
        </div>
      </div>

      {/* Filtros e Busca conforme image_2159cb.png */}
      <div className="px-2 space-y-6">
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Seletor de Planejamento Unificado */}
          <div className="flex items-center bg-white border border-gray-100 p-1.5 rounded-2xl shadow-sm min-w-[280px]">
            <div className="text-[#10b981] pl-2">
              <ClipboardList size={22} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col flex-1 px-4 text-left">
              <span className="text-sm font-black text-gray-700">Expansão Regional 2026</span>
            </div>
            <ChevronDown size={18} className="text-gray-300 px-2" />
          </div>

          {/* Input de Busca */}
          <div className="relative flex-1 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#10b981] transition-colors" size={18} />
            <input 
              type="text"
              placeholder="Buscar projetos pela descrição ou nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-14 pl-14 pr-6 bg-white border border-gray-100 rounded-2xl text-sm font-bold text-gray-600 outline-none focus:border-[#10b981] transition-all shadow-sm shadow-gray-100/50"
            />
          </div>
        </div>

        {/* Estado Vazio Central - Idêntico ao image_2159cb.png */}
        <div className="bg-white rounded-[40px] border border-gray-100/50 p-24 flex flex-col items-center justify-center space-y-6 text-center shadow-sm">
          <div className="bg-gray-50 p-6 rounded-[32px]">
            <FolderKanban size={56} className="text-gray-200" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-black text-gray-400 tracking-tight">Nenhum projeto encontrado</h3>
            <p className="text-xs text-gray-300 font-bold uppercase tracking-widest">Crie o primeiro projeto para começar!</p>
          </div>
        </div>

        {/* Legenda conforme image_2159cb.png */}
        <div className="flex items-center gap-6 px-4">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Legenda:</span>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
            <span className="text-[10px] font-bold text-gray-500 bg-[#fef3c7] px-3 py-1 rounded-full border border-[#fef3c7]">Abaixo de 50%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
            <span className="text-[10px] font-bold text-gray-500 bg-[#dcfce7] px-3 py-1 rounded-full border border-[#dcfce7]">Acima de 50%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#3b82f6]" />
            <span className="text-[10px] font-bold text-gray-500 bg-[#dbeafe] px-3 py-1 rounded-full border border-[#dbeafe]">Igual a 100%</span>
          </div>
        </div>

        {/* Listagem das Entidades na parte inferior - image_2159cb.png */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card Projetos */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col min-h-[160px]">
            <div className="p-4 border-b border-gray-50 flex items-center gap-3">
              <div className="p-2 bg-emerald-50 text-[#10b981] rounded-lg">
                <FolderOpen size={18} />
              </div>
              <span className="text-sm font-black text-gray-700 tracking-tight">Projetos</span>
            </div>
            <div className="flex-1 flex items-center justify-center p-6 italic">
              <span className="text-[11px] text-gray-300 font-bold tracking-tight">Nenhum item encontrado</span>
            </div>
          </div>

          {/* Card Atividades */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col min-h-[160px]">
            <div className="p-4 border-b border-gray-100 flex items-center gap-3">
              <div className="p-2 bg-emerald-50 text-[#10b981] rounded-lg">
                <ListTodo size={18} />
              </div>
              <span className="text-sm font-black text-gray-700 tracking-tight">Atividades</span>
            </div>
            <div className="flex-1 flex items-center justify-center p-6 italic">
              <span className="text-[11px] text-gray-300 font-bold tracking-tight">Nenhum item encontrado</span>
            </div>
          </div>

          {/* Card Sub-atividades */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col min-h-[160px]">
            <div className="p-4 border-b border-gray-100 flex items-center gap-3">
              <div className="p-2 bg-emerald-50 text-[#10b981] rounded-lg">
                <FileStack size={18} />
              </div>
              <span className="text-sm font-black text-gray-700 tracking-tight">Sub Atividades</span>
            </div>
            <div className="flex-1 flex items-center justify-center p-6 italic">
              <span className="text-[11px] text-gray-300 font-bold tracking-tight">Nenhum item encontrado</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}