"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreditCard, FileText, CheckCircle2, Info } from "lucide-react";
import { FieldError } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomSelect } from "@/components/ui/custom/CustomSelect";
import { NextButton } from "../../ui/custom/NextButton";
import { billingSchema, type BillingData } from "@/lib/validators/schema";
import { cn } from "@/lib/utils/utils";
import { onboardingService } from "@/services/onboarding/onboarding.service";

// Importação das máscaras de faturamento
import {
  maskCardNumber,
  maskExpiryDate,
  maskCVV,
  maskAgency,
  maskBankAccount,
} from "@/lib/utils/billing-masks";

// Interface para garantir a navegação do fluxo
interface BillingFormProps {
  onboardingId: string;
  onNext: () => void;
}

export const BillingForm = ({ onboardingId, onNext }: BillingFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BillingData>({
    resolver: zodResolver(billingSchema),
    defaultValues: { paymentMethod: "credit_card" },
  });

  const paymentMethod = watch("paymentMethod");
  const accountType = watch("accountType");

  const inputStyles = (errorField: FieldError | undefined) =>
    `
    bg-white border-gray-200 transition-all text-sm h-11
    hover:border-[#10b981]
    focus-visible:ring-1 focus-visible:ring-[#10b981] 
    focus-visible:border-[#10b981]
    focus-visible:ring-offset-0
    outline-none
    ${errorField ? "border-red-500 focus-visible:ring-red-500 focus-visible:border-red-500" : ""}
  `
      .replace(/\s+/g, " ")
      .trim();

  // FUNÇÃO MOCK: Apenas loga os dados e segue para o próximo Step (Conta)
  const onSubmit = async (data: BillingData) => {
    try {
      console.log("💳 [MOCK] Dados de faturamento coletados:", data);
      console.log("🆔 Onboarding ID:", onboardingId);

      // Simulamos um pequeno delay de rede para a UX ficar realista
      await new Promise((resolve) => setTimeout(resolve, 800));

      console.log("✅ MVP: Pulando integração real por enquanto.");

      // Seguimos para o próximo passo (Dashboard ou Sucesso)
      if (typeof onNext === "function") {
        onNext();
      }
    } catch (error) {
      console.error("❌ Erro no mock de faturamento:", error);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-10 shadow-sm max-w-5xl mx-auto font-sans mt-4">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Pagamento</h2>
        <p className="text-sm text-gray-500 mt-1 italic">
          Configuração de faturamento para o TechPlann
        </p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Seleção do Método */}
        <div className="space-y-4">
          <Label className="text-[11px] font-black uppercase tracking-widest text-gray-400">
            Método de Pagamento
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setValue("paymentMethod", "credit_card")}
              className={cn(
                "flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200",
                paymentMethod === "credit_card"
                  ? "border-[#10b981] bg-emerald-50/40 shadow-sm"
                  : "border-gray-100 bg-white hover:border-gray-200",
              )}
            >
              <CreditCard
                size={20}
                className={
                  paymentMethod === "credit_card"
                    ? "text-[#10b981]"
                    : "text-gray-400"
                }
              />
              <span
                className={cn(
                  "text-sm font-bold",
                  paymentMethod === "credit_card"
                    ? "text-gray-900"
                    : "text-gray-500",
                )}
              >
                Cartão de Crédito
              </span>
            </button>

            <button
              type="button"
              onClick={() => setValue("paymentMethod", "boleto")}
              className={cn(
                "flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200",
                paymentMethod === "boleto"
                  ? "border-[#10b981] bg-emerald-50/40 shadow-sm"
                  : "border-gray-100 bg-white hover:border-gray-200",
              )}
            >
              <FileText
                size={20}
                className={
                  paymentMethod === "boleto"
                    ? "text-[#10b981]"
                    : "text-gray-400"
                }
              />
              <span
                className={cn(
                  "text-sm font-bold",
                  paymentMethod === "boleto"
                    ? "text-gray-900"
                    : "text-gray-500",
                )}
              >
                Boleto Bancário
              </span>
            </button>
          </div>
        </div>

        <hr className="border-gray-50" />

        {/* Formulário Dinâmico: Cartão */}
        {paymentMethod === "credit_card" ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
            <h3 className="text-sm font-bold text-gray-900 tracking-tight">
              Dados do Cartão
            </h3>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Número do Cartão *
              </Label>
              <Input
                {...register("cardNumber")}
                placeholder="0000 0000 0000 0000"
                className={inputStyles(errors.cardNumber)}
                onChange={(e) =>
                  setValue("cardNumber", maskCardNumber(e.target.value), {
                    shouldValidate: true,
                  })
                }
              />
              {errors.cardNumber && (
                <p className="text-xs text-red-500">
                  {errors.cardNumber.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Nome no Cartão *
              </Label>
              <Input
                {...register("cardName")}
                placeholder="NOME COMO ESTÁ NO CARTÃO"
                className={inputStyles(errors.cardName)}
                onChange={(e) =>
                  setValue("cardName", e.target.value.toUpperCase())
                }
              />
              {errors.cardName && (
                <p className="text-xs text-red-500">
                  {errors.cardName.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Validade *
                </Label>
                <Input
                  {...register("expiry")}
                  placeholder="MM/AA"
                  className={inputStyles(errors.expiry)}
                  onChange={(e) =>
                    setValue("expiry", maskExpiryDate(e.target.value), {
                      shouldValidate: true,
                    })
                  }
                />
                {errors.expiry && (
                  <p className="text-xs text-red-500">
                    {errors.expiry.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  CVV *
                </Label>
                <Input
                  {...register("cvv")}
                  placeholder="***"
                  className={inputStyles(errors.cvv)}
                  onChange={(e) =>
                    setValue("cvv", maskCVV(e.target.value), {
                      shouldValidate: true,
                    })
                  }
                />
                {errors.cvv && (
                  <p className="text-xs text-red-500">{errors.cvv.message}</p>
                )}
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 items-center">
              <Info className="text-blue-600 shrink-0" size={18} />
              <p className="text-[11px] text-blue-800 leading-relaxed italic">
                Sua cobrança será processada com total segurança via{" "}
                <b>CORA Bank</b>.
              </p>
            </div>
          </div>
        ) : (
          /* Formulário Dinâmico: Boleto */
          <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
            <h3 className="text-sm font-bold text-gray-900 tracking-tight">
              Dados Bancários (Opcional)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Banco
                </Label>
                <Input
                  {...register("bankName")}
                  placeholder="Ex: Banco Cora"
                  className={inputStyles(undefined)}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Agência
                </Label>
                <Input
                  {...register("agency")}
                  placeholder="0001"
                  className={inputStyles(undefined)}
                  onChange={(e) =>
                    setValue("agency", maskAgency(e.target.value))
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Conta
                </Label>
                <Input
                  {...register("accountNumber")}
                  placeholder="00000-0"
                  className={inputStyles(undefined)}
                  onChange={(e) =>
                    setValue("accountNumber", maskBankAccount(e.target.value))
                  }
                />
              </div>

              <CustomSelect
                label="Tipo de Conta"
                placeholder="Selecione o tipo"
                value={accountType}
                onValueChange={(v) => setValue("accountType", v as "corrente")}
                options={[
                  { value: "corrente", label: "Conta Corrente" },
                  { value: "poupanca", label: "Conta Poupança" },
                ]}
                error={!!errors.accountType}
              />
            </div>
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-center gap-3">
              <CheckCircle2 className="text-[#10b981]" size={18} />
              <p className="text-[11px] text-emerald-800 font-medium italic">
                O boleto será enviado automaticamente para o e-mail cadastrado
                mensalmente.
              </p>
            </div>
          </div>
        )}

        <hr className="border-gray-100 my-8" />

        <NextButton
          onBack={() => window.history.back()}
          nextLabel="Avançar para Conta"
          isSubmitting={isSubmitting}
        />
      </form>
    </div>
  );
};
