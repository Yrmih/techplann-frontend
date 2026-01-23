import { OrganizationForm } from "@/components/forms/onboarding/OrganizationForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cadastro da Empresa | TechPlann",
  description: "Informe os dados da sua organização para iniciar o planejamento estratégico.",
};

export default function OrganizationPage() {
  return (
    <OrganizationForm />
  );
}