"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreditCard, FileText, CheckCircle2 } from "lucide-react";
import { FieldError } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NextButton } from "./NextButton";
import { billingSchema, type BillingData } from "@/lib/validators/schema";
import { cn } from "@/lib/utils";

export const BillingForm = () => {
  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm<BillingData>({
    resolver: zodResolver(billingSchema),
    defaultValues: { paymentMethod: "credit_card" }
  });

  const paymentMethod = watch("paymentMethod");

  const inputStyles = (errorField: FieldError | undefined) => `
    bg-white border-gray-200 transition-all text-sm h-11
    hover:border-[#10b981]
    focus-visible:ring-1 focus-visible:ring-[#10b981] 
    focus-visible:border-[#10b981]
    focus-visible:ring-offset-0
    outline-none
    ${errorField ? "border-red-500 focus-visible:ring-red-500" : ""}
  `.replace(/\s+/g, ' ').trim();

  const onSubmit = (data: BillingData) => console.log("Pagamento:", data);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-10 shadow-sm max-w-5xl mx-auto font-sans">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Pagamento</h2>
        <p className="text-sm text-gray-500 mt-1">Configure sua forma de pagamento</p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Seleção do Método */}
        <div className="space-y-4">
          <Label className="text-xs font-bold uppercase tracking-wider text-gray-700">Método de Pagamento</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setValue("paymentMethod", "credit_card")}
              className={cn(
                "flex items-center gap-3 p-4 rounded-xl border-2 transition-all",
                paymentMethod === "credit_card" ? "border-[#10b981] bg-emerald-50/30" : "border-gray-100 hover:border-gray-200"
              )}
            >
              <CreditCard size={20} className={paymentMethod === "credit_card" ? "text-[#10b981]" : "text-gray-400"} />
              <span className={cn("text-sm font-bold", paymentMethod === "credit_card" ? "text-gray-900" : "text-gray-500")}>Cartão de Crédito</span>
            </button>

            <button
              type="button"
              onClick={() => setValue("paymentMethod", "boleto")}
              className={cn(
                "flex items-center gap-3 p-4 rounded-xl border-2 transition-all",
                paymentMethod === "boleto" ? "border-[#10b981] bg-emerald-50/30" : "border-gray-100 hover:border-gray-200"
              )}
            >
              <FileText size={20} className={paymentMethod === "boleto" ? "text-[#10b981]" : "text-gray-400"} />
              <span className={cn("text-sm font-bold", paymentMethod === "boleto" ? "text-gray-900" : "text-gray-500")}>Boleto Bancário</span>
            </button>
          </div>
        </div>

        {/* Lógica Condicional de Campos */}
        {paymentMethod === "credit_card" ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
             <h3 className="text-sm font-bold text-gray-900">Dados do Cartão</h3>
             <div className="space-y-2">
               <Label className="text-sm font-medium text-gray-700">Número do Cartão *</Label>
               <Input {...register("cardNumber")} placeholder="0000 0000 0000 0000" className={inputStyles(errors.cardNumber)} />
             </div>
             <div className="space-y-2">
               <Label className="text-sm font-medium text-gray-700">Nome no Cartão *</Label>
               <Input {...register("cardName")} placeholder="NOME COMO ESTÁ NO CARTÃO" className={inputStyles(errors.cardName)} />
             </div>
             <div className="grid grid-cols-2 gap-6">
               <div className="space-y-2">
                 <Label className="text-sm font-medium text-gray-700">Validade *</Label>
                 <Input {...register("expiry")} placeholder="MM/AA" className={inputStyles(errors.expiry)} />
               </div>
               <div className="space-y-2">
                 <Label className="text-sm font-medium text-gray-700">CVV *</Label>
                 <Input {...register("cvv")} placeholder="****" className={inputStyles(errors.cvv)} />
               </div>
             </div>
             <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
               <CheckCircle2 className="text-blue-600 shrink-0" size={18} />
               <p className="text-[11px] text-blue-800"><b>Integração CORA Bank:</b> Sua cobrança será processada pelo banco CORA com segurança e praticidade.</p>
             </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
            <h3 className="text-sm font-bold text-gray-900">Dados Bancários (opcional)</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Banco</Label>
                <Input {...register("bankName")} placeholder="Nome do banco" className={inputStyles(undefined)} />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Agência</Label>
                <Input {...register("agency")} placeholder="0000" className={inputStyles(undefined)} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Conta</Label>
                <Input {...register("accountNumber")} placeholder="00000-0" className={inputStyles(undefined)} />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Tipo de Conta</Label>
                <Select onValueChange={(v) => setValue("accountType", v as any)}>
                  <SelectTrigger className="h-11 border-gray-200 focus:ring-[#10b981] focus:border-[#10b981]">
                    <SelectValue placeholder="Corrente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="corrente">Corrente</SelectItem>
                    <SelectItem value="poupanca">Poupança</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
              <p className="text-[11px] text-emerald-800 font-medium"><b>Boleto via CORA Bank:</b> O boleto será enviado para o email cadastrado todo mês.</p>
            </div>
          </div>
        )}

        <hr className="border-gray-100 my-8" />
        <NextButton onBack={() => window.history.back()} nextLabel="Próximo" isSubmitting={isSubmitting} />
      </form>
    </div>
  );
};