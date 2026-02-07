"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BillingForm } from "@/components/forms/onboarding/BillingForm";
import { useOnboardingStore } from "@/stores/useOnboardingStore";

export default function BillingPage() {
  const router = useRouter();
  const { onboardingId, tenantId } = useOnboardingStore();

  useEffect(() => {
    // Proteção de rota: Se não tem sessão, volta para o início
    if (!onboardingId || onboardingId === "undefined") {
      router.replace("/onboarding/organization");
    }
  }, [onboardingId, router]);

  if (!onboardingId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 animate-pulse">Preparando ambiente de faturamento...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50/50 flex flex-col items-center">
      <div className="w-full max-w-7xl px-4 py-12 md:py-16">
        {/* AGORA PASSAMOS O ID E A FUNÇÃO DE PRÓXIMO PASSO */}
        <BillingForm 
          onboardingId={onboardingId} 
          onNext={() => router.push("/dashboard")} // 🚀 O destino final!
        />
      </div>

      <p className="pb-10 text-sm text-gray-400">
        Já tem uma conta? <a href="/login" className="text-[#10b981] font-bold hover:underline">Fazer login</a>
      </p>
    </main>
  );
}