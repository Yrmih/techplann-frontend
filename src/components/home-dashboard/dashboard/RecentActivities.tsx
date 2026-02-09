export function RecentActivities() {
  const logs = [
    { title: "Novo objetivo BSC adicionado", module: "BSC", time: "2 min atrás", icon: "🎯" },
    { title: "Canvas atualizado", module: "Canvas", time: "15 min atrás", icon: "🖼️" },
    { title: "Projeto concluído", module: "Projetos", time: "1h atrás", icon: "✅" },
    { title: "Análise SWOT revisada", module: "SWOT", time: "3h atrás", icon: "⚡" },
  ];

  return (
    <div className="space-y-4">
      {logs.map((log, i) => (
        <div key={i} className="flex justify-between items-start border-b border-gray-50 pb-3 last:border-0">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-sm">
              {log.icon}
            </div>
            <div>
              <p className="text-[11px] font-bold text-gray-700 leading-tight">{log.title}</p>
              <span className="text-[9px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-bold uppercase">
                {log.module}
              </span>
            </div>
          </div>
          <span className="text-[9px] text-gray-400 font-medium whitespace-nowrap">{log.time}</span>
        </div>
      ))}
    </div>
  );
}