export function LateProjects() {
  const projects = [
    { name: "Implantação de Sistema", days: "750 dias", level: "alta", color: "text-amber-600 bg-amber-50" },
    { name: "Comercial", days: "414 dias", level: "crítica", color: "text-red-600 bg-red-50" },
    { name: "Implantação de Projeto", days: "202 dias", level: "média", color: "text-blue-600 bg-blue-50" },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-red-50 text-red-500 rounded-lg text-xs">⚠️</div>
          <div>
            <h3 className="font-bold text-gray-800 text-sm">Projetos Atrasados</h3>
            <p className="text-[10px] text-gray-400">Requerem atenção</p>
          </div>
        </div>
        <button className="text-[10px] font-bold text-gray-400 hover:text-gray-600">Ver todos →</button>
      </div>
      
      <div className="space-y-4">
        {projects.map((p, i) => (
          <div key={i} className="flex justify-between items-center border-b border-gray-50 pb-3 last:border-0">
            <div>
              <p className="font-bold text-gray-700 text-xs">{p.name}</p>
              <p className="text-[10px] text-gray-400 font-medium">Planejamento Estratégico</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-red-400">{p.days}</p>
              <span className={`text-[8px] uppercase font-bold px-2 py-0.5 rounded ${p.color}`}>
                {p.level}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}