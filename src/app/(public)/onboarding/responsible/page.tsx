"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ResponsibleForm } from "@/components/forms/onboarding/ResponsibleForm";
import { useOnboardingStore } from "@/stores/useOnboardingStore";

export default function AccountFormPage() {
  const router = useRouter();
  const { onboardingId } = useOnboardingStore();

  useEffect(() => {
    // Se o usuário cair aqui sem ID (lixo no cache ou pulou etapa)
    if (!onboardingId || onboardingId === "undefined") {
      console.warn("⚠️ Sem sessão ativa. Redirecionando para o Step 1.");
      router.replace("/onboarding/organization");
    }
  }, [onboardingId, router]);

  // Enquanto o ID não chega (ou se estiver redirecionando), mostramos o feedback
  if (!onboardingId || onboardingId === "undefined") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 animate-pulse">Validando sessão...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50/50 flex flex-col items-center">
      <div className="w-full max-w-7xl px-4 pb-20">
        <ResponsibleForm 
          onboardingId={onboardingId} 
          onNext={() => router.push("/onboarding/subscription")} 
        />
      </div>
      <p className="mt-4 text-sm text-gray-400">
        Já tem uma conta? <a href="/login" className="text-[#10b981] font-bold hover:underline">Fazer login</a>
      </p>
    </main>
  );
}