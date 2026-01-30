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
  LayoutGrid, 
  Building2,
  Zap, 
  BarChart, 
  FolderKanban, 
  ShieldCheck, 
  Settings, 
  LogOut 
} from "lucide-react";

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", icon: <Home size={20} />, href: "/dashboard" },
    { name: "Stakeholders", icon: <Users size={20} />, href: "/dashboard/registrations" },
    { name: "Planejamentos", icon: <Calendar size={20} />, href: "/dashboard/planning" },
    { name: "SWOT", icon: <LayoutGrid size={20} />, href: "/dashboard/swot" },
    { name: "Canvas", icon: <Building2 size={20} />, href: "/dashboard/canvas" },
    { name: "Cultura", icon: <Zap size={20} />, href: "/dashboard/culture" },
    { name: "BSC", icon: <BarChart size={20} />, href: "/dashboard/bsc" },
    { name: "Projetos", icon: <FolderKanban size={20} />, href: "/dashboard/projects" },
    { name: "Segurança", icon: <ShieldCheck size={20} />, href: "/dashboard/security" },
  ];

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 80 : 260 }}
      className="h-screen bg-[#050b18] text-slate-400 flex flex-col sticky top-0 z-[60] border-r border-slate-800/50 transition-all duration-300"
    >
      <div className="p-6 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="min-w-[44px] h-11 bg-[#10b981] rounded-xl flex items-center justify-center text-white">
            <Zap size={24} fill="currentColor" />
          </div>
          {!isCollapsed && (
            <span className="font-bold text-xl text-white tracking-tight">TechPlann</span>
          )}
        </Link>

        {!isCollapsed && (
          <button 
            onClick={() => setIsCollapsed(true)}
            className="w-8 h-8 bg-slate-800/50 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
        )}
      </div>

      <nav className="flex-1 px-4 mt-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href}>
              <div className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all relative group ${
                isActive ? "text-white bg-[#10b981]" : "hover:bg-slate-800/30 hover:text-slate-200"
              }`}>
                <div className={`${isActive ? "text-white" : "text-slate-400 group-hover:text-[#10b981]"}`}>
                  {item.icon}
                </div>
                {!isCollapsed && <span className="text-sm font-medium">{item.name}</span>}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800/50 flex flex-col items-center gap-2">
        
        {isCollapsed && (
          <button 
            onClick={() => setIsCollapsed(false)}
            className="w-full flex items-center justify-center py-3 text-slate-500 hover:text-white mb-2"
          >
            <ChevronRight size={20} />
          </button>
        )}

        <Link 
          href="/dashboard/settings" 
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-400 hover:bg-slate-800/30 hover:text-white ${isCollapsed ? 'justify-center' : ''}`}
        >
          <Settings size={20} />
          {!isCollapsed && <span className="text-sm font-medium">Configurações</span>}
        </Link>

        <button className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 ${isCollapsed ? 'justify-center' : ''}`}>
          <LogOut size={20} />
          {!isCollapsed && <span className="text-sm font-medium">Sair</span>}
        </button>
      </div>
    </motion.aside>
  );
};