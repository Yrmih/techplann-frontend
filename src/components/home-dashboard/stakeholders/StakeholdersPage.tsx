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

import {
  StakeholderTable,
  StakeholderData,
} from "./components/table/StakeholderTable";
import {
  DepartmentTable,
  DepartmentData,
} from "./components/table/DepartmentTable";

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
  <div className="flex flex-col items-center justify-center py-24 bg-white border border-dashed border-gray-200 rounded-[32px] shadow-sm animate-in fade-in zoom-in-95 duration-500">
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
  const [activeTab, setActiveTab] = useState<string>("parceiros");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [stakeholdersData, setStakeholdersData] = useState<StakeholderData[]>(
    [],
  );
  const [departmentsData, setDepartmentsData] = useState<DepartmentData[]>([]);

  const [showStakeholderForm, setShowStakeholderForm] =
    useState<boolean>(false);
  const [showDepartmentForm, setShowDepartmentForm] = useState<boolean>(false);

  const handleNewRegistration = () => {
    if (activeTab === "parceiros") setShowStakeholderForm(true);
    else if (activeTab === "departamentos") setShowDepartmentForm(true);
  };

  const handleSaveNewStakeholder = () => {
    const mockNew: StakeholderData = {
      id: Math.random().toString(36).substr(2, 9),
      nome: "NOVO STAKEHOLDER",
      tipo: "Fornecedor",
      empresaRelacionada: "Empresa Exemplo",
      status: "Ativo",
    };
    setStakeholdersData((prev) => [...prev, mockNew]);
    setShowStakeholderForm(false);
  };

  const handleSaveNewDepartment = () => {
    const mockNew: DepartmentData = {
      id: Math.random().toString(36).substr(2, 9),
      nome: "Novo Departamento",
      status: "Ativo",
    };
    setDepartmentsData((prev) => [...prev, mockNew]);
    setShowDepartmentForm(false);
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
        {showStakeholderForm ? (
          <motion.div
            key="stk-form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <NewStakeholderForm onBack={handleSaveNewStakeholder} />
          </motion.div>
        ) : showDepartmentForm ? (
          <motion.div
            key="dept-form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <NewDepartmentForm onBack={handleSaveNewDepartment} />
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            <Tabs
              defaultValue="parceiros"
              className="w-full space-y-8"
              onValueChange={(v) => setActiveTab(v)}
            >
              {/* HEADER E TABS LIST*/}
              <div className="space-y-8">
                <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 text-left">
                  <div className="space-y-1">
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                      {getTitle()}
                    </h1>
                    <p className="text-slate-500 font-medium text-sm">
                      Gerencie parceiros e unidades administrativas internas
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
                      <Printer size={18} className="text-slate-900" /> Imprimir
                    </button>
                    <button
                      onClick={handleNewRegistration}
                      className="flex items-center gap-1.5 px-4 py-2 bg-[#10b981] text-white rounded-lg text-sm font-semibold hover:bg-[#0da673] transition-colors shadow-sm"
                    >
                      <Plus size={18} strokeWidth={2.5} /> Novo{" "}
                      {activeTab === "parceiros"
                        ? "Stakeholder"
                        : "Departamento"}
                    </button>
                  </div>
                </header>

                {/* BOTÕES DE SWITCH (TABS) - AJUSTADO PARA FICAR NO CANTO ESQUERDO */}
                <div className="flex justify-start">
                  <TabsList className="bg-slate-100/80 p-1 rounded-xl border border-slate-100 h-12 w-full md:w-auto flex justify-start">
                    <TabsTrigger
                      value="parceiros"
                      className="flex items-center gap-2 px-6 py-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-slate-900 text-slate-500 font-bold text-xs h-full transition-all"
                    >
                      <Handshake size={16} /> Stakeholders
                    </TabsTrigger>
                    <TabsTrigger
                      value="departamentos"
                      className="flex items-center gap-2 px-6 py-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-slate-900 text-slate-500 font-bold text-xs h-full transition-all"
                    >
                      <Users size={16} /> Departamentos
                    </TabsTrigger>
                  </TabsList>
                </div>
              </div>

              {/* CARD BRANCO PRINCIPAL: AGORA COM RESPIRO (P-8) PARA A TABELA INTERNA */}
              <div className="bg-white border border-gray-100 rounded-[32px] shadow-sm overflow-hidden min-h-[500px]">
                {/* ÁREA DE BUSCA E TÍTULO INTERNO DO CARD */}
                <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-gray-50 bg-gray-50/10">
                  <h3 className="font-bold text-slate-900 text-[16px] tracking-tight">
                    Lista de{" "}
                    {activeTab === "parceiros"
                      ? "Stakeholders"
                      : "Departamentos"}
                  </h3>

                  <div className="relative w-full md:w-80 group">
                    <Search
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#10b981] transition-colors"
                      size={16}
                    />
                    <Input
                      placeholder={`Buscar ${activeTab}...`}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-10 bg-white border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-emerald-50 focus:border-[#10b981] transition-all shadow-sm"
                    />
                  </div>
                </div>

                {/* CONTEÚDO COM RESPIRO (p-8) CONFORME IMAGE_9BD2DF */}
                <div className="p-8">
                  <TabsContent
                    value="parceiros"
                    className="mt-0 focus-visible:outline-none"
                  >
                    {stakeholdersData.length > 0 ? (
                      <StakeholderTable
                        data={stakeholdersData.filter((item) =>
                          item.nome
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()),
                        )}
                        onEdit={(item) => console.log(item)}
                        onDelete={(id) =>
                          setStakeholdersData((prev) =>
                            prev.filter((i) => i.id !== id),
                          )
                        }
                      />
                    ) : (
                      <EmptyState
                        description="Sua lista de stakeholders está vazia."
                        buttonLabel="Cadastrar parceiro"
                        icon={Handshake}
                        onAction={() => setShowStakeholderForm(true)}
                      />
                    )}
                  </TabsContent>

                  <TabsContent
                    value="departamentos"
                    className="mt-0 focus-visible:outline-none"
                  >
                    {departmentsData.length > 0 ? (
                      <DepartmentTable
                        data={departmentsData.filter((item) =>
                          item.nome
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()),
                        )}
                        onEdit={(item) => console.log(item)}
                        onDelete={(id) =>
                          setDepartmentsData((prev) =>
                            prev.filter((i) => i.id !== id),
                          )
                        }
                      />
                    ) : (
                      <EmptyState
                        description="Nenhum departamento cadastrado."
                        buttonLabel="Criar unidade"
                        icon={Users}
                        onAction={() => setShowDepartmentForm(true)}
                      />
                    )}
                  </TabsContent>
                </div>
              </div>
            </Tabs>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
