"use client";

import { useEffect, useState } from "react";
import { OrganizationForm } from "@/components/forms/onboarding/OrganizationForm";
import { useOnboardingStore } from "@/stores/useOnboardingStore";
import { onboardingService } from "@/services/onboarding";

export default function OrganizationPage() {
  const { onboardingId, setOnboardingId } = useOnboardingStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      // Se já temos um ID válido na Store, não buscamos outro
      if (onboardingId && onboardingId !== "undefined") {
        setLoading(false);
        return;
      }

      try {
        // Busca o UUID inicial no seu OnboardingController -> start
        const { onboardingId: newId } = await onboardingService.start();
        setOnboardingId(newId);
      } catch (error) {
        console.error("Erro ao iniciar onboarding:", error);
      } finally {
        setLoading(false);
      }
    }

    init();
  }, [onboardingId, setOnboardingId]);

  if (loading) return <div className="p-20 text-center">Carregando sessão...</div>;

  return (
    <main className="min-h-screen bg-gray-50/50 flex flex-col items-center">
      <div className="w-full max-w-7xl px-4 py-12">
        {/* AGORA PASSAMOS AS PROPS QUE O TS ESTAVA COBRANDO */}
        <OrganizationForm 
          onboardingId={onboardingId!} 
          onNext={() => window.location.href = '/onboarding/responsible'} 
        />
      </div>
      <p className="pb-10 text-sm text-gray-400">
        Já tem uma conta? <a href="/login" className="text-[#10b981] font-bold hover:underline">Fazer login</a>
      </p>
    </main>
  );
}