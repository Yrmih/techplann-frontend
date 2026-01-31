import { ResponsibleForm } from "@/components/forms/onboarding/ResponsibleForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Empresa | TechPlann",
  description: "Informe os dados da organização para segurança e gestão da conta.",
};

export default function AccountFormPage() {
  return (
    
    <main className="min-h-screen bg-gray-50/50 flex flex-col items-center">

      <div className="w-full max-w-7xl px-4 pb-20">
        <ResponsibleForm />
      </div>

      <p className="mt-4 text-sm text-gray-400">
        Já tem uma conta? <a href="/login" className="text-[#10b981] font-bold hover:underline">Fazer login</a>
      </p>
    </main>
  );
}