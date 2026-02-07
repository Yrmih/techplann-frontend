"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserAccountForm } from "@/components/forms/onboarding/UserAccountForm";
import { useOnboardingStore } from "@/stores/useOnboardingStore";

export default function AccountPage() {
  const router = useRouter();
  const { onboardingId } = useOnboardingStore();

  useEffect(() => {
    // Segurança: Não deixa criar conta sem ter passado pelo onboarding
    if (!onboardingId || onboardingId === "undefined") {
      router.replace("/onboarding/organization");
    }
  }, [onboardingId, router]);

  if (!onboardingId || onboardingId === "undefined") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 animate-pulse">Preparando criação de conta...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50/50 flex flex-col items-center">
      <div className="w-full max-w-7xl px-4 py-8">
        {/* Passamos o ID e o redirecionamento final */}
        <UserAccountForm 
          onboardingId={onboardingId} 
          onNext={() => router.push("/dashboard")} 
        />
      </div>
      
      <p className="mt-4 pb-12 text-sm text-gray-400">
        Já tem uma conta? <a href="/login" className="text-[#10b981] font-bold hover:underline">Fazer login</a>
      </p>
    </main>
  );
}