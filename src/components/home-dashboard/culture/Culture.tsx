"use client";

import { useState } from "react";
import {
  Target,
  Eye,
  Gem,
  Rocket,
  Check,
  Plus,
  Sparkles,
  Save,
  X,
} from "lucide-react";
import { CultureCard } from "./CultureCard";

export default function Culture() {
  // Estado para os valores e para o controle do input
  const [valores, setValores] = useState([
    "Inovação",
    "Excelência",
    "Integridade",
    "Colaboração",
    "Foco no Cliente",
    "Sustentabilidade",
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newValue, setNewValue] = useState("");

  const handleAddValue = () => {
    if (newValue.trim()) {
      setValores([...valores, newValue.trim()]);
      setNewValue("");
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="text-left">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Cultura Organizacional
        </h1>
        <p className="text-sm text-gray-500 font-medium">
          Defina o propósito, missão, visão e valores da sua organização
        </p>
      </div>

      {/* Grid Superior */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <CultureCard
          title="Propósito"
          icon={Rocket}
          headerBg="bg-[#e11d48]"
          iconBg="bg-[#be123c]"
          description="Transformar o planejamento estratégico em resultados extraordinários, conectando pessoas e tecnologia para criar um futuro melhor."
        />
        <CultureCard
          title="Missão"
          icon={Target}
          headerBg="bg-[#f59e0b]"
          iconBg="bg-[#d97706]"
          description="Fornecer ferramentas inovadoras de planejamento estratégico que capacitem organizações a alcançar seus objetivos com excelência e eficiência."
        />
        <CultureCard
          title="Visão"
          icon={Eye}
          headerBg="bg-[#06b6d4]"
          iconBg="bg-[#0891b2]"
          description="Ser a plataforma líder em gestão estratégica na América Latina, reconhecida pela inovação e impacto positivo nos negócios de nossos clientes."
        />

        {/* Card de Valores - Refinado com Input dinâmico e ícone Sparkles */}
        <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full">
          <div className="bg-[#10b981] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#059669] text-white rounded-md shadow-sm">
                <Gem size={18} />
              </div>
              <span className="text-sm font-bold text-white">Valores</span>
            </div>
            <button
              onClick={() => setIsAdding(true)}
              className="text-white hover:bg-white/10 p-1 rounded-md transition-all active:scale-90"
            >
              <Plus size={18} />
            </button>
          </div>

          <div className="p-8 space-y-6">
            {/* Campo de Input (Aparece ao clicar no +) */}
            {isAdding && (
              <div className="flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="relative flex-1 group">
                  <input
                    autoFocus
                    type="text"
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddValue()}
                    placeholder="Novo valor..."
                    className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium outline-none transition-all group-hover:border-[#10b981] focus:border-[#10b981] focus:bg-white focus:ring-4 focus:ring-emerald-50"
                  />
                </div>
                <button
                  onClick={handleAddValue}
                  className="h-11 w-11 flex items-center justify-center bg-[#10b981] text-white rounded-xl hover:bg-[#0da673] transition-all shadow-md shadow-emerald-100"
                >
                  <Save size={18} />
                </button>
                <button
                  onClick={() => {
                    setIsAdding(false);
                    setNewValue("");
                  }}
                  className="h-11 w-11 flex items-center justify-center border border-gray-200 text-gray-400 rounded-xl hover:bg-gray-50 transition-all"
                >
                  <X size={18} />
                </button>
              </div>
            )}

            {/* Listagem das Flags (Valores Salvos) */}
            <div className="flex flex-wrap gap-3">
              {valores.map((val) => (
                <div
                  key={val}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-100 rounded-md text-xs font-bold text-gray-600 shadow-sm hover:border-emerald-200 transition-colors cursor-default"
                >
                  <div className="text-[#10b981]">
                    {/* Ícone atualizado para Sparkles conforme solicitado */}
                    <Sparkles size={14} />
                  </div>
                  {val}
                </div>
              ))}

              {valores.length === 0 && !isAdding && (
                <p className="text-gray-400 text-sm font-medium italic">
                  Clique em + para cadastrar valores
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Resumo da Cultura (Seção Inferior) */}
      <div className="bg-white p-8 rounded-lg border border-gray-100 shadow-sm space-y-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-50 text-emerald-500 rounded-md">
            <Rocket size={18} />
          </div>
          <div className="text-left">
            <h3 className="text-sm font-bold text-gray-800 leading-tight">
              Resumo da Cultura
            </h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
              Visão geral dos elementos culturais definidos
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Propósito", color: "text-[#e11d48]", bg: "bg-[#fff1f2]" },
            { label: "Missão", color: "text-[#f59e0b]", bg: "bg-[#fffbeb]" },
            { label: "Visão", color: "text-[#06b6d4]", bg: "bg-[#ecfeff]" },
            {
              label: "Valores",
              color: "text-[#10b981]",
              bg: "bg-[#f0fdf4]",
              count: valores.length,
            },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-gray-50/50 border border-gray-100 rounded-lg p-6 flex flex-col items-center justify-center space-y-3 group hover:shadow-md transition-all"
            >
              {item.count !== undefined ? (
                <span className={`text-3xl font-black ${item.color}`}>
                  {item.count}
                </span>
              ) : (
                <Check className={`${item.color}`} size={24} />
              )}
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
