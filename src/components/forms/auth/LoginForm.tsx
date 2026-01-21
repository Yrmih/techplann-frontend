
"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

import { authLoginSchema } from "@/lib/validators/schema"; 
import { AuthLoginCredentials } from "@/types";

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
    // Simula o envio de dados respeitando o contrato técnico definido
    console.log("Dados do Login (Credentials):", data);
  };

  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row">
      {/* Lado Esquerdo - Visual e Branding (Tema Dark) */}
      <div className="hidden flex-1 flex-col justify-center bg-[#02141a] p-12 text-white md:flex">
        <div className="mb-8 flex items-center gap-2">
          <div className="h-8 w-8 rounded-full border-2 border-[#10b981] flex items-center justify-center">
            <div className="h-4 w-4 rounded-full bg-[#10b981]" />
          </div>
          <span className="text-2xl font-bold">TechPlann</span>
        </div>
        
        <h1 className="mb-6 text-5xl font-bold leading-tight">
          Sistema de <br />
          <span className="text-[#10b981]">Planejamento Estratégico</span>
        </h1>
        
        <p className="mb-8 max-w-md text-gray-400">
          Transforme a gestão estratégica da sua organização com ferramentas avançadas de análise SWOT, BSC, Canvas e muito mais.
        </p>

        <ul className="space-y-4">
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
      </div>

      {/* Lado Direito - Formulário de Entrada (Tema Light) */}
      <div className="flex flex-1 items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          <header className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Bem-vindo de volta</h2>
            <p className="text-gray-500">Entre com suas credenciais para acessar a plataforma</p>
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
                <span className="text-xs text-red-500">{errors.email.message}</span>
              )}
            </div>

            {/* Campo de Senha */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium text-gray-700">Senha</label>
                <button type="button" className="text-xs text-[#10b981] hover:underline">
                  Recuperar senha
                </button>
              </div>
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
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.senha && (
                <span className="text-xs text-red-500">{errors.senha.message}</span>
              )}
            </div>

            {/* Opções de Sessão */}
            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="h-4 w-4 rounded border-gray-300 text-[#10b981] focus:ring-[#10b981]" />
              <label htmlFor="remember" className="text-sm text-gray-600">Lembrar-me</label>
            </div>

            {/* Botão de Submissão */}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#10b981] p-3 font-semibold text-white transition-opacity hover:opacity-90"
            >
              Acessar
              <ArrowRight size={18} />
            </button>
          </form>

          <footer className="mt-8 text-center text-sm">
            <span className="text-gray-500">Novo por aqui? </span>
            <button className="font-semibold text-[#10b981] hover:underline">
              Criar conta grátis
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};