import { MoreHorizontal } from "lucide-react";

interface PlanningItem {
  id: number | string;
  nome: string;
  cliente: string;
  projetos: number;
  status: 'ATIVO' | 'CONCLUÍDO' | string;
}

interface PlanningTableProps {
  data: PlanningItem[];
}

export function PlanningTable({ data }: PlanningTableProps) {
  return (
    
    <div className="mx-8 mb-8 border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm">
      <table className="w-full text-left border-collapse">
        
        <thead className="bg-[#f9fafb] border-b border-gray-200">
          <tr className="text-[10px] uppercase tracking-[1.5px] font-black text-gray-500">
            <th className="px-8 py-5">Nome do Planejamento</th>
            <th className="px-8 py-5">Cliente Vinculado</th>
            <th className="px-8 py-5 text-center">Nº Projetos</th>
            <th className="px-8 py-5 text-center">Status</th>
            <th className="px-8 py-5"></th>
          </tr>
        </thead>
        
        <tbody className="divide-y divide-gray-100">
          {data.map((item) => (
            /* Hover verde suave na linha inteira */
            <tr 
              key={item.id} 
              className="hover:bg-emerald-50/40 transition-colors group cursor-default"
            >
              <td className="px-8 py-5">
                {/* Texto Preto com Hover Verde */}
                <span className="text-sm font-black text-black group-hover:text-[#10b981] transition-colors">
                  {item.nome}
                </span>
              </td>
              <td className="px-8 py-5">
                {/* Cliente em Preto Semi-negrito */}
                <span className="text-xs text-black font-bold uppercase tracking-tight">
                  {item.cliente}
                </span>
              </td>
              <td className="px-8 py-5 text-center">
                <span className="text-xs font-black text-gray-400">
                  {item.projetos.toString().padStart(2, '0')}
                </span>
              </td>
              <td className="px-8 py-5">
                <div className="flex justify-center">
                  <span className={`px-4 py-1.5 rounded-full text-[9px] font-black tracking-widest uppercase border ${
                    item.status === 'ATIVO' 
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                      : 'bg-gray-50 text-gray-500 border-gray-200'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </td>
              <td className="px-8 py-5 text-right">
                <button className="p-2 text-gray-300 hover:text-emerald-600 transition-all">
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