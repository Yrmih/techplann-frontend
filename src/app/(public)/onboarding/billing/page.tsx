import { Metadata } from "next";
import { BillingForm } from "@/components/forms/onboarding/BillingForm";


export const metadata: Metadata = {
  title: "Pagamento | TechPlann",
  description: "Configure seus dados de faturamento para ativar sua conta estrategista.",
};

export default function BillingPage() {
  return (

    <main className="min-h-screen bg-gray-50/50 flex flex-col items-center">
      
      <div className="w-full max-w-7xl px-4 py-12 md:py-16">
        <BillingForm />
      </div>

      <p className="pb-10 text-sm text-gray-400">
        Já tem uma conta? <a href="/login" className="text-[#10b981] font-bold hover:underline">Fazer login</a>
      </p>
    </main>
  );
}