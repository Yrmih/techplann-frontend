"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, CheckSquare } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

// Importando os tipos do seu schema
import { accountCreationSchema, type AccountCreationData } from "@/lib/validators/schema";

export const UserAccountForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<AccountCreationData>({
    resolver: zodResolver(accountCreationSchema),
  });

  const inputStyles = (hasError: boolean) => cn(
    "bg-white border-gray-200 transition-all text-sm h-11",
    "hover:border-[#10b981]",
    "focus-visible:ring-1 focus-visible:ring-[#10b981] focus-visible:border-[#10b981] focus-visible:ring-offset-0",
    "outline-none",
    hasError && "border-red-500 focus-visible:ring-red-500"
  );

  const onSubmit = (data: AccountCreationData) => {
    console.log("Finalizando Cadastro:", data);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-10 shadow-sm w-full mx-auto font-sans mt-4">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Conta</h2>
        <p className="text-sm text-gray-500 mt-1">Crie sua conta de acesso à plataforma</p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Nome Completo *</Label>
            <Input 
              {...register("fullName")} 
              placeholder="Seu nome completo" 
              className={inputStyles(!!errors.fullName)} 
            />
            {errors.fullName && <p className="text-xs text-red-500">{errors.fullName.message}</p>}
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Email *</Label>
            <Input 
              {...register("email")} 
              placeholder="exemplo@email.com" 
              className={inputStyles(!!errors.email)} 
            />
            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 relative">
            <Label className="text-sm font-medium text-gray-700">Senha *</Label>
            <div className="relative">
              <Input 
                {...register("password")} 
                type={showPassword ? "text" : "password"} 
                className={inputStyles(!!errors.password)} 
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#10b981] transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Confirmar Senha *</Label>
            <Input 
              {...register("confirmPassword")} 
              type="password" 
              placeholder="Repita a senha" 
              className={inputStyles(!!errors.confirmPassword)} 
            />
            {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>}
          </div>
        </div>

        <div className="flex items-center space-x-2 py-2">
        <Checkbox 
          id="terms" 
          onCheckedChange={(checked) => setValue("acceptTerms", !!checked)}
          className={cn(
            "h-5 w-5 rounded-full border-gray-300 transition-all", // h-5 w-5 e rounded-full para formato de bolinha
            "data-[state=checked]:bg-[#10b981] data-[state=checked]:border-[#10b981] data-[state=checked]:text-white"
          )}
        />
        <label htmlFor="terms" className="text-sm text-gray-500 cursor-pointer">
          Li e aceito os <span className="text-[#10b981] cursor-pointer hover:underline font-medium">Termos de Uso</span> e a <span className="text-[#10b981] cursor-pointer hover:underline font-medium">Política de Privacidade</span>
        </label>
      </div>

        <div className="bg-gray-50/50 rounded-xl p-6 space-y-3 border border-gray-100">
          <h3 className="text-sm font-bold text-gray-900">Resumo da Contratação</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 text-sm">
            <p className="text-gray-500">Empresa: <span className="text-gray-900 font-medium italic">exemplo</span></p>
            <p className="text-gray-500">Plano: <span className="text-gray-900 font-medium">Professional</span></p>
            <p className="text-gray-500">Valor: <span className="text-gray-900 font-medium">R$ 149,90/mês</span></p>
            <p className="text-gray-500">Pagamento: <span className="text-gray-900 font-medium">Boleto Bancário</span></p>
          </div>
        </div>

        <hr className="border-gray-100 my-8" />

        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-all"
          >
            ← Voltar
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-[#10b981] text-white font-bold text-sm hover:bg-[#0da673] transition-all shadow-lg shadow-emerald-100"
          >
            <CheckSquare size={18} />
            Finalizar Cadastro
          </button>
        </div>
      </form>
    </div>
  );
};