"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldError } from "react-hook-form";

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

// Importação das máscaras específicas do Responsável
import {
  maskResponsibleCPF,
  maskResponsiblePhone,
} from "@/lib/utils/responsible-masks";

// Interface ALINHADA: Recebe o onboardingId diretamente do pai (page.tsx)
interface ResponsibleFormProps {
  onboardingId: string;
  onNext: () => void;
}

export const ResponsibleForm = ({
  onboardingId,
  onNext,
}: ResponsibleFormProps) => {
  // Recupera os IDs de vínculo gerados no Step 1 da Store persistente
  const { tenantId, organizationId } = useOnboardingStore();

  const {
    register,
    handleSubmit,
    setValue, // Detalhe importante: necessário para atualizar o valor com máscara
    formState: { errors, isSubmitting },
  } = useForm<RepresentativeData>({
    resolver: zodResolver(ResponsibleSchema),
  });

  // FUNÇÃO REESTRUTURADA: Purifica os dados para bater com o rigor do Backend
  const onSubmit = async (data: RepresentativeData) => {
    try {
      // VALIDAÇÃO DE SEGURANÇA: Garante integridade do fluxo
      if (!onboardingId || !tenantId || !organizationId) {
        console.error(
          "❌ Erro de integridade: IDs de vínculo não encontrados.",
        );
        return;
      }

      console.log("🚀 Purificando dados do responsável para o Pipeline...");

      /**
       * 💡 RECONSTRUÇÃO MANUAL (Deep Clean):
       * Mapeamos para 'undefined' campos que não são obrigatórios.
       * Isso evita erros de validação no ZodValidationPipe do Backend.
       */
      const purifiedUserData: RepresentativeData = {
        fullName: data.fullName,
        cpf: data.cpf.replace(/\D/g, ""), // Remove pontuação para o Banco
        email: data.email,
        jobTitle: data.jobTitle,
        // Se o telefone estiver vazio, envia undefined para satisfazer o DTO opcional
        phone: data.phone ? data.phone.replace(/\D/g, "") : undefined,
      };

      // Chamada ao service usando os dados purificados
      await onboardingService.saveResponsible(
        onboardingId,
        tenantId,
        organizationId,
        purifiedUserData,
      );

      console.log("✅ Responsável registrado com sucesso!");

      if (typeof onNext === "function") {
        onNext();
      }
    } catch (error) {
      console.error("❌ Erro ao registrar responsável no Pipeline:", error);
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
  `
      .replace(/\s+/g, " ")
      .trim();

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
            <Label className="text-sm font-medium text-gray-700">
              Nome Completo *
            </Label>
            <Input
              {...register("fullName")}
              placeholder="Nome completo"
              maxLength={100}
              className={inputStyles(errors.fullName)}
            />
            {errors.fullName && (
              <p className="text-xs text-red-500 font-medium">
                {errors.fullName.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">CPF *</Label>
            <Input
              {...register("cpf")}
              placeholder="000.000.000-00"
              className={inputStyles(errors.cpf)}
              // Detalhe: Máscara de CPF com validação automática
              onChange={(e) =>
                setValue("cpf", maskResponsibleCPF(e.target.value), {
                  shouldValidate: true,
                })
              }
            />
            {errors.cpf && (
              <p className="text-xs text-red-500 font-medium">
                {errors.cpf.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Email Corporativo *
            </Label>
            <Input
              {...register("email")}
              type="email"
              placeholder="exemplo@techplann.com"
              maxLength={100}
              className={inputStyles(errors.email)}
            />
            {errors.email && (
              <p className="text-xs text-red-500 font-medium">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Telefone / Celular
            </Label>
            <Input
              {...register("phone")}
              placeholder="(00) 00000-0000"
              className={inputStyles(errors.phone)}
              // Detalhe: Máscara dinâmica para fixo ou celular
              onChange={(e) =>
                setValue("phone", maskResponsiblePhone(e.target.value), {
                  shouldValidate: true,
                })
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Cargo *</Label>
          <Input
            {...register("jobTitle")}
            placeholder="Ex: Diretor Executivo"
            maxLength={50}
            className={inputStyles(errors.jobTitle)}
          />
          {errors.jobTitle && (
            <p className="text-xs text-red-500 font-medium">
              {errors.jobTitle.message}
            </p>
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
