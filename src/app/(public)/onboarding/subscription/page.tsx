import { Metadata } from "next";
import { SubscriptionForm } from "@/components/forms/onboarding/SubscriptionForm";

export const metadata: Metadata = {
  title: "Seleção de Plano | TechPlann",
  description: "Escolha o plano ideal para iniciar o planejamento estratégico da sua organização.",
};

export default function SubscriptionPage() {
  return (
    
    <main className="min-h-screen bg-gray-50/50 flex flex-col items-center">
     
      <div className="w-full max-w-7xl px-4 py-8">
        <SubscriptionForm />
      </div>
      <p className="pb-12 text-sm text-gray-400">
        Já tem uma conta? <a href="/login" className="text-[#10b981] font-bold hover:underline">Fazer login</a>
      </p>
    </main>
  );
}