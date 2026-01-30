"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Printer,
  Search,
  Plus,
  Users,
  Building2,
  Handshake,
  LucideIcon,
} from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

interface EmptyStateProps {
  description: string;
  buttonLabel: string;
  icon: LucideIcon;
}

const EmptyState = ({
  description,
  buttonLabel,
  icon: Icon,
}: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center py-24 bg-white border border-gray-100 rounded-2xl shadow-sm">
    <div className="text-gray-300 mb-4">
      <Icon size={48} strokeWidth={1} />
    </div>
    <p className="text-sm font-medium text-gray-400 mb-6">{description}</p>
    <button className="text-[#10b981] font-bold text-sm hover:underline transition-all">
      {buttonLabel}
    </button>
  </div>
);

export default function StakeholdersPage() {
  // Estado para controlar qual aba está ativa
  const [activeTab, setActiveTab] = useState("parceiros");

  // Função para retornar o texto do botão com base na aba
  const getButtonLabel = () => {
    switch (activeTab) {
      case "parceiros":
        return "Novo Parceiro";
      case "departamentos":
        return "Novo Departamento";
      case "empresas":
        return "Nova Empresa";
      default:
        return "Novo Registro";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 p-8 max-w-[1600px] mx-auto"
    >
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="text-left">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Stakeholders
          </h1>
          <p className="text-gray-500 font-medium mt-1">
            Gerencie parceiros, departamentos e empresas
          </p>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
            <Printer size={16} /> Imprimir
          </button>

          {/* Botão que muda o texto dinamicamente */}
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#10b981] text-white rounded-xl text-xs font-bold hover:bg-[#0da673] transition-all shadow-md shadow-emerald-100">
            <Plus size={16} /> {getButtonLabel()}
          </button>
        </div>
      </div>

      {/* Tabs com onValueChange para atualizar o estado */}
      <Tabs 
        defaultValue="parceiros" 
        className="w-full" 
        onValueChange={(value) => setActiveTab(value)}
      >
        <div className="flex items-center justify-between mb-8">
          <TabsList className="bg-gray-100/60 p-1.5 rounded-2xl border border-gray-100 h-13">
            <TabsTrigger
              value="parceiros"
              className="flex items-center gap-2 px-8 py-3 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-gray-900 text-gray-500 font-bold text-xs h-full"
            >
              <Handshake size={16} /> Parceiros
            </TabsTrigger>
            <TabsTrigger
              value="departamentos"
              className="flex items-center gap-2 px-8 py-3 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-gray-900 text-gray-500 font-bold text-xs h-full"
            >
              <Users size={16} /> Departamentos
            </TabsTrigger>
            <TabsTrigger
              value="empresas"
              className="flex items-center gap-2 px-8 py-3 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-gray-900 text-gray-500 font-bold text-xs h-full"
            >
              <Building2 size={16} /> Empresas
            </TabsTrigger>
          </TabsList>

          <div className="relative w-80">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <Input
              placeholder={`Buscar ${activeTab}...`}
              className="pl-11 h-12 bg-gray-50 border-gray-200 rounded-2xl text-xs font-medium focus:ring-[#10b981]"
            />
          </div>
        </div>

        <TabsContent value="parceiros" className="mt-0 focus-visible:outline-none">
          <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
            <div className="p-7 border-b border-gray-50 bg-gray-50/30 text-left">
              <h2 className="font-bold text-gray-900 text-sm tracking-tight">
                Lista de Parceiros
              </h2>
            </div>
            <div className="min-h-[450px] flex flex-col justify-center px-6">
              <EmptyState
                description="Nenhum parceiro cadastrado"
                buttonLabel="Cadastrar primeiro parceiro"
                icon={Handshake}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="departamentos" className="mt-0 focus-visible:outline-none">
          <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
            <div className="p-7 border-b border-gray-50 bg-gray-50/30 text-left">
              <h2 className="font-bold text-gray-900 text-sm tracking-tight">
                Lista de Departamentos
              </h2>
            </div>
            <div className="min-h-[450px] flex flex-col justify-center px-6">
              <EmptyState
                description="Nenhum departamento cadastrado"
                buttonLabel="Cadastrar primeiro departamento"
                icon={Users}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="empresas" className="mt-0 focus-visible:outline-none">
          <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
            <div className="p-7 border-b border-gray-50 bg-gray-50/30 text-left">
              <h2 className="font-bold text-gray-900 text-sm tracking-tight">
                Lista de Empresas
              </h2>
            </div>
            <div className="min-h-[450px] flex flex-col justify-center px-6">
              <EmptyState
                description="Nenhuma empresa cadastrada"
                buttonLabel="Cadastrar primeira empresa"
                icon={Building2}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}