"use client";

import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  ArrowLeft,
  ChevronsRight,
  ChevronRight,
  ChevronLeft,
  ChevronsLeft,
  Save,
  Calendar as CalendarIcon,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

// Interface rigorosa para os dados do formulário
interface ProjectFormValues {
  titulo: string;
  descricao: string;
  responsavelId: string;
  departamentoId: string;
  dataInicio: string;
  dataFinal: string;
  situacao: string;
}

// Interface para o CustomSelect (ajuste conforme seu componente real)
interface SelectOption {
  value: string;
  label: string;
}

// Simulando o componente CustomSelect com tipos
const CustomSelect = ({
  label,
  placeholder,
  options,
  value,
  onValueChange,
}: {
  label: string;
  placeholder: string;
  options: SelectOption[];
  value?: string;
  onValueChange: (val: string) => void;
}) => (
  <div className="space-y-2 text-left">
    <label className="text-xs font-bold text-gray-700 ml-1">{label}</label>
    <div className="relative group">
      <select
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none appearance-none focus:border-[#10b981] transition-all cursor-pointer"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="absolute right-4 top-4 text-gray-400 pointer-events-none group-focus:text-[#10b981]"
        size={18}
      />
    </div>
  </div>
);

import { ChevronDown } from "lucide-react";

export const NewProjectForm = ({ onBack }: { onBack: () => void }) => {
  // Estados para Parceiros (Dual List)
  const [availPartners, setAvailPartners] = useState<string[]>([
    "mauricio de souza",
    "FRANK PEREIRA CARDOSO",
    "RENATO BORDALO",
  ]);
  const [selectedPartners, setSelectedPartners] = useState<string[]>([]);

  // Estado para SWOT (Dual List)
  const [availSwot, setAvailSwot] = useState<string[]>([
    "Fraqueza no TI",
    "Oportunidade de Mercado",
  ]);
  const [selectedSwot, setSelectedSwot] = useState<string[]>([]);

  const { register, handleSubmit, control } = useForm<ProjectFormValues>({
    defaultValues: {
      titulo: "",
      descricao: "",
      responsavelId: "",
      departamentoId: "",
      dataInicio: "",
      dataFinal: "",
      situacao: "nao-iniciado",
    },
  });

  // Funções de movimentação tipadas
  const moveItem = (
    item: string,
    from: string[],
    setFrom: React.Dispatch<React.SetStateAction<string[]>>,
    to: string[],
    setTo: React.Dispatch<React.SetStateAction<string[]>>,
  ): void => {
    setFrom(from.filter((i) => i !== item));
    setTo([...to, item]);
  };

  const moveAll = (
    from: string[],
    setFrom: React.Dispatch<React.SetStateAction<string[]>>,
    to: string[],
    setTo: React.Dispatch<React.SetStateAction<string[]>>,
  ): void => {
    setTo((prev) => [...prev, ...from]);
    setFrom([]);
  };

  const onSubmit: SubmitHandler<ProjectFormValues> = (data) => {
    const finalData = {
      ...data,
      parceiros: selectedPartners,
      swot: selectedSwot,
    };
    console.log("Dados salvos:", finalData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 pb-10 max-w-[1200px] mx-auto px-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-2 pt-4">
        <div className="flex items-center gap-5">
          <Link href="/dashboard/projects">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-xl transition-all text-gray-500 font-bold text-sm border border-gray-200 bg-white"
            >
              <ArrowLeft size={18} /> Voltar
            </button>
          </Link>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Novo Projeto
          </h1>
        </div>
      </div>

      <div className="bg-white p-10 rounded-3xl border border-gray-200 shadow-xl shadow-gray-200/50 space-y-10">
        {/* Título e Descrição */}
        <div className="space-y-6">
          <div className="space-y-2 text-left">
            <label className="text-xs font-bold text-gray-700 ml-1">
              Título do Projeto *
            </label>
            <input
              {...register("titulo", { required: true })}
              placeholder="Nome do projeto"
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#10b981] transition-all"
            />
          </div>

          <div className="space-y-2 text-left">
            <label className="text-xs font-bold text-gray-700 ml-1">
              Descrição do Projeto
            </label>
            <textarea
              {...register("descricao")}
              placeholder="Descreva os objetivos do projeto..."
              className="w-full h-32 p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#10b981] resize-none transition-all"
            />
          </div>
        </div>

        {/* Responsável e Departamento */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Controller
            name="responsavelId"
            control={control}
            render={({ field }) => (
              <CustomSelect
                label="Responsável *"
                placeholder="Selecione o responsável"
                options={[{ value: "1", label: "mauricio de souza" }]}
                value={field.value}
                onValueChange={field.onChange}
              />
            )}
          />
          <Controller
            name="departamentoId"
            control={control}
            render={({ field }) => (
              <CustomSelect
                label="Departamento *"
                placeholder="Selecione o departamento"
                options={[
                  { value: "1", label: "TI" },
                  { value: "2", label: "Comercial" },
                ]}
                value={field.value}
                onValueChange={field.onChange}
              />
            )}
          />
        </div>

        {/* Datas e Situação */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2 text-left text-gray-700">
            <label className="text-xs font-bold ml-1">Data de Início *</label>
            <div className="relative">
              <input
                {...register("dataInicio")}
                type="text"
                placeholder="dd/mm/aaaa"
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#10b981]"
              />
              <CalendarIcon
                size={18}
                className="absolute right-4 top-4 text-gray-400"
              />
            </div>
          </div>
          <div className="space-y-2 text-left text-gray-700">
            <label className="text-xs font-bold ml-1">Data Final *</label>
            <div className="relative">
              <input
                {...register("dataFinal")}
                type="text"
                placeholder="dd/mm/aaaa"
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#10b981]"
              />
              <CalendarIcon
                size={18}
                className="absolute right-4 top-4 text-gray-400"
              />
            </div>
          </div>
          <Controller
            name="situacao"
            control={control}
            render={({ field }) => (
              <CustomSelect
                label="Situação do Projeto *"
                placeholder="Selecione"
                options={[
                  { value: "nao-iniciado", label: "Não Iniciado" },
                  { value: "em-andamento", label: "Em Andamento" },
                ]}
                value={field.value}
                onValueChange={field.onChange}
              />
            )}
          />
        </div>

        {/* Parceiros (Dual List) */}
        <div className="space-y-4">
          <label className="text-[11px] font-black text-gray-800 block text-left uppercase tracking-[0.2em] ml-1">
            Parceiros
          </label>
          <div className="flex gap-4 items-center h-60">
            <div className="flex-1 border border-gray-200 rounded-2xl h-full overflow-hidden flex flex-col bg-white">
              <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
                {availPartners.length > 0 ? (
                  availPartners.map((p) => (
                    <div
                      key={p}
                      onClick={() =>
                        moveItem(
                          p,
                          availPartners,
                          setAvailPartners,
                          selectedPartners,
                          setSelectedPartners,
                        )
                      }
                      className="p-3 text-[11px] font-bold text-gray-600 hover:bg-emerald-50 hover:text-[#10b981] rounded-xl cursor-pointer text-left transition-all mb-1"
                    >
                      {p}
                    </div>
                  ))
                ) : (
                  <div className="h-full flex items-center justify-center text-[10px] text-gray-400 italic">
                    Nenhum disponível
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() =>
                  moveAll(
                    availPartners,
                    setAvailPartners,
                    selectedPartners,
                    setSelectedPartners,
                  )
                }
                className="p-2 border border-gray-200 rounded-lg bg-white hover:text-[#10b981] transition-all"
              >
                <ChevronsRight size={16} />
              </button>
              <button
                type="button"
                className="p-2 border border-gray-200 rounded-lg bg-white transition-all"
              >
                <ChevronRight size={16} />
              </button>
              <button
                type="button"
                className="p-2 border border-gray-200 rounded-lg bg-white transition-all"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() =>
                  moveAll(
                    selectedPartners,
                    setSelectedPartners,
                    availPartners,
                    setAvailPartners,
                  )
                }
                className="p-2 border border-gray-200 rounded-lg bg-white hover:text-[#10b981] transition-all"
              >
                <ChevronsLeft size={16} />
              </button>
            </div>

            <div className="flex-1 border-2 border-emerald-100 rounded-2xl h-full overflow-hidden flex flex-col bg-emerald-50/20 shadow-sm">
              <div className="flex-1 overflow-y-auto p-2">
                {selectedPartners.length > 0 ? (
                  selectedPartners.map((p) => (
                    <div
                      key={p}
                      onClick={() =>
                        moveItem(
                          p,
                          selectedPartners,
                          setSelectedPartners,
                          availPartners,
                          setAvailPartners,
                        )
                      }
                      className="p-3 text-[11px] font-black text-emerald-800 bg-white border border-emerald-200 rounded-xl mb-2 text-left shadow-sm"
                    >
                      {p}
                    </div>
                  ))
                ) : (
                  <div className="h-full flex items-center justify-center text-[10px] text-emerald-300 italic font-bold">
                    Nenhum selecionado
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* SWOT (Dual List) */}
        <div className="space-y-4">
          <label className="text-[11px] font-black text-gray-800 block text-left uppercase tracking-[0.2em] ml-1">
            SWOT
          </label>
          <div className="flex gap-4 items-center h-60">
            <div className="flex-1 border border-gray-200 rounded-2xl h-full overflow-hidden flex flex-col bg-white">
              <div className="flex-1 overflow-y-auto p-2">
                {availSwot.map((s) => (
                  <div
                    key={s}
                    onClick={() =>
                      moveItem(
                        s,
                        availSwot,
                        setAvailSwot,
                        selectedSwot,
                        setSelectedSwot,
                      )
                    }
                    className="p-3 text-[11px] font-bold text-gray-600 hover:bg-emerald-50 rounded-xl cursor-pointer text-left mb-1"
                  >
                    {s}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                className="p-2 border border-gray-200 rounded-lg bg-white"
              >
                <ChevronRight size={16} />
              </button>
              <button
                type="button"
                className="p-2 border border-gray-200 rounded-lg bg-white"
              >
                <ChevronLeft size={16} />
              </button>
            </div>
            <div className="flex-1 border border-gray-200 rounded-2xl h-full overflow-hidden flex flex-col bg-white">
              <div className="flex-1 overflow-y-auto p-2 flex items-center justify-center italic text-[10px] text-gray-400">
                {selectedSwot.length > 0
                  ? selectedSwot.join(", ")
                  : "Nenhum selecionado"}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
          <Link href="/dashboard/projects">
            <button
              type="button"
              className="px-8 py-3 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all"
            >
              Cancelar
            </button>
          </Link>
          <button
            onClick={handleSubmit(onSubmit)}
            className="flex items-center gap-2 px-12 py-3 bg-[#10b981] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#0da673] shadow-lg shadow-emerald-100 transition-all active:scale-95"
          >
            <Save size={16} /> Salvar Projeto
          </button>
        </div>
      </div>
    </motion.div>
  );
};
