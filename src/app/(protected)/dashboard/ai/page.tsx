
export default function TechPlannAIPage() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center py-20 px-4">
      <div className="w-20 h-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center mb-6 text-4xl shadow-sm border border-emerald-500/20">
        ✨
      </div>
      <h1 className="text-2xl font-black text-gray-900 tracking-tight uppercase">
        TechPlann AI
      </h1>
      <p className="text-gray-500 max-w-xs mt-2 font-medium">
        Estamos treinando nossa inteligência estratégica. Em breve, este módulo estará disponível para o plano <span className="text-orange-500 font-bold">PRO</span>.
      </p>
      <div className="mt-8 px-6 py-2 bg-gray-900 text-white rounded-xl text-xs font-bold uppercase tracking-widest animate-pulse">
        Módulo em Construção 🚧
      </div>
    </div>
  );
}