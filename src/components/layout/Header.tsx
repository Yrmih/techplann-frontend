"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { TargetLogo } from "../ui/svg/TargetLogo";

export const Header = () => {
  const pathname = usePathname();
  
  const isOnboarding = pathname.includes("/onboarding");

  return (
    <header className="w-full bg-white border-b border-gray-100 py-4 px-8 flex items-center justify-between sticky top-0 z-50">
      
      <Link href="/" className="flex items-center gap-2.5 group">
        <div className="w-9 h-9 bg-[#10b981] rounded-full flex items-center justify-center text-white transition-transform group-hover:scale-105 shadow-sm">
          <TargetLogo size={24} />
        </div>
        <span className="font-bold text-xl text-gray-900 tracking-tight">
          TechPlann
        </span>
      </Link>

      {/* Navegação Condicional Dinâmica */}
      <div className="flex items-center">
        {isOnboarding ? (
          <Link 
            href="/" 
            className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={16} />
            Voltar ao site
          </Link>
        ) : (
          <nav className="flex items-center gap-8">
            <div className="hidden md:flex gap-6 text-sm font-medium text-gray-500">
              <Link href="#funcionalidades" className="hover:text-[#10b981] transition-colors">Funcionalidades</Link>
              <Link href="#planos" className="hover:text-[#10b981] transition-colors">Planos</Link>
              <Link href="#depoimentos" className="hover:text-[#10b981] transition-colors">Depoimentos</Link>
            </div>
            
            <div className="flex items-center gap-4 border-l border-gray-100 ml-2 pl-6">
              <Link 
                href="/login" 
                className="text-sm font-bold text-gray-700 hover:text-[#10b981] transition-colors"
              >
                Entrar
              </Link>
              <Link 
                href="/onboarding/organization" 
                className="bg-[#10b981] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#0da673] transition-all shadow-lg shadow-emerald-100"
              >
                Começar Grátis
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};