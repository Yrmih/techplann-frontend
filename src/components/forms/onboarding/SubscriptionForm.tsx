"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Check, Info } from "lucide-react";

import { NextButton } from "../../ui/custom/NextButton";
import {
  planSelectionSchema,
  type PlanSelectionData,
} from "@/lib/validators/schema";
import { cn } from "@/lib/utils";

// Definição clara para evitar erro de propriedade inexistente (ts2339)
interface PlanOption {
  id: "starter" | "professional" | "enterprise";
  name: string;
  price: string;
  features: string[];
  popular?: boolean;
}

const plans: PlanOption[] = [
  {
    id: "starter",
    name: "Starter",
    price: "49,90",
    features: ["1 planejamento", "Até 5 usuários", "Suporte por email"],
    popular: false,
  },
  {
    id: "professional",
    name: "Professional",
    price: "149,90",
    features: [
      "5 planejamentos",
      "Até 20 usuários",
      "Suporte prioritário",
      "Relatórios avançados",
    ],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "349,90",
    features: [
      "Planejamentos ilimitados",
      "Usuários ilimitados",
      "Suporte 24/7",
      "API access",
      "White label",
    ],
    popular: false,
  },
];

export const SubscriptionForm = () => {
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
    console.log("Plano Selecionado:", data);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-10 shadow-sm max-w-6xl mx-auto font-sans">
      <header className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900">Plano</h2>
        <p className="text-sm text-gray-500 mt-1">
          Escolha o plano ideal para sua empresa
        </p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Ajuste no alinhamento: items-start para permitir alturas diferentes (efeito escadinha) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              whileHover={{ scale: 1.04, translateY: -8 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setValue("plan", plan.id)}
              className={cn(
                "relative cursor-pointer rounded-2xl border-2 p-6 transition-all duration-300 flex flex-col",
                "hover:border-[#10b981] hover:shadow-2xl hover:shadow-green-100/50",
                selectedPlan === plan.id
                  ? "border-[#10b981] bg-emerald-50 shadow-sm"
                  : "border-gray-100 bg-white",
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#10b981] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider z-10">
                  Mais Popular
                </div>
              )}

              <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>

              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-black text-[#10b981]">
                  R$ {plan.price}
                </span>
                <span className="text-gray-400 text-xs font-medium">/mês</span>
              </div>

              {/* Removido o flex-grow para permitir que o card termine onde o conteúdo acaba */}
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <Check
                      size={16}
                      className="text-[#10b981]"
                      strokeWidth={3}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Banner de Garantia fiel à image_f3ec15.png */}
        <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-center text-xs text-gray-500 gap-4 border border-gray-100">
          <span className="font-bold text-gray-900 underline decoration-[#10b981] underline-offset-4 decoration-2">
            7 dias grátis
          </span>
          <span className="text-gray-300">•</span>
          <span>Cancele a qualquer momento</span>
          <span className="text-gray-300">•</span>
          <span>Debitado via cartão de crédito</span>
        </div>

        {errors.plan && (
          <div className="flex items-center justify-center gap-2 text-red-500 font-bold text-[10px] uppercase tracking-widest bg-red-50 py-2 rounded-lg">
            <Info size={14} />
            {errors.plan.message}
          </div>
        )}

        <hr className="border-gray-100 my-8" />

        <NextButton
          onBack={() => window.history.back()}
          nextLabel="Próximo"
          isSubmitting={isSubmitting}
        />
      </form>
    </div>
  );
};
