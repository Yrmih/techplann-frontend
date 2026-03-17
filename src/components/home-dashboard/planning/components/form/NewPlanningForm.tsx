"use client";

import { useState, useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  Search,
  ChevronsRight,
  ChevronRight,
  ChevronLeft,
  ChevronsLeft,
  Save,
} from "lucide-react";
import { motion } from "framer-motion";

import { CustomSelect } from "@/components/ui/custom/CustomSelect";
import {
  planningSchema,
  PlanningFormValues,
} from "@/lib/validators/planning.schema";
import { IPlanning } from "@/types/interfaces/planning.interface";
import { Planejamento } from "@/hooks/usePlanejamentos";

interface NewPlanningFormProps {
  onBack: () => void;
  onSubmitSuccess: (data: IPlanning) => void;
  initialData?: Planejamento | null;
}

export const NewPlanningForm = ({
  onBack,
  onSubmitSuccess,
  initialData,
}: NewPlanningFormProps) => {
  const isEditing = !!initialData;

  // Listas Mestras de Opções
  const masterPartners = [
    "Frank Pereira Cardoso",
    "Renato Bordalo",
    "Maria Silva",
    "João Santos",
  ];

  const masterDeps = [
    "Comercial",
    "Contabilidade",
    "Departamento Pessoal",
    "Estoque",
    "Ti",
    "Rh",
  ];

  // INICIALIZAÇÃO DO ESTADO
  const [selectedPartners, setSelectedPartners] = useState<string[]>(() => {
    return initialData?.parceiros_nomes || [];
  });

  const [selectedDeps, setSelectedDeps] = useState<string[]>([]);

  // Filtros dinâmicos
  const availPartners = masterPartners.filter(
    (p) => !selectedPartners.includes(p),
  );
  const availDeps = masterDeps.filter((d) => !selectedDeps.includes(d));

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<PlanningFormValues>({
    resolver: zodResolver(planningSchema),
    defaultValues: {
      titulo: initialData?.nome || "",
      parceiroId: initialData ? "1" : "",
      departamentoId: "",
      responsaveisIds: [],
      situacao: initialData?.status || "Ativo",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        titulo: initialData.nome,
        parceiroId: "1",
        situacao: initialData.status,
      });
    }
  }, [initialData, reset]);

  const moveItem = (
    item: string,
    action: "add" | "remove",
    type: "partners" | "deps",
  ) => {
    if (type === "partners") {
      setSelectedPartners((prev) =>
        action === "add" ? [...prev, item] : prev.filter((i) => i !== item),
      );
    } else {
      setSelectedDeps((prev) =>
        action === "add" ? [...prev, item] : prev.filter((i) => i !== item),
      );
    }
  };

  const moveAll = (action: "add" | "remove", type: "partners" | "deps") => {
    if (type === "partners") {
      setSelectedPartners(action === "add" ? [...masterPartners] : []);
    } else {
      setSelectedDeps(action === "add" ? [...masterDeps] : []);
    }
  };

  const onSubmit: SubmitHandler<PlanningFormValues> = (data) => {
    const finalId = initialData?.id || String(new Date().getTime());

    const finalPlanning: IPlanning = {
      id: finalId,
      nome: data.titulo,
      cliente:
        selectedPartners.length > 0
          ? selectedPartners.join(", ")
          : "BC Development S/S LTDA",
      projetos: 0,
      status: data.situacao || "Ativo",
    };

    onSubmitSuccess(finalPlanning);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 pb-10 max-w-[1400px] mx-auto font-sans text-left"
    >
      {/* HEADER COM BOTÕES MAIS RETANGULARES/QUADRICULADOS */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-5">
          <button
            onClick={onBack}
            className="p-2.5 hover:bg-gray-100 rounded-full transition-all text-gray-400 hover:text-gray-900 border border-transparent"
          >
            <ArrowLeft size={22} />
          </button>
          <div className="text-left">
            <h1 className="text-2xl font-black text-gray-900 tracking-tight uppercase">
              {isEditing ? "Editar Planejamento" : "Novo Planejamento"}
            </h1>
            <p className="text-sm text-gray-500 font-medium">
              {isEditing
                ? "Atualize os dados do planejamento"
                : "Preencha os dados para criar um novo registro"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* BOTÃO CANCELAR: Retangular, borda fina, texto escuro */}
          <button
            onClick={onBack}
            type="button"
            className="px-8 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
          >
            Cancelar
          </button>
          {/* BOTÃO SALVAR: Retangular, verde sólido, ícone à esquerda */}
          <button
            onClick={handleSubmit(onSubmit)}
            className="flex items-center gap-2 px-8 py-2.5 bg-[#10b981] text-white rounded-lg text-sm font-bold hover:bg-[#0da673] transition-all shadow-sm active:scale-95 shadow-emerald-100"
          >
            <Save size={18} strokeWidth={2.5} /> Salvar
          </button>
        </div>
      </div>

      {/* CARD PRINCIPAL */}
      <div className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-sm space-y-12">
        <div className="grid grid-cols-2 gap-12 text-left">
          <div className="space-y-2.5 text-left">
            <label className="text-xs font-bold text-slate-400 ml-1 uppercase tracking-widest block">
              Nome do Planejamento <span className="text-red-500">*</span>
            </label>
            <input
              {...register("titulo")}
              placeholder="Digite o nome do planejamento"
              className={`w-full p-4 bg-slate-50 border ${
                errors.titulo ? "border-red-500" : "border-slate-100"
              } rounded-2xl text-sm outline-none focus:border-[#10b981] transition-all placeholder:text-slate-300 font-medium`}
            />
          </div>

          <div className="flex items-end gap-3 text-left">
            <div className="flex-1">
              <Controller
                name="parceiroId"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    label="Cliente *"
                    placeholder="Selecionar Cliente"
                    options={[{ value: "1", label: "BC Development S/S LTDA" }]}
                    value={field.value}
                    onValueChange={field.onChange}
                  />
                )}
              />
            </div>
            <button
              type="button"
              className="p-4 border border-slate-200 rounded-2xl bg-white hover:bg-slate-50 transition-all shadow-sm group"
            >
              <Search
                size={20}
                className="text-slate-400 group-hover:text-[#10b981]"
              />
            </button>
          </div>
        </div>

        <div className="space-y-2.5 text-left">
          <label className="text-xs font-bold text-slate-400 ml-1 uppercase tracking-widest block">
            Escopo do Planejamento
          </label>
          <textarea
            placeholder="Descreva o escopo do planejamento..."
            defaultValue={initialData?.descricao || ""}
            className="w-full h-36 p-5 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none focus:border-[#10b981] resize-none transition-all placeholder:text-slate-300 font-medium"
          />
        </div>

        <div className="w-1/3 text-left">
          <Controller
            name="situacao"
            control={control}
            render={({ field }) => (
              <CustomSelect
                label="Situação"
                placeholder="Selecionar"
                options={[
                  { value: "Ativo", label: "Ativo" },
                  { value: "Pausado", label: "Pausado" },
                  { value: "Concluído", label: "Concluído" },
                  { value: "Cancelado", label: "Cancelado" },
                ]}
                value={field.value}
                onValueChange={field.onChange}
              />
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-16 border-t border-slate-50 pt-10 text-left">
          {/* SEÇÃO PARCEIROS */}
          <div className="space-y-5 text-left">
            <label className="text-xs font-bold text-slate-500 block uppercase tracking-widest ml-1">
              Parceiros <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-5 items-center h-64">
              <div className="flex-1 border border-slate-200 rounded-2xl h-full overflow-hidden flex flex-col bg-white">
                <div className="p-3 bg-slate-50 text-[10px] font-bold text-slate-400 border-b uppercase tracking-widest text-left">
                  DISPONÍVEIS ({availPartners.length})
                </div>
                <div className="flex-1 overflow-y-auto p-1.5 custom-scrollbar">
                  {availPartners.map((p) => (
                    <div
                      key={p}
                      onClick={() => moveItem(p, "add", "partners")}
                      className="p-3 text-[11px] font-bold text-slate-600 hover:bg-emerald-50 hover:text-[#10b981] rounded-xl cursor-pointer transition-all text-left mb-0.5"
                    >
                      {p}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => moveAll("add", "partners")}
                  className="p-2 border border-slate-200 rounded-lg bg-white shadow-sm hover:text-[#10b981] transition-all"
                >
                  <ChevronsRight size={14} />
                </button>
                <button
                  type="button"
                  className="p-2 border border-slate-200 rounded-lg bg-white shadow-sm opacity-20 cursor-not-allowed"
                >
                  <ChevronRight size={14} />
                </button>
                <button
                  type="button"
                  className="p-2 border border-slate-200 rounded-lg bg-white shadow-sm opacity-20 cursor-not-allowed"
                >
                  <ChevronLeft size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => moveAll("remove", "partners")}
                  className="p-2 border border-slate-200 rounded-lg bg-white shadow-sm hover:text-[#10b981] transition-all"
                >
                  <ChevronsLeft size={14} />
                </button>
              </div>
              <div className="flex-1 border-2 border-emerald-100 rounded-2xl h-full overflow-hidden flex flex-col bg-emerald-50/10 shadow-sm">
                <div className="p-3 bg-emerald-100/50 text-[10px] font-bold text-emerald-700 border-b uppercase tracking-widest text-left">
                  SELECIONADOS ({selectedPartners.length})
                </div>
                <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
                  {selectedPartners.map((p) => (
                    <div
                      key={p}
                      onClick={() => moveItem(p, "remove", "partners")}
                      className="p-3 text-[11px] font-bold text-emerald-800 bg-white border border-emerald-200 rounded-xl mb-1.5 shadow-sm cursor-pointer text-left"
                    >
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* SEÇÃO DEPARTAMENTOS */}
          <div className="space-y-5 text-left">
            <label className="text-xs font-bold text-slate-500 block uppercase tracking-widest ml-1">
              Departamentos <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-5 items-center h-64">
              <div className="flex-1 border border-slate-200 rounded-2xl h-full overflow-hidden flex flex-col bg-white">
                <div className="p-3 bg-slate-50 text-[10px] font-bold text-slate-400 border-b uppercase tracking-widest text-left">
                  DISPONÍVEIS ({availDeps.length})
                </div>
                <div className="flex-1 overflow-y-auto p-1.5 custom-scrollbar">
                  {availDeps.map((d) => (
                    <div
                      key={d}
                      onClick={() => moveItem(d, "add", "deps")}
                      className="p-3 text-[11px] font-bold text-slate-600 hover:bg-emerald-50 hover:text-[#10b981] rounded-xl cursor-pointer transition-all mb-0.5 text-left"
                    >
                      {d}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => moveAll("add", "deps")}
                  className="p-2 border border-slate-200 rounded-lg bg-white shadow-sm hover:text-[#10b981] transition-all"
                >
                  <ChevronsRight size={14} />
                </button>
                <button
                  type="button"
                  className="p-2 border border-slate-200 rounded-lg bg-white shadow-sm opacity-20 cursor-not-allowed"
                >
                  <ChevronRight size={14} />
                </button>
                <button
                  type="button"
                  className="p-2 border border-slate-200 rounded-lg bg-white shadow-sm opacity-20 cursor-not-allowed"
                >
                  <ChevronLeft size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => moveAll("remove", "deps")}
                  className="p-2 border border-slate-200 rounded-lg bg-white shadow-sm hover:text-[#10b981] transition-all"
                >
                  <ChevronsLeft size={14} />
                </button>
              </div>
              <div className="flex-1 border-2 border-emerald-100 rounded-2xl h-full overflow-hidden flex flex-col bg-emerald-50/10 shadow-sm">
                <div className="p-3 bg-emerald-100/50 text-[10px] font-bold text-emerald-700 border-b uppercase tracking-widest text-left">
                  SELECIONADOS ({selectedDeps.length})
                </div>
                <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
                  {selectedDeps.map((d) => (
                    <div
                      key={d}
                      onClick={() => moveItem(d, "remove", "deps")}
                      className="p-3 text-[11px] font-bold text-emerald-800 bg-white border border-emerald-200 rounded-xl mb-1.5 shadow-sm cursor-pointer text-left"
                    >
                      {d}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-[10px] text-red-500 font-bold text-left ml-1 italic tracking-widest uppercase">
          * Campos obrigatórios
        </p>
      </div>
    </motion.div>
  );
};
