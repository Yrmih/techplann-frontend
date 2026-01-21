import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-6xl font-bold text-[#02141a]">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-900">Página não encontrada</h2>
      <p className="mt-2 text-center text-gray-600">
        Ops! O conteúdo que você está procurando não existe ou foi movido.
      </p>
      <Link 
        href="/" 
        className="mt-8 rounded-lg bg-[#10b981] px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90"
      >
        Voltar para o início
      </Link>
    </div>
  );
}