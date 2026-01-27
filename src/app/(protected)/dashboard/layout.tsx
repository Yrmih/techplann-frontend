"use client"

import { div } from "framer-motion/client";

export default function DashboardLayout({children} : {children: React.ReactNode}) {
  return (
    <div className="flex min-h-screen">

      <div className="w-64 bg-gray-800 text-white"> Sidebar
      </div>

      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b">
          Header
        </header>

        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>


      </div>
    </div>
  );
}