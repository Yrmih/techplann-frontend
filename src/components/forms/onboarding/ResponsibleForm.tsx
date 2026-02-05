"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldError } from "react-hook-form";

// Shadcn UI Components
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Componentes customizados, Schemas, Stores e Services
import { NextButton } from "../../ui/custom/NextButton";
import {
  ResponsibleSchema,
  type RepresentativeData,
} from "@/lib/validators/schema";
import { useOnboardingStore } from "@/stores/useOnboardingStore";
import { onboardingService } from "@/services/onboarding";

// Interface ALINHADA: Recebe o onboardingId diretamente do pai (page.tsx)
interface ResponsibleFormProps {
  onboardingId: string; 
  onNext: () => void;
}

export const ResponsibleForm = ({ onboardingId, onNext }: ResponsibleFormProps) => {
  // Recupera os IDs de vínculo gerados no Step 1 da Store persistente
  const { tenantId, organizationId } = useOnboardingStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RepresentativeData>({
    resolver: zodResolver(ResponsibleSchema),
  });

  const onSubmit = async (data: RepresentativeData) => {
    try {
      // VALIDAÇÃO DE SEGURANÇA: Garante que todos os IDs necessários existam
      if (!onboardingId || !tenantId || !organizationId) {
        console.error("❌ Erro de integridade: IDs de vínculo não encontrados.");
        return;
      }

      console.log("🚀 Vinculando responsável ao Tenant/Org no banco...");

      // Chama o endpoint usando o ID injetado via Prop (evita delay da Store)
      await onboardingService.saveResponsible(
        onboardingId,
        tenantId,
        organizationId,
        data
      );

      console.log("✅ Responsável registrado com sucesso no PostgreSQL!");

      if (typeof onNext === 'function') {
        onNext();
      }
    } catch (error) {
      console.error("❌ Erro ao registrar responsável:", error);
    }
  };

  const inputStyles = (errorField: FieldError | undefined) =>
    `
    bg-white border-gray-200 transition-all text-sm
    hover:border-[#10b981]
    focus-visible:ring-1 focus-visible:ring-[#10b981] 
    focus-visible:border-[#10b981]
    focus-visible:ring-offset-0
    outline-none
    ${errorField ? "border-red-500 focus-visible:ring-red-500 focus-visible:border-red-500" : ""}
  `.replace(/\s+/g, " ").trim();

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-10 shadow-sm max-w-5xl mx-auto font-sans">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Responsável</h2>
        <p className="text-sm text-gray-500 mt-1">
          Dados do responsável legal para a conta TechPlann
        </p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Nome e CPF */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Nome Completo *</Label>
            <Input
              {...register("fullName")}
              placeholder="Nome completo"
              className={inputStyles(errors.fullName)}
            />
            {errors.fullName && (
              <p className="text-xs text-red-500 font-medium">{errors.fullName.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">CPF *</Label>
            <Input
              {...register("cpf")}
              placeholder="000.000.000-00"
              className={inputStyles(errors.cpf)}
            />
            {errors.cpf && (
              <p className="text-xs text-red-500 font-medium">{errors.cpf.message}</p>
            )}
          </div>
        </div>

        {/* Contato Direto */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Email Corporativo *</Label>
            <Input
              {...register("email")}
              type="email"
              placeholder="exemplo@techplann.com"
              className={inputStyles(errors.email)}
            />
            {errors.email && (
              <p className="text-xs text-red-500 font-medium">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Telefone / Celular</Label>
            <Input
              {...register("phone")}
              placeholder="(00) 00000-0000"
              className={inputStyles(errors.phone)}
            />
          </div>
        </div>

        {/* Cargo / Função */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Cargo *</Label>
          <Input
            {...register("jobTitle")}
            placeholder="Ex: Diretor Executivo"
            className={inputStyles(errors.jobTitle)}
          />
          {errors.jobTitle && (
            <p className="text-xs text-red-500 font-medium">{errors.jobTitle.message}</p>
          )}
        </div>

        <hr className="border-gray-100 my-8" />

        <NextButton
          onBack={() => window.history.back()}
          nextLabel="Próximo"
          isSubmitting={isSubmitting}
        />
      </form>
    </div>
  );
};