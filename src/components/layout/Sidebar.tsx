"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  Home, 
  Users, 
  Calendar, 
  Target, 
  Layers, 
  Zap, 
  BarChart, 
  FolderKanban, 
  ShieldCheck, 
  Settings, 
  LogOut 
} from "lucide-react";
import { TargetLogo } from "../ui/svg/TargetLogo";

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: "Home", icon: <Home size={20} />, href: "/dashboard" },
    { name: "Cadastros", icon: <Users size={20} />, href: "/dashboard/registrations" },
    { name: "Planejamentos", icon: <Calendar size={20} />, href: "/dashboard/planning" },
    { name: "SWOT", icon: <Target size={20} />, href: "/dashboard/swot" },
    { name: "Canvas", icon: <Layers size={20} />, href: "/dashboard/canvas" },
    { name: "Cultura", icon: <Zap size={20} />, href: "/dashboard/culture" },
    { name: "BSC", icon: <BarChart size={20} />, href: "/dashboard/bsc" },
    { name: "Projetos", icon: <FolderKanban size={20} />, href: "/dashboard/projects" },
    { name: "Segurança", icon: <ShieldCheck size={20} />, href: "/dashboard/security" },
  ];

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 80 : 260 }}
      className="h-screen bg-[#0f172a] text-slate-400 flex flex-col sticky top-0 z-[60] border-r border-slate-800 transition-all duration-300"
    >

      <div className="p-6 flex items-center justify-between relative">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="min-w-[40px] h-10 bg-[#10b981] rounded-[10px] flex items-center justify-center text-white shadow-lg shadow-emerald-900/20">
            <TargetLogo size={22} />
          </div>
          {!isCollapsed && (
            <span className="font-bold text-xl text-white tracking-tight">TechPlann</span>
          )}
        </Link>

        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-8 w-6 h-6 bg-[#1e293b] border border-slate-700 rounded-md flex items-center justify-center text-slate-400 hover:text-white transition-colors z-10"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      <nav className="flex-1 px-4 mt-4 space-y-1 overflow-y-auto overflow-x-hidden">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href}>
              <div className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all relative group ${
                isActive ? "text-white bg-[#10b981]" : "hover:bg-slate-800/50 hover:text-slate-200"
              }`}>
                <div className={`${isActive ? "text-white" : "text-slate-400 group-hover:text-[#10b981]"}`}>
                  {item.icon}
                </div>
                {!isCollapsed && <span className="text-sm font-medium">{item.name}</span>}
                
                
                {isCollapsed && (
                  <div className="absolute left-16 bg-[#1e293b] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50">
                    {item.name}
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-1">
        <Link href="/dashboard/settings" className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-400 hover:bg-slate-800/50 hover:text-white">
          <Settings size={20} />
          {!isCollapsed && <span className="text-sm font-medium">Configurações</span>}
        </Link>
        <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400">
          <LogOut size={20} />
          {!isCollapsed && <span className="text-sm font-medium">Sair</span>}
        </button>
      </div>
    </motion.aside>
  );
};