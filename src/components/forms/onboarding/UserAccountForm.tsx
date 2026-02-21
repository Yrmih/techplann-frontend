"use client";

import React, { useEffect } from "react"; // 1. Importação essencial para carregar os dados
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, CheckSquare } from "lucide-react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils/utils";

// Importando os tipos do seu schema
import {
  accountCreationSchema,
  type AccountCreationData,
} from "@/lib/validators/schema";
// Importando a store para realizar o reset final e buscar dados
import { useOnboardingStore } from "@/stores/useOnboardingStore";

// Importando a máscara de sanitização para manter o padrão
import { sanitizeFullName } from "@/lib/utils/user-account-mask";

interface UserAccountFormProps {
  onboardingId: string;
  onNext?: () => void;
}

export const UserAccountForm = ({
  onboardingId,
  onNext,
}: UserAccountFormProps) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const router = useRouter();

  // 2. Pegamos o reset da store
  const { reset } = useOnboardingStore();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AccountCreationData>({
    resolver: zodResolver(accountCreationSchema),
  });

  /**
   * 3. DETALHE ESQUECIDO: Lógica de Herança Real
   * Este efeito garante que o Nome e Email vindos do Step 2
   * apareçam assim que a tela carregar.
   */
  useEffect(() => {
    // Busca os dados que você salvou no Step 2 (ajuste a chave conforme sua store/localStorage)
    const savedName = localStorage.getItem("onboarding_user_name") || "";
    const savedEmail = localStorage.getItem("onboarding_user_email") || "";

    if (savedName) setValue("fullName", savedName);
    if (savedEmail) setValue("email", savedEmail);
  }, [setValue]);

  const inputStyles = (hasError: boolean) =>
    cn(
      "bg-white border-gray-200 transition-all text-sm h-11",
      "hover:border-[#10b981]",
      "focus-visible:ring-1 focus-visible:ring-[#10b981] focus-visible:border-[#10b981] focus-visible:ring-offset-0",
      "outline-none",
      hasError && "border-red-500 focus-visible:ring-red-500",
    );

  const onSubmit = async (data: AccountCreationData) => {
    try {
      console.log("🏁 MVP - Cadastro Finalizado com sucesso!");

      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 4. Limpeza da memória para evitar que o Onboarding reabra sozinho
      reset();

      if (typeof onNext === "function") {
        onNext();
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("❌ Erro ao finalizar cadastro:", error);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-10 shadow-sm w-full mx-auto font-sans mt-4">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Conta</h2>
        <p className="text-sm text-gray-500 mt-1">
          Crie sua conta de acesso para começar no TechPlann
        </p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Identificação do Usuário */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Nome Completo *
            </Label>
            <Input
              {...register("fullName")}
              placeholder="Ex: Ian Lima"
              className={inputStyles(!!errors.fullName)}
              // 5. Aplica a sanitização para evitar números no nome
              onChange={(e) =>
                setValue("fullName", sanitizeFullName(e.target.value))
              }
            />
            {errors.fullName && (
              <p className="text-xs text-red-500 font-medium mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Email de Acesso *
            </Label>
            <Input
              {...register("email")}
              readOnly // O Email é o login, herda do Step 2 e não deve ser alterado aqui
              className={cn(
                inputStyles(!!errors.email),
                "bg-gray-50 cursor-not-allowed",
              )}
            />
          </div>
        </div>

        {/* Credenciais */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 relative">
            <Label className="text-sm font-medium text-gray-700">Senha *</Label>
            <div className="relative">
              <Input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Mínimo 6 caracteres"
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
            {errors.password && (
              <p className="text-xs text-red-500 font-medium mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Confirmar Senha *
            </Label>
            <Input
              {...register("confirmPassword")}
              type="password"
              placeholder="Repita a senha"
              className={inputStyles(!!errors.confirmPassword)}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 font-medium mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        {/* Termos de Uso (Layout Bolinha) */}
        <div className="flex items-center space-x-2 py-2">
          <Checkbox
            id="terms"
            // Garante que o checkbox atualize o Zod
            onCheckedChange={(checked) =>
              setValue("acceptTerms", !!checked, { shouldValidate: true })
            }
            className={cn(
              "h-5 w-5 rounded-full border-gray-300 transition-all",
              "data-[state=checked]:bg-[#10b981] data-[state=checked]:border-[#10b981] data-[state=checked]:text-white",
            )}
          />
          <label
            htmlFor="terms"
            className="text-sm text-gray-500 cursor-pointer select-none"
          >
            Li e aceito os{" "}
            <span className="text-[#10b981] font-medium">Termos de Uso</span>
          </label>
        </div>

        {/* Resumo Estático */}
        <div className="bg-gray-50/50 rounded-xl p-6 space-y-3 border border-gray-100">
          <h3 className="text-[11px] font-black uppercase text-gray-400 tracking-wider">
            Resumo da Contratação
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 text-sm">
            <p className="text-gray-500">
              Plano:{" "}
              <span className="text-gray-900 font-bold">Professional</span>
            </p>
            <p className="text-gray-500">
              Valor:{" "}
              <span className="text-gray-900 font-bold text-[#10b981]">
                R$ 149,90/mês
              </span>
            </p>
          </div>
        </div>

        <hr className="border-gray-100 my-4" />

        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="text-sm font-bold text-gray-400"
          >
            ← Voltar
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-8 py-3 rounded-xl bg-[#10b981] text-white font-bold text-sm hover:bg-[#0da673] transition-all"
          >
            <CheckSquare size={18} />
            {isSubmitting ? "Finalizando..." : "Finalizar Cadastro"}
          </button>
        </div>
      </form>
    </div>
  );
};
