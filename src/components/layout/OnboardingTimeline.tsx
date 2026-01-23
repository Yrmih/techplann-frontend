"use client";

import { usePathname } from "next/navigation";
import { Building2, User, Sparkles, CreditCard, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: "organization", label: "Empresa", path: "/onboarding/organization", icon: Building2 },
  { id: "representative", label: "Responsável", path: "/onboarding/representative", icon: User },
  { id: "subscription", label: "Plano", path: "/onboarding/subscription", icon: Sparkles },
  { id: "billing", label: "Pagamento", path: "/onboarding/billing", icon: CreditCard },
  { id: "account", label: "Conta", path: "/onboarding/account", icon: Check },
];

export const OnboardingTimeline = () => {
  const pathname = usePathname();
  const currentStepIndex = STEPS.findIndex((step) => pathname.includes(step.path));

  return (
    <div className="w-full pt-12 pb-6 bg-transparent">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-start justify-between">
          {STEPS.map((step, index) => {
            const isCompleted = index < currentStepIndex;
            const isActive = index === currentStepIndex;
            const Icon = step.icon;

            return (
              <div key={step.id} className="flex items-center flex-1 last:flex-none">
                {/* Container do Passo */}
                <div className="flex flex-col items-center relative min-w-[80px]">
                  <div
                    className={cn(
                      "w-11 h-11 rounded-full flex items-center justify-center transition-all duration-500 border-2",
                      isCompleted || isActive
                        ? "bg-[#10b981] border-[#10b981] text-white shadow-lg shadow-green-100"
                        : "bg-[#f8fafc] border-gray-100 text-gray-400"
                    )}
                  >
                    {/* Se estiver completo, mostra Check, se não, o ícone do step */}
                    {isCompleted ? (
                      <Check size={18} strokeWidth={3} />
                    ) : (
                      <Icon 
                        size={index === 2 ? 22 : 20} // O ícone de Sparkles (Plano) costuma ser levemente maior
                        strokeWidth={isActive ? 2.5 : 2} 
                        className={cn(isActive && "animate-pulse")}
                      />
                    )}
                  </div>

                  <span
                    className={cn(
                      "mt-3 text-[11px] font-bold uppercase tracking-wider transition-colors duration-300",
                      isActive ? "text-[#10b981]" : "text-gray-400"
                    )}
                  >
                    {step.label}
                  </span>
                </div>

                {/* Linha Conectora (não renderiza no último item) */}
                {index < STEPS.length - 1 && (
                  <div className="flex-1 h-[2px] mx-2 mb-10 bg-gray-100 self-center">
                    <div
                      className={cn(
                        "h-full bg-[#10b981] transition-all duration-700 ease-in-out",
                        isCompleted ? "w-full" : "w-0"
                      )}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};