import { MoreHorizontal } from "lucide-react";

export function PlanningTable({ data }: { data: any[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50/50 border-b border-gray-50 text-[10px] uppercase tracking-wider font-bold text-gray-400">
          <tr>
            <th className="px-8 py-4">Nome</th>
            <th className="px-8 py-4">Cliente</th>
            <th className="px-8 py-4 text-center">Projetos</th>
            <th className="px-8 py-4 text-center">Status</th>
            <th className="px-8 py-4"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
              <td className="px-8 py-5">
                <span className="text-xs font-bold text-[#10b981] cursor-pointer hover:underline">
                  {item.nome}
                </span>
              </td>
              <td className="px-8 py-5">
                <span className="text-xs text-gray-500 font-medium">{item.cliente}</span>
              </td>
              <td className="px-8 py-5 text-center">
                <span className="px-3 py-1 bg-gray-100 rounded-lg text-[10px] font-bold text-gray-600">
                  {item.projetos}
                </span>
              </td>
              <td className="px-8 py-5 text-center">
                <span className={`px-3 py-1 rounded-full text-[9px] font-black tracking-tight ${
                  item.status === 'ATIVO' 
                    ? 'bg-emerald-50 text-emerald-500' 
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  {item.status}
                </span>
              </td>
              <td className="px-8 py-5 text-right">
                <button className="p-2 text-gray-300 hover:text-gray-600 transition-colors">
                  <MoreHorizontal size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}