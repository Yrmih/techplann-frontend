import { OrganizationForm } from "@/components/forms/onboarding/OrganizationForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cadastro da Empresa | TechPlann",
  description: "Informe os dados da sua organização para iniciar o planejamento estratégico.",
};

export default function OrganizationPage() {
  return (
   
    <main className="min-h-screen bg-gray-50/50 flex flex-col items-center">
      <div className="w-full max-w-7xl px-4 py-12">
        <OrganizationForm />
      </div>
      <p className="pb-10 text-sm text-gray-400">
        Já tem uma conta? <a href="/login" className="text-[#10b981] font-bold hover:underline">Fazer login</a>
      </p>
    </main>
  );
}