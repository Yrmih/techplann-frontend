"use client";

import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  ChevronsRight,
  ChevronRight,
  ChevronLeft,
  ChevronsLeft,
  Calendar as CalendarIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/utils";

import { CustomSelect } from "@/components/ui/custom/CustomSelect";
import {
  projectSchema,
  ProjectFormValues,
} from "@/lib/validators/project.schema";
import { IProject } from "@/types/project.interface";

interface NewProjectFormProps {
  onBack: () => void;
  onSubmitSuccess: (data: IProject) => void;
}

export const NewProjectForm = ({
  onBack,
  onSubmitSuccess,
}: NewProjectFormProps) => {
  // --- ESTADOS DAS LISTAS PARALELAS ---
  const [availPartners, setAvailPartners] = useState<string[]>([
    "Lucas Almeida Ferreira",
    "RENATO BORDALO",
    "FRANK PEREIRA CARDOSO",
  ]);
  const [selectedPartners, setSelectedPartners] = useState<string[]>([]);

  const [availSwot, setAvailSwot] = useState<string[]>([
    "Ameaça Concorrência",
    "Fraqueza no TI",
    "Oportunidade de Mercado",
  ]);
  const [selectedSwot, setSelectedSwot] = useState<string[]>([]);

  // Hook Form com Zod
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
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

  const moveItem = (
    item: string,
    from: string[],
    setFrom: React.Dispatch<React.SetStateAction<string[]>>,
    to: string[],
    setTo: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setFrom(from.filter((i) => i !== item));
    setTo([...to, item]);
  };

  const moveAll = (
    from: string[],
    setFrom: React.Dispatch<React.SetStateAction<string[]>>,
    to: string[],
    setTo: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setTo((prev) => [...prev, ...from]);
    setFrom([]);
  };

  const onSubmit: SubmitHandler<ProjectFormValues> = (data) => {
    const timestampId = String(new Date().getTime());

    const finalProject: IProject = {
      id: timestampId,
      titulo: data.titulo,
      descricao: data.descricao || "",
      responsavelId: data.responsavelId,
      departamentoId: data.departamentoId,
      responsavelNome:
        data.responsavelId === "1" ? "Lucas Almeida Ferreira" : "Responsável",
      dataInicio: data.dataInicio,
      dataFinal: data.dataFinal,
      atividades: 0,
      subAtividades: 0,
      progresso: 0,
      situacao: data.situacao,
      parceiros: selectedPartners,
      swot: selectedSwot,
    };
    onSubmitSuccess(finalProject);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 pb-10 max-w-[1200px] mx-auto px-4"
    >
      {/* Header */}
      <div className="flex items-center gap-5 pt-4">
        <button
          onClick={onBack}
          className="p-2.5 hover:bg-gray-100 rounded-full transition-all text-gray-400 hover:text-gray-900 border border-transparent hover:border-gray-200"
        >
          <ArrowLeft size={22} />
        </button>
        <div className="text-left">
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Novo Projeto
          </h1>
          <p className="text-sm text-gray-500 font-medium">
            Configure os parâmetros do novo projeto do ciclo estratégico.
          </p>
        </div>
      </div>

      <div className="bg-white p-10 rounded-[32px] border border-gray-200 shadow-xl space-y-10">
        {/* Título do Projeto */}
        <div className="space-y-2 text-left">
          <label className="text-xs font-bold text-gray-700 ml-1 uppercase tracking-widest">
            Título do Projeto *
          </label>
          <input
            {...register("titulo")}
            placeholder="Digite o título do projeto"
            className={cn(
              "w-full p-4 bg-gray-50 border rounded-xl text-sm outline-none focus:border-[#10b981] transition-all",
              errors.titulo ? "border-red-500" : "border-gray-200",
            )}
          />
        </div>

        {/* Descrição do Projeto */}
        <div className="space-y-2 text-left">
          <label className="text-xs font-bold text-gray-700 ml-1 uppercase tracking-widest">
            Descrição do Projeto
          </label>
          <textarea
            {...register("descricao")}
            placeholder="Descreva os objetivos do projeto..."
            className="w-full h-32 p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#10b981] resize-none transition-all"
          />
        </div>

        {/* Responsável e Departamento */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <Controller
            name="responsavelId"
            control={control}
            render={({ field }) => (
              <CustomSelect
                label="Responsável *"
                placeholder="Selecione o responsável"
                options={[{ value: "1", label: "Lucas Almeida Ferreira" }]}
                value={field.value}
                onValueChange={field.onChange}
                error={!!errors.responsavelId}
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
                error={!!errors.departamentoId}
              />
            )}
          />
        </div>

        {/* Datas e Situação */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-700 ml-1 uppercase tracking-widest">
              Data de Início *
            </label>
            <div className="relative">
              <input
                {...register("dataInicio")}
                type="date"
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#10b981]"
              />
              <CalendarIcon
                size={18}
                className="absolute right-4 top-4 text-gray-400 pointer-events-none"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-700 ml-1 uppercase tracking-widest">
              Data Final *
            </label>
            <div className="relative">
              <input
                {...register("dataFinal")}
                type="date"
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#10b981]"
              />
              <CalendarIcon
                size={18}
                className="absolute right-4 top-4 text-gray-400 pointer-events-none"
              />
            </div>
          </div>
          <Controller
            name="situacao"
            control={control}
            render={({ field }) => (
              <CustomSelect
                label="Situação do Projeto *"
                placeholder="Não Iniciado"
                options={[
                  { value: "nao-iniciado", label: "Não Iniciado" },
                  { value: "em-andamento", label: "Em Andamento" },
                  { value: "atrasado", label: "Atrasado" },
                  { value: "concluido", label: "Concluído" },
                  { value: "cancelado", label: "Cancelado" },
                ]}
                value={field.value}
                onValueChange={field.onChange}
              />
            )}
          />
        </div>

        {/* 5. Parceiros (Dual List) */}
        <div className="space-y-4 text-left pt-6 border-t border-gray-100">
          <label className="text-xs font-black text-gray-800 block uppercase tracking-widest ml-1">
            Parceiros
          </label>
          <div className="flex gap-4 items-center h-64">
            {/* Disponíveis */}
            <div className="flex-1 border border-gray-200 rounded-2xl h-full overflow-hidden bg-white shadow-sm flex flex-col">
              <div className="p-3 bg-gray-100 text-[10px] font-bold text-gray-500 border-b border-gray-200 uppercase tracking-tighter">
                Disponíveis ({availPartners.length})
              </div>
              <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
                {availPartners.map((p) => (
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
                    className="p-3 text-[11px] font-medium text-gray-600 hover:bg-emerald-50 hover:text-[#10b981] rounded-xl cursor-pointer transition-all mb-0.5"
                  >
                    {p}
                  </div>
                ))}
              </div>
            </div>

            {/* Setas Centrais */}
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
                className="p-2.5 border border-gray-200 rounded-xl bg-white shadow-sm hover:border-[#10b981] hover:text-[#10b981] transition-all active:scale-95"
              >
                <ChevronsRight size={16} />
              </button>
              <button
                type="button"
                className="p-2.5 border border-gray-200 rounded-xl bg-white shadow-sm opacity-20 cursor-not-allowed"
              >
                <ChevronRight size={16} />
              </button>
              <button
                type="button"
                className="p-2.5 border border-gray-200 rounded-xl bg-white shadow-sm opacity-20 cursor-not-allowed"
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
                className="p-2.5 border border-gray-200 rounded-xl bg-white shadow-sm hover:border-[#10b981] hover:text-[#10b981] transition-all active:scale-95"
              >
                <ChevronsLeft size={16} />
              </button>
            </div>

            {/* Selecionados */}
            <div className="flex-1 border-2 border-emerald-100 rounded-2xl h-full overflow-hidden bg-emerald-50/10 shadow-sm flex flex-col">
              <div className="p-3 bg-emerald-100/50 text-[10px] font-bold text-emerald-700 border-b border-emerald-200 uppercase tracking-tighter">
                Selecionados ({selectedPartners.length})
              </div>
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
                      className="p-3 text-[11px] font-black text-emerald-800 bg-white border border-emerald-200 rounded-xl mb-1.5 shadow-sm cursor-pointer"
                    >
                      {p}
                    </div>
                  ))
                ) : (
                  <div className="h-full flex items-center justify-center text-[10px] text-gray-400 italic font-bold">
                    Nenhum selecionado
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 6. SWOT (Dual List com as mesmas setas de cima) */}
        <div className="space-y-4 pt-6 border-t border-gray-50 text-left">
          <label className="text-xs font-black text-gray-800 block uppercase tracking-widest ml-1">
            SWOT
          </label>
          <div className="flex gap-4 items-center h-64">
            {/* Disponíveis SWOT */}
            <div className="flex-1 border border-gray-200 rounded-2xl h-full overflow-hidden bg-white shadow-sm flex flex-col">
              <div className="p-3 bg-gray-100 text-[10px] font-bold text-gray-500 border-b border-gray-200 uppercase tracking-tighter">
                Disponíveis ({availSwot.length})
              </div>
              <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
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
                    className="p-3 text-[11px] font-medium text-gray-600 hover:bg-emerald-50 hover:text-[#10b981] rounded-xl cursor-pointer transition-all mb-0.5"
                  >
                    {s}
                  </div>
                ))}
              </div>
            </div>

            {/* Setas Centrais SWOT (Agora igual à seção de Parceiros) */}
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() =>
                  moveAll(
                    availSwot,
                    setAvailSwot,
                    selectedSwot,
                    setSelectedSwot,
                  )
                }
                className="p-2.5 border border-gray-200 rounded-xl bg-white shadow-sm hover:border-[#10b981] hover:text-[#10b981] transition-all active:scale-95"
              >
                <ChevronsRight size={16} />
              </button>
              <button
                type="button"
                className="p-2.5 border border-gray-200 rounded-xl bg-white shadow-sm opacity-20 cursor-not-allowed"
              >
                <ChevronRight size={16} />
              </button>
              <button
                type="button"
                className="p-2.5 border border-gray-200 rounded-xl bg-white shadow-sm opacity-20 cursor-not-allowed"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() =>
                  moveAll(
                    selectedSwot,
                    setSelectedSwot,
                    availSwot,
                    setAvailSwot,
                  )
                }
                className="p-2.5 border border-gray-200 rounded-xl bg-white shadow-sm hover:border-[#10b981] hover:text-[#10b981] transition-all active:scale-95"
              >
                <ChevronsLeft size={16} />
              </button>
            </div>

            {/* Selecionados SWOT (Agora como Lista igual à de Parceiros conforme solicitado) */}
            <div className="flex-1 border-2 border-emerald-100 rounded-2xl h-full overflow-hidden bg-emerald-50/10 shadow-sm flex flex-col">
              <div className="p-3 bg-emerald-100/50 text-[10px] font-bold text-emerald-700 border-b border-emerald-200 uppercase tracking-tighter">
                Selecionados ({selectedSwot.length})
              </div>
              <div className="flex-1 overflow-y-auto p-2">
                {selectedSwot.length > 0 ? (
                  selectedSwot.map((s) => (
                    <div
                      key={s}
                      onClick={() =>
                        moveItem(
                          s,
                          selectedSwot,
                          setSelectedSwot,
                          availSwot,
                          setAvailSwot,
                        )
                      }
                      className="p-3 text-[11px] font-black text-emerald-800 bg-white border border-emerald-200 rounded-xl mb-1.5 shadow-sm cursor-pointer"
                    >
                      {s}
                    </div>
                  ))
                ) : (
                  <div className="h-full flex items-center justify-center text-[10px] text-gray-400 italic font-bold">
                    Nenhum selecionado
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
          <button
            type="button"
            onClick={onBack}
            className="px-8 py-2.5 bg-white border border-gray-300 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit(onSubmit)}
            className="px-12 py-2.5 bg-[#10b981] text-white rounded-xl text-xs font-black hover:bg-[#0da673] shadow-lg shadow-emerald-100/50 transition-all active:scale-95 uppercase tracking-widest"
          >
            SALVAR
          </button>
        </div>
      </div>
    </motion.div>
  );
};
