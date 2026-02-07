"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SubscriptionForm } from "@/components/forms/onboarding/SubscriptionForm";
import { useOnboardingStore } from "@/stores/useOnboardingStore";

export default function SubscriptionPage() {
  const router = useRouter();
  const { onboardingId } = useOnboardingStore();

  useEffect(() => {
    // Se o usuário tentar acessar o plano sem ter passado pelos steps anteriores
    if (!onboardingId || onboardingId === "undefined") {
      router.replace("/onboarding/organization");
    }
  }, [onboardingId, router]);

  // Se ainda estiver validando a sessão
  if (!onboardingId || onboardingId === "undefined") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 animate-pulse">Preparando planos...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50/50 flex flex-col items-center">
      <div className="w-full max-w-7xl px-4 py-8">
        {/* AGORA PASSAMOS O ID QUE O FORM EXIGE */}
        <SubscriptionForm onboardingId={onboardingId} />
      </div>
      <p className="pb-12 text-sm text-gray-400">
        Já tem uma conta? <a href="/login" className="text-[#10b981] font-bold hover:underline">Fazer login</a>
      </p>
    </main>
  );
}