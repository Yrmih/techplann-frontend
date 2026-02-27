"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  // PROTEÇÃO: Se não estiver logado, manda para o login
  // PROTEÇÃO: Comentado temporariamente para testes
  useEffect(() => {
    // if (!loading && !isAuthenticated) {
    //   router.push("/login");
    // }
  }, [isAuthenticated, loading, router]);

  // Altere a linha abaixo para ignorar o "!isAuthenticated"
  // De: if (loading || !isAuthenticated)
  // Para:
  if (loading) { 
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#050b18]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#10b981]"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
      <Sidebar />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header Superior */}
        <header className="h-16 border-b border-gray-100 bg-white px-8 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-semibold text-slate-600">
              Painel Geral
            </h1>
          </div>

          {/* Futuramente você pode colocar notificações ou busca aqui */}
        </header>

        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
