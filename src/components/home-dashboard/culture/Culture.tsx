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
  Pencil,
  ChevronDown,
  ClipboardList,
} from "lucide-react";
import { CultureCard } from "./CultureCard";
import { motion, AnimatePresence } from "framer-motion";

type CardType = "Propósito" | "Missão" | "Visão";

interface CardConfig {
  type: CardType;
  val: string;
  icon: typeof Rocket;
  color: string;
  iconBg: string;
}

export default function Culture() {
  const [proposito, setProposito] = useState(
    "Transformar o planejamento estratégico em resultados extraordinários, conectando pessoas e tecnologia para criar um futuro melhor.",
  );
  const [missao, setMissao] = useState(
    "Fornecer ferramentas inovadoras de planejamento estratégico que capacitem organizações a alcançar seus objetivos com excelência e eficiência.",
  );
  const [visao, setVisao] = useState(
    "Ser a plataforma líder em gestão estratégica na América Latina, reconhecida pela inovação e impacto positivo nos negócios de nossos clientes.",
  );

  const [editCard, setEditCard] = useState<{
    type: CardType | null;
    value: string;
  }>({ type: null, value: "" });
  const [valores, setValores] = useState([
    "Inovação",
    "Excelência",
    "Integridade",
    "Colaboração",
    "Foco no Cliente",
    "Sustentabilidade",
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tempValue, setTempValue] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showToast = (message: string) => {
    setToast({ message, type: "success" });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSaveCardContent = () => {
    if (!editCard.type) return;
    if (editCard.type === "Propósito") setProposito(editCard.value);
    if (editCard.type === "Missão") setMissao(editCard.value);
    if (editCard.type === "Visão") setVisao(editCard.value);
    showToast(`${editCard.type} atualizado com sucesso!`);
    setEditCard({ type: null, value: "" });
  };

  const handleSaveValor = () => {
    if (!tempValue.trim()) return;
    if (editingIndex !== null) {
      const newValores = [...valores];
      newValores[editingIndex] = tempValue.trim();
      setValores(newValores);
      showToast("Valor atualizado com sucesso!");
      setEditingIndex(null);
    } else {
      setValores([...valores, tempValue.trim()]);
      showToast("Salvo com sucesso!");
      setIsAdding(false);
    }
    setTempValue("");
  };

  const handleRemoveValue = (indexToRemove: number) => {
    setValores(valores.filter((_, index) => index !== indexToRemove));
    showToast("Excluído com sucesso!");
  };

  const cardsConfig: CardConfig[] = [
    {
      type: "Propósito",
      val: proposito,
      icon: Rocket,
      color: "bg-[#e11d48]",
      iconBg: "bg-[#be123c]",
    },
    {
      type: "Missão",
      val: missao,
      icon: Target,
      color: "bg-[#f59e0b]",
      iconBg: "bg-[#d97706]",
    },
    {
      type: "Visão",
      val: visao,
      icon: Eye,
      color: "bg-[#06b6d4]",
      iconBg: "bg-[#0891b2]",
    },
  ];

  return (
    <div className="space-y-10 pb-10 relative text-left max-w-[1600px] mx-auto">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="fixed bottom-10 right-10 z-[100] bg-[#050b18] border border-slate-800 text-white px-5 py-4 rounded-xl shadow-2xl flex items-center gap-4 min-w-[320px] justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="bg-[#10b981] rounded-full p-1.5 flex items-center justify-center">
                <Check size={14} className="text-white stroke-[3.5px]" />
              </div>
              <span className="text-sm font-bold tracking-tight">
                {toast.message}
              </span>
            </div>
            <button
              onClick={() => setToast(null)}
              className="text-slate-500 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-1">
            Cultura Organizacional
          </h1>
          <p className="text-base text-gray-400 font-medium tracking-tight">
            Define o perfil e a identidade da sua organização.
          </p>
        </div>

        <div className="group flex items-center gap-4 bg-white p-2 pr-6 rounded-2xl shadow-md border border-gray-100 hover:border-gray-200 transition-all cursor-pointer min-w-[340px]">
          <div className="bg-[#10b981] p-3 rounded-xl text-white shadow-md transition-transform">
            <ClipboardList size={22} strokeWidth={2.5} />
          </div>
          <div className="flex flex-col flex-1">
            <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.15em] leading-none mb-1.5">
              Planejamento Atual
            </span>
            <span className="text-sm font-black text-gray-800 tracking-tight">
              Expansão Regional 2026
            </span>
          </div>
          <ChevronDown size={18} className="text-gray-300" />
        </div>
      </div>

      {/* Grid Superior */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-2">
        {cardsConfig.map((card) => (
          <div key={card.type} className="group relative">
            {editCard.type === card.type ? (
              <div className="bg-white rounded-2xl border-2 border-emerald-500 shadow-xl p-8 animate-in fade-in zoom-in-95 h-full flex flex-col min-h-[250px]">
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`p-2.5 ${card.iconBg} text-white rounded-xl shadow-md`}
                  >
                    <card.icon size={20} />
                  </div>
                  <span className="text-lg font-black text-gray-800 tracking-tight">
                    Ajustar {card.type}
                  </span>
                </div>
                <textarea
                  autoFocus
                  className="w-full flex-1 p-5 bg-gray-50 rounded-2xl text-base text-gray-600 outline-none resize-none border-2 border-transparent focus:border-emerald-100 focus:bg-white transition-all font-semibold leading-relaxed"
                  value={editCard.value}
                  onChange={(e) =>
                    setEditCard({ ...editCard, value: e.target.value })
                  }
                />
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => setEditCard({ type: null, value: "" })}
                    className="px-5 py-2.5 text-sm font-black text-gray-400 hover:text-gray-600"
                  >
                    CANCELAR
                  </button>
                  <button
                    onClick={handleSaveCardContent}
                    className="px-8 py-3 bg-[#10b981] text-white rounded-xl text-sm font-black flex items-center gap-2 shadow-lg hover:bg-[#0da673] active:scale-95 transition-all"
                  >
                    <Save size={16} /> SALVAR ALTERAÇÃO
                  </button>
                </div>
              </div>
            ) : (
              <>
                <CultureCard
                  title={card.type}
                  icon={card.icon}
                  headerBg={card.color}
                  iconBg={card.iconBg}
                  description={card.val}
                />
                <button
                  onClick={() =>
                    setEditCard({ type: card.type, value: card.val })
                  }
                  className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm border border-gray-100 rounded-full text-gray-400 shadow-md opacity-0 group-hover:opacity-100 transition-all hover:text-emerald-500 hover:scale-110 z-10"
                >
                  <Pencil size={18} />
                </button>
              </>
            )}
          </div>
        ))}

        {/* Card de Valores */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full group">
          <div className="bg-[#10b981] p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-[#059669] text-white rounded-xl shadow-inner shadow-black/10">
                <Gem size={20} />
              </div>
              <span className="text-base font-black text-white uppercase tracking-widest">
                Valores
              </span>
            </div>
            <button
              onClick={() => {
                setIsAdding(true);
                setEditingIndex(null);
                setTempValue("");
              }}
              className="bg-white/20 text-white hover:bg-white/40 p-2 rounded-xl transition-all active:scale-90"
            >
              <Plus size={20} />
            </button>
          </div>
          <div className="p-8 space-y-8 flex-1">
            <AnimatePresence>
              {(isAdding || editingIndex !== null) && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-3"
                >
                  <input
                    autoFocus
                    type="text"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSaveValor()}
                    placeholder={
                      editingIndex !== null ? "Editar..." : "Novo valor..."
                    }
                    className="flex-1 h-14 px-6 bg-gray-50 border-2 border-transparent rounded-2xl text-sm font-bold outline-none focus:border-emerald-500 focus:bg-white transition-all shadow-inner"
                  />
                  <button
                    onClick={handleSaveValor}
                    className="h-14 w-14 flex items-center justify-center bg-[#10b981] text-white rounded-2xl shadow-md hover:bg-[#0da673] transition-all"
                  >
                    <Save size={20} />
                  </button>
                  <button
                    onClick={() => {
                      setIsAdding(false);
                      setEditingIndex(null);
                    }}
                    className="h-14 w-14 flex items-center justify-center border-2 border-gray-100 text-gray-300 rounded-2xl hover:bg-gray-50 transition-all"
                  >
                    <X size={20} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="flex flex-wrap gap-4">
              {valores.map((val, index) => (
                <div
                  key={`v-${index}`}
                  className="group/flag flex items-center gap-3 px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black text-gray-600 shadow-sm transition-all hover:bg-red-50 hover:border-red-200 hover:text-red-600 cursor-default"
                >
                  <div className="text-emerald-500 group-hover/flag:text-red-500 transition-colors">
                    <Sparkles size={16} />
                  </div>
                  <span className="uppercase tracking-tight">{val}</span>
                  <div className="hidden group-hover/flag:flex items-center gap-2 ml-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingIndex(index);
                        setTempValue(valores[index]);
                      }}
                      className="p-1 hover:bg-emerald-100 rounded-lg text-emerald-600 transition-all"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveValue(index);
                      }}
                      className="p-1 hover:bg-red-100 rounded-lg text-red-500 transition-all"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Resumo da Cultura - SOMBRAS CORRIGIDAS */}
      <div className="bg-white p-10 rounded-2xl border border-gray-100 shadow-sm space-y-10 px-2 mx-2">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-500 rounded-2xl shadow-sm">
            <Sparkles size={22} />
          </div>
          <div>
            <h3 className="text-lg font-black text-gray-800 tracking-tight leading-none mb-1">
              Resumo da Cultura
            </h3>
            <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em] leading-none">
              Status atual dos pilares estratégicos
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { label: "Propósito", color: "bg-[#e11d48]" },
            { label: "Missão", color: "bg-[#f59e0b]" },
            { label: "Visão", color: "bg-[#06b6d4]" },
            {
              label: "Valores",
              color: "text-[#10b981]",
              count: valores.length,
            },
          ].map((item, idx) => (
            <div
              key={`sum-${idx}`}
              className="bg-gray-50/50 border border-gray-100 rounded-2xl p-8 flex flex-col items-center justify-center space-y-5 group hover:bg-white hover:shadow-md transition-all duration-300"
            >
              {item.count !== undefined ? (
                <span
                  className={`text-4xl font-black ${item.color} tracking-tighter`}
                >
                  {item.count}
                </span>
              ) : (
                <div
                  className={`h-2 w-12 rounded-full ${item.color} shadow-sm shadow-black/10`}
                />
              )}
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.25em]">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
