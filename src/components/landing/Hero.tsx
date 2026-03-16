"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  MoveRight,
  PlayCircle,
  CheckCircle2,
  BarChart3,
  Target,
  Layers,
  Users2,
  Sparkles,
} from "lucide-react";
import { TargetLogo } from "../ui/svg/TargetLogo";

export const Hero = () => {
  return (
    <section className="relative w-full pt-20 pb-20 overflow-hidden bg-gray-50/50">
      {/* Camadas de Gradiente Mesh */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(at_40%_20%,hsl(160,84%,39%,0.12)_0px,transparent_50%),radial-gradient(at_80%_0%,hsl(199,89%,48%,0.12)_0px,transparent_50%),radial-gradient(at_0%_50%,hsl(217,91%,60%,0.08)_0px,transparent_50%)]" />

        <div className="absolute top-20 right-1/4 w-96 h-96 bg-gradient-to-br from-[#10b981]/10 via-cyan-500/10 to-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-gradient-to-tr from-blue-500/10 via-cyan-500/5 to-transparent rounded-full blur-3xl" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full bg-white/70 blur-[130px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center relative z-10">
        {/* Badge: Refinada */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-emerald-100 mb-8 shadow-sm"
        >
          <Sparkles size={14} className="text-[#10b981] animate-pulse" />
          <span className="text-xs font-bold text-[#10b981] tracking-tight">
            Nova versão 2.0 disponível
          </span>
        </motion.div>

        {/* font-black para font-bold e tracking-tighter para fidelidade total */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tighter mb-6 max-w-4xl leading-[1.1] relative z-10"
        >
          Planejamento Estratégico <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] via-[#06b6d4] to-[#10b981] bg-[length:200%_auto] animate-gradient-x">
            Simplificado e Poderoso
          </span>
        </motion.h1>

        {/* font-bold para font-medium para maior legibilidade */}
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed font-medium relative z-10">
          Unifique SWOT, Canvas, BSC e gestão de projetos em uma única
          plataforma. <br />
          Tome decisões estratégicas com dados visuais e colaboração em tempo
          real.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-12 relative z-10">
          <Link
            href="/onboarding/organization"
            className="group relative bg-gradient-to-r from-[#10b981] to-[#06b6d4] text-white px-10 py-4 rounded-xl font-bold text-lg flex items-center gap-2 hover:opacity-95 hover:scale-105 transition-all shadow-2xl shadow-cyan-200/50"
          >
            Começar Teste Grátis
            <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <button className="group flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-all shadow-lg">
            <PlayCircle className="w-5 h-5 text-[#10b981] group-hover:scale-110 transition-transform" />
            Ver Demonstração
          </button>
        </div>

        {/* ÍCONES DE CHECK: font-medium */}
        <div className="flex flex-wrap justify-center gap-6 mb-20 text-sm text-slate-500 font-medium relative z-10">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-[#10b981]" /> 7 dias grátis
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-cyan-500" /> Debitado via
            cartão de crédito
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-blue-500" /> Cancele quando
            quiser
          </div>
        </div>

        {/* Mockup do Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative w-full max-w-5xl perspective-1000 px-2 mb-24 z-10"
        >
          <div className="absolute -inset-10 bg-emerald-400/20 rounded-[5rem] blur-[100px] animate-pulse" />

          <div className="relative bg-white border-[12px] border-slate-900/5 rounded-[2.5rem] shadow-2xl overflow-hidden shadow-emerald-900/20">
            <div className="bg-[#f8fafc] w-full aspect-[16/9] flex">
              <div className="w-[18%] bg-[#0f172a] h-full p-4 flex flex-col gap-2 opacity-95 text-left">
                <div className="w-9 h-9 bg-[#10b981] rounded-[10px] flex items-center justify-center text-white mb-4">
                  <TargetLogo size={20} />
                </div>
                {[
                  { icon: <BarChart3 size={18} />, active: true },
                  { icon: <Target size={18} />, active: false },
                  { icon: <Layers size={18} />, active: false },
                  { icon: <Users2 size={18} />, active: false },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`w-full p-2.5 rounded-lg flex items-center justify-center transition-colors ${
                      item.active
                        ? "bg-[#10b981]/20 text-[#10b981]"
                        : "text-slate-500 hover:bg-slate-800"
                    }`}
                  >
                    {item.icon}
                  </div>
                ))}
              </div>

              <div className="flex-1 p-8 text-left flex flex-col gap-6 overflow-hidden bg-white">
                <div className="grid grid-cols-4 gap-4">
                  {[
                    {
                      label: "Planejamentos",
                      value: "24",
                      color: "text-[#10b981]",
                    },
                    {
                      label: "Projetos",
                      value: "156",
                      color: "text-[#06b6d4]",
                    },
                    {
                      label: "Conclusão",
                      value: "89%",
                      color: "text-[#10b981]",
                    },
                    {
                      label: "Parceiros",
                      value: "12",
                      color: "text-[#10b981]",
                    },
                  ].map((kpi, i) => (
                    <div
                      key={i}
                      className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm"
                    >
                      <span className={`text-xl font-bold block ${kpi.color}`}>
                        {kpi.value}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                        {kpi.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 flex-1 h-full min-h-0">
                  <div className="flex-[2] bg-white p-6 rounded-2xl border border-slate-100 flex items-end gap-2.5 justify-between relative overflow-hidden">
                    <div className="absolute top-4 left-6 w-24 h-2 bg-slate-100 rounded" />
                    {[40, 70, 45, 90, 65, 80, 35, 95, 55, 75].map(
                      (height, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{
                            delay: 1.5 + i * 0.05,
                            duration: 1.5,
                            repeat: Infinity,
                            repeatType: "reverse",
                          }}
                          className="flex-1 bg-gradient-to-t from-[#10b981]/20 to-[#10b981] rounded-t-[2px]"
                        />
                      ),
                    )}
                  </div>

                  <div className="flex-1 bg-white p-6 rounded-2xl border border-slate-100 flex flex-col items-center justify-center relative">
                    <div className="absolute top-4 left-6 w-16 h-2 bg-slate-100 rounded" />
                    <div className="relative flex items-center justify-center">
                      <svg className="w-32 h-32 transform -rotate-90">
                        <circle
                          cx="64"
                          cy="64"
                          r="50"
                          stroke="#f1f5f9"
                          strokeWidth="10"
                          fill="transparent"
                        />
                        <motion.circle
                          cx="64"
                          cy="64"
                          r="50"
                          stroke="#10b981"
                          strokeWidth="10"
                          fill="transparent"
                          strokeDasharray="314.15"
                          initial={{ strokeDashoffset: 314.15 }}
                          animate={{ strokeDashoffset: 314.15 * (1 - 0.85) }}
                          transition={{
                            duration: 2,
                            delay: 1.5,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatType: "loop",
                            repeatDelay: 4,
                          }}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute text-2xl font-black text-slate-900 tracking-tight">
                        85%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ESTATÍSTICAS RÁPIDAS: Refinadas */}
        <div className="w-full relative z-20">
          <hr className="border-slate-100 mb-16" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 px-4">
            {[
              { value: "500+", label: "Empresas Ativas" },
              { value: "2.5k+", label: "Planejamentos Criados" },
              { value: "98%", label: "Taxa de Satisfação" },
              { value: "24/7", label: "Suporte Disponível" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <span className="text-3xl md:text-4xl font-bold text-[#10b981] tracking-tight">
                  {stat.value}
                </span>
                <span className="text-[11px] md:text-xs text-slate-400 font-bold uppercase tracking-widest text-center">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
          <hr className="border-slate-100 mt-16" />
        </div>
      </div>
    </section>
  );
};
