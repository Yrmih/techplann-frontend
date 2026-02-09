export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">aqui será o Dashboard</h1>
        <p className="text-gray-500 text-sm">Visão geral do seu planejamento estratégico.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="h-32 bg-white border border-gray-100 rounded-2xl shadow-sm flex items-center justify-center text-gray-400">Card de Indicadores</div>
        <div className="h-32 bg-white border border-gray-100 rounded-2xl shadow-sm flex items-center justify-center text-gray-400">Card de Projetos</div>
        <div className="h-32 bg-white border border-gray-100 rounded-2xl shadow-sm flex items-center justify-center text-gray-400">Card de Metas</div>
      </div>
    </div>
  );
}