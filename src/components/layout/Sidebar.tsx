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
  LayoutGrid,
  Zap,
  BarChart,
  FolderKanban,
  ShieldCheck,
  Settings,
  LogOut,
  Building,
} from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  /**
   * Dashboard, Stakeholders, Planejamentos, SWOT, Canvas, Cultura, Projetos, BSC e Segurança.
   * Ícones corrigidos: SWOT (Target) e Cultura (Users).
   */
  const menuItems = [
    { name: "Dashboard", icon: <Home size={22} />, href: "/dashboard" },
    {
      name: "Stakeholders",
      icon: <Users size={22} />,
      href: "/dashboard/stakeholders",
    },
    {
      name: "Planejamentos",
      icon: <Calendar size={22} />,
      href: "/dashboard/planning",
    },
    {
      name: "SWOT",
      icon: <Target size={22} />,
      href: "/dashboard/swot",
    },
    {
      name: "Canvas",
      icon: <LayoutGrid size={22} />,
      href: "/dashboard/canvas",
    },
    {
      name: "Cultura",
      icon: <Users size={22} />,
      href: "/dashboard/culture",
    },
    {
      name: "Projetos",
      icon: <FolderKanban size={22} />,
      href: "/dashboard/projects",
    },
    {
      name: "BSC",
      icon: <BarChart size={22} />,
      href: "/dashboard/bsc",
    },
    {
      name: "Segurança",
      icon: <ShieldCheck size={22} />,
      href: "/dashboard/security",
    },
  ];

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 80 : 260 }}
      className="h-screen bg-[#050b18] text-slate-400 flex flex-col sticky top-0 z-[60] border-r border-slate-800/50 transition-all duration-300 font-sans"
    >
      {/* Logo Section */}
      <div className="p-6 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="min-w-[44px] h-11 bg-[#10b981] rounded-xl flex items-center justify-center text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            <Zap size={24} fill="currentColor" />
          </div>
          {!isCollapsed && (
            <span className="font-bold text-xl text-white tracking-tight">
              TechPlann
            </span>
          )}
        </Link>

        {/* ChevronLeft para recolher */}
        {!isCollapsed && (
          <button
            onClick={() => setIsCollapsed(true)}
            className="w-8 h-8 bg-slate-800/40 rounded-lg flex items-center justify-center text-slate-500 hover:text-white transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
        )}

        {/* ChevronRight para expandir quando estiver colapsado */}
        {isCollapsed && (
          <button
            onClick={() => setIsCollapsed(false)}
            className="absolute -right-3 top-20 w-6 h-6 bg-[#10b981] rounded-full flex items-center justify-center text-white shadow-lg border-2 border-[#050b18] hover:scale-110 transition-transform"
          >
            <ChevronRight size={14} />
          </button>
        )}
      </div>

      {/* Nav Section */}
      <nav className="flex-1 px-4 mt-4 space-y-1 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href}>
              <div
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all relative group ${
                  isActive
                    ? "text-white bg-[#10b981]"
                    : "hover:bg-slate-800/30 hover:text-slate-200"
                }`}
              >
                <div
                  className={`${isActive ? "text-white" : "text-slate-400 group-hover:text-[#10b981]"}`}
                >
                  {item.icon}
                </div>
                {!isCollapsed && (
                  <span className="text-[14px] font-semibold">{item.name}</span>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Footer Identity */}
      <div className="p-4 border-t border-slate-800/50 bg-[#050b18]">
        {!isCollapsed ? (
          <div className="space-y-2 mb-4">
            {/* Card da Empresa */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#0a1122] border border-slate-800/40">
              <div className="min-w-[32px] h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-[#10b981]">
                <Building size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-bold text-slate-100 truncate leading-tight">
                  {user?.organization?.name || "Exemplo Tech"}
                </p>
                <p className="text-[10px] text-slate-500 truncate mt-0.5">
                  CNPJ: 12.345.678/0001-99
                </p>
              </div>
            </div>

            {/* Card do Usuário */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#0a1122] border border-slate-800/40">
              <div className="min-w-[32px] h-8 rounded-full bg-slate-800/50 flex items-center justify-center text-[10px] font-bold text-[#10b981] border border-emerald-500/10">
                {user?.nome?.substring(0, 2).toUpperCase() || "CH"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-bold text-slate-100 truncate leading-tight">
                  {user?.nome || "Carlos Henrique Almeida"}
                </p>
                <p className="text-[10px] text-slate-500 truncate mt-0.5 font-light opacity-60">
                  {user?.email || "carlos.souza@exemplotech.com"}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-slate-800/50 flex items-center justify-center text-[10px] font-bold text-[#10b981] border border-emerald-500/10">
              {user?.nome?.substring(0, 2).toUpperCase() || "CH"}
            </div>
          </div>
        )}

        <div className="space-y-1">
          <Link
            href="/dashboard/settings"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:bg-slate-800/30 hover:text-white transition-all ${isCollapsed ? "justify-center" : ""}`}
          >
            <Settings size={20} />
            {!isCollapsed && (
              <span className="text-[14px] font-semibold">Configurações</span>
            )}
          </Link>

          <button
            onClick={logout}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all ${isCollapsed ? "justify-center" : ""}`}
          >
            <LogOut size={20} />
            {!isCollapsed && (
              <span className="text-[14px] font-semibold">Sair</span>
            )}
          </button>
        </div>
      </div>
    </motion.aside>
  );
};
