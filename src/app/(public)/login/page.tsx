import { LoginForm } from "@/components/forms/auth/LoginForm";
import { Metadata } from "next";

/**
 * Metadados da página para SEO e título na aba do navegador.
 * Como este é um Server Component por padrão, é o lugar ideal para isso.
 */
export const metadata: Metadata = {
  title: "Login | TechPlann",
  description: "Acesse sua conta no TechPlann e gerencie seu planejamento estratégico.",
};

export default function LoginPage() {
  return (
    <main>
      <LoginForm />
    </main>
  );
}