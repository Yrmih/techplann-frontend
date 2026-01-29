"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { motion } from "framer-motion";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
    <div className="flex h-screen overflow-hidden bg-[#f8fafc]">

      <Sidebar />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
       
        <header className="h-16 border-b border-gray-100 bg-white px-8 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-2">
            
          </div>
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