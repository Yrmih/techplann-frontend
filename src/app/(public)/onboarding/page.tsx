"use client";

import { useEffect, useState, useRef } from "react"; // Adicionado useRef
import { useOnboardingStore } from "@/stores/useOnboardingStore";
import { onboardingService } from "@/services/onboarding";

// Importe dos formulários
import { OrganizationForm } from "@/components/forms/onboarding/OrganizationForm";
import { ResponsibleForm } from "@/components/forms/onboarding/ResponsibleForm";
import { SubscriptionForm } from "@/components/forms/onboarding/SubscriptionForm";

export default function OnboardingPage() {
  const { setOnboardingId, onboardingId: storedId } = useOnboardingStore();
  
  const [step, setStep] = useState(1);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  
  // 🛡️ GUARDA DE EXECUÇÃO: Impede que o useEffect rode duas vezes e cause race conditions
  const initializedRef = useRef(false);

  useEffect(() => {
    // Se já inicializou nesta montagem, não faz nada
    if (initializedRef.current) return;
    initializedRef.current = true;

    const init = async () => {
      try {
        // 1. Tenta recuperar da Store (F5)
        if (storedId) {
          console.log("♻️ ID recuperado da Store:", storedId);
          setActiveId(storedId);
          setIsInitializing(false);
          return;
        }

        // 2. Se não tem na store, busca novo ID do Backend
        console.log("🚀 Buscando novo ID direto do Backend...");
        const data = await onboardingService.start();
        
        // 3. Define o estado LOCAL primeiro (Fonte da Verdade)
        setActiveId(data.onboardingId);

        // 4. Sincroniza a Store em background
        setOnboardingId(data.onboardingId);
        
        console.log("✅ ID garantido via Prop:", data.onboardingId);
      } catch (error) {
        console.error("❌ Erro fatal na inicialização:", error);
      } finally {
        // Só libera a tela quando o ID estiver de fato no estado
        setIsInitializing(false);
      }
    };

    init();
  }, [storedId, setOnboardingId]);

  // BLOQUEIO DE RENDERIZAÇÃO: Se isInitializing é false mas activeId é null, algo falhou.
  // O formulário NUNCA será montado se activeId for null.
  if (isInitializing || !activeId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#10b981] mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Iniciando TechPlann...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      {/* Barra de Progresso Visual */}
      <div className="max-w-5xl mx-auto mb-8 flex justify-between items-center px-10">
        <StepIndicator current={step} />
      </div>

      <div className="transition-all duration-300">
        {/* Aqui injetamos o activeId, que GARANTIDAMENTE não é null por causa do IF acima */}
        {step === 1 && (
          <OrganizationForm 
            onboardingId={activeId} 
            onNext={() => setStep(2)} 
          />
        )}
        
        {step === 2 && (
          <ResponsibleForm 
            onboardingId={activeId} 
            onNext={() => setStep(3)} 
          />
        )}
        
        {step === 3 && (
          <SubscriptionForm 
            onboardingId={activeId} 
          />
        )}
      </div>
    </main>
  );
}

function StepIndicator({ current }: { current: number }) {
  const steps = ["Empresa", "Responsável", "Plano"];
  return (
    <div className="flex w-full justify-between gap-4">
      {steps.map((label, idx) => (
        <div key={label} className="flex-1">
          <div className={`h-2 rounded-full transition-colors duration-500 ${idx + 1 <= current ? "bg-[#10b981]" : "bg-gray-200"}`} />
          <span className={`text-[10px] uppercase font-bold mt-2 block ${idx + 1 <= current ? "text-[#10b981]" : "text-gray-400"}`}>
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}