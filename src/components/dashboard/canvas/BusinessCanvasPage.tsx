"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Plus, 
  Printer, 
  Users, 
  Briefcase, 
  Zap, 
  Heart, 
  UserCheck, 
  Share2, 
  DollarSign, 
  Wallet,
  LucideIcon,
  Pencil,
  Trash2
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
  onDelete
}: CanvasBlockProps) => (
  <motion.div 
    whileHover={{ scale: 1.01 }}
    className={`${rowSpan} bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col overflow-hidden`}
  >
    <div className={`p-3 ${color} text-white flex items-center justify-between`}>
      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-left">
        <Icon size={14} /> {title}
      </div>
      <button 
        onClick={() => onAdd(title, color)} 
        className="bg-white/20 hover:bg-white/40 p-1 rounded-md transition-all"
      >
        <Plus size={14} />
      </button>
    </div>
    <div className="flex-1 p-3 space-y-2 text-left">
      {items.map((item, i) => (
        <div 
          key={i} 
          className="group relative bg-gray-50/50 p-2.5 rounded-lg text-[11px] font-medium text-gray-500 border border-gray-100 transition-all hover:bg-gray-100/80 flex items-center justify-between"
        >
          <span className="flex-1 pr-14 leading-relaxed">{item}</span>
          
          <div className="absolute right-2 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            
            <button 
              onClick={() => onEdit(title, color, i, item)}
              className="p-1 text-gray-400 hover:text-[#10b981] transition-colors"
            >
              <Pencil size={12} />
            </button>
            
            <button 
              onClick={() => onDelete(title, i)}
              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 size={12} />
            </button>
          </div>
        </div>
      ))}
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
    defaultText: ""
  });

  
  const [data, setData] = useState<Record<string, string[]>>({
    "Parcerias Principais": ["Fornecedores estratégicos", "Parceiros tecnológicos"],
    "Atividades Principais": ["Desenvolvimento de software", "Consultoria estratégica"],
    "Recursos Principais": ["Equipe especializada", "Infraestrutura cloud"],
    "Proposta de Valor": ["Soluções inovadoras para planejamento estratégico"],
    "Relacionamento com Clientes": ["Suporte dedicado 24/7", "Consultoria personalizada"],
    "Canais": ["Plataforma web", "Redes sociais"],
    "Segmento de Clientes": ["Empresas de médio e grande porte", "Startups em crescimento"],
    "Estrutura de Custos": ["Infraestrutura tecnológica", "Equipe de desenvolvimento"],
    "Fontes de Receitas": ["Licenças de software", "Serviços de consultoria"]
  });

  const handleOpenAdd = (title: string, color: string) => 
    setModalConfig({ open: true, title, color, editIndex: null, defaultText: "" });

  const handleOpenEdit = (title: string, color: string, index: number, text: string) => 
    setModalConfig({ open: true, title, color, editIndex: index, defaultText: text });

  const handleDelete = (title: string, index: number) => {
    if (confirm("Deseja realmente excluir este item?")) {
      setData(prev => ({
        ...prev,
        [title]: prev[title].filter((_, i) => i !== index)
      }));
    }
  };

  return (
    <div className="space-y-6 p-8 max-w-[1800px] mx-auto">
      <div className="flex justify-between items-start mb-4">
        <div className="text-left">
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Business Model Canvas</h1>
          <p className="text-xs text-gray-500 font-medium text-left">
            Planejamento: <span className="uppercase text-gray-900 font-bold tracking-tight">Planejamento Estratégico</span>
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
          <Printer size={16}/> Imprimir
        </button>
      </div>

      <div className="grid grid-cols-5 gap-4 h-[750px]">
        <CanvasBlock 
          title="Parcerias Principais" icon={Briefcase} color="bg-[#3b82f6]" 
          items={data["Parcerias Principais"]} onAdd={handleOpenAdd} onEdit={handleOpenEdit} onDelete={handleDelete}
        />
        
        <div className="col-span-1 grid grid-rows-2 gap-4">
          <CanvasBlock 
            title="Atividades Principais" icon={Zap} color="bg-[#3b82f6]" 
            items={data["Atividades Principais"]} onAdd={handleOpenAdd} onEdit={handleOpenEdit} onDelete={handleDelete} rowSpan="row-span-1" 
          />
          <CanvasBlock 
            title="Recursos Principais" icon={Briefcase} color="bg-[#3b82f6]" 
            items={data["Recursos Principais"]} onAdd={handleOpenAdd} onEdit={handleOpenEdit} onDelete={handleDelete} rowSpan="row-span-1" 
          />
        </div>

        <CanvasBlock 
          title="Proposta de Valor" icon={Heart} color="bg-[#f43f5e]" 
          items={data["Proposta de Valor"]} onAdd={handleOpenAdd} onEdit={handleOpenEdit} onDelete={handleDelete}
        />

        <div className="col-span-1 grid grid-rows-2 gap-4">
          <CanvasBlock 
            title="Relacionamento com Clientes" icon={UserCheck} color="bg-[#10b981]" 
            items={data["Relacionamento com Clientes"]} onAdd={handleOpenAdd} onEdit={handleOpenEdit} onDelete={handleDelete} rowSpan="row-span-1" 
          />
          <CanvasBlock 
            title="Canais" icon={Share2} color="bg-[#10b981]" 
            items={data["Canais"]} onAdd={handleOpenAdd} onEdit={handleOpenEdit} onDelete={handleDelete} rowSpan="row-span-1" 
          />
        </div>

        <CanvasBlock 
          title="Segmento de Clientes" icon={Users} color="bg-[#10b981]" 
          items={data["Segmento de Clientes"]} onAdd={handleOpenAdd} onEdit={handleOpenEdit} onDelete={handleDelete}
        />

        <div className="col-span-5 grid grid-cols-2 gap-4 h-40">
          <CanvasBlock 
            title="Estrutura de Custos" icon={Wallet} color="bg-[#f59e0b]" 
            items={data["Estrutura de Custos"]} onAdd={handleOpenAdd} onEdit={handleOpenEdit} onDelete={handleDelete} rowSpan="row-span-1" 
          />
          <CanvasBlock 
            title="Fontes de Receitas" icon={DollarSign} color="bg-[#f59e0b]" 
            items={data["Fontes de Receitas"]} onAdd={handleOpenAdd} onEdit={handleOpenEdit} onDelete={handleDelete} rowSpan="row-span-1" 
          />
        </div>
      </div>

      <CanvasItemModal 
        isOpen={modalConfig.open} 
        onClose={() => setModalConfig({ ...modalConfig, open: false })} 
        title={modalConfig.title} 
        color={modalConfig.color}
        defaultText={modalConfig.defaultText}
      />
    </div>
  );
};