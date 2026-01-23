"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreditCard, FileText, CheckCircle2, Info } from "lucide-react";
import { FieldError } from "react-hook-form";

// Shadcn UI & Custom Components
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomSelect } from "@/components/ui/custom/CustomSelect"; // O wrapper que criamos
import { NextButton } from "../../ui/custom/NextButton";
import { billingSchema, type BillingData } from "@/lib/validators/schema";
import { cn } from "@/lib/utils";

export const BillingForm = () => {
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

  const onSubmit = (data: BillingData) =>
    console.log("Dados de Pagamento:", data);

  return (
    /* Reduzi a margem superior (mt-4) para o card colar mais na timeline conforme o Figma */
    <div className="bg-white rounded-2xl border border-gray-100 p-10 shadow-sm max-w-5xl mx-auto font-sans mt-4">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Pagamento</h2>
        <p className="text-sm text-gray-500 mt-1">
          Configure sua forma de pagamento
        </p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Seleção do Método: Estilo idêntico ao image_b133f3.png */}
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

        {/* Conteúdo Dinâmico */}
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
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Nome no Cartão *
              </Label>
              <Input
                {...register("cardName")}
                placeholder="NOME COMO ESTÁ NO CARTÃO"
                className={inputStyles(errors.cardName)}
              />
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
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  CVV *
                </Label>
                <Input
                  {...register("cvv")}
                  placeholder="****"
                  className={inputStyles(errors.cvv)}
                />
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 items-center">
              <Info className="text-blue-600 shrink-0" size={18} />
              <p className="text-[11px] text-blue-800 leading-relaxed">
                <strong className="font-bold">Integração CORA Bank:</strong> Sua
                cobrança será processada pelo banco CORA com total segurança e
                praticidade.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
            <h3 className="text-sm font-bold text-gray-900 tracking-tight">
              Dados Bancários (opcional)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Banco
                </Label>
                <Input
                  {...register("bankName")}
                  placeholder="Nome do banco"
                  className={inputStyles(undefined)}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Agência
                </Label>
                <Input
                  {...register("agency")}
                  placeholder="0000"
                  className={inputStyles(undefined)}
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
                />
              </div>

              {/* Uso do CustomSelect Reutilizável com Estilo Figma */}
              <CustomSelect
                label="Tipo de Conta"
                placeholder="Selecione o tipo"
                value={accountType}
                onValueChange={(v) => setValue("accountType", v as any)}
                options={[
                  { value: "corrente", label: "Conta Corrente" },
                  { value: "poupanca", label: "Conta Poupança" },
                ]}
              />
            </div>
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-center gap-3">
              <CheckCircle2 className="text-[#10b981]" size={18} />
              <p className="text-[11px] text-emerald-800 font-medium italic">
                <b>Boleto via CORA Bank:</b> O boleto será enviado
                automaticamente para o e-mail cadastrado mensalmente.
              </p>
            </div>
          </div>
        )}

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
