"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, ArrowRight, Check } from "lucide-react";

import { authLoginSchema } from "@/lib/validators/schema"; 
import { AuthLoginCredentials } from "@/types/types";
import { TargetLogo } from "@/components/ui/svg/TargetLogo";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthLoginCredentials>({
    resolver: zodResolver(authLoginSchema),
  });

  const onSubmit = (data: AuthLoginCredentials) => {
    console.log("Dados do Login (Credentials):", data);
  };

  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row font-sans">
      {/* Lado Esquerdo - Visual e Branding (Tema Dark) */}
      <div className="hidden flex-1 flex-col justify-center bg-[#02141a] p-12 text-white md:flex">
        <div className="mb-8 flex items-center gap-3">
          <TargetLogo size={42} className="text-[#10b981]" />
          <span className="text-2xl font-bold tracking-tight">TechPlann</span>
        </div>
        
        <h1 className="mb-6 text-5xl font-bold leading-tight">
          Sistema de <br />
          <span className="text-[#10b981]">Planejamento Estratégico</span>
        </h1>
        
        <p className="mb-8 max-w-md text-gray-400 text-lg">
          Transforme a gestão estratégica da sua organização com ferramentas avançadas de análise SWOT, BSC, Canvas e muito mais.
        </p>

        <ul className="space-y-4 text-gray-300">
          <li className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-[#10b981]" />
            Planejamento estratégico completo
          </li>
          <li className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-[#10b981]" />
            Análises SWOT, BSC e Canvas integradas
          </li>
          <li className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-[#10b981]" />
            Acompanhamento em tempo real
          </li>
        </ul>

        <div className="mt-auto text-sm text-gray-500">
          Assessoria • <span className="text-[#10b981] font-medium">Sete Company</span>
        </div>
      </div>

      {/* Lado Direito - Formulário de Entrada (Tema Light) */}
      <div className="flex flex-1 items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          <header className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Bem-vindo de volta</h2>
            <p className="text-gray-500 mt-2">Entre com suas credenciais para acessar a plataforma</p>
          </header>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Campo de Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                {...register("email")}
                type="email"
                placeholder="seu@email.com"
                className={`w-full rounded-lg border bg-gray-50 p-3 transition-all outline-none 
                  ${errors.email ? 'border-red-500' : 'border-gray-200'}
                  hover:border-[#10b981] focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981]`}
              />
              {errors.email && (
                <span className="text-xs text-red-500 font-medium">{errors.email.message}</span>
              )}
            </div>

            {/* Campo de Senha */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Senha</label>
              <div className="relative">
                <input
                  {...register("senha")}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`w-full rounded-lg border bg-gray-50 p-3 pr-12 transition-all outline-none
                    ${errors.senha ? 'border-red-500' : 'border-gray-200'}
                    hover:border-[#10b981] focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981]`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.senha && (
                <span className="text-xs text-red-500 font-medium">{errors.senha.message}</span>
              )}
            </div>

            {/* Opções de Sessão - Alinhamento conforme Figma */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative flex items-center">
                  <input 
                    type="checkbox" 
                    id="remember" 
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-gray-300 bg-white transition-all checked:border-[#10b981] checked:bg-[#10b981] focus:outline-none focus:ring-1 focus:ring-[#10b981] focus:ring-offset-1" 
                  />
                  {/* Ícone de Check customizado que aparece apenas quando selecionado */}
                  <Check className="pointer-events-none absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100" />
                </div>
                <label htmlFor="remember" className="text-sm text-gray-500 cursor-pointer select-none">
                  Lembrar-me
                </label>
              </div>

              {/* Recuperar Senha reposicionado para a mesma linha do checkbox */}
              <button type="button" className="text-sm text-[#10b981] hover:underline font-medium">
                Recuperar senha
              </button>
            </div>

            {/* Botão de Submissão */}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#10b981] p-3 font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98]"
            >
              Acessar
              <ArrowRight size={18} />
            </button>
          </form>

          <footer className="mt-10 text-center text-sm">
            <span className="text-gray-500">Novo por aqui? </span>
            <button className="font-semibold text-[#10b981] hover:underline">
              Criar conta grátis
            </button>
            
            <div className="mt-8">
              <button className="text-gray-400 hover:text-gray-600 transition-colors flex items-center justify-center gap-1 w-full text-sm">
                ← Voltar para o site
              </button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};