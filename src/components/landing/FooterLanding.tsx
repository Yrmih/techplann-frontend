"use client";

import { TargetLogo } from "../ui/svg/TargetLogo";
import Link from "next/link";

export const FooterLanding = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          
          <div className="flex items-center gap-2">
            <TargetLogo className="w-8 h-8 text-[#10b981]" />
            <span className="text-xl font-bold text-gray-900 tracking-tight">TechPlann</span>
          </div>

          
          <nav className="flex items-center gap-8 text-sm font-medium text-gray-500">
            <Link 
              href="/termos" 
              className="hover:text-[#10b981] transition-colors duration-200"
            >
              Termos de Uso
            </Link>
            <Link 
              href="/privacidade" 
              className="hover:text-[#10b981] transition-colors duration-200"
            >
              Privacidade
            </Link>
            <Link 
              href="/contato" 
              className="hover:text-[#10b981] transition-colors duration-200"
            >
              Contato
            </Link>
          </nav>

          <div className="text-sm text-gray-400">
            © 2024 TechPlann. Todos os direitos reservados.
          </div>
          
        </div>
      </div>
    </footer>
  );
};