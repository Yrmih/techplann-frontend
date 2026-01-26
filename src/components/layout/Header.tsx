"use client";

import Link from "next/link";
import { TargetLogo } from "../ui/svg/TargetLogo";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";


export const Header = () => {

  const pathname = usePathname();
  
  const isOnboarding = pathname.includes("/onboarding");


  return (
    <header className=" w-full bg-white border-b border-gray-100 py-4 px-8 flex items-center justify-between stick top-0 z-50">
      <Link href="/" className="flex items-center gap-2.5 group">
        <div className="w-9 h-9 bg-[#10b981] rounded-full flex items-center justify-center text-white transition-transform group-hover:scale-105 shadow-sm">
          <TargetLogo size={24}/>
        </div>
        <span className="font-bold text-xl text-gray-900 tracking-tight">
          TechPlann
        </span>
      </Link>

      <div className="flex items-center">
        {isOnboarding ? (
          <Link href="/"
          className="flex items-center gap-2 text-sm font-medium text-gray-500">
            <ArrowLeft size={16} />
            Voltar ao site
          </Link>
        ) : (
          <nav>
            <div>
             <Link href="#funcionalidades" className="hover:text-[#10b981] transition-colors">Funcionalidades</Link>
              <Link href="#planos" className="hover:text-[#10b981] transition-colors">Planos</Link>
              <Link href="#depoimentos" className="hover:text-[#10b981] transition-colors">Depoimentos</Link>
            </div>
          </nav>

        )}

      </div>
    </header>
  )
}