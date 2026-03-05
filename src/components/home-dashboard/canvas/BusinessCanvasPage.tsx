"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Printer,
  Users,
  Handshake,
  Activity,
  Truck,
  Heart,
  Gift,
  DollarSign,
  Wallet,
  LucideIcon,
  Pencil,
  Trash2,
  ChevronDown,
  ClipboardList,
  Check,
  X,
} from "lucide-react";
import { CanvasItemModal } from "./CanvasItemModal";

interface CanvasBlockProps {
  title: string;
  icon: LucideIcon;
  color: string;
  items: string[];
  rowSpan?: string;
  onAdd: (title: string, color: string) => void;
  onEdit: (title: string, color: string, index: number, text: string) => void;
  onDelete: (title: string, index: number) => void;
}

const CanvasBlock = ({
  title,
  icon: Icon,
  color,
  items,
  rowSpan = "row-span-2",
  onAdd,
  onEdit,
  onDelete,
}: CanvasBlockProps) => (
  <motion.div
    className={`${rowSpan} bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col overflow-hidden`}
  >
    <div
      className={`p-4 ${color} text-white flex items-center justify-between`}
    >
      <div className="flex items-center gap-2.5 text-[11px] font-black uppercase tracking-wider text-left leading-none">
        <Icon size={16} strokeWidth={2.5} /> {title}
      </div>
      <button
        onClick={() => onAdd(title, color)}
        className="bg-white/20 hover:bg-white/30 p-1.5 rounded-lg transition-all active:scale-90"
      >
        <Plus size={16} strokeWidth={3} />
      </button>
    </div>
    <div className="flex-1 p-4 space-y-3 text-left overflow-y-auto max-h-full">
      {items.length === 0 ? (
        <div className="h-full flex items-center justify-center">
          <p className="text-[11px] text-gray-300 font-medium italic">
            Clique em + para adicionar
          </p>
        </div>
      ) : (
        items.map((item, i) => (
          <div
            key={`${title}-${i}`}
            className="group relative bg-gray-50 border border-gray-100 p-3 rounded-xl text-[12px] font-bold text-gray-600 transition-all hover:border-emerald-200 hover:bg-white flex items-center justify-between shadow-sm"
          >
            <span className="flex-1 pr-14 leading-relaxed line-clamp-3">
              {item}
            </span>

            <div className="absolute right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={() => onEdit(title, color, i, item)}
                className="p-1.5 text-gray-400 hover:text-[#10b981] transition-colors"
              >
                <Pencil size={14} />
              </button>
              <button
                onClick={() => onDelete(title, i)}
                className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  </motion.div>
);

export const BusinessCanvasPage = () => {
  const [modalConfig, setModalConfig] = useState<{
    open: boolean;
    title: string;
    color: string;
    editIndex: number | null;
    defaultText: string;
  }>({
    open: false,
    title: "",
    color: "",
    editIndex: null,
    defaultText: "",
  });

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showToast = (message: string) => {
    setToast({ message, type: "success" });
    setTimeout(() => setToast(null), 3000);
  };

  const [data, setData] = useState<Record<string, string[]>>({
    "Parcerias Principais": [
      "Fornecedores estratégicos",
      "Parceiros tecnológicos",
    ],
    "Atividades Principais": ["Desenvolvimento de software"],
    "Recursos Principais": ["Equipe especializada", "Infraestrutura cloud"],
    "Proposta de Valor": ["Soluções inovadoras para planejamento estratégico"],
    "Relacionamento com Clientes": ["Suporte dedicado 24/7"],
    Canais: ["Plataforma web"],
    "Segmento de Clientes": ["Empresas de médio e grande porte"],
    "Estrutura de Custos": ["Infraestrutura tecnológica"],
    "Fontes de Receitas": ["Licenças de software"],
  });

  const handleOpenAdd = (title: string, color: string) =>
    setModalConfig({
      open: true,
      title,
      color,
      editIndex: null,
      defaultText: "",
    });

  const handleOpenEdit = (
    title: string,
    color: string,
    index: number,
    text: string,
  ) =>
    setModalConfig({
      open: true,
      title,
      color,
      editIndex: index,
      defaultText: text,
    });

  const handleDelete = (title: string, index: number) => {
    setData((prev) => ({
      ...prev,
      [title]: prev[title].filter((_, i) => i !== index),
    }));
    showToast("Item excluído");
  };

  // Mock de função para o modal chamar ao salvar
  const handleModalSave = (text: string) => {
    const { title, editIndex } = modalConfig;
    if (editIndex !== null) {
      const newData = [...data[title]];
      newData[editIndex] = text;
      setData({ ...data, [title]: newData });
      showToast("Item atualizado");
    } else {
      setData({ ...data, [title]: [...data[title], text] });
      showToast("Item adicionado");
    }
    setModalConfig({ ...modalConfig, open: false });
  };

  return (
    <div className="space-y-8 p-8 max-w-[1800px] mx-auto relative min-h-screen">
      {/* Toast Notification - Dark Tech */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="fixed bottom-10 right-10 z-[100] bg-[#050b18] border border-slate-800 text-white px-5 py-4 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-4 min-w-[300px] justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="bg-[#10b981] rounded-full p-1.5 flex items-center justify-center">
                <Check size={14} className="text-white stroke-[3px]" />
              </div>
              <span className="text-sm font-bold tracking-tight">
                {toast.message}
              </span>
            </div>
            <button
              onClick={() => setToast(null)}
              className="text-slate-500 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header com Seletor conforme image_2f840f.png */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
        <div className="text-left">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-1">
            Business Model Canvas
          </h1>
          <p className="text-sm text-gray-500 font-medium tracking-tight">
            Planejamento:{" "}
            <span className="uppercase text-gray-900 font-black tracking-widest pl-1">
              Expansão Regional 2026
            </span>
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center bg-white border border-gray-100 p-1.5 rounded-2xl shadow-md min-w-[280px] transition-all cursor-pointer">
            <div className="text-[#10b981] pl-2">
              <ClipboardList size={22} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col flex-1 px-4 text-left">
              <span className="text-sm font-black text-gray-700">
                Expansão Regional 2026
              </span>
            </div>
            <ChevronDown size={18} className="text-gray-300 px-2" />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-2xl text-xs font-black text-gray-600 hover:bg-gray-50 transition-all shadow-sm uppercase tracking-widest">
            <Printer size={18} /> Imprimir
          </button>
        </div>
      </div>

      {/* Grid Canvas - Fiel à quarta imagem */}
      <div className="grid grid-cols-5 gap-4 h-[700px]">
        {/* Coluna 1: Parcerias */}
        <CanvasBlock
          title="Parcerias Principais"
          icon={Handshake}
          color="bg-[#3b82f6]"
          items={data["Parcerias Principais"]}
          onAdd={handleOpenAdd}
          onEdit={handleOpenEdit}
          onDelete={handleDelete}
        />

        {/* Coluna 2: Atividades e Recursos */}
        <div className="col-span-1 grid grid-rows-2 gap-4">
          <CanvasBlock
            title="Atividades Principais"
            icon={Activity}
            color="bg-[#3b82f6]"
            items={data["Atividades Principais"]}
            onAdd={handleOpenAdd}
            onEdit={handleOpenEdit}
            onDelete={handleDelete}
            rowSpan="row-span-1"
          />
          <CanvasBlock
            title="Recursos Principais"
            icon={Wallet}
            color="bg-[#3b82f6]"
            items={data["Recursos Principais"]}
            onAdd={handleOpenAdd}
            onEdit={handleOpenEdit}
            onDelete={handleDelete}
            rowSpan="row-span-1"
          />
        </div>

        {/* Coluna 3: Proposta de Valor */}
        <CanvasBlock
          title="Proposta de Valor"
          icon={Gift}
          color="bg-[#f43f5e]"
          items={data["Proposta de Valor"]}
          onAdd={handleOpenAdd}
          onEdit={handleOpenEdit}
          onDelete={handleDelete}
        />

        {/* Coluna 4: Relacionamento e Canais */}
        <div className="col-span-1 grid grid-rows-2 gap-4">
          <CanvasBlock
            title="Relacionamento com Clientes"
            icon={Heart}
            color="bg-[#10b981]"
            items={data["Relacionamento com Clientes"]}
            onAdd={handleOpenAdd}
            onEdit={handleOpenEdit}
            onDelete={handleDelete}
            rowSpan="row-span-1"
          />
          <CanvasBlock
            title="Canais"
            icon={Truck}
            color="bg-[#10b981]"
            items={data["Canais"]}
            onAdd={handleOpenAdd}
            onEdit={handleOpenEdit}
            onDelete={handleDelete}
            rowSpan="row-span-1"
          />
        </div>

        {/* Coluna 5: Segmento de Clientes */}
        <CanvasBlock
          title="Segmento de Clientes"
          icon={Users}
          color="bg-[#10b981]"
          items={data["Segmento de Clientes"]}
          onAdd={handleOpenAdd}
          onEdit={handleOpenEdit}
          onDelete={handleDelete}
        />

        {/* Linha Inferior: Custos e Receitas */}
        <div className="col-span-5 grid grid-cols-2 gap-4 h-44 mt-4">
          <CanvasBlock
            title="Estrutura de Custos"
            icon={Wallet}
            color="bg-[#f59e0b]"
            items={data["Estrutura de Custos"]}
            onAdd={handleOpenAdd}
            onEdit={handleOpenEdit}
            onDelete={handleDelete}
            rowSpan="col-span-1"
          />
          <CanvasBlock
            title="Fontes de Receitas"
            icon={DollarSign}
            color="bg-[#f59e0b]"
            items={data["Fontes de Receitas"]}
            onAdd={handleOpenAdd}
            onEdit={handleOpenEdit}
            onDelete={handleDelete}
            rowSpan="col-span-1"
          />
        </div>
      </div>

      <CanvasItemModal
        isOpen={modalConfig.open}
        onClose={() => setModalConfig({ ...modalConfig, open: false })}
        title={modalConfig.title}
        color={modalConfig.color}
        defaultText={modalConfig.defaultText}
        onSave={handleModalSave}
      />
    </div>
  );
};
