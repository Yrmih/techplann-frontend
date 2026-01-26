"use client";

import { useState } from "react";
import { motion } from "framer-motion"; // Removido AnimatePresence
import { Check, ChevronRight } from "lucide-react";
import Link from "next/link";

const pricingPlans = [
  {
    name: "Essencial",
    description: "Para pequenas empresas que buscam organizar sua estratégia",
    monthlyPrice: 297.90,
    annualPrice: 238.32,
    buttonText: "Começar Agora",
    features: ["Até 5 planejamentos", "Análise SWOT completa", "Business Model Canvas", "5 usuários inclusos", "Dashboard básico", "Suporte por email"],
    popular: false
  },
  {
    name: "Professional",
    description: "Para empresas em crescimento com análises avançadas",
    monthlyPrice: 497.90,
    annualPrice: 398.32,
    buttonText: "Teste Grátis 7 dias",
    features: ["Planejamentos ilimitados", "SWOT, Canvas e BSC completos", "Gestão de projetos Kanban", "15 usuários inclusos", "Dashboard analytics avançado", "Cultura organizacional", "Suporte prioritário", "Exportação PDF/Excel"],
    popular: true
  },
  {
    name: "Enterprise",
    description: "Solução completa para grandes organizações",
    monthlyPrice: 997.90,
    annualPrice: 798.32,
    buttonText: "Falar com Vendas",
    features: ["Tudo do Professional", "Usuários ilimitados", "Multi-empresas", "API de integração", "SSO/SAML", "Gerente de sucesso dedicado", "SLA garantido 99.9%", "Treinamento personalizado", "Consultoria estratégica"],
    popular: false
  }
];

export const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  return (
    <section id="planos" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Cabeçalho */}
        <div className="text-center mb-16">
          <span className="px-3 py-1 rounded-full bg-gray-100 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4 inline-block">Planos</span>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Escolha o plano ideal para você</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Comece grátis e escale conforme sua empresa cresce.</p>
        </div>

        {/* Toggle com Hover no -20% */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-50 p-1.5 rounded-2xl border border-gray-100 flex items-center gap-1">
            <button 
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${billingCycle === "monthly" ? "bg-white text-gray-900 shadow-md" : "text-gray-400 hover:text-gray-600"}`}
            >
              Mensal
            </button>
            <button 
              onClick={() => setBillingCycle("annual")}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${billingCycle === "annual" ? "bg-white text-gray-900 shadow-md" : "text-gray-400 hover:text-gray-600"}`}
            >
              Anual 
              <motion.span 
                whileHover={{ scale: 1.1 }}
                className="bg-[#10b981] text-white text-[10px] px-2 py-0.5 rounded-full"
              >
                -20%
              </motion.span>
            </button>
          </div>
        </div>

        {/* Cards de Planos com efeito de escala */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {pricingPlans.map((plan) => (
            <motion.div
              key={plan.name}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`relative p-8 rounded-[2rem] border flex flex-col transition-shadow hover:shadow-2xl hover:shadow-emerald-900/10 ${plan.popular ? "border-[#10b981] ring-1 ring-[#10b981]" : "border-gray-100 bg-white"}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#10b981] text-white px-4 py-1 rounded-full flex items-center gap-1.5 shadow-lg">
                  <span className="text-[10px] font-bold">⭐ Mais Popular</span>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{plan.description}</p>
              </div>

              <div className="mb-8 h-16">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-gray-900">
                    R$ {billingCycle === "monthly" 
                      ? plan.monthlyPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) 
                      : plan.annualPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })
                    }
                  </span>
                  <span className="text-gray-400 font-medium text-sm">/mês</span>
                </div>
              </div>

              {/* Redirecionamento para Step 1 - Company */}
              <Link 
                href="/onboarding/company"
                className={`w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all mb-8 ${plan.popular ? "bg-[#10b981] text-white hover:bg-[#0da673]" : "bg-gray-50 text-gray-900 hover:bg-gray-100"}`}
              >
                {plan.buttonText}
                <ChevronRight size={16} />
              </Link>

              <div className="space-y-4 flex-1">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <div className="mt-1 w-4 h-4 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                      <Check size={10} className="text-[#10b981]" />
                    </div>
                    <span className="text-gray-500 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};