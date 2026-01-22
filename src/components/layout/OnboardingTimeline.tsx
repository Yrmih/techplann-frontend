
"use client";

import { usePathname } from "next/navigation";
import { User, Building2, Sparkles, CreditCard, Check } from "lucide-react";

// Definição das etapas para facilitar a manutenção
const STEPS = [
  { id: "account", label: "Responsável", path: "/onboarding/account", icon: User },
  { id: "organization", label: "Empresa", path: "/onboarding/organization", icon: Building2 },
  { id: "subscription", label: "Plano", path: "/onboarding/subscription", icon: Sparkles },
  { id: "billing", label: "Pagamento", path: "/onboarding/billing", icon: CreditCard },
  { id: "final", label: "Conta", path: "/onboarding/final", icon: Check },
];

export const OnboardingTimeline = () => {
  const pathname = usePathname();

  // Lógica para determinar o índice atual baseado na URL
  const currentStepIndex = STEPS.findIndex((step) => pathname.includes(step.path));

  return (
    <div className="w-full py-8 bg-white border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-4">
        <div className="relative flex items-center justify-between">
          
          {/* Linha de progresso de fundo (cinza) */}
          <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-100 -z-10" />

          {STEPS.map((step, index) => {
            const isCompleted = index < currentStepIndex;
            const isActive = index === currentStepIndex;
            const Icon = step.icon;

            return (
              <div key={step.id} className="flex flex-col items-center flex-1">
                {/* Círculo do Ícone */}
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                    isCompleted || isActive
                      ? "bg-[#10b981] border-[#10b981] text-white"
                      : "bg-white border-gray-200 text-gray-400"
                  } ${isActive ? "ring-4 ring-green-50" : ""}`}
                >
                  {isCompleted ? (
                    <Check size={20} strokeWidth={3} />
                  ) : (
                    <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  )}
                </div>

                {/* Label do Step */}
                <span
                  className={`mt-3 text-xs font-medium transition-colors duration-300 ${
                    isActive ? "text-[#10b981]" : "text-gray-400"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};