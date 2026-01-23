import { Metadata } from "next";
import { BillingForm } from "@/components/forms/onboarding/BillingForm";

export const metadata: Metadata = {
  title: "Pagamento | TechPlann",
  description: "Configure seus dados de faturamento para ativar sua conta estrategista.",
};

export default function BillingPage() {
  return (
    <main className="min-h-screen bg-gray-50/50 py-12 px-4 md:py-20 flex items-center justify-center">
      <div className="w-full max-w-7xl mx-auto">
        <BillingForm />
      </div>
    </main>
  );
}