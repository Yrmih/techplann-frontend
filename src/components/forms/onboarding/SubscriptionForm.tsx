"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Check, Info } from "lucide-react";

import { NextButton } from "./NextButton";
import { planSelectionSchema, type PlanSelectionData } from "@/lib/validators/schema";
import { cn } from "@/lib/utils";

export const PlanForm = () => {
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<PlanSelectionData>({
    resolver: zodResolver(planSelectionSchema),
  });

  const selectedPlan = watch("plan");

  const onSubmit = (data: PlanSelectionData) => {
    console.log("Plano Finalizado:", data);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-10 shadow-sm max-w-5xl mx-auto font-sans">
      <header className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900">Escolha seu plano</h2>
        <p className="text-sm text-gray-500 mt-1">Selecione a assinatura que melhor atende sua organização</p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card: Plano Mensal */}
          <motion.div
            whileHover={{ scale: 1.03, translateY: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setValue("plan", "monthly")}
            className={cn(
              "group relative cursor-pointer rounded-2xl border-2 p-8 transition-all duration-300",
              "hover:border-[#10b981] hover:shadow-[0_20px_50px_rgba(16,185,129,0.1)]",
              selectedPlan === "monthly" 
                ? "border-[#10b981] bg-emerald-50/40 shadow-md" 
                : "border-gray-100 bg-white"
            )}
          >
            <div className={cn(
              "absolute top-5 right-5 h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all",
              selectedPlan === "monthly" ? "bg-[#10b981] border-[#10b981]" : "border-gray-200"
            )}>
              {selectedPlan === "monthly" && <Check size={14} className="text-white" strokeWidth={3} />}
            </div>

            <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#10b981] transition-colors">Mensal</h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-black text-gray-900">R$ 99</span>
              <span className="text-gray-400 text-sm font-medium">/mês</span>
            </div>
            <p className="mt-6 text-sm text-gray-500 leading-relaxed">
              Pagamento recorrente mês a mês. Ideal para projetos de curto prazo e flexibilidade total.
            </p>
          </motion.div>

          {/* Card: Plano Anual */}
          <motion.div
            whileHover={{ scale: 1.03, translateY: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setValue("plan", "yearly")}
            className={cn(
              "group relative cursor-pointer rounded-2xl border-2 p-8 transition-all duration-300",
              "hover:border-[#10b981] hover:shadow-[0_20px_50px_rgba(16,185,129,0.1)]",
              selectedPlan === "yearly" 
                ? "border-[#10b981] bg-emerald-50/40 shadow-md" 
                : "border-gray-100 bg-white"
            )}
          >
            <div className="absolute -top-3 left-8 bg-[#10b981] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
              Economize 20%
            </div>
            
            <div className={cn(
              "absolute top-5 right-5 h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all",
              selectedPlan === "yearly" ? "bg-[#10b981] border-[#10b981]" : "border-gray-200"
            )}>
              {selectedPlan === "yearly" && <Check size={14} className="text-white" strokeWidth={3} />}
            </div>

            <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#10b981] transition-colors">Anual</h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-black text-gray-900">R$ 79</span>
              <span className="text-gray-400 text-sm font-medium">/mês</span>
            </div>
            <p className="mt-6 text-sm text-gray-500 leading-relaxed">
              Pagamento único anual. Acesso completo a todas as ferramentas de análise SWOT e BSC.
            </p>
          </motion.div>
        </div>

        {errors.plan && (
          <div className="flex items-center justify-center gap-2 text-red-500 bg-red-50 p-3 rounded-lg animate-bounce">
            <Info size={16} />
            <p className="text-xs font-bold uppercase tracking-wide">{errors.plan.message}</p>
          </div>
        )}

        <hr className="border-gray-100 my-10" />

        <NextButton 
          onBack={() => window.history.back()} 
          nextLabel="Finalizar Registro" 
          isSubmitting={isSubmitting}
        />
      </form>
    </div>
  );
};