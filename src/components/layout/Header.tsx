"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { TargetLogo } from "../ui/svg/TargetLogo";

export const Header = () => {
  const pathname = usePathname();
  const isOnboarding = pathname.includes("/onboarding");

  return (
    <header className="w-full bg-white/80 backdrop-blur-md border-b border-gray-100 py-4 px-8 flex items-center justify-between sticky top-0 z-50">
      
      
      <Link href="/" className="flex items-center gap-2.5 group">
       
        <div className="w-10 h-10 bg-[#10b981] rounded-xl flex items-center justify-center text-white transition-transform group-hover:rotate-3 shadow-sm">
          <TargetLogo size={24} />
        </div>
        <span className="font-bold text-xl text-gray-900 tracking-tight">
          TechPlann
        </span>
      </Link>

      
      {!isOnboarding && (
        <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-8 text-sm font-medium text-gray-500">
          <Link href="#funcionalidades" className="hover:text-[#10b981] transition-colors">Funcionalidades</Link>
          <Link href="#planos" className="hover:text-[#10b981] transition-colors">Planos</Link>
          <Link href="#depoimentos" className="hover:text-[#10b981] transition-colors">Depoimentos</Link>
        </nav>
      )}

     
      <div className="flex items-center gap-6">
        {isOnboarding ? (
          <Link 
            href="/" 
            className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={16} />
            Voltar ao site
          </Link>
        ) : (
          <>
            <Link 
              href="/login" 
              className="text-sm font-bold text-gray-700 hover:text-[#10b981] transition-colors"
            >
              Entrar
            </Link>
            <Link 
              href="/onboarding/organization" 
              className="bg-[#10b981] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#0da673] transition-all shadow-md active:scale-95"
            >
              Começar Grátis
            </Link>
          </>
        )}
      </div>
    </header>
  );
};