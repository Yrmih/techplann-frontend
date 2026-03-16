"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Printer,
  Search,
  Plus,
  Users,
  Handshake,
  LucideIcon,
} from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

import { NewStakeholderForm } from "./components/forms/NewStakeholderForm";
import { NewDepartmentForm } from "./components/forms/NewDepartmentForm";

interface EmptyStateProps {
  description: string;
  buttonLabel: string;
  icon: LucideIcon;
  onAction?: () => void;
}

const EmptyState = ({
  description,
  buttonLabel,
  icon: Icon,
  onAction,
}: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center py-24 bg-white border border-dashed border-gray-200 rounded-[32px] shadow-sm">
    <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-[#10b981] mb-4">
      <Icon size={32} strokeWidth={1.5} />
    </div>
    <p className="text-sm font-medium text-gray-400 mb-6">{description}</p>
    <button
      onClick={onAction}
      className="text-[#10b981] font-bold text-sm hover:underline transition-all"
    >
      {buttonLabel}
    </button>
  </div>
);

export default function StakeholdersPage() {
  const [activeTab, setActiveTab] = useState("parceiros");

  // SUA LÓGICA DE NAVEGAÇÃO ORIGINAL PRESERVADA
  const [showStakeholderForm, setShowStakeholderForm] = useState(false);
  const [showDepartmentForm, setShowDepartmentForm] = useState(false);

  const handleNewRegistration = () => {
    if (activeTab === "parceiros") setShowStakeholderForm(true);
    else if (activeTab === "departamentos") setShowDepartmentForm(true);
  };

  const getTitle = () => {
    return activeTab === "parceiros" ? "Stakeholders" : "Departamentos";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 p-8 max-w-[1600px] mx-auto font-sans"
    >
      <AnimatePresence mode="wait">
        {/* RENDERIZAÇÃO DOS FORMULÁRIOS EXISTENTES */}
        {showStakeholderForm ? (
          <motion.div
            key="stakeholder-form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <NewStakeholderForm onBack={() => setShowStakeholderForm(false)} />
          </motion.div>
        ) : showDepartmentForm ? (
          <motion.div
            key="dept-form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <NewDepartmentForm onBack={() => setShowDepartmentForm(false)} />
          </motion.div>
        ) : (
          /* LISTAGEM PRINCIPAL */
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 text-left">
              <div className="space-y-1">
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                  {getTitle()}
                </h1>
                <p className="text-gray-500 font-medium">
                  Gerencie parceiros e unidades administrativas internas
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-2xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
                  <Printer size={18} /> Imprimir
                </button>

                <button
                  onClick={handleNewRegistration}
                  className="flex items-center gap-2 px-8 py-3 bg-[#10b981] text-white rounded-2xl text-xs font-black hover:bg-[#0da673] transition-all shadow-lg shadow-emerald-100/50 active:scale-95 uppercase tracking-widest"
                >
                  <Plus size={18} strokeWidth={3} /> Novo{" "}
                  {activeTab === "parceiros" ? "Stakeholder" : "Departamento"}
                </button>
              </div>
            </div>

            <Tabs
              defaultValue="parceiros"
              className="w-full"
              onValueChange={(value) => setActiveTab(value)}
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
                <TabsList className="bg-gray-100/80 p-1.5 rounded-2xl border border-gray-100 h-14 w-full md:w-auto">
                  <TabsTrigger
                    value="parceiros"
                    className="flex items-center gap-2 px-8 py-3 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-gray-900 text-gray-500 font-bold text-xs h-full transition-all"
                  >
                    <Handshake size={16} /> Stakeholders
                  </TabsTrigger>
                  <TabsTrigger
                    value="departamentos"
                    className="flex items-center gap-2 px-8 py-3 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-gray-900 text-gray-500 font-bold text-xs h-full transition-all"
                  >
                    <Users size={16} /> Departamentos
                  </TabsTrigger>
                </TabsList>

                <div className="relative w-full md:w-80 group">
                  <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#10b981] transition-colors"
                    size={18}
                  />
                  <Input
                    placeholder={`Buscar em ${activeTab}...`}
                    className="pl-12 h-14 bg-white border-gray-200 rounded-[20px] text-sm font-medium focus:ring-4 focus:ring-emerald-50 focus:border-[#10b981] transition-all shadow-sm"
                  />
                </div>
              </div>

              {["parceiros", "departamentos"].map((tab) => (
                <TabsContent
                  key={tab}
                  value={tab}
                  className="mt-0 focus-visible:outline-none text-left"
                >
                  <div className="bg-white border border-gray-100 rounded-[32px] shadow-xl shadow-gray-200/40 overflow-hidden">
                    <div className="p-8 border-b border-gray-50 bg-gray-50/30 flex items-center justify-between">
                      <h2 className="font-black text-gray-900 text-sm uppercase tracking-[0.15em]">
                        Lista de{" "}
                        {tab === "parceiros" ? "Stakeholders" : "Departamentos"}
                      </h2>
                    </div>

                    <div className="min-h-[500px] flex flex-col justify-center px-8 bg-white">
                      <EmptyState
                        description={`Sua lista de ${tab} está vazia.`}
                        buttonLabel={`Clique aqui para cadastrar seu primeiro registro`}
                        icon={tab === "parceiros" ? Handshake : Users}
                        onAction={handleNewRegistration}
                      />
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
