import { LoginForm } from "@/components/forms/auth/LoginForm";
import { Metadata } from "next";

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