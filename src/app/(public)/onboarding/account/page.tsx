import { CompanyForm } from "@/components/forms/onboarding/CompanyForm";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Dados do Responsável | TechPlann",
  description: "Informe os dados do responsável legal da organização para segurança e gestão da conta.",
};

export default function AccountFormPage () {
  return (
    <CompanyForm/>
  );

}