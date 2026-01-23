import { Metadata } from "next";
import { SubscriptionForm } from "@/components/forms/onboarding/SubscriptionForm";

export const metadata: Metadata = {
  title: "Seleção de Plano | TechPlann",
  description: "Escolha o plano ideal para iniciar o planejamento estratégico da sua organização.",
};

export default function SubscriptionPage() {
  return (
    <main className="min-h-screen bg-gray-50/50 py-12 px-4 md:py-20">
      <div className="max-w-7xl mx-auto">
        {/* Aqui você pode incluir a Timeline se desejar que ela apareça em todos os steps */}
        <SubscriptionForm />
      </div>
    </main>
  );
}