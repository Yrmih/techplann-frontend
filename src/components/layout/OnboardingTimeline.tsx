"use client";

import { usePathname } from "next/navigation";
import { Building2, User, Sparkles, CreditCard, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: "organization", label: "Empresa", path: "/onboarding/organization", icon: Building2 },
  { id: "company", label: "Responsável", path: "/onboarding/company", icon: User },
  { id: "subscription", label: "Plano", path: "/onboarding/subscription", icon: Sparkles },
  { id: "billing", label: "Pagamento", path: "/onboarding/billing", icon: CreditCard },
  { id: "useraccount", label: "Conta", path: "/onboarding/useraccount", icon: Check },
];

export const OnboardingTimeline = () => {
  const pathname = usePathname();
  const currentStepIndex = STEPS.findIndex((step) => pathname === step.path);

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
                <div className="flex flex-col items-center relative min-w-[100px]">
                  {/* Círculo do Passo */}
                  <div
                    className={cn(
                      "w-11 h-11 rounded-full flex items-center justify-center transition-all duration-500 border-2",
                   
                      isCompleted || isActive
                        ? "bg-[#10b981] border-[#10b981] text-white shadow-lg shadow-green-100/50"
                        : "bg-[#f8fafc] border-gray-100 text-gray-400"
                    )}
                  >
                    <Icon 
                      size={index === 2 ? 22 : 20} 
                      strokeWidth={isActive ? 2.5 : 2} 
                      className={cn(isActive && "animate-pulse")} 
                    />
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

                {index < STEPS.length - 1 && (
                  <div className="flex-1 h-[2px] mx-2 mb-10 bg-gray-100 self-center">
                    <div
                      className={cn(
                        "h-full bg-[#10b981] transition-all duration-700 ease-in-out",
                        index < currentStepIndex ? "w-full" : "w-0"
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