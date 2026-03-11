"use client";

import { useEffect } from "react";
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
  initialData?: IProject | null;
}

export const NewProjectForm = ({
  onBack,
  onSubmitSuccess,
  initialData,
}: NewProjectFormProps) => {
  const isEditing = !!initialData;

  // Listas Mestras (Opções fixas do sistema)
  const masterPartners = [
    "Lucas Almeida Ferreira",
    "Renato Bordalo",
    "Frank Pereira Cardoso",
  ];

  const masterSwot = [
    "Ameaça Concorrência",
    "Fraqueza no TI",
    "Oportunidade de Mercado",
  ];

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
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
      parceiros: [],
      swot: [],
    },
  });

  // Observa os valores em tempo real para as Dual Lists
  const selectedPartners = watch("parceiros") || [];
  const selectedSwot = watch("swot") || [];

  // Filtra o que está disponível baseando-se no que já foi selecionado
  const availPartners = masterPartners.filter(
    (p) => !selectedPartners.includes(p),
  );
  const availSwot = masterSwot.filter((s) => !selectedSwot.includes(s));

  // Efeito para carregar dados de edição (Mata o erro de cascading renders)
  useEffect(() => {
    if (initialData) {
      reset({
        titulo: initialData.titulo,
        descricao: initialData.descricao,
        responsavelId: initialData.responsavelId,
        departamentoId: initialData.departamentoId,
        dataInicio: initialData.dataInicio,
        dataFinal: initialData.dataFinal,
        situacao: initialData.situacao,
        parceiros: initialData.parceiros || [],
        swot: initialData.swot || [],
      });
    }
  }, [initialData, reset]);

  // Funções de movimentação via Hook Form (Performático)
  const handleMove = (
    item: string,
    field: "parceiros" | "swot",
    action: "add" | "remove",
  ) => {
    const current = watch(field);
    if (action === "add") {
      setValue(field, [...current, item]);
    } else {
      setValue(
        field,
        current.filter((i) => i !== item),
      );
    }
  };

  const handleMoveAll = (
    field: "parceiros" | "swot",
    action: "add" | "remove",
  ) => {
    if (action === "add") {
      setValue(field, field === "parceiros" ? masterPartners : masterSwot);
    } else {
      setValue(field, []);
    }
  };

  const onSubmit: SubmitHandler<ProjectFormValues> = (data) => {
    const timestampId = initialData?.id || String(new Date().getTime());

    const finalProject: IProject = {
      ...initialData,
      id: timestampId,
      titulo: data.titulo,
      descricao: data.descricao,
      responsavelId: data.responsavelId,
      departamentoId: data.departamentoId,
      responsavelNome:
        data.responsavelId === "1" ? "Lucas Almeida Ferreira" : "Responsável",
      dataInicio: data.dataInicio,
      dataFinal: data.dataFinal,
      situacao: data.situacao,
      parceiros: data.parceiros,
      swot: data.swot,
      atividades: initialData?.atividades || 0,
      subAtividades: initialData?.subAtividades || 0,
      progresso: initialData?.progresso || 0,
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
      <div className="flex items-center gap-5 pt-4 text-left">
        <button
          onClick={onBack}
          className="p-2.5 hover:bg-gray-100 rounded-full border border-transparent hover:border-gray-200 transition-all text-gray-400 hover:text-gray-900"
        >
          <ArrowLeft size={22} />
        </button>
        <div className="text-left">
          <h1 className="text-2xl font-black text-gray-900 tracking-tight uppercase">
            {isEditing ? "Editar Projeto" : "Novo Projeto"}
          </h1>
          <p className="text-sm text-gray-500 font-medium text-left">
            {isEditing
              ? "Atualize as informações do seu projeto estratégico."
              : "Configure os parâmetros do novo projeto do ciclo estratégico."}
          </p>
        </div>
      </div>

      <div className="bg-white p-10 rounded-[32px] border border-gray-200 shadow-xl space-y-10">
        {/* 1. Título do Projeto */}
        <div className="space-y-2 text-left">
          <label className="text-xs font-bold text-gray-700 ml-1 uppercase tracking-widest">
            Título do Projeto *
          </label>
          <input
            {...register("titulo")}
            placeholder="Digite o título"
            className={cn(
              "w-full p-4 bg-gray-50 border rounded-xl text-sm outline-none focus:border-[#10b981] transition-all",
              errors.titulo ? "border-red-500" : "border-gray-200",
            )}
          />
        </div>

        {/* 2. Descrição do Projeto */}
        <div className="space-y-2 text-left">
          <label className="text-xs font-bold text-gray-700 ml-1 uppercase tracking-widest">
            Descrição
          </label>
          <textarea
            {...register("descricao")}
            placeholder="Descreva os objetivos..."
            className="w-full h-32 p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#10b981] resize-none transition-all"
          />
        </div>

        {/* 3. Responsável e Departamento */}
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
                  { value: "1", label: "Núcleo Criativo Orion" },
                  { value: "2", label: "Comercial" },
                ]}
                value={field.value}
                onValueChange={field.onChange}
                error={!!errors.departamentoId}
              />
            )}
          />
        </div>

        {/* 4. Datas e Situação */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-700 ml-1 uppercase tracking-widest">
              Data Início *
            </label>
            <div className="relative">
              <input
                {...register("dataInicio")}
                type="date"
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm"
              />
              <CalendarIcon
                size={18}
                className="absolute right-4 top-4 text-gray-400"
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
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm"
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
                label="Situação *"
                placeholder="Selecione"
                options={[
                  { value: "nao-iniciado", label: "Não Iniciado" },
                  { value: "em-andamento", label: "Em Andamento" },
                  { value: "atrasado", label: "Atrasado" },
                  { value: "concluido", label: "Concluído" },
                ]}
                value={field.value}
                onValueChange={field.onChange}
              />
            )}
          />
        </div>

        {/* 5. Parceiros (Dual List Corrigida) */}
        <div className="space-y-4 pt-6 border-t border-gray-100">
          <label className="text-xs font-black text-gray-800 uppercase tracking-widest text-left block">
            Parceiros
          </label>
          <div className="flex gap-4 items-center h-64">
            <div className="flex-1 border border-gray-200 rounded-2xl h-full overflow-hidden bg-white shadow-sm flex flex-col text-left">
              <div className="p-3 bg-gray-50 text-[10px] font-bold text-gray-500 border-b uppercase tracking-tighter">
                Disponíveis ({availPartners.length})
              </div>
              <div className="flex-1 overflow-y-auto p-2">
                {availPartners.map((p) => (
                  <div
                    key={p}
                    onClick={() => handleMove(p, "parceiros", "add")}
                    className="p-3 text-[11px] font-medium text-gray-600 hover:bg-emerald-50 hover:text-[#10b981] rounded-xl cursor-pointer transition-all mb-0.5 text-left"
                  >
                    {p}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => handleMoveAll("parceiros", "add")}
                className="p-2.5 border border-gray-200 rounded-xl bg-white shadow-sm hover:text-[#10b981] transition-all"
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
                onClick={() => handleMoveAll("parceiros", "remove")}
                className="p-2.5 border border-gray-200 rounded-xl bg-white shadow-sm hover:text-[#10b981] transition-all"
              >
                <ChevronsLeft size={16} />
              </button>
            </div>

            <div className="flex-1 border-2 border-emerald-100 rounded-2xl h-full overflow-hidden bg-emerald-50/10 flex flex-col text-left">
              <div className="p-3 bg-emerald-100/50 text-[10px] font-bold text-emerald-700 border-b uppercase tracking-tighter">
                Selecionados ({selectedPartners.length})
              </div>
              <div className="flex-1 overflow-y-auto p-2">
                {selectedPartners.length > 0 ? (
                  selectedPartners.map((p) => (
                    <div
                      key={p}
                      onClick={() => handleMove(p, "parceiros", "remove")}
                      className="p-3 text-[11px] font-black text-emerald-800 bg-white border border-emerald-200 rounded-xl mb-1.5 shadow-sm cursor-pointer text-left"
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

        {/* 6. SWOT (Dual List Corrigida) */}
        <div className="space-y-4 pt-6 border-t border-gray-100">
          <label className="text-xs font-black text-gray-800 uppercase tracking-widest text-left block">
            SWOT
          </label>
          <div className="flex gap-4 items-center h-64">
            <div className="flex-1 border border-gray-200 rounded-2xl h-full overflow-hidden bg-white shadow-sm flex flex-col text-left">
              <div className="p-3 bg-gray-50 text-[10px] font-bold text-gray-500 border-b uppercase tracking-tighter">
                Disponíveis ({availSwot.length})
              </div>
              <div className="flex-1 overflow-y-auto p-2">
                {availSwot.map((s) => (
                  <div
                    key={s}
                    onClick={() => handleMove(s, "swot", "add")}
                    className="p-3 text-[11px] font-medium text-gray-600 hover:bg-emerald-50 hover:text-[#10b981] rounded-xl cursor-pointer text-left"
                  >
                    {s}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => handleMoveAll("swot", "add")}
                className="p-2.5 border border-gray-200 rounded-xl bg-white shadow-sm hover:text-[#10b981] transition-all"
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
                onClick={() => handleMoveAll("swot", "remove")}
                className="p-2.5 border border-gray-200 rounded-xl bg-white shadow-sm hover:text-[#10b981] transition-all"
              >
                <ChevronsLeft size={16} />
              </button>
            </div>

            <div className="flex-1 border border-gray-200 rounded-2xl h-full overflow-hidden bg-white shadow-sm flex flex-col text-left">
              <div className="p-3 bg-gray-100 text-[10px] font-bold text-gray-500 border-b uppercase tracking-tighter">
                Selecionados ({selectedSwot.length})
              </div>
              <div className="flex-1 overflow-y-auto p-2">
                {selectedSwot.length > 0 ? (
                  selectedSwot.map((s) => (
                    <div
                      key={s}
                      onClick={() => handleMove(s, "swot", "remove")}
                      className="p-3 text-[11px] font-black text-emerald-800 bg-white border border-emerald-200 rounded-xl mb-1.5 shadow-sm cursor-pointer text-left"
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
            className="px-8 py-3 bg-white border border-gray-300 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit(onSubmit)}
            className="px-12 py-3 bg-[#10b981] text-white rounded-xl text-xs font-black hover:bg-[#0da673] shadow-lg shadow-emerald-100/50 transition-all active:scale-95 uppercase tracking-widest"
          >
            {isEditing ? "SALVAR ALTERAÇÕES" : "SALVAR PROJETO"}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
