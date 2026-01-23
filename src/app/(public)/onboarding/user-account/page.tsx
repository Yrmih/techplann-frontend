import { Metadata } from "next";
import { UserAccountForm } from "@/components/forms/onboarding/UserAccountForm";

export const metadata: Metadata = {
  title: "Criação de Conta | TechPlann",
  description: "Crie suas credenciais de acesso para começar a utilizar a plataforma TechPlann.",
};

export default function AccountPage() {
  return (
    
    <main className="min-h-screen bg-gray-50/50 py-10 px-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        <UserAccountForm />
        
        <p className="mt-8 text-sm text-gray-400">
          Já tem uma conta? <a href="/login" className="text-[#10b981] font-bold hover:underline">Fazer login</a>
        </p>
      </div>
    </main>
  );
}