"use client";

import { useState } from "react";
import { TrendingUp, ShieldAlert, Lightbulb, AlertCircle, Search } from "lucide-react";
import { CustomSelect } from "@/components/ui/custom/CustomSelect";
import { SwotCreateModal } from "./SwotCreateModal";
import { SwotCreateValues } from "@/lib/validators/swot.schema";

export const SwotAnalysisPage = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isCruzada, setIsCruzada] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeSwot, setActiveSwot] = useState<SwotCreateValues | null>(null);

  const handleInit = (data: SwotCreateValues) => {
    setActiveSwot(data);
    setIsInitialized(true);
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-8 p-8 max-w-[1600px] mx-auto min-h-screen">
      {/* Header com Filtros e Selects */}
      <header className="flex flex-col md:flex-row justify-between items-end gap-6 bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full text-left">
          <CustomSelect 
            label="Análise SWOT" 
            placeholder="Selecione ou crie..." 
            options={[{ value: "new", label: "+ Nova Análise" }]} 
            onValueChange={(val) => val === "new" && setShowCreateModal(true)}
          />
          <CustomSelect label="Planejamento" placeholder="Selecione..." options={[]} onValueChange={() => {}} />
          <CustomSelect label="Empresa" placeholder="Selecione..." options={[]} onValueChange={() => {}} />
          <div className="space-y-2">
             <label className="text-sm font-medium text-gray-700">Filtrar</label>
             <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input placeholder="Buscar..." className="w-full pl-10 h-11 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-[#10b981]" />
             </div>
          </div>
        </div>
      </header>

      {!isInitialized ? (
        /* Estado Zerado */
        <div className="flex flex-col items-center justify-center py-40 bg-white rounded-[32px] border border-dashed border-gray-200">
          <div className="p-4 bg-emerald-50 rounded-full mb-4 text-[#10b981]">
            <TrendingUp size={40} />
          </div>
          <h2 className="text-xl font-black text-gray-900">Nenhuma análise SWOT ativa</h2>
          <p className="text-gray-500 mb-6">Inicie criando uma nova análise no seletor acima.</p>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="px-8 py-3 bg-[#10b981] text-white rounded-xl font-bold shadow-lg shadow-emerald-100"
          >
            Começar Agora
          </button>
        </div>
      ) : (
        /* UI Gerada com Matrizes */
        <div className="space-y-8 animate-in fade-in duration-500">
          <div className="flex justify-between items-center">
             <div className="text-left">
                <h2 className="text-2xl font-black uppercase text-gray-900">{activeSwot?.nome}</h2>
                <p className="text-gray-500 text-sm">{activeSwot?.descricao}</p>
             </div>
             
             {/* Switch SWOT Tradicional vs Cruzada */}
             <div className="bg-gray-100 p-1 rounded-xl flex gap-1">
                <button 
                  onClick={() => setIsCruzada(false)}
                  className={`px-4 py-2 rounded-lg text-[10px] font-black transition-all ${!isCruzada ? 'bg-white shadow-sm text-[#10b981]' : 'text-gray-400'}`}
                >
                  TRADICIONAL
                </button>
                <button 
                  onClick={() => setIsCruzada(true)}
                  className={`px-4 py-2 rounded-lg text-[10px] font-black transition-all ${isCruzada ? 'bg-white shadow-sm text-[#10b981]' : 'text-gray-400'}`}
                >
                  CRUZADA (MATRIZ)
                </button>
             </div>
          </div>

          {/* Renderização condicional conforme imagem 9 */}
          {isCruzada ? (
            <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
               {/* Grid de Matriz Cruzada aqui (Estratégias de Confronto) */}
               <p className="text-gray-400 font-bold italic">Visualização de Matriz Cruzada: Confronto de Forças vs Oportunidades...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SwotCard title="FORÇAS" color="bg-[#10b981]" icon={TrendingUp} items={[]} total={0} onAdd={()=>{}} />
              <SwotCard title="FRAQUEZAS" color="bg-[#ef4444]" icon={ShieldAlert} items={[]} total={0} onAdd={()=>{}} />
              <SwotCard title="OPORTUNIDADES" color="bg-[#0ea5e9]" icon={Lightbulb} items={[]} total={0} onAdd={()=>{}} />
              <SwotCard title="AMEAÇAS" color="bg-[#f59e0b]" icon={AlertCircle} items={[]} total={0} onAdd={()=>{}} />
            </div>
          )}
        </div>
      )}

      <SwotCreateModal 
        isOpen={showCreateModal} 
        onClose={() => setShowCreateModal(false)} 
        onSuccess={handleInit}
      />
    </div>
  );
};