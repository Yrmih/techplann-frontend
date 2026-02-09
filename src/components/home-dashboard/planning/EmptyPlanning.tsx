
import Link from "next/link";

export function EmptyPlanning() {
  return (
    <div className="flex flex-col items-center justify-center py-32 space-y-4">
      {/* Texto cinza conforme o design */}
      <p className="text-sm text-gray-400 font-medium">
        Nenhum planejamento cadastrado
      </p>
      
      {/* Link verde para ação rápida */}
      <Link href="/dashboard/planning/new">
        <button className="text-xs font-bold text-[#10b981] hover:underline flex items-center gap-1 transition-all">
          Criar primeiro planejamento
        </button>
      </Link>
    </div>
  );
}