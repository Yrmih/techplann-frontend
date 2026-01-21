export default function Loading() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-2">
        {/* Spinner simples com a cor verde da sua marca */}
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#10b981]" />
        <p className="text-sm font-medium text-gray-500">Carregando TechPlann...</p>
      </div>
    </div>
  );
}