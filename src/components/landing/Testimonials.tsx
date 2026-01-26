"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "O TechPlann transformou nossa forma de fazer planejamento estratégico. Reduzimos o tempo de elaboração em 60%.",
    author: "Carlos Silva",
    role: "CEO, TechCorp Brasil",
    initials: "CS",
    color: "bg-emerald-50 text-emerald-600"
  },
  {
    quote: "Finalmente uma ferramenta que integra SWOT, Canvas e BSC de forma intuitiva. Indispensável para nossa gestão.",
    author: "Ana Rodrigues",
    role: "Diretora de Estratégia, Inova Solutions",
    initials: "AR",
    color: "bg-emerald-50 text-emerald-600"
  },
  {
    quote: "Uso com todos os meus clientes. A visualização dos dados facilita muito as sessões de planejamento.",
    author: "Roberto Mendes",
    role: "Consultor Empresarial",
    initials: "RM",
    color: "bg-emerald-50 text-emerald-600"
  }
];

export const Testimonials = () => {
  return (
    <section id="depoimentos" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        
        <div className="text-center mb-16">
          <span className="px-3 py-1 rounded-full bg-gray-100 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4 inline-block">
            Depoimentos
          </span>
          <h2 className="text-4xl font-extrabold text-gray-900">
            O que nossos clientes dizem
          </h2>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="p-8 bg-white border border-gray-100 rounded-[2rem] flex flex-col shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 transition-all"
            >
             
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={18} fill="#10b981" className="text-[#10b981]" />
                ))}
              </div>

            
              <p className="text-gray-500 leading-relaxed mb-8 flex-1 italic">
                {item.quote}
              </p>

             
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm ${item.color}`}>
                  {item.initials}
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-gray-900 text-sm">{item.author}</h4>
                  <p className="text-gray-400 text-xs">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};