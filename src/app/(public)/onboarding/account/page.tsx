import { AccountForm } from "@/components/forms/onboarding/AccountForm";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Dados do Responsável | TechPlann",
  description: "Informe os dados do responsável legal da organização para segurança e gestão da conta.",
};

export default function AccountFormPage () {
  return (
    <AccountForm/>
  );

}