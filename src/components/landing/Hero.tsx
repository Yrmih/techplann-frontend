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
  Users2 
} from "lucide-react";
import { TargetLogo } from "../ui/svg/TargetLogo";

export const Hero = () => {
  return (
    <section className="relative w-full pt-20 pb-20 overflow-hidden bg-white">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[700px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-50/60 via-transparent to-transparent -z-10" />

      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 mb-8"
        >
          <span className="flex h-2 w-2 rounded-full bg-[#10b981] animate-ping" />
          <span className="text-xs font-bold text-[#10b981] uppercase tracking-wider">Nova versão 2.0 disponível</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6 max-w-4xl"
        >
          Planejamento Estratégico <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] via-emerald-400 to-[#10b981] bg-[length:200%_auto] animate-gradient-x">
            Simplificado e Poderoso
          </span>
        </motion.h1>

        
        <p className="text-lg text-gray-500 max-w-2xl mb-10 leading-relaxed">
          Unifique SWOT, Canvas, BSC e gestão de projetos em uma única plataforma. 
          Tome decisões estratégicas com dados visuais e colaboração em tempo real.
        </p>

       
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
          <Link 
            href="/onboarding/organization"
            className="group relative bg-[#10b981] text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2 hover:bg-[#0da673] hover:scale-105 transition-all shadow-xl shadow-emerald-100"
          >
            Começar Teste Grátis
            <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <button className="group flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg text-gray-900 bg-white border border-gray-100 hover:bg-gray-50 transition-all shadow-sm">
            <PlayCircle className="w-5 h-5 text-[#10b981] group-hover:scale-110 transition-transform" />
            Ver Demonstração
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mb-20 text-sm text-gray-400 font-medium">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-[#10b981]" /> 7 dias grátis
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-[#10b981]" /> Debitado via cartão de crédito
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-[#10b981]" /> Cancele quando quiser
          </div>
        </div>

        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative w-full max-w-5xl perspective-1000"
        >
          <div className="absolute -inset-4 bg-emerald-400/20 rounded-[3rem] blur-3xl animate-pulse" />
          
          <div className="relative bg-white border-[12px] border-gray-900/5 rounded-[2.5rem] shadow-2xl overflow-hidden shadow-emerald-900/10">
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
                    { label: "Planejamentos", value: "24", color: "text-emerald-500" },
                    { label: "Projetos", value: "156", color: "text-[#3b82f6]" },
                    { label: "Conclusão", value: "89%", color: "text-emerald-500" },
                    { label: "Parceiros", value: "12", color: "text-emerald-500" }
                  ].map((kpi, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 + (i * 0.1) }}
                      className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm"
                    >
                      <span className={`text-xl font-bold block ${kpi.color}`}>{kpi.value}</span>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">{kpi.label}</span>
                    </motion.div>
                  ))}
                </div>

              
                <div className="flex gap-4 flex-1 h-full min-h-0">
                  
                  
                  <div className="flex-[2] bg-white p-6 rounded-2xl border border-gray-100 flex items-end gap-2.5 justify-between relative overflow-hidden">
                    <div className="absolute top-4 left-6 w-24 h-2 bg-gray-50 rounded" />
                    {[40, 70, 45, 90, 65, 80, 35, 95, 55, 75].map((height, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ 
                          delay: 1.5 + (i * 0.05), 
                          duration: 1.5, 
                          repeat: Infinity, 
                          repeatType: 'reverse' 
                        }}
                        className="flex-1 bg-gradient-to-t from-emerald-100 to-[#10b981] rounded-t-[2px]"
                      />
                    ))}
                  </div>

                  
                  <div className="flex-1 bg-white p-6 rounded-2xl border border-gray-100 flex flex-col items-center justify-center relative">
                    <div className="absolute top-4 left-6 w-16 h-2 bg-gray-50 rounded" />
                    <div className="relative flex items-center justify-center">
                      <svg className="w-32 h-32 transform -rotate-90">
                        <circle cx="64" cy="64" r="50" stroke="#f1f5f9" strokeWidth="10" fill="transparent" />
                        <motion.circle 
                          cx="64" cy="64" r="50" stroke="#10b981" strokeWidth="10" fill="transparent"
                          strokeDasharray="314.15"
                          initial={{ strokeDashoffset: 314.15 }}
                          animate={{ strokeDashoffset: 314.15 * (1 - 0.85) }}
                          transition={{ duration: 2, delay: 1.5, ease: "easeOut" }}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute text-2xl font-black text-gray-900 tracking-tight">85%</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};