"use client";

import { motion } from "framer-motion";
import { 
  Target, 
  Layers, 
  BarChart3, 
  Users2, 
  LayoutDashboard, 
  Sparkles 
} from "lucide-react";

const features = [
  {
    title: "Análise SWOT",
    description: "Identifique forças, fraquezas, oportunidades e ameaças com matriz interativa e scoring automático.",
    icon: <Target className="w-6 h-6 text-[#10b981]" />,
    delay: 0.1
  },
  {
    title: "Business Model Canvas",
    description: "Visualize seu modelo de negócio completo em uma única tela com blocos editáveis e colaborativos.",
    icon: <Layers className="w-6 h-6 text-[#10b981]" />,
    delay: 0.2
  },
  {
    title: "Balanced Scorecard",
    description: "Acompanhe KPIs nas 4 perspectivas estratégicas com metas, iniciativas e indicadores.",
    icon: <BarChart3 className="w-6 h-6 text-[#10b981]" />,
    delay: 0.3
  },
  {
    title: "Gestão de Parceiros",
    description: "Centralize informações de parceiros estratégicos e acompanhe status de relacionamentos.",
    icon: <Users2 className="w-6 h-6 text-[#10b981]" />,
    delay: 0.4
  },
  {
    title: "Projetos & Kanban",
    description: "Gerencie projetos com quadros Kanban, timeline e acompanhamento de atividades.",
    icon: <LayoutDashboard className="w-6 h-6 text-[#10b981]" />,
    delay: 0.5
  },
  {
    title: "Cultura Organizacional",
    description: "Defina e compartilhe propósito, missão, visão e valores da sua empresa.",
    icon: <Sparkles className="w-6 h-6 text-[#10b981]" />,
    delay: 0.6
  }
];

export const Features = () => {
  return (
    <section id="funcionalidades" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        
        <div className="flex flex-col items-center mb-16">
          <span className="px-3 py-1 rounded-full bg-gray-100 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">
            Funcionalidades
          </span>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Tudo que você precisa para planejar
          </h2>
          <p className="text-gray-500 max-w-2xl text-lg">
            Ferramentas integradas de gestão estratégica que funcionam juntas para dar clareza às suas decisões.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: feature.delay, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="p-8 bg-white border border-gray-100 rounded-2xl text-left hover:shadow-xl hover:shadow-emerald-900/5 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};