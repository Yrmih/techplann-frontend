export default function SwotPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900"> aqui será a Análise SWOT</h1>
      <div className="grid grid-cols-2 gap-4 h-[500px]">
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 font-bold text-emerald-700">Forças</div>
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-6 font-bold text-amber-700">Fraquezas</div>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 font-bold text-blue-700">Oportunidades</div>
        <div className="bg-red-50 border border-red-100 rounded-xl p-6 font-bold text-red-700">Ameaças</div>
      </div>
    </div>
  );
}