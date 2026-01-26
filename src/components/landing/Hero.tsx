"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MoveRight, PlayCircle, CheckCircle2 } from "lucide-react";

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
          
          <button className="group flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg text-gray-600 hover:bg-gray-50 transition-all border border-gray-100">
            <PlayCircle className="w-5 h-5 text-[#10b981] group-hover:scale-110 transition-transform" />
            Ver Demonstração
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mb-20 text-sm text-gray-400 font-medium">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-[#10b981]" /> 7 dias grátis
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-[#10b981]" /> Sem cartão de crédito
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
              <div className="w-[15%] bg-[#0f172a] h-full p-4 flex flex-col gap-4 opacity-80">
                <div className="w-8 h-8 bg-[#10b981] rounded-lg opacity-50" />
                {[1,2,3,4].map(i => <div key={i} className="w-full h-1.5 bg-slate-700 rounded" />)}
              </div>
              <div className="flex-1 p-8 text-left">
                <div className="grid grid-cols-4 gap-4 mb-8">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                      <div className="w-8 h-1.5 bg-gray-100 rounded mb-2" />
                      <div className="w-12 h-3 bg-emerald-50 rounded" />
                    </div>
                  ))}
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 h-48 flex items-end gap-3 justify-between">
                  {[40, 70, 45, 90, 65, 80, 30, 95].map((height, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ 
                        delay: 1.2 + (i * 0.1), 
                        duration: 1, 
                        repeat: Infinity, 
                        repeatType: 'reverse' 
                      }}
                      className="flex-1 bg-gradient-to-t from-[#10b981] to-emerald-300 rounded-t-md"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};