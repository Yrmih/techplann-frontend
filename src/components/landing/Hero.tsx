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
    <section className="relative w-full pt-20 pb-20 overflow-hidden bg-white">
      {/* FUNDO: Orbes de INTENSIDADE MÁXIMA conforme o MVP */}
      <div className="absolute top-0 left-0 w-full h-[85%] -z-10 overflow-hidden pointer-events-none">
        {/* Orbe Ciano (Cyan) - Lado Esquerdo e Centro - COR FORTE */}
        <div className="absolute top-[-15%] left-[5%] w-[70%] h-[70%] rounded-full bg-cyan-400/50 blur-[120px]" />

        {/* Orbe Azul Vibrante - Topo Centro/Direita - Para visibilidade total */}
        <div className="absolute top-[-5%] right-[10%] w-[65%] h-[55%] rounded-full bg-blue-500/40 blur-[130px]" />

        {/* Orbe Esmeralda (Emerald) - Lado Direito e atrás do Dashboard - COR FORTE */}
        <div className="absolute top-[15%] right-[-5%] w-[75%] h-[80%] rounded-full bg-emerald-400/50 blur-[140px]" />

        {/* Camada de Dissipação: Mais curta para não "lavar" a cor de cima */}
        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-white via-white/80 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        {/* Badge: Estrela animada e texto sem uppercase */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-emerald-100 mb-8 shadow-md"
        >
          <Sparkles size={14} className="text-[#10b981] animate-pulse" />
          <span className="text-xs font-bold text-[#10b981] tracking-tight">
            Nova versão 2.0 disponível
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight mb-6 max-w-4xl leading-[1.1] relative z-10"
        >
          Planejamento Estratégico <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] via-[#06b6d4] to-[#10b981] bg-[length:200%_auto] animate-gradient-x">
            Simplificado e Poderoso
          </span>
        </motion.h1>

        <p className="text-lg text-slate-600 max-w-2xl mb-10 leading-relaxed font-bold relative z-10 drop-shadow-sm">
          Unifique SWOT, Canvas, BSC e gestão de projetos em uma única
          plataforma. <br />
          Tome decisões estratégicas com dados visuais e colaboração em tempo
          real.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-12 relative z-10">
          <Link
            href="/onboarding/organization"
            className="group relative bg-gradient-to-r from-[#10b981] to-[#06b6d4] text-white px-10 py-4 rounded-xl font-black text-lg flex items-center gap-2 hover:opacity-95 hover:scale-105 transition-all shadow-2xl shadow-cyan-200/50"
          >
            Começar Teste Grátis
            <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <button className="group flex items-center gap-2 px-8 py-4 rounded-xl font-black text-lg text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-all shadow-lg">
            <PlayCircle className="w-5 h-5 text-[#10b981] group-hover:scale-110 transition-transform" />
            Ver Demonstração
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mb-20 text-sm text-slate-500 font-black relative z-10">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-[#06b6d4]" /> 7 dias grátis
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-[#06b6d4]" /> Debitado via
            cartão de crédito
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-[#06b6d4]" /> Cancele quando
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
          {/* Brilho extra sob o dashboard */}
          <div className="absolute -inset-10 bg-emerald-400/20 rounded-[5rem] blur-[100px] animate-pulse" />

          <div className="relative bg-white border-[12px] border-slate-900/5 rounded-[2.5rem] shadow-2xl overflow-hidden shadow-emerald-900/20">
            <div className="bg-[#f8fafc] w-full aspect-[16/9] flex">
              <div className="w-[18%] bg-[#0f172a] h-full p-4 flex flex-col gap-2 opacity-95">
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

              <div className="flex-1 p-8 text-left flex flex-col gap-6 overflow-hidden">
                <div className="grid grid-cols-4 gap-4">
                  {[
                    {
                      label: "Planejamentos",
                      value: "24",
                      color: "text-emerald-500",
                    },
                    {
                      label: "Projetos",
                      value: "156",
                      color: "text-[#3b82f6]",
                    },
                    {
                      label: "Conclusão",
                      value: "89%",
                      color: "text-emerald-500",
                    },
                    {
                      label: "Parceiros",
                      value: "12",
                      color: "text-emerald-500",
                    },
                  ].map((kpi, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 + i * 0.1 }}
                      className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-left"
                    >
                      <span className={`text-xl font-bold block ${kpi.color}`}>
                        {kpi.value}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                        {kpi.label}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="flex gap-4 flex-1 h-full min-h-0">
                  <div className="flex-[2] bg-white p-6 rounded-2xl border border-slate-100 flex items-end gap-2.5 justify-between relative overflow-hidden">
                    <div className="absolute top-4 left-6 w-24 h-2 bg-slate-50 rounded" />
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
                          className="flex-1 bg-gradient-to-t from-emerald-100 to-[#10b981] rounded-t-[2px]"
                        />
                      ),
                    )}
                  </div>

                  <div className="flex-1 bg-white p-6 rounded-2xl border border-slate-100 flex flex-col items-center justify-center relative">
                    <div className="absolute top-4 left-6 w-16 h-2 bg-slate-50 rounded" />
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
                      <motion.span
                        animate={{ opacity: [1, 0.6, 1] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 4,
                        }}
                        className="absolute text-2xl font-black text-slate-900 tracking-tight"
                      >
                        85%
                      </motion.span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ESTATÍSTICAS RÁPIDAS */}
        <div className="w-full relative z-20 bg-white">
          <hr className="border-slate-200/60 mb-16" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 px-4">
            {[
              { value: "500+", label: "Empresas Ativas" },
              { value: "2.5k+", label: "Planejamentos Criados" },
              { value: "98%", label: "Taxa de Satisfação" },
              { value: "24/7", label: "Suporte Disponível" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center gap-1"
              >
                <span className="text-3xl md:text-4xl font-black text-[#10b981] tracking-tight">
                  {stat.value}
                </span>
                <span className="text-[11px] md:text-xs text-slate-400 font-bold uppercase tracking-widest text-center">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
          <hr className="border-slate-200/60 mt-16" />
        </div>
      </div>
    </section>
  );
};
