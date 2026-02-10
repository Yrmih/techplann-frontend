import { Plus } from "lucide-react";
import Link from "next/link";

export function EmptyPlanning() {
  return (
    <div className="flex flex-col items-center justify-center py-40 bg-white">
      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-6">
         <Plus className="text-gray-300" size={32} strokeWidth={1} />
      </div>
      <p className="text-sm text-gray-400 font-bold tracking-tight">
        Nenhum planejamento encontrado no sistema
      </p>
      
      <Link href="/dashboard/planning/new" className="mt-4">
        <button className="text-xs font-black text-[#10b981] hover:text-emerald-700 transition-all uppercase tracking-widest">
          Criar primeiro registro
        </button>
      </Link>
    </div>
  );
}