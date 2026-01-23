import { Metadata } from "next";
import { UserAccountForm } from "@/components/forms/onboarding/UserAccountForm";

export const metadata: Metadata = {
  title: "Criação de Conta | TechPlann",
  description: "Crie suas credenciais de acesso para começar a utilizar a plataforma TechPlann.",
};

export default function AccountPage() {
  return (
    
    <main className="min-h-screen bg-gray-50/50 flex flex-col items-center">
    
      <div className="w-full max-w-7xl px-4 py-8">
        <UserAccountForm />
      </div>
      
      <p className="mt-4 pb-12 text-sm text-gray-400">
        Já tem uma conta? <a href="/login" className="text-[#10b981] font-bold hover:underline">Fazer login</a>
      </p>
    </main>
  );
}