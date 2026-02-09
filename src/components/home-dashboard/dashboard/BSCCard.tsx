export function BSCCard() {
  const perspectives = [
    { label: "Financeiro", value: 75, color: "bg-emerald-500" },
    { label: "Clientes", value: 65, color: "bg-amber-400" },
    { label: "Processos", value: 82, color: "bg-emerald-500" },
    { label: "Aprendizado", value: 58, color: "bg-emerald-500" },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-full">
       <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-50 text-blue-500 rounded-lg text-xs">📊</div>
          <div>
            <h3 className="font-bold text-gray-800 text-sm">BSC</h3>
            <p className="text-[10px] text-gray-400">Perspectivas</p>
          </div>
        </div>
        <button className="text-[10px] font-bold text-gray-400 hover:text-gray-600">Ver mais →</button>
      </div>

      <div className="space-y-5">
        {perspectives.map((item, i) => (
          <div key={i}>
            <div className="flex justify-between text-[10px] mb-1 font-bold">
              <span className="text-gray-600 flex items-center gap-1">
                <span className={`w-1.5 h-1.5 rounded-full ${item.color.replace('bg-', 'text-')}`}>●</span> 
                {item.label}
              </span>
              <span className="text-gray-900">{item.value}%</span>
            </div>
            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
              <div className={`${item.color} h-full`} style={{ width: `${item.value}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}