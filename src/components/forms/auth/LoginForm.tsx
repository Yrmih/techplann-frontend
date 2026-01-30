"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight, Check, Users, TrendingUp } from "lucide-react";

import { authLoginSchema } from "@/lib/validators/schema"; 
import { AuthLoginCredentials } from "@/types/types";
import { TargetLogo } from "@/components/ui/svg/TargetLogo";

import { LoadingButton } from "@/components/ui/custom/LoadingButton";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthLoginCredentials>({
    resolver: zodResolver(authLoginSchema),
  });

  const onSubmit = async (data: AuthLoginCredentials) => {
    setIsSubmitting(true);
    console.log("Tentativa de login com:", data);
    
    
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row font-sans overflow-hidden">
     
      
      <div className="hidden flex-1 flex-col justify-center bg-[#02141a] p-16 text-white md:flex relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(16,185,129,0.05),transparent)] pointer-events-none" />

        <div className="mb-12 relative z-10 text-left">
          <div className="flex items-center gap-3">
            <TargetLogo size={42} className="text-[#10b981]" />
            <div>
              <span className="text-2xl font-bold tracking-tight block leading-none text-white">TechPlann</span>
              <span className="text-[10px] text-gray-500 font-medium tracking-widest uppercase">by TechSys</span>
            </div>
          </div>
        </div>
        
        <div className="relative z-10 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#10b981]/10 border border-[#10b981]/20 text-[#10b981] text-[10px] font-bold uppercase tracking-wider mb-6">
            <TrendingUp size={12} /> Gestão Estratégica Inteligente
          </div>

          <h1 className="mb-6 text-6xl font-black leading-[1.1] tracking-tight text-white">
            Planeje o futuro da sua <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] to-[#0ea5e9]">
              organização
            </span>
          </h1>
          
          <p className="mb-10 max-w-sm text-gray-400 text-lg font-medium leading-relaxed">
            Ferramentas profissionais de análise estratégica para transformar dados em decisões assertivas.
          </p>

          <div className="space-y-4 max-w-sm">
            <div className="flex items-center gap-4 p-5 rounded-2xl bg-[#051c24] border border-white/5 transition-all hover:bg-white/[0.05] group">
              <div className="h-12 w-12 rounded-xl bg-[#10b981]/10 flex items-center justify-center text-[#10b981]">
                <TrendingUp size={24} />
              </div>
              <span className="text-sm font-bold text-white tracking-wide">Análises SWOT, BSC e Canvas</span>
            </div>
            <div className="flex items-center gap-4 p-5 rounded-2xl bg-[#051c24] border border-white/5 transition-all hover:bg-white/[0.05] group">
              <div className="h-12 w-12 rounded-xl bg-[#10b981]/10 flex items-center justify-center text-[#10b981]">
                <Users size={24} />
              </div>
              <span className="text-sm font-bold text-white tracking-wide">Gestão de stakeholders integrada</span>
            </div>
          </div>
        </div>

        <div className="mt-auto text-xs text-gray-500 font-medium tracking-wide relative z-10 text-left">
          © 2026 TechSys. Todos os direitos reservados.
        </div>
      </div>

     
      <div className="flex flex-1 items-center justify-center bg-white p-8 lg:p-16">
        <div className="w-full max-w-md">
          <header className="mb-10 text-left">
            <h2 className="text-4xl font-black text-gray-900 tracking-tight leading-tight">Bem-vindo de volta</h2>
            <p className="text-gray-500 mt-2 font-medium">Entre com suas credenciais para acessar a plataforma</p>
          </header>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2 text-left">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email</label>
              <input
                {...register("email")}
                type="email"
                placeholder="ian@sete.com"
                className={`w-full rounded-xl border p-4 transition-all outline-none text-sm font-medium bg-white
                  ${errors.email ? 'border-red-500' : 'border-gray-100'}
                  hover:border-[#10b981]/50 focus:border-[#10b981] focus:ring-4 focus:ring-[#10b981]/5`}
              />
              {errors.email && (
                <span className="text-[10px] text-red-500 font-bold uppercase tracking-wide mt-1 block">{errors.email.message}</span>
              )}
            </div>

            <div className="space-y-2 text-left">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Senha</label>
              <div className="relative">
                <input
                  {...register("senha")}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••"
                  className={`w-full rounded-xl border p-4 pr-12 transition-all outline-none text-sm font-medium bg-white
                    ${errors.senha ? 'border-red-500' : 'border-gray-100'}
                    hover:border-[#10b981]/50 focus:border-[#10b981] focus:ring-4 focus:ring-[#10b981]/5`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#10b981] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.senha && (
                <span className="text-[10px] text-red-500 font-bold uppercase tracking-wide mt-1 block">{errors.senha.message}</span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 group cursor-pointer">
                <div className="relative flex items-center">
                  <input 
                    type="checkbox" 
                    id="remember" 
                    className="peer h-4 w-4 cursor-pointer appearance-none rounded-full border border-gray-200 bg-white transition-all checked:border-[#10b981] checked:bg-[#10b981] focus:outline-none" 
                  />
                  <Check className="pointer-events-none absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100" />
                </div>
                <label htmlFor="remember" className="text-sm text-gray-400 cursor-pointer select-none font-medium group-hover:text-gray-600 transition-colors">
                  Lembrar-me
                </label>
              </div>

              <button type="button" className="text-sm text-[#10b981] hover:text-[#0da673] font-bold transition-colors">
                Recuperar senha
              </button>
            </div>

           
            <LoadingButton
              type="submit"
              isLoading={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#10b981] to-[#06b6d4] p-4 font-bold text-white shadow-lg shadow-emerald-100 transition-all hover:opacity-95 active:scale-[0.98]"
            >
              Entrar na plataforma
              <ArrowRight size={18} />
            </LoadingButton>
          </form>

          <footer className="mt-12 text-center text-sm">
            <p className="text-gray-500 font-medium">
              Novo por aqui? <button className="font-bold text-[#10b981] hover:underline">Criar conta grátis</button>
            </p>
            
            <button className="mt-8 text-gray-400 hover:text-gray-600 transition-colors flex items-center justify-center gap-2 w-full text-xs font-bold uppercase tracking-widest">
              ← Voltar para o site
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};