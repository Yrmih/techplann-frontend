"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { OrganizationForm } from "@/components/forms/onboarding/OrganizationForm";
import { useOnboardingStore } from "@/stores/useOnboardingStore";
import { onboardingService } from "@/services/onboarding";

export default function OrganizationPage() {
  const router = useRouter(); // 👈 Inicialize o router
  const { onboardingId, setOnboardingId } = useOnboardingStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      if (onboardingId && onboardingId !== "undefined") {
        setLoading(false);
        return;
      }

      try {
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

  if (loading) return <div className="p-20 text-center text-emerald-600 font-bold animate-pulse">Carregando sessão...</div>;

  return (
    <main className="min-h-screen bg-gray-50/50 flex flex-col items-center">
      <div className="w-full max-w-7xl px-4 py-12">
        <OrganizationForm 
          onboardingId={onboardingId!} 
          onNext={() => router.push('/onboarding/responsible')} // 👈 Use router.push aqui!
        />
      </div>
      {/* ... restante do código */}
    </main>
  );
}