"use client";

import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import Link from "next/link";

export const CTA = () => {
  return (
    <section className="py-24 bg-[#f8fafc] flex flex-col items-center text-center overflow-hidden">
     
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl mx-auto px-6"
      >
       
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Pronto para transformar seu planejamento?
        </h2>
        
       
        <p className="text-gray-500 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          Junte-se a centenas de empresas que já simplificaram sua gestão estratégica com o TechPlann.
        </p>

       
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/onboarding/company"
            className="group bg-[#10b981] text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2 hover:bg-[#0da673] hover:scale-105 transition-all shadow-xl shadow-emerald-100"
          >
            Começar Teste Grátis
            <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-xl font-bold text-lg text-gray-900 bg-white border border-gray-100 hover:bg-gray-50 transition-all shadow-sm"
          >
            Agendar Demonstração
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};