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
  SquarePen,
  ChevronDown,
  ClipboardList,
} from "lucide-react";
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
    <div className="space-y-10 pb-10 relative text-left max-w-[1600px] mx-auto px-4">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="fixed bottom-10 right-10 z-[100] bg-[#051b11] border border-emerald-900/30 text-white px-5 py-4 rounded-xl shadow-2xl flex items-center gap-4 min-w-[320px] justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500 rounded-full p-1">
                <Check size={14} className="text-[#051b11]" />
              </div>
              <span className="text-sm font-bold tracking-tight">
                {toast.message}
              </span>
            </div>
            <button
              onClick={() => setToast(null)}
              className="text-white/50 hover:text-white transition-colors"
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
          <p className="text-base text-gray-400 font-medium tracking-tight italic">
            Defina o propósito, missão, visão e valores da sua organização
          </p>
        </div>
        <div className="group flex items-center gap-4 bg-white p-2 pr-6 rounded-2xl shadow-md border border-gray-100 hover:border-gray-200 transition-all cursor-pointer min-w-[340px]">
          <div className="text-[#10b981] pl-2">
            <ClipboardList size={22} strokeWidth={2.5} />
          </div>
          <div className="flex flex-col flex-1">
            <span className="text-sm font-black text-gray-800 tracking-tight">
              Expansão Regional 2026
            </span>
          </div>
          <ChevronDown size={18} className="text-gray-300" />
        </div>
      </div>

      {/* Grid de Cards Superiores Sincronizados */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-2">
        {cardsConfig.map((card) => (
          <div
            key={card.type}
            className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col min-h-[300px]"
          >
            {editCard.type === card.type ? (
              <div className="p-8 h-full flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`p-2 ${card.iconBg} text-white rounded-md shadow-sm`}
                  >
                    <card.icon size={20} />
                  </div>
                  <span className="text-lg font-bold text-gray-800 tracking-tight">
                    {card.type}
                  </span>
                </div>
                <textarea
                  autoFocus
                  className="w-full flex-1 p-5 bg-gray-50 border border-gray-100 rounded-xl text-base text-gray-600 outline-none resize-none hover:border-[#10b981] focus:border-[#10b981] focus:bg-white transition-all font-semibold"
                  value={editCard.value}
                  onChange={(e) =>
                    setEditCard({ ...editCard, value: e.target.value })
                  }
                />
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => setEditCard({ type: null, value: "" })}
                    className="flex items-center gap-2 px-6 py-2.5 border border-gray-100 rounded-xl text-sm font-bold text-gray-400 hover:bg-gray-50 uppercase tracking-wider transition-all"
                  >
                    <X size={16} /> Cancelar
                  </button>
                  <button
                    onClick={handleSaveCardContent}
                    className="flex items-center gap-2 px-8 py-2.5 bg-[#10b981] text-white rounded-xl text-sm font-bold shadow-md hover:bg-[#0da673] active:scale-95 uppercase tracking-wider transition-all"
                  >
                    <Save size={16} /> Salvar
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div
                  className={`${card.color} p-4 flex items-center justify-between`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 ${card.iconBg} text-white rounded-md shadow-sm`}
                    >
                      <card.icon size={18} />
                    </div>
                    <span className="text-sm font-bold text-white">
                      {card.type}
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      setEditCard({ type: card.type, value: card.val })
                    }
                    className="p-2 text-white/50 hover:text-white transition-all"
                  >
                    <SquarePen size={18} strokeWidth={2.5} />
                  </button>
                </div>
                <div className="p-8 flex-1 flex items-center">
                  <p className="text-gray-600 font-medium leading-relaxed text-left">
                    {card.val}
                  </p>
                </div>
              </>
            )}
          </div>
        ))}

        {/* Card de Valores */}
        <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col min-h-[300px]">
          <div className="bg-[#10b981] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#059669] text-white rounded-md shadow-sm">
                <Gem size={18} />
              </div>
              <span className="text-sm font-bold text-white">Valores</span>
            </div>
            <button
              onClick={() => {
                setIsAdding(true);
                setEditingIndex(null);
                setTempValue("");
              }}
              className="text-white hover:bg-white/10 p-2 rounded-md transition-all active:scale-90"
            >
              <Plus size={20} />
            </button>
          </div>
          <div className="p-8 space-y-8 flex-1 flex flex-col text-left">
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
                    className="flex-1 h-14 px-6 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold outline-none hover:border-[#10b981] focus:border-[#10b981] transition-all shadow-inner"
                    placeholder="Novo valor..."
                  />
                  <button
                    onClick={handleSaveValor}
                    className="h-14 w-14 flex items-center justify-center bg-[#10b981] text-white rounded-xl shadow-md hover:bg-[#0da673]"
                  >
                    <Save size={20} />
                  </button>
                  <button
                    onClick={() => {
                      setIsAdding(false);
                      setEditingIndex(null);
                    }}
                    className="h-14 w-14 flex items-center justify-center border border-gray-100 text-gray-300 rounded-xl hover:bg-gray-50 transition-all"
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
                  className="group/flag flex items-center gap-3 px-6 py-2.5 bg-gray-50 border border-gray-100 rounded-full text-xs font-black text-gray-600 shadow-sm transition-all hover:bg-red-50 hover:border-red-200 hover:text-red-600 cursor-default"
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
                      className="p-0.5 hover:text-emerald-600"
                    >
                      <SquarePen size={12} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveValue(index);
                      }}
                      className="p-0.5 hover:text-red-500"
                    >
                      <X size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Resumo */}
      <div className="bg-white p-10 rounded-2xl border border-gray-100 shadow-sm space-y-10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-500 rounded-2xl shadow-sm">
            <Sparkles size={22} />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-black text-gray-800 leading-tight">
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
              className="bg-gray-50/50 border border-gray-100 rounded-2xl p-8 flex flex-col items-center justify-center space-y-5 transition-all hover:bg-white hover:shadow-md"
            >
              {item.count !== undefined ? (
                <span
                  className={`text-4xl font-black ${item.color} tracking-tighter`}
                >
                  {item.count}
                </span>
              ) : (
                <div className={`h-1.5 w-10 rounded-full ${item.color}`} />
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
