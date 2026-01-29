"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Printer, Users, TrendingUp, AlertCircle, Lightbulb, ShieldAlert } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { SwotItemModal } from "./SwotItemModal";

const mockRadarData = [
  { subject: 'Forças', A: 57, fullMark: 100 },
  { subject: 'Fraquezas', A: 37, fullMark: 100 },
  { subject: 'Oportunidades', A: 55, fullMark: 100 },
  { subject: 'Ameaças', A: 32, fullMark: 100 },
];

export const SwotAnalysisPage = () => {
  const [modalType, setModalType] = useState<any>(null);

  const SwotCard = ({ title, color, icon: Icon, items, total }: any) => (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full"
    >
      <div className={`p-4 ${color} text-white flex items-center justify-between`}>
        <div className="flex items-center gap-2 font-black uppercase text-xs tracking-widest">
          <Icon size={16} /> {title}
        </div>
        <button 
          onClick={() => setModalType(title.slice(0, -1))}
          className="bg-white/20 hover:bg-white/40 p-1.5 rounded-lg transition-all"
        >
          <Plus size={18} />
        </button>
      </div>
      <div className="flex-1 p-4 space-y-3">
        {items.map((item: any, i: number) => (
          <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-gray-50 last:border-0">
            <span className="text-gray-600 font-medium">{item.label}</span>
            <span className="bg-gray-50 text-emerald-600 font-bold px-2 py-1 rounded-md">{item.value}</span>
          </div>
        ))}
      </div>
      <div className="p-4 bg-gray-50/50 border-t border-gray-100 flex justify-between text-xs font-bold text-gray-400">
        <span>Total:</span>
        <span className="text-gray-900">{total} pontos</span>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-8 p-8 max-w-[1600px] mx-auto">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight tracking-tight">Análise SWOT</h1>
          <p className="text-gray-500 font-medium text-sm">Planejamento: <span className="text-gray-900">PLANEJAMENTO ESTRATÉGICO</span></p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all"><Users size={16}/> Departamentos</button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all"><Printer size={16}/> Imprimir</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SwotCard title="FORÇAS" color="bg-[#10b981]" icon={TrendingUp} total={57} items={[{label: "Atendimento", value: 27}, {label: "Equipe", value: 30}]} />
        <SwotCard title="FRAQUEZAS" color="bg-[#ef4444]" icon={ShieldAlert} total={37} items={[{label: "Processos", value: 22}, {label: "Infra", value: 15}]} />
        <SwotCard title="OPORTUNIDADES" color="bg-[#0ea5e9]" icon={Lightbulb} total={55} items={[{label: "Expansão", value: 30}, {label: "Novos Mercados", value: 25}]} />
        <SwotCard title="AMEAÇAS" color="bg-[#f59e0b]" icon={AlertCircle} total={32} items={[{label: "Concorrência", value: 20}, {label: "Regulação", value: 12}]} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <h3 className="font-bold text-gray-900">Pontuação SWOT</h3>
          {mockRadarData.map((d, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between text-xs font-bold"><span className="text-gray-500 uppercase tracking-widest">{d.subject}</span><span>{d.A}</span></div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="h-full bg-[#10b981]" style={{ width: `${d.A}%` }}></div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Análise Radar SWOT</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={mockRadarData}>
                <PolarGrid stroke="#f1f5f9" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }} />
                <Radar name="Pontuação" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <SwotItemModal isOpen={!!modalType} onClose={() => setModalType(null)} tipo={modalType} />
    </div>
  );
};