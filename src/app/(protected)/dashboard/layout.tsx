"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { motion } from "framer-motion";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#f8fafc]">

      <Sidebar />

      <div className="flex-1 flex flex-col">
       
        <header className="h-16 border-b border-gray-100 bg-white px-8 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Área Logada</span>
          </div>

         
          <div className="flex items-center gap-4 text-sm">
            <div className="text-right">
              <p className="font-bold text-gray-900 leading-none">BC Development S/S LTDA</p>
              <p className="text-xs text-gray-500 mt-1">Frank Pereira Cardoso</p>
            </div>
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-[#10b981] font-bold">
              FP
            </div>
          </div>
        </header>

       
        <main className="p-8 overflow-y-auto">
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