"use client";

import { useEffect, useState } from "react";
import { useOnboardingStore } from "@/stores/useOnboardingStore";
import { onboardingService } from "@/services/onboarding";

// Importe seus formulários
import { OrganizationForm } from "@/components/forms/onboarding/OrganizationForm";
import { ResponsibleForm } from "@/components/forms/onboarding/ResponsibleForm";
import { SubscriptionForm } from "@/components/forms/onboarding/SubscriptionForm";

export default function OnboardingPage() {
  const { onboardingId, setOnboardingId } = useOnboardingStore();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);

  // INÍCIO DE TUDO: Gera o ID de sessão se não existir
  useEffect(() => {
    const initOnboarding = async () => {
      if (!onboardingId) {
        const data = await onboardingService.start();
        setOnboardingId(data.onboardingId);
      }
      setLoading(false);
    };
    initOnboarding();
  }, []);

  if (loading) return <div>Carregando TechPlann...</div>;

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      {/* Barra de Progresso Visual */}
      <div className="max-w-5xl mx-auto mb-8 flex justify-between items-center px-10">
        <StepIndicator current={step} />
      </div>

      {/* Renderização Condicional dos Forms */}
      {step === 1 && <OrganizationForm onNext={() => setStep(2)} />}
      {step === 2 && <ResponsibleForm onNext={() => setStep(3)} />}
      {step === 3 && <SubscriptionForm />}
    </main>
  );
}

// Sub-componente simples para indicar o passo
function StepIndicator({ current }: { current: number }) {
  const steps = ["Empresa", "Responsável", "Plano"];
  return (
    <div className="flex w-full justify-between gap-4">
      {steps.map((label, idx) => (
        <div key={label} className="flex-1">
          <div className={`h-2 rounded-full ${idx + 1 <= current ? 'bg-[#10b981]' : 'bg-gray-200'}`} />
          <span className="text-[10px] uppercase font-bold text-gray-400 mt-2 block">{label}</span>
        </div>
      ))}
    </div>
  );
}