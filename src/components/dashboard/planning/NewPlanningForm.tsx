"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  ArrowLeft, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  Search,
  Users
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

import { CustomSelect } from "@/components/ui/custom/CustomSelect";
import { planningSchema, PlanningFormValues } from "@/lib/validators/planning.schema";

export const NewPlanningForm = () => {
  // Mock de dados para os seletores
  const parceiros = [
    { value: "1", label: "BC Development" },
    { value: "2", label: "ACME LTDA" }
  ];

  const departamentos = [
    { value: "fin", label: "Financeiro" },
    { value: "com", label: "Comercial" },
    { value: "ti", label: "Tecnologia" }
  ];

  // Lógica da Dual List (Responsáveis)
  const [available, setAvailable] = useState([
    { id: "1", name: "Ian Lima" },
    { id: "2", name: "Yrmih Ian" },
    { id: "3", name: "Admin Teste" },
  ]);
  const [selected, setSelected] = useState<{id: string, name: string}[]>([]);

  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm<PlanningFormValues>({
    resolver: zodResolver(planningSchema),
    defaultValues: { titulo: "", responsaveisIds: [] }
  });

  const moveToSelected = (item: {id: string, name: string}) => {
    setAvailable(prev => prev.filter(i => i.id !== item.id));
    const newSelected = [...selected, item];
    setSelected(newSelected);
    setValue("responsaveisIds", newSelected.map(i => i.id));
  };

  const moveToAvailable = (item: {id: string, name: string}) => {
    setSelected(prev => prev.filter(i => i.id !== item.id));
    setAvailable([...available, item]);
    setValue("responsaveisIds", selected.filter(i => i.id !== item.id).map(i => i.id));
  };

  const onSubmit = (data: PlanningFormValues) => {
    console.log("Criando Planejamento:", data);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="max-w-5xl mx-auto space-y-8"
    >
      {/* Header com Voltar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/planning">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-all text-gray-400 hover:text-gray-900">
              <ArrowLeft size={24} />
            </button>
          </Link>
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">Novo Planejamento</h1>
            <p className="text-sm text-gray-500 font-medium">Configure os parâmetros do novo ciclo estratégico.</p>
          </div>
        </div>
        <button 
          onClick={handleSubmit(onSubmit)}
          className="flex items-center gap-2 px-6 py-3 bg-[#10b981] text-white rounded-xl font-bold hover:bg-[#0da673] shadow-lg shadow-emerald-100 transition-all active:scale-95"
        >
          <CheckCircle2 size={18} /> Salvar Planejamento
        </button>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Coluna da Esquerda: Dados Básicos */}
        <div className="col-span-1 space-y-6 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="font-bold text-gray-900 flex items-center gap-2 border-b border-gray-50 pb-4">
             Configurações Gerais
          </h2>
          
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Título do Plano</label>
              <input 
                {...register("titulo")}
                placeholder="Ex: Estratégico 2025"
                className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-[#10b981] transition-all text-sm"
              />
            </div>

            <Controller
              name="parceiroId"
              control={control}
              render={({ field }) => (
                <CustomSelect 
                  label="Parceiro / Empresa"
                  placeholder="Selecione o parceiro"
                  options={parceiros}
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
                  label="Departamento"
                  placeholder="Selecione o setor"
                  options={departamentos}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
          </div>
        </div>

        {/* Coluna da Direita: Seleção de Responsáveis (Dual List) */}
        <div className="col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-gray-50 pb-4">
            <h2 className="font-bold text-gray-900 flex items-center gap-2">
              <Users size={18} className="text-[#10b981]" /> Responsáveis pelo Plano
            </h2>
            <span className="text-[10px] bg-emerald-50 text-[#10b981] px-2 py-1 rounded-md font-bold uppercase">
              {selected.length} Selecionados
            </span>
          </div>

          <div className="grid grid-cols-2 gap-6 h-[400px]">
            {/* Disponíveis */}
            <div className="flex flex-col border border-gray-100 rounded-xl overflow-hidden">
              <div className="p-3 bg-gray-50 border-b border-gray-100 relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                <input placeholder="Buscar..." className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-gray-200 rounded-lg outline-none focus:border-[#10b981]" />
              </div>
              <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {available.map(item => (
                  <button 
                    key={item.id}
                    onClick={() => moveToSelected(item)}
                    className="w-full flex items-center justify-between p-3 hover:bg-emerald-50 rounded-lg group transition-all text-left"
                  >
                    <span className="text-sm font-medium text-gray-600 group-hover:text-[#10b981]">{item.name}</span>
                    <ChevronRight size={16} className="text-gray-300 group-hover:text-[#10b981]" />
                  </button>
                ))}
              </div>
            </div>

            {/* Selecionados */}
            <div className="flex flex-col border border-emerald-100 bg-emerald-50/10 rounded-xl overflow-hidden">
              <div className="p-3 bg-emerald-50/50 border-b border-emerald-100">
                <span className="text-[10px] font-black text-[#10b981] uppercase tracking-widest">Lista de Selecionados</span>
              </div>
              <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {selected.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-gray-300 gap-2">
                    <Users size={32} />
                    <span className="text-[10px] font-bold uppercase">Nenhum selecionado</span>
                  </div>
                )}
                {selected.map(item => (
                  <button 
                    key={item.id}
                    onClick={() => moveToAvailable(item)}
                    className="w-full flex items-center justify-between p-3 bg-white border border-emerald-100 rounded-lg shadow-sm group hover:border-red-200 transition-all text-left"
                  >
                    <span className="text-sm font-bold text-gray-700">{item.name}</span>
                    <ChevronLeft size={16} className="text-emerald-500 group-hover:text-red-500" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};